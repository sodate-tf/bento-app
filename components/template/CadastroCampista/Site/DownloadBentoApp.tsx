import IconeGooglePlay from "@/public/images/googleplay.svg"
import IconeAppStore from "@/public/images/appstore-branco.svg"
import Image from "next/image";

interface DownloadBentoAppProps {
  appStoreUrl?: string;
  googlePlayUrl?: string;
  className?: string;
}
export default function DownloadBentoApp(props: DownloadBentoAppProps){
    return(
        <div className={`flex flex-col sm:flex-row gap-4 ${props.className}`}>
        <a href={"http://google.com.br"} target="_blank" rel="noopener noreferrer" aria-label="Download no Google Play"
            className="flex items-center bg-cyan-800 text-white px-4 py-2 rounded-lg shadow-md hover:bg-cyan-700 transition-colors duration-300">
            <Image alt='Baixe o Bento App para Android' className='' src={IconeGooglePlay}></Image>
            <span className="ml-2 text-sm font-semibold">Google Play</span>
        </a>
        <a href={"www.itunes.com"} target="_blank" rel="noopener noreferrer" aria-label="Download na App Store"
            className="flex items-center bg-cyan-800 text-white px-4 py-2 rounded-lg shadow-md hover:bg-cyan-700 transition-colors duration-300">
            <Image alt='Baixe o Bento APP para IOS' className='' src={IconeAppStore}></Image>
            <span className="ml-2 text-sm font-semibold">App Store</span>
        </a>
        </div>
    )
}