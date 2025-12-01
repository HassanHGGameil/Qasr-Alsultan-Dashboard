"use client";
import React, { useState } from "react";
import { CategoryDto } from "@/types/frontendType/categoroies";
import CategoryCard from "../Categories/CategoryCard";
import GridList from "@/components/LogicList/GridList/GridList";
import ProductCard from "../Products/Product/ProductCard";

import TProduct from "@/types/frontendType/product";
import CartHome from "../CartHome/CartHome";
import CategoriesListSlider from "@/components/LogicList/NewList/CategoriesListSlider";
import Link from "@/components/common/Link";
import { useLocale } from "next-intl";
import { IoFastFoodSharp } from "react-icons/io5";

// shadcn pagination
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface CategoryClientProps {
  categories: CategoryDto[];
  products: TProduct[];
}

const FilterCategoryProduct = ({
  categories,
  products,
}: CategoryClientProps) => {
  const [selectedCategory, setSelectedCategory] = useState<
    number | string | null
  >(null);

  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 6;

  const locale = useLocale();

  const handleSelectCategory = (catId: number | string) => {
    if (selectedCategory === catId) setSelectedCategory(null);
    else setSelectedCategory(catId);

    setCurrentPage(1); // reset to first page when category changes
  };

  const categoryList = (item: CategoryDto) => (
    <CategoryCard
      key={item.id}
      categoryItem={item}
      selectedCategory={selectedCategory}
      onSelect={handleSelectCategory}
    />
  );

  // Filter products by category
  const filteredProducts =
    selectedCategory === null
      ? products
      : products.filter((p) => p.categoriesId === selectedCategory);

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / perPage);

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  const productsList = (item: TProduct) => (
    <ProductCard key={item.id} productItem={item} />
  );

  return (
    <section className="text-center py-20 flex flex-col gap-4 bg-[#EBEBEB] dark:bg-slate-900">
      <div className="container">
        {/* Categories Slider */}
        <CategoriesListSlider<CategoryDto>
          records={categories}
          renderItem={categoryList}
          className="bg-slate-100 dark:bg-slate-800 rounded-md"
          emptyMessage="Loading categories..."
        />

        <div className="flex flex-col-reverse lg:flex-row-reverse justify-center items-start mt-10 gap-10">
          {/* Cart Section */}
          <div className="w-full lg:w-[30%] py-2">
            <CartHome />
          </div>

          {/* Products Section */}
          <div className="w-full flex flex-col items-center">
            <GridList<TProduct>
              records={paginatedProducts}
              renderItem={productsList}
              emptyMessage="No products available"
              className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-2 lg:gap-6"
            />

            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination>
                <PaginationContent className="mt-10 flex items-center gap-2">
                  {/* Previous */}
                  <PaginationItem>
                    <PaginationPrevious
                      className="
          cursor-pointer px-4 py-2 rounded-xl
          border border-transparent
          hover:bg-red-50 dark:hover:bg-neutral-800
          transition-all duration-300
          disabled:opacity-40 disabled:cursor-not-allowed
        "
                      onClick={() =>
                        currentPage > 1 && setCurrentPage(currentPage - 1)
                      }
                    />
                  </PaginationItem>

                  {/* Page Numbers */}
                  {Array.from({ length: totalPages }).map((_, i) => {
                    const page = i + 1;
                    const active = currentPage === page;

                    return (
                      <PaginationItem key={page}>
                        <PaginationLink
                          isActive={active}
                          className={`
              px-4 py-2 rounded-xl text-sm font-medium
              transition-all duration-300 cursor-pointer
              border
              ${
                active
                  ? "bg-red-600 text-white border-red-600 shadow-md scale-105"
                  : "border-neutral-200 dark:border-neutral-700 hover:bg-red-50 dark:hover:bg-neutral-800"
              }
            `}
                          onClick={() => setCurrentPage(page)}
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  })}

                  {/* Next */}
                  <PaginationItem>
                    <PaginationNext
                      className="
          cursor-pointer px-4 py-2 rounded-xl
          border border-transparent
          hover:bg-red-50 dark:hover:bg-neutral-800
          transition-all duration-300
          disabled:opacity-40 disabled:cursor-not-allowed
        "
                      onClick={() =>
                        currentPage < totalPages &&
                        setCurrentPage(currentPage + 1)
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}

            {/* Show All Products */}
            <div className="mt-16 mb-5 flex items-center justify-center">
              <Link
                href="/menu"
                className="
                  flex items-center gap-2
                  px-8 py-4
                  border-2 border-red-900 
                  text-red-900 dark:text-white
                  rounded-full
                  font-medium
                  hover:bg-red-900 hover:text-white
                  transition-all duration-300
                "
              >
                <IoFastFoodSharp className="text-xl" />
                {locale === "ar"
                  ? "عرض المنيو و المنتجات"
                  : "Show All Products"}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FilterCategoryProduct;
