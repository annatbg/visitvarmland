import { create } from "zustand";
import { persist } from "zustand/middleware";

const useUser = create(
  persist(
    (set) => ({
      user: null,
      token: null,

      login: (userData, userToken) =>
        set(() => ({ user: userData, token: userToken })),
      logout: () => set(() => ({ user: null, token: null })),
    }),
    {
      name: "zustand-user",
    }
  )
);

export default useUser;
