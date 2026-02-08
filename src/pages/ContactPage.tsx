import { useEffect, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"
import { useNavigate } from "react-router-dom"

type FloatingDot = {
  id: string
  size: number
  x: string
  y: string
  color: string
}

const floatingDots: FloatingDot[] = [
  { id: "f1", size: 18, x: "6%", y: "10%", color: "#F7B4C9" },
  { id: "f2", size: 12, x: "18%", y: "80%", color: "#F5C5A9" },
  { id: "f3", size: 24, x: "84%", y: "14%", color: "#F39AB8" },
  { id: "f4", size: 14, x: "78%", y: "72%", color: "#F5C5A9" },
  { id: "f5", size: 10, x: "48%", y: "6%", color: "#F39AB8" },
  { id: "f6", size: 16, x: "52%", y: "86%", color: "#F7B4C9" },
]

const hexToRgb = (hex: string) => {
  const normalized = hex.replace("#", "")
  const num = parseInt(normalized, 16)
  return {
    r: (num >> 16) & 0xff,
    g: (num >> 8) & 0xff,
    b: num & 0xff,
  }
}

const withAlpha = (hex: string, alpha: number) => {
  const { r, g, b } = hexToRgb(hex)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

export default function ContactPage() {
  const navigate = useNavigate()
  const [isLeaving, setIsLeaving] = useState(false)
  const [backHover, setBackHover] = useState(false)
  const [sending, setSending] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")

  const cursorAccent = "#1C9A6E"
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const cursorXSpring = useSpring(cursorX, { stiffness: 500, damping: 40, mass: 0.3 })
  const cursorYSpring = useSpring(cursorY, { stiffness: 500, damping: 40, mass: 0.3 })
  const [cursorVariant, setCursorVariant] = useState<"default" | "hover">("default")
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

  useEffect(() => {
    if (!isLeaving) return
    const timer = window.setTimeout(() => navigate("/"), 420)
    return () => window.clearTimeout(timer)
  }, [isLeaving, navigate])

  const handleInteractiveEnter = () => setCursorVariant("hover")
  const handleInteractiveLeave = () => setCursorVariant("default")

  const cursorVariants = {
    default: {
      scale: 1,
      opacity: 0.6,
      backgroundColor: withAlpha(cursorAccent, 0.16),
      borderColor: withAlpha(cursorAccent, 0.45),
    },
    hover: {
      scale: 1.6,
      opacity: 0.9,
      backgroundColor: cursorAccent,
      borderColor: withAlpha(cursorAccent, 0),
    },
  }

  const handleSend = () => {
    if (sending) return
    const phoneNumber = "94706646000"
    const text = [
      "New Contact Request",
      `Name: ${name || "-"}`,
      `Email: ${email || "-"}`,
      `Message: ${message || "-"}`,
    ].join("\n")
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`
    setSending(true)
    window.open(url, "_blank", "noopener,noreferrer")
    window.setTimeout(() => {
      setSending(false)
    }, 600)
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#FDEFF4]">
      {cursorVisible && (
        <motion.div
          className="pointer-events-none fixed left-0 top-0 z-[200] h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border backdrop-blur-sm"
          style={{ x: cursorXSpring, y: cursorYSpring }}
          variants={cursorVariants}
          animate={cursorVariant}
          transition={{ type: "spring", stiffness: 250, damping: 24 }}
        >
          <motion.div
            className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{ backgroundColor: cursorAccent }}
            animate={{ scale: cursorVariant === "hover" ? 0.3 : 1 }}
            transition={{ duration: 0.2 }}
          />
        </motion.div>
      )}

      <motion.div
        className="pointer-events-none fixed inset-0 z-[120] bg-[#FDEFF4]"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
        style={{ transformOrigin: "top" }}
      />

      <motion.button
        onClick={() => setIsLeaving(true)}
        onMouseEnter={() => {
          handleInteractiveEnter()
          setBackHover(true)
        }}
        onMouseLeave={() => {
          handleInteractiveLeave()
          setBackHover(false)
        }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.98 }}
        className="fixed left-6 top-6 z-[130] flex h-12 w-12 items-center justify-center rounded-full border border-white/70 bg-white/80 shadow-lg backdrop-blur"
        aria-label="Back to home"
      >
        <motion.span
          animate={backHover ? { x: [0, -4, 0] } : { x: 0 }}
          transition={
            backHover
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

      {floatingDots.map((dot, index) => (
        <motion.span
          key={dot.id}
          className="absolute rounded-full opacity-70"
          style={{
            width: dot.size,
            height: dot.size,
            left: dot.x,
            top: dot.y,
            backgroundColor: dot.color,
          }}
          animate={{ y: [0, -12, 0], x: [0, 8, 0] }}
          transition={{ duration: 6 + index, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      <motion.div
        className="relative z-10 mx-auto grid min-h-screen max-w-6xl items-center gap-12 px-6 py-24 lg:grid-cols-[1.05fr_0.95fr]"
        initial={{ opacity: 0, y: 30 }}
        animate={isLeaving ? { opacity: 0, scale: 0.96 } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
            Contact
          </p>
          <h1 className="font-display mt-4 text-4xl leading-tight sm:text-5xl">
            Let&apos;s Scoop Up Your Next Project!
          </h1>
          <p className="mt-2 text-sm font-semibold text-slate-700">
            Thenuka Gunasekara
          </p>
          <div className="mt-8 space-y-4 text-sm text-slate-700">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                Email
              </p>
              <a
                className="hover:text-slate-900"
                href="mailto:thenukaanjala@gmail.com"
                onMouseEnter={handleInteractiveEnter}
                onMouseLeave={handleInteractiveLeave}
              >
                thenukaanjala@gmail.com
              </a>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                Social
              </p>
              <div className="mt-2 flex flex-wrap gap-3 text-sm">
                <a
                  className="rounded-full border border-white/70 bg-white/70 px-4 py-2 shadow-sm backdrop-blur hover:text-slate-900"
                  href="https://www.linkedin.com/in/thenuka-gunasekara-2b0957215/"
                  target="_blank"
                  rel="noreferrer"
                  onMouseEnter={handleInteractiveEnter}
                  onMouseLeave={handleInteractiveLeave}
                >
                  LinkedIn
                </a>
                <a
                  className="rounded-full border border-white/70 bg-white/70 px-4 py-2 shadow-sm backdrop-blur hover:text-slate-900"
                  href="https://github.com/ThenukaAnjala"
                  target="_blank"
                  rel="noreferrer"
                  onMouseEnter={handleInteractiveEnter}
                  onMouseLeave={handleInteractiveLeave}
                >
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-[32px] border border-white/70 bg-white/70 p-8 shadow-2xl backdrop-blur-2xl">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
            Send a message
          </p>
          <form
            className="mt-6 space-y-5"
            onSubmit={(event) => {
              event.preventDefault()
              handleSend()
            }}
          >
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-[0.2em] text-slate-500">
                Name
              </label>
              <input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="w-full rounded-2xl border border-white/70 bg-white/70 px-4 py-3 text-sm text-slate-700 outline-none transition focus:shadow-[0_0_0_4px_rgba(28,154,110,0.2)]"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-[0.2em] text-slate-500">
                Email
              </label>
              <input
                type="email"
                placeholder="name@email.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full rounded-2xl border border-white/70 bg-white/70 px-4 py-3 text-sm text-slate-700 outline-none transition focus:shadow-[0_0_0_4px_rgba(28,154,110,0.2)]"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-[0.2em] text-slate-500">
                Message
              </label>
              <textarea
                rows={4}
                placeholder="Tell us about your project..."
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                className="w-full resize-none rounded-2xl border border-white/70 bg-white/70 px-4 py-3 text-sm text-slate-700 outline-none transition focus:shadow-[0_0_0_4px_rgba(28,154,110,0.2)]"
              />
            </div>
            <motion.button
              type="submit"
              onMouseEnter={handleInteractiveEnter}
              onMouseLeave={handleInteractiveLeave}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-full px-6 py-3 text-sm font-semibold text-white shadow-lg"
              style={{ backgroundColor: "#1C9A6E" }}
            >
              <motion.span
                initial={false}
                animate={sending ? { opacity: 0, y: -10 } : { opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                {sending ? "Sending..." : "Send via WhatsApp"}
              </motion.span>
              <motion.span
                className="absolute right-6 flex h-6 w-6 items-center justify-center"
                initial={false}
                animate={
                  sending
                    ? { x: [0, 40], y: [0, -20], opacity: [1, 0] }
                    : { opacity: 0 }
                }
                transition={{ duration: 0.6 }}
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5">
                  <path
                    d="M3 11l18-8-8 18-2-7-8-3z"
                    fill="currentColor"
                  />
                </svg>
              </motion.span>
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  )
}
