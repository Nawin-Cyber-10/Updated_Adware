"use client"

import { cn } from "@/lib/utils"
import { AlertTriangle, Shield, Activity } from "lucide-react"

interface StatusIndicatorProps {
  status: "safe" | "warning" | "danger" | "active"
  title: string
  description: string
  className?: string
}

export function StatusIndicator({ status, title, description, className }: StatusIndicatorProps) {
  const statusConfig = {
    safe: {
      icon: Shield,
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/20",
      iconColor: "text-green-400",
      titleColor: "text-green-300",
      descColor: "text-green-200",
    },
    warning: {
      icon: AlertTriangle,
      bgColor: "bg-yellow-500/10",
      borderColor: "border-yellow-500/20",
      iconColor: "text-yellow-400",
      titleColor: "text-yellow-300",
      descColor: "text-yellow-200",
    },
    danger: {
      icon: AlertTriangle,
      bgColor: "bg-red-500/10",
      borderColor: "border-red-500/20",
      iconColor: "text-red-400",
      titleColor: "text-red-300",
      descColor: "text-red-200",
    },
    active: {
      icon: Activity,
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/20",
      iconColor: "text-blue-400",
      titleColor: "text-blue-300",
      descColor: "text-blue-200",
    },
  }

  const config = statusConfig[status]
  const Icon = config.icon

  return (
    <div
      className={cn("flex items-start gap-3 p-4 rounded-lg border", config.bgColor, config.borderColor, className)}
      role="status"
      aria-live="polite"
    >
      <Icon className={cn("h-5 w-5 mt-0.5 flex-shrink-0", config.iconColor)} />
      <div className="flex-1 min-w-0">
        <h3 className={cn("font-semibold text-sm", config.titleColor)}>{title}</h3>
        <p className={cn("text-sm mt-1", config.descColor)}>{description}</p>
      </div>
    </div>
  )
}
