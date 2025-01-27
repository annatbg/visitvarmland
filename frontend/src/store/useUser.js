import { create } from "zustand";

const useUser = create((set) => ({
  user: null,
  role: null,

  login: (userData, userRole) =>
    set(() => ({ user: userData, role: userRole })),

  logout: () => set(() => ({ user: null, role: null })),
}));

export default useUser;
