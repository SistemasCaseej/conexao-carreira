import Image from "next/image";

export default function Home() {
  return (
      <div>
          <section className="bg-white min-h-[7vh]">
              <ul className="flex items-center min-h-[7vh] px-6 sm:px-30 md:px-40 gap-20 text-[#aaa9a9]">
                  <li className="cursor-pointer">Para candidatos</li>
                  <li className="cursor-pointer">Para empresas</li>
              </ul>
          </section>
          <section className="flex flex-wrap justify-between items-center min-h-[93vh] px-6 sm:px-30 md:px-40">
              <p>O sistema ATS para processos seletivos e contratações mais ágeis e eficientes</p>
              <Image src="/img-estagio.webp" alt="estudante" width="450" height="450" />
          </section>
      </div>
  );
}
