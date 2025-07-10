"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, ArrowRight } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface SimulationCardProps {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  href: string
  estimatedTime?: string
  className?: string
}

export function SimulationCard({
  id,
  title,
  description,
  icon,
  difficulty,
  href,
  estimatedTime = "5-10 min",
  className,
}: SimulationCardProps) {
  const difficultyColors = {
    Beginner: "bg-green-500/10 text-green-400 border-green-500/20",
    Intermediate: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    Advanced: "bg-red-500/10 text-red-400 border-red-500/20",
  }

  return (
    <Card
      className={cn(
        "group bg-gray-800/50 border-gray-700 hover:border-gray-600 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/10",
        className,
      )}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gray-700/50 text-red-400 group-hover:bg-red-500/10 group-hover:text-red-300 transition-colors">
              {icon}
            </div>
            <div className="flex-1">
              <CardTitle className="text-lg text-white group-hover:text-red-100 transition-colors">{title}</CardTitle>
              <div className="flex items-center gap-2 mt-1">
                <Badge className={cn("text-xs border", difficultyColors[difficulty])}>{difficulty}</Badge>
                <span className="text-xs text-gray-400">• {estimatedTime}</span>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-gray-300 text-sm mb-4 leading-relaxed">{description}</p>
        <Link href={href}>
          <Button
            className="w-full bg-red-600 hover:bg-red-700 text-white group-hover:shadow-md transition-all duration-300"
            size="sm"
          >
            <Play className="h-4 w-4 mr-2" />
            Start Simulation
            <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}
