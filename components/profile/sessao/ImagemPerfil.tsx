import { IconeX } from "@/components/icons";
import ImagemUploader from "@/components/ImagemUploader";
import { exibirMsgAlerta } from "@/lib/utils";
import { PessoaApiData } from "@/src/service/pessoaService";

interface ImagemPerfilProps {
  profile: PessoaApiData;
  onProfileChange: (field: keyof PessoaApiData, value: any) => void;
}
export default function ImagemPerfil(props: ImagemPerfilProps){
     const handleImageUploaded = (url: string) => {
      
            props.profile.url_foto_perfil = url; // Define a URL no estado do componente pai
            props.onProfileChange('url_foto_perfil', url)
       
        // Aqui você pode fazer o que precisar com a URL:
        // - Salvar em um banco de dados
        // - Exibir em outro lugar da página
        // - Passar para outros componentes
    };

    // Handler para erro no upload da imagem
    const handleImageUploadError = (errorMessage: string) => {
        // Use sua função de alerta para notificar o usuário
        exibirMsgAlerta(`Erro ao enviar foto: ${errorMessage}`, 'bg-red-950', IconeX);
    };

    return(
          <div className="">
             <ImagemUploader onUploadSuccess={handleImageUploaded} initialPhotoUrl={props.profile?.url_foto_perfil} />
        </div>
    )
}