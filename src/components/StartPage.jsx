import NavigationBar from "@/components/NavigationBar";
import {Button} from "@/components/ui/button";
import {GraduationCap, Laptop, Menu, Rocket, X} from "lucide-react";
import Image from "next/image";
import CardPosition from "@/components/CardPosition";
import {useRouter} from "next/navigation";

export default function StartPage({ isOpen, setIsOpen, title, subtitle, buttonLogin, buttonOption, cards, titleClass, buttonDemostration, imagePath}){

    const router = useRouter();

    return (
        <>
            <NavigationBar/>
            <section className="flex flex-col min-h-screen md:min-h-[93vh] px-6 sm:px-10 md:px-20 bg-[#4c1286]">
                <header className="flex items-center justify-between py-4 border-b-1 border-[rgba(255,255,255,0.3)]">
                    <h3 className="text-2xl text-white font-bold">Conexão Carreira</h3>
                    <div className="hidden md:flex space-x-4">
                        <Button onClick={() => router.push("/candidate-login")}  className="bg-[#4c1286] hover:bg-white rounded-[1px] hover:text-black border font-bold tracking-wide px-5 cursor-pointer">
                            {buttonLogin}
                        </Button>
                        <Button className="rounded-none bg-emerald-400 border-1 px-5 cursor-pointer font-bold">
                            {buttonOption}
                        </Button>
                    </div>
                    <div className="md:hidden">
                        <button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none cursor-pointer">
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </header>
                {isOpen && (
                    <div className="">
                        <div className="fixed top-0 right-0 h-screen w-3/5 bg-white z-50 shadow-lg border-1 flex flex-col md:hidden">
                            <div className="px-4 py-4 bg-[#4c1286] flex flex-col gap-3 md:hidden">
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="self-end text-gray-600 hover:text-black"
                                >
                                    <X size={24} color="white" />
                                </button>

                                <Button className="rounded-none mb-2 bg-[#49257b] border hover:bg-white hover:text-black px-5 cursor-pointer">
                                    {buttonLogin}
                                </Button>
                                <Button className="rounded-none bg-emerald-400 pointer-events-none hover:bg-transparent px-5 cursor-pointer">
                                    {buttonOption}
                                </Button>
                            </div>

                        </div>
                    </div>

                )}
                <section className="flex flex-col flex-1 justify-evenly h-screen flex-wrap">
                    <section className="flex flex-col items-center md:h-auto md:flex-row md:justify-between">
                        <section className="text-white text-left mb-7 mt-7 md:mb-0 max-w-3xl">
                            <h1 className={`font-semibold text-center text-3xl sm:text-5xl ${titleClass} md:text-left mb-4`}>{title}</h1>
                            <p className="font-normal text-justify text-lg">{subtitle}</p>
                            {buttonDemostration && (
                                <section className="mt-10">
                                        <Button size={60} className="cursor-pointer px-8 py-4 text-lg bg-[#00d492] hover:bg-[#00b47d]">Solicitar uma demostração</Button>
                                </section>
                            )}
                        </section>
                        <Image src={imagePath} width={340} height={200}  alt="Students" className="object-contain"/>
                    </section>
                    {cards && (
                        <section className="w-full gap-10 flex flex-row flex-wrap items-center justify-center text-center">
                            <CardPosition title={"Vagas de Tecnologia"} Icon={Laptop}/>
                            <CardPosition title={"Estágio e Trainee"} Icon={Rocket}/>
                            <CardPosition title={"Vagas para Universitários"} Icon={GraduationCap}/>
                        </section>
                    )}
                </section>
            </section>
        </>
    )
}