import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ImagemAcampa from "./ImagemAcampa";

export default function DocumentosAcampa(){
    return(
        <>
        <ImagemAcampa />
        <div className="flex mt-10">
            <div className="flex flex-col">
                <div className="flex flex-col">
                <Label htmlFor="cronograma" className="block text-sm/6 font-medium text-gray-900">
                    Cronograma
                </Label>
                <div className="flex">
                    <Input id="cronograma"
                        name="cronograma"
                        type="file"
                        placeholder="Jo 11, 35"
                        className="flex  py-1.5 bg-gray-100 mr-3 p-1 text-base text-gray-900 placeholder:text-gray-400 focus:outiline-none sm:text-sm/6" >
                    </Input>
                </div>
            </div>
            </div>
            <div className="flex flex-col">
                <div className="flex flex-col">
                <Label htmlFor="arteCamiseta" className="block text-sm/6 font-medium text-gray-900">
                    Arte Camiseta
                </Label>
                <div className="flex">
                    <Input id="arteCamiseta"
                        name="arteCamiseta"
                        type="file"
                        placeholder="Jo 11, 35"
                        className="flex  py-1.5 bg-gray-100 mr-3 p-1 text-base text-gray-900 placeholder:text-gray-400 focus:outiline-none sm:text-sm/6" >
                    </Input>
                </div>
            </div>
            </div>
            <div className="flex flex-col">
                <div className="flex flex-col">
                <Label htmlFor="cardapio" className="block text-sm/6 font-medium text-gray-900">
                    Cardápio
                </Label>
                <div className="flex">
                    <Input id="cardapio"
                        name="cardapio"
                        type="file"
                        placeholder="Jo 11, 35"
                        className="flex  py-1.5 bg-gray-100 mr-3 p-1 text-base text-gray-900 placeholder:text-gray-400 focus:outiline-none sm:text-sm/6" >
                    </Input>
                </div>
            </div>
            </div>
        </div>
        </>
    )
}