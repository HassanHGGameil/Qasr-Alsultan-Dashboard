'use client';

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Trash } from "lucide-react";
import { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import axios from "axios";
import AlertModal from "@/components/Modals/alert-modal";
import { ProductCategory } from "@prisma/client";
import { createProductCategorySchema } from "@/validations/home/products/productCategory";
import { axiosErrorHandler } from "@/utils";
import { DOMAIN } from "@/lib/constains/constains";
import Heading from "@/components/common/Heading/Heading";
// ⚡ make sure this is correct — you can swap to "next/navigation" if needed
import { useRouter } from "@/i18n/routing"; 
import { useParams } from "next/navigation";

type CategoryFormValues = z.infer<typeof createProductCategorySchema>;

interface CategoryFormProps {
  initialData: ProductCategory | null;
}

const CategoriesForm: React.FC<CategoryFormProps> = ({ initialData }) => {
  // ✅ Correct Next.js 15 typing for useParams
  const params = useParams<{ categoriesId?: string }>();
  const categoryId = params?.categoriesId;

  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? "Edit Category" : "Create Category";
  const description = initialData ? "Edit a Category" : "Add a New Category";
  const toastMessage = initialData ? "Category Updated" : "Category Created";
  const action = initialData ? "Save changes" : "Create Category";

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(createProductCategorySchema),
    defaultValues: {
      nameEn: initialData?.nameEn ?? "",
      nameAr: initialData?.nameAr ?? "",
      imageUrl: initialData?.imageUrl ?? "",
    },
  });

  const onSubmit = async (data: CategoryFormValues) => {
    try {
      setLoading(true);

      if (initialData && categoryId) {
        await axios.patch(`${DOMAIN}/api/home/categories/${categoryId}`, data);
      } else {
        await axios.post(`${DOMAIN}/api/home/categories`, data);
      }

      toast.success(toastMessage);
      router.push("/home/categories");
    } catch (error) {
      toast.error(axiosErrorHandler(error) || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    if (!categoryId) return;
    try {
      setLoading(true);
      await axios.delete(`${DOMAIN}/api/home/categories/${categoryId}`);
      router.push("/home/categories");
      toast.success("Category Deleted.");
    } catch (error) {
      toast.error(
        axiosErrorHandler(error) ||
          "Make sure you removed all products using this category first."
      );
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />

      <div className="flex items-center justify-between w-full">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            aria-label="Delete category"
            disabled={loading}
            className="bg-red-700 p-1 rounded-md text-white hover:bg-slate-600"
            variant="destructive"
            size="icon"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator className="bg-gray-300" />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={`space-y-8 w-full ${loading ? "opacity-60 pointer-events-none" : ""}`}
        >
          {/* English & Arabic names */}
          <div className="grid gap-6 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="nameEn"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name (EN)</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Category Name in English"
                      className="placeholder:text-gray-500"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="nameAr"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name (AR)</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Category Name in Arabic"
                      className="placeholder:text-gray-500"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />
          </div>

         

          {/* Submit button */}
          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={loading}
              className="bg-slate-800 text-white hover:bg-slate-600"
            >
              {action}
            </Button>
          </div>
        </form>
      </Form>
      <Separator className="bg-gray-300" />
    </>
  );
};

export default CategoriesForm;
