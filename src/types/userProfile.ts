// src/types/userProfile.ts

// Definindo tipos para campos específicos, se necessário
type TShirtSize = 'PP' | 'P' | 'M' | 'G' | 'GG' | 'XGG' | 'EG' | 'XXGG' | '';
type CivilStatus = 'Solteiro(a)' | 'Casado(a)' | 'Divorciado(a)' | 'Viúvo(a)' | 'Separado(a)' | '';

export interface UserProfile {
  // Informações Básicas
  profileImageUrl: string | null; // URL da foto de perfil
  nome: string;
  telefone: string; // Ex: (XX) XXXXX-XXXX
  email: string;
  instagram: string;

  // Informações Pessoais
  peso: number | null; // Em kg
  altura: number | null; // Em cm
  tamanhoCamiseta: TShirtSize;
  profissao: string;
  dtNascimento: string | null; // Data de nascimento como string ISO (YYYY-MM-DD)
  estadoCivil: CivilStatus;

  // Endereço
  cep: string;
  rua: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  estado: string; // Ex: SP, RJ

  // Paróquia e Sacramentos
  paroquiaParticipa: string;
  batismo: boolean | undefined;
  eucaristia: boolean | undefined;
  crisma: boolean | undefined;
  matrimonio: boolean | undefined; // Sacramental

  // Informações de Emergência
  possuiAlergia: boolean | undefined;
  alergiasDetalhes: string | null; // Se possuiAlergia for true
  possuiDoenca: boolean | undefined;
  doencasDetalhes: string | null; // Se possuiDoenca for true
  fazTratamento: boolean | undefined;
  tratamentosDetalhes: string | null; // Se fazTratamento for true
  usoMedicamentoControlado: boolean | undefined;
  medicamentosDetalhes: string | null; // Se usoMedicamentoControlado for true
  possuiPlanoSaude: boolean | undefined;
  planoSaudeNome: string | null; // Se possuiPlanoSaude for true

  // Contato de Emergência
  contatoEmergenciaNome: string;
  contatoEmergenciaTelefone: string;
}

// Valores padrão para um perfil vazio
export const initialUserProfile: UserProfile = {
  profileImageUrl: null,
  nome: '',
  telefone: '',
  email: '',
  instagram: '',

  peso: null,
  altura: null,
  tamanhoCamiseta: '',
  profissao: '',
  dtNascimento: null,
  estadoCivil: '',

  cep: '',
  rua: '',
  numero: '',
  complemento: '',
  bairro: '',
  cidade: '',
  estado: '',

  paroquiaParticipa: '',
  batismo: undefined,
  eucaristia: undefined,
  crisma: undefined,
  matrimonio: undefined,

  possuiAlergia: undefined,
  alergiasDetalhes: null,
  possuiDoenca: undefined,
  doencasDetalhes: null,
  fazTratamento: undefined,
  tratamentosDetalhes: null,
  usoMedicamentoControlado: undefined,
  medicamentosDetalhes: null,
  possuiPlanoSaude: undefined,
  planoSaudeNome: null,

  contatoEmergenciaNome: '',
  contatoEmergenciaTelefone: '',
};
