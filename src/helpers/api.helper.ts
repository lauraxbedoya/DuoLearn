import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";

export const getApiHeader = () => {
  const token = localStorage.getItem("tkn");
  return {
    "content-type": "application/json",
    Authorization: `Bearer ${token}`,
    "Access-Control-Allow-Origin": "*",
  };
};

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.BASE_API_URL,
});

export const handleApiError = (e: AxiosError): string => {
  const error = e.response?.data as any;
  console.error(error);

  switch (error?.statusCode) {
    case 401:
      return "No Autorizado";
    case 500:
      return "Ups, algo ha fallado, intentalo nuevamente";
    default:
      return error?.message;
  }
};

export const api = {
  async post<T = any, R = AxiosResponse<T, any>>(
    url: string,
    data: unknown
  ): Promise<R> {
    return axiosInstance.post(url, data, { headers: getApiHeader() });
  },
  async get<T = any, R = AxiosResponse<T, any>>(url: string): Promise<R> {
    return axiosInstance.get(url, { headers: getApiHeader() });
  },
  async patch<T = any, R = AxiosResponse<T, any>>(
    url: string,
    data: unknown
  ): Promise<R> {
    return axiosInstance.patch(url, data, { headers: getApiHeader() });
  },
  async put<T = any, R = AxiosResponse<T, any>>(url: string): Promise<R> {
    return axiosInstance.put(url, { headers: getApiHeader() });
  },
  async delete<T = any, R = AxiosResponse<T, any>>(url: string): Promise<R> {
    return axiosInstance.delete(url, { headers: getApiHeader() });
  },
};
