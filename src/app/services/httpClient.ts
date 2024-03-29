import { LOCAL_STORAGE_KEYS } from "@config/localStorageKeys";
import ky from "ky";

export const httpClient = ky.create({
  prefixUrl: import.meta.env.VITE_API_URL,
  hooks: {
    beforeRequest: [
      (req) => {
        const accessToken = localStorage.getItem(
          LOCAL_STORAGE_KEYS.ACCESS_TOKEN,
        );

        req.headers.set("Authorization", `Bearer ${accessToken}`);
      },
    ],
  },
});
