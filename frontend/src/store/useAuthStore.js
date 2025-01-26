import { create } from 'zustand'
import { axiosInstance } from '../lib/axios'
import toast from 'react-hot-toast'
import { io } from 'socket.io-client'
//whenevr someones login we will connect to socket imediately 
//vice versa for logout

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:8080" : "/"

export const useAuthStore = create((set, get) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,
    onlineUsers: [],
    socket: null,

    checkAuth: async () => {
        try {
            const response = await axiosInstance.get('/auth/checkAuth')
            toast.success("Welcome back")
            set({ authUser: response.data })
            get().connectSocket()

        } catch (error) {
            console.log("Error in checkig auth", error);
            set({ authUser: null })
        } finally {
            set({ isCheckingAuth: false })
        }
    },

    signup: async (data) => {
        set({ isSigningUp: true })
        try {
            const response = await axiosInstance.post('/auth/register', data)
            set({ authUser: response.data })
            toast.success("Signup successful")
            get().connectSocket()
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isSigningUp: false });
        }
    },

    login: async (data) => {
        set({ isLoggingIn: true })
        try {
            const response = await axiosInstance.post('/auth/login', data)
            set({ authUser: response.data })
            toast.success("Login successful")
            get().connectSocket()

        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isLoggingIn: false });
        }
    },

    logout: async () => {
        try {
            const response = await axiosInstance.post('/auth/logout')
            set({ authUser: null })
            toast.success("Logout successful")
            get().disconnectSocket();
        } catch (error) {
            toast.error(error.response.data.message);
        }
    },

    updateProfile: async (data) => {
        set({ isUpdatingProfile: true })
        try {
            const res = await axiosInstance.put("/auth/update-profile", data)
            set({ authUser: res.data });
            toast.success("Profile updated successfully")
        } catch (error) {
            toast.error(error.response.data.message);
            console.log("Error in updating profile", error);
        } finally {
            set({ isUpdatingProfile: false })
        }
    },

    connectSocket: () => {
        const { authUser } = get();
        //not auth and already connected
        if (!authUser || get().socket?.connected) return;

        const socket = io(BASE_URL, {
            query: {
                userId: authUser._id
            }
        });
        socket.connect();

        //we get the userIds from io.emit()
        socket.on("getOnlineUsers",(userIds) => {
            console.log("userIds are", userIds);
           set({ onlineUsers: userIds})
        })

        set({ socket: socket });
    },
    disconnectSocket: () => {
        if (get().socket?.connected) return get().socket.disconnect();
    }
}))