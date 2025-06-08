
import { Card, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import {DropdownMenuSeparator} from "@/components/ui/dropdown-menu";

export default function CardJobs() {
    return (
        <Card className="flex-col mt-5 w-2xl">

            <section className="flex flex-row gap-10 px-4 items-center">
                <div className="w-20 h-20 relative rounded-md overflow-hidden">
                    <Image
                        src="/jose.jpg"
                        alt="Imagem"
                        fill
                        className="object-cover"
                    />
                </div>
                <div className="">
                    <CardTitle>UIUX Designer</CardTitle>
                    <span className="text-muted-foreground text-sm">Twitter</span>
                </div>
            </section>

            <DropdownMenuSeparator/>




        </Card>
    )
}
