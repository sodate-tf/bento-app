import { IconeWarning } from "@/components/icons";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import ReactInputMask from "react-input-mask";
import { toast } from "sonner";

export default function Endereco(){
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
return(
    <>
    <div className="flex gap-x-6 gap-y-8 flex-wrap  mt-5">
        <div className="flex flex-col">
            <Label htmlFor="cep" className="text-sm/6 font-medium text-gray-900">
            CEP
            </Label>
            <ReactInputMask
                mask="99999-999"
                value={cep}
                onChange={(e) => setCep(e.target.value)}
                onBlur={pesquisarEndereco}
                placeholder="_____-___"
                className="flex bg-gray-50 w-[120px] p-1 text-base text-gray-900 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
            />
        </div>
        </div>
        <div className="flex gap-x-6 gap-y-8 flex-wrap mt-5">
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
        <div className="flex gap-x-6 gap-y-8 flex-wrap mt-5">
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
    </>
    )
}