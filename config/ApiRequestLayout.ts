import axios, { AxiosError, AxiosRequestConfig } from "axios";

const BASE_URL =
  process.env.EXPO_PUBLIC_API_URL ??
  "http://10.34.202.14:6002/api"; // fallback local dev URL

export const axiosAPI = axios.create({
  baseURL: BASE_URL,
});

const buildAuthHeaders = (token?: string): AxiosRequestConfig["headers"] =>
  token
    ? {
        Authorization: `Bearer ${token}`,
      }
    : undefined;

const normalizeError = (error: unknown): Error => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<{ message?: string }>;
    const message =
      axiosError.response?.data?.message ??
      axiosError.response?.statusText ??
      axiosError.message;
    return new Error(message);
  }

  if (error instanceof Error) {
    return error;
  }

  return new Error("Une erreur réseau est survenue");
};

export async function axiosGetAPI<T = unknown>(
  url: string,
  token?: string
): Promise<T> {
  try {
    const response = await axiosAPI.get<T>(url, {
      headers: buildAuthHeaders(token),
    });
    return response.data;
  } catch (error) {
    throw normalizeError(error);
  }
}

export async function axiosPostAPI<TResponse = unknown, TBody = unknown>(
  url: string,
  data: TBody,
  token?: string
): Promise<TResponse> {
  try {
    const response = await axiosAPI.post<TResponse>(url, data, {
      headers: buildAuthHeaders(token),
    });
    return response.data;
  } catch (error) {
    throw normalizeError(error);
  }
}

export async function axiosPatchAPI<TResponse = unknown, TBody = unknown>(
  url: string,
  data: TBody,
  token?: string
): Promise<TResponse> {
  try {
    const response = await axiosAPI.patch<TResponse>(url, data, {
      headers: buildAuthHeaders(token),
    });
    return response.data;
  } catch (error) {
    throw normalizeError(error);
  }
}

export async function axiosDeleteAPI<T = unknown>(
  url: string,
  token?: string
): Promise<T> {
  try {
    const response = await axiosAPI.delete<T>(url, {
      headers: buildAuthHeaders(token),
    });
    return response.data;
  } catch (error) {
    throw normalizeError(error);
  }
}
