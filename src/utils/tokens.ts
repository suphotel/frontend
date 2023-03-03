export function getToken() {
  const token = localStorage.getItem('access_token');
  return token ? JSON.parse(token) : null;
}

export function setToken(token: string) {
  localStorage.setItem('access_token', JSON.stringify(token));
}

export function destroyToken() {
  localStorage.removeItem('access_token');
}