import { create } from "zustand";

const useUser = create((set) => ({
  user: null,
  role: null,
  firstName: null,
  lastName: null,

  login: (userData, userRole, firstName, lastName) =>
    set(() => ({ user: userData, role: userRole, firstName, lastName })),

  logout: () =>
    set(() => ({ user: null, role: null, firstName: null, lastName: null })),
}));

export default useUser;
