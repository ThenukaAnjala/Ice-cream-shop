import { motion } from "framer-motion"
import type { Product } from "../../data/products"

type Sprinkle = {
  id: string
  size: number
  x: string
  y: string
  color: string
}

type Props = {
  products: Product[]
  sprinkles: Sprinkle[]
  imageSrc: (file: string) => string
}

export default function StoryHero({ products, sprinkles, imageSrc }: Props) {
  return (
    <section
      id="story"
      className="relative z-10 min-h-screen snap-start snap-stop overflow-hidden bg-[#FDEFF4] px-6 py-24"
    >
      <div
        data-parallax
        data-speed={-80}
        className="absolute -top-32 right-[-12%] h-[520px] w-[520px] opacity-90"
      >
        <svg viewBox="0 0 600 600" className="h-full w-full">
          <defs>
            <linearGradient id="storyBlob" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FAD8E7" />
              <stop offset="100%" stopColor="#F9E7D4" />
            </linearGradient>
          </defs>
          <path
            d="M413,38c68,22,128,72,146,140c18,68-8,154-50,224c-42,70-100,124-172,140c-72,16-157-7-212-62C69,425,43,342,58,263c15-79,71-156,145-195C276,29,345,16,413,38Z"
            fill="url(#storyBlob)"
          />
        </svg>
      </div>

      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
            Scoopy Doo Story
          </p>
          <h2 className="font-display mt-4 text-4xl leading-tight sm:text-5xl">
            Our Story: Scooping Happiness
          </h2>
          <p className="mt-4 text-sm text-slate-600">
            We started with one simple goal: bring a perfect ice cream to the world
            that blends unforgettable flavor with feel-good ingredients.
          </p>
        </div>

        <div className="relative h-[360px] sm:h-[420px]">
          {[products[1], products[0], products[2]].map((product, index) => {
            const position =
              index === 0
                ? "left-2 top-10 sm:left-4"
                : index === 1
                  ? "right-6 top-0 sm:right-10"
                  : "left-24 bottom-0 sm:left-28"
            const speed = index === 1 ? -110 : index === 0 ? -70 : -50
            return (
              <div
                key={product.id}
                data-parallax
                data-speed={speed}
                className={`absolute h-44 w-44 sm:h-56 sm:w-56 ${position}`}
              >
                <motion.img
                  src={imageSrc(product.file)}
                  alt={product.name}
                  className="h-full w-full object-contain drop-shadow-[0_30px_50px_rgba(0,0,0,0.18)]"
                  animate={{ y: [0, -14, 0] }}
                  transition={{
                    duration: 4.5 + index * 0.6,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.3,
                  }}
                />
              </div>
            )
          })}
          {sprinkles.map((sprinkle, index) => (
            <div
              key={sprinkle.id}
              data-parallax
              data-speed={index % 2 === 0 ? -40 : -60}
              className="absolute"
              style={{ left: sprinkle.x, top: sprinkle.y }}
            >
              <motion.span
                className="block rounded-full"
                style={{
                  width: sprinkle.size,
                  height: sprinkle.size,
                  backgroundColor: sprinkle.color,
                }}
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 3 + index * 0.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
