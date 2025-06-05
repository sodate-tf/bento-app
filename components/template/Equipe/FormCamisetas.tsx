import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function FormCamisetas(){
function radioTamanhos(){
    const tamanhos = ['PP', "P", "M", "G", "GG", "XGG", "EG", "XXGG"]
    return(
      tamanhos.map((tamanho, i) => (
            <div className="flex mr-3 gap-1" key={i}>
              <RadioGroupItem value={tamanho} id={tamanho} key={i} className="bg-gray-50 p-2" />
              <Label htmlFor={tamanho} key={i}>{tamanho}</Label>
            </div>
          )
      ))
  }
    return(
        <>
        <div className="flex gap-x-6 gap-y-8 flex-wrap mt-5">
            <div className="flex flex-col flex-wrap">
                <Label htmlFor="uf" className="text-sm/6 font-medium text-gray-900">
                Camiseta
                </Label>
                <div className="flex flex-row flex-wrap">
                <RadioGroup defaultValue="G" className="flex flex-wrap" orientation="horizontal">
                    {radioTamanhos()}
                </RadioGroup>
                </div>
            </div>
        </div>
        </>
    )
}