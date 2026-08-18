import { buildMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const metadata = buildMetadata({ title: "Política de Privacidade", path: "/politica-de-privacidade" });

export default function Page() {
  return (
    <>
      <div className="page-header"><h1>Política de Privacidade</h1></div>
      <div className="prose">
        <p>
          Este documento é um modelo inicial e deve ser revisado por um profissional jurídico antes da
          publicação oficial do site, para garantir conformidade com a LGPD (Lei Geral de Proteção de Dados).
        </p>
        <h2>Dados coletados</h2>
        <p>
          O {SITE.name} pode coletar o e-mail informado voluntariamente no formulário de newsletter e os
          dados informados no formulário de contato (nome, e-mail e mensagem).
        </p>
        <h2>Uso dos dados</h2>
        <p>Os dados são usados exclusivamente para responder contatos e enviar conteúdos da newsletter, quando o cadastro for confirmado.</p>
        <h2>Contato</h2>
        <p>Dúvidas sobre privacidade podem ser enviadas para {SITE.email}.</p>
      </div>
    </>
  );
}
