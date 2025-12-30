// Auth utilities for token management
export function getAuthToken(): string | null {
  if (typeof window === "undefined") {
    return null;
  }
  return localStorage.getItem("authToken");
}

export function setAuthToken(token: string): void {
  if (typeof window !== "undefined") {
    localStorage.setItem("authToken", token);
  }
}

export function removeAuthToken(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userEmail");
  }
}

export function isAuthenticated(): boolean {
  return !!getAuthToken();
}

export function getUserEmail(): string | null {
  if (typeof window === "undefined") {
    return null;
  }
  return localStorage.getItem("userEmail");
}
