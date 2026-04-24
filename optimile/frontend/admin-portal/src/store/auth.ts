import { create } from 'zustand';

type AuthState = {
  token: string | null;
  user: string | null;
  login: (token: string, user: string) => void;
  logout: () => void;
};

const saved = localStorage.getItem('admin-auth');
const parsed = saved ? JSON.parse(saved) : { token: null, user: null };

export const useAuthStore = create<AuthState>((set) => ({
  token: parsed.token,
  user: parsed.user,
  login: (token, user) => {
    localStorage.setItem('admin-auth', JSON.stringify({ token, user }));
    set({ token, user });
  },
  logout: () => {
    localStorage.removeItem('admin-auth');
    set({ token: null, user: null });
  }
}));
