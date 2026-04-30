import { create } from "zustand";

const useStore = create((set) => ({
    user: localStorage.getItem('user') || null,
    token: localStorage.getItem('token') || null,

    setUser:(user, token) => {
        localStorage.setItem('user', user);
        localStorage.setItem('token', token);
        set({ user, token });
    },

    logout:() => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        set({ user: null, token: null });
    }
}))

export default useStore