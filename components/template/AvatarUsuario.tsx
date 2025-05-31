import useAuth from "@/src/data/hook/useAuth";
import Image from "next/image";
import Link from "next/link";
interface AvatarUsuarioProps{
   className?: string 
}
export default function AvatarUsuario(props: AvatarUsuarioProps){
    const {usuario} = useAuth()
    console.log(usuario?.imageUrl)
    return(
         <Link href="/perfil" className={`flex flex-col ${props.className}`}>
            <Image src={usuario?.imageUrl?.valueOf() ?? '/images/avatar.svg'} width={30} height={30} alt="Avatar do usuário" 
            className="h-10 w-10 rounded-full cursor-pointer"/>
         </Link>
    )
} 