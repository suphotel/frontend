import axios from "axios";

export function setRequestAuthorizationHeader(token: string) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}