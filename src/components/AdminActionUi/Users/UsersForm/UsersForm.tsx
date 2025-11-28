// "use client";
// import * as z from "zod";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import Heading from "@/components/Common/Heading/Heading";
// import { Button } from "@/components/UI/button";
// import { Separator } from "@/components/UI/separator";
// import { Billboard } from "@prisma/client";
// import { Trash } from "lucide-react";
// import { useState } from "react";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/UI/form";
// import { Input } from "@/components/UI/input";
// import toast from "react-hot-toast";
// import axios from "axios";
// import { useParams } from "next/navigation";
// import { useRouter } from "@/navigation";
// import { DOMAIN } from "@/lib/prismaDB/constains/constains";
// import AlertModal from "@/components/Modals/alert-modal";
// import ApiAlert from "@/components/UI/ApiAlert/api-alert";
// import UseOrigin from "@/hooks/use-origin";
// import ImageUpload from "@/components/UI/ImageUpload/ImageUpload";

// const formSchema = z.object({
//   label: z.string().min(1),
//   imageUrl: z.string().min(1),
// });

// type BillboardFormValues = z.infer<typeof formSchema>;

// interface BillboardFormProps {
//   initialData: Billboard | null;
// }

// const UsersForm: React.FC<BillboardFormProps> = ({ initialData }) => {
//   const params = useParams();
//   const router = useRouter();

//   const [open, setOpen] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const title = initialData ? "Edit billboard" : "Created billboard";
//   const description = initialData ? "Edit a billboard" : "Add a New billboard";
//   const toastMessage = initialData ? "Billboard Updated" : "Billboard Created";
//   const action = initialData ? "Save changes" : "Created billboard";

//   const form = useForm<BillboardFormValues>({
//     resolver: zodResolver(formSchema),
//     defaultValues: initialData || {
//       label: "",
//       imageUrl: "",
//     },
//   });

//   const onSubmit = async (data: BillboardFormValues) => {
//     try {
//       setLoading(true);
  
//       if (initialData) {
//         const response = await axios.patch(
//           `${DOMAIN}/api/${params.storeId}/billboards/${params.billboardId}`,
//           data
//         );
//         console.log("Update Response:", response.data);
//       } else {
//         const response = await axios.post(
//           `${DOMAIN}/api/${params.storeId}/billboards`,
//           data
//         );
//         console.log("Create Response:", response.data);
//       }
  
//       toast.success(toastMessage);
//       router.push(`/${params.storeId}/billboards`);
//       router.refresh();
//     } catch (error: any) {
//       console.error("API Error:", error.response?.data || error.message);
//       toast.error(error.response?.data?.message || "Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };
  

//   //______ Delete Store  __________
//   const onDelete = async () => {
//     try {
//       setLoading(true);
//       await axios.delete(`${DOMAIN}/api/${params.storeId}/billboards/${params.billboardId}`);
//       router.refresh();
//       router.push(`/`);
//       toast.success("Billboard Deleted.");
//       router.refresh();
//     } catch (error) {
//       toast.error("Make sure you removed all products and categories usning this billboard first.");
//     } finally {
//       setLoading(false);
//       setOpen(false);
//     }
//   };

//   return (
//     <>
//       <AlertModal
//         isOpen={open}
//         onClose={() => setOpen(false)}
//         onConfirm={onDelete}
//         loading={loading}
//       />

//       <div className="flex items-center justify-between w-full">
//         <Heading title={title} description={description} />

//         {initialData && (
//           <Button
//             disabled={loading}
//             className="bg-red-700 p-1 rounded-md text-white hover:bg-slate-600"
//             variant="destructive"
//             size="icon"
//             onClick={() => setOpen(true)}
//           >
//             <Trash className="h-4 w-4 " />
//           </Button>
//         )}
//       </div>
//       <Separator className="bg-gray-300" />

//       <Form {...form}>
//         <form
//           onSubmit={form.handleSubmit(onSubmit)}
//           className=" space-y-8 w-full"
//         >
//           <FormField
//             control={form.control}
//             name="imageUrl"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Background Image</FormLabel>
//                 <FormControl>
//                 <ImageUpload
//                     value={field.value ? [field.value] : []}
//                     onChange={(url) => field.onChange(url)}
//                     onRemove={() => field.onChange("")}
//                   />
//                 </FormControl>
//                 <FormMessage className="text-red-600" />
//               </FormItem>
//             )}
//           />
//           <div className="grid grid-cols-3 gap-8">
//             <FormField
//               control={form.control}
//               name="label"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Lable</FormLabel>
//                   <FormControl>
//                     <Input
//                       disabled={loading}
//                       placeholder="Billboard lable"
//                       {...field}
//                     />
//                   </FormControl>
//                   <FormMessage className="text-red-600" />
//                 </FormItem>
//               )}
//             />
//           </div>

//           <Button
//             disabled={loading}
//             className="ml-auto bg-slate-800 text-white hover:bg-slate-600"
//           >
//             {action}
//           </Button>
//         </form>
//       </Form>
//       <Separator className="bg-gray-300" />
//     </>
//   );
// };

// export default UsersForm;
