import { BiDrink } from "react-icons/bi";
import { IoFastFoodOutline } from "react-icons/io5";
import { MdOutlineCleaningServices } from "react-icons/md";
import type { ReactElement, ElementType } from "react";

export type SubCategory = {
  name: string;
  items: string[];
};

export type MainCategory = {
  name: string;
  icon: ElementType;
  subCategories: SubCategory[];
};

export const mainCategories: MainCategory[] = [
  {
    name: "Beverages",
    icon: BiDrink,
    subCategories: [
      { name: "Coffee", items: ["Ground Coffee", "Instant Coffee", "Coffee Beans"] },
      { name: "Tea", items: ["Green Tea", "Black Tea", "Herbal Tea"] },
      { name: "Juices", items: ["Orange Juice", "Apple Juice", "Mixed Juice"] },
    ],
  },
  {
    name: "Food Items",
    icon: IoFastFoodOutline,
    subCategories: [
      { name: "Dairy and Eggs", items: ["Milk", "Yogurt", "Laban", "Cheese", "Eggs"] },
      { name: "Bakery", items: ["Bread", "Kubz", "Croissants", "Pastries"] },
      { name: "Frozen", items: ["Chicken", "Fish", "Vegetables", "Ready Meals"] },
      { name: "Canned Goods", items: ["Chickpeas", "Tuna", "Beans", "Tomatoes"] },
    ],
  },
  {
    name: "Non-Food",
    icon: MdOutlineCleaningServices,
    subCategories: [
      { name: "Household and Cleaning", items: ["All-Purpose Cleaner", "Dish Soap", "Floor Cleaner"] },
      { name: "Personal Care", items: ["Soap", "Body Wash", "Shampoo", "Toothpaste"] },
      { name: "Detergents", items: ["Laundry Detergent", "Fabric Softener", "Stain Remover"] },
    ],
  },
];
