import Link from "next/link";
import { notFound } from "next/navigation";
import ArticleCard from "@/components/ArticleCard";
import JsonLd from "@/components/JsonLd";
import { getArticleBySlug, getAllArticles, getRelatedArticles, getCategoryBySlug } from "@/lib/content";
import { buildMetadata, articleJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { SITE } from "@/lib/site";

export async function generateStaticParams() {
  const articles = await getAllArticles();
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }) {
  const article = await getArticleBySlug(params.slug);
  if (!article) return buildMetadata({ path: `/artigos/${params.slug}` });
  return buildMetadata({
    title: article.title,
    description: article.excerpt,
    path: `/artigos/${article.slug}`,
  });
}

function formatDate(dateStr) {
  return new Date(dateStr + "T00:00:00").toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function renderBlock(block, i) {
  if (block.type === "h2") return <h2 key={i}>{block.text}</h2>;
  if (block.type === "p") return <p key={i}>{block.text}</p>;
  if (block.type === "ul")
    return (
      <ul key={i}>
        {block.items.map((item, j) => (
          <li key={j}>{item}</li>
        ))}
      </ul>
    );
  return null;
}

export default async function ArticlePage({ params }) {
  const article = await getArticleBySlug(params.slug);
  if (!article) notFound();

  const category = await getCategoryBySlug(article.category);
  const related = await getRelatedArticles(article);
  const shareUrl = `${SITE.url}/artigos/${article.slug}`;

  return (
    <>
      <JsonLd data={articleJsonLd(article)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Início", path: "/" },
          { name: "Artigos", path: "/artigos" },
          { name: article.title, path: `/artigos/${article.slug}` },
        ])}
      />

      <div className="article-header">
        <div className="breadcrumb">
          <Link href="/">Início</Link> / <Link href="/artigos">Artigos</Link>
          {category && (
            <>
              {" "}/ <Link href={`/categoria/${category.slug}`}>{category.name}</Link>
            </>
          )}
        </div>
        <h1>{article.title}</h1>
        <div className="article-meta">
          <span>{article.author}</span>
          <span>&middot;</span>
          <span>Publicado em {formatDate(article.date)}</span>
          {article.updatedAt && article.updatedAt !== article.date && (
            <>
              <span>&middot;</span>
              <span>Atualizado em {formatDate(article.updatedAt)}</span>
            </>
          )}
          <span>&middot;</span>
          <span>{article.readTime} min de leitura</span>
        </div>
      </div>

      <div className={`article-cover ${article.coverGradient || "thumb-1"}`} aria-hidden="true" />

      <article className="article-body">
        {article.body.map(renderBlock)}
      </article>

      <div className="article-nav">
        <a
          href={`https://api.whatsapp.com/send?text=${encodeURIComponent(article.title + " " + shareUrl)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-secondary"
        >
          Compartilhar
        </a>
        <Link href="/artigos" className="btn btn-secondary">&larr; Voltar para artigos</Link>
      </div>

      {related.length > 0 && (
        <div className="related-wrap">
          <div className="section">
            <div className="section-head">
              <h2>Artigos relacionados</h2>
            </div>
            <div className="grid-3">
              {related.map((a) => (
                <ArticleCard key={a.slug} article={a} />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
