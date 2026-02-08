
import { useLayoutEffect, useRef, useState } from "react"
import {
  motion,
  type MotionStyle,
  type Transition,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion"
import { gsap } from "gsap"
import { useNavigate } from "react-router-dom"
import { products, type Product } from "../data/products"
import { ingredientMap, menuFilters } from "../data/home"
import { adjustColor } from "../utils/color"
import { useCursor } from "../hooks/useCursor"
import { useTilt } from "../hooks/useTilt"
import { useScrollLock } from "../hooks/useScrollLock"
import CustomCursor from "../components/common/CustomCursor"
import DevSignature from "../components/common/DevSignature"
import BackgroundDecor from "../components/home/BackgroundDecor"
import HomeHeader from "../components/home/HomeHeader"
import HeroSection from "../components/home/HeroSection"
import MenuOverlay from "../components/home/MenuOverlay"
import CartDrawer from "../components/home/CartDrawer"
import type { CartItem } from "../types/home"

const imageSrc = (file: string) => `/images/${encodeURIComponent(file)}`

const floatingTransition: Transition = {
  duration: 4,
  repeat: Infinity,
  ease: "easeInOut",
}

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value))

export default function HomePage() {
  const navigate = useNavigate()
  const { scrollYProgress } = useScroll()
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 22,
    mass: 0.35,
  })
  const steps = products.length - 1
  const points = products.map((_, index) => index / steps)

  const bgColor = useTransform(smoothProgress, points, products.map((p) => p.bg))
  const blobColor = useTransform(
    smoothProgress,
    points,
    products.map((p) => p.blob)
  )
  const accentColor = useTransform(
    smoothProgress,
    points,
    products.map((p) => p.accent)
  )

  const blobY = useTransform(smoothProgress, [0, 1], [0, -120])
  const haloY = useTransform(smoothProgress, [0, 1], [0, -60])
  const parallaxSlow = useTransform(smoothProgress, [0, 1], [0, -70])
  const parallaxMid = useTransform(smoothProgress, [0, 1], [0, -140])
  const parallaxFast = useTransform(smoothProgress, [0, 1], [0, -220])
  const parallaxX = useTransform(smoothProgress, [0, 1], [0, 60])

  const productMotion = products.map((_, index) => {
    const center = index / steps
    const range = [center - 1 / steps, center, center + 1 / steps]

    return {
      opacity: useTransform(smoothProgress, range, [0, 1, 0]),
      x: useTransform(smoothProgress, range, [-120, 0, 120]),
      y: useTransform(smoothProgress, range, [80, 0, -80]),
      scale: useTransform(smoothProgress, range, [0.9, 1, 0.9]),
      textY: useTransform(smoothProgress, range, [28, 0, -28]),
      textOpacity: useTransform(smoothProgress, range, [0, 1, 0]),
    }
  })

  const rootStyle = {
    backgroundColor: bgColor,
    ["--accent" as string]: accentColor,
  } as MotionStyle

  const calorieValue = useTransform(
    smoothProgress,
    points,
    products.map((p) => p.calories)
  )
  const [calorieDisplay, setCalorieDisplay] = useState(products[0].calories)
  useMotionValueEvent(calorieValue, "change", (latest) => {
    setCalorieDisplay(Math.round(latest))
  })

  const [activeIndex, setActiveIndex] = useState(0)
  useMotionValueEvent(smoothProgress, "change", (latest) => {
    const nextIndex = clamp(Math.round(latest * steps), 0, steps)
    setActiveIndex((prev) => (prev === nextIndex ? prev : nextIndex))
  })
  const activeProduct = products[activeIndex]

  const {
    cursorVisible,
    cursorVariant,
    setCursorVariant,
    cursorXSpring,
    cursorYSpring,
  } = useCursor()

  const { tiltX, tiltY, handleTilt, resetTilt } = useTilt()

  const handleInteractiveEnter = () => setCursorVariant("hover")
  const handleInteractiveLeave = () => setCursorVariant("default")

  const menuButtonRef = useRef<HTMLButtonElement | null>(null)
  const ingredientLayerRef = useRef<HTMLDivElement | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [menuOrigin, setMenuOrigin] = useState({ x: 0, y: 0 })
  const [hoveredFlavor, setHoveredFlavor] = useState<Product | null>(null)
  const [selectedFlavor, setSelectedFlavor] = useState<Product | null>(null)

  const [cartOpen, setCartOpen] = useState(false)
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [lastAccent, setLastAccent] = useState(products[0].accent)

  const activeFlavor = hoveredFlavor ?? selectedFlavor
  const menuBg = activeFlavor?.bg ?? "#F7F1EA"

  const openMenu = () => {
    const rect = menuButtonRef.current?.getBoundingClientRect()
    if (rect) {
      setMenuOrigin({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      })
    } else {
      setMenuOrigin({ x: window.innerWidth / 2, y: window.innerHeight / 2 })
    }
    setMenuOpen(true)
  }

  const closeMenu = () => {
    setMenuOpen(false)
    setSelectedFlavor(null)
    setHoveredFlavor(null)
  }

  const addToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id)
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      if (prev.length >= 3) {
        return prev
      }
      return [...prev, { id: product.id, quantity: 1 }]
    })
    setLastAccent(product.accent)
    setCartOpen(true)
  }

  const updateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(0, item.quantity + delta) }
            : item
        )
        .filter((item) => item.quantity > 0)
    )
  }

  const removeItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id))
  }

  const cartLineItems = cartItems
    .map((item) => {
      const product = products.find((entry) => entry.id === item.id)
      if (!product) return null
      return { product, quantity: item.quantity }
    })
    .filter(Boolean) as { product: Product; quantity: number }[]

  const cartCount = cartLineItems.reduce((total, item) => total + item.quantity, 0)
  const subtotal = cartLineItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  )
  const freeShippingGoal = 40
  const shipping = subtotal >= freeShippingGoal || subtotal === 0 ? 0 : 4.5
  const shippingProgress = Math.min(subtotal / freeShippingGoal, 1)
  const total = subtotal + shipping
  const cartAccent = cartLineItems.length
    ? cartLineItems[cartLineItems.length - 1].product.accent
    : lastAccent
  const checkoutGradient = `linear-gradient(120deg, ${adjustColor(
    cartAccent,
    0.22
  )}, ${cartAccent}, ${adjustColor(cartAccent, -0.12)})`
  const cursorAccent = menuOpen
    ? activeFlavor?.accent ?? cartAccent
    : cartOpen
      ? cartAccent
      : activeProduct.accent

  useScrollLock(menuOpen || cartOpen)

  useLayoutEffect(() => {
    if (!menuOpen || !activeFlavor) return

    const ctx = gsap.context(() => {
      const elements = gsap.utils.toArray<HTMLElement>(".ingredient")
      elements.forEach((el, index) => {
        gsap.to(el, {
          x: "+=" + (10 + index * 2),
          y: "+=" + (18 + index * 3),
          duration: 3.5 + index * 0.4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        })
        gsap.to(el, {
          rotation: 6 + index * 2,
          duration: 4 + index * 0.3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        })
      })
    }, ingredientLayerRef)

    return () => ctx.revert()
  }, [menuOpen, activeFlavor?.id])

  const menuIngredients = activeFlavor ? ingredientMap[activeFlavor.id] : []

  return (
    <div className="relative min-h-screen">
      <CustomCursor
        visible={cursorVisible}
        x={cursorXSpring}
        y={cursorYSpring}
        variant={cursorVariant}
        accent={cursorAccent}
      />

      <motion.div className="fixed inset-0 overflow-hidden text-slate-900" style={rootStyle}>
        <BackgroundDecor
          blobColor={blobColor}
          blobY={blobY}
          haloY={haloY}
          parallaxSlow={parallaxSlow}
          parallaxMid={parallaxMid}
          parallaxFast={parallaxFast}
          parallaxX={parallaxX}
        />

        <HomeHeader
          cartCount={cartCount}
          onCartOpen={() => setCartOpen(true)}
          onMenuOpen={openMenu}
          onHome={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          onAbout={() => navigate("/about")}
          onContact={() => navigate("/contact")}
          onHoverStart={handleInteractiveEnter}
          onHoverEnd={handleInteractiveLeave}
        />

        <HeroSection
          products={products}
          productMotion={productMotion}
          calorieDisplay={calorieDisplay}
          activeProduct={activeProduct}
          onAddToCart={addToCart}
          onOpenMenu={openMenu}
          menuButtonRef={menuButtonRef}
          onHoverStart={handleInteractiveEnter}
          onHoverEnd={handleInteractiveLeave}
          tiltX={tiltX}
          tiltY={tiltY}
          onTilt={handleTilt}
          onTiltReset={resetTilt}
          floatingTransition={floatingTransition}
          imageSrc={imageSrc}
        />

        <DevSignature
          name="Thenuka Gunasekara"
          href="https://www.linkedin.com/in/thenuka-gunasekara-2b0957215/"
        />
      </motion.div>

      <div style={{ height: `${products.length * 100}vh` }}>
        {products.map((product) => (
          <section key={product.id} className="h-screen snap-center snap-stop" />
        ))}
      </div>

      <MenuOverlay
        open={menuOpen}
        menuOrigin={menuOrigin}
        menuBg={menuBg}
        menuFilters={menuFilters}
        menuIngredients={menuIngredients}
        products={products}
        selectedFlavor={selectedFlavor}
        onSelectFlavor={setSelectedFlavor}
        onHoverFlavor={setHoveredFlavor}
        onAddToCart={addToCart}
        onClose={closeMenu}
        onHoverStart={handleInteractiveEnter}
        onHoverEnd={handleInteractiveLeave}
        ingredientLayerRef={ingredientLayerRef}
        imageSrc={imageSrc}
      />

      <CartDrawer
        open={cartOpen}
        items={cartLineItems}
        subtotal={subtotal}
        shipping={shipping}
        shippingProgress={shippingProgress}
        total={total}
        freeShippingGoal={freeShippingGoal}
        cartAccent={cartAccent}
        checkoutGradient={checkoutGradient}
        onClose={() => setCartOpen(false)}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
        onHoverStart={handleInteractiveEnter}
        onHoverEnd={handleInteractiveLeave}
        imageSrc={imageSrc}
      />
    </div>
  )
}
