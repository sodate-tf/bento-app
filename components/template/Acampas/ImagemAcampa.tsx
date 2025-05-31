import Image from "next/image"

interface ImagemAcampaProps{
    src?: string
    width?: number
    height?: number
}
export default function ImagemAcampa(props: ImagemAcampaProps){
    return(
        <div className="absolute right-0 top-0 border-dotted w-45 h-82 bg-gray-950">
            <Image src={props.src || ''} width={props.width} height={props.height} alt="Imagem Acampa">

            </Image>
        </div>
    )
}