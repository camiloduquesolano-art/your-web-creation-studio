const STORAGE_KEY = "shroomed_waitlist_users";
const BASE_SUBSCRIBERS = 842;

export type WaitlistUser = {
  email: string;
  goal: string;
  date: string;
};

export function getStoredUsers(): WaitlistUser[] {
  if (typeof window === "undefined") return [];
  try {
    const data = window.localStorage.getItem(STORAGE_KEY);
    return data ? (JSON.parse(data) as WaitlistUser[]) : [];
  } catch {
    return [];
  }
}

export function saveUser(email: string, goal = "No especificado"): WaitlistUser[] {
  const users = getStoredUsers();
  const exists = users.some((u) => u.email.toLowerCase() === email.toLowerCase());
  if (!exists) {
    users.push({ email, goal, date: new Date().toLocaleString() });
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
    } catch {
      /* ignore */
    }
  }
  return users;
}

export function getSubscriberCount(): number {
  return BASE_SUBSCRIBERS + getStoredUsers().length;
}
