import prisma from "@/lib/prismaDB/prismadb";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { name, email, password, phone } = body;


  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      phone,
      hashedPassword,
      
    },
  });

  return NextResponse.json(user);
}
