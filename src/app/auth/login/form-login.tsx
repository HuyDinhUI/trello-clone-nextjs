"use client";

import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AlertDanger } from "@/components/ui/alert";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { GoogleIcon } from "@/assets/icons";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginValidation } from "@/validators/auth.validator";
import FieldError from "@/components/ui/field-error";
import { FieldLabel } from "@/components/ui/field-label";
import { AuthSevices } from "@/services/auth-service";
import { LoginBody } from "@/types/auth.type";
import axios from "axios";

const FormLogin = () => {
  const form = useForm<z.infer<typeof LoginValidation>>({
    resolver: zodResolver(LoginValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const router = useRouter();
  const [error, setError] = useState(undefined);

  const submitLogin = async (data: LoginBody) => {
    try {
      const res = await AuthSevices.login(data)
      await axios.post(`${process.env.NEXT_PUBLIC_SERVER_NEXTJS}/api/auth`,res.data)

      if (res.data.role === "customer") {
        router.push("/dashboard/boards");
      }
      
    } catch (error: any) {
      setError(error.response?.data?.message);
    }
  };

  return (
    <form className="w-full p-10" onSubmit={form.handleSubmit(submitLogin)}>
      <div className="text-center mb-5">
        <h1 className="font-bold text-2xl">Welcome back</h1>
        <p className="font-light">Login to your trello account</p>
      </div>
      {error && <AlertDanger title={error} />}

      <Controller
        name="email"
        control={form.control}
        render={({ field, fieldState }) => (
          <div className="grid gap-2 mb-5">
            <FieldLabel data-invalid={fieldState.invalid} htmlFor={field.name}>
              Email
            </FieldLabel>
            <Input
              {...field}
              aria-invalid={fieldState.invalid}
              id={field.name}
              type="email"
              placeholder="m@example.com"
              autoComplete="Email"
            />
            {fieldState.invalid && (
              <FieldError message={fieldState.error?.message ?? ""} />
            )}
          </div>
        )}
      ></Controller>

      <Controller
        name="password"
        control={form.control}
        render={({ field, fieldState }) => (
          <div className="grid gap-2 mb-5 relative">
            <FieldLabel data-invalid={fieldState.invalid} htmlFor={field.name}>
              Password
            </FieldLabel>
            <Input
              {...field}
              aria-invalid={fieldState.invalid}
              id={field.name}
              type="password"
              autoComplete="password"
            />
            <Link className="absolute top-1 right-0 text-sm hover:underline" href={"/restpassword"}>
              Forgot your password?
            </Link>
            {fieldState.invalid && (
              <FieldError message={fieldState.error?.message ?? ""} />
            )}
          </div>
        )}
      ></Controller>
      <Button
        type="submit"
        className="w-full justify-center rounded-sm"
        variant="dark"
        size="md"
        title="Login"
      />
      <div className="relative border-t border-gray-200 w-full mt-10 dark:border-transparent">
        <p className="absolute -top-3.5 px-2 right-[50%] translate-x-[50%] bg-white font-light dark:bg-transparent">
          Or continue with
        </p>
        <div className="pt-10 pb-5">
          <Button
            type="button"
            onClick={() =>
              (window.location.href = `${process.env.NEXT_PUBLIC_API_URI}/auth/google`)
            }
            className="justify-center w-full shadow-md"
            size="lg"
            variant="outline"
            title="Login with Google"
            icon={<GoogleIcon />}
          />
        </div>
        <p className="text-center">
          {`Don't have an account?`}{" "}
          <Link className="underline" href={"register"}>
            Sign up
          </Link>
        </p>
      </div>
    </form>
  );
};

export default FormLogin;
