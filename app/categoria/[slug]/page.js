import { notFound } from "next/navigation";
import ArticleCard from "@/components/ArticleCard";
import { getCategoryBySlug, getArticlesByCategory, getAllCategories } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export async function generateStaticParams() {
  const categories = await getAllCategories();
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }) {
  const category = await getCategoryBySlug(params.slug);
  if (!category) return buildMetadata({ path: `/categoria/${params.slug}` });
  return buildMetadata({
    title: category.name,
    description: category.description,
    path: `/categoria/${category.slug}`,
  });
}

export default async function CategoryPage({ params }) {
  const category = await getCategoryBySlug(params.slug);
  if (!category) notFound();

  const articles = await getArticlesByCategory(category.slug);

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
