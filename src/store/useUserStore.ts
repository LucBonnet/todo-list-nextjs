import { create } from "zustand";

interface IUser {
  id: string,
  name: string,
  email: string,
}
interface UserStoreType {
  user: IUser | null;
  setUser: (user: IUser) => void;
}

function setUserId(set: any, user: IUser) {
  set(() => {
    return {
      user
    };
  })
}

const useUserStore = create<UserStoreType>((set) => ({
  user: null,
  setUser: (user: IUser) => setUserId(set, user)
}));

export default useUserStore