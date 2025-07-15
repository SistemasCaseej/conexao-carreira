"use client"

import NavigationBar from "@/components/NavigationBar";
import {Button} from "@/components/ui/button";
import {Menu, X} from "lucide-react";
import Image from "next/image";
import {useState} from "react";


export default function Company(){

    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            <NavigationBar />
            <section className="flex flex-col min-h-screen md:min-h-[93vh] px-6 sm:px-10 md:px-20 bg-[#fa6905]">
                <header className="flex items-center justify-between py-4 border-b-1">
                    <h3 className="text-2xl text-white font-bold">Conexão Carreira</h3>
                    <div className="hidden md:flex space-x-4">
                        <Button className="rounded-none bg-[#49257b] border hover:bg-white hover:text-black px-5 cursor-pointer">
                            Login
                        </Button>
                        <Button className="rounded-none bg-emerald-400 pointer-events-none hover:bg-transparent px-5 cursor-pointer">
                            Solicite uma demostração
                        </Button>
                    </div>

                    <div className="md:hidden">
                        <button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none">
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </header>
                {isOpen && (
                    <div className="">
                        <div className="fixed top-0 right-0 h-screen w-3/5 bg-white z-50 shadow-lg border-1 flex flex-col md:hidden">
                            <div className="px-4 py-4 bg-[#49257b] flex flex-col gap-3 md:hidden">
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="self-end text-gray-600 hover:text-black"
                                >
                                    <X size={24} color="white" />
                                </button>

                                <Button className="rounded-none mb-2 bg-[#49257b] border hover:bg-white hover:text-black px-5 cursor-pointer">
                                    Entrar
                                </Button>
                                <Button className="rounded-none bg-emerald-400 pointer-events-none hover:bg-transparent px-5 cursor-pointer">
                                    Cadastre-se gratuitamente
                                </Button>
                            </div>

                        </div>
                    </div>

                )}
                <section className="flex flex-row flex-1  justify-between items-center">
                    <h1 className="text-3xl">Encontre a sua vaga de emprego</h1>
                    <Image src="/img-estagio.webp" width={340} height={200}  alt="Students" className="object-contain"/>
                </section>
            </section>
        </div>
    )
}