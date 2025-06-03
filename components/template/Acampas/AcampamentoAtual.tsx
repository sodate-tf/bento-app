import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function AcampamentoAtual(){
    return(
        <div className="">
            <p className="sm:block hidden text-muted-foreground text-sm">Marque se esse for o acampamento atual</p>
            <div className="flex border-gray-900 bg-cyan-700 py-4 px-2 mb-8 w-fit">
                <Label htmlFor="acampamentoAtivo" className="text-sm/6 font-medium text-gray-200 mr-5">Acampamento Ativo?</Label>
                <Switch id="acampamentoAtivo"/>
            </div>
        </div>
    )
}