// Camada única de acesso a conteúdo.
// Hoje le dos arquivos JSON em /content. Quando o Sanity estiver configurado
// (variaveis de ambiente presentes), estas mesmas funcoes podem ser trocadas
// pelas equivalentes em lib/sanity.js sem alterar nenhuma pagina do site.

import articles from "@/content/articles.json";
import categories from "@/content/categories.json";
import tools from "@/content/tools.json";

export function getAllArticles() {
  return [...articles].sort((a, b) => new Date(b.date) - new Date(a.date));
}

export function getArticleBySlug(slug) {
  return articles.find((a) => a.slug === slug) || null;
}

export function getArticlesByCategory(categorySlug) {
  return getAllArticles().filter((a) => a.category === categorySlug);
}

export function getRelatedArticles(article) {
  if (!article) return [];
  const bySlug = (article.relatedSlugs || [])
    .map((s) => getArticleBySlug(s))
    .filter(Boolean);
  if (bySlug.length > 0) return bySlug;
  return getArticlesByCategory(article.category)
    .filter((a) => a.slug !== article.slug)
    .slice(0, 3);
}

export function getAllCategories() {
  return categories;
}

export function getCategoryBySlug(slug) {
  return categories.find((c) => c.slug === slug) || null;
}

export function getCategoryArticleCount(slug) {
  return getArticlesByCategory(slug).length;
}

export function getAllTools() {
  return tools;
}

export function getToolBySlug(slug) {
  return tools.find((t) => t.slug === slug) || null;
}

export function getFeaturedArticles(count = 3) {
  return getAllArticles().slice(0, count);
}

export function getRecentArticles(count = 6, excludeSlugs = []) {
  return getAllArticles()
    .filter((a) => !excludeSlugs.includes(a.slug))
    .slice(0, count);
}
