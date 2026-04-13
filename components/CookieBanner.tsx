"use client";

import { useCookieStore } from "@/store/cookieStore";

import { useState, useEffect } from "react";
import {
  Cookie,
  Settings,
  X,
  CheckCircle,
  Shield,
  BarChart,
  Target,
  LucideIcon,
} from "lucide-react";

// // Cookie Categories
// const cookieCategories = [
//   {
//     id: "essential",
//     name: "Essential",
//     icon: Shield,
//     description: "Required for the website to function",
//     disabled: true,
//   },
//   {
//     id: "functional",
//     name: "Functional",
//     icon: Settings,
//     description: "Remember your preferences",
//     disabled: false,
//   },
//   {
//     id: "analytics",
//     name: "Analytics",
//     icon: BarChart,
//     description: "Help us improve our website",
//     disabled: false,
//   },
//   {
//     id: "marketing",
//     name: "Marketing",
//     icon: Target,
//     description: "Personalized advertising",
//     disabled: false,
//   },
// ];

// // Main Cookie Banner Component
// export default function CookieBanner() {
//   const {
//     showBanner,
//     hasConsent,
//     preferences,
//     setShowBanner,
//     acceptAll,
//     rejectAll,
//     setPreferences,
//     setConsent,
//   } = useCookieStore();
//   const [showSettings, setShowSettings] = useState(false);
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   if (!mounted || !showBanner || hasConsent) {
//     return null;
//   }

//   const handleTogglePreference = (categoryId) => {
//     if (categoryId === "essential") return;

//     setPreferences({
//       ...preferences,
//       [categoryId]: !preferences[categoryId],
//     });
//   };

//   const handleSavePreferences = () => {
//     setConsent(true);
//   };

//   return (
//     <>
//       {/* Backdrop */}
//       {showSettings && (
//         <div
//           className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 animate-in fade-in duration-200"
//           onClick={() => setShowSettings(false)}
//         />
//       )}

//       {/* Cookie Settings Modal */}
//       {showSettings && (
//         <div className="fixed inset-x-4 top-1/2 -translate-y-1/2 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-2xl z-50 animate-in slide-in-from-bottom duration-300">
//           <div className="bg-white rounded-2xl shadow-2xl max-h-[90vh] overflow-hidden flex flex-col">
//             {/* Header */}
//             <div className="bg-green-600 p-6 text-white">
//               <div className="flex items-start justify-between">
//                 <div className="flex items-center gap-3">
//                   <div className="bg-white/20 p-3 rounded-full backdrop-blur-sm">
//                     <Cookie className="w-6 h-6" />
//                   </div>
//                   <div>
//                     <h2 className="text-2xl font-bold">Cookie Preferences</h2>
//                     <p className="text-orange-100 text-sm mt-1">
//                       Choose which cookies you'd like to accept
//                     </p>
//                   </div>
//                 </div>
//                 <button
//                   onClick={() => setShowSettings(false)}
//                   className="p-2 hover:bg-white/20 rounded-lg transition-colors"
//                 >
//                   <X className="w-5 h-5" />
//                 </button>
//               </div>
//             </div>

//             {/* Content */}
//             <div className="overflow-y-auto p-6 space-y-4 flex-1">
//               {cookieCategories.map((category) => {
//                 const Icon = category.icon;
//                 const isEnabled = preferences[category.id];

//                 return (
//                   <div
//                     key={category.id}
//                     className={`border-2 rounded-xl p-4 transition-all ${
//                       isEnabled
//                         ? "border-orange-300 bg-orange-50"
//                         : "border-gray-200 bg-white"
//                     }`}
//                   >
//                     <div className="flex items-start justify-between gap-4">
//                       <div className="flex items-start gap-3 flex-1">
//                         <div
//                           className={`p-2 rounded-lg ${
//                             isEnabled ? "bg-orange-100" : "bg-gray-100"
//                           }`}
//                         >
//                           <Icon
//                             className={`w-5 h-5 ${
//                               isEnabled ? "text-orange-600" : "text-gray-600"
//                             }`}
//                           />
//                         </div>
//                         <div className="flex-1">
//                           <div className="flex items-center gap-2 mb-1">
//                             <h3 className="font-bold text-gray-800">
//                               {category.name}
//                             </h3>
//                             {category.disabled && (
//                               <span className="bg-red-100 text-red-700 px-2 py-0.5 rounded text-xs font-semibold">
//                                 Required
//                               </span>
//                             )}
//                           </div>
//                           <p className="text-sm text-gray-600">
//                             {category.description}
//                           </p>
//                         </div>
//                       </div>

//                       {/* Toggle Switch */}
//                       <button
//                         onClick={() => handleTogglePreference(category.id)}
//                         disabled={category.disabled}
//                         className={`flex-shrink-0 ${
//                           category.disabled
//                             ? "cursor-not-allowed opacity-50"
//                             : "cursor-pointer"
//                         }`}
//                       >
//                         <div
//                           className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
//                             isEnabled ? "bg-orange-600" : "bg-gray-300"
//                           }`}
//                         >
//                           <span
//                             className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
//                               isEnabled ? "translate-x-6" : "translate-x-1"
//                             }`}
//                           />
//                         </div>
//                       </button>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>

//             {/* Footer */}
//             <div className="border-t border-gray-200 p-6 bg-gray-50">
//               <div className="flex flex-col sm:flex-row gap-3">
//                 <button
//                   onClick={() => {
//                     acceptAll();
//                     setShowSettings(false);
//                   }}
//                   className="flex-1 bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-bold transition-colors"
//                 >
//                   Accept All
//                 </button>
//                 <button
//                   onClick={() => {
//                     handleSavePreferences();
//                     setShowSettings(false);
//                   }}
//                   className="flex-1 bg-gray-800 hover:bg-gray-900 text-white px-6 py-3 rounded-lg font-bold transition-colors"
//                 >
//                   Save Preferences
//                 </button>
//                 <button
//                   onClick={() => {
//                     rejectAll();
//                     setShowSettings(false);
//                   }}
//                   className="flex-1 border-2 border-gray-300 hover:border-gray-400 text-gray-700 px-6 py-3 rounded-lg font-bold transition-colors"
//                 >
//                   Reject All
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Cookie Banner */}
//       <div className="fixed bottom-0 left-0 right-0 z-40 p-4 md:p-6 animate-in slide-in-from-bottom duration-500">
//         <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-2xl border-2 border-gray-200 overflow-hidden">
//           <div className="bg-green-600 px-6 py-3">
//             <div className="flex items-center gap-2 text-white">
//               <Cookie className="w-5 h-5" />
//               <span className="font-bold text-sm">We value your privacy</span>
//             </div>
//           </div>

//           <div className="p-6">
//             <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
//               <div className="flex-1">
//                 <p className="text-gray-700 leading-relaxed">
//                   We use cookies to enhance your browsing experience, serve
//                   personalized content, and analyze our traffic. By clicking{" "}
//                   <strong>"Accept All"</strong>, you consent to our use of
//                   cookies.{" "}
//                   <a
//                     href="/privacy"
//                     className="text-orange-600 hover:text-orange-700 font-medium underline"
//                   >
//                     Learn more
//                   </a>
//                 </p>
//               </div>

//               <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
//                 <button
//                   onClick={acceptAll}
//                   className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-bold transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
//                 >
//                   <CheckCircle className="w-5 h-5" />
//                   Accept All
//                 </button>
//                 <button
//                   onClick={() => setShowSettings(true)}
//                   className="border-2 border-gray-300 hover:border-orange-600 text-gray-700 hover:text-orange-600 px-6 py-3 rounded-lg font-bold transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
//                 >
//                   <Settings className="w-5 h-5" />
//                   Customize
//                 </button>
//                 <button
//                   onClick={rejectAll}
//                   className="text-gray-600 hover:text-gray-800 px-6 py-3 rounded-lg font-medium transition-colors whitespace-nowrap"
//                 >
//                   Reject All
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// Types
type CookieCategory = "essential" | "functional" | "analytics" | "marketing";

interface CategoryConfig {
  id: CookieCategory;
  name: string;
  icon: LucideIcon;
  description: string;
  disabled: boolean;
}

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

// Cookie Categories
const cookieCategories: CategoryConfig[] = [
  {
    id: "essential",
    name: "Essential",
    icon: Shield,
    description: "Required for the website to function",
    disabled: true,
  },
  {
    id: "functional",
    name: "Functional",
    icon: Settings,
    description: "Remember your preferences",
    disabled: false,
  },
  {
    id: "analytics",
    name: "Analytics",
    icon: BarChart,
    description: "Help us improve our website",
    disabled: false,
  },
  {
    id: "marketing",
    name: "Marketing",
    icon: Target,
    description: "Personalized advertising",
    disabled: false,
  },
];

