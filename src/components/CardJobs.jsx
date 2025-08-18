"use client"

import { Card } from "@/components/ui/card"
import Image from "next/image"
import {DropdownMenuSeparator} from "@/components/ui/dropdown-menu";
import {MapPin, Timer} from "lucide-react"

export default function CardJobs({title, company, location, posted_at}) {

    function parseDateBRtoISO(dateStr) {
        const [datePart, timePart] = dateStr.split(", ");
        const [day, month, year] = datePart.split("/");

        return `${year}-${month}-${day}T${timePart}`;
    }

    function timeAgo(dateStr) {
        const isoDate = parseDateBRtoISO(dateStr);
        const postedDate = new Date(isoDate);
        const now = new Date();

        const diffMs = now - postedDate;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMins / 60);
        const diffDays = Math.floor(diffHours / 24);

        if (diffMins < 1) return "agora mesmo";
        if (diffMins < 60) return `há ${diffMins} minuto${diffMins > 1 ? "s" : ""}`;
        if (diffHours < 24) return `há ${diffHours} hora${diffHours > 1 ? "s" : ""}`;
        return `há ${diffDays} dia${diffDays > 1 ? "s" : ""}`;
    }
    return (
        <Card className="font-mona-sans w-full max-w-[750px]  min-w-[700] min-h-[230px] flex flex-col border border-[#49257b] mb-5 rounded-sm p-4">
            <section className="flex flex-row gap-9 items-center">
                <div className="w-15 h-15 relative overflow-hidden">
                    <Image
                        src="/jose.jpg"
                        alt="Imagem"
                        fill
                        className="object-cover rounded-sm"
                    />
                </div>
                <div className="">
                    <h1 className="text-xl font-semibold mt-2">{title}</h1>
                    <span className="text-[#6b6969] font-semibold">{company}</span>
                </div>
            </section>
            <DropdownMenuSeparator className="text-black p-0 w-full"/>
            <article className="flex flex-row items-center justify-between">
                <dl>
                    <div className="flex-row items-center flex mb-2 gap-2">
                        <MapPin size={20}/>
                        <h3>{location}</h3>
                    </div>
                    <div className="flex-row flex mb-2">
                        <h3>Apply by: 30 August 2025</h3>
                    </div>
                    <div className="flex-row flex items-center gap-2">
                        <Timer size={20}/>
                        <dd className="text-sm font-normal text-gray-500">{timeAgo(posted_at)}</dd>
                    </div>
                </dl>

                <footer>
                    <button className="bg-white border-1 cursor-pointer hover:text-white hover:bg-[#49257b] border-[#49257b] w-[100px] h-[40px] rounded-sm text-[#49257b]" aria-label="Ver detalhes da vaga em Jakarta">Detalhes</button>
                </footer>
            </article>

        </Card>
    )
}
