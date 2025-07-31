import {RegisterForm} from "@/components/RegisterForm";
import { GalleryVerticalEnd } from "lucide-react"


export default function RegisterPage(){
    return (
        <div className="grid min-h-svh lg:grid-cols-1">
            <div className="flex flex-col gap-4 p-4 md:p-10">
                <div className="flex justify-center gap-2 md:justify-start">
                    <a href="#" className="flex items-center gap-2 font-medium">
                        <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
                            <GalleryVerticalEnd className="size-4" />
                        </div>
                        Conexão Carreira
                    </a>
                </div>
                <div className="flex flex-1 justify-center">
                    <div className="w-full max-w-[820px]">
                        <RegisterForm />
                    </div>
                </div>
            </div>
        </div>
    )
}