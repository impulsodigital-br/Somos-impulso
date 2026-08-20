import ToolCard from "@/components/ToolCard";
import { getAllTools } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Ferramentas de IA",
  description: "Catálogo de ferramentas de Inteligência Artificial: o que fazem, para quem servem e onde encontrar.",
  path: "/ferramentas",
});

export default async function FerramentasPage() {
  const tools = await getAllTools();
  return (
    <>
      <div className="page-header">
        <h1>Ferramentas de IA</h1>
        <p>Um catálogo com curadoria editorial — o que cada ferramenta faz de melhor e para quem ela serve.</p>
      </div>
      <div className="section" style={{ paddingTop: 0 }}>
        <div className="tool-grid" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
          {tools.map((tool) => (
            <div id={tool.slug} key={tool.slug}>
              <ToolCard tool={tool} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
