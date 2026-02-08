import { motion } from "framer-motion"

type Props = {
  name: string
  email: string
  message: string
  onNameChange: (value: string) => void
  onEmailChange: (value: string) => void
  onMessageChange: (value: string) => void
  sending: boolean
  onSubmit: () => void
  onHoverStart: () => void
  onHoverEnd: () => void
}

export default function ContactForm({
  name,
  email,
  message,
  onNameChange,
  onEmailChange,
  onMessageChange,
  sending,
  onSubmit,
  onHoverStart,
  onHoverEnd,
}: Props) {
  return (
    <div className="rounded-[32px] border border-white/70 bg-white/70 p-8 shadow-2xl backdrop-blur-2xl">
      <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
        Send a message
      </p>
      <form
        className="mt-6 space-y-5"
        onSubmit={(event) => {
          event.preventDefault()
          onSubmit()
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
            onChange={(event) => onNameChange(event.target.value)}
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
            onChange={(event) => onEmailChange(event.target.value)}
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
            onChange={(event) => onMessageChange(event.target.value)}
            className="w-full resize-none rounded-2xl border border-white/70 bg-white/70 px-4 py-3 text-sm text-slate-700 outline-none transition focus:shadow-[0_0_0_4px_rgba(28,154,110,0.2)]"
          />
        </div>
        <motion.button
          type="submit"
          onMouseEnter={onHoverStart}
          onMouseLeave={onHoverEnd}
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
            animate={sending ? { x: [0, 40], y: [0, -20], opacity: [1, 0] } : { opacity: 0 }}
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
  )
}
