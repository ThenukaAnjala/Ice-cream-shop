import { AnimatePresence, motion } from "framer-motion"
import type { Product } from "../../data/products"

type CartLineItem = {
  product: Product
  quantity: number
}

type Props = {
  open: boolean
  items: CartLineItem[]
  subtotal: number
  shipping: number
  shippingProgress: number
  total: number
  freeShippingGoal: number
  cartAccent: string
  checkoutGradient: string
  onClose: () => void
  onUpdateQuantity: (id: string, delta: number) => void
  onRemoveItem: (id: string) => void
  onHoverStart: () => void
  onHoverEnd: () => void
  imageSrc: (file: string) => string
}

const cartListVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
}

const cartItemVariants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
  exit: { opacity: 0, y: -10, scale: 0.92, transition: { duration: 0.2 } },
}

export default function CartDrawer({
  open,
  items,
  subtotal,
  shipping,
  shippingProgress,
  total,
  freeShippingGoal,
  cartAccent,
  checkoutGradient,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onHoverStart,
  onHoverEnd,
  imageSrc,
}: Props) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-black/20 backdrop-blur-md"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.aside
            className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white/70 p-6 shadow-2xl backdrop-blur-2xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 140, damping: 22 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
                  Your Sweet Selection
                </p>
                <h3 className="text-lg font-semibold">Shopping Cart</h3>
              </div>
              <motion.button
                onClick={onClose}
                onMouseEnter={onHoverStart}
                onMouseLeave={onHoverEnd}
                whileHover={{ rotate: 90 }}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/60 bg-white/70"
              >
                x
              </motion.button>
            </div>

            <div className="mt-6 flex-1 overflow-y-auto pr-2">
              {items.length === 0 ? (
                <div className="mt-16 flex flex-col items-center text-center text-slate-600">
                  <motion.div
                    className="relative h-32 w-32"
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <svg viewBox="0 0 120 140" className="h-full w-full">
                      <defs>
                        <linearGradient id="cone" x1="0" y1="0" x2="1" y2="1">
                          <stop offset="0%" stopColor="#F7D9A8" />
                          <stop offset="100%" stopColor="#E2B875" />
                        </linearGradient>
                      </defs>
                      <path
                        d="M60 10c22 0 40 18 40 40S82 90 60 90 20 72 20 50 38 10 60 10z"
                        fill="#F3F4F6"
                      />
                      <path
                        d="M30 80h60l-20 50H50L30 80z"
                        fill="url(#cone)"
                      />
                      <path
                        d="M38 90h44l-6 12H44l-6-12z"
                        fill="#E8C58A"
                      />
                    </svg>
                  </motion.div>
                  <p className="mt-6 text-sm uppercase tracking-[0.25em] text-slate-500">
                    Your cart is craving some scoops!
                  </p>
                </div>
              ) : (
                <motion.ul
                  className="space-y-4"
                  variants={cartListVariants}
                  initial="hidden"
                  animate="show"
                >
                  <AnimatePresence>
                    {items.map((item) => (
                      <motion.li
                        key={item.product.id}
                        variants={cartItemVariants}
                        layout
                        exit="exit"
                        className="flex items-center gap-4 rounded-2xl border border-white/60 bg-white/60 p-4 shadow-sm"
                      >
                        <img
                          src={imageSrc(item.product.file)}
                          alt={item.product.name}
                          className="h-16 w-16 object-contain"
                        />
                        <div className="flex-1">
                          <p className="text-sm font-semibold">
                            {item.product.name}
                          </p>
                          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                            ${item.product.price.toFixed(2)}
                          </p>
                          <div className="mt-2 flex items-center gap-3">
                            <motion.button
                              onClick={() => onUpdateQuantity(item.product.id, -1)}
                              onMouseEnter={onHoverStart}
                              onMouseLeave={onHoverEnd}
                              whileHover={{ scale: 1.08 }}
                              whileTap={{ scale: 0.95 }}
                              className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-sm shadow"
                            >
                              -
                            </motion.button>
                            <span className="text-sm font-semibold tabular-nums">
                              {item.quantity}
                            </span>
                            <motion.button
                              onClick={() => onUpdateQuantity(item.product.id, 1)}
                              onMouseEnter={onHoverStart}
                              onMouseLeave={onHoverEnd}
                              whileHover={{ scale: 1.08 }}
                              whileTap={{ scale: 0.95 }}
                              className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-sm shadow"
                            >
                              +
                            </motion.button>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <span className="text-sm font-semibold">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </span>
                          <button
                            onClick={() => onRemoveItem(item.product.id)}
                            className="text-xs uppercase tracking-[0.2em] text-slate-400 hover:text-slate-600"
                          >
                            Remove
                          </button>
                        </div>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </motion.ul>
              )}
            </div>

            <div className="sticky bottom-0 mt-6 space-y-4 border-t border-white/60 pt-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">Subtotal</span>
                <span className="font-semibold">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">Shipping</span>
                <span className="font-semibold">
                  {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="h-2 w-full rounded-full bg-white/70">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${shippingProgress * 100}%`,
                    backgroundColor: cartAccent,
                  }}
                />
              </div>
              <p className="text-xs text-slate-500">
                {subtotal >= freeShippingGoal
                  ? "Free shipping unlocked."
                  : `Spend $${(freeShippingGoal - subtotal).toFixed(2)} more for free shipping.`}
              </p>
              <div className="flex items-center justify-between text-base font-semibold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <motion.button
                onMouseEnter={onHoverStart}
                onMouseLeave={onHoverEnd}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="relative overflow-hidden rounded-full px-6 py-3 text-sm font-semibold text-white shadow-lg"
                style={{ backgroundImage: checkoutGradient }}
              >
                <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-white/0 via-white/50 to-white/0 opacity-70 animate-shimmer" />
                <span className="relative z-10">Proceed to Checkout</span>
              </motion.button>
            </div>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
