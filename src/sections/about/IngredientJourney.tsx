import { motion, type MotionValue } from "framer-motion"
import type { RefObject } from "react"
import type { Ingredient } from "../../types/home"

type Props = {
  sectionRef: RefObject<HTMLDivElement | null>
  ingredients: Ingredient[]
  floatMap: MotionValue<number>[]
}

export default function IngredientJourney({ sectionRef, ingredients, floatMap }: Props) {
  return (
    <section
      ref={sectionRef}
      className="ingredient-section relative z-10 min-h-screen snap-start snap-stop overflow-hidden bg-[#E6FFF4] px-6 py-24"
    >
      <div className="pointer-events-none absolute inset-0">
        {ingredients.map((item, index) => (
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
              y: floatMap[index] ?? floatMap[0],
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
  )
}