// Main Cookie Banner Component
export default function CookieBanner() {
  const {
    showBanner,
    hasConsent,
    preferences,
    // setShowBanner,
    acceptAll,
    rejectAll,
    setPreferences,
    setConsent,
  } = useCookieStore();
  const [showSettings, setShowSettings] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !showBanner || hasConsent) {
    return null;
  }

  const handleTogglePreference = (categoryId: CookieCategory) => {
    if (categoryId === "essential") return;

    setPreferences({
      ...preferences,
      [categoryId]: !preferences[categoryId],
    });
  };

  const handleSavePreferences = () => {
    setConsent(true);
  };

  return (
    <>
      {/* Backdrop */}
      {showSettings && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 animate-in fade-in duration-200"
          onClick={() => setShowSettings(false)}
        />
      )}

      {/* Cookie Settings Modal */}
      {showSettings && (
        <div className="fixed inset-x-4 top-1/2 -translate-y-1/2 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-2xl z-50 animate-in slide-in-from-bottom duration-300">
          <div className="bg-white rounded-2xl shadow-2xl max-h-[90vh] overflow-hidden flex flex-col">
            {/* Header */}
            <div className="bg-green-600 p-6 text-white">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 p-3 rounded-full backdrop-blur-sm">
                    <Cookie className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">Cookie Preferences</h2>
                    <p className="text-green-100 text-sm mt-1">
                      Choose which cookies you'd like to accept
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowSettings(false)}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="overflow-y-auto p-6 space-y-4 flex-1">
              {cookieCategories.map((category) => {
                const Icon = category.icon;
                const isEnabled = preferences[category.id];

                return (
                  <div
                    key={category.id}
                    className={`border-2 rounded-xl p-4 transition-all ${
                      isEnabled
                        ? "border-green-300 bg-green-50"
                        : "border-gray-200 bg-white"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3 flex-1">
                        <div
                          className={`p-2 rounded-lg ${
                            isEnabled ? "bg-grren-100" : "bg-gray-100"
                          }`}
                        >
                          <Icon
                            className={`w-5 h-5 ${
                              isEnabled ? "text-green-600" : "text-gray-600"
                            }`}
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-bold text-gray-800">
                              {category.name}
                            </h3>
                            {category.disabled && (
                              <span className="bg-red-100 text-red-700 px-2 py-0.5 rounded text-xs font-semibold">
                                Required
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600">
                            {category.description}
                          </p>
                        </div>
                      </div>

                      {/* Toggle Switch */}
                      <button
                        onClick={() => handleTogglePreference(category.id)}
                        disabled={category.disabled}
                        className={`flex-shrink-0 ${
                          category.disabled
                            ? "cursor-not-allowed opacity-50"
                            : "cursor-pointer"
                        }`}
                      >
                        <div
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            isEnabled ? "bg-green-600" : "bg-gray-300"
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              isEnabled ? "translate-x-6" : "translate-x-1"
                            }`}
                          />
                        </div>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footer */}
            <div className="border-t border-gray-200 p-6 bg-gray-50">
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => {
                    acceptAll();
                    setShowSettings(false);
                  }}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-bold transition-colors"
                >
                  Accept All
                </button>
                <button
                  onClick={() => {
                    handleSavePreferences();
                    setShowSettings(false);
                  }}
                  className="flex-1 bg-gray-800 hover:bg-gray-900 text-white px-6 py-3 rounded-lg font-bold transition-colors"
                >
                  Save Preferences
                </button>
                <button
                  onClick={() => {
                    rejectAll();
                    setShowSettings(false);
                  }}
                  className="flex-1 border-2 border-gray-300 hover:border-gray-400 text-gray-700 px-6 py-3 rounded-lg font-bold transition-colors"
                >
                  Reject All
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cookie Banner */}
      <div className="fixed bottom-0 left-0 right-0 z-40 p-4 md:p-6 animate-in slide-in-from-bottom duration-500">
        <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-2xl border-2 border-gray-200 overflow-hidden">
          <div className="bg-green-600 px-6 py-3">
            <div className="flex items-center gap-2 text-white">
              <Cookie className="w-5 h-5" />
              <span className="font-bold text-sm">We value your privacy</span>
            </div>
          </div>

          <div className="p-6">
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
              <div className="flex-1">
                <p className="text-gray-700 leading-relaxed">
                  We use cookies to enhance your browsing experience, serve
                  personalized content, and analyze our traffic. By clicking{" "}
                  <strong>"Accept All"</strong>, you consent to our use of
                  cookies.{" "}
                  <a
                    href="/privacy"
                    className="text-green-600 hover:text-green-700 font-medium underline"
                  >
                    Learn more
                  </a>
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                <button
                  onClick={acceptAll}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-bold transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  <CheckCircle className="w-5 h-5" />
                  Accept All
                </button>
                <button
                  onClick={() => setShowSettings(true)}
                  className="border-2 border-gray-300 hover:border-green-600 text-gray-700 hover:text-green-600 px-6 py-3 rounded-lg font-bold transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  <Settings className="w-5 h-5" />
                  Customize
                </button>
                <button
                  onClick={rejectAll}
                  className="text-gray-600 hover:text-gray-800 px-6 py-3 rounded-lg font-medium transition-colors whitespace-nowrap"
                >
                  Reject All
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
