import { create } from "zustand";

const useStore = create((set) => ({
    isDarkTheme: false,
    toggleTheme: () => set(state => ({ isDarkTheme: !state.isDarkTheme })),
}));

export default useStore;