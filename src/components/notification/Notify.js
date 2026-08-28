// src/utils/notification.js
import toast from "react-hot-toast";

export const showSuccessToast = (message = "Operation successful!") => {
  toast.success(message);
};

export const showErrorToast = (message = "Something went wrong!") => {
  toast.error(message);
};

export const showInfoToast = (message) => {
  toast(message);
};