import axios from "axios";

const axiosAPI = axios.create({
  baseURL: "http://10.5.36.13:6002/api",
  // baseURL: "http://192.168.1.10:6002/api",
  // baseURL: "http://192.168.1.21:6002/api",
});

export const axiosGetAPI = (url: string) => {
  return new Promise((resolve, reject) => {
    axiosAPI
      .get(url)
      .then((res) => resolve(res.data))
      .catch((err) => reject(err.message));
  });
};

export const axiosPostAPI = (url: string, data: any) => {
  return new Promise((resolve, reject) => {
    axiosAPI
      .post(url, data)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const axiosPatchAPI = (url: string, data: any) => {
  return new Promise((resolve, reject) => {
    axiosAPI
      .patch(url, data)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const axiosDeleteAPI = (url: string) => {
  return new Promise((resolve, reject) => {
    axiosAPI
      .delete(url)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};
