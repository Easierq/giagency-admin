import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CookiePreferences {
  essential: boolean;
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
}

interface CookieStore {
  hasConsent: boolean;
  showBanner: boolean;
  preferences: CookiePreferences;
  setConsent: (hasConsent: boolean) => void;
  setShowBanner: (showBanner: boolean) => void;
  setPreferences: (preferences: CookiePreferences) => void;
  acceptAll: () => void;
  rejectAll: () => void;
}

export const useCookieStore = create<CookieStore>()(
  persist(
    (set) => ({
      hasConsent: false,
      showBanner: true,
      preferences: {
        essential: true,
        functional: false,
        analytics: false,
        marketing: false,
      },
      setConsent: (hasConsent) => set({ hasConsent, showBanner: false }),
      setShowBanner: (showBanner) => set({ showBanner }),
      setPreferences: (preferences) => set({ preferences }),
      acceptAll: () =>
        set({
          hasConsent: true,
          showBanner: false,
          preferences: {
            essential: true,
            functional: true,
            analytics: true,
            marketing: true,
          },
        }),
      rejectAll: () =>
        set({
          hasConsent: true,
          showBanner: false,
          preferences: {
            essential: true,
            functional: false,
            analytics: false,
            marketing: false,
          },
        }),
    }),
    {
      name: "cookie-consent-storage",
    }
  )
);
