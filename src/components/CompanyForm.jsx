'use client'

import { Dialog, DialogContent, DialogTitle, DialogTrigger, DialogHeader, DialogDescription } from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {IconPlus} from "@tabler/icons-react";
import {GenericForm} from "@/components/Form";
import {toast} from "sonner";
import {useRouter} from "next/navigation";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {storage} from "@/firebase/config";


export default function CompanyForm(){

    const router = useRouter();

    const handleSubmit = async (data) => {

        try{
            let imageUrl = null;

            if(data.logo instanceof File){
                const storageRef = ref(storage, `companies/${data.logo.name}`);
                const snapshot = await uploadBytes(storageRef, data.logo);
                imageUrl = await getDownloadURL(snapshot.ref);
            }

            const payload = { ...data, logo: imageUrl };

            const response = await fetch('/api/company', {
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(payload),
            })

            const responseData = await response.json();

            if(!response.ok) {
                toast.error(responseData.message || "Erro ao enviar formulário.");
            }else {
                toast.success(responseData.message || "Empresa cadastrada com sucesso!", {
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
                router.refresh();
            }
        }catch (error){
            console.error(error)
        }

    };
    return (
        <Dialog >
            <form>
                <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="ml-2 border cursor-pointer">
                        <IconPlus />
                        <span className="hidden lg:inline">Adicionar Empresa</span>
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:min-w-[900px] p-0" showCloseButton={false} >
                    <DialogHeader>
                        <DialogTitle className="font-semibold text-black"></DialogTitle>
                    </DialogHeader>
                    <GenericForm
                        fields={[
                            {label: "Razão Social", name: "legalName", type: "text", required: true, maxLength: 50},
                            {label: "Nome Fantasia", name: "tradeName", type: "text", required: true, maxLength: 50},
                            {label: "CNPJ", name: "cnpj", type: "text", placeholder: "12.169.764/0001-94", cnpjMask: true, required: true},
                        ]}
                        logo={true}
                        onSubmit={handleSubmit}
                        dialogButton={false}
                    />
                </DialogContent>
            </form>

        </Dialog>
    )
}