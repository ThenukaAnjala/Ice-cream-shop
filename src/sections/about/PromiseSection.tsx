import { motion } from "framer-motion"
import type { RefObject } from "react"

type Props = {
  sectionRef: RefObject<HTMLDivElement>
  counter: number
  onViewMenu: () => void
  onHoverStart: () => void
  onHoverEnd: () => void
}

export default function PromiseSection({
  sectionRef,
  counter,
  onViewMenu,
  onHoverStart,
  onHoverEnd,
}: Props) {
  return (
    <section
      ref={sectionRef}
      className="relative z-10 min-h-screen snap-start snap-stop bg-[#FFF4E8] px-6 py-24"
    >
      <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <motion.div
          className="relative h-56 w-56"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg viewBox="0 0 240 240" className="h-full w-full">
            <defs>
              <linearGradient id="dog" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#F9D6B8" />
                <stop offset="100%" stopColor="#F3B98F" />
              </linearGradient>
            </defs>
            <circle cx="120" cy="110" r="70" fill="url(#dog)" />
            <circle cx="90" cy="100" r="12" fill="#3F2A1B" />
            <circle cx="150" cy="100" r="12" fill="#3F2A1B" />
            <circle cx="90" cy="96" r="4" fill="#FFFFFF" />
            <circle cx="150" cy="96" r="4" fill="#FFFFFF" />
            <path
              d="M105 132c8 10 22 10 30 0"
              fill="none"
              stroke="#3F2A1B"
              strokeWidth="6"
              strokeLinecap="round"
            />
            <circle cx="120" cy="120" r="8" fill="#3F2A1B" />
            <path
              d="M170 160l24-20"
              stroke="#B45309"
              strokeWidth="8"
              strokeLinecap="round"
            />
            <circle cx="198" cy="132" r="10" fill="#F39AB8" />
          </svg>
        </motion.div>

        <p className="mt-4 text-xs uppercase tracking-[0.3em] text-slate-500">
          Our Promise
        </p>
        <h3 className="font-display mt-3 text-3xl sm:text-4xl">
          Our Promise to You
        </h3>
        <p className="mt-4 text-sm text-slate-600">
          We're committed to delivering joy in every spoonful, every single time.
        </p>

        <div className="mt-10">
          <p className="text-xs uppercase tracking-[0.35em] text-slate-500">
            Happiness Shared So Far
          </p>
          <div className="font-display mt-3 text-4xl text-slate-900 sm:text-5xl">
            {counter.toLocaleString()}+
          </div>
          <p className="mt-2 text-xs uppercase tracking-[0.3em] text-slate-500">
            Scoops
          </p>
        </div>

        <motion.button
          onClick={onViewMenu}
          onMouseEnter={onHoverStart}
          onMouseLeave={onHoverEnd}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="mt-10 rounded-full px-8 py-3 text-sm font-semibold text-white shadow-lg"
          style={{ backgroundColor: "#1C9A6E" }}
        >
          View Menu
        </motion.button>
      </div>
    </section>
  )
}
