import { create } from "zustand";

export interface Toast {
  id: string;
  type: "success" | "error" | "info" | "warning";
  message: string;
  duration?: number;
}

interface UIStore {
  toasts: Toast[];
  isMobileMenuOpen: boolean;
  isSearchOpen: boolean;

  // Toast actions
  addToast: (toast: Omit<Toast, "id">) => void;
  removeToast: (id: string) => void;
  clearToasts: () => void;

  // UI actions
  toggleMobileMenu: () => void;
  closeMobileMenu: () => void;
  toggleSearch: () => void;
  closeSearch: () => void;
}

export const useUIStore = create<UIStore>((set, get) => ({
  toasts: [],
  isMobileMenuOpen: false,
  isSearchOpen: false,

  addToast: (toast) => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    const newToast: Toast = {
      ...toast,
      id,
      duration: toast.duration || 3000,
    };

    set({ toasts: [...get().toasts, newToast] });

    // Auto remove after duration
    setTimeout(() => {
      get().removeToast(id);
    }, newToast.duration);
  },

  removeToast: (id) => {
    set({ toasts: get().toasts.filter((toast) => toast.id !== id) });
  },

  clearToasts: () => {
    set({ toasts: [] });
  },

  toggleMobileMenu: () => {
    set({ isMobileMenuOpen: !get().isMobileMenuOpen });
  },

  closeMobileMenu: () => {
    set({ isMobileMenuOpen: false });
  },

  toggleSearch: () => {
    set({ isSearchOpen: !get().isSearchOpen });
  },

  closeSearch: () => {
    set({ isSearchOpen: false });
  },
}));

// Helper function to show toast notifications
export const showToast = {
  success: (message: string, duration?: number) => {
    useUIStore.getState().addToast({ type: "success", message, duration });
  },
  error: (message: string, duration?: number) => {
    useUIStore.getState().addToast({ type: "error", message, duration });
  },
  info: (message: string, duration?: number) => {
    useUIStore.getState().addToast({ type: "info", message, duration });
  },
  warning: (message: string, duration?: number) => {
    useUIStore.getState().addToast({ type: "warning", message, duration });
  },
};
