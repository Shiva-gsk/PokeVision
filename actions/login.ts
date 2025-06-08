"use server"
import { z } from "zod";
import { signIn } from "@/auth";
import { LoginSchema } from "@/schema"
import { DEFAULT_LOGIN_REDIRECT } from "@/route";
import { AuthError } from "next-auth";

export const login = async (values: z.infer<typeof LoginSchema>, callbackUrl:string) => {
    // const { searchParams } = new URL(req.url);
    // const { nextUrl } = req;
    // const callbackUrl = nextUrl.searchParams.get("callbackUrl");
    const validatedFields = await LoginSchema.safeParse(values);
    if(!validatedFields.success){
        return {error:"Invalid Fields "}
    }
    const {email, password} = validatedFields.data;
    try{
        await signIn("credentials", {
            email,
            password,
            redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
        })
        return {success:"Logged in"}

    }catch(error){
        if(error instanceof AuthError){
            switch(error.type){
                case "CredentialsSignin":
                    return {error:"Invalid Credentials"}
                    default:
                        return {error:"Something went wrong"}
            }
        }
        throw error;
    }
    
}