import logoBento from '@/public/imagensSite/logo-bento.png'
import globoBranco from "@/public/imagensSite/globo.svg"
import sparkle from "@/public/imagensSite/sparkle.svg"
import circulos from "@/public/imagensSite/circulos.svg"
import codigoDeBarras from "@/public/imagensSite/codigo-de-barras.svg"
import Image from 'next/image'
export default function AcampabentoLanding(){
    return(
        <div className='flex flex-col h-screen relative w-screen p-0'>
        <Image className='z-2 left-8 bottom-45 fixed' width={70} height={70} src={globoBranco} alt="Globo Branco" />
        <Image className='z-2 left-8 bottom-20 fixed' width={70} height={70} src={sparkle} alt="Sparkle Vermelho" />
        <Image className='z-2 right-8 top-20 fixed' width={100} height={100} src={circulos} alt="Circulos" />
        <span className='text-red-600 fixed z-2 right-6 bottom-47 -rotate-90'>{new Date().getFullYear()}</span>
        <Image className='z-2 right-8 bottom-20 fixed' width={100} height={100} src={codigoDeBarras} alt="Circulos" />
        <div className='float items-center justify-center fixed z-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
             <Image src={logoBento} alt='Logo Acampabento' />
        </div>
            <section id="sessaoHome" className="flex h-screen ">
                <div className="flex flex-col w-full justify-center items-center h-screen bg-black/95  z-1">
                    <span className="text-7xl font-extrabold flex">
                        <span className="text-white">ACAMPA</span>
                        <span className="text-red-600">BENTO</span>
                    </span>
                    <span className='flex font-bold text-2xl text-white mt-20 tracking-wider'>
                        "NÓS OUVIMOS E CONTAMOS HISTÓRIAS"
                    </span>
                </div>
            </section>
            <section id="convite">
                <div className="relative z-10 flex items-center mt-15 mb-15 text-white p-8 bg-gray-950/80 shadow-xl">
                <div className='w-full flex flex-col'>
                    <h2 className="text-4xl flex w-1/3 uppercase text-red-600  md:text-5xl font-extrabold mb-4">
                        Mergulhe na Experiência
                    </h2>
                    <p className="text-lg flex w-2/3 md:text-xl leading-relaxed ml-5">
                        Você não veio até aqui por acaso. Existe um chamado — e ele pode mudar sua vida.
                        O AcampaBento é mais do que um acampamento: é um mergulho em si mesmo, no amor de Deus e na força de uma comunidade que vibra no servir.
                    </p>
                    </div>
                    <div className='w-screen flex flex-col'>
                        <button className='flex flex-col p-5 bg-cyan-950 text-white w-80 mt-10'>Faça sua inscrição!</button>
                    </div>
                </div>
            </section>
            <section id="sessaoNossaHistória" className="flex h-screen">
                <div className="flex flex-col w-full h-screen items-center bg-black/95 z-1">
                    <div className='bg-gray-50 w-4/5 flex flex-col p-3 relative top-15'>
                        <span className="text-7xl font-extrabold flex">
                            <span className="text-gray-950">QUEM</span>
                            <span className="text-red-600">SOMOS</span>
                        </span>
                        <Image className='flex absolute right-0' src={logoBento} width={150} alt='Logo Acampabento' />
                        <p className='flex mt-10 text-justify leading-8'>
                            O AcampaBento nasceu em 2009, com o sonho de proporcionar uma experiência transformadora de fé, amizade e alegria para jovens de todas as idades. O que começou como uma simples iniciativa de evangelização cresceu e se tornou um dos maiores movimentos de retiro da nossa comunidade.

                            Hoje, com mais de uma década de história, realizamos dois acampamentos por ano e já impactamos milhares de pessoas com momentos inesquecíveis de espiritualidade, diversão, serviço e conexão com Deus.

                            Somos uma grande família que acredita no poder do encontro com Cristo, da partilha e do serviço ao próximo. Cada acampamento é único, mas todos carregam a mesma essência: levar os participantes a viver uma verdadeira vibe de servir.

                            Seja você veterano ou novo por aqui, o AcampaBento é o seu lugar.
                        </p>
                    </div>
                </div>
            </section>
        </div>
        
        
    )
}