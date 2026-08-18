import Link from "next/link";
import { getAllCategories, getCategoryArticleCount } from "@/lib/content";

export default function CategoryGrid() {
  const categories = getAllCategories();
  return (
    <div className="cat-grid">
      {categories.map((cat) => (
        <Link href={`/categoria/${cat.slug}`} key={cat.slug} className="cat-card">
          <div className="cat-dot" aria-hidden="true" />
          <h4>{cat.name}</h4>
          <span>{getCategoryArticleCount(cat.slug)} artigo(s)</span>
        </Link>
      ))}
    </div>
  );
}
