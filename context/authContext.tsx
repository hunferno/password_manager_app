import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { axiosPostAPI } from "../config/ApiRequestLayout";
import * as SecureStore from "expo-secure-store";

interface AuthProps {
  authState?: { token: string | null; authenticated: boolean | null };
  onRegister?: (email: string, password: string) => Promise<any>;
  onLogin?: (email: string, password: string) => Promise<any>;
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
        setAuthState({
          token,
          authenticated: true,
        });

        //   Attacher le token à toutes les requêtes
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      }
    };
    checkToken();
  }, []);

  const register = async (email: string, password: string) => {
    try {
      return await axiosPostAPI("/user/register", { email, password });
    } catch (e) {
      return { error: true, message: (e as any).response.message };
    }
  };

  const isEmailExistsInDB = async (email: string) => {
    try {
      return await axiosPostAPI("/user/isEmailExistsInDB", { email });
    } catch (e) {
      return { error: true, message: (e as any).response.message };
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

      //   Attacher le token à toutes les requêtes
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${result.data.userInfo.jwt}`;

      //   Stocker le token dans le secure store
      await SecureStore.setItemAsync("jwt_token", result.data.userInfo.jwt);
    } catch (e: any) {
      return { error: true, message: (e as any).response.message };
    }
  };

  const logout = async () => {
    // Delete token from storage
    await SecureStore.deleteItemAsync("jwt_token");

    // Update HTTP headers
    axios.defaults.headers.common["Authorization"] = "";

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
    isEmailExistsInDB,
    authState,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
