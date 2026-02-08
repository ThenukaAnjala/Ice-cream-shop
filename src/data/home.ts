import type { Ingredient } from "../types/home"

export const ingredientMap: Record<string, Ingredient[]> = {
  cookies: [
    { id: "c1", size: 18, x: "18%", y: "20%", color: "#6B4A35" },
    { id: "c2", size: 12, x: "30%", y: "44%", color: "#8B5E3C" },
    { id: "c3", size: 22, x: "70%", y: "24%", color: "#5B3A2A" },
    { id: "c4", size: 10, x: "76%", y: "58%", color: "#9C7A5A" },
    { id: "c5", size: 14, x: "48%", y: "70%", color: "#7B5A42" },
  ],
  pistachio: [
    { id: "p1", size: 14, x: "20%", y: "18%", color: "#89C9A7" },
    { id: "p2", size: 10, x: "32%", y: "52%", color: "#5FAF86" },
    { id: "p3", size: 20, x: "70%", y: "26%", color: "#7FBE9A" },
    { id: "p4", size: 12, x: "74%", y: "64%", color: "#5FAF86" },
    { id: "p5", size: 16, x: "46%", y: "76%", color: "#7FBE9A" },
  ],
  strawberry: [
    { id: "s1", size: 14, x: "18%", y: "18%", color: "#F58BB0" },
    { id: "s2", size: 10, x: "36%", y: "46%", color: "#E15C8D" },
    { id: "s3", size: 22, x: "70%", y: "24%", color: "#F58BB0" },
    { id: "s4", size: 12, x: "78%", y: "62%", color: "#E15C8D" },
    { id: "s5", size: 16, x: "50%", y: "78%", color: "#F58BB0" },
  ],
}

export const menuFilters = ["Vegan", "Sugar-Free", "Best Sellers", "New Arrivals"]
