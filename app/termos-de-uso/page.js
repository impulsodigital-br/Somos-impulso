import { buildMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const metadata = buildMetadata({ title: "Termos de Uso", path: "/termos-de-uso" });

export default function Page() {
  return (
    <>
      <div className="page-header"><h1>Termos de Uso</h1></div>
      <div className="prose">
        <p>
          Este documento é um modelo inicial e deve ser revisado por um profissional jurídico antes da
          publicação oficial do site.
        </p>
        <h2>Uso do conteúdo</h2>
        <p>O conteúdo publicado pelo {SITE.name} tem finalidade informativa e educacional. Não deve ser considerado aconselhamento profissional individualizado.</p>
        <h2>Propriedade intelectual</h2>
        <p>Textos, marca e identidade visual do {SITE.name} pertencem à {SITE.parentBrand}, salvo indicação em contrário.</p>
        <h2>Contato</h2>
        <p>Dúvidas podem ser enviadas para {SITE.email}.</p>
      </div>
    </>
  );
}
