import { motion, type MotionValue } from "framer-motion"

type Props = {
  blobColor: MotionValue<string>
  blobY: MotionValue<number>
  haloY: MotionValue<number>
  parallaxSlow: MotionValue<number>
  parallaxMid: MotionValue<number>
  parallaxFast: MotionValue<number>
  parallaxX: MotionValue<number>
}

export default function BackgroundDecor({
  blobColor,
  blobY,
  haloY,
  parallaxSlow,
  parallaxMid,
  parallaxFast,
  parallaxX,
}: Props) {
  return (
    <>
      <motion.div
        className="absolute -top-24 right-[-8%] h-[680px] w-[680px] transform-gpu opacity-80"
        style={{ y: blobY }}
      >
        <svg viewBox="0 0 600 600" className="h-full w-full">
          <motion.path
            d="M409,36c69,22,137,67,156,137c19,71-12,168-54,238c-42,70-95,113-160,136c-66,23-145,25-203-8c-59-33-97-100-112-170c-15-70-6-143,34-206c40-63,111-116,199-134C318,13,340,14,409,36Z"
            style={{ fill: blobColor }}
          />
        </svg>
      </motion.div>

      <motion.div
        className="absolute -left-24 top-1/3 h-80 w-80 transform-gpu rounded-full bg-white/40 blur-3xl"
        style={{ y: haloY }}
      />
      <motion.div
        className="absolute bottom-0 right-1/3 h-96 w-96 transform-gpu rounded-full bg-white/30 blur-3xl"
        style={{ y: haloY }}
      />

      <motion.div
        className="absolute left-16 top-24 h-10 w-10 rounded-full bg-white/70 blur-sm"
        style={{ y: parallaxSlow, x: parallaxX }}
      />
      <motion.div
        className="absolute left-40 top-64 h-6 w-6 rounded-full bg-white/70"
        style={{ y: parallaxMid }}
      />
      <motion.div
        className="absolute right-28 top-24 h-3 w-3 rounded-full bg-white/80"
        style={{ y: parallaxFast }}
      />
      <motion.div
        className="absolute left-1/2 bottom-24 h-4 w-4 rounded-full bg-white/70"
        style={{ y: parallaxMid, x: parallaxX }}
      />
    </>
  )
}
