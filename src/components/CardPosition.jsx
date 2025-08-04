import {Icon} from "lucide-react";


export default function CardPosition({title, Icon}) {

    return (
        <section className="flex flex-row items-center justify-center gap-2 border-1 px-5 py-2 border-[rgba(255,255,255,0.5)]">
            <Icon size={23} color="white" />
            <h3 className="font-nunito font-semibold text-white">{title}</h3>
        </section>
    )
}