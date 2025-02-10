import axios, { AxiosResponse, AxiosError } from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080",
});

export type { AxiosResponse};
export { AxiosError };
export default api;