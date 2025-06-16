"use client"; // Necessário para componentes interativos no Next.js App Router

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css'; // Estilos padrão do Quill
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from 'sonner';
import { Switch } from "@/components/ui/switch"; // Para o campo "Exibir ou não"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"; // Para o DatePicker
import { CalendarIcon, Edit, Trash2 } from 'lucide-react'; // Ícones para o calendário, editar e excluir
import { format } from "date-fns";
import { ptBR } from "date-fns/locale"; // Para formatar datas em português
import { Calendar } from "@/components/ui/calendar"; // Seu Calendar Shadcn UI (com dropdowns e pt-BR)
import { cn, exibirMsgAlerta } from "@/lib/utils"; // Utilitário para combinar classes CSS
import { IconeCheck, IconeX } from '@/components/icons';

// Importação dinâmica do ReactQuill para garantir que ele só seja carregado no lado do cliente.
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

/**
 * Interface para os dados de um post do blog.
 */
interface BlogPostData {
  id: string; // ID único para o post
  title: string;
  coverImageFile: File | null;
  coverImagePreviewUrl: string | null; // Adicionado para persistir a URL de preview ao editar
  content: string;
  displayPost: boolean; // Novo campo: exibir ou não
  scheduledDate: Date | undefined; // Novo campo: agendamento de postagem
  dBentoNumber: number | ''; // Novo campo: D+ Bento (pode ser string vazia para input)
}

const BlogManagement: React.FC = () => {
  // Estados para o formulário
  const [title, setTitle] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [coverImagePreviewUrl, setCoverImagePreviewUrl] = useState<string | null>(null);
  const [content, setContent] = useState<string>('');
  const [displayPost, setDisplayPost] = useState<boolean>(true); // Padrão: true
  const [scheduledDate, setScheduledDate] = useState<Date | undefined>(undefined);
  const [dBentoNumber, setDBentoNumber] = useState<number | ''>(''); // Usar '' para permitir input vazio
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [editingPostId, setEditingPostId] = useState<string | null>(null); // ID do post sendo editado

  // Estado para a lista de todos os posts
  const [posts, setPosts] = useState<BlogPostData[]>([]);

  /**
   * Módulos de configuração para o ReactQuill.
   */
  const modules = {
    toolbar: [
      [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
      [{ 'size': [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
      ['link', 'image', 'video'],
      ['clean']
    ],
  };

  /**
   * Formatos permitidos para o ReactQuill.
   */
  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video'
  ];

  /**
   * Lida com a seleção de arquivo para a imagem de capa.
   * Cria uma URL de objeto para visualização da imagem.
   */
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setCoverImagePreviewUrl(URL.createObjectURL(file));
    } else {
      setSelectedFile(null);
      setCoverImagePreviewUrl(null);
    }
  };

  /**
   * Limpa o formulário para um novo cadastro.
   */
  const clearForm = () => {
    setTitle('');
    setSelectedFile(null);
    setCoverImagePreviewUrl(null);
    setContent('');
    setDisplayPost(true);
    setScheduledDate(undefined);
    setDBentoNumber('');
    setEditingPostId(null);
  };

  /**
   * Lida com o envio do formulário (criação ou edição).
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!title || !content) {
      exibirMsgAlerta("Título e Conteúdo são obrigatórios.", 'red-950', IconeX)
      setIsSubmitting(false);
      return;
    }

    // Validação para D+ Bento
    if (dBentoNumber !== '' && (isNaN(Number(dBentoNumber)) || Number(dBentoNumber) <= 0)) {
        exibirMsgAlerta("O campo 'D+ Bento' deve ser um número positivo.", 'red-950', IconeX)
        setIsSubmitting(false);
        return;
    }

    const newOrUpdatedPost: BlogPostData = {
      id: editingPostId || crypto.randomUUID(), // Gera um novo ID ou usa o existente
      title,
      coverImageFile: selectedFile,
      coverImagePreviewUrl, // Preserva a URL de preview
      content,
      displayPost,
      scheduledDate,
      dBentoNumber: dBentoNumber === '' ? '' : Number(dBentoNumber), // Converte para número ou mantém ''
    };

    if (editingPostId) {
      // Edição de post existente
      setPosts(prevPosts =>
        prevPosts.map(post =>
          post.id === editingPostId ? newOrUpdatedPost : post
        )
      );
       exibirMsgAlerta("Post do blog atualizado com sucesso!", 'cyan-950', IconeCheck)
    } else {
      // Criação de novo post
      setPosts(prevPosts => [...prevPosts, newOrUpdatedPost]);
      exibirMsgAlerta("Post do blog criado com sucesso!", 'cyan-950', IconeCheck)
    }

    // Simulação de envio para uma API (remova em produção para integração real)
    setTimeout(() => {
      setIsSubmitting(false);
      clearForm(); // Limpa o formulário após o envio/edição
    }, 1500);
  };

  /**
   * Carrega os dados de um post para edição no formulário.
   * @param post - O objeto BlogPostData a ser editado.
   */
  const loadPostForEdit = (post: BlogPostData) => {
    setTitle(post.title);
    setSelectedFile(post.coverImageFile);
    setCoverImagePreviewUrl(post.coverImagePreviewUrl); // Carrega a URL de preview
    setContent(post.content);
    setDisplayPost(post.displayPost);
    setScheduledDate(post.scheduledDate);
    setDBentoNumber(post.dBentoNumber);
    setEditingPostId(post.id);
    toast.info(`Editando post: "${post.title}"`);
    // Rolagem para o topo do formulário para facilitar a edição
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /**
   * Exclui um post da lista.
   * @param id - O ID do post a ser excluído.
   * @param title - O título do post para feedback ao usuário.
   */
  const deletePost = (id: string, title: string) => {
    if (window.confirm(`Tem certeza que deseja excluir o post "${title}"?`)) {
      setPosts(prevPosts => prevPosts.filter(post => post.id !== id));
      toast.success(`Post "${title}" excluído com sucesso!`);
      if (editingPostId === id) {
        clearForm(); // Se estiver editando o post excluído, limpa o formulário
      }
    }
  };

  return (
    <div className="container mx-auto p-6 md:p-8 bg-gray-100 rounded-lg shadow-lg my-8 max-w-5xl">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        {editingPostId ? 'Editar Post do Blog' : 'Criar Novo Post do Blog'}
      </h2>

      {/* Formulário de Cadastro/Edição */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Campo Título */}
        <div>
          <Label htmlFor="title" className="block text-gray-700 text-sm font-semibold mb-2">
            Título do Post <span className="text-red-500">*</span>
          </Label>
          <Input
            id="title"
            type="text"
            placeholder="Digite o título do seu post"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Campo Upload de Imagem de Capa */}
        <div>
          <Label htmlFor="coverImageUpload" className="block text-gray-700 text-sm font-semibold mb-2">
            Upload da Imagem de Capa
          </Label>
          <Input
            id="coverImageUpload"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          {coverImagePreviewUrl && (
            <div className="mt-4 flex justify-center">
              <img src={coverImagePreviewUrl} alt="Preview da Capa" className="max-w-full h-auto max-h-48 object-contain rounded-md shadow-md" />
            </div>
          )}
        </div>

        {/* Editor de Rich Text (ReactQuill) */}
        <div>
          <Label htmlFor="content" className="block text-gray-700 text-sm font-semibold mb-2">
            Conteúdo do Post <span className="text-red-500">*</span>
          </Label>
          <div className="bg-white border border-gray-300 rounded-md overflow-hidden">
            <ReactQuill
              theme="snow"
              value={content}
              onChange={setContent}
              modules={modules}
              formats={formats}
              placeholder="Comece a escrever seu post aqui..."
              className="min-h-[250px]"
            />
          </div>
        </div>

        {/* Opções Adicionais: Exibir, Agendamento, D+ Bento */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Campo Exibir ou Não */}
          <div className="flex items-center space-x-2">
            <Switch
              id="display-post"
              checked={displayPost}
              onCheckedChange={setDisplayPost}
            />
            <Label htmlFor="display-post">Exibir Post</Label>
          </div>

          {/* Campo Agendamento de Postagem */}
          <div>
            <Label htmlFor="scheduled-date" className="block text-gray-700 text-sm font-semibold mb-2">
              Agendamento de Postagem
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !scheduledDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {scheduledDate ? format(scheduledDate, "PPP", { locale: ptBR }) : <span>Selecione uma data</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-white" align="start">
                <Calendar
                  mode="single"
                  selected={scheduledDate}
                  onSelect={setScheduledDate}
                  initialFocus
                  locale={ptBR}
                  captionLayout="dropdown"
                  fromYear={new Date().getFullYear() - 5}
                  toYear={new Date().getFullYear() + 5}
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Campo D+ Bento */}
          <div>
            <Label htmlFor="dbento-number" className="block text-gray-700 text-sm font-semibold mb-2">
              D+ Bento
            </Label>
            <Input
              id="dbento-number"
              type="number"
              placeholder="Ex: 5"
              value={dBentoNumber}
              onChange={(e) => setDBentoNumber(e.target.value === '' ? '' : Number(e.target.value))}
              min="0" // Garante que o número seja não-negativo
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Botões de Ação */}
        <div className="flex space-x-4 mt-6">
          <Button
            type="submit"
            className="flex-grow bg-cyan-950 hover:bg-cyan-800 text-white py-3 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Salvando...' : (editingPostId ? 'Atualizar Post' : 'Publicar Post')}
          </Button>
          {editingPostId && (
            <Button
              type="button"
              variant="outline"
              onClick={clearForm}
              className="flex-grow bg-gray-300 hover:bg-gray-400 text-gray-800 py-3 rounded-md font-semibold"
            >
              Cancelar Edição
            </Button>
          )}
        </div>
      </form>

      <div className="my-8 border-t border-gray-300 pt-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Posts Cadastrados</h3>

        {posts.length === 0 ? (
          <p className="text-center text-gray-600">Nenhum post cadastrado ainda.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-sm">
              <thead className="bg-gray-200">
                <tr>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Título</th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Exibir</th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Agendamento</th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">D+ Bento</th>
                  <th className="py-3 px-4 text-center text-sm font-semibold text-gray-700">Ações</th>
                </tr>
              </thead>
              <tbody>
                {posts.map(post => (
                  <tr key={post.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm text-gray-800 font-medium">{post.title}</td>
                    <td className="py-3 px-4 text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${post.displayPost ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {post.displayPost ? 'Sim' : 'Não'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-700">
                      {post.scheduledDate ? format(post.scheduledDate, "dd/MM/yyyy", { locale: ptBR }) : 'Não agendado'}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-700">{post.dBentoNumber || '-'}</td>
                    <td className="py-3 px-4 text-center">
                      <div className="flex justify-center space-x-2">
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => loadPostForEdit(post)}
                          className="text-blue-600 hover:text-blue-800"
                          title="Editar Post"
                        >
                          <Edit className="h-5 w-5" />
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => deletePost(post.id, post.title)}
                          className="text-red-600 hover:text-red-800"
                          title="Excluir Post"
                        >
                          <Trash2 className="h-5 w-5" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogManagement;
