import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ReactInputMask from "react-input-mask";

export default function ContatoEmergencia(){
    return(
        <>
        <div className="flex gap-x-6 gap-y-8 flex-wrap mt-5">
                <div className="flex flex-col ">
                  <Label htmlFor="contatoEmergencia" className="text-sm/6 font-medium text-gray-900">
                    Contato de emergência
                  </Label>
                   <Input id="contatoEmergencia"
                        name="contatoEmergencia"
                        placeholder="Em caso de emergência ligar para"
                        value=""
                        type="text"
                        className="flex bg-gray-50 sm:w-96 w-full min-w-0 py-1.5 sm:pl-0 pr-3 sm:p-1 sm:ml-0 text-base text-gray-900 focus:outiline-none sm:text-sm/6" ></Input>
                </div>
                <div className="flex flex-col lg:ml-5">
                  <Label htmlFor="celContatoEmergencia" className="text-sm/6 font-medium text-gray-900">
                    Celular
                  </Label>
                  <ReactInputMask id="celContatoEmergencia"
                      name="celContatoEmergencia"
                      mask="(99) 99999-9999"
                      placeholder="(__) _____-____"
                      className="flex bg-gray-50 w-40 p-1 text-base text-gray-900 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent" />
                </div>
              </div>  
        </>
    )
}