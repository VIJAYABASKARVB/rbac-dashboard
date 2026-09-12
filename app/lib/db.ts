import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

//DB Helper Function
export async function checkDatabase() : Promise<boolean> {
  try{
    await prisma.$queryRaw`Select 1`;
    return true;
  }catch(error){
    console.error(`Database connection failed:${error}`);
    return false;
  }
}