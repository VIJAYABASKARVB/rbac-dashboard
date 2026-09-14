import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json(
    {
      message:"User logged out successfully!!"  // sucess message
    },
    {status:200}
  )

  // add the token modification to the response
  response.cookies.set("token","",{
    httpOnly:true,
    secure:process.env.NODE_ENV === "production",
    sameSite:"lax",
    maxAge:0
  })

  return response;
}