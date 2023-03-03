import axios from "axios";

export function setRequestAuthorizationHeader(token: string): void {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}