
import { ToasterProvider } from "@/components/ToasterProvider";

export default function Layout({children}) {

    return (
        <html lang="en" suppressHydrationWarning={true}>
            <body>
                {children}
                <ToasterProvider/>
            </body>
        </html>
    )
}