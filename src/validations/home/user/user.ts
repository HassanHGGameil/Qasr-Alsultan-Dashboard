import { Role } from "@prisma/client";
import { z } from "zod";


export const createUserSchema = z.object({
  role: z.nativeEnum(Role),  // Use the Prisma enum directly
});



export interface ICreateUserDto {
  name: string;
  email: string;
  role: Role;
  createdAt: string;
}
