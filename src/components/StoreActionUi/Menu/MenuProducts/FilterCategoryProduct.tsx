"use client";

import React, { useState, useMemo } from "react";
import { CategoryDto } from "@/types/frontendType/categoroies";
import GridList from "@/components/LogicList/GridList/GridList";
import TProduct from "@/types/frontendType/product";
import CategoriesListSlider from "@/components/LogicList/NewList/CategoriesListSlider";
import { useLocale } from "next-intl";
import { IoSearchSharp } from "react-icons/io5";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import CategoryCard from "../../Home/Categories/CategoryCard";
import CartHome from "../../Home/CartHome/CartHome";
import ProductCard from "../../Home/Products/Product/ProductCard";

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
  const [search, setSearch] = useState(""); // 🔍 NEW
  const [currentPage, setCurrentPage] = useState(1);

  const perPage = 6;
  const locale = useLocale();

  const handleSelectCategory = (catId: number | string) => {
    setSelectedCategory((prev) => (prev === catId ? null : catId));
    setSearch(""); // clear search when selecting category
    setCurrentPage(1);
  };

  const handleSearch = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  // 🔥 Filtered products with category + search
  const filteredProducts = useMemo(() => {
    let list = products;

    if (selectedCategory !== null) {
      list = list.filter((p) => p.categoriesId === selectedCategory);
    }

    if (search.trim().length > 0) {
      list = list.filter(
        (p) =>
          p.titleEn.toLowerCase().includes(search.toLowerCase()) ||
          p.titleAr.includes(search)
      );
    }

    return list;
  }, [products, selectedCategory, search]);

  const totalPages = Math.ceil(filteredProducts.length / perPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  return (
    <section className="py-20 bg-[#F5F5F5] dark:bg-slate-900">
      <div className="container flex flex-col gap-12">
        {/* Section Title */}


        {/* Categories Slider */}
        <CategoriesListSlider<CategoryDto>
          records={categories}
          renderItem={(item) => (
            <CategoryCard
              key={item.id}
              categoryItem={item}
              selectedCategory={selectedCategory}
              onSelect={handleSelectCategory}
            />
          )}
          className="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-sm"
          emptyMessage="Loading categories..."
        />

        {/* Search Bar */}
        <div className="flex justify-center">
          <div
            className="
              w-full max-w-xl
              flex items-center gap-3
              bg-white dark:bg-slate-800
              rounded-full shadow px-5 py-3
              border border-neutral-200 dark:border-neutral-700
              transition
              focus-within:ring-2 focus-within:ring-red-500
            "
          >
            <IoSearchSharp className="text-2xl text-red-600" />
            <input
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder={
                locale === "ar" ? "ابحث عن منتج..." : "Search for a product..."
              }
              className="
                w-full bg-transparent outline-none
                text-slate-700 dark:text-white
              "
            />
          </div>
        </div>

        {/* Main Layout */}
        <div className="flex flex-col-reverse lg:flex-row-reverse gap-10 mt-6">
          {/* Cart */}
          <aside className="w-full lg:w-[32%]">
            <CartHome />
          </aside>

          {/* Products */}
          <div className="w-full">
            <GridList<TProduct>
              records={paginatedProducts}
              renderItem={(item) => (
                <ProductCard key={item.id} productItem={item} />
              )}
              emptyMessage={
                locale === "ar" ? "لا توجد منتجات" : "No products found"
              }
              className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6"
            />

            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination>
                <PaginationContent className="mt-12 flex items-center gap-2">
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() =>
                        currentPage > 1 && setCurrentPage(currentPage - 1)
                      }
                      className="
                        cursor-pointer px-4 py-2 rounded-xl
                        border border-neutral-300 dark:border-neutral-700
                        hover:bg-red-50 dark:hover:bg-neutral-800
                        transition
                      "
                    />
                  </PaginationItem>

                  {Array.from({ length: totalPages }).map((_, i) => {
                    const page = i + 1;
                    return (
                      <PaginationItem key={page}>
                        <PaginationLink
                          isActive={currentPage === page}
                          onClick={() => setCurrentPage(page)}
                          className={`
                            px-4 py-2 rounded-xl font-medium cursor-pointer border
                            dark:border-neutral-700 transition
                            ${
                              currentPage === page
                                ? "bg-red-600 text-white border-red-600 shadow-md scale-105"
                                : "hover:bg-red-50 dark:hover:bg-neutral-800"
                            }
                          `}
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  })}

                  <PaginationItem>
                    <PaginationNext
                      onClick={() =>
                        currentPage < totalPages &&
                        setCurrentPage(currentPage + 1)
                      }
                      className="
                        cursor-pointer px-4 py-2 rounded-xl
                        border border-neutral-300 dark:border-neutral-700
                        hover:bg-red-50 dark:hover:bg-neutral-800
                        transition
                      "
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FilterCategoryProduct;
