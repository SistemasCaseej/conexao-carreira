import Image from "next/image";
import {Button} from "@/components/ui/button";

export default function Home() {
  return (
      <div>
          <section className="bg-white min-h-[7vh]">
              <ul className="flex items-center min-h-[7vh]  px-6 sm:px-30 md:px-40 gap-20 text-[#aaa9a9]">
                  <li className="cursor-pointer font-epilogue">Para candidatos</li>
                  <li className="cursor-pointer">Para empresas</li>
              </ul>
          </section>
          <section className="flex flex-col min-h-[93vh] px-6 sm:px-30 md:px-40 bg-[#49257b]">
              <section data-qa="first-block" className="flex justify-between items-center py-4">
                  <h3 className="text-2xl text-white">vagas.com</h3>
                  <div className="justify-end">
                      <Button className="rounded-none bg-[#49257b] border hover:bg-white hover:text-black px-5 cursor-pointer mr-5">Entrar </Button>
                      <Button className="rounded-none bg-emerald-400 pointer-events-none hover:bg-transparent px-5 cursor-pointer">Cadastre-se gratuitamente</Button>
                  </div>
              </section>
              <section className="mt-10">
                  <div className="text-center">
                  </div>
              </section>
          </section>
      </div>
  );
}
