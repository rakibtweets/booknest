"use client"

import { useState } from "react"
import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

interface RatingProps {
  value?: number
  onChange: (value: number) => void
  max?: number
  className?: string
}

export function Rating({ value = 0, onChange, max = 5, className }: RatingProps) {
  const [hoverValue, setHoverValue] = useState(0)

  return (
    <div className={cn("flex gap-1", className)}>
      {[...Array(max)].map((_, i) => {
        const ratingValue = i + 1
        return (
          <Star
            key={i}
            className={cn(
              "h-6 w-6 cursor-pointer transition-all",
              (hoverValue || value) >= ratingValue
                ? "fill-yellow-400 text-yellow-400"
                : "fill-transparent text-gray-300",
            )}
            onMouseEnter={() => setHoverValue(ratingValue)}
            onMouseLeave={() => setHoverValue(0)}
            onClick={() => onChange(ratingValue)}
          />
        )
      })}
    </div>
  )
}
