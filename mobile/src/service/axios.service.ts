import { authRequests, configuration } from "../config";
import axios, { AxiosError } from "axios";
import { storageService } from "./storage.service";
import { IOAuth } from "../interface";

export type AxiosApiError = AxiosError<{ message: string, status: number }>

export const axiosInstance = axios.create({ baseURL: configuration.API_URL });

axiosInstance.interceptors.request.use(async (config: any) => {
   const accessToken = await storageService.getAccessToken();

   if (accessToken) {
      config.headers = {
         "Authorization": `Bearer ${ accessToken }`
      };
   }

   return config;
});

axiosInstance.interceptors.response.use((config: any) => {
      return config;
   },
   async (e) => {
      const axiosError = e as AxiosApiError;
      const refreshToken = await storageService.getRefreshToken();
      const originalRequest = e.config;

      if (axiosError.response?.status === 401 && refreshToken && !originalRequest._isRetry) {
         originalRequest._isRetry = true;

         try {
            const { data } = await axiosInstance.post<Omit<IOAuth, "username">>(authRequests.refresh, { refreshToken });
            await storageService.setTokens(data.accessToken, data.refreshToken);

         } catch (e) {
            await storageService.deleteTokens();
            console.log('asd');
         }

         return axiosInstance(originalRequest);
      }

      return Promise.reject(e);
   });
