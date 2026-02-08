import { useState } from "react"
import { motion } from "framer-motion"

type Props = {
  onClick: () => void
  onHoverStart?: () => void
  onHoverEnd?: () => void
  ariaLabel?: string
}

export default function BackButton({
  onClick,
  onHoverStart,
  onHoverEnd,
  ariaLabel = "Back",
}: Props) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.button
      onClick={onClick}
      onMouseEnter={() => {
        setHovered(true)
        onHoverStart?.()
      }}
      onMouseLeave={() => {
        setHovered(false)
        onHoverEnd?.()
      }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.98 }}
      className="fixed left-6 top-6 z-[130] flex h-12 w-12 items-center justify-center rounded-full border border-white/70 bg-white/80 shadow-lg backdrop-blur"
      aria-label={ariaLabel}
    >
      <motion.span
        animate={hovered ? { x: [0, -4, 0] } : { x: 0 }}
        transition={
          hovered
            ? { duration: 0.6, repeat: Infinity, repeatType: "mirror" }
            : { duration: 0.2 }
        }
        className="text-slate-700"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5">
          <path
            d="M15 5l-7 7 7 7"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.span>
    </motion.button>
  )
}
