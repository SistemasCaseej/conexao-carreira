
import { ToasterProvider } from "@/components/ToasterProvider";

export default function Layout({children}) {

    return (
        <section className="font-sans">
            {children}
            <ToasterProvider/>
        </section>
    )
}