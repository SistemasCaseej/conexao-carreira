"use client"

import {Sidebar,} from "@/components/ui/sidebar"
import Image from "next/image";
import {DropdownMenuSeparator} from "@/components/ui/dropdown-menu";
import { ScrollArea} from "@/components/ui/scroll-area";
import {Button} from "@/components/ui/button";
import {Dialog, DialogContent, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {toast} from "sonner";
import {useState} from "react";
import {useAuth} from "@/app/context/AuthContext";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";
import {storage} from "@/firebase/config";
import {formatCurrency} from "@/utils/formatters/formatters.js";


export function SidebarRight({button, job,...props}) {

    const { user } = useAuth()
    const [open, setOpen] = useState(false)
    const [fileName, setFileName] = useState("Nenhum arquivo selecionado")

    const handleApplication = async () => {

        if (!fileName) {
            toast.error("Selecione um currículo antes de enviar")
            return
        }

        try{
            const response = await fetch("/api/application", {
                method: "POST",
                body: JSON.stringify({
                    userId: user.userId,
                    jobId: job.id,
                    companyId: job.companyId,
                }),
            });

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || "Erro ao enviar candidatura");
            }

            const storageRef = ref(storage, `curriculos/${user.companyId}/${user.userId}`)
            await uploadBytes(storageRef, fileName)
            const downloadURL = await getDownloadURL(storageRef)

            await fetch(`/api/application/${data.applicationId}`, {
                method: "PATCH",
                body: JSON.stringify({ resume: downloadURL }),
            });

            toast.success("Candidatura enviada com sucesso!", {
                style: {
                    border: "1px solid #22c55e",
                    padding: "16px",
                    color: "#fff",
                    background: "#16a34a",
                },
                iconTheme: {
                    primary: "#16a34a",
                    secondary: "#fff",
                },
            });

            setOpen(false)
        }catch (error){
            toast.error("Erro ao enviar candidatura", error);
        }

    }

    function handleFileChange(event) {
        const file = event.target.files[0]
        if (!file) return

        const validTypes = ["application/pdf",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"]

        if(!validTypes.includes(file.type)){
            toast.info("Formato inválido! Envie apenas PDF, DOC ou DOCX.", {
                style: {
                    border: "1px solid #ef4444",
                    padding: "16px",
                    color: "#fff",
                    background: "#dc2626",
                },
                iconTheme: {
                    primary: "#dc2626",
                    secondary: "#fff",
                },
            })
            event.target.value = ""
            return
        }

        setFileName(file.name)
        console.log("Arquivo aceito:", file.name)
    }


    return (
            <Sidebar collapsible="none" className="font-mona-sans fixed right-0 top-0 hidden h-svh border-l lg:flex w-[27vw]"{...props}>
                <ScrollArea>
                    <section className="flex-col py-4 h-svh">
                        <section data-qa="photo" className="flex flex-col py-4 justify-center items-center">
                            <Image
                                src={job.company.logo}
                                alt="Imagem"
                                width="120"
                                height="120"
                                className="object-cover border-1 rounded-2xl"
                            />
                            <h1 className="text-xl font-normal mt-4">{job?.title}</h1>
                            <span className="text-[#6b6969]">{job?.company?.tradeName}</span>
                        </section>
                        <DropdownMenuSeparator />
                        <section data-qa="position-information" className="flex flex-row px-6 py-2 justify-between h-[25vh]">
                            <section className="flex flex-col justify-around">
                                <div>
                                    <p className="font-normal text-gray-600 text-sm">Localização</p>
                                    <h3 className="font-medium">{job?.location}</h3>
                                </div>
                                <div>
                                    <p className="font-normal text-gray-600 text-sm">Salário</p>
                                    <h3 className="font-medium">{job?.salaryRange?.minSalary && job?.salaryRange?.maxSalary
                                        ? `${formatCurrency(job.salaryRange.minSalary)} - ${formatCurrency(job.salaryRange.maxSalary)}`
                                        : "Não informado"}</h3>
                                </div>
                            </section>
                            <section className="flex flex-col justify-around">
                                <div>
                                    <p className="font-normal text-gray-600 text-sm">Modelo de Trabalho</p>
                                    <h3 className="font-medium">{job?.workModel}</h3>
                                </div>
                                <div>
                                    <p className="font-normal text-gray-600 text-sm">Tipo de Contratação</p>
                                    <h3 className="font-medium">{job?.employmentType}</h3>
                                </div>
                            </section>
                        </section>
                        <DropdownMenuSeparator />
                        <article data-qa="position-description" className="px-6 py-4">
                            <h3 className="font-medium text-lg">Descrição</h3>
                            <p className="py-2 font-normal text-justify text-sm">{job?.description}</p>
                        </article>
                        <article data-qa="position-description" className="px-6 py-6">
                            <h3 className="font-medium text-lg">Requisitos</h3>
                            <ul className="list-disc list-inside space-y-2 py-2">
                                {job?.requirements.map((requirement, index) => (
                                    <li className="text-sm" key={index}>{requirement}</li>
                                ))}
                            </ul>
                        </article>
                        <DropdownMenuSeparator/>
                        {button && (
                            <Dialog open={open} onOpenChange={setOpen}>
                                <section className="sticky bottom-0 w-full py-4 flex justify-center bg-white">
                                    <DialogTrigger asChild>
                                        <Button className="h-12 w-60 text-base bg-[#49257b] hover:bg-[#5d3b94] cursor-pointer font-mona-sans">
                                            Candidatar-se
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:min-w-[750px] min-h-[330px] rounded-md font-mona-sans flex flex-col justify-between">
                                        <section>
                                            <DialogTitle>Candidate-se na {job.company.tradeName}</DialogTitle>
                                            <h3 className="mt-4">Certifique-se de incluir um currículo atualizado</h3>
                                            <p className="mt-7 mb-3 font-semibold">Currículo</p>
                                            <div className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 bg-gray-50 truncate">
                                                {fileName}
                                            </div>
                                            <p className="text-xs text-gray-500 mt-2">Apenas arquivos PDF, DOC ou DOCX.</p>
                                            <input id="files" className="hidden" type="file"  accept=".pdf,.doc,.docx" onChange={handleFileChange}/>
                                        </section>
                                        <section className="flex flew-row gap-5 justify-between outline-none">
                                            <label htmlFor="files" className="bg-[#4c1286] text-white rounded-sm text-md px-4 py-1">Carregue o currículo</label>
                                            <Button onClick={handleApplication} type="submit" className="text-md cursor-pointer bg-[#4c1286] rounded-sm">
                                                Enviar
                                            </Button>
                                        </section>
                                    </DialogContent>
                                </section>
                            </Dialog>
                        )}
                    </section>
                </ScrollArea>
            </Sidebar>
    )
}
