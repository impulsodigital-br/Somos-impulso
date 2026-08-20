// Camada única de acesso a conteúdo.
// Se as variáveis do Sanity estiverem configuradas (NEXT_PUBLIC_SANITY_PROJECT_ID),
// busca de lá. Caso contrário, usa os arquivos locais em /content como fallback,
// para o site nunca ficar sem conteúdo enquanto o Sanity não está pronto.

import localArticles from "@/content/articles.json";
import localCategories from "@/content/categories.json";
import localTools from "@/content/tools.json";
import {
  sanityEnabled,
  sanityGetAllArticles,
  sanityGetAllCategories,
  sanityGetAllTools,
} from "@/lib/sanity";

let cache = null;

async function loadAll() {
  if (cache) return cache;

  if (sanityEnabled) {
    try {
      const [articles, categories, tools] = await Promise.all([
        sanityGetAllArticles(),
        sanityGetAllCategories(),
        sanityGetAllTools(),
      ]);
      if (articles.length > 0) {
        cache = { articles, categories: categories.length ? categories : localCategories, tools: tools.length ? tools : localTools };
        return cache;
      }
    } catch (err) {
      console.error("Erro ao buscar do Sanity, usando conteúdo local:", err.message);
    }
  }

  cache = { articles: localArticles, categories: localCategories, tools: localTools };
  return cache;
}

export async function getAllArticles() {
  const { articles } = await loadAll();
  return [...articles].sort((a, b) => new Date(b.date) - new Date(a.date));
}

export async function getArticleBySlug(slug) {
  const articles = await getAllArticles();
  return articles.find((a) => a.slug === slug) || null;
}

export async function getArticlesByCategory(categorySlug) {
  const articles = await getAllArticles();
  return articles.filter((a) => a.category === categorySlug);
}

export async function getRelatedArticles(article) {
  if (!article) return [];
  const articles = await getAllArticles();
  const bySlug = (article.relatedSlugs || [])
    .map((s) => articles.find((a) => a.slug === s))
    .filter(Boolean);
  if (bySlug.length > 0) return bySlug;
  return articles.filter((a) => a.category === article.category && a.slug !== article.slug).slice(0, 3);
}

export async function getAllCategories() {
  const { categories } = await loadAll();
  return categories;
}

export async function getCategoryBySlug(slug) {
  const categories = await getAllCategories();
  return categories.find((c) => c.slug === slug) || null;
}

export async function getCategoryArticleCount(slug) {
  const articles = await getArticlesByCategory(slug);
  return articles.length;
}

export async function getAllTools() {
  const { tools } = await loadAll();
  return tools;
}

export async function getToolBySlug(slug) {
  const tools = await getAllTools();
  return tools.find((t) => t.slug === slug) || null;
}

export async function getFeaturedArticles(count = 3) {
  const articles = await getAllArticles();
  return articles.slice(0, count);
}

export async function getRecentArticles(count = 6, excludeSlugs = []) {
  const articles = await getAllArticles();
  return articles.filter((a) => !excludeSlugs.includes(a.slug)).slice(0, count);
}
