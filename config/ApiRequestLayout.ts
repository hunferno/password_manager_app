import axios from "axios";

export const axiosAPI = axios.create({
  baseURL: "https://lock-words-api.onrender.com/api",
  headers: {},
});

export const axiosGetAPI = (url: string, token?: string) => {
  return new Promise((resolve, reject) => {
    axiosAPI
      .get(url, {
        headers: {
          Authorization: `Bearer ${token ?? ""}`,
        },
      })
      .then((res) => resolve(res.data))
      .catch((err) => reject(err.message));
  });
};

export const axiosPostAPI = (url: string, data: any | null, token?: string) => {
  return new Promise((resolve, reject) => {
    axiosAPI
      .post(url, data, {
        headers: {
          Authorization: `Bearer ${token ?? ""}`,
        },
      })
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const axiosPatchAPI = (url: string, data: any, token?: string) => {
  return new Promise((resolve, reject) => {
    axiosAPI
      .patch(url, data, {
        headers: {
          Authorization: `Bearer ${token ?? ""}`,
        },
      })
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const axiosDeleteAPI = (url: string, token?: string) => {
  return new Promise((resolve, reject) => {
    axiosAPI
      .delete(url, {
        headers: {
          Authorization: `Bearer ${token ?? ""}`,
        },
      })
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};
