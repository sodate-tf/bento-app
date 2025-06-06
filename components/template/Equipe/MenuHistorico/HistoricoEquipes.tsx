import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { historicoFake } from "@/src/data/tabelasFake";
import { Handshake, Hourglass } from "lucide-react";

interface HistoricoEquipesProps{
    uid: string
    exibirConvite: boolean
}
export default function HistoricoEquipes(props: HistoricoEquipesProps){
    const historico = historicoFake
    console.log(props.exibirConvite)
    return(
        <div className="mt-3 flex flex-col">
            <Label className="text-xs font-medium ">Histórico</Label>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-xs">ANO</TableHead>
                        <TableHead className="text-xs">BENTO</TableHead>
                        <TableHead className="text-xs"></TableHead>
                        <TableHead className="text-xs">EQUIPE</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {historico.map((hist, i) =>(
                        
                       <TableRow>
                        <TableCell className="text-xs">{hist.ano}</TableCell>
                        <TableCell className="text-xs">{hist.nome}</TableCell>
                        <TableCell>
                            {hist.coordenador ? (
                            <Tooltip>
                                <TooltipTrigger>
                                    <Handshake size={16} strokeWidth={1} />
                                </TooltipTrigger>
                                <TooltipContent side="right" >
                                    <p>Coordenador de Equipe</p>
                                </TooltipContent>
                            </Tooltip>
                         ): ''}
                        </TableCell>
                        <TableCell className="text-xs">{hist.equipe}</TableCell>
                        </TableRow>     
                    ))}
                    
                    {props.exibirConvite ?(
                    <TableRow className="text-amber-800">
                        <TableCell className="text-xs">2025</TableCell>
                        <TableCell className="text-xs">II BENTO 30+</TableCell>
                        <TableCell >
                            <Tooltip>
                                <TooltipTrigger>
                                    <Hourglass size={16} strokeWidth={1} />
                                </TooltipTrigger>
                                <TooltipContent side="right" >
                                    <p>Aguardando confirmação</p>
                                </TooltipContent>
                            </Tooltip>
                        </TableCell>
                        <TableCell className="text-xs">PENDENTE</TableCell>
                    </TableRow>
                    ) : false}
                </TableBody>
            </Table>
        </div>
    )
}