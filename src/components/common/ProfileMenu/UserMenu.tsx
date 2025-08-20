// import {
//     DropdownMenu,
//     DropdownMenuContent,
//     DropdownMenuItem,
//     DropdownMenuTrigger,
//   } from "@/components/UI/dropdown-menu";
//   import { Avatar, AvatarImage, AvatarFallback } from "@/components/UI/avatar";
// import { useSession } from "next-auth/react";
// import getCurrentUser from "@/actions/getCurrentUser";
  
//   const UserMenu = async () => {


//     const currentUser = await getCurrentUser()



//     return (
//       <div className="hidden md:block">
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <button className="focus:outline-none">
//               <Avatar>
//                 <AvatarImage src={currentUser.image} alt="Profile" />
//               </Avatar>
//             </button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent className="w-48">
//             <DropdownMenuItem>
//               <a href="#" className="w-full">
//                 Profile
//               </a>
//             </DropdownMenuItem>
//             <DropdownMenuItem>
//               <a href="#" className="w-full">
//                 Settings
//               </a>
//             </DropdownMenuItem>
//             <DropdownMenuItem>
//               <a href="#" className="w-full">
//                 Logout
//               </a>
//             </DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>
//       </div>
//     );
//   };
  
//   export default UserMenu;