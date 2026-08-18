import { getAllArticles, getAllCategories } from "@/lib/content";
import { SITE } from "@/lib/site";

export default function sitemap() {
  const staticRoutes = [
    "", "artigos", "ferramentas", "sobre", "contato",
    "politica-de-privacidade", "termos-de-uso", "politica-de-cookies",
  ].map((path) => ({
    url: `${SITE.url}/${path}`,
    lastModified: new Date(),
  }));

  const articleRoutes = getAllArticles().map((a) => ({
    url: `${SITE.url}/artigos/${a.slug}`,
    lastModified: a.updatedAt || a.date,
  }));

  const categoryRoutes = getAllCategories().map((c) => ({
    url: `${SITE.url}/categoria/${c.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...articleRoutes, ...categoryRoutes];
}
