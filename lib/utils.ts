import { IconeCheck, IconeWarning } from "@/components/icons";
import { clsx, type ClassValue } from "clsx"
import { toast } from "sonner";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateWhatsAppLink(phoneNumber: string, message: string): string {
  // Remove qualquer caractere não numérico do número de telefone para garantir o formato correto.
  const cleanedPhoneNumber = phoneNumber.replace(/\D/g, '');

  // Codifica a mensagem para URL, substituindo espaços por %20 e outros caracteres especiais.
  const encodedMessage = encodeURIComponent(message);

  return `https://wa.me/${cleanedPhoneNumber}?text=${encodedMessage}`;
}

export async function pesquisarEndereco(cep: string) {
    const cepSemMascara = cep.replace(/\D/g, "");
    if (cepSemMascara.length === 8) {
      //toast.success('pesquisando cep')
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cepSemMascara}/json/`);
        const data = await response.json();
        if (data.erro) {
           toast.error("CEP não encontrado. ",{
              className: "bg-yellow-800 text-white shadow-lg p-10 flex",
                unstyled: true,
                invert: false,
                icon: IconeWarning
              });
        } else {
          //toast.success(`Endereço encontrado: ${data.logradouro}`)
          // Exemplo: setRua(data.logradouro); setCidade(data.localidade); etc.
          return ({
              logradouro: data.logradouro,
              numero: 0,
              bairro: data.bairro,
              localidade: data.localidade,
              uf: data.uf,
              complemento: data.complemento
            });
        }
      } catch (error) {
        toast.error(`CEP não encontrado. ${error}`,{
              className: "bg-red-900 text-white shadow-lg p-10 flex",
                unstyled: true,
                invert: false,
                icon: IconeWarning
              });
      }
      // Aqui você pode chamar sua API, ex:
      // const response = await fetch(`https://viacep.com.br/ws/${cepSemMascara}/json/`);
      // const data = await response.json();
      // console.log(data);
    } else {
       toast.error(`CEP incompleto`,{
              className: "bg-yellow-900 text-white shadow-lg p-10 flex",
                unstyled: true,
                invert: false,
                icon: IconeWarning
              });
    }
  };

  
 export function exibirMsgAlerta(msg: string, cor: string , icone: JSX.Element){
    let classe : string
    classe = `bg-${cor} text-white shadow-lg p-10 flex`
       
    toast(msg, {
        className: classe,
        unstyled: true,
        invert: false,
        icon: icone
       })
  }

  export async function copyToClipboard(text: string) {
  // A API Clipboard (navigator.clipboard) só está disponível em contextos seguros (HTTPS)
  // e geralmente requer interação do usuário (como um clique de botão) para ser ativada.
  if (!navigator.clipboard || !window.isSecureContext) {
    console.error('Erro: A API Clipboard não está disponível ou o ambiente não é seguro (requer HTTPS).');
    throw new Error('Cópia para área de transferência não suportada neste ambiente.');
  }

  try {
    // Tenta copiar o texto para a área de transferência
    await navigator.clipboard.writeText(text);
    console.log('Texto copiado com sucesso para a área de transferência!');
  } catch (err: any) {
    // Captura erros que podem ocorrer durante a cópia, por exemplo:
    // - Permissão negada pelo usuário.
    // - O navegador bloqueou a cópia por algum motivo.
    console.error('Falha ao copiar o texto para a área de transferência:', err);
    throw new Error(`Erro ao copiar: ${err.message}`);
  }
}
