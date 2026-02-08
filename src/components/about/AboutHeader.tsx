import { motion } from "framer-motion"

type Props = {
  onHome: () => void
  onMenu: () => void
  onContact: () => void
  onHoverStart: () => void
  onHoverEnd: () => void
}

export default function AboutHeader({
  onHome,
  onMenu,
  onContact,
  onHoverStart,
  onHoverEnd,
}: Props) {
  return (
    <header className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:py-6">
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
          onClick={onMenu}
          onMouseEnter={onHoverStart}
          onMouseLeave={onHoverEnd}
          className="cursor-pointer transition-colors hover:text-slate-900"
          whileHover={{ y: -2 }}
        >
          Menu
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
    </header>
  )
}
