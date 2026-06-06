export const LOCAL_REGISTERED_USER_KEY = "fitbuddies.registeredUser";

export type LocalRegisteredUser = {
  uid: string;
  name: string;
  displayName: string;
  email: string | null;
  authProvider: "google" | "password" | string;
  registeredAt: string;
};

export function readLocalRegisteredUser(): LocalRegisteredUser | null {
  if (typeof window === "undefined") {
    return null;
  }

  const storedUser = window.localStorage.getItem(LOCAL_REGISTERED_USER_KEY);

  if (!storedUser) {
    return null;
  }

  try {
    return JSON.parse(storedUser) as LocalRegisteredUser;
  } catch {
    window.localStorage.removeItem(LOCAL_REGISTERED_USER_KEY);
    return null;
  }
}

export function saveLocalRegisteredUser(user: LocalRegisteredUser) {
  window.localStorage.setItem(LOCAL_REGISTERED_USER_KEY, JSON.stringify(user));
}

export function clearLocalRegisteredUser() {
  window.localStorage.removeItem(LOCAL_REGISTERED_USER_KEY);
}
