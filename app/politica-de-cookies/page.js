import { buildMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const metadata = buildMetadata({ title: "Política de Cookies", path: "/politica-de-cookies" });

export default function Page() {
  return (
    <>
      <div className="page-header"><h1>Política de Cookies</h1></div>
      <div className="prose">
        <p>
          Este documento é um modelo inicial e deve ser revisado por um profissional jurídico antes da
          publicação oficial do site.
        </p>
        <p>
          Quando o Google Analytics for configurado, este site poderá usar cookies para métricas de audiência.
          Nenhum cookie de rastreamento publicitário está ativo até que o Google AdSense seja configurado.
        </p>
        <p>Dúvidas podem ser enviadas para {SITE.email}.</p>
      </div>
    </>
  );
}
