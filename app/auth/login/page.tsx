"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,

  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import CardWrapper from "@/components/auth/CardWrapper";
import { LoginSchema } from "@/schema";
import { useState, useTransition } from "react";
import FormError from "@/components/auth/form-error";
import FormSuccess from "@/components/auth/form-success";
import { login } from "@/actions/login";
import { useSearchParams } from "next/navigation";

export default function Login() {
  const [success, setsuccess] = useState<string | undefined>("");
  const [error, setError] = useState<string | undefined>("");
  const [isPending, setTransition] = useTransition();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const OnSubmit = (values : z.infer<typeof LoginSchema>) =>{
    
    setTransition(() =>{
      login(values, callbackUrl)
        .then((data) => {
          setError(data.error);
          setsuccess(data.success);
        })

    });
  }

  return (
    <>
      <section className="flex justify-center items-center min-h-screen min-w-[100vw]">
        <CardWrapper
          headerLabel="Login"
          backButtonLabel="Don't have an account?"
          backButtonLink="/auth/signup"
          showSocial
        >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(OnSubmit)} className="space-y-6">
              <div className="space-y-4 md:w-[300px]">
                <FormField 
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <FormControl>
                      <Input {...field} id="email" type="email" placeholder="example@gmail.com" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
                />
                {/* <successMessage message={success}/> */}
                <FormField 
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <FormControl>
                      <Input {...field} id="password" type="password" placeholder="*******" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
                />
              </div>
              <FormError message={error}/>
              <FormSuccess message={success}/>
              <Button disabled={isPending} type="submit" className="w-full">Login</Button>
            </form>
          </Form>
        </CardWrapper>
      </section>
    </>
  );
}
