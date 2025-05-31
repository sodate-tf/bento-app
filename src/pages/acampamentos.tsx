import { IconeCheck, IconeX } from "@/components/icons";
import AcampamentoAtual from "@/components/template/Acampas/AcampamentoAtual";
import DocumentosAcampa from "@/components/template/Acampas/Documentos";
import InfoGeraisAcampa from "@/components/template/Acampas/InfoGerais";
import LeituraEMusica from "@/components/template/Acampas/LeituraMusica";
import BotoesForms from "@/components/template/BotoesForm";
import Layout from "@/components/template/Layout";
import { Separator } from "@/components/ui/separator";
export default function Acampamentos() { 
  return (
    <Layout titulo="Gerenciar Acampamentos" subTitulo="Cadastre aqui os acampamentos">
        <form className="flex w-full relative">
            <div className="flex w-full px-4 py-2 sm:px-6 sm:py-8 lg:px-8 border bg-gray-200">
              <div className="flex flex-col w-full">
                <div className="flex flex-col  border-gray-900/10 pb-12">
                    <AcampamentoAtual />
                     <Separator />
                     <InfoGeraisAcampa />
                      <Separator />
                     <LeituraEMusica/>
                     <Separator />
                     <DocumentosAcampa />
                     <Separator />
                     <BotoesForms/>
                </div>
              </div>
              
            </div>
        </form>
    </Layout> 
  )
}
