import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "../../lib/auth";
import { Prisma } from "@prisma/client";
import { Role } from "../../types";
import { prisma } from "../../lib/db";

// GET METHOD 
export async function GET(request:NextRequest) {
  try{
    // get the current-user
    const user = await getCurrentUser();

    //if not user found
    if(!user){
      return NextResponse.json(
        {
          error:"You are not autherized to access the information!!!"
        },
        {status:401}
      )
    }

    // get the params:
    const searchParams = request.nextUrl.searchParams;
    // get the teamId also get the role
    const teamId = searchParams.get("teamId");
    const role = searchParams.get("role");

    // 1.This object will eventually contain the conditions for your Prisma query.
    const where: Prisma.UserWhereInput = {};


    // 2. Check the user's role
    // currently logged-in user an "ADMIN"
    if(user.role == Role.ADMIN){
      // Admin can see all the user
    }
    // Check if the user is a "MANAGER"
    else if(user.role === Role.MANAGER){
      // can see across the users in their team and in others but not the managers

      // Give me users who satisfy condition 1 OR condition 2.
      // condition-1: Users who belong to the manager's team.
      // condition-2: Users whose role is USER.
      where.OR = [{teamId:user.teamId},{role:Role.USER}]
    }
    else{
      // when its "USER" they only can see the members in their own team
      where.teamId = user.teamId;
      where.role = {not:Role.ADMIN}
    }

    // additional filters
    if(teamId){
      where.teamId = teamId;
    }
    if (role) where.role = role as Role;

    // Now query the DB with the given "where" clause
    const users = await prisma.user.findMany({
      where,
      select:{
        id:true,
        email:true,
        name:true,
        role:true,
        team:{
          select:{
            id:true,
            name:true,
          }
        },
        createdAt:true,
      },
      orderBy:{createdAt:"desc"},
    });

    return NextResponse.json({users});

  }catch(error){
    console.error("Get users Error: ",error);
    return NextResponse.json(
      {error:"Internal server error,Something went wrong"},
      {status:500}
    )
  }
}
