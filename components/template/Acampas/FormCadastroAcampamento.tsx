import AcampamentoAtual from "@/components/template/Acampas/AcampamentoAtual";
import DocumentosAcampa from "@/components/template/Acampas/Documentos";
import InfoGeraisAcampa from "@/components/template/Acampas/InfoGerais";
import LeituraEMusica from "@/components/template/Acampas/LeituraMusica";
import BotoesForms from "@/components/template/BotoesForm";
import { Separator } from "@/components/ui/separator";
import { Toaster } from "sonner";
export  interface FormCadastroAcampaProps{
    clickCancelar: () => void
}
export default function FormCadastroAcampa(props: FormCadastroAcampaProps){
   return(
    <form className="flex w-full relative">
            <div className="flex w-full px-4 py-2 sm:px-6 sm:py-8 lg:px-8 border">
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
                     <BotoesForms clickCancelar={props.clickCancelar}/>
                </div>
              </div>
            </div>
            <Toaster />
        </form>
   )
}