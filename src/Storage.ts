import { create } from "zustand";

export interface IAppState {
  user: object | undefined;
  loading: boolean;
  setUser: (user: object) => void;
  setLoading: (loading: boolean) => void;
}

export const useAppStore = create<IAppState>((set) => ({
  user: undefined,
  loading: false,
  setLoading: (loading: boolean) => set({ loading }),
  setUser: (user: object) => set({ user }),
}));