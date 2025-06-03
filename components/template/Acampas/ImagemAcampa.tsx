import Image from "next/image"
import minhaLogo from '@/public/logo-bento-app.png'

interface ImagemAcampaProps{
    src?: string
    width?: number
    height?: number
}
export default function ImagemAcampa(props: ImagemAcampaProps){
    return(
        <div className="hidden sm:block absolute right-0 top-0 border-dotted  bg-gray-950">
            <Image src={props.src || minhaLogo} width={props.width || 180} height={props.height || 328} alt="Imagem Acampa">

            </Image>
        </div>
    )
}