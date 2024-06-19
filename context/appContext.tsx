import { createContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import {
  axiosDeleteAPI,
  axiosGetAPI,
  axiosPatchAPI,
  axiosPostAPI,
} from "../config/ApiRequestLayout";
import { IdentificationType } from "../types/identificationType";
import { SecureTextType } from "../types/secureTextType";

interface AppProps {
  userEmail?: string;
  onCreateIdentification?: (data: IdentificationType) => Promise<any>;
  onGetAllIdentifications?: () => Promise<any>;
  onSearchItems?: (search: string) => Promise<any>;
  onUpdateIdentification?: (
    id: string,
    data: IdentificationType
  ) => Promise<any>;
  onDeleteIdentification?: (id: string) => Promise<any>;

  onUpdateUser?: (data: any) => Promise<any>;

  onCreateSecureText?: (data: any) => Promise<any>;
  onGetAllSecureText?: () => Promise<any>;
  onSearchSecureText?: (search: string) => Promise<any>;
  onUpdateSecureText?: (id: string, data: SecureTextType) => Promise<any>;
  onDeleteSecureText?: (id: string) => Promise<any>;
}

export const AppContext = createContext<AppProps>({});

export const AppProvider = ({ children }: any) => {
  const [userEmail, setUserEmail] = useState<string>("");
  useEffect(() => {
    // get user email from storage
    const getUserEmail = async () => {
      const email = await SecureStore.getItemAsync("email");
      setUserEmail(email as string);
    };
    getUserEmail();
  }, []);

  // --------------
  //IDENTIFICATIONS PART
  // --------------
  const createIdentification = async (data: IdentificationType) => {
    const token = await SecureStore.getItemAsync("jwt_token");

    if (!token) {
      return { error: true, message: "Clé d'autentification non trouvée." };
    }

    try {
      return await axiosPostAPI(
        "/identification/create",
        data,
        token as string
      );
    } catch (e: any) {
      return { error: true, message: (e as any).response.data.message };
    }
  };
  const getAllIdentifications = async () => {
    const token = await SecureStore.getItemAsync("jwt_token");

    if (!token) {
      return { error: true, message: "Clé d'autentification non trouvée." };
    }

    try {
      return await axiosGetAPI("/identification/get-all", token);
    } catch (e: any) {
      return { error: true, message: (e as any).response.data.message };
    }
  };
  const searchIdentifications = async (search: string) => {
    const token = await SecureStore.getItemAsync("jwt_token");

    if (!token) {
      return { error: true, message: "Clé d'autentification non trouvée." };
    }

    try {
      return await axiosGetAPI(`/identification/search/${search}`, token);
    } catch (e: any) {
      return { error: true, message: (e as any).response.data.message };
    }
  };
  const updateIdentification = async (id: string, data: IdentificationType) => {
    const token = await SecureStore.getItemAsync("jwt_token");

    if (!token) {
      return { error: true, message: "Clé d'autentification non trouvée." };
    }

    try {
      return await axiosPatchAPI(
        `/identification/update/${id}`,
        data,
        token as string
      );
    } catch (e: any) {
      return { error: true, message: (e as any).response.data.message };
    }
  };
  const deleteIdentification = async (id: string) => {
    const token = await SecureStore.getItemAsync("jwt_token");

    if (!token) {
      return { error: true, message: "Clé d'autentification non trouvée." };
    }

    try {
      return await axiosDeleteAPI(
        `/identification/delete/${id}`,
        token as string
      );
    } catch (e: any) {
      return { error: true, message: (e as any).response.data.message };
    }
  };

  // --------------
  //USER PART
  // --------------
  const updateUser = async (data: any) => {
    // password for now
    const { oldPassword, newPassword } = data;
    const token = await SecureStore.getItemAsync("jwt_token");
    const userId = await SecureStore.getItemAsync("user_id");

    if (!token) {
      return { error: true, message: "Clé d'autentification non trouvée." };
    }

    try {
      return await axiosPatchAPI(
        `/user/update/${userId}`,
        { oldPassword, newPassword },
        token as string
      );
    } catch (e: any) {
      return { error: true, message: (e as any).response.data.message };
    }
  };

  // --------------
  //SECURE TEXT PART
  // --------------
  const createSecureText = async (data: any) => {
    const token = await SecureStore.getItemAsync("jwt_token");

    if (!token) {
      return { error: true, message: "Clé d'autentification non trouvée." };
    }

    try {
      return await axiosPostAPI("/secureText/create", data, token as string);
    } catch (e: any) {
      return { error: true, message: (e as any).response.data.message };
    }
  };

  const getAllSecureText = async () => {
    const token = await SecureStore.getItemAsync("jwt_token");

    if (!token) {
      return { error: true, message: "Clé d'autentification non trouvée." };
    }

    try {
      return await axiosGetAPI("/secureText/get-all", token);
    } catch (e: any) {
      return { error: true, message: (e as any).response.data.message };
    }
  };

  const searchSecureText = async (search: string) => {
    const token = await SecureStore.getItemAsync("jwt_token");

    if (!token) {
      return { error: true, message: "Clé d'autentification non trouvée." };
    }

    try {
      return await axiosGetAPI(`/secureText/search/${search}`, token);
    } catch (e: any) {
      return { error: true, message: (e as any).response.data.message };
    }
  };

  const updateSecureText = async (id: string, data: any) => {
    const token = await SecureStore.getItemAsync("jwt_token");

    if (!token) {
      return { error: true, message: "Clé d'autentification non trouvée." };
    }

    try {
      return await axiosPatchAPI(
        `/secureText/update/${id}`,
        data,
        token as string
      );
    } catch (e: any) {
      return { error: true, message: (e as any).response.data.message };
    }
  };

  const deleteSecureText = async (id: string) => {
    const token = await SecureStore.getItemAsync("jwt_token");

    if (!token) {
      return { error: true, message: "Clé d'autentification non trouvée." };
    }

    try {
      return await axiosDeleteAPI(`/secureText/delete/${id}`, token as string);
    } catch (e: any) {
      return { error: true, message: (e as any).response.data.message };
    }
  };

  const value = {
    userEmail,
    onCreateIdentification: createIdentification,
    onGetAllIdentifications: getAllIdentifications,
    onSearchItems: searchIdentifications,
    onUpdateIdentification: updateIdentification,
    onDeleteIdentification: deleteIdentification,
    onUpdateUser: updateUser,
    onCreateSecureText: createSecureText,
    onGetAllSecureText: getAllSecureText,
    onSearchSecureText: searchSecureText,
    onUpdateSecureText: updateSecureText,
    onDeleteSecureText: deleteSecureText,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
