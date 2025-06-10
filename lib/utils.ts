import { IconeWarning } from "@/components/icons";
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