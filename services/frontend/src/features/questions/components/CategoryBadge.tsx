import React from "react";

import { Badge } from "@/components/ui/badge";

import type { Category } from "@/features/questions";
import { categoryColors } from "@/features/questions/utils/categoryStyles";

interface CategoryBadgeProps {
  categories: Category[];
}

export const CategoryBadge = ({ categories }: CategoryBadgeProps) => (
  <div className="flex gap-2">
    {categories.map((category) => (
      <div key={category}>
        <Badge className={categoryColors[category]} variant="outline">
          {category}
        </Badge>
      </div>
    ))}
  </div>
);
