import { checkDatabase } from "../../lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const isConnected = await checkDatabase();
  if(!isConnected){
    return NextResponse.json(
      {
        status:"error",
        message:"Database connection failed"
      },
      {status:503}
    )
  }
  return NextResponse.json(
    {
      status:"ok",
      message:"Database connection Successfully"
    },
    {status:200}
  )
}