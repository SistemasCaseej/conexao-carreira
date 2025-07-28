"use client"

import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link";
import {signin} from "@/app/actions/auth/auth";
import {useActionState, useEffect, useState} from "react";

export function LoginForm({className, ...props}) {
    const [state, formAction, pending] = useActionState(signin, undefined)
    const [showError, setShowError] = useState(true)
    const router = useRouter();

    useEffect(() => {
        if (state?.errors?.email || state?.errors?.password) {
            setShowError(true);
            const timer = setTimeout(() => {
                setShowError(false);
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [state?.errors?.email, state?.errors?.password]);

    useEffect(() => {
        if (state?.success) {
            router.push("/dashboard");
        }
    }, [state, router]);

    return (
      <form action={formAction} className={cn("flex flex-col gap-6", className)} {...props}>
          <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="text-2xl font-bold">Acesse a sua conta</h1>
            <p className="text-gray-500 text-sm text-balance dark:text-gray-400">Digite seu e-mail abaixo para acessar sua conta</p>
          </div>
          <div className="grid gap-6">
            <div className="grid gap-3">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" name="email" placeholder="m@example.com" required />
            </div>
              {state?.errors?.email && showError && (
                  <p>{state.errors.email}</p>
              )}
              <div className="grid gap-3">
              <div className="flex items-center">
                <Label htmlFor="password">Senha</Label>
                <a href="#" className="ml-auto text-sm underline-offset-4 hover:underline">Esqueceu sua senha?</a>
              </div>
              <Input id="password" type="password" name="password" required />
                  {state?.errors?.password && showError && (
                      <div>
                          <ul>
                              {state.errors.password.map((error) => (
                                  <li key={error}>{error}</li>
                              ))}
                          </ul>
                      </div>
                  )}

              </div>
            <Button disabled={pending} type="submit" className="w-full cursor-pointer border-none rounded-none">
              Entrar
            </Button>
            <div
              className="relative text-center text-sm after:absolute dark:after:border-gray-800">
            </div>
          </div>
          <div className="text-center text-sm"> Não possui uma conta?
            <Link href="/candidate-registration" className="underline underline-offset-4 ml-2 text-left"> Criar Conta</Link>
          </div>
    </form>
  );
}
