import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { generateWhatsAppLink } from "@/lib/utils";
import { BanknoteArrowUp, HandCoins, Menu, Send } from "lucide-react";
import Link from "next/link";
import { useId, useState } from "react";

interface LaytoutCobrancaProps{
    LaytoutIconeCobranca?: string
    corIcone?: string
}
export default function LayoutCobranca(props: LaytoutCobrancaProps){

const title = "Pagamento"
const [formaPagamento, setFormaPagamento] = useState()
const celular = "18991631099"
const [statusPagamento, setStatusPagamento] = useState('Pendente')
const [recebidoPor, setRecebidoPor]  = useState('')
const FORMAS_PAGAMENTO = ['DINHEIRO', 'PIX', 'CARTÃO DE DÉBITO', 'CARTÃO DE CRÉDITO'];
const msgWhataspp = encodeURIComponent(`Olá, [Nome do Campista]! Tudo pronto para o Acampamento Bento?\n
                      Sua vaga está quase garantida! 😊 \n
                      O pagamento é muito importante para confirmarmos sua participação, 
                      e estamos enviando os dados para você finalizar esse passo:\n\n
                        PIX: [Chave Pix (CPF/CNPJ/E-mail/Telefone)]
                        (Caso queira copiar e colar: [Chave Pix sem formatação])
                    \n\n
                    Prefere parcelar no cartão? Sem problemas!\n
                    Link de Pagamento (Cartão): [Link para Pagamento Parcelado]\n
                    \n\n
                    Contamos com você para essa experiência incrível!\n 
                    Qualquer dúvida, é só nos chamar. 😉`)

    function confirmarPagamento(){
        setStatusPagamento('Pago')
        setRecebidoPor('Fabiano Sodate em 10/06/2025')
    }
    let LayoutIcone = ""
    if (!props.LaytoutIconeCobranca) {
        LayoutIcone = "cursor-pointer w-12 h-12 absolute top-1.5 right-5 z-50" 
     } else {
        LayoutIcone = props.LaytoutIconeCobranca
     }
    
     let CorIcone = ""
     if (!props.corIcone) {
        CorIcone = "text-cyan-950" 
     } else {
        CorIcone = props.corIcone
     }
      
    return(
       <Sheet>
            {/* Gatilho (Trigger): O botão que abre o menu lateral */}
            <SheetTrigger asChild>
                {/*
                O botão de menu lateral será visível em telas pequenas (lg:hidden).
                Em telas grandes, você pode ter um menu de navegação horizontal normal.
                */}
                <div  className={LayoutIcone}>
                    <HandCoins  className={CorIcone} />
                    <span className="sr-only">Abrir menu</span>
                </div>
            </SheetTrigger>

            {/* Conteúdo do Menu Lateral */}
            <SheetContent
                side="right" // O menu deslizará da esquerda
                className="w-[280px] sm:w-[320px] flex flex-col bg-white" // Largura responsiva e flexbox para o layout interno
            >
                <SheetHeader className="text-left px-4 pt-4 pb-2 border-b">
                <SheetTitle className="text-2xl font-bold text-gray-900">{title}</SheetTitle>
                {/* <SheetDescription>Navegue pelas seções do nosso site.</SheetDescription> */}
                </SheetHeader>

                {/* ScrollArea para o conteúdo do menu, caso seja muito longo */}
                <ScrollArea className="flex-1 py-6 px-4">
                   <div className="flex flex-col border-b pb-5">
                        <div className="flex items-center">
                            <h1 className="font-bold text-gray-900">Acampamento: </h1>
                            <span className="font-medium text-sm ml-2 "> II Bento 30+</span>
                        </div>
                        <div className="flex items-center">
                            <h1 className="font-bold text-gray-900">Equipe: </h1>
                            <span className="font-medium text-sm ml-2 "> Secretaria</span>
                        </div>
                   </div>
                   <div className="flex flex-col border-b pb-5">
                        <div className="flex items-center">
                            <h1 className="font-bold text-gray-900">Status: </h1>
                            <span className="font-medium text-sm ml-2 "> {statusPagamento}</span>
                        </div>
                        <div className="flex items-center">
                            <h1 className="font-bold text-gray-900">Taxa: </h1>
                            <span className="font-medium text-sm ml-2 "> R$ 150,00</span>
                        </div>
                        {
                          statusPagamento == 'Pendente' ? (
                                <div className="flex flex-col items-center">
                                    <a target="_blank" href={generateWhatsAppLink(celular, msgWhataspp)}>       
                                        <Button variant='outline' className="mt-2 bg-cyan-950 text-white hover:bg-cyan-900 hover:text-white cursor-pointer">
                                            <Send className="text-white" />
                                            Enviar Mensagem de Cobrança
                                        </Button>
                                    </a>
                                    <span className="flex flex-col text-xs text-gray-600 mt-2">
                                        Última mensagem enviada em: 10/06/2025 por Fabiano Sodate
                                    </span>
                                </div>
                          ) : false
                        }
                    </div>
                    <div className="flex flex-col border-b pb-5">
                        <div className="flex items-center">
                            <h1 className="font-bold text-gray-900">Registrar Pagamento: </h1>
                        </div>
                        <div className="flex flex-col mt-5">
                            <span className="text-sm">Comprovante</span>
                            <Input id="picture" type="file" className="mt-1 file:pt-0.5" />
                            <Link href="http://localhost:3000/comprvante" target="_blank"
                                className="text-xs text-blue-700 underline cursor-pointer mt-2"
                            >
                                comprovante-pagamento.pdf
                            </Link>
                            
                            {
                                statusPagamento == 'Pendente' ? (
                                    <>
                                    <span className="text-sm mt-5">Forma de Pagamento</span>
                                    <Select
                                        value={formaPagamento}
                                        onValueChange={(value: any) => setFormaPagamento(value)}
                                    >
                                        <SelectTrigger>
                                        <SelectValue placeholder="Selecione" />
                                        </SelectTrigger>
                                        <SelectContent>
                                        {FORMAS_PAGAMENTO.map(state => (
                                            <SelectItem key={state} value={state}>{state}</SelectItem>
                                        ))}
                                        </SelectContent>
                                    </Select>
                                   <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button variant='outline' className="mt-5 bg-cyan-950 text-white hover:bg-cyan-900 hover:text-white cursor-pointer">
                                                <BanknoteArrowUp />
                                                Confirmar Pagamento
                                            </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                            <AlertDialogTitle>Confirma o registro de pagamento?</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                Ao clicar em confirmo será registrado o pagamento
                                            </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                            <AlertDialogCancel className="bg-red-950 hover:bg-red-800 text-white hover:text-white cursor-pointer">Cancelar</AlertDialogCancel>
                                            <AlertDialogAction className="bg-cyan-950 hover:bg-cyan-900 cursor-pointer" onClick={confirmarPagamento}>Confirmar</AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog> 
                                    </>    
                                ) : (
                                     <span className="flex flex-col text-xs text-gray-600 mt-8">
                                       Recebido Por: {recebidoPor}
                                    </span>   
                                )
                            }
                            
                             
                        </div>
                    </div>
                </ScrollArea>
                
                {/* Você pode adicionar um rodapé para o menu lateral aqui */}
                
            </SheetContent>
            </Sheet> 
    )
}