import BotoesForms from "@/components/template/BotoesForm";
import { Toaster } from "sonner";
import InfosGerais from "./InfosGerais";
import Endereco from "./Endereco";
import ParoquiaSacramentos from "./ParoquiaSacramentos";
import FormCamisetas from "./FormCamisetas";
import ContatoEmergencia from "./ContatoEmergencia";
import { Separator } from "@/components/ui/separator";
import EditarHistorico from "./MenuHistorico/EditarHistorico";
import LayoutCobranca from "../Cobranca/LayoutCobranca";
export  interface FormCadastroEquipeProps{
    clickCancelar: () => void
    uid?: string
}

 // Permite apenas números em input (ex: InputOTP)
export default function FormCadastroEquipe(props: FormCadastroEquipeProps){
   return(
    <>
    <form className="flex w-full relative">
      <LayoutCobranca />
      <div className="flex w-full px-4 py-2 sm:px-6 sm:py-8 lg:px-8 border">
        <div className="flex flex-col w-full">
          <div className="flex flex-col  border-gray-900/10 pb-12 relative">
              <InfosGerais />
              <Separator className="my-2.5" />
              <Endereco />
              <ParoquiaSacramentos />
              <FormCamisetas />
              <ContatoEmergencia />
            <BotoesForms clickCancelar={props.clickCancelar}/>
          </div>
        </div>
      </div>
      <Toaster />
    </form>
    <EditarHistorico uid={props.uid}/>
    </>
   )
}