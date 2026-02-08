import { useEffect } from "react"

export const useScrollLock = (locked: boolean) => {
  useEffect(() => {
    const original = document.body.style.overflow
    document.body.style.overflow = locked ? "hidden" : original
    return () => {
      document.body.style.overflow = original
    }
  }, [locked])
}
