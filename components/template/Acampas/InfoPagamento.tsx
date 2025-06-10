import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function InfoPagamentos(){
    return(
        <div className="flex flex-col">
                <div className="flex items-center">
                    <div className="flex flex-col mr-5">
                        <Label htmlFor="periodo" className="block text-sm/6 font-medium text-gray-900">
                            Taxa Equipe
                        </Label>
                        <Input id="taxaEquipe"
                                name="taxaEquipe"
                                type="number"
                                placeholder="R$"
                                className="flex  py-1.5  bg-gray-100 mr-3 p-1 text-base text-gray-900 placeholder:text-gray-400 focus:outiline-none sm:text-sm/6" >
                            </Input>
                    </div>
                    <div className="flex flex-col mr-5">
                        <Label htmlFor="periodo" className="block text-sm/6 font-medium text-gray-900">
                            Taxa Equipe Externa
                        </Label>
                        <Input id="taxaEquipeExterna"
                                name="taxaEquipeExterna"
                                type="number"
                                placeholder="R$"
                                className="flex  py-1.5  bg-gray-100 mr-3 p-1 text-base text-gray-900 placeholder:text-gray-400 focus:outiline-none sm:text-sm/6" >
                            </Input>
                    </div>
                    <div className="flex flex-col ">
                        <Label htmlFor="periodo" className="block text-sm/6 font-medium text-gray-900">
                            Taxa Campistas
                        </Label>
                        <Input id="taxaCampistas"
                                name="taxaCampistas"
                                type="number"
                                placeholder="R$"
                                className="flex  py-1.5  bg-gray-100 mr-3 p-1 text-base text-gray-900 placeholder:text-gray-400 focus:outiline-none sm:text-sm/6" >
                            </Input>
                    </div>
                </div>
                <div className="flex items-center mt-5">
                    <div className="flex flex-col ">
                        <Label htmlFor="periodo" className="block text-sm/6 font-medium text-gray-900">
                            Chave Pix
                        </Label>
                        <Input id="chavePix"
                            name="chavePix"
                            type="number"
                            placeholder=""
                            className="flex  py-1.5  bg-gray-100 mr-3 p-1 text-base text-gray-900 placeholder:text-gray-400 focus:outiline-none sm:text-sm/6" >
                        </Input>
                    </div>
                    <div className="flex flex-col ml-2">
                        <Label htmlFor="periodo" className="block text-sm/6 font-medium text-gray-900">
                           Link de pagamento
                        </Label>
                        <Input id="chavePix"
                            name="chavePix"
                            type="number"
                            placeholder="http://pagseguro.com/"
                            className="flex  py-1.5  bg-gray-100 mr-3 p-1 text-base text-gray-900 placeholder:text-gray-400 focus:outiline-none sm:text-sm/6" >
                        </Input>
                    </div>
                </div>
            </div>
    )
}