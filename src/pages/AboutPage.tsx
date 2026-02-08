import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { products } from "../data/products"
import { journeyIngredients, storySprinkles } from "../data/about"
import { useCursor } from "../hooks/useCursor"
import CustomCursor from "../components/common/CustomCursor"
import BackButton from "../components/common/BackButton"
import AboutHeader from "../components/about/AboutHeader"
import StoryHero from "../sections/about/StoryHero"
import IngredientJourney from "../sections/about/IngredientJourney"
import PromiseSection from "../sections/about/PromiseSection"

gsap.registerPlugin(ScrollTrigger)

const imageSrc = (file: string) => `/images/${encodeURIComponent(file)}`


export default function AboutPage() {
  const navigate = useNavigate()
  const rootRef = useRef<HTMLDivElement | null>(null)
  const ingredientSectionRef = useRef<HTMLDivElement | null>(null)
  const promiseRef = useRef<HTMLDivElement | null>(null)
  const [storyCountActive, setStoryCountActive] = useState(false)
  const [storyCounter, setStoryCounter] = useState(0)
  const [isLeaving, setIsLeaving] = useState(false)
  const cursorAccent = "#1C9A6E"
  const {
    cursorVisible,
    cursorVariant,
    setCursorVariant,
    cursorXSpring,
    cursorYSpring,
  } = useCursor()

  const handleInteractiveEnter = () => setCursorVariant("hover")
  const handleInteractiveLeave = () => setCursorVariant("default")

  const { scrollYProgress: ingredientScroll } = useScroll({
    target: ingredientSectionRef,
    offset: ["start end", "end start"],
  })
  const ingredientFloatSlow = useTransform(ingredientScroll, [0, 1], [120, -140])
  const ingredientFloatMid = useTransform(ingredientScroll, [0, 1], [200, -180])
  const ingredientFloatFast = useTransform(ingredientScroll, [0, 1], [260, -220])
  const ingredientFloatMap = [
    ingredientFloatSlow,
    ingredientFloatMid,
    ingredientFloatFast,
    ingredientFloatMid,
    ingredientFloatFast,
    ingredientFloatSlow,
  ]

  useEffect(() => {
    if (!promiseRef.current) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setStoryCountActive(true)
          observer.disconnect()
        }
      },
      { threshold: 0.4 }
    )
    observer.observe(promiseRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!storyCountActive) return
    const target = 1500000
    const duration = 1400
    const start = performance.now()
    const step = (time: number) => {
      const progress = Math.min((time - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setStoryCounter(Math.floor(eased * target))
      if (progress < 1) {
        requestAnimationFrame(step)
      }
    }
    requestAnimationFrame(step)
  }, [storyCountActive])

  useEffect(() => {
    if (!isLeaving) return
    const timer = window.setTimeout(() => navigate("/"), 420)
    return () => window.clearTimeout(timer)
  }, [isLeaving, navigate])

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        const speed = Number(el.dataset.speed ?? "40")
        gsap.to(el, {
          y: speed,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        })
      })

      gsap.from(".ingredient-card", {
        opacity: 0,
        y: 30,
        stagger: 0.2,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".ingredient-section",
          start: "top 70%",
        },
      })
    }, rootRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={rootRef} className="relative min-h-screen">
      <CustomCursor
        visible={cursorVisible}
        x={cursorXSpring}
        y={cursorYSpring}
        variant={cursorVariant}
        accent={cursorAccent}
      />

      <motion.div
        className="pointer-events-none fixed inset-0 z-[120] bg-[#FDEFF4]"
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0 }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
        style={{ transformOrigin: "left" }}
      />

      <BackButton
        onClick={() => setIsLeaving(true)}
        onHoverStart={handleInteractiveEnter}
        onHoverEnd={handleInteractiveLeave}
        ariaLabel="Back to home"
      />

      <motion.div
        className="relative"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={isLeaving ? { opacity: 0, scale: 0.96 } : { opacity: 1, scale: 1 }}
        transition={{ duration: 0.45, ease: "easeInOut" }}
      >
        <AboutHeader
          onHome={() => navigate("/")}
          onMenu={() => navigate("/")}
          onContact={() => navigate("/contact")}
          onHoverStart={handleInteractiveEnter}
          onHoverEnd={handleInteractiveLeave}
        />

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
              We started with one simple goal: bring a perfect ice cream to the
              world that blends unforgettable flavor with feel-good ingredients.
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
            {storySprinkles.map((sprinkle, index) => (
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

      <section
        ref={ingredientSectionRef}
        className="ingredient-section relative z-10 min-h-screen snap-start snap-stop overflow-hidden bg-[#E6FFF4] px-6 py-24"
      >
        <div className="pointer-events-none absolute inset-0">
          {journeyIngredients.map((item, index) => (
            <motion.span
              key={item.id}
              className="absolute rounded-full opacity-90"
              style={{
                width: item.size,
                height: item.size,
                left: item.x,
                top: item.y,
                backgroundColor: item.color,
                filter: item.blur ? `blur(${item.blur}px)` : undefined,
                y: ingredientFloatMap[index] ?? ingredientFloatSlow,
              }}
            />
          ))}
        </div>

        <div className="relative mx-auto flex max-w-5xl flex-col items-center text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
            The Secret Recipe
          </p>
          <h3 className="font-display mt-4 text-3xl sm:text-4xl">
            The Ingredient Journey
          </h3>
          <p className="mt-3 max-w-2xl text-sm text-slate-600">
            As you scroll, our ingredients gently rise - each one a soft reminder
            that every scoop is built from something real and delicious.
          </p>

          <div className="mt-10 grid w-full gap-4 sm:grid-cols-3">
            {[
              {
                title: "100% Natural",
                text: "Organic Ingredients Only",
              },
              {
                title: "Low Calorie, High Flavor",
                text: "Low Calorie, High Flavor",
              },
              {
                title: "Packed with Protein",
                text: "Packed with Protein",
              },
            ].map((card) => (
              <div
                key={card.title}
                className="ingredient-card rounded-[28px] border border-white/70 bg-white/65 p-6 text-left shadow-lg backdrop-blur-2xl"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-lg">
                  *
                </div>
                <h4 className="mt-4 text-base font-semibold text-slate-800">
                  {card.title}
                </h4>
                <p className="mt-2 text-sm text-slate-600">{card.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        ref={promiseRef}
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
              {storyCounter.toLocaleString()}+
            </div>
            <p className="mt-2 text-xs uppercase tracking-[0.3em] text-slate-500">
              Scoops
            </p>
          </div>

          <motion.button
            onClick={() => navigate("/")}
            onMouseEnter={handleInteractiveEnter}
            onMouseLeave={handleInteractiveLeave}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="mt-10 rounded-full px-8 py-3 text-sm font-semibold text-white shadow-lg"
            style={{ backgroundColor: "#1C9A6E" }}
          >
            View Menu
          </motion.button>
        </div>
      </section>
      </motion.div>
    </div>
  )
}
