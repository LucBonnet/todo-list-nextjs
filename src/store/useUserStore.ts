import { create } from "zustand";

interface UserStoreType {
  userId: string;
  setUserId: (userId: string) => void;
}

function setUserId(set: any, userId: string) {
  set(() => {
    return {
      userId
    };
  })
}

const useUserStore = create<UserStoreType>((set) => ({
  userId: "",
  setUserId: (userId: string) => setUserId(set, userId)
}));

export default useUserStore