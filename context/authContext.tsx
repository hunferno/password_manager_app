import { createContext, useEffect, useState } from "react";
import { axiosPostAPI } from "../config/ApiRequestLayout";
import * as SecureStore from "expo-secure-store";
import * as LocalAuthentication from "expo-local-authentication";
import toaster from "../components/toaster";

interface AuthProps {
  authState?: { token: string | null; authenticated: boolean | null };
  isBiometricSupported?: boolean;
  isBiometricSet?: boolean;
  isBioConnexionActive?: boolean;
  onRegister?: (email: string, password: string) => Promise<any>;
  onLogin?: (email: string, password: string) => Promise<any>;
  onVerificationCode?: (email: string, otpCode: string) => Promise<any>;
  onResendVerificationCode?: (email: string) => Promise<any>;
  onResetPassword?: (email: string, password: string) => Promise<any>;
  isEmailExistsInDB?: (email: string) => Promise<any>;
  activeBioConnexion?: () => void;
  desactiveBioConnexion?: () => void;
  biometricConnexion?: () => Promise<any>;
  onLogout?: () => Promise<any>;
}

export const AuthContext = createContext<AuthProps>({});

export const AuthProvider = ({ children }: any) => {
  const [authState, setAuthState] = useState<{
    token: string | null;
    authenticated: boolean | null;
  }>({
    token: null,
    authenticated: null,
  });
  const [isBiometricSupported, setIsBiometricSupported] = useState(false);
  const [isBiometricSet, setIsBiometricSet] = useState(false);
  const [isBioConnexionActive, setIsBioConnexionActive] = useState(false);

  // UTILS FUNCTIONS
  const checkToken = async () => {
    // Get token from storage
    const token = await SecureStore.getItemAsync("jwt_token");

    if (token) {
      try {
        // check if token is still valid
        const result = await axiosPostAPI("/user/verify_token_validity", {
          token,
        });

        if (["4", "5"].includes((result as any).status)) {
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
          token: token,
          authenticated: false,
        });

        // Check if biometric connexion is active
        const activeBio = await SecureStore.getItemAsync("active_bio");
        if (activeBio) {
          setIsBioConnexionActive(true);
        }
      } catch (e) {
        await SecureStore.deleteItemAsync("jwt_token");
        setAuthState({
          token: null,
          authenticated: false,
        });
      }
    }
  };

  const biometricConnexion = async () => {
    //Active fingerprint connexion
    const fingerprintAuth = await LocalAuthentication.authenticateAsync({
      promptMessage: "Confirmez votre identité",
      disableDeviceFallback: true,
      cancelLabel: "ANNULER",
    });

    if (fingerprintAuth.success == true) {
      // Set authenticated to true
      setAuthState((prevState) => {
        return { ...prevState, authenticated: true };
      });
      toaster("success", "Succès", "Connexion réussie");
    } else {
      setAuthState((prevState) => {
        return { ...prevState, authenticated: null };
      });
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

  // Check if is hardware supported
  const checkBiometricSupport = async () => {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    setIsBiometricSupported(hasHardware);
  };
  // check if biometric is set
  const checkBiometricSet = async () => {
    const isEnroll = await LocalAuthentication.isEnrolledAsync();
    setIsBiometricSet(isEnroll);
  };

  useEffect(() => {
    checkToken();
    checkBiometricSupport();
    checkBiometricSet();
  }, []);

  // API FUNCTIONS
  const register = async (email: string, password: string) => {
    try {
      return await axiosPostAPI("/user/register", { email, password });
    } catch (e) {
      return { error: true, message: (e as any).response.data.message };
    }
  };

  const isEmailExistsInDB = async (email: string) => {
    try {
      return await axiosPostAPI("/user/isEmailExistsInDB", { email });
    } catch (e) {
      return { error: true, message: (e as any).response.data.message };
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const result: any = await axiosPostAPI("/user/login", {
        email,
        password,
      });

      const { _id, jwt } = result.data.userInfo;

      //Stocker le user dans le secure store
      await SecureStore.setItemAsync("user_id", _id);
      //   Stocker le token dans le secure store
      await SecureStore.setItemAsync("jwt_token", jwt);
      // Stocker l'email dans le secure store
      await SecureStore.setItemAsync("email", email);

      setAuthState({
        token: result.data.userInfo.jwt,
        authenticated: true,
      });
    } catch (e: any) {
      return { error: true, message: (e as any).response.data.message };
    }
  };

  const resetPassword = async (email: string, password: string) => {
    try {
      return await axiosPostAPI("/user/reset_password", { email, password });
    } catch (e) {
      return { error: true, message: (e as any).response.data.message };
    }
  };

  const verificationCode = async (email: string, otpCode: string) => {
    try {
      return await axiosPostAPI("/user/register/verification", {
        email,
        receivedCode: otpCode,
      });
    } catch (e) {
      return { error: true, message: (e as any).response.data.message };
    }
  };

  const resendVerificationCode = async (email: string) => {
    try {
      return await axiosPostAPI("/user/resendVerificationCode", { email });
    } catch (e) {
      return { error: true, message: (e as any).response.data.message };
    }
  };

  const logout = async () => {
    // Delete token from storage
    await SecureStore.deleteItemAsync("jwt_token");
    await SecureStore.deleteItemAsync("email");
    await SecureStore.deleteItemAsync("active_bio");

    setIsBioConnexionActive(false);

    // reset auth state
    setAuthState({
      token: null,
      authenticated: false,
    });
  };

  const value = {
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
