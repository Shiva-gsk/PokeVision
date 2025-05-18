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

import { RegisterSchema } from "@/schema";
import { useState, useTransition } from "react";
import FormError from "@/components/auth/form-error";
import FormSuccess from "@/components/auth/form-success";
import { register } from "@/actions/register";

export default function Login() {
  const [success, setsuccess] = useState<string | undefined>("");
  const [error, setError] = useState<string | undefined>("");
  const [isPending, setTransition] = useTransition();

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      name: ""
    },
  });

  const OnSubmit = (values : z.infer<typeof RegisterSchema>) =>{
    setTransition(() =>{
      register(values)
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
          headerLabel="Create an account"
          backButtonLabel="Already have an account?"
          backButtonLink="/login"
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
                <FormField 
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="name">Name</FormLabel>
                    <FormControl>
                      <Input {...field} id="name" type="name" placeholder="John" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
                />
              </div>
              <FormError message={error}/>
              <FormSuccess message={success}/>
              <Button disabled={isPending} type="submit" className="w-full">Register</Button>
            </form>
          </Form>
        </CardWrapper>
      </section>
    </>
  );
}
