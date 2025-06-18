import TelaPerfil from "@/components/profile/TelaPerfil";
import LayoutCobranca from "@/components/template/Cobranca/LayoutCobranca";
import Layout from "@/components/template/Layout";
export default function Perfil() { 
  return (
    <Layout titulo="Perfil Usuário" subTitulo="Administre suas informações de usuário">
        <div className="relative flex">
            <LayoutCobranca LaytoutIconeCobranca="cursor-pointer w-12 h-12 absolute top-12 right-7 z-50" corIcone="text-white"/>
            <TelaPerfil />
        </div>
    </Layout> 
  )
}
