import TelaPerfil from "@/components/profile/TelaPerfil";
import LayoutCobranca from "@/components/template/Cobranca/LayoutCobranca";
import Layout from "@/components/template/Layout";
import BlogPostForm from "./BlogPostForm";
export default function PostsApp() { 
  return (
    <Layout titulo="Posts do App" subTitulo="Administre os Posts do APP">
        <div className="relative flex">
            <BlogPostForm />
        </div>
    </Layout> 
  )
}