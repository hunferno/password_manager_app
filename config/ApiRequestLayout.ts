import axios from "axios";

export const axiosAPI = axios.create({
  baseURL: "http://vps-e0edc1a2.vps.ovh.net:6002/api", // URL VPS API
  // baseURL: "http://10.10.10.71:6002/api", // URL node API (internet redspher)
  // baseURL: "http://192.168.1.10:6002/api", // URL node API (internet maison)
  // baseURL: "http://172.17.0.1:6002/api", // URL node API (internet marc)
  
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
