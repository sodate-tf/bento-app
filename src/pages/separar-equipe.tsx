import Layout from "@/components/template/Layout";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useState } from "react";
import { equipeFake } from "../data/tabelasFake";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import EditarHistorico from "@/components/template/Equipe/MenuHistorico/EditarHistorico";
import { ChevronDown, Icon, Trash, Trash2, UserCheck } from "lucide-react";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import TelaPerfil from "@/components/profile/TelaPerfil";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";



const BENTOS_ATIVOS = ['II Bento 30+']
const EQUIPES_DE_TRABALHO = [
    'LÍDERES',
    'SECRETARIA',
    'APOIO',
    'MANUTENÇÃO',
    'COZINHA',
    'BEM ESTAR',
    'EXTERNA',
    'COORDENAÇÃO',
    'DIREÇÃO',
    'MÚSICA',
    'INTERCESSÃO',
    'PRODUÇÃO',
    'MÍDIA'
]
const equipeTrabalho = equipeFake
export default function SepararEquipe() { 
  
  const [bentoAtivo, setBentoAtivo] = useState('II Bento 30+')
  const [selectedEquipes, setSelectedEquipes] = useState<Record<string, string>>({});
  function selecionouEquipe(uid: string, equipe: string){
      setSelectedEquipes(equipesAnteriores => ({
          ...equipesAnteriores,
          [uid] : equipe
      }))
  }
    return (
    <Layout titulo="Separar Equipe" subTitulo="Escolha a equipe de cada membro da equipe">
      <div className="flex flex-col w-full bg-gray-200 p-3 ">
        <div className="flex flex-col">
            <Label>Selecione o Acampamento:</Label>
            <Select
                value={bentoAtivo}
                onValueChange={(value: any) => setBentoAtivo(value)}>
                <SelectTrigger className="bg-white p-3 mt-3">
                  <SelectValue  placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                {BENTOS_ATIVOS.map(state => (
                    <SelectItem key={state} value={state}>{state}</SelectItem>
                ))}
                </SelectContent>
            </Select>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="">uid</TableHead>
                  <TableHead>Nome</TableHead>
                  <TableHead>Perfil</TableHead>
                  <TableHead >Histórico</TableHead>
                  <TableHead >Equipe</TableHead>
                  <TableHead ></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {equipeTrabalho.map((equipe, i) => (
                  <TableRow key={equipe.uid} className={(i % 2 === 0) ? "bg-gray-300" : "bg-neutral-200"}>
                    <TableCell className="font-medium">{equipe.uid}</TableCell>
                    <TableCell className="font-medium">{equipe.nome}</TableCell>
                    <TableCell>
                      <Sheet>
                          <SheetTrigger asChild>
                            <Avatar className="cursor-pointer">
                              <AvatarImage src="https://github.com/shadcn.png" />
                              <AvatarFallback>Pefil</AvatarFallback>
                          </Avatar>
                          </SheetTrigger>
                          <SheetContent className="overflow-auto min-w-2/3 w-2/3 sm:w-[350px] md:w-[450px] lg:w-[600px] flex flex-col">
                            <ScrollArea className="flex-1 py-4 ">
                               <TelaPerfil />
                            </ScrollArea>
                          </SheetContent>
                        </Sheet>
                        
                    </TableCell>
                    <TableCell className="relative">
                        <EditarHistorico uid={equipe.uid}/>
                    </TableCell>
                    <TableCell className="">
                      <Select
                          value={selectedEquipes[equipe.uid]}
                          onValueChange={(value: any) => selecionouEquipe(equipe.uid, value)}>
                          <SelectTrigger className="bg-white p-3 mt-3">
                            <SelectValue  placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent className="bg-white">
                          {EQUIPES_DE_TRABALHO.map(state => (
                              <SelectItem key={state} value={state}>{state}</SelectItem>
                          ))}
                          </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                          <UserCheck className="cursor-pointer hover:text-cyan-800 text-cyan-950"  />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
        </div>
        <Separator className="m-5"/>
        <div className="w-full flex flex-col  bg-gray-50">
          <Label className="">Resumo da Equipe</Label>
                {
                  EQUIPES_DE_TRABALHO.map((equipe, i) =>(
                      <Collapsible>
                        <CollapsibleTrigger className={`group flex w-full border-b-1 border-b-gray-600 items-center justify-between 
                                                        ${(i % 2 === 0) ? " bg-slate-400" : " bg-slate-300" } py-1`}>
                          <h3 className="flex items-center gap-2 text-xs pl-2 text-gray-900 ">
                              {equipe} - 0
                          </h3>
                          <ChevronDown className="h-6 w-6 group-data-[state=open]:rotate-180 transition-transform text-gray-900" />
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                           <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead className="">uid</TableHead>
                                  <TableHead>Nome</TableHead>
                                  <TableHead>Perfil</TableHead>
                                  <TableHead >Histórico</TableHead>
                                  <TableHead ></TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                    <TableRow>
                                      <TableCell className="">1</TableCell>
                                      <TableCell>Fabiano Sodate</TableCell>
                                      <TableCell>
                                        <Sheet>
                                            <SheetTrigger asChild>
                                              <Avatar className="cursor-pointer">
                                                <AvatarImage src="https://github.com/shadcn.png" className="" />
                                                <AvatarFallback>Pefil</AvatarFallback>
                                            </Avatar>
                                            </SheetTrigger>
                                            <SheetContent className="overflow-auto min-w-2/3 w-2/3 sm:w-[350px] md:w-[450px] lg:w-[600px] flex flex-col">
                                              <ScrollArea className="flex-1 py-4 ">
                                                <TelaPerfil />
                                              </ScrollArea>
                                            </SheetContent>
                                          </Sheet>
                                      </TableCell>
                                      <TableCell className="relative" >
                                         <EditarHistorico uid="0"/>
                                      </TableCell>
                                      <TableCell >
                                          <Trash2 size={24} className="text-red-950" />
                                      </TableCell>
                                    </TableRow>
                                    <TableRow>
                                      <TableCell className="">1</TableCell>
                                      <TableCell>Fabiano Sodate</TableCell>
                                      <TableCell>
                                        <Sheet>
                                            <SheetTrigger asChild>
                                              <Avatar className="cursor-pointer">
                                                <AvatarImage src="https://github.com/shadcn.png" />
                                                <AvatarFallback>Pefil</AvatarFallback>
                                            </Avatar>
                                            </SheetTrigger>
                                            <SheetContent className="overflow-auto min-w-2/3 w-2/3 sm:w-[350px] md:w-[450px] lg:w-[600px] flex flex-col">
                                              <ScrollArea className="flex-1 py-4 ">
                                                <TelaPerfil />
                                              </ScrollArea>
                                            </SheetContent>
                                          </Sheet>
                                      </TableCell>
                                      <TableCell className="relative" >
                                         <EditarHistorico uid="0"/>
                                      </TableCell>
                                      <TableCell >
                                          <Trash2 size={24} className="text-red-950" />
                                      </TableCell>
                                    </TableRow>
                              </TableBody>
                            </Table>
                        </CollapsibleContent>
                      </Collapsible>
                  ))
                }
                
            </div>
        
        
          
      </div>
    </Layout> 
  )
}
