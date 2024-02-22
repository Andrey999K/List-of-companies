import { toast } from "react-toastify";

const notification = (type: "info" | "error" | "success" | "warning", text: string, duration?: number) => {
  toast[type](text, {
    position: "top-right",
    autoClose: duration || 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "light"
  });
};

export default notification;
