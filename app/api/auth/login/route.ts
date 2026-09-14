import { NextResponse } from "next/server";
import { prisma } from "../../../lib/db";
import { generateToken, verifyPassword } from "../../../lib/auth";

export async function POST(request:NextResponse) {
  try{
    const {email,password}  = await request.json();
    if(!email || !password){
      return NextResponse.json({
        error:"email & password are required or not valid",
      },
      {
        status:400
      })
    }

    // Find existing Users (user.findUnique - 409)
    const userFromDB = await prisma.user.findUnique({
      where : {email},
      include:{team:true}
    })

    if(!userFromDB){
      return NextResponse.json(
        {
          error:"Invalid credentails",
        },
        {status:401}
      )
    }

    // Lets verify the entered and the password in DB
    const isValidPassword = await verifyPassword(password,userFromDB.password)

    if(!isValidPassword){
      return NextResponse.json(
        {
          error:"Invalid credentails",
        },
        {status:401}
      )
    }

    // Generate the Token
    const token = generateToken(userFromDB.id)

    const response = NextResponse.json({
      user:{
        id:userFromDB.id,
        email:userFromDB.email,
        name:userFromDB.name,
        role:userFromDB.role,
        teamId:userFromDB.teamId,
        team:userFromDB.team,
        token
      }
    })

    // for cookies
    response.cookies.set("token",token,{
      httpOnly : true,
      secure: process.env.NODE_ENV === 'production',
      sameSite:"lax",
      maxAge:60*60*24*7
    })

    return response;

  }catch(error){
    console.error("Login failed",error);
    return NextResponse.json(
      {
        error:"Internal server error,something went wrong!!!."
      },
      {status:500}
    )
  }
}