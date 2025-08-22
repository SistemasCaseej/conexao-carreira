import Link from "next/link";
import Image from "next/image";


export default function NavigationBar(){

    return (
        <section className="hidden md:flex justify-between items-center bg-white min-h-[7vh] ">
            <ul className="flex items-center min-h-[7vh] px-6 sm:px-10 md:px-20 gap-20 text-gray-600">
                <Link href="/">
                    <li className="cursor-pointer">Para candidatos</li>
                </Link>
                <Link href="/company">
                    <li className="cursor-pointer">Para empresas</li>
                </Link>
            </ul>
            <section className="min-h-[7vh] px-6 sm:px-10 md:px-20">
                <Link href="https://www.instagram.com/caseempresajunior/">
                    <Image src="/logo_case.png" alt="logo" width={45} height={40} />
                </Link>

            </section>
        </section>
    )
}