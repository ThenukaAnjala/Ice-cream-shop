import { useRef, useState, type MouseEvent } from "react"
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion"
import { useScrollLock } from "../../hooks/useScrollLock"
import { hexToRgb, withAlpha } from "../../utils/color"

type Props = {
  cartCount: number
  accentColor: string
  onCartOpen: () => void
  onMenuOpen: () => void
  onHome: () => void
  onAbout: () => void
  onContact: () => void
  onHoverStart: () => void
  onHoverEnd: () => void
}

export default function HomeHeader({
  cartCount,
  accentColor,
  onCartOpen,
  onMenuOpen,
  onHome,
  onAbout,
  onContact,
  onHoverStart,
  onHoverEnd,
}: Props) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const magnetX = useMotionValue(0)
  const magnetY = useMotionValue(0)
  const springX = useSpring(magnetX, { stiffness: 260, damping: 18 })
  const springY = useSpring(magnetY, { stiffness: 260, damping: 18 })
  const buttonRef = useRef<HTMLButtonElement | null>(null)

  useScrollLock(mobileOpen)

  const toggleMobileMenu = () => {
    if (navigator.vibrate) {
      navigator.vibrate(12)
    }
    setMobileOpen((prev) => !prev)
  }

  const closeMobileMenu = () => setMobileOpen(false)

  const handleMagnetMove = (event: MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return
    const rect = buttonRef.current.getBoundingClientRect()
    const x = event.clientX - rect.left - rect.width / 2
    const y = event.clientY - rect.top - rect.height / 2
    const intensity = 0.15
    magnetX.set(x * intensity)
    magnetY.set(y * intensity)
  }

  const resetMagnet = () => {
    magnetX.set(0)
    magnetY.set(0)
  }

  const links = [
    { label: "Home", onClick: onHome },
    { label: "Menu", onClick: onMenuOpen },
    { label: "About", onClick: onAbout },
    { label: "Contact", onClick: onContact },
  ]
  const { r, g, b } = hexToRgb(accentColor)
  const brightness = r * 0.299 + g * 0.587 + b * 0.114
  const iconColor = brightness < 155 ? "#F8FAFC" : "#0F172A"

  return (
    <header className="relative z-40 mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:py-6">
      <div className="text-lg font-semibold tracking-[0.26em] sm:text-xl sm:tracking-[0.3em]">
        SCOOPY DOO
      </div>
      <nav className="hidden gap-8 text-xs uppercase tracking-[0.3em] text-slate-700 md:flex">
        <motion.button
          onClick={onHome}
          onMouseEnter={onHoverStart}
          onMouseLeave={onHoverEnd}
          className="cursor-pointer transition-colors hover:text-slate-900"
          whileHover={{ y: -2 }}
        >
          Home
        </motion.button>
        <motion.button
          onClick={onMenuOpen}
          onMouseEnter={onHoverStart}
          onMouseLeave={onHoverEnd}
          className="cursor-pointer transition-colors hover:text-slate-900"
          whileHover={{ y: -2 }}
        >
          Menu
        </motion.button>
        <motion.button
          onClick={onAbout}
          onMouseEnter={onHoverStart}
          onMouseLeave={onHoverEnd}
          className="cursor-pointer transition-colors hover:text-slate-900"
          whileHover={{ y: -2 }}
        >
          About
        </motion.button>
        <motion.button
          onClick={onContact}
          onMouseEnter={onHoverStart}
          onMouseLeave={onHoverEnd}
          className="cursor-pointer transition-colors hover:text-slate-900"
          whileHover={{ y: -2 }}
        >
          Contact
        </motion.button>
      </nav>
      <div className="flex items-center gap-3">
        <motion.button
          ref={buttonRef}
          onClick={toggleMobileMenu}
          onMouseEnter={onHoverStart}
          onMouseLeave={() => {
            onHoverEnd()
            resetMagnet()
          }}
          onMouseMove={handleMagnetMove}
          whileTap={{ scale: 0.95 }}
          className="relative flex h-11 w-11 items-center justify-center rounded-full shadow-sm md:hidden"
          aria-pressed={mobileOpen}
          style={{
            x: springX,
            y: springY,
            backgroundColor: withAlpha(accentColor, 0.22),
            border: `1px solid ${withAlpha(accentColor, 0.35)}`,
          }}
          aria-label="Toggle menu"
        >
          <span className="sr-only">Toggle menu</span>
          <motion.span
            className="absolute h-0.5 w-6 rounded-full bg-slate-900"
            style={{ backgroundColor: iconColor }}
            animate={mobileOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -6 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
          />
          <motion.span
            className="absolute h-0.5 w-6 rounded-full bg-slate-900"
            style={{ backgroundColor: iconColor }}
            animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.2 }}
          />
          <motion.span
            className="absolute h-0.5 w-6 rounded-full bg-slate-900"
            style={{ backgroundColor: iconColor }}
            animate={mobileOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 6 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
          />
        </motion.button>
        <motion.button
          onClick={onCartOpen}
          onMouseEnter={onHoverStart}
          onMouseLeave={onHoverEnd}
          whileHover={{ y: -2, scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white/70 shadow-sm backdrop-blur"
        >
          {cartCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--accent)] text-[10px] font-semibold text-white">
              {cartCount}
            </span>
          )}
          <svg viewBox="0 0 24 24" className="h-5 w-5">
            <path
              d="M6 6h15l-1.5 9h-11z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="9" cy="20" r="1.6" />
            <circle cx="18" cy="20" r="1.6" />
          </svg>
        </motion.button>
        <motion.button
          onMouseEnter={onHoverStart}
          onMouseLeave={onHoverEnd}
          whileHover={{ y: -2, scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          className="hidden h-10 w-10 items-center justify-center rounded-full bg-white/70 shadow-sm backdrop-blur md:flex"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5">
            <circle
              cx="12"
              cy="8"
              r="3.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
            />
            <path
              d="M4 20c2.5-4 13.5-4 16 0"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
        </motion.button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-[150] md:hidden"
            initial={{ clipPath: "circle(0% at 92% 48px)", opacity: 0 }}
            animate={{ clipPath: "circle(200% at 92% 48px)", opacity: 1 }}
            exit={{ clipPath: "circle(0% at 92% 48px)", opacity: 0 }}
            transition={{ duration: 0.55, ease: "easeInOut" }}
          >
            <div
              className="absolute inset-0 backdrop-blur-2xl"
              style={{
                background: `linear-gradient(140deg, ${withAlpha(
                  accentColor,
                  0.22
                )} 0%, rgba(255,255,255,0.85) 55%, rgba(255,245,248,0.92) 100%)`,
              }}
            />
            <motion.div
              className="relative flex min-h-full flex-col items-center justify-center gap-6 px-6 text-center"
              initial="closed"
              animate="open"
              exit="closed"
              variants={{
                open: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
                closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
              }}
            >
              {links.map((link) => (
                <motion.button
                  key={link.label}
                  variants={{
                    open: { opacity: 1, y: 0 },
                    closed: { opacity: 0, y: 24 },
                  }}
                  onClick={() => {
                    closeMobileMenu()
                    link.onClick()
                  }}
                  onMouseEnter={onHoverStart}
                  onMouseLeave={onHoverEnd}
                  className="group flex items-center gap-3 font-display text-3xl text-slate-900"
                >
                  <span
                    className="h-2 w-2 rounded-full opacity-0 transition duration-200 group-hover:opacity-100"
                    style={{ backgroundColor: accentColor }}
                  />
                  <span className="rounded-full bg-white/70 px-5 py-2 shadow-sm backdrop-blur">
                    {link.label}
                  </span>
                </motion.button>
              ))}
              <motion.button
                variants={{
                  open: { opacity: 1, y: 0 },
                  closed: { opacity: 0, y: 24 },
                }}
                onClick={closeMobileMenu}
                className="mt-6 rounded-full border border-white/70 bg-white/60 px-6 py-2 text-xs uppercase tracking-[0.3em] text-slate-600"
              >
                Close
              </motion.button>
            </motion.div>

            {[...Array(6)].map((_, index) => (
              <motion.span
                key={`sprinkle-${index}`}
                className="absolute h-2 w-2 rounded-full bg-white/70"
                style={{
                  left: `${12 + index * 12}%`,
                  top: `${18 + (index % 3) * 22}%`,
                }}
                animate={{ y: [0, -12, 0], x: [0, 8, 0] }}
                transition={{ duration: 6 + index, repeat: Infinity, ease: "easeInOut" }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
