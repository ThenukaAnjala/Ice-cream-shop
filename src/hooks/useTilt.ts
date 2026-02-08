import { useSpring, useMotionValue } from "framer-motion"
import type { MouseEvent as ReactMouseEvent } from "react"

export const useTilt = () => {
  const tiltX = useSpring(useMotionValue(0), {
    stiffness: 140,
    damping: 18,
    mass: 0.4,
  })
  const tiltY = useSpring(useMotionValue(0), {
    stiffness: 140,
    damping: 18,
    mass: 0.4,
  })

  const handleTilt = (event: ReactMouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width - 0.5
    const y = (event.clientY - rect.top) / rect.height - 0.5
    tiltX.set(-y * 10)
    tiltY.set(x * 10)
  }

  const resetTilt = () => {
    tiltX.set(0)
    tiltY.set(0)
  }

  return { tiltX, tiltY, handleTilt, resetTilt }
}
