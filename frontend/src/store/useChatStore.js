import { create } from 'zustand'
import { axiosInstance } from "../lib/axios"
import toast from 'react-hot-toast'
import { useAuthStore } from './useAuthStore'

export const useChatStore = create((set, get) => ({
    messages: [],
    users: [],
    selectedUser: null,
    isMessagesloading: false,
    isUsersLoading: false,

    getUsers: async () => {
        set({ isUsersLoading: true })
        try {
            const response = await axiosInstance.get('/message/users')
            set({ users: response.data })
            console.log("All users:",response.data);
            
        } catch (error) {
            toast.error('Something went wrong')
            console.log(error)
        } finally {
            set({ isUsersLoading: false })
        }
    },
    getMessages: async (userId) => {
        set({ isMessagesloading: true })
        try {
            const response = await axiosInstance.get(`/message/${userId}`)
            set({ messages: response.data })
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isMessagesLoading: false });
        }
    },
    setSelectedUser: (selectedUser) => set({ selectedUser }),

    sendMessage: async (messageData) => {
        const { selectedUser , messages } = get();
        try {
            const response = await axiosInstance.post(`/message/send/${selectedUser._id}`, messageData);
            set({ messages: [...messages, response.data] });
        } catch (error) {
            toast.error("send message",error.response.data.message);
        }
    },

    listenToMessages: () => {
       const { selectedUser } = get();
       if (!selectedUser) return;
    
       const socket = useAuthStore.getState().socket;
       socket.on("newMessage", (newMessage) => {

        if(newMessage.senderId !== selectedUser._id) return;

         set({
            messages: [...get().messages, newMessage]
         })
       })
    },

    unlistenToMessages: () => {
        const  socket = useAuthStore.getState().socket;
        socket.off("newMessage");
    }

})) 