import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {createUser} from "@/app/(public)/candidate-registration/actions/users";
import Link from "next/link";
import Form from "next/form";

export function RegisterForm() {

    return(
        <Form action={createUser} className="flex flex-col gap-6 border-2">

                <div className="flex flex-col items-center gap-2 text-center">
                    <h1 className="text-2xl font-bold">Crie a sua conta</h1>
                    <p className="text-gray-500 text-sm text-balance dark:text-gray-400">Preencha as informações abaixo para a realização do cadastro</p>
                </div>
                <div className="grid gap-6">
                    <div className="grid gap-3">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" name="email" placeholder="m@example.com" required />
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="name">Nome</Label>
                        <Input id="name" type="name" name="name" placeholder="CASE Empresa Júnior" required />
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="cpf">CPF</Label>
                        <Input id="cpf" type="cpf" name="cpf" placeholder="111-111-111-31" required />
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="password">Senha</Label>
                        <Input id="password" type="password" name="password" placeholder="***********" required />
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="password">Confirme a sua senha</Label>
                        <Input id="confirm-password" type="confirm-password" name="confir-password" placeholder="***********" required />
                    </div>
                    <div className="grid">
                        <Button type="" className="bg-[#582e8c]">Próximo</Button>
                    </div>
                    <div
                        className="relative text-center text-sm after:absolute dark:after:border-gray-800">
                    </div>
                </div>
                <div className="text-center text-sm"> Já possui uma conta?
                    <Link href="/candidate-login" className="underline underline-offset-4 ml-2 text-left">Faça seu Login</Link>
                </div>
            </Form>
    )
}
