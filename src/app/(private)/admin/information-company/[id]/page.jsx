import {getAllPendingUsers} from "@/services/userService";
import {getCompanyByIdService} from "@/services/companyService";

export default async function CompanyDetails({params}) {
    const {id} = await params;

    const data = await getCompanyByIdService(id);

    return (
        <div className="pt-11 bg-[#f7f7f9] h-screen flex flex-col items-center gap-10">

            <div className="bg-white w-[90%] h-[80px] text-left p-5 border-red-700 border-2" data-name="Dados básicos">
                <h1 className="uppercase text-xl">{data.tradeName}</h1>
            </div>

            <div className="bg-white w-[90%] h-[300px] text-left flex flex-col justify-around p-5" data-name="Dados básicos">
                <div>
                    <h2 className="text-lg">Dados da Organização</h2>
                </div>
                <section className="flex flex-row flex-wrap gap-15 bg-red-600">
                    <div className="flex flex-col w-fit bg-blue-600">
                        <label className="text-xs">Endereço</label>
                        <input className="outline-none border-b" type="text"/>
                    </div>
                    <div className="flex flex-col w-fit bg-blue-600">
                        <label className="text-xs">Endereço</label>
                        <input className="outline-none border-b" type="text"/>
                    </div>
                    <div className="flex flex-col w-fit bg-blue-600">
                        <label className="text-xs">Endereço</label>
                        <input className="outline-none border-b" type="text"/>
                    </div>
                    <div className="flex flex-col w-fit bg-blue-600">
                        <label className="text-xs">Endereço</label>
                        <input className="outline-none border-b" type="text"/>
                    </div>
                    <div className="flex flex-col w-fit bg-blue-600">
                        <label className="text-xs">Endereço</label>
                        <input className="outline-none border-b" type="text"/>
                    </div>
                    <div className="flex flex-col w-fit bg-blue-600">
                        <label className="text-xs">Endereço</label>
                        <input className="outline-none border-b" type="text"/>
                    </div>
                    <div className="flex flex-col w-fit bg-blue-600">
                        <label className="text-xs">Endereço</label>
                        <input className="outline-none border-b" type="text"/>
                    </div>
                    <div className="flex flex-col w-fit bg-blue-600">
                        <label className="text-xs">Endereço</label>
                        <input className="outline-none border-b" type="text"/>
                    </div>
                </section>
            </div>

            <div className="bg-white w-[90%] h-[200px] text-center p-5" data-name="Dados básicos">
                <h1>Detalhes do Produto</h1>
                <p>ID da empresa: {id}</p>
            </div>

        </div>
    )
}