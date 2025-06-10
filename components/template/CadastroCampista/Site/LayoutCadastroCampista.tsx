import LogoAcampabento from "@/public/imagensSite/logo-bento.png"
import Image from "next/image"
import LinkRedesSociais from "./LinkRedesSociais"
import FormCadastroCampista from "./FormCadastroCampista"
import DownloadBentoApp from "@/components/template/CadastroCampista/Site/DownloadBentoApp"
export default function LayoutCadastroCampista(){
    return(
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-100 font-sans">
        <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8 lg:p-12 text-center lg:text-left bg-gradient-to-br from-gray-900 to-gray-950 text-white relative overflow-hidden">
            <div className="relative z-10 flex flex-col items-center lg:items-start max-w-lg mx-auto lg:mx-0">
                <Image
                    src={LogoAcampabento} // Use o caminho da sua logo
                    alt="Logo Acampamento"
                    width={200}
                    height={200}
                    className="mb-8"
                    priority // Carrega a imagem mais rápido
                />
            <h1 className="text-4xl  md:text-5xl lg:text-6xl font-extrabold leading-tight mb-4 drop-shadow-md">
                CONHEÇA O BENTO
            </h1>
            <p className="text-base md:text-lg mb-8 leading-relaxed">
                Preparado com muito amor e carinho, nós queremos através desse acampabento
                te apresentar uma nova visão de vida e principalmente, te mostrar Jesus
            </p>
            <div className="mb-12">
                <h3 className="text-lg font-semibold mb-3">Siga-nos nas redes:</h3>
                <LinkRedesSociais />
            </div>
            <div>
                <h3 className="text-lg font-semibold mb-3">Baixe nosso App:</h3>
                <DownloadBentoApp  />
            </div>
            </div>
        </div>
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-12">
        <FormCadastroCampista />
      </div>
    </div>
    )
}