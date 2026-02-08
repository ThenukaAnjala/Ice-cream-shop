import { useEffect, useState } from "react"
import { useMotionValue, useSpring } from "framer-motion"

export type CursorVariant = "default" | "hover"

export const useCursor = () => {
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const cursorXSpring = useSpring(cursorX, { stiffness: 500, damping: 40, mass: 0.3 })
  const cursorYSpring = useSpring(cursorY, { stiffness: 500, damping: 40, mass: 0.3 })
  const [cursorVariant, setCursorVariant] = useState<CursorVariant>("default")
  const [cursorVisible, setCursorVisible] = useState(true)

  useEffect(() => {
    const media = window.matchMedia("(pointer: fine)")
    setCursorVisible(media.matches)
    const handleChange = (event: MediaQueryListEvent) => setCursorVisible(event.matches)
    media.addEventListener("change", handleChange)
    return () => media.removeEventListener("change", handleChange)
  }, [])

  useEffect(() => {
    if (!cursorVisible) return

    const handleMove = (event: globalThis.MouseEvent) => {
      cursorX.set(event.clientX)
      cursorY.set(event.clientY)
    }
    const handleLeave = () => {
      cursorX.set(-100)
      cursorY.set(-100)
    }

    window.addEventListener("mousemove", handleMove)
    window.addEventListener("mouseleave", handleLeave)
    return () => {
      window.removeEventListener("mousemove", handleMove)
      window.removeEventListener("mouseleave", handleLeave)
    }
  }, [cursorVisible, cursorX, cursorY])

  return {
    cursorVisible,
    cursorVariant,
    setCursorVariant,
    cursorXSpring,
    cursorYSpring,
  }
}
