export function getToken(): string | null {
  const token = localStorage.getItem('access_token');
  return token ? JSON.parse(token) : null;
}

export function setToken(token: string): void {
  localStorage.setItem('access_token', JSON.stringify(token));
}

export function destroyToken(): void {
  localStorage.removeItem('access_token');
}