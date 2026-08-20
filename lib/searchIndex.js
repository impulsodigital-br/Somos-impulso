import { getAllArticles, getAllTools, getAllCategories, getCategoryBySlug } from "@/lib/content";

export async function buildSearchIndex() {
  const [allArticles, allTools, allCategories] = await Promise.all([
    getAllArticles(),
    getAllTools(),
    getAllCategories(),
  ]);

  const articles = allArticles.map((a) => {
    const cat = allCategories.find((c) => c.slug === a.category);
    return {
    type: "Artigo",
      title: a.title,
      excerpt: a.excerpt,
      categoryName: cat?.name || "",
      tags: [],
      url: `/artigos/${a.slug}`,
    };
  });

  const tools = allTools.map((t) => ({
    type: "Ferramenta",
    title: t.name,
    excerpt: t.description,
    categoryName: t.category,
    tags: t.tags || [],
    url: `/ferramentas#${t.slug}`,
  }));

  const categories = allCategories.map((c) => ({
    type: "Categoria",
    title: c.name,
    excerpt: c.description,
    categoryName: c.name,
    tags: [],
    url: `/categoria/${c.slug}`,
  }));

  return [...articles, ...tools, ...categories];
}
