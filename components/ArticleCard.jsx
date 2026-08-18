import Link from "next/link";
import { getCategoryBySlug } from "@/lib/content";

function formatDate(dateStr) {
  return new Date(dateStr + "T00:00:00").toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function ArticleCard({ article }) {
  const category = getCategoryBySlug(article.category);
  return (
    <Link href={`/artigos/${article.slug}`} className="card">
      <div className={`card-thumb ${article.coverGradient || "thumb-1"}`} aria-hidden="true" />
      <div className="card-body">
        {category && <span className="badge">{category.name}</span>}
        <h3>{article.title}</h3>
        <p>{article.excerpt}</p>
        <div className="card-meta">
          <span>{formatDate(article.date)}</span>
          <span aria-hidden="true">&middot;</span>
          <span>{article.readTime} min de leitura</span>
        </div>
      </div>
    </Link>
  );
}
