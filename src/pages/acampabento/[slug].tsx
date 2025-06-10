import logoBento from '@/public/imagensSite/logo-bento.png'
import globoBranco from "@/public/imagensSite/globo.svg"
import sparkle from "@/public/imagensSite/sparkle.svg"
import circulos from "@/public/imagensSite/circulos.svg"
import codigoDeBarras from "@/public/imagensSite/codigo-de-barras.svg"
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import IconeInstagram from "@/public/images/instagram.svg"
import CountdownSection from './sessaoContator'
import Link from 'next/link'
import LayoutCadastroCampista from '@/components/template/CadastroCampista/Site/LayoutCadastroCampista'

export default function AcampabentoLanding(){
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
            <section id="sessaoHome" className="flex h-screen ">
                <div className="flex flex-col w-full justify-center items-center bg-black/95  z-1">
                    <span className="sm:text-7xl text-7xl items-center font-extrabold flex flex-col sm:flex-row">
                        <span className="text-white">ACAMPA</span>
                        <span className="text-red-600">BENTO</span>
                    </span>
                    <div className='w-full flex justify-center mt-20 px-4'>
                        <div className='w-4/5 font-bold text-3xl text-white tracking-wider text-center '>
                              <span className="text-white">"É ISSO QUE FAZEMOS. NÓS OUVIMOS E CONTAMOS</span> 
                              <span className="text-red-600"> HISTÓRIAS.</span> 
                              <span className="text-white"> A</span>
                              <span className="text-red-600"> MINHA</span>
                              <span className="text-white"> A, SUA</span>
                              <span className="text-red-600">, A NOSSA</span>
                              <span className="text-white"> HISTÓRIA"</span>
                        </div>
                    </div>
                </div>
            </section>
             <CountdownSection
                targetDate={"2025-11-15T06:00:00"}
                backgroundImageUrl='http://localhost:3000/imagensSite/bento-momento.jpg'
                isInscricoesAbertas={true}
                
            />
            <section id="convite" className="py-20"> 
            <div className="relative z-10 w-4/5 mx-auto flex flex-col items-center p-8 bg-gray-950/80 shadow-xl rounded-lg">
                <div className="w-full flex flex-col md:flex-row items-center md:items-start justify-between gap-8 mb-8"> 
                <h2 className="text-4xl font-mono md:text-5xl font-extrabold uppercase text-red-600 w-full md:w-1/3 text-center md:text-left">
                    O Próximo Passo Te Espera.
                </h2>
                <p className="text-lg md:text-xl leading-relaxed text-white w-full md:w-2/3 text-center md:text-left">
                    Você não veio até aqui por acaso. Existe um chamado — e ele pode mudar sua vida.
                    O AcampaBento é mais do que um acampamento: é um mergulho em si mesmo, no amor de Deus e na força de uma comunidade que vibra no servir.
                </p>
                </div>
                <div className='w-full flex justify-center'>
                    <a href="#inscrever" >
                    <Button className='md:py-8 md:px-15 p-5 text-3xl uppercase transition-colors duration-200 bg-emerald-900 cursor-pointer hover:bg-emerald-600'>Garanta sua vaga</Button>
                    </a>
                </div>
            </div>
            </section>
            <section id="sessaoNossaHistoria" className="relative w-full  flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-black/95 z-0"></div> {/* z-0 para ficar por trás do conteúdo */}
                    <div className="relative z-10 bg-gray-950/95 w-full max-w-4xl mx-auto rounded-lg shadow-xl p-6 md:p-8 flex flex-col">
                        <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start mb-6">
                            <h2 className="text-5xl sm:text-6xl md:text-7xl font-extrabold flex-shrink-0 whitespace-nowrap">
                                <span className="text-gray-50">QUEM</span>
                                <span className="text-red-600">SOMOS</span>
                            </h2>
                            <Image
                                className="mt-4 sm:mt-0 ml-0 sm:ml-8 flex-shrink-0 w-32 h-auto md:w-40" // Ajuste de margem e largura
                                src={logoBento}
                                width={150} // Largura base para otimização do Next.js Image
                                height={150} // Altura base
                                alt='Logo Acampabento'
                            />
                        </div>
                        <p className='mt-6 p-5 pl-0 text-gray-50 font-light text-base md:text-lg leading-relaxed text-justify'>
                        O AcampaBento nasceu em 2009, com o sonho de proporcionar uma experiência transformadora de fé, amizade e alegria para jovens de todas as idades. O que começou como uma simples iniciativa de evangelização cresceu e se tornou um dos maiores movimentos de retiro da nossa comunidade.

                        Hoje, com mais de uma década de história, realizamos dois acampamentos por ano e já impactamos milhares de pessoas com momentos inesquecíveis de espiritualidade, diversão, serviço e conexão com Deus.

                        Somos uma grande família que acredita no poder do encontro com Cristo, da partilha e do serviço ao próximo. Cada acampamento é único, mas todos carregam a mesma essência: levar os participantes a viver uma verdadeira vibe de servir.

                        Seja você veterano ou novo por aqui, o AcampaBento é o seu lugar.
                        </p>
                     </div>
            </section>
            <section id="inscrever" className="relative w-full  flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-black/95 z-0"></div> {/* z-0 para ficar por trás do conteúdo */}
                <div className="relative z-10 bg-white/95 w-full max-w-4xl mx-auto rounded-lg shadow-xl p-6 md:p-8 flex flex-col">
                    <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start mb-6">
                        <LayoutCadastroCampista />
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