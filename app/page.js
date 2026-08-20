import Link from "next/link";
import ArticleCard from "@/components/ArticleCard";
import CategoryGrid from "@/components/CategoryGrid";
import ToolCard from "@/components/ToolCard";
import Newsletter from "@/components/Newsletter";
import { getFeaturedArticles, getRecentArticles, getAllTools } from "@/lib/content";
import { SITE } from "@/lib/site";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: undefined,
  description: SITE.description,
  path: "/",
});

export default async function HomePage() {
  const featured = await getFeaturedArticles(3);
  const recent = await getRecentArticles(6, featured.map((a) => a.slug));
  const tools = (await getAllTools()).slice(0, 3);

  return (
    <>
      <section className="hero">
        <div className="hero-inner">
          <span className="eyebrow">Portal de Inteligência Artificial e tecnologia</span>
          <h1>{SITE.tagline}</h1>
          <p>
            Descubra ferramentas, estratégias e conhecimentos para usar a tecnologia de forma mais
            inteligente no trabalho, nos negócios e na vida.
          </p>
          <div className="hero-ctas">
            <Link href="/artigos" className="btn btn-primary">Explorar conteúdos</Link>
            <Link href="/ferramentas" className="btn btn-secondary">Conhecer ferramentas de IA</Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <div>
            <span className="eyebrow-small">Conteúdos em destaque</span>
            <h2>Para começar por aqui</h2>
          </div>
          <Link href="/artigos" className="see-all">Ver todos os artigos &rarr;</Link>
        </div>
        <div className="grid-3">
          {featured.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <div>
            <span className="eyebrow-small">Recém-publicados</span>
            <h2>Artigos recentes</h2>
          </div>
        </div>
        <div className="grid-3">
          {recent.slice(0, 3).map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <div>
            <span className="eyebrow-small">Navegue por assunto</span>
            <h2>Categorias</h2>
          </div>
        </div>
        <CategoryGrid />
      </section>

      <section className="tools-wrap">
        <div className="section">
          <div className="section-head">
            <div>
              <span className="eyebrow-small">Catálogo</span>
              <h2>Ferramentas de IA</h2>
            </div>
            <Link href="/ferramentas" className="see-all">Ver catálogo completo &rarr;</Link>
          </div>
          <div className="tool-grid">
            {tools.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="split">
          <div className="panel panel-ig">
            <h3>Continue acompanhando o Somos Impulso</h3>
            <p>Conteúdo diário sobre Inteligência Artificial, tecnologia e ferramentas direto no seu feed.</p>
            <a href={SITE.instagramUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              Seguir no Instagram
            </a>
          </div>
          <div className="panel panel-nl">
            <h3>Receba novidades sobre IA</h3>
            <p>Conteúdos, ferramentas e oportunidades de Inteligência Artificial diretamente no seu e-mail.</p>
            <Newsletter />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="panel" style={{ background: "var(--bg-secondary)" }}>
          <h3>Sobre o Somos Impulso</h3>
          <p style={{ maxWidth: 640 }}>
            Um portal brasileiro nascido em Formiga, Minas Gerais, para tornar Inteligência Artificial
            e tecnologia acessíveis a quem quer evoluir no trabalho, nos estudos e nos negócios.
          </p>
          <Link href="/sobre" className="btn btn-secondary">Conhecer nossa história</Link>
        </div>
      </section>
    </>
  );
}
