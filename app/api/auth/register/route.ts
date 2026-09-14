import { NextResponse } from "next/server";
import { prisma } from "../../../lib/db";
import { generateToken, hashPassword } from "../../../lib/auth";
import { Role } from "@prisma/client";

export async function POST(request:NextResponse) {
  try{
    const {name,email,password,teamCode}  = await request.json();
    if(!name || !email || !password){
      return NextResponse.json({
        error:"Name,email & password are required or not valid",
      },
      {
        status:400
      })
    }

    // Find existing Users (user.findUnique - 409)
    const existingUser = await prisma.user.findUnique({
      where : {email},
    })
    if(existingUser){
      return NextResponse.json({
        error:"User with this email Exists",
      },
      {
        status:409
      })
    }

    // Find team using teamcode
    let teamId : string | undefined;

    if(teamCode){
      const team = await prisma.team.findUnique({
        where : {code:teamCode},
      });

      if(!team){
        return NextResponse.json(
          {
            error:"Please enter a valid team code"
          },
          {status:400}
        )
      }
      teamId = team.id;
    }


    // Lets hash the password now
    const hashedPassword = await hashPassword(password);

    // First user will be the ADMIN
    const userCount = await prisma.user.count();
    const role = userCount === 0 ? Role.ADMIN : Role.USER

    const user = await prisma.user.create({
      data:{
        name,
        email,
        password:hashedPassword,
        role,
        teamId
      },
      include:{
        team:true
      }
    })

    // Generate the Token
    const token = generateToken(user.id)

    const response = NextResponse.json({
      user:{
        id:user.id,
        email:user.email,
        name:user.name,
        role:user.role,
        teamId:user.teamId,
        team:user.team,
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
    console.error("Registration failed");
    return NextResponse.json(
      {
        error:"Internal server error,something went wrong!!!."
      },
      {status:500}
    )
  }
}