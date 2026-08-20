import Link from "next/link";
import { getAllCategories, getCategoryArticleCount } from "@/lib/content";

export default async function CategoryGrid() {
  const categories = await getAllCategories();
  const counts = await Promise.all(categories.map((c) => getCategoryArticleCount(c.slug)));
  return (
    <div className="cat-grid">
      {categories.map((cat, i) => (
        <Link href={`/categoria/${cat.slug}`} key={cat.slug} className="cat-card">
          <div className="cat-dot" aria-hidden="true" />
          <h4>{cat.name}</h4>
          <span>{counts[i]} artigo(s)</span>
        </Link>
      ))}
    </div>
  );
}
