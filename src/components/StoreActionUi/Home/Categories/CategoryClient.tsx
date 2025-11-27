"use client";
import React from "react";
import CategoryCard from "./CategoryCard";
import { CategoryDto } from "@/types/frontendType/categoroies"; 
import NewList from "@/components/LogicList/NewList/NewList";
import SectionTitle from "@/components/common/SeactionHeader/SectionTitle";

interface CategoryClientProps {
  categories: CategoryDto[];
}

const CategoryClinet = ({ categories }: CategoryClientProps) => {
  const categoryList = (item: CategoryDto) => (
    <CategoryCard selectedCategory={null}
      onSelect={() => {}} key={item.id} categoryItem={item} />
  );

  return (
    <section className="text-center py-8 container">
      <SectionTitle
        titleEn="Popular Dishes"
        titleAr="الوجبات و المشوياتات"
        subtitleEn="Premium Quality for Your Culinary Excellence"
        subtitleAr="جودة فائقة لتميزك في عالم الطهي"
        iconPosition="top"
        underline
        center
        gradientText
      />
      {""}

      <NewList<CategoryDto>
        records={categories}
        renderItem={categoryList}
        emptyMessage="Loading please wait"
      />
    </section>
  );
};

export default CategoryClinet;
