import { createContext, ReactNode, useEffect, useState } from "react";
import axios from "axios";
import { axiosPostAPI, axiosAPI } from "../config/ApiRequestLayout";
import * as SecureStore from "expo-secure-store";
import * as LocalAuthentication from "expo-local-authentication";
import toaster from "../components/toaster";

type AuthState = {
  token: string | null;
  authenticated: boolean | null;
};

type ApiErrorResponse = {
  error: true;
  message: string;
};

type ApiResult<T> = T | ApiErrorResponse;

type EmailExistResult = {
  data: {
    isExist: boolean;
    /** Present when isExist is true: false = account pending email verification */
    isVerified?: boolean;
  };
  error?: true;
  message?: string;
};

/** Returned by onLogin when account exists but email is not verified */
export type LoginNotVerifiedError = {
  error: true;
  code: "ACCOUNT_NOT_VERIFIED";
  message: string;
};

interface LoginResponse {
  userInfo: {
    _id: string;
    jwt: string;
  };
}

interface TokenValidityResponse {
  status: string;
}

interface AuthContextValue {
  authState: AuthState;
  isBiometricSupported: boolean;
  isBiometricSet: boolean;
  isBioConnexionActive: boolean;
  onRegister: (email: string, password: string) => Promise<ApiResult<unknown>>;
  onLogin: (
    email: string,
    password: string
  ) => Promise<ApiResult<unknown> | LoginNotVerifiedError>;
  onVerificationCode: (
    email: string,
    otpCode: string
  ) => Promise<ApiResult<unknown>>;
  onResendVerificationCode: (email: string) => Promise<ApiResult<unknown>>;
  onResetPassword: (
    email: string,
    password: string
  ) => Promise<ApiResult<unknown>>;
  isEmailExistsInDB: (email: string) => Promise<EmailExistResult>;
  activeBioConnexion: () => Promise<void>;
  desactiveBioConnexion: () => Promise<void>;
  biometricConnexion: () => Promise<void>;
  onLogout: () => Promise<void>;
}

const buildApiError = (error: unknown): ApiErrorResponse => ({
  error: true,
  message:
    error instanceof Error
      ? error.message
      : "Une erreur est survenue lors de l'appel au serveur.",
});

