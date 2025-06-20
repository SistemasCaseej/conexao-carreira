import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link";

export function LoginForm({className, ...props}) {
  return (
    (<form className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Acesse a sua conta</h1>
        <p className="text-gray-500 text-sm text-balance dark:text-gray-400">Digite seu e-mail abaixo para acessar sua conta</p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" required />
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">Senha</Label>
            <a href="#" className="ml-auto text-sm underline-offset-4 hover:underline">Esqueceu sua senha?</a>
          </div>
          <Input id="password" type="password" required />
        </div>
        <Button type="submit" className="w-full">
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
    )
  );
}
