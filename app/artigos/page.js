import ArticleCard from "@/components/ArticleCard";
import { getAllArticles } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Artigos",
  description: "Todos os artigos do Somos Impulso sobre Inteligência Artificial, tecnologia, produtividade e negócios.",
  path: "/artigos",
});

export default async function ArtigosPage() {
  const articles = await getAllArticles();
  return (
    <>
      <div className="page-header">
        <h1>Artigos</h1>
        <p>Tudo o que publicamos, do mais recente ao mais antigo.</p>
      </div>
      <div className="section" style={{ paddingTop: 0 }}>
        <div className="grid-3">
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </div>
    </>
  );
}
