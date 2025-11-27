"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ProductAddtions, ProductCategory, ProductItem } from "@prisma/client";
import { Plus, Trash, Loader2 } from "lucide-react";
import { useCallback, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import toast from "react-hot-toast";
import axios from "axios";
import AlertModal from "@/components/Modals/alert-modal";
import ImageUpload from "@/components/ui/ImageUpload/ImageUpload";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createProductAddionsSchema } from "@/validations/home/products/productAddions";
import { DOMAIN } from "@/lib/constains/constains";
import { axiosErrorHandler } from "@/utils";
import Heading from "@/components/common/Heading/Heading";
import { useParams } from "next/navigation";
import { useRouter } from "@/i18n/routing";

type UserPkgFormValues = z.infer<typeof createProductAddionsSchema>;

interface UserPkgFormProps {
  initialData:
    | (ProductAddtions & {
        productItem: ProductItem[];
      })
    | null;
  productCategory: ProductCategory[] | null;
}

const ProductAddionsForm: React.FC<UserPkgFormProps> = ({
  initialData,
  productCategory,
}) => {
  const params = useParams() as { productAddtionsId: string };
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? "Edit PKG-Items" : "Create PKG-Items";
  const description = initialData ? "Edit a PKG-Items" : "Add a New PKG-Items";
  const toastMessage = initialData ? "PKG-Items Updated" : "PKG-Items Created";
  const action = initialData ? "Save changes" : "Create PKG-Items";

  const form = useForm<UserPkgFormValues>({
    resolver: zodResolver(createProductAddionsSchema),
    defaultValues: initialData
      ? {
          ...initialData,
          productItem: initialData.productItem.map((item) => ({
            ...item,
            price: Number(item.price), // Convert Decimal to number
            quantity: Number(item.quantity), // Convert Decimal to number
          })),
        }
      : {
          titleEn: "",
          titleAr: "",
          imageUrl: "",
          productItem: [],
        },
  });

  // Add a new item to the package
  const addItem = useCallback(() => {
    const productItemLength = form.getValues("productItem").length;
    if (productItemLength >= 100) {
      toast.error("You can only add up to 100 items.");
      return;
    }
    form.setValue("productItem", [
      ...form.getValues("productItem"),
      {
        nameEn: "",
        nameAr: "",
        imageUrl: "",
        price: 0,
        quantity: 1,
        productCategoryId: "",
      },
    ]);
  }, [form]);

  // Delete an item from the package
  const deletePkgItem = useCallback(
    (index: number) => {
      const updatedPkgItem = form
        .getValues("productItem")
        .filter((_, idx) => idx !== index);
      form.setValue("productItem", updatedPkgItem);
    },
    [form]
  );

  // Submit the form
  const onSubmit = async (data: UserPkgFormValues) => {
    try {
      setLoading(true);

      if (initialData) {
        await axios.patch(
          `${DOMAIN}/api/home/products/productAddtions/${params.productAddtionsId}`,
          data
        );
      } else {
        await axios.post(`${DOMAIN}/api/home/products/productAddtions`, data);
      }
      toast.success(toastMessage);
      router.push(`/home/products/productAddtions`);
      router.refresh();
    } catch (error) {
      console.error("API Error:", axiosErrorHandler(error));
      toast.error(axiosErrorHandler(error) || "Something went wrong");
      axiosErrorHandler(error);
    } finally {
      setLoading(false);
    }
  };

  // Delete the package recipe
  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(
        `${DOMAIN}/api/home/products/productAddtions/${params.productAddtionsId}`
      );
      router.refresh();
      router.push(`/home/products/productAddtions`);
      toast.success("Package recipe deleted successfully.");
    } catch (error) {
      toast.error(
        "Make sure you removed all products and categories using this package recipe first."
      );
      axiosErrorHandler(error);
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

      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={loading}
            className="bg-red-600 hover:bg-red-700"
            variant="destructive"
            size="icon"
            onClick={() => setOpen(true)}
            aria-label="Delete package recipe"
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator className="bg-gray-300 my-4" />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
            <FormField
              control={form.control}
              name="titleEn"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title (English)</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Enter English title"
                      className="placeholder:text-gray-400"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-sm text-red-500" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="titleAr"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title (Arabic)</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Enter Arabic title"
                      className="placeholder:text-gray-400"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-sm text-red-500" />
                </FormItem>
              )}
            />
          </div>

          <div className="">
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Background Image</FormLabel>
                  <FormControl>
                    <ImageUpload
                      value={field.value ? [field.value] : []}
                      onChange={(url) => field.onChange(url)}
                      onRemove={() => field.onChange("")}
                      className="w-32 h-32 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center"
                    />
                  </FormControl>
                  <FormMessage className="text-sm text-red-500" />
                </FormItem>
              )}
            />
          </div>

          {/* Package Items */}
          <div className="space-y-6">
            <FormLabel className="text-lg font-semibold text-gray-700">
              Package Items
            </FormLabel>
            <div className="grid grid-cols-3 gap-4">
              {form.watch("productItem").map((productItem, index) => (
                <div
                  key={index}
                  className="px-6 border rounded-lg shadow-sm bg-white hover:shadow-md transition-shadow duration-200"
                >
                  <div className="flex justify-end">
                    <Button
                      type="button"
                      onClick={() => deletePkgItem(index)}
                      className=" mt-4 bg-red-600 hover:bg-red-700 text-white focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-200"
                      disabled={loading}
                      aria-label=""
                    >
                      <Trash className="h-4 w-4 " />
                    </Button>
                  </div>
                  <div className="flex items-center gap-5 pb-4">
                    {/* Image Upload */}
                    <FormField
                      control={form.control}
                      name={`productItem.${index}.imageUrl`}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <ImageUpload
                              value={field.value ? [field.value] : []}
                              onChange={(url) => field.onChange(url)}
                              onRemove={() => field.onChange("")}
                              className="w-[95%] h-[130px] rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center hover:border-gray-400 transition-colors duration-200"
                            />
                          </FormControl>
                          {form.formState.errors?.productItem?.[index]
                            ?.imageUrl && (
                            <FormMessage className="text-sm text-red-500 mt-1">
                              {
                                form.formState.errors.productItem[index]
                                  .imageUrl.message
                              }
                            </FormMessage>
                          )}
                        </FormItem>
                      )}
                    />

                    {/* Category, Name, and Price Fields */}
                    <div className="space-y-4 mt-4">
                      <div className="grid  grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name={`productItem.${index}.nameEn`}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  disabled={loading}
                                  placeholder="Enter English name"
                                  className="hover:bg-gray-50 focus:ring-2 focus:ring-blue-500"
                                  {...field}
                                />
                              </FormControl>
                              {form.formState.errors?.productItem?.[index]
                                ?.nameEn && (
                                <FormMessage className="text-sm text-red-500 mt-1">
                                  {
                                    form.formState.errors.productItem[index]
                                      .nameEn.message
                                  }
                                </FormMessage>
                              )}
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`productItem.${index}.nameAr`}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  disabled={loading}
                                  placeholder="Enter Arabic name"
                                  className="hover:bg-gray-50 focus:ring-2 focus:ring-blue-500"
                                  {...field}
                                />
                              </FormControl>
                              {form.formState.errors?.productItem?.[index]
                                ?.nameAr && (
                                <FormMessage className="text-sm text-red-500 mt-1">
                                  {
                                    form.formState.errors.productItem[index]
                                      .nameAr.message
                                  }
                                </FormMessage>
                              )}
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name={`productItem.${index}.price`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-[12px] font-medium text-gray-700">
                                Price
                              </FormLabel>
                              <FormControl>
                                <Input
                                  disabled={loading}
                                  type="number"
                                  placeholder="Enter price"
                                  className="hover:bg-gray-50 focus:ring-2 focus:ring-blue-500"
                                  {...field}
                                />
                              </FormControl>
                              {form.formState.errors?.productItem?.[index]
                                ?.price && (
                                <FormMessage className="text-sm text-red-500 mt-1">
                                  {
                                    form.formState.errors.productItem[index]
                                      .price.message
                                  }
                                </FormMessage>
                              )}
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`productItem.${index}.quantity`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-[12px] font-medium text-gray-700">
                                Quantity
                              </FormLabel>
                              <FormControl>
                                <Input
                                  disabled={loading}
                                  type="number"
                                  placeholder="Enter quantity"
                                  className="hover:bg-gray-50 focus:ring-2 focus:ring-blue-500"
                                  {...field}
                                />
                              </FormControl>
                              {form.formState.errors?.productItem?.[index]
                                ?.quantity && (
                                <FormMessage className="text-sm text-red-500 mt-1">
                                  {
                                    form.formState.errors.productItem[index]
                                      .quantity.message
                                  }
                                </FormMessage>
                              )}
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-1 ">
                        <FormField
                          control={form.control}
                          name={`productItem.${index}.productCategoryId`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-[12px] font-medium text-gray-700">
                                Category
                              </FormLabel>
                              <Select
                                disabled={loading}
                                onValueChange={field.onChange}
                                value={String(field.value)}
                                defaultValue={String(field.value)}
                              >
                                <FormControl>
                                  <SelectTrigger className="hover:bg-gray-50  focus:ring-2 focus:ring-blue-500">
                                    <SelectValue placeholder="Select a category" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent className="bg-white shadow-lg">
                                  {productCategory?.map((category) => (
                                    <SelectItem
                                      key={category.id}
                                      value={String(category.id)}
                                      className="hover:bg-gray-100 focus:bg-green-600 focus:text-white"
                                    >
                                      {category.nameEn}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              {form.formState.errors?.productItem?.[index]
                                ?.productCategoryId && (
                                <FormMessage className="text-sm text-red-500 mt-1">
                                  {
                                    form.formState.errors.productItem[index]
                                      .productCategoryId.message
                                  }
                                </FormMessage>
                              )}
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Item Button */}
            <Button
              type="button"
              onClick={addItem}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200"
              disabled={loading}
              aria-label="Add item"
            >
              <Plus className="h-4 w-4" />
              Add Item
            </Button>
          </div>
          <div className="flex items-center gap-4">
            <Button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 bg-slate-800 text-white hover:bg-slate-700"
              aria-label="Save changes"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              {action}
            </Button>
            <Button
              type="button"
              onClick={() => router.back()}
              className="bg-gray-500 text-white hover:bg-gray-600"
              aria-label="Go back"
            >
              Back
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default ProductAddionsForm;
