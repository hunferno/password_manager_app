import { createContext, ReactNode, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import {
  axiosDeleteAPI,
  axiosGetAPI,
  axiosPatchAPI,
  axiosPostAPI,
} from "../config/ApiRequestLayout";
import { IdentificationType } from "../types/identificationType";
import { SecureTextType } from "../types/secureTextType";

type ApiErrorResponse = {
  error: true;
  message: string;
};

type ApiResult<T> = T | ApiErrorResponse;

interface AppContextValue {
  userEmail: string;
  onCreateIdentification: (
    data: IdentificationType
  ) => Promise<ApiResult<unknown>>;
  onGetAllIdentifications: () => Promise<ApiResult<unknown>>;
  onSearchItems: (search: string) => Promise<ApiResult<unknown>>;
  onUpdateIdentification: (
    id: string,
    data: IdentificationType
  ) => Promise<ApiResult<unknown>>;
  onDeleteIdentification: (id: string) => Promise<ApiResult<unknown>>;
  onUpdateUser: (data: {
    oldPassword: string;
    newPassword: string;
  }) => Promise<ApiResult<unknown>>;
  onCreateSecureText: (data: SecureTextType) => Promise<ApiResult<unknown>>;
  onGetAllSecureText: () => Promise<ApiResult<unknown>>;
  onSearchSecureText: (search: string) => Promise<ApiResult<unknown>>;
  onUpdateSecureText: (
    id: string,
    data: SecureTextType
  ) => Promise<ApiResult<unknown>>;
  onDeleteSecureText: (id: string) => Promise<ApiResult<unknown>>;
}

const buildAuthMissingError = (): ApiErrorResponse => ({
  error: true,
  message: "Clé d'authentification non trouvée.",
});

const buildApiError = (error: unknown): ApiErrorResponse => ({
  error: true,
  message:
    error instanceof Error
      ? error.message
      : "Une erreur est survenue lors de l'appel au serveur.",
});

export const AppContext = createContext<AppContextValue>({
  userEmail: "",
  onCreateIdentification: async () => buildAuthMissingError(),
  onGetAllIdentifications: async () => buildAuthMissingError(),
  onSearchItems: async () => buildAuthMissingError(),
  onUpdateIdentification: async () => buildAuthMissingError(),
  onDeleteIdentification: async () => buildAuthMissingError(),
  onUpdateUser: async () => buildAuthMissingError(),
  onCreateSecureText: async () => buildAuthMissingError(),
  onGetAllSecureText: async () => buildAuthMissingError(),
  onSearchSecureText: async () => buildAuthMissingError(),
  onUpdateSecureText: async () => buildAuthMissingError(),
  onDeleteSecureText: async () => buildAuthMissingError(),
});

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [userEmail, setUserEmail] = useState<string>("");

  useEffect(() => {
    const getUserEmail = async () => {
      const email = await SecureStore.getItemAsync("email");
      if (email) {
        setUserEmail(email);
      }
    };

    void getUserEmail();
  }, []);

  // --------------
  // IDENTIFICATIONS PART
  // --------------
  const createIdentification = async (
    data: IdentificationType
  ): Promise<ApiResult<unknown>> => {
    const token = await SecureStore.getItemAsync("jwt_token");

    if (!token) {
      return buildAuthMissingError();
    }

    try {
      const result = await axiosPostAPI("/identification/create", data, token);
      return result;
    } catch (error) {
      return buildApiError(error);
    }
  };

  const getAllIdentifications = async (): Promise<ApiResult<unknown>> => {
    const token = await SecureStore.getItemAsync("jwt_token");

    if (!token) {
      return buildAuthMissingError();
    }

    try {
      const result = await axiosGetAPI("/identification/get-all", token);
      return result;
    } catch (error) {
      return buildApiError(error);
    }
  };

  const searchIdentifications = async (
    search: string
  ): Promise<ApiResult<unknown>> => {
    const token = await SecureStore.getItemAsync("jwt_token");

    if (!token) {
      return buildAuthMissingError();
    }

    try {
      const result = await axiosGetAPI(
        `/identification/search/${search}`,
        token
      );
      return result;
    } catch (error) {
      return buildApiError(error);
    }
  };

  const updateIdentification = async (
    id: string,
    data: IdentificationType
  ): Promise<ApiResult<unknown>> => {
    const token = await SecureStore.getItemAsync("jwt_token");

    if (!token) {
      return buildAuthMissingError();
    }

    try {
      const result = await axiosPatchAPI(
        `/identification/update/${id}`,
        data,
        token
      );
      return result;
    } catch (error) {
      return buildApiError(error);
    }
  };

  const deleteIdentification = async (
    id: string
  ): Promise<ApiResult<unknown>> => {
    const token = await SecureStore.getItemAsync("jwt_token");

    if (!token) {
      return buildAuthMissingError();
    }

    try {
      const result = await axiosDeleteAPI(
        `/identification/delete/${id}`,
        token
      );
      return result;
    } catch (error) {
      return buildApiError(error);
    }
  };

  // --------------
  // USER PART
  // --------------
  const updateUser = async (data: {
    oldPassword: string;
    newPassword: string;
  }): Promise<ApiResult<unknown>> => {
    const { oldPassword, newPassword } = data;
    const token = await SecureStore.getItemAsync("jwt_token");
    const userId = await SecureStore.getItemAsync("user_id");

    if (!token || !userId) {
      return buildAuthMissingError();
    }

    try {
      const result = await axiosPatchAPI(
        `/user/update/${userId}`,
        { oldPassword, newPassword },
        token
      );
      return result;
    } catch (error) {
      return buildApiError(error);
    }
  };

  // --------------
  // SECURE TEXT PART
  // --------------
  const createSecureText = async (
    data: SecureTextType
  ): Promise<ApiResult<unknown>> => {
    const token = await SecureStore.getItemAsync("jwt_token");

    if (!token) {
      return buildAuthMissingError();
    }

    try {
      const result = await axiosPostAPI("/securetext/create", data, token);
      return result;
    } catch (error) {
      return buildApiError(error);
    }
  };

  const getAllSecureText = async (): Promise<ApiResult<unknown>> => {
    const token = await SecureStore.getItemAsync("jwt_token");

    if (!token) {
      return buildAuthMissingError();
    }

    try {
      const result = await axiosGetAPI("/securetext/get-all", token);
      return result;
    } catch (error) {
      return buildApiError(error);
    }
  };

  const searchSecureText = async (
    search: string
  ): Promise<ApiResult<unknown>> => {
    const token = await SecureStore.getItemAsync("jwt_token");

    if (!token) {
      return buildAuthMissingError();
    }

    try {
      const result = await axiosGetAPI(`/securetext/search/${search}`, token);
      return result;
    } catch (error) {
      return buildApiError(error);
    }
  };

  const updateSecureText = async (
    id: string,
    data: SecureTextType
  ): Promise<ApiResult<unknown>> => {
    const token = await SecureStore.getItemAsync("jwt_token");

    if (!token) {
      return buildAuthMissingError();
    }

    try {
      const result = await axiosPatchAPI(
        `/securetext/update/${id}`,
        data,
        token
      );
      return result;
    } catch (error) {
      return buildApiError(error);
    }
  };

  const deleteSecureText = async (
    id: string
  ): Promise<ApiResult<unknown>> => {
    const token = await SecureStore.getItemAsync("jwt_token");

    if (!token) {
      return buildAuthMissingError();
    }

    try {
      const result = await axiosDeleteAPI(
        `/securetext/delete/${id}`,
        token
      );
      return result;
    } catch (error) {
      return buildApiError(error);
    }
  };

  const value: AppContextValue = {
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
