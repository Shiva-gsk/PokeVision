"use server"
import { z } from "zod";
import bycrypt from "bcryptjs";
import { db } from "@/lib/db";

import { RegisterSchema } from "@/schema"

export const register = async (values: z.infer<typeof RegisterSchema>) => {
    const validatedFields = await RegisterSchema.safeParse(values);
    if(!validatedFields){
        return {error:"Invalid Fields "}
    }
    const {email, password, name} = values;
    const hashedPassword = await bycrypt.hash(password, 10);
    const user = await db.user.findUnique({
        where:{
            email
        }
    })
    if(user){
        return {error:"User already exists"}
    }
    await db.user.create({
        data:{
            email,
            password: hashedPassword,
            name
        }
    })

    //TODO: Send user email verification

    return {success:"User created"}
    
}