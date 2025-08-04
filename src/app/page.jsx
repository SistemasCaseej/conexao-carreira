"use client"

import { useState } from "react";
import StartPage from "@/components/StartPage";


export default function Home() {

    const [isOpen, setIsOpen] = useState(false);

  return (
      <div>
        <StartPage
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            title={"Encontre sua vaga de emprego"}
            subtitle={"A sua próxima oportunidade pode estar a apenas alguns cliques de distância encontre, inscreva-se e transforme sua carreira."}
            buttonLogin={"Entrar"}
            buttonOption={"Cadastre-se gratuitamente"}
            cards={true}
            imagePath={"/img-estagio.webp"}
        />
      </div>
  );
}
