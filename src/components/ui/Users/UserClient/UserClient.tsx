// "use client";

// import Heading from "@/components/Common/Heading/Heading";
// import { Separator } from "../../separator";
// import { Button } from "../../button";
// import { Plus } from "lucide-react";
// import { useRouter } from "@/navigation";
// import { useParams } from "next/navigation";
// import { DataTable } from "../../data-table";
// import Columns from "../Columns/Columns";
// import ApiList from "../../api-list";

// import UserColumnType from "@/types/UserColumnType";


// interface UserClientProps {
//   data: UserColumnType[];
// }

// const UserClient: React.FC<UserClientProps> = ({ data }) => {
//   const router = useRouter();
//   const params = useParams();

  

//   return (
//     <>
//       <div className="flex items-center justify-between ">
//         <Heading
//           title={`Users (${data.length})`}
//           description="Mange Users for your store "
//         />

//         <Button
//           className="bg-green-400"
//           onClick={() => router.push(`/users/new `)}
//         >
//           <Plus className="mr-2 h-4 w-4" />
//           Add New
//         </Button>
//       </div>
//       <Separator className="bg-slate-300" />

//       <DataTable 
//         columns={Columns} 
//         data={data} 
//         searchKey="name"
        
//       />


//       <Heading  
//         title="API"
//         description="API calls for Banner"
        
//       />
//       <Separator className="bg-slate-300" />

//       <ApiList 
//         entityName="users"
//         entityIdName="userId"
//       />


//     </>
//   );
// };

// export default UserClient;
