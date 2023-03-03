export function getColorSchemePreference(): string | null {
  return localStorage.getItem('colorScheme');
}

export function setColorSchemePreference(colorScheme: string): void {
  localStorage.setItem('colorScheme', colorScheme);
}