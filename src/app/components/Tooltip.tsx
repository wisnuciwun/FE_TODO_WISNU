import { useEffect, useRef } from "react";

interface TooltipProps {
  open: boolean;
  setOpen: (v: boolean) => void;
  children: React.ReactNode;
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
}

export default function Tooltip({
  open,
  setOpen,
  children,
  position = "bottom-right",
}: TooltipProps) {
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        tooltipRef.current &&
        !tooltipRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open, setOpen]);

  if (!open) return null;

  const positionClasses = {
    "bottom-right": "top-full right-0",
    "bottom-left": "top-full left-0",
    "top-right": "bottom-full right-0",
    "top-left": "bottom-full left-0",
  };

  return (
    <div className="relative">
      <div
        ref={tooltipRef}
        className={`absolute ${positionClasses[position]} mt-2 w-48 bg-white shadow-lg rounded-lg p-3 z-50 border`}
      >
        {children}
      </div>
    </div>
  );
}
