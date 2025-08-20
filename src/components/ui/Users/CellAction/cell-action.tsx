// "use client";

// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuTrigger,
// } from "../../dropdown-menu";
// import {  Edit, MoreHorizontal, Trash } from "lucide-react";
// import { Button } from "../../button";
// import toast from "react-hot-toast";
// import { useParams } from "next/navigation";
// import { useState } from "react";
// import axios from "axios";
// import AlertModal from "@/components/Modals/alert-modal";
// import { Separator } from "../../separator";

// import UserColumnType from "@/types/UserColumnType";
// import { Role } from "@prisma/client";
// import { useRouter } from "@/i18n/routing";
// import { DOMAIN } from "@/lib/constains/constains";

// interface CellActionProps {
//   data: UserColumnType;
// }

// const CellAction: React.FC<CellActionProps> = ({ data }) => {
//   const router = useRouter();
//   const params = useParams();

//   const onCopy = (id: string) => {
//     navigator.clipboard.writeText(id);
//     toast.success("API Route Copied to the clipboard");
//   };

//   const [loading, setLoading] = useState(false);
//   const [open, setOpen] = useState(false);

//   //______ Update Role  __________
//   const updateRole = async (role: Role) => {
//     if (!data.id) return;

//     setLoading(true);
//     try {
//       await axios.patch(`${DOMAIN}/api/users/${data.id}`, { role });
//       toast.success("Role updated successfully");
//       router.refresh(); // Refresh the page after role change
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     } catch (error: any) {
//       console.error(error); // Log error details
//       toast.error(error.response?.data?.message || "Error updating role");
//     } finally {
//       setLoading(false);
//     }
//   };

//   //______ Delete Store  __________
//   const onDelete = async () => {
//     try {
//       setLoading(true);
//       await axios.delete(`${DOMAIN}/api/users/${data.id}`);
//       router.refresh();
//       router.push(`/users`);
//       toast.success("User Deleted.");
//       router.refresh(); // Refresh the page after role change

//       setOpen(false); // Close the modal after success
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     } catch (error: any) {
//       console.error(error); // Log error details
//       toast.error(
//         "Error deleting user. Ensure all related banners and categories are removed.",
//       );
//     } finally {
//       setLoading(false);
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

//       <DropdownMenu>
//         <DropdownMenuTrigger asChild>
//           <Button variant="ghost" className="h-8 w-8 p-0">
//             <span className="sr-only">Open Menu</span>
//             <MoreHorizontal className="h-4 w-4" />
//           </Button>
//         </DropdownMenuTrigger>

//         <DropdownMenuContent align="end" className="bg-white">
//           <DropdownMenuLabel>Role</DropdownMenuLabel>

//           <DropdownMenuItem
//             className="cursor-pointer"
//             onClick={() => updateRole("OWNER")}
//             disabled={loading} // Disable button if loading
//           >
//             <Edit className="mr-2 h-4 w-4" />
//             Owner
//           </DropdownMenuItem>

//           <Separator className="bg-slate-300" />

//           <DropdownMenuItem
//             className="cursor-pointer"
//             onClick={() => updateRole("MANGER")} // Fixed typo from "MANGER" to "MANAGER"
//             disabled={loading} // Disable button if loading
//           >
//             <Edit className="mr-2 h-4 w-4" />
//             Manager
//           </DropdownMenuItem>

//           <Separator className="bg-slate-300" />

//           <DropdownMenuItem
//             className="cursor-pointer"
//             onClick={() => updateRole("ADMIN")}
//             disabled={loading} // Disable button if loading
//           >
//             <Edit className="mr-2 h-4 w-4" />
//             Admin
//           </DropdownMenuItem>

//           <DropdownMenuItem
//             className="cursor-pointer"
//             onClick={() => updateRole("AdminOne")}
//             disabled={loading} // Disable button if loading
//           >
//             <Edit className="mr-2 h-4 w-4" />
//             Admin One
//           </DropdownMenuItem>

//           <DropdownMenuItem
//             className="cursor-pointer"
//             onClick={() => updateRole("AdminTwo")}
//             disabled={loading} // Disable button if loading
//           >
//             <Edit className="mr-2 h-4 w-4" />
//             Admin Two
//           </DropdownMenuItem>

//           <Separator className="bg-slate-300" />

//           <DropdownMenuItem
//             className="cursor-pointer"
//             onClick={() => updateRole("USER")}
//             disabled={loading} // Disable button if loading
//           >
//             <Edit className="mr-2 h-4 w-4" />
//             User
//           </DropdownMenuItem>
//           <Separator className="bg-slate-300" />

//           <DropdownMenuItem
//             className="cursor-pointer"
//             onClick={() => setOpen(true)}
//             disabled={loading} // Disable button if loading
//           >
//             <Trash className="mr-2 h-4 w-4" />
//             Delete
//           </DropdownMenuItem>
//         </DropdownMenuContent>
//       </DropdownMenu>
//     </>
//   );
// };

// export default CellAction;
