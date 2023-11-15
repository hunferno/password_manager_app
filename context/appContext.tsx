import { createContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import {
  axiosDeleteAPI,
  axiosGetAPI,
  axiosPatchAPI,
  axiosPostAPI,
} from "../config/ApiRequestLayout";
import { IdentificationType } from "../types/identificationType";

interface AppProps {
  onCreateIdentification?: (data: IdentificationType) => Promise<any>;
  onGetAllIdentifications?: () => Promise<any>;
  onSearchItems?: (search: string) => Promise<any>;
  onUpdateIdentification?: (
    id: string,
    data: IdentificationType
  ) => Promise<any>;
  onDeleteIdentification?: (id: string) => Promise<any>;
}

export const AppContext = createContext<AppProps>({});

export const AppProvider = ({ children }: any) => {
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

  const value = {
    onCreateIdentification: createIdentification,
    onGetAllIdentifications: getAllIdentifications,
    onSearchItems: searchIdentifications,
    onUpdateIdentification: updateIdentification,
    onDeleteIdentification: deleteIdentification,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
