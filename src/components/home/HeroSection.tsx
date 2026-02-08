import { motion, type MotionValue, type Transition } from "framer-motion"
import type { RefObject } from "react"
import type { Product } from "../../data/products"

type ProductMotion = {
  opacity: MotionValue<number>
  x: MotionValue<number>
  y: MotionValue<number>
  scale: MotionValue<number>
  textY: MotionValue<number>
  textOpacity: MotionValue<number>
}

type Props = {
  products: Product[]
  productMotion: ProductMotion[]
  calorieDisplay: number
  activeProduct: Product
  onAddToCart: (product: Product) => void
  onOpenMenu: () => void
  menuButtonRef: RefObject<HTMLButtonElement | null>
  onHoverStart: () => void
  onHoverEnd: () => void
  tiltX: MotionValue<number>
  tiltY: MotionValue<number>
  onTilt: (event: React.MouseEvent<HTMLDivElement>) => void
  onTiltReset: () => void
  floatingTransition: Transition
  imageSrc: (file: string) => string
}

export default function HeroSection({
  products,
  productMotion,
  calorieDisplay,
  activeProduct,
  onAddToCart,
  onOpenMenu,
  menuButtonRef,
  onHoverStart,
  onHoverEnd,
  tiltX,
  tiltY,
  onTilt,
  onTiltReset,
  floatingTransition,
  imageSrc,
}: Props) {
  return (
    <main className="relative z-10 mx-auto grid h-[calc(100dvh-88px)] max-w-6xl items-start gap-8 px-6 pb-8 sm:items-center sm:gap-10 sm:pb-12 lg:h-[calc(100vh-96px)] lg:grid-cols-[1.05fr_0.95fr]">
      <div>
        <p className="text-[0.6rem] uppercase tracking-[0.3em] text-slate-600 sm:text-xs">
          Scroll to explore
        </p>
        <h1 className="font-display mt-3 text-3xl leading-[1.05] sm:mt-4 sm:text-5xl lg:text-6xl">
          DELICIOUS ICE CREAM
        </h1>

        <div className="relative mt-5 h-[170px] sm:mt-6 sm:h-[220px]">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              className="absolute inset-0"
              style={{
                opacity: productMotion[index].textOpacity,
                y: productMotion[index].textY,
              }}
            >
              <p className="text-xs uppercase tracking-[0.3em] text-slate-600">
                {product.name}
              </p>
              <h2 className="mt-2 flex items-baseline gap-2 text-2xl font-semibold sm:text-3xl">
                <span className="tabular-nums">{calorieDisplay}</span>
                <span className="text-xs uppercase tracking-[0.35em] text-slate-500">
                  kcal
                </span>
              </h2>
              <p className="mt-2 max-w-md text-sm text-slate-700 sm:mt-3 sm:text-base">
                {product.description}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-5 flex flex-wrap gap-3 sm:mt-6">
          <motion.button
            onClick={() => onAddToCart(activeProduct)}
            onMouseEnter={onHoverStart}
            onMouseLeave={onHoverEnd}
            whileHover={{ y: -2, scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="group relative w-full overflow-hidden rounded-full bg-[var(--accent)] px-6 py-3 font-semibold text-white shadow-lg shadow-black/10 sm:w-auto"
          >
            <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-white/0 via-white/40 to-white/0 transition duration-500 group-hover:translate-x-full" />
            <span className="relative z-10">Shop now</span>
          </motion.button>
          <motion.button
            ref={menuButtonRef}
            onClick={onOpenMenu}
            onMouseEnter={onHoverStart}
            onMouseLeave={onHoverEnd}
            whileHover={{ y: -2, scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="w-full rounded-full bg-white/80 px-6 py-3 font-semibold text-slate-900 shadow-sm sm:w-auto"
          >
            View menu
          </motion.button>
        </div>
      </div>

      <div className="relative flex items-center justify-center sm:pt-0">
        <div
          className="relative h-[210px] w-[210px] sm:h-[320px] sm:w-[320px] lg:h-[420px] lg:w-[420px]"
          style={{ perspective: "1000px" }}
          onMouseMove={onTilt}
          onMouseLeave={() => {
            onTiltReset()
            onHoverEnd()
          }}
          onMouseEnter={onHoverStart}
        >
          <motion.div
            className="absolute inset-0"
            style={{ rotateX: tiltX, rotateY: tiltY, transformStyle: "preserve-3d" }}
          >
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                className="absolute inset-0 flex items-center justify-center transform-gpu will-change-transform"
                style={{
                  opacity: productMotion[index].opacity,
                  x: productMotion[index].x,
                  y: productMotion[index].y,
                  scale: productMotion[index].scale,
                }}
              >
                <motion.div
                  animate={{ y: [0, -12, 0] }}
                  transition={floatingTransition}
                >
                  <img
                    src={imageSrc(product.file)}
                    alt={product.name}
                    className="h-full w-full object-contain drop-shadow-[0_35px_60px_rgba(0,0,0,0.2)]"
                  />
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div className="relative ml-4 hidden h-[260px] sm:block lg:h-[420px]">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              className="absolute right-0 top-1/2 -translate-y-1/2 space-y-3"
              style={{
                opacity: productMotion[index].textOpacity,
                y: productMotion[index].textY,
              }}
            >
              <div className="rounded-2xl bg-white/85 px-4 py-2 text-sm font-semibold shadow-sm backdrop-blur">
                <span className="tabular-nums">{calorieDisplay}</span> kcal
              </div>
              {product.badges.map((badge) => (
                <div
                  key={badge}
                  className="rounded-2xl bg-white/70 px-4 py-2 text-xs uppercase tracking-[0.15em] text-slate-600 shadow-sm backdrop-blur"
                >
                  {badge}
                </div>
              ))}
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  )
}
