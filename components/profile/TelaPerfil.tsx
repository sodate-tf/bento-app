import { initialUserProfile, UserProfile } from "@/src/types/userProfile";
import Image from "next/image";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import { Input } from "../ui/input";
import BarraDeProgresso from "../BarraDeProgresso";
import InformacoesBasicas from "./sessao/InformacoesBasicas";
import InformacoesPessoais from "./sessao/InformacoesPessoais";
import Endereco from "./sessao/Endereco";
import ParoquiaSacramentos from "./sessao/ParoquiaSacramentos";
import InformacoesEmergencia from "./sessao/InformacoesEmergencia";
import InformacoesContatoEmergencia from "./sessao/InformacoesContatoEmergencia";
import { Button } from "../ui/button";


const calculateCompletionPercentage = (profile: UserProfile): number => {
  let filledFields = 0;
  let totalFields = 0;

  // Campos básicos (geralmente todos obrigatórios)
  totalFields += 4; // nome, telefone, email, instagram
  if (profile.nome) filledFields++;
  if (profile.telefone) filledFields++;
  if (profile.email) filledFields++;
  if (profile.instagram) filledFields++;
  
  // Informações Pessoais
  totalFields += 4; // peso, altura, tamanhoCamiseta, profissao
  if (profile.peso !== null) filledFields++;
  if (profile.altura !== null) filledFields++;
  if (profile.tamanhoCamiseta) filledFields++;
  if (profile.profissao) filledFields++;

   

  totalFields += 2; // dtNascimento, estadoCivil
  if (profile.dtNascimento) filledFields++;
  if (profile.estadoCivil) filledFields++;

  // Endereço
  totalFields += 6; // cep, rua, numero, complemento, bairro, cidade, estado
  if (profile.cep) filledFields++;
  if (profile.rua) filledFields++;
  if (profile.numero) filledFields++;
  if (profile.complemento) filledFields++;
  if (profile.bairro) filledFields++;
  if (profile.cidade) filledFields++;
  if (profile.estado) filledFields++; // Adicionado para ser contado


  

  // Paróquia e Sacramentos
  totalFields += 1; // paroquiaParticipa
  if (profile.paroquiaParticipa) filledFields++;
  totalFields += 4; // batismo, eucaristia, crisma, matrimonio (contamos se são booleanos preenchidos)
  if (profile.batismo !== undefined) filledFields++; // Contamos se o boolean foi tocado
  if (profile.eucaristia !== undefined) filledFields++;
  if (profile.crisma !== undefined) filledFields++;
  if (profile.matrimonio !== undefined) filledFields++;


  

  // Informações de Emergência (campos condicionais)
  totalFields += 5; // possuiAlergia, possuiDoenca, fazTratamento, usoMedicamentoControlado, possuiPlanoSaude
  if (profile.possuiAlergia !== undefined) filledFields++;
  if (profile.possuiDoenca !== undefined) filledFields++;
  if (profile.fazTratamento !== undefined) filledFields++;
  if (profile.usoMedicamentoControlado !== undefined) filledFields++;
  if (profile.possuiPlanoSaude !== undefined) filledFields++;
  
  // Detalhes condicionais: só contam se a condição for verdadeira e o detalhe for preenchido
  if (profile.possuiAlergia && profile.alergiasDetalhes) filledFields++; else if (!profile.possuiAlergia) filledFields++; // Conta como preenchido se não tem alergia
  if (profile.possuiDoenca && profile.doencasDetalhes) filledFields++; else if (!profile.possuiDoenca) filledFields++;
  if (profile.fazTratamento && profile.tratamentosDetalhes) filledFields++; else if (!profile.fazTratamento) filledFields++;
  if (profile.usoMedicamentoControlado && profile.medicamentosDetalhes) filledFields++; else if (!profile.usoMedicamentoControlado) filledFields++;
  if (profile.possuiPlanoSaude && profile.planoSaudeNome) filledFields++; else if (!profile.possuiPlanoSaude) filledFields++;

  // Contato de Emergência
  totalFields += 2; // contatoEmergenciaNome, contatoEmergenciaTelefone
  if (profile.contatoEmergenciaNome) filledFields++;
  if (profile.contatoEmergenciaTelefone) filledFields++;

  

  // Prevenção de divisão por zero
  if (totalFields === 0) return 0;
  
  return (filledFields / totalFields) * 100;
};


 
export default function TelaPerfil(){
    const [userProfile, setUserProfile] = useState<UserProfile>(initialUserProfile);
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [profileImagePreviewUrl, setProfileImagePreviewUrl] = useState<string | null>(initialUserProfile.profileImageUrl);

  // Calcula a porcentagem de conclusão sempre que userProfile muda
  const completionPercentage = useCallback(
    () => calculateCompletionPercentage(userProfile),
    [userProfile]
  );

  // Handler genérico para atualização de campos do perfil
  const handleProfileChange = <K extends keyof UserProfile>(field: K, value: UserProfile[K]) => {
    setUserProfile(prevProfile => ({
      ...prevProfile,
      [field]: value,
    }));
  };

  // Handler para upload da imagem de perfil
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setProfileImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImagePreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
      // Aqui você idealmente faria o upload para um servidor (Firebase Storage, S3, etc.)
      // e depois atualizaria userProfile.profileImageUrl com a URL de CDN
      toast.success("Foto de perfil selecionada!", { description: "Lembre-se de salvar o perfil para upload definitivo." });
    }
  };

  // Handler para salvar o perfil (exemplo)
  const handleSaveProfile = () => {
    console.log("Perfil a ser salvo:", userProfile);
    console.log("Porcentagem de Conclusão:", completionPercentage());
    // Aqui você enviaria 'userProfile' para o seu backend ou Firestore
    toast.success("Perfil salvo com sucesso!", {
      description: `Sua conclusão está em ${Math.round(completionPercentage())}%`,
    });
  };
  
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-300 to-slate-300 p-4 md:p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-2xl overflow-hidden">
        
        {/* Cabeçalho do Perfil */}
        <div className="relative bg-gray-800 text-white p-6 md:p-8 flex flex-col md:flex-row items-center justify-between">
          

          {/* Área da Foto e Porcentagem */}
          <div className="flex  items-center gap-4">
            {/* Foto de Perfil */}
            <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white overflow-hidden shadow-lg">
              {profileImagePreviewUrl ? (
                <Image
                  src={profileImagePreviewUrl}
                  alt="Foto de Perfil"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full"
                />
              ) : (
                <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-600 text-sm">
                  Sem Foto
                </div>
              )}
              {/* Botão de upload de foto */}
              <label htmlFor="profile-image-upload" className="absolute bottom-7 left-1/2 -translate-x-1/2 p-2 bg-blue-500 rounded-full cursor-pointer hover:bg-blue-600 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A.997.997 0 0010.586 3H7.414A.997.997 0 006.707 3.293L5.586 4.414A1 1 0 014.879 5H4zm0 2h12v8H4V7zm5 3a3 3 0 100 6 3 3 0 000-6zm-4 3a4 4 0 118 0 4 4 0 01-8 0z" clipRule="evenodd" />
                </svg>
                <Input
                  id="profile-image-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </label>
            </div>

            {/* Porcentagem de Conclusão */}
            <BarraDeProgresso percentage={completionPercentage()} size={65} strokeWidth={8} progressColor="#ef4444" textColor="#f9fafb" circleColor="#6b7280" /> {/* red-500, gray-50, gray-500 */}
          </div>
        </div>

        {/* Formulário de Seções */}
        <div className="p-6 md:p-8 space-y-8">
          <InformacoesBasicas profile={userProfile} onProfileChange={handleProfileChange} />
          <InformacoesPessoais profile={userProfile} onProfileChange={handleProfileChange} />
          <Endereco profile={userProfile} onProfileChange={handleProfileChange} />
          <ParoquiaSacramentos profile={userProfile} onProfileChange={handleProfileChange} />
          <InformacoesEmergencia profile={userProfile} onProfileChange={handleProfileChange} />
          <InformacoesContatoEmergencia profile={userProfile} onProfileChange={handleProfileChange} />
        </div>

        {/* Botão Salvar */}
        <div className="p-6 md:p-8 border-t border-gray-200 flex justify-end">
          <Button onClick={handleSaveProfile} className="bg-cyan-950 hover:bg-cyan-700 rounded-none text-white px-8 py-3 text-lg font-semibold shadow-md transition-colors">
            Salvar Perfil
          </Button>
        </div>
      </div>
    </div>
    )
}