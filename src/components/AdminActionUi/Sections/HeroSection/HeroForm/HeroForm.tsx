"use client";
import * as z from "zod";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Heading from "@/components/common/Heading/Heading";
import AlertModal from "@/components/Modals/alert-modal";

import { DOMAIN } from "@/lib/constains/constains";
import { useRouter } from "@/i18n/routing";
import { axiosErrorHandler } from "@/utils";
import ImageUpload from "@/components/ui/ImageUpload/ImageUpload";
import { heroSectionSchema } from "@/validations/sections/heroSection";
import { Checkbox } from "@/components/ui/checkbox";
import { Hero, HeroImages } from "@prisma/client";

type HeroFormValues = z.infer<typeof heroSectionSchema>;

interface HeroFormProps {
  initialData:
    | (Hero & {
        heroImages: HeroImages[];
      })
    | null;
}

const HeroForm: React.FC<HeroFormProps> = ({ initialData }) => {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? "Edit Hero" : "Create Hero";
  const description = initialData
    ? "Edit the selected Hero details."
    : "Add a new Hero entry.";
  const toastMessage = initialData
    ? "Hero updated successfully."
    : "Hero created successfully.";
  const action = initialData ? "Save Changes" : "Create Hero";

  const form = useForm<HeroFormValues>({
    resolver: zodResolver(heroSectionSchema),
    defaultValues: initialData
      ? {
          ...initialData,
          bgOne: initialData.bgOne ?? "",
          bgTwo: initialData.bgTwo ?? "",
          heroImages: initialData.heroImages.map((img) => ({
            url: img.url,
            id: img.id,
            heroId: img.heroId,
          })),
        }
      : {
          titleEn: "",
          titleAr: "",
          subtitleEn: "",
          subtitleAr: "",
          descEn: "",
          descAr: "",
          bgOne: "",
          bgTwo: "",
          heroImages: [],
          isFeatured: false,
          isArchived: false,
        },
  });

  const onSubmit = async (data: HeroFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(`${DOMAIN}/api/hero/${params.id}`, data);
      } else {
        await axios.post(`${DOMAIN}/api/hero`, data);
      }

      toast.success(toastMessage);
      router.push(`/dashboard/sections/hero`);
      router.refresh();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      axiosErrorHandler(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`${DOMAIN}/api/hero/${params.id}`);
      toast.success("Hero deleted successfully.");
      router.push(`/dashboard/sections/hero`);
      router.refresh();
    } catch (error) {
      axiosErrorHandler(error);
      toast.error("Please remove related dependencies before deleting.");
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

      <div className="flex items-center justify-between mb-6">
        <Heading title={title} description={description} />
        <Button
          variant="outline"
          onClick={() => router.back()}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
      </div>

      <Separator className="mb-8 bg-gray-300" />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-10 bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border"
        >
          {/* Basic info */}

          {/* Titles */}

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="titleEn"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title (English)</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Enter English Subtitle"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
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
                      placeholder="أدخل الوصف بالعربية"
                      dir="rtl"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="subtitleEn"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subtitle (English)</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Enter English Subtitle"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="subtitleAr"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subtitle (Arabic)</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="أدخل العنوان بالعربية"
                      dir="rtl"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="descEn"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description (English)</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Enter English Description"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="descAr"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description (Arabic)</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="أدخل العنوان بالعربية"
                      dir="rtl"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <FormField
              control={form.control}
              name="heroImages"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Images</FormLabel>
                  <FormControl>
                    <ImageUpload
                      value={field.value.map((image) => image.url)}
                      onChange={(url) =>
                        field.onChange([...field.value, { url }])
                      }
                      onRemove={(url) =>
                        field.onChange([
                          ...field.value.filter(
                            (current) => current.url !== url
                          ),
                        ])
                      }
                    />
                  </FormControl>
                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bgOne"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Background Image One</FormLabel>
                  <FormControl>
                    <ImageUpload
                      value={field.value ? [field.value] : []}
                      onChange={(url) => field.onChange(url)}
                      onRemove={() => field.onChange("")}
                    />
                  </FormControl>
                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bgTwo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Background Image Two</FormLabel>
                  <FormControl>
                    <ImageUpload
                      value={field.value ? [field.value] : []}
                      onChange={(url) => field.onChange(url)}
                      onRemove={() => field.onChange("")}
                    />
                  </FormControl>
                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-3  gap-8">
            <FormField
              control={form.control}
              name="isFeatured"
              render={({ field }) => (
                <FormItem className="bg-slate-100 flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>

                  <div className="space-y-1 leading-none">
                    <FormLabel>Featured</FormLabel>

                    <FormDescription>
                      This product will appear on the home page
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isArchived"
              render={({ field }) => (
                <FormItem className="bg-slate-100 flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field?.value}
                      onCheckedChange={field?.onChange}
                    />
                  </FormControl>

                  <div className="space-y-1 leading-none">
                    <FormLabel>Archived</FormLabel>

                    <FormDescription>
                      This product will not appear on anyware in the store
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
          </div>

          {/* Submit */}
          <div className="flex justify-end">
            <Button
              disabled={loading}
              className="bg-slate-800 text-white hover:bg-slate-700 px-6 py-2 rounded-lg"
            >
              {action}
            </Button>
          </div>
        </form>
      </Form>

      <Separator className="mt-10 bg-gray-300" />
    </>
  );
};

export default HeroForm;
