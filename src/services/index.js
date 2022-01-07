import Axios from "axios";

const baseURL = `https://kyupid-api.vercel.app/api`;
const headers = { "Content-Type": "application/json" };
const AXIOS_CONFIG = {
  baseURL,
  headers,
};

export const API = Axios.create(AXIOS_CONFIG);

export function getAreas() {
  return API.get("/areas")
    .then((res) => res.data)
    .catch((err) => {
      throw new Error(err);
    });
}

export function getUsers() {
  return API.get("/users")
    .then((res) => res.data)
    .catch((err) => {
      throw new Error(err);
    });
}
