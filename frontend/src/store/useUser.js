import { create } from "zustand";

const useUser = create((set) => ({
  user: null,

  login: (userData) => set(() => ({ user: userData })),

  logout: () => set(() => ({ user: null })),
}));

export default useUser;
