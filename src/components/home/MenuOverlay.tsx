import { AnimatePresence, LayoutGroup, motion } from "framer-motion"
import type { RefObject } from "react"
import type { Product } from "../../data/products"
import type { Ingredient } from "../../types/home"

type Props = {
  open: boolean
  menuOrigin: { x: number; y: number }
  menuBg: string
  menuFilters: string[]
  menuIngredients: Ingredient[]
  products: Product[]
  selectedFlavor: Product | null
  onSelectFlavor: (flavor: Product | null) => void
  onHoverFlavor: (flavor: Product | null) => void
  onAddToCart: (flavor: Product) => void
  onClose: () => void
  onHoverStart: () => void
  onHoverEnd: () => void
  ingredientLayerRef: RefObject<HTMLDivElement>
  imageSrc: (file: string) => string
}

export default function MenuOverlay({
  open,
  menuOrigin,
  menuBg,
  menuFilters,
  menuIngredients,
  products,
  selectedFlavor,
  onSelectFlavor,
  onHoverFlavor,
  onAddToCart,
  onClose,
  onHoverStart,
  onHoverEnd,
  ingredientLayerRef,
  imageSrc,
}: Props) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50"
          initial={{ clipPath: `circle(0px at ${menuOrigin.x}px ${menuOrigin.y}px)` }}
          animate={{ clipPath: `circle(150% at ${menuOrigin.x}px ${menuOrigin.y}px)` }}
          exit={{ clipPath: `circle(0px at ${menuOrigin.x}px ${menuOrigin.y}px)` }}
          transition={{ type: "spring", stiffness: 80, damping: 18 }}
        >
          <motion.div
            className="absolute inset-0"
            animate={{ backgroundColor: menuBg }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          />
          <div className="absolute inset-0 bg-white/30 backdrop-blur-2xl" />

          <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col px-6 py-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h2 className="text-lg font-semibold tracking-[0.2em]">
                Your Sweet Selection
              </h2>
              <div className="flex flex-wrap gap-2">
                {menuFilters.map((filter) => (
                  <motion.button
                    key={filter}
                    onMouseEnter={onHoverStart}
                    onMouseLeave={onHoverEnd}
                    whileHover={{ y: -2 }}
                    className="rounded-full border border-white/60 bg-white/60 px-4 py-2 text-xs uppercase tracking-[0.2em] text-slate-700 shadow-sm"
                  >
                    {filter}
                  </motion.button>
                ))}
              </div>
              <motion.button
                onClick={onClose}
                onMouseEnter={onHoverStart}
                onMouseLeave={onHoverEnd}
                whileHover={{ rotate: 90 }}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/60 bg-white/70 text-lg"
              >
                x
              </motion.button>
            </div>

            <LayoutGroup>
              <div className="relative mt-8 flex-1">
                <div
                  ref={ingredientLayerRef}
                  className="pointer-events-none absolute inset-0"
                >
                  {menuIngredients.map((item) => (
                    <span
                      key={item.id}
                      className="ingredient absolute rounded-full"
                      style={{
                        width: item.size,
                        height: item.size,
                        left: item.x,
                        top: item.y,
                        backgroundColor: item.color,
                        filter: item.blur ? `blur(${item.blur}px)` : undefined,
                      }}
                    />
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
                  {products.map((flavor) => (
                    <motion.button
                      key={flavor.id}
                      onClick={() => onSelectFlavor(flavor)}
                      onMouseEnter={() => onHoverFlavor(flavor)}
                      onMouseLeave={() => onHoverFlavor(null)}
                      onFocus={() => onHoverFlavor(flavor)}
                      onBlur={() => onHoverFlavor(null)}
                      className="group relative rounded-3xl border border-white/60 bg-white/55 p-5 text-left shadow-lg backdrop-blur-xl transition"
                      whileHover={{ y: -6 }}
                      layoutId={`card-${flavor.id}`}
                    >
                      <motion.div
                        layoutId={`image-${flavor.id}`}
                        className="relative mx-auto h-40 w-40"
                      >
                        <img
                          src={imageSrc(flavor.file)}
                          alt={flavor.name}
                          className="h-full w-full object-contain"
                        />
                      </motion.div>
                      <p className="mt-4 text-sm font-semibold">{flavor.name}</p>
                      <p className="mt-1 text-xs uppercase tracking-[0.2em] text-slate-500">
                        ${flavor.price.toFixed(2)}
                      </p>
                    </motion.button>
                  ))}
                </div>
              </div>

              <AnimatePresence>
                {selectedFlavor && (
                  <motion.div
                    className="fixed inset-0 z-20 flex items-center justify-center bg-black/30 px-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => onSelectFlavor(null)}
                  >
                    <motion.div
                      layoutId={`card-${selectedFlavor.id}`}
                      onClick={(event) => event.stopPropagation()}
                      className="w-full max-w-xl rounded-[32px] border border-white/60 bg-white/70 p-8 shadow-2xl backdrop-blur-2xl"
                    >
                      <motion.div
                        layoutId={`image-${selectedFlavor.id}`}
                        className="mx-auto h-56 w-56"
                      >
                        <img
                          src={imageSrc(selectedFlavor.file)}
                          alt={selectedFlavor.name}
                          className="h-full w-full object-contain"
                        />
                      </motion.div>
                      <div className="mt-6 text-center">
                        <h3 className="text-2xl font-semibold">
                          {selectedFlavor.name}
                        </h3>
                        <p className="mt-2 text-sm text-slate-600">
                          {selectedFlavor.calories} kcal · {selectedFlavor.badges[0]}
                        </p>
                        <p className="mt-4 text-sm text-slate-700">
                          {selectedFlavor.description}
                        </p>
                        <div className="mt-6 flex items-center justify-center gap-4">
                          <span className="text-xl font-semibold">
                            ${selectedFlavor.price.toFixed(2)}
                          </span>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                            style={{ backgroundColor: selectedFlavor.accent }}
                            className="rounded-full px-6 py-3 text-sm font-semibold text-white shadow-lg"
                            onClick={() => onAddToCart(selectedFlavor)}
                          >
                            Quick Add to Cart
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </LayoutGroup>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
