import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { useCursor } from "../hooks/useCursor"
import CustomCursor from "../components/common/CustomCursor"
import BackButton from "../components/common/BackButton"
import ContactInfo from "../sections/contact/ContactInfo"
import ContactForm from "../sections/contact/ContactForm"

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

export default function ContactPage() {
  const navigate = useNavigate()
  const [isLeaving, setIsLeaving] = useState(false)
  const [sending, setSending] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")

  const cursorAccent = "#1C9A6E"
  const {
    cursorVisible,
    cursorVariant,
    setCursorVariant,
    cursorXSpring,
    cursorYSpring,
  } = useCursor()

  useEffect(() => {
    if (!isLeaving) return
    const timer = window.setTimeout(() => navigate("/"), 420)
    return () => window.clearTimeout(timer)
  }, [isLeaving, navigate])

  const handleInteractiveEnter = () => setCursorVariant("hover")
  const handleInteractiveLeave = () => setCursorVariant("default")

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
      <CustomCursor
        visible={cursorVisible}
        x={cursorXSpring}
        y={cursorYSpring}
        variant={cursorVariant}
        accent={cursorAccent}
      />

      <motion.div
        className="pointer-events-none fixed inset-0 z-[120] bg-[#FDEFF4]"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
        style={{ transformOrigin: "top" }}
      />

      <BackButton
        onClick={() => setIsLeaving(true)}
        onHoverStart={handleInteractiveEnter}
        onHoverEnd={handleInteractiveLeave}
        ariaLabel="Back to home"
      />

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
        <ContactInfo
          name="Thenuka Gunasekara"
          email="thenukaanjala@gmail.com"
          socials={[
            {
              label: "LinkedIn",
              href: "https://www.linkedin.com/in/thenuka-gunasekara-2b0957215/",
            },
            { label: "GitHub", href: "https://github.com/ThenukaAnjala" },
          ]}
          onHoverStart={handleInteractiveEnter}
          onHoverEnd={handleInteractiveLeave}
        />

        <ContactForm
          name={name}
          email={email}
          message={message}
          onNameChange={setName}
          onEmailChange={setEmail}
          onMessageChange={setMessage}
          sending={sending}
          onSubmit={handleSend}
          onHoverStart={handleInteractiveEnter}
          onHoverEnd={handleInteractiveLeave}
        />
      </motion.div>
    </div>
  )
}
