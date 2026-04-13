"use client";
import { useEffect } from "react";
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react";
import { useUIStore, type Toast } from "@/store/uiStore";

export default function ToastContainer() {
  const toasts = useUIStore((state) => state.toasts);
  const removeToast = useUIStore((state) => state.removeToast);

  const getIcon = (type: Toast["type"]) => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-5 h-5" />;
      case "error":
        return <AlertCircle className="w-5 h-5" />;
      case "warning":
        return <AlertTriangle className="w-5 h-5" />;
      case "info":
        return <Info className="w-5 h-5" />;
    }
  };

  const getStyles = (type: Toast["type"]) => {
    switch (type) {
      case "success":
        return "bg-green-50 border-green-500 text-green-900";
      case "error":
        return "bg-red-50 border-red-500 text-red-900";
      case "warning":
        return "bg-yellow-50 border-yellow-500 text-yellow-900";
      case "info":
        return "bg-blue-50 border-blue-500 text-blue-900";
    }
  };

  const getIconColor = (type: Toast["type"]) => {
    switch (type) {
      case "success":
        return "text-green-600";
      case "error":
        return "text-red-600";
      case "warning":
        return "text-yellow-600";
      case "info":
        return "text-blue-600";
    }
  };

  return (
    <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-2 max-w-md">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`flex items-start gap-3 p-4 rounded-lg border-l-4 shadow-lg animate-slide-in ${getStyles(
            toast.type
          )}`}
        >
          <div className={getIconColor(toast.type)}>{getIcon(toast.type)}</div>

          <p className="flex-1 text-sm font-medium">{toast.message}</p>

          <button
            onClick={() => removeToast(toast.id)}
            className="flex-shrink-0 hover:opacity-70 transition-opacity"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}

      <style jsx>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
