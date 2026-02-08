export type Product = {
  id: string
  name: string
  description: string
  calories: number
  price: number
  badges: string[]
  bg: string
  blob: string
  accent: string
  file: string
}

export const products: Product[] = [
  {
    id: "cookies",
    name: "Cookies & Cream",
    description:
      "Rich cocoa crunch with silky cream. A bold, balanced bite made for late-night cravings.",
    calories: 260,
    price: 12.9,
    badges: ["6g protein", "Low carb", "Keto friendly"],
    bg: "#F2E9E2",
    blob: "#D8C5B7",
    accent: "#7A4A2B",
    file: "cookies-cream.png",
  },
  {
    id: "pistachio",
    name: "Creamy Pistachio",
    description:
      "Nutty, smooth, and softly sweet. A creamy pistachio swirl with a clean finish.",
    calories: 240,
    price: 11.5,
    badges: ["7g protein", "No added sugar", "Gluten free"],
    bg: "#E6FFF4",
    blob: "#C4F0DE",
    accent: "#1C9A6E",
    file: "creamy-pistachio.png",
  },
  {
    id: "strawberry",
    name: "Strawberry Swirl",
    description:
      "Bright berry ribbons with a velvety scoop. Light, playful, and refreshingly soft.",
    calories: 250,
    price: 10.9,
    badges: ["7g protein", "No added sugar", "High fiber"],
    bg: "#FFE8F1",
    blob: "#FFC9DD",
    accent: "#E14B7A",
    file: "strawberry-swirl.png",
  },
]
