import logoBento from '@/public/imagensSite/logo-bento.png'
import globoBranco from "@/public/imagensSite/globo.svg"
import sparkle from "@/public/imagensSite/sparkle.svg"
import circulos from "@/public/imagensSite/circulos.svg"
import codigoDeBarras from "@/public/imagensSite/codigo-de-barras.svg"
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import IconeInstagram from "@/public/images/instagram.svg"
import Link from 'next/link'
import LayoutCadastroCampista from '@/components/template/CadastroCampista/Site/LayoutCadastroCampista'
import TelaPerfil from '@/components/profile/TelaPerfil'

export default function Perfil(){
    return(
        <div className=' h-screen relative w-screen p-0'>
        
         <div className='w-8 h-8 bg-white hover:bg-gray-200  rounded-full top-2 left-2 fixed z-100 cursor-pointer'>
            <Link href={"https://www.instagram.com/acampabento/"} target='_blank' >
                <Image alt='Instagram Acampabento' className='absolute top-1 left-1' src={IconeInstagram}></Image>
            </Link>
         </div>
        <Image className='z-2 left-8 bottom-45 fixed' width={70} height={70} src={globoBranco} alt="Globo Branco" />
        <Image className='z-2 left-8 bottom-20 fixed' width={70} height={70} src={sparkle} alt="Sparkle Vermelho" />
        <Image className='z-2 right-8 top-20 fixed' width={100} height={100} src={circulos} alt="Circulos" />
        <span className='text-red-600 fixed z-2 right-6 bottom-47 -rotate-90'>{new Date().getFullYear()}</span>
        <Image className='z-2 right-8 bottom-20 fixed' width={100} height={100} src={codigoDeBarras} alt="Circulos" />
        <div className='float items-center justify-center fixed z-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
             <Image src={logoBento} alt='Logo Acampabento' />
        </div>
        <section id="inscrever" className="relative w-full  flex items-center justify-center overflow-hidden">
            
            <div className="absolute inset-0 bg-black/95 z-0"></div> {/* z-0 para ficar por trás do conteúdo */}
            <div className="relative z-10 bg-white/95 w-full max-w-4xl mx-auto rounded-lg shadow-xl p-6 md:p-8 flex flex-col">
                <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start mb-6">
                    <TelaPerfil />
                </div>
            </div>
        </section>
        <footer className='flex flex-col text-[10px] py-3 bg-gray-950/95 items-center justify-center text-gray-600'>
            Desenvolvidor por Fabiano Sodate -
            {new Date().getFullYear()+" - Acampabento 'Nós ouvimos e contamos histórias'"}
        </footer>
        </div>
    )
}