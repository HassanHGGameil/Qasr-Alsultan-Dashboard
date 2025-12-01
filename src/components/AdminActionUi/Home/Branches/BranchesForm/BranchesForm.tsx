"use client";
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
import ImageUpload from "@/components/ui/ImageUpload/ImageUpload";
import { Branches } from "@prisma/client";
import { axiosErrorHandler } from "@/utils";
import { DOMAIN } from "@/lib/constains/constains";
import Heading from "@/components/common/Heading/Heading";
import { useRouter } from "@/i18n/routing";
import { useParams } from "next/navigation";
import { createBranchesSchema } from "@/validations/branches";

type BranchesFormValues = z.infer<typeof createBranchesSchema>;

interface BranchesFormProps {
  initialData: Branches | null;
}

const BranchesForm: React.FC<BranchesFormProps> = ({ initialData }) => {
  const params = useParams() as { branchId: string };
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? "Edit Branche" : "Created Branche";
  const description = initialData ? "Edit a Branche" : "Add a New Branche";
  const toastMessage = initialData ? "Branche Updated" : "Branche Created";
  const action = initialData ? "Save changes" : "Created Branche";

  const form = useForm<BranchesFormValues>({
    resolver: zodResolver(createBranchesSchema),
    defaultValues: initialData || {
      nameEn: "",
      nameAr: "",
      titleEn: "",
      titleAr: "",
      imageUrl: "",
      dateEn: "",
      dateAr: "",
      phone: "",
      locationLink: "",
    },
  });

  const onSubmit = async (data: BranchesFormValues) => {
    try {
      setLoading(true);

      if (initialData) {
        const response = await axios.patch(
          `${DOMAIN}/api/home/branches/${params.branchId}`,
          data
        );
        console.log("Update Response:", response.data);
      } else {
        const response = await axios.post(`${DOMAIN}/api/home/branches`, data);
        console.log("Create Response:", response.data);
      }

      toast.success(toastMessage);
      router.push(`/dashboard/home/branches`);
      router.refresh();
    } catch (error) {
      toast.error(axiosErrorHandler(error) || "Something went wrong");
      axiosErrorHandler(error);
    } finally {
      setLoading(false);
    }
  };

  //______ Delete Store  __________
  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`${DOMAIN}/api/home/branches/${params.branchId}`);
      router.push(`/dashboard/home/branches`);
      toast.success("Category Deleted.");
      router.refresh();
    } catch (error) {
      toast.error(
        axiosErrorHandler(error) ||
          "Make sure you removed all products and categories usning this category first."
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

      <div className="flex items-center justify-between w-full">
        <Heading title={title} description={description} />

        {initialData && (
          <Button
            disabled={loading}
            className="bg-red-700 p-1 rounded-md text-white hover:bg-slate-600"
            variant="destructive"
            size="icon"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4 " />
          </Button>
        )}
      </div>
      <Separator className="bg-gray-300" />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className=" space-y-8 w-full"
        >
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="nameEn"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name-En</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Category Name-En"
                      className=" placeholder:text-gray-500"
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
                  <FormLabel>Name-Ar</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Category Name-Ar"
                      className=" placeholder:text-gray-500"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="titleEn"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title-En</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Title-En"
                      className=" placeholder:text-gray-500"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="titleAr"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title-Ar</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Title-Ar"
                      className=" placeholder:text-gray-500"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="dateEn"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>DateEn / Time</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="DateEn / Time"
                      className=" placeholder:text-gray-500"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dateAr"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>DateAr / Time</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="DateAr / Time"
                      className=" placeholder:text-gray-500"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Branch Phone</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Branch Phone"
                      className=" placeholder:text-gray-500"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="locationLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location Link</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Location Link"
                      className=" placeholder:text-gray-500"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-3 gap-8">
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
                    />
                  </FormControl>
                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />
          </div>

          <Button
            disabled={loading}
            className="ml-auto bg-slate-800 text-white hover:bg-slate-600"
          >
            {action}
          </Button>
        </form>
      </Form>
      <Separator className="bg-gray-300" />
    </>
  );
};

export default BranchesForm;
