import { motion } from "framer-motion"

type Props = {
  cartCount: number
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
  onCartOpen,
  onMenuOpen,
  onHome,
  onAbout,
  onContact,
  onHoverStart,
  onHoverEnd,
}: Props) {
  return (
    <header className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
      <div className="text-xl font-semibold tracking-[0.3em]">SCOOPY DOO</div>
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
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/70 shadow-sm backdrop-blur"
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
    </header>
  )
}
