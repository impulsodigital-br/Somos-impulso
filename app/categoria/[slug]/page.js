import { notFound } from "next/navigation";
import ArticleCard from "@/components/ArticleCard";
import { getCategoryBySlug, getArticlesByCategory, getAllCategories } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return getAllCategories().map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }) {
  const category = getCategoryBySlug(params.slug);
  if (!category) return buildMetadata({ path: `/categoria/${params.slug}` });
  return buildMetadata({
    title: category.name,
    description: category.description,
    path: `/categoria/${category.slug}`,
  });
}

export default function CategoryPage({ params }) {
  const category = getCategoryBySlug(params.slug);
  if (!category) notFound();

  const articles = getArticlesByCategory(category.slug);

  return (
    <>
      <div className="page-header">
        <h1>{category.name}</h1>
        <p>{category.description}</p>
      </div>
      <div className="section" style={{ paddingTop: 0 }}>
        {articles.length === 0 ? (
          <p style={{ color: "var(--text-secondary)" }}>
            Ainda não há artigos publicados nesta categoria. Volte em breve.
          </p>
        ) : (
          <div className="grid-3">
            {articles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