export const AuthContext = createContext<AuthContextValue>({
  authState: {
    token: null,
    authenticated: null,
  },
  isBiometricSupported: false,
  isBiometricSet: false,
  isBioConnexionActive: false,
  onRegister: async () => buildApiError("Not implemented"),
  onLogin: async () => buildApiError("Not implemented"),
  onVerificationCode: async () => buildApiError("Not implemented"),
  onResendVerificationCode: async () => buildApiError("Not implemented"),
  onResetPassword: async () => buildApiError("Not implemented"),
  isEmailExistsInDB: async () => ({
    data: { isExist: false },
    error: true,
    message: "Fonction non implémentée.",
  }),
  activeBioConnexion: async () => {},
  desactiveBioConnexion: async () => {},
  biometricConnexion: async () => {},
  onLogout: async () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>({
    token: null,
    authenticated: null,
  });
  const [isBiometricSupported, setIsBiometricSupported] = useState(false);
  const [isBiometricSet, setIsBiometricSet] = useState(false);
  const [isBioConnexionActive, setIsBioConnexionActive] = useState(false);

  // UTILS FUNCTIONS
  const checkToken = async () => {
    const token = await SecureStore.getItemAsync("jwt_token");

    if (!token) {
      return;
    }

    try {
      const result = await axiosPostAPI<TokenValidityResponse>(
        "/user/verify_token_validity",
        { token }
      );

      if (["4", "5"].includes(result.status)) {
        await SecureStore.deleteItemAsync("jwt_token");
        await SecureStore.deleteItemAsync("email");
        await SecureStore.deleteItemAsync("active_bio");

        setIsBioConnexionActive(false);
        setAuthState({
          token: null,
          authenticated: false,
        });
        toaster("error", "Erreur", "Votre session a expiré");
        return;
      }

      setAuthState({
        token,
        authenticated: false,
      });

      const activeBio = await SecureStore.getItemAsync("active_bio");
      if (activeBio) {
        setIsBioConnexionActive(true);
      }
    } catch {
      await SecureStore.deleteItemAsync("jwt_token");
      setAuthState({
        token: null,
        authenticated: false,
      });
    }
  };

  const biometricConnexion = async () => {
    const fingerprintAuth = await LocalAuthentication.authenticateAsync({
      promptMessage: "Confirmez votre identité",
      disableDeviceFallback: true,
      cancelLabel: "ANNULER",
    });

    if (fingerprintAuth.success === true) {
      setAuthState((prevState) => ({
        ...prevState,
        authenticated: true,
      }));
      toaster("success", "Succès", "Connexion réussie");
    } else {
      setAuthState((prevState) => ({
        ...prevState,
        authenticated: null,
      }));
    }
  };

  const activeBioConnexion = async () => {
    await SecureStore.setItemAsync("active_bio", "true");
    setIsBioConnexionActive(true);
  };

  const desactiveBioConnexion = async () => {
    await SecureStore.deleteItemAsync("active_bio");
    setIsBioConnexionActive(false);
  };

  const checkBiometricSupport = async () => {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    setIsBiometricSupported(hasHardware);
  };

  const checkBiometricSet = async () => {
    const isEnroll = await LocalAuthentication.isEnrolledAsync();
    setIsBiometricSet(isEnroll);
  };

  useEffect(() => {
    void checkToken();
    void checkBiometricSupport();
    void checkBiometricSet();
  }, []);

  // API FUNCTIONS
  const register = async (
    email: string,
    password: string
  ): Promise<ApiResult<unknown>> => {
    try {
      const result = await axiosPostAPI("/user/register", { email, password });
      return result;
    } catch (error) {
      return buildApiError(error);
    }
  };

  const isEmailExistsInDB = async (
    email: string
  ): Promise<EmailExistResult> => {
    try {
      const result = await axiosPostAPI<{
        isExist: boolean;
        isVerified?: boolean;
      }>("/user/isEmailExistsInDB", { email });

      if (typeof result.isExist !== "boolean") {
        const apiError = buildApiError(
          new Error(
            "Réponse du serveur invalide lors de la vérification de l'adresse e-mail."
          )
        );
        return {
          data: { isExist: false },
          error: apiError.error,
          message: apiError.message,
        };
      }

      return {
        data: {
          isExist: result.isExist,
          ...(result.isExist && typeof result.isVerified === "boolean" && { isVerified: result.isVerified }),
        },
      };
    } catch (error) {
      const apiError = buildApiError(error);
      return {
        data: { isExist: false },
        error: apiError.error,
        message:
          apiError.message ??
          "Impossible de vérifier l'existence de l'adresse e-mail pour le moment.",
      };
    }
  };

  const login = async (
    email: string,
    password: string
  ): Promise<ApiResult<unknown> | LoginNotVerifiedError> => {
    try {
      const response = await axiosAPI.post<LoginResponse>("/user/login", {
        email,
        password,
      });
      const result = response.data;

      const { _id, jwt } = result.userInfo;

      await SecureStore.setItemAsync("user_id", _id);
      await SecureStore.setItemAsync("jwt_token", jwt);
      await SecureStore.setItemAsync("email", email);

      setAuthState({
        token: jwt,
        authenticated: true,
      });

      return result;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 403) {
        const data = error.response?.data as { code?: string; message?: string } | undefined;
        if (data?.code === "ACCOUNT_NOT_VERIFIED") {
          return {
            error: true,
            code: "ACCOUNT_NOT_VERIFIED",
            message: data.message ?? "Vous n'avez pas confirmé votre email.",
          };
        }
      }
      return buildApiError(error);
    }
  };

  const resetPassword = async (
    email: string,
    password: string
  ): Promise<ApiResult<unknown>> => {
    try {
      const result = await axiosPostAPI("/user/reset_password", {
        email,
        password,
      });
      return result;
    } catch (error) {
      return buildApiError(error);
    }
  };

  const verificationCode = async (
    email: string,
    otpCode: string
  ): Promise<ApiResult<unknown>> => {
    try {
      const result = await axiosPostAPI("/user/register/verification", {
        email,
        receivedCode: otpCode,
      });
      return result;
    } catch (error) {
      return buildApiError(error);
    }
  };

  const resendVerificationCode = async (
    email: string
  ): Promise<ApiResult<unknown>> => {
    try {
      const result = await axiosPostAPI("/user/resendVerificationCode", {
        email,
      });
      return result;
    } catch (error) {
      const apiError = buildApiError(error);
      const msg = apiError.message?.toLowerCase() ?? "";
      if (
        msg.includes("configuration") ||
        msg.includes("serveur") ||
        msg.includes("temporairement indisponible") ||
        msg.includes("envoi") ||
        msg.includes("email")
      ) {
        return {
          ...apiError,
          message:
            "Impossible d'envoyer l'email de vérification. Réessayez dans quelques instants ou vérifiez votre connexion internet.",
        };
      }
      return apiError;
    }
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync("jwt_token");
    await SecureStore.deleteItemAsync("email");
    await SecureStore.deleteItemAsync("active_bio");

    setIsBioConnexionActive(false);

    setAuthState({
      token: null,
      authenticated: false,
    });
  };

  const value: AuthContextValue = {
    onRegister: register,
    onLogin: login,
    onLogout: logout,
    onResendVerificationCode: resendVerificationCode,
    onVerificationCode: verificationCode,
    onResetPassword: resetPassword,
    isEmailExistsInDB,
    activeBioConnexion,
    biometricConnexion,
    desactiveBioConnexion,
    authState,
    isBiometricSupported,
    isBiometricSet,
    isBioConnexionActive,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
