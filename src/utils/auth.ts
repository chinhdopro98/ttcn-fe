export interface StoredUser {
  username?: string;
  role?: string | number;
}

export const getStoredToken = (): string | null => {
  return localStorage.getItem("token");
};

export const getStoredUser = (): StoredUser | null => {
  const raw = localStorage.getItem("user");
  if (!raw) return null;

  try {
    return JSON.parse(raw) as StoredUser;
  } catch (error) {
    return null;
  }
};

export const clearStoredAuth = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};
