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

        <StoryHero
          products={products}
          sprinkles={storySprinkles}
          imageSrc={imageSrc}
        />

        <IngredientJourney
          sectionRef={ingredientSectionRef}
          ingredients={journeyIngredients}
          floatMap={ingredientFloatMap}
        />

        <PromiseSection
          sectionRef={promiseRef}
          counter={storyCounter}
          onViewMenu={() => navigate("/")}
          onHoverStart={handleInteractiveEnter}
          onHoverEnd={handleInteractiveLeave}
        />
      </motion.div>
    </div>
  )
}
