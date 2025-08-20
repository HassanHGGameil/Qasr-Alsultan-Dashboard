import { Role } from "@prisma/client";

type UserColumnType = {
    id: string;
  name: string | null;  // Make name nullable
  email: string | null; // Make email nullable
  role: Role;
  createdAt: string;
  };
  
  export default UserColumnType;
  