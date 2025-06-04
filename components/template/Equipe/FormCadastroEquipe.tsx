import { IconeCalendario, IconePesquisando, IconeWarning } from "@/components/icons";

import BotoesForms from "@/components/template/BotoesForm";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useState } from "react";

import ReactInputMask from "react-input-mask";
import { toast, Toaster } from "sonner";
export  interface FormCadastroEquipeProps{
    clickCancelar: () => void
}

 // Permite apenas números em input (ex: InputOTP)
export default function FormCadastroEquipe(props: FormCadastroEquipeProps){
  
  const [cpf, setCpf] = useState('');
  const [date, setDate] = useState<Date>()
  const [cep, setCep] = useState("");
  const [endereco, setEndereco] = useState({
      logradouro: "",
      bairro: "",
      localidade: "",
      uf: "",
      numero: 0,
      complemento: ""
    });

 
  const pesquisarEndereco = async () => {
    const cepSemMascara = cep.replace(/\D/g, "");
    if (cepSemMascara.length === 8) {
      //toast.success('pesquisando cep')
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cepSemMascara}/json/`);
        const data = await response.json();
        if (data.erro) {
           toast.error("CEP não encontrado. ",{
              className: "bg-yellow-800 text-white shadow-lg p-10 flex",
                unstyled: true,
                invert: false,
                icon: IconeWarning
              });
        } else {
          //toast.success(`Endereço encontrado: ${data.logradouro}`)
          // Exemplo: setRua(data.logradouro); setCidade(data.localidade); etc.
          setEndereco({
              logradouro: data.logradouro,
              numero: 0,
              bairro: data.bairro,
              localidade: data.localidade,
              uf: data.uf,
              complemento: data.complemento
            });
        }
      } catch (error) {
        toast.error(`CEP não encontrado. ${error}`,{
              className: "bg-red-900 text-white shadow-lg p-10 flex",
                unstyled: true,
                invert: false,
                icon: IconeWarning
              });
      }
      // Aqui você pode chamar sua API, ex:
      // const response = await fetch(`https://viacep.com.br/ws/${cepSemMascara}/json/`);
      // const data = await response.json();
      // console.log(data);
    } else {
       toast.error(`CEP incompleto`,{
              className: "bg-yellow-900 text-white shadow-lg p-10 flex",
                unstyled: true,
                invert: false,
                icon: IconeWarning
              });
    }
  };

  // A máscara para CPF é '999.999.999-99'
  // Onde '9' representa um dígito numérico.

  const handleCpfChange = (event) => {
    // event.target.value terá o valor já com a máscara aplicada (ex: "123.456.789-00")
    setCpf(event.target.value);
  };
   return(
    <form className="flex w-full relative">
      <div className="flex w-full px-4 py-2 sm:px-6 sm:py-8 lg:px-8 border">
        <div className="flex flex-col w-full">
          <div className="flex flex-col  border-gray-900/10 pb-12">
          
              <div className="flex gap-x-6 gap-y-8 ">
                <div className="flex flex-col">
                  <Label htmlFor="nomeAcampa" className="text-sm/6 font-medium text-gray-900">
                    Nome Completo
                  </Label>
                  <Input id="nameAcampa"
                         name="nameAcampa"
                         type="text"
                         className="flex bg-gray-50 sm:w-96 w-full min-w-0 py-1.5 sm:pl-0 pr-3 sm:p-1 sm:ml-0 text-base text-gray-900 focus:outiline-none sm:text-sm/6" ></Input>
                </div>
                <div className="flex flex-col">
                  <Label htmlFor="cpf" className="text-sm/6 font-medium text-gray-900">
                      CPF 
                  </Label>
                  <ReactInputMask
                    mask="999.999.999-99" // Define a máscara
                    maskChar="_"          // Caractere que preenche a máscara (opcional, padrão é "_")
                    value={cpf}           // Liga o valor do input ao estado
                    onChange={handleCpfChange} // Atualiza o estado quando o valor muda
                    placeholder="___.___.___-__" // Placeholder para guiar o usuário
                    id="cpf"
                    className="flex bg-gray-50 w-40 p-1 text-base text-gray-900 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"/>            
                </div>
              </div>
              <div className="flex mt-5">
                <div className="flex flex-col">
                    <Label htmlFor="nomeAcampa" className="text-sm/6 font-medium text-gray-900">
                      Data de Nascimento
                    </Label>
                    <div className="flex">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[240px] justify-start text-left font-normal",
                              !date && "text-muted-foreground"
                            )}
                          >
                            {IconeCalendario}
                            {date ? format(date, "PPP") : <span>Selecione a data</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            captionLayout="dropdown-buttons"
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                  </div>
                </div>
                <div className="flex flex-col lg:ml-5">
                  <Label htmlFor="instagram" className="text-sm/6 font-medium text-gray-900">
                    Instagram
                  </Label>
                  <Input id="instagram"
                         name="istagram"
                         placeholder="@ do instagram"
                         type="text"
                         className="flex bg-gray-50 sm:w-40 w-full min-w-0 py-1.5 sm:pl-0 pr-3 sm:p-1 sm:ml-0 text-base text-gray-900 focus:outiline-none sm:text-sm/6" ></Input>
                </div>
                <div className="flex flex-col lg:ml-5">
                  <Label htmlFor="cep" className="text-sm/6 font-medium text-gray-900">
                    CEP
                  </Label>
                  <ReactInputMask
                      mask="99999-999"
                      value={cep}
                      onChange={(e) => setCep(e.target.value)}
                      onBlur={pesquisarEndereco}
                      placeholder="_____-___"
                      className="flex bg-gray-50 w-40 p-1 text-base text-gray-900 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                    />
                </div>
              </div>
              <div className="flex mt-5">
                <div className="flex flex-col">
                      <Label htmlFor="Rua" className="text-sm/6 font-medium text-gray-900">
                        Rua
                      </Label>
                      <Input id="rua"
                            name="rua"
                            placeholder="Nome da rua"
                            value={endereco.logradouro}
                            type="text"
                            className="flex bg-gray-50 sm:w-96 w-full min-w-0 py-1.5 sm:pl-0 pr-3 sm:p-1 sm:ml-0 text-base text-gray-900 focus:outiline-none sm:text-sm/6" ></Input>
                </div>
                <div className="flex flex-col lg:ml-5">
                  <Label htmlFor="numero" className="text-sm/6 font-medium text-gray-900">
                    Número
                  </Label>
                  <Input id="numero"
                         name="numero"
                         placeholder="123"
                         value={endereco.numero}
                         type="text"
                         className="flex bg-gray-50 sm:w-30 w-full min-w-0 py-1.5 sm:pl-0 pr-3 sm:p-1 sm:ml-0 text-base text-gray-900 focus:outiline-none sm:text-sm/6" ></Input>
                </div>
                <div className="flex flex-col lg:ml-5">
                  <Label htmlFor="complemento" className="text-sm/6 font-medium text-gray-900">
                    Complemento
                  </Label>
                  <Input id="complemento"
                         name="complemento"
                         placeholder="Fundos"
                         value={endereco.complemento}
                         type="text"
                         className="flex bg-gray-50 sm:w-30 w-full min-w-0 py-1.5 sm:pl-0 pr-3 sm:p-1 sm:ml-0 text-base text-gray-900 focus:outiline-none sm:text-sm/6" ></Input>
                </div>              
              </div>
              <div className="flex mt-5">
                 <div className="flex flex-col">
                      <Label htmlFor="cidade" className="text-sm/6 font-medium text-gray-900">
                        Cidade
                      </Label>
                      <Input id="cidade"
                            name="cidade"
                            placeholder="Presidente Prudente"
                            value={endereco.localidade}
                            type="text"
                            className="flex bg-gray-50 sm:w-96 w-full min-w-0 py-1.5 sm:pl-0 pr-3 sm:p-1 sm:ml-0 text-base text-gray-900 focus:outiline-none sm:text-sm/6" ></Input>
                </div>
                <div className="flex flex-col lg:ml-5">
                      <Label htmlFor="uf" className="text-sm/6 font-medium text-gray-900">
                        UF
                      </Label>
                      <Input id="uf"
                            name="uf"
                            placeholder="SP"
                            value={endereco.uf}
                            type="text"
                            className="flex bg-gray-50 sm:w-12 w-full min-w-0 py-1.5 sm:pl-0 pr-3 sm:p-1 sm:ml-0 text-base text-gray-900 focus:outiline-none sm:text-sm/6" ></Input>
                </div>
              </div>
        
            <BotoesForms clickCancelar={props.clickCancelar}/>
          </div>
        </div>
      </div>
      <Toaster />
    </form>
   )
}