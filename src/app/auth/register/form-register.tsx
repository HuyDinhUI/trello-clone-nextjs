"use client";

import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AlertDanger } from "@/components/ui/alert";
import Link from "next/link";
import { GoogleIcon } from "@/assets/icons";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterValidation } from "@/validators/auth.validator";
import FieldError from "@/components/ui/field-error";
import { FieldLabel } from "@/components/ui/field-label";
import { RegisterBody } from "@/types/auth.type";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { AuthSevices } from "@/services/auth-service";

const FormRegister = () => {
  const form = useForm<z.infer<typeof RegisterValidation>>({
    resolver: zodResolver(RegisterValidation),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const [error, setError] = useState(undefined);
  const router = useRouter();
  const submitLogin = async (data: RegisterBody) => {
    try {
      await AuthSevices.register(data)
      toast.success("Register is success", {
        theme: "light",
      });
      router.push("/auth/login");
    } catch (error: any) {
      setError(error.response?.data?.message);
    }
  };

  return (
    <form className="w-full p-10" onSubmit={form.handleSubmit(submitLogin)}>
      <div className="text-left mb-5">
        <h1 className="font-bold text-2xl">Welcome to Trello</h1>
        <p className="font-light">Register to your trello account</p>
      </div>
      {error && <AlertDanger title={error} />}

      <Controller
        name="username"
        control={form.control}
        render={({ field, fieldState }) => (
          <div className="grid gap-2 mb-5">
            <FieldLabel data-invalid={fieldState.invalid} htmlFor={field.name}>
              Username
            </FieldLabel>
            <Input
              {...field}
              aria-invalid={fieldState.invalid}
              id={field.name}
              type="text"
              placeholder="huydinh123"
              autoComplete="username"
            />
            {fieldState.invalid && (
              <FieldError message={fieldState.error?.message ?? ""} />
            )}
          </div>
        )}
      ></Controller>

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
            {fieldState.invalid && (
              <FieldError message={fieldState.error?.message ?? ""} />
            )}
          </div>
        )}
      ></Controller>

      <Controller
        name="confirmPassword"
        control={form.control}
        render={({ field, fieldState }) => (
          <div className="grid gap-2 mb-5 relative">
            <FieldLabel data-invalid={fieldState.invalid} htmlFor={field.name}>
              Confirm password
            </FieldLabel>
            <Input
              {...field}
              aria-invalid={fieldState.invalid}
              id={field.name}
              type="password"
              autoComplete="password"
            />
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
              (window.location.href = "http://localhost:5024/v1/auth/google")
            }
            className="justify-center w-full"
            size="lg"
            variant="outline"
            title="Login with Google"
            icon={<GoogleIcon />}
          />
        </div>
        <p className="text-center">
          {`Do you have an account?`}{" "}
          <Link className="underline" href={"login"}>
            Login
          </Link>
        </p>
      </div>
    </form>
  );
};

export default FormRegister;
