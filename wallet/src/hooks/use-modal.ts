import { ModalMap } from "@/interface/modal";
import { create } from "zustand";

export const useModal = create<ModalMap>((set) => ({
    createId: {
        isOpen: false,
        onOpen: () => set((state) => ({ createId: { ...state.createId, isOpen: true } })),
        onClose: () => set((state) => ({ createId: { ...state.createId, isOpen: false } })),
    },
    deleteId: {
        isOpen: false,
        onOpen: () => set((state) => ({ deleteId: { ...state.deleteId, isOpen: true } })),
        onClose: () => set((state) => ({ deleteId: { ...state.deleteId, isOpen: false } })),
    },
    changeEmail: {
        isOpen: false,
        onOpen: () => set((state) => ({ changeEmail: { ...state.changeEmail, isOpen: true } })),
        onClose: () => set((state) => ({ changeEmail: { ...state.changeEmail, isOpen: false } })),
    },
    changeUserInfo: {
        isOpen: false,
        onOpen: () => set((state) => ({ changeUserInfo: { ...state.changeUserInfo, isOpen: true } })),
        onClose: () => set((state) => ({ changeUserInfo: { ...state.changeUserInfo, isOpen: false } })),
    },
}));