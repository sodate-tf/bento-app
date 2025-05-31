import Image from "next/image";
import minhaLogo from '@/public/logo-bento-app.png'
interface logoPops{
    largura?: number
    altura?: number
}
export default function Logo(props: logoPops){
    return(
        <div>
            <div className={``}>
               <Image
                    src={minhaLogo} // Para imagens importadas, o src é a referência do import
                    alt="Bento App Logo"
                    width={props.largura} // Largura original da imagem em pixels
                    height={props.altura} // Altura original da imagem em pixels
                    // Opcional: Se você quer que a imagem se ajuste ao contêiner
                    // layout="responsive" // OBS: 'layout' foi substituído por 'fill' ou 'sizes' em versões mais recentes do Next.js
                    // objectFit="cover"   // Se estiver usando 'fill', como a imagem deve se ajustar
                    className="" // Você pode adicionar classes Tailwind aqui
                />
            </div>    
        </div>
    )
}