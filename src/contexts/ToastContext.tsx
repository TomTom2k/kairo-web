"use client";

import React, { createContext, useContext, useCallback } from "react";

import { toast, ToastOptions } from "react-toastify";

import { ApiError } from "@/lib/axiosConfig";
import { translateErrorMessage } from "@/lib/errorTranslations";

interface ToastContextType {
  showSuccess: (message: string, options?: ToastOptions) => void;
  showError: (message: string, options?: ToastOptions) => void;
  showWarning: (message: string, options?: ToastOptions) => void;
  showInfo: (message: string, options?: ToastOptions) => void;
  showApiError: (error: unknown, options?: ToastOptions) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

interface ToastProviderProps {
  children: React.ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const showSuccess = useCallback((message: string, options?: ToastOptions) => {
    toast.success(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      ...options,
    });
  }, []);

  const showError = useCallback((message: string, options?: ToastOptions) => {
    toast.error(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      ...options,
    });
  }, []);

  const showWarning = useCallback((message: string, options?: ToastOptions) => {
    toast.warning(message, {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      ...options,
    });
  }, []);

  const showInfo = useCallback((message: string, options?: ToastOptions) => {
    toast.info(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      ...options,
    });
  }, []);

  const showApiError = useCallback(
    (error: unknown, options?: ToastOptions) => {
      let message = "";

      if (error instanceof ApiError) {
        // Map specific error codes
        switch (error.statusCode) {
          case 400:
            // Map 400 errors to specific messages
            if (error.errorCode) {
              const errorKey = `errors.400.${error.errorCode}`;
              message = translateErrorMessage(errorKey);
            } else {
              message = translateErrorMessage("errors.400.GENERAL");
            }
            break;
          case 401:
            message = translateErrorMessage("errors.401");
            break;
          case 403:
            message = translateErrorMessage("errors.403");
            break;
          case 404:
            message = translateErrorMessage("errors.404");
            break;
          case 422:
            message = translateErrorMessage("errors.422");
            break;
          case 500:
            message = translateErrorMessage("errors.500");
            break;
          default:
            message = Array.isArray(error.originalMessage)
              ? error.originalMessage[0]
              : (error.originalMessage as string);
        }
      } else if (error instanceof Error) {
        message = error.message;
      } else {
        message = translateErrorMessage("errors.UNKNOWN_ERROR");
      }

      showError(message, options);
    },
    [showError]
  );

  const value: ToastContextType = {
    showSuccess,
    showError,
    showWarning,
    showInfo,
    showApiError,
  };

  return (
    <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
  );
};
