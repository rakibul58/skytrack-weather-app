import { capitalizeWords } from "../utils/helper";
import { motion } from "motion/react";
import { AlertCircle, X } from "lucide-react";
import { useState } from "react";

interface ErrorMessageProps {
  message: string;
  title?: string;
  isDismissible?: boolean;
  severity?: "error" | "warning" | "info";
  onDismiss?: () => void;
}

const ErrorMessage = ({
  message,
  title = "Error",
  isDismissible = true,
  severity = "error",
  onDismiss
}: ErrorMessageProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const formattedMessage = capitalizeWords(message);
  
  const colorConfig = {
    error: {
      bg: "bg-red-50",
      border: "border-red-500",
      text: "text-red-700",
      icon: "text-red-500"
    },
    warning: {
      bg: "bg-yellow-50",
      border: "border-yellow-500",
      text: "text-yellow-700",
      icon: "text-yellow-500"
    },
    info: {
      bg: "bg-blue-50",
      border: "border-blue-500",
      text: "text-blue-700",
      icon: "text-blue-500"
    }
  };

  const colors = colorConfig[severity];
  
  const handleDismiss = () => {
    setIsVisible(false);
    if (onDismiss) onDismiss();
  };
  
  if (!isVisible) return null;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
      className={`${colors.bg} border-l-4 ${colors.border} ${colors.text} p-4 my-4 rounded-md shadow-sm w-full flex items-start`}
    >
      <div className={`${colors.icon} mr-3 flex-shrink-0 mt-1`}>
        <AlertCircle size={20} />
      </div>
      <div className="flex-grow">
        <p className="font-semibold mb-1">{title}</p>
        <p className="text-sm opacity-90">{formattedMessage}</p>
      </div>
      {isDismissible && (
        <button 
          onClick={handleDismiss}
          className={`ml-3 ${colors.text} hover:bg-opacity-20 hover:bg-gray-500 p-1 rounded-full flex-shrink-0 transition-colors duration-200`}
          aria-label="Dismiss"
        >
          <X size={16} />
        </button>
      )}
    </motion.div>
  );
};

export default ErrorMessage;