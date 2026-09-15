import { NextRequest, NextResponse } from "next/server";
import { checkUserPermission, getCurrentUser } from "../../../../lib/auth";
import { Role } from "@prisma/client";
import { prisma } from "../../../../lib/db";

export async function PATCH(
  request:NextRequest,
  context:{params:Promise<{userId:string}>}) {
  
  try{
    const {userId} = await context.params;
    const currentUser = await getCurrentUser();

    if(!currentUser || !checkUserPermission(currentUser,Role.ADMIN)){
      return NextResponse.json(
        {error:"You are not authorized to assign role"},
        {status:401}
      );
    }

    // Preventing users from changing their own role
    if(userId === currentUser.id){
      return NextResponse.json(
        {error:"You cannot change your role on your own"},
        {status:401}
      );
    }

    const {role} = await request.json();

    // Validate the role
    const validRoles = [Role.USER,Role.MANAGER]

      if (!validRoles.includes(role)) {
        return NextResponse.json(
          {
            error: "Invalid role or you cannot have more than one ADMIN role user"
          },
          { status: 404 }
        )
      }
    
    
    // updation
    const updatedUser = await prisma.user.update({
      where:{id:userId},
      data:{
        role,
      },
      include:{
        team:true,
      },
    });

    return NextResponse.json({
      user:updatedUser,
      message:`User role updated to ${role}`
    })

  }
  catch(error){
    console.error("Role assignment error:",error);
    if(error instanceof Error && 
      error.message.includes("Record to update not found")){
        return NextResponse.json(
          {error:"User not found"},
          {status:404}
        )
    }
    return NextResponse.json(
      {error:"Internal server error,something went wrong!"},
      {status:500}
    )
  }
}