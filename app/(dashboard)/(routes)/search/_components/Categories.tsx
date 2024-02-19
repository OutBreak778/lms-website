"use client"

import { Category } from "@prisma/client";
import React from "react";
import { IconType } from "react-icons";
import {
  FcMusic,
  FcOldTimeCamera,
  FcSportsMode,
  FcSalesPerformance,
  FcMultipleDevices,
  FcFilmReel,
  FcEngineering,
  FcTrademark,
  FcAdvertising,
  FcBullish,
} from "react-icons/fc";
import CategoryItem from "./CategoryItem";

interface CategoriesProps {
  item: Category[];
}

const iconMap: Record<Category["name"], IconType> = {
  "Music": FcMusic,
  "Photography": FcOldTimeCamera,
  "Fitness": FcSportsMode,
  "Accounting": FcSalesPerformance,
  "Computer Science": FcMultipleDevices,
  "Filming": FcFilmReel,
  "Engineering": FcEngineering,
  "Stock Market": FcBullish
};

const Categories: React.FC<CategoriesProps> = ({ item }) => {
  return (
    <div className="flex items-center gap-x-2 overflow-x-auto pb-2">
      {item.map((item) => (
        <CategoryItem
          key={item.id}
          label={item.name}
          icon={iconMap[item.name]}
          value={item.id}
        />
      ))}
    </div>
  );
};

export default Categories;
