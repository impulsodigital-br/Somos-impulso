import { getAllArticles, getAllTools, getAllCategories, getCategoryBySlug } from "@/lib/content";

export function buildSearchIndex() {
  const articles = getAllArticles().map((a) => ({
    type: "Artigo",
    title: a.title,
    excerpt: a.excerpt,
    categoryName: getCategoryBySlug(a.category)?.name || "",
    tags: [],
    url: `/artigos/${a.slug}`,
  }));

  const tools = getAllTools().map((t) => ({
    type: "Ferramenta",
    title: t.name,
    excerpt: t.description,
    categoryName: t.category,
    tags: t.tags || [],
    url: `/ferramentas#${t.slug}`,
  }));

  const categories = getAllCategories().map((c) => ({
    type: "Categoria",
    title: c.name,
    excerpt: c.description,
    categoryName: c.name,
    tags: [],
    url: `/categoria/${c.slug}`,
  }));

  return [...articles, ...tools, ...categories];
}
