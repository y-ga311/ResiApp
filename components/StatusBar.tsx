"use client";

import { Bell, Settings } from "lucide-react";
import Link from "next/link";

interface StatusBarProps {
  rightIcon?: "bell" | "settings" | "none";
  light?: boolean;
}

export default function StatusBar({ rightIcon = "bell", light = false }: StatusBarProps) {
  const textColor = light ? "text-white" : "text-t1";
  const iconColor = light ? "#FFFFFF" : "#1A1F2E";

  return (
    <div className={`flex items-center justify-end px-5 h-[52px] flex-shrink-0 ${light ? "" : "bg-card"}`}>
      <div className="flex items-center gap-2">
        {rightIcon === "bell" && (
          <Link href="/settings">
            <Bell size={22} color={iconColor} />
          </Link>
        )}
        {rightIcon === "settings" && (
          <Link href="/settings">
            <Settings size={22} color={iconColor} />
          </Link>
        )}
      </div>
    </div>
  );
}
