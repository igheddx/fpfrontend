import { create } from "zustand";

const useBearStore = create((set) => ({
  isUserValid: false,
  setIsUserValid: (arg) => set({ isUserValid: arg }),

}

));

const useStore = create(set => ({
  fullName: "Dominic Ighedoa",
}));



export default useBearStore;
