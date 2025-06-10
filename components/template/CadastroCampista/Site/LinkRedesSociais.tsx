import Image from "next/image";
import IconeInstagram from "@/public/images/instagram.svg"
import IconeSpotify from "@/public/images/spotify.svg"
import IconeYoutube from "@/public/images/youtube.svg"

interface LinkRedesSociaisProps {
  iconSize?: number;
  iconColor?: string;
  className?: string;
}
export default function LinkRedesSociais(props: LinkRedesSociaisProps){
    return(
         <div className={`flex bg-white p-5 space-x-6 ${props.className}`}>
        <a href="https://www.instagram.com/acampabento" target="_blank" className="" rel="noopener noreferrer" aria-label="Instagram">
            <Image alt='Instagram Acampabento' color='#FFF' src={IconeInstagram}></Image>
        </a>
        <a href="https://open.spotify.com/playlist/22CspaLWJExQnb1HLjMW1d?si=TjpCbe_0RHeFHMG4zAL2_A" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <Image alt='Spotify Espiritualidades do Acampabento' className='' src={IconeSpotify}></Image>
        </a>
        <a href="https://www.youtube.com/@CanaldoBento" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)">
            <Image alt='Youtube Canal do Bento' className='' src={IconeYoutube}></Image>
        </a>
        {/* Exemplo de ícone de compartilhar do Lucide */}
        {/* <button className="p-1 rounded-full text-white hover:bg-gray-700 transition-colors" aria-label="Compartilhar">
            <Share2 size={iconSize} color={iconColor} />
        </button> */}
        </div>
    )
}