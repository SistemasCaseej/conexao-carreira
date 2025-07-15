import Link from "next/link";


export default function NavigationBar(){

    return (
        <section className="hidden md:flex bg-white min-h-[7vh]">
            <ul className="flex items-center min-h-[7vh] px-6 sm:px-10 md:px-20 gap-20 text-[#aaa9a9]">
                <Link href="/">
                    <li className="cursor-pointer font-epilogue">Para candidatos</li>
                </Link>
                <Link href="/company">
                    <li className="cursor-pointer">Para empresas</li>
                </Link>
            </ul>
        </section>
    )
}