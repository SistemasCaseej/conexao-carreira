'use client'

import {useState} from "react";
import StartPage from "@/components/StartPage";


export default function Company(){

    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
           <StartPage
               isOpen={isOpen}
               setIsOpen={setIsOpen}
               title={"Centralize, agilize e otimize seus processos seletivos com uma plataforma pensada para empresas modernas"}
               subtitle={"Gerencie todo o funil de seleção com organização, praticidade e inteligência"}
               buttonLogin={"Login"}
               buttonOption={"Solicite uma demostração"}
               cards={false}
               titleClass={"md:text-4xl"}
               buttonDemostration={"Solicite uma demostração"}
               imagePath={"/img-estagio.webp"}
               path={'https://wa.me/5522997247140'}
           />
        </div>
    )
}