
import { ToasterProvider } from "@/components/ToasterProvider";

export default function Layout({children}) {

    return (
        <section>
            {children}
            <ToasterProvider/>
        </section>
    )
}