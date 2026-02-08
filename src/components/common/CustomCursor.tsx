import { motion, type MotionValue } from "framer-motion"
import type { CursorVariant } from "../../hooks/useCursor"
import { withAlpha } from "../../utils/color"

type Props = {
  visible: boolean
  x: MotionValue<number>
  y: MotionValue<number>
  variant: CursorVariant
  accent: string
}

export default function CustomCursor({ visible, x, y, variant, accent }: Props) {
  if (!visible) return null

  const variants = {
    default: {
      scale: 1,
      opacity: 0.6,
      backgroundColor: withAlpha(accent, 0.16),
      borderColor: withAlpha(accent, 0.45),
    },
    hover: {
      scale: 1.6,
      opacity: 0.9,
      backgroundColor: accent,
      borderColor: withAlpha(accent, 0),
    },
  }

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[200] h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border backdrop-blur-sm"
      style={{ x, y }}
      variants={variants}
      animate={variant}
      transition={{ type: "spring", stiffness: 250, damping: 24 }}
    >
      <motion.div
        className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ backgroundColor: accent }}
        animate={{ scale: variant === "hover" ? 0.3 : 1 }}
        transition={{ duration: 0.2 }}
      />
    </motion.div>
  )
}
