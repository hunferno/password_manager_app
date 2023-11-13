import { createContext, useEffect, useState } from "react";
import { axiosAPI, axiosPostAPI } from "../config/ApiRequestLayout";
import * as SecureStore from "expo-secure-store";

interface AuthProps {
  authState?: { token: string | null; authenticated: boolean | null };
  onRegister?: (email: string, password: string) => Promise<any>;
  onLogin?: (email: string, password: string) => Promise<any>;
  onVerificationCode?: (email: string, otpCode: string) => Promise<any>;
  onResendVerificationCode?: (email: string) => Promise<any>;
  onResetPassword?: (email: string, password: string) => Promise<any>;
  isEmailExistsInDB?: (email: string) => Promise<any>;
  activeBioConnexion?: (email: string) => Promise<any>;
  desactiveBioConnexion?: (email: string) => Promise<any>;
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

  useEffect(() => {
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
            setAuthState({
              token: null,
              authenticated: false,
            });
            console.log("token supprimé suite a invalidité");
            return;
          }

          setAuthState({
            token,
            authenticated: true,
          });
        } catch (e) {
          await SecureStore.deleteItemAsync("jwt_token");
          setAuthState({
            token: null,
            authenticated: false,
          });
        }
      }
    };
    checkToken();
  }, []);

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

      setAuthState({
        token: result.data.userInfo.jwt,
        authenticated: true,
      });

      //   Stocker le token dans le secure store
      await SecureStore.setItemAsync("jwt_token", result.data.userInfo.jwt);
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

  const activeBioConnexion = async (email: string) => {
    try {
      // récupérer le storage
      const emailInStorage = await SecureStore.getItemAsync("email");

      if (emailInStorage) {
        return {
          error: true,
          message: "Vous avez déjà activé la connexion biométrique!",
        };
      }

      // stocker l'email dans le storage
      await SecureStore.setItemAsync("email", email);
    } catch (e) {
      return {
        error: true,
        message: "Une erreur est survenue lors de la sauvegarde des données! ",
      };
    }
  };

  const desactiveBioConnexion = async (email: string) => {
    try {
      // récupérer le storage
      const emailInStorage = await SecureStore.getItemAsync("email");

      if (!emailInStorage) {
        return {
          error: true,
          message: "Votre connexion biométrique n'existe pas!",
        };
      }

      // stocker l'email dans le storage
      await SecureStore.deleteItemAsync("email");
    } catch (e) {
      return {
        error: true,
        message: "Une erreur est survenue lors de la sauvegarde des données! ",
      };
    }
  };

  const logout = async () => {
    // Delete token from storage
    await SecureStore.deleteItemAsync("jwt_token");

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
    desactiveBioConnexion,
    authState,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
