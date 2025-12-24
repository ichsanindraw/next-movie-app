"use client";

import { useEffect, useState } from "react";

type Props = {
  message: string;
  type?: "error" | "success";
  duration?: number;
  onClose: () => void;
};

export default function Toast({
  message,
  type = "error",
  duration = 3000,
  onClose,
}: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);

    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 300);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div
      className={`
        fixed bottom-0 left-0 z-50 w-full
        transform transition-all duration-300 ease-out
        ${visible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}
      `}
    >
      <div
        className={`
          mx-4 mb-4 rounded-xl px-4 py-3 text-sm text-white shadow-lg
          ${type === "error" ? "bg-red-600" : "bg-green-600"}
        `}
      >
        {message}
      </div>
    </div>
  );
}
