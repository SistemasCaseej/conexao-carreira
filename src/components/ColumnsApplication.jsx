import {Badge} from "@/components/ui/badge.jsx";
import {IconCircleCheckFilled, IconLoader} from "@tabler/icons-react";

export const getColumnsApplication = () => {
    return [
        {
            accessorFn: row => row?.user?.name ?? "",
            header: "Nome",
        },
        {
            accessorFn: row => row?.user?.email ?? "",
            header: "Email",
        },
        {
            accessorFn: row => row?.user?.linkedIn ?? "",
            header: "LinkedIn",
        },
        {
            accessorFn: row => row?.user?.phoneNumber ?? "",
            header: "Telefone",
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => (
                <Badge variant="outline" className="text-muted-foreground px-1.5">
                    {row.original.status === "Aprovado" ? (
                        <IconCircleCheckFilled className="fill-green-500 dark:fill-green-400" />
                    ) : (
                        <IconLoader />
                    )}
                    {row.original.status}
                </Badge>
            ),
        },
        {
            accessorKey: "resume",
            header: "Currículo",
            cell: ({ row }) => {
                const url = row.original.resume;
                if (!url) return "Não enviado";

                return (
                    <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                    >
                        Ver Currículo
                    </a>
                );
            },
        },


    ]
}
