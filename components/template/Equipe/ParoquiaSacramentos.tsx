import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ParoquiaSacramentos(){
    return(
        <>
        <div className="flex gap-x-6 gap-y-8 flex-wrap mt-5">
                <div className="flex flex-col ">
                  <Label htmlFor="uf" className="text-sm/6 font-medium text-gray-900">
                    Paróquia
                  </Label>
                  <Input id="paroquia"
                        name="paroquia"
                        placeholder="São Pedro"
                        value=""
                        type="text"
                        className="flex bg-gray-50 sm:w-96 w-full min-w-0 py-1.5 sm:pl-0 pr-3 sm:p-1 sm:ml-0 text-base text-gray-900 focus:outiline-none sm:text-sm/6" ></Input>
                </div>
              </div>
              <div className="flex gap-x-6 gap-y-8 flex-wrap mt-5">
                <div className="flex flex-col ">
                  <Label htmlFor="uf" className="text-sm/6 font-medium text-gray-900">
                    Sacramentos
                  </Label>
                  <div className="flex flex-row">
                    <div className="flex mr-3 gap-1">
                      <Checkbox id="batismo" className="bg-gray-50 p-2" />
                      <Label htmlFor="batismo">Batismo</Label>
                    </div>
                    <div className="flex mr-3 gap-1">
                      <Checkbox id="eucaristia" className="bg-gray-50 p-2" />
                      <Label htmlFor="eucaristia">Eucaristia</Label>
                    </div>
                    <div className="flex mr-3 gap-1">
                      <Checkbox id="crisma" className="bg-gray-50 p-2" />
                      <Label htmlFor="crisma">Crisma</Label>
                    </div>
                    <div className="flex mr-3 gap-1">
                      <Checkbox id="matrimonio" className="bg-gray-50 p-2" />
                      <Label htmlFor="matrimonio">Matrimônio</Label>
                    </div>
                  </div>
                </div>
              </div>
        </>
    )
}