"use client";
import { CheckCircle, Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { IProductItem } from "@/types/frontendType/product";
import { useState } from "react";

interface ItemCardProps {
  productItem: IProductItem;
  selectedItems: IProductItem[];
  setSelectedItems: (items: IProductItem[]) => void;
}

export default function ProductItem({
  productItem,
  selectedItems,
  setSelectedItems,
}: ItemCardProps) {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const toggleCategory = (id: string) => {
    setExpandedCategory(expandedCategory === id ? null : id);
  };

  const handleItemSelection = (item: IProductItem) => {
    if (selectedItems.find((selected) => selected.id === item.id)) {
      const filteredSelectedItems = selectedItems.filter(
        (selected) => selected.id !== item.id
      );
      setSelectedItems(filteredSelectedItems);
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xs overflow-hidden border border-gray-100 dark:border-gray-800">
      <div>
        <button
          className="w-full flex justify-between items-center px-5 py-4 text-base font-medium text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
          onClick={() => toggleCategory(productItem.id)}
        >
          <div className="flex items-center gap-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg flex items-center justify-center p-1 border border-gray-200 dark:border-gray-700">
              <Image
                src={productItem.imageUrl}
                width={40}
                height={40}
                alt={productItem.nameEn}
                className="rounded-lg object-contain w-8 h-8"
                priority
              />
            </div>
            <span className="text-sm font-medium">{productItem.nameEn}</span>
          </div>
          {expandedCategory === productItem.id ? (
            <Minus size={16} />
          ) : (
            <Plus size={16} />
          )}
        </button>

        <AnimatePresence>
          {expandedCategory === productItem.id && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="px-5 pb-4 space-y-3"
            >
              <div className="grid grid-cols-1 gap-3">
                <motion.div
                  whileTap={{ scale: 0.98 }}
                  className={`relative flex items-center p-1 rounded-lg cursor-pointer transition-all duration-200 ${
                    selectedItems.some((e) => e.id === productItem.id)
                      ? "bg-green-50 dark:bg-green-900/20 border-2 border-green-500"
                      : "bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
                  }`}
                  onClick={() => handleItemSelection(productItem)}
                >
                  {selectedItems.some((e) => e.id === productItem.id) && (
                    <div className="absolute -top-2 -left-2 bg-green-500 text-white rounded-full p-1 shadow-sm">
                      <CheckCircle size={16} />
                    </div>
                  )}

                  <div className="bg-white dark:bg-gray-700 rounded-lg flex-shrink-0 mr-3 border border-gray-200 dark:border-gray-600">
                    <Image
                      src={productItem.imageUrl}
                      width={60}
                      height={60}
                      alt={productItem.nameEn}
                      className="rounded-lg object-contain w-14 h-14"
                      priority
                    />
                  </div>

                  <div className="flex-grow px-2 min-w-0">
                    <h4 className="text-xs font-medium text-gray-900 dark:text-gray-100 truncate">
                      {productItem.nameEn}
                    </h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {productItem.price}
                    </p>
                  </div>

                  <div className="flex items-center bg-white dark:bg-gray-700 rounded-full p-0.5 border border-gray-200 dark:border-gray-600">
                    <button className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                      <Minus size={14} />
                    </button>
                    <span className="text-xs font-medium min-w-[1.2rem] lg:min-w-[1.5rem] text-center">
                      {1}
                    </span>
                    <button className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                      <Plus size={14} />
                    </button>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
