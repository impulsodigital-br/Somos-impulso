import ContactForm from "@/components/ContactForm";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Contato",
  description: "Fale com o time do Somos Impulso.",
  path: "/contato",
});

export default function ContatoPage() {
  return (
    <>
      <div className="page-header">
        <h1>Contato</h1>
        <p>Tem uma dúvida, sugestão de pauta ou proposta de parceria? Escreva pra gente.</p>
      </div>
      <ContactForm />
    </>
  );
}
