import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LeituraEMusica(){
    return(
        <>
        <p className="text-muted-foreground mt-10 mb-3 text-sm">Leitura e música.</p>
        <div className="flex items-center">
            <div className="flex flex-col">
                <div className="flex flex-col">
                <Label htmlFor="linkInscricao" className="block text-sm/6 font-medium text-gray-900">
                    Música Tema
                </Label>
                <div className="flex">
                    <Input id="musicaTema"
                        name="musicaTema"
                        type="text"
                        placeholder="Bem na minha vez - MC Livinho"
                        className="flex  py-1.5  bg-gray-100 mr-3 p-1 text-base text-gray-900 placeholder:text-gray-400 focus:outiline-none sm:text-sm/6" >
                    </Input>
                </div>
            </div>
            </div>
        <div className="flex flex-col gap-x-6 gap-y-8 ">
            <div className="flex flex-col">
                <Label htmlFor="leituraTema" className="block text-sm/6 font-medium text-gray-900">
                    Leitura Tema
                </Label>
                <div className="flex">
                <Input id="leituraTema"
                        name="leituraTema"
                        type="text"
                        placeholder="Jo 11, 35"
                        className="flex  py-1.5  bg-gray-100 mr-3 p-1 text-base text-gray-900 placeholder:text-gray-400 focus:outiline-none sm:text-sm/6" >
                </Input>
                </div>
            </div>
        </div>
        </div>
        </>
    )
}