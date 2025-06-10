import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ReactInputMask from "react-input-mask";
import CalendarioData from "@/components/CalendarioData";

export default function FormCadastroCampista(){
    return(
        <>
        <div className="p-6 md:p-8 bg-white/90 rounded-lg shadow-xl w-full max-w-lg">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">
                 Garanta sua Vaga!
            </h2>
            <p className="text-gray-600 mb-6 text-center">Preencha o formulário abaixo para se inscrever no Acampamento.</p>
            <form className="space-y-4">
                <div>
                    <Label htmlFor="name">Nome Completo</Label>
                    <Input id="name" type="text" placeholder="Seu nome" />
                </div>
                <div>
                    <Label htmlFor="email">E-mail</Label>
                    <Input id="email" type="email" placeholder="seu.email@exemplo.com" />
                </div>
                <div>
                    <Label htmlFor="phone">Celular</Label>
                    <ReactInputMask id="celular"
                                          name="celular"
                                          mask="(99) 99999-9999"
                                          placeholder="(__) _____-____"
                                          className="p-3"/>
                </div>
                 <div>
                    <Label htmlFor="phone">Data de Nascimento</Label>
                    <CalendarioData />
                </div>
                {/* Adicione mais campos do formulário aqui */}
                <Button type="submit" className="w-full rounded-none  bg-cyan-950 hover:bg-cyan-700 text-white py-5 px-3 mt-6">
                    Inscrever-se
                </Button>
            </form>
        </div>
        </>
    )
}