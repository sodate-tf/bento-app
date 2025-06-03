export function gerarSlugUrl(texto: string): string {
  if (!texto || typeof texto !== 'string') {
    // Retorna uma string vazia ou lança um erro, dependendo do comportamento desejado
    // para entradas inválidas. Retornar vazia é mais comum para slugs.
    console.warn("Entrada inválida para gerarSlugUrl. Esperado uma string.");
    return '';
  }

  let slug = texto;

  // 1. Converter para minúsculas e remover espaços em branco no início/fim
  slug = slug.toLowerCase().trim();

  // 2. Substituir caracteres especiais (acentos, cedilha, etc.)
  // Esta é uma maneira robusta de lidar com a maioria dos caracteres latinos.
  slug = slug.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  // 3. Substituir caracteres não alfanuméricos (exceto hífens) e espaços por hífens
  // O regex [^a-z0-9 -] significa "qualquer coisa que NÃO seja a-z, 0-9, espaço ou hífen"
  slug = slug.replace(/[^a-z0-9 -]/g, ""); // Remove caracteres não permitidos
  slug = slug.replace(/\s+/g, '-');       // Substitui um ou mais espaços por um hífen

  // 4. Remover múltiplos hífens consecutivos
  slug = slug.replace(/-+/g, '-');

  // 5. Remover hífens do início e do fim da string
  slug = slug.replace(/^-+|-+$/g, '');

  return slug;
}