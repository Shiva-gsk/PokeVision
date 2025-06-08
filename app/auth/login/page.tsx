"use client"
import { Suspense } from "react";
import Login from "@/components/pages/Login";
import { useSearchParams } from "next/navigation";

export default function LoginPage() {

  return (
    <Suspense fallback={<div>Loading login...</div>}>
      <Login/>
    </Suspense>
  );
}
