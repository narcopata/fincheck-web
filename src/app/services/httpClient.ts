import ky from "ky";

export const httpClient = ky.create({
  prefixUrl: import.meta.env.VITE_API_URL,
});
