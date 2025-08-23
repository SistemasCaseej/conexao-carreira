import {BriefcaseBusiness} from "lucide-react"
import { LoginForm } from "@/components/LoginForm"
import Image from "next/image";

export default function LoginPage() {
    return (
        <div className="grid min-h-svh lg:grid-cols-2">
            <div className="flex flex-col gap-4 p-6 md:p-10">
                <div className="flex justify-center gap-2 md:justify-start">
                    <a href="#" className="flex items-center gap-2 font-medium">
                        <div className="bg-[#4c1286] flex size-6 items-center justify-center rounded-md">
                            <BriefcaseBusiness className="size-4 text-white" />
                        </div>
                        Conexão Carreira
                    </a>
                </div>
                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full max-w-xs">
                        <LoginForm />
                    </div>
                </div>
            </div>
            <div className="bg-muted relative hidden lg:block">
                <Image
                    src="/finance-careers.jpg"
                    fill
                    alt="Image"
                    className="object-cover object-center"
                />
            </div>
        </div>
    )
}
