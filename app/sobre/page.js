import { buildMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Sobre",
  description: "A história do Somos Impulso, nascido em Formiga, Minas Gerais.",
  path: "/sobre",
});

export default function SobrePage() {
  return (
    <>
      <div className="page-header">
        <h1>Sobre o Somos Impulso</h1>
        <p>{SITE.tagline}</p>
      </div>
      <div className="prose">
        <p>
          O Somos Impulso nasceu de uma conversa em 2023, entre dois primos que enxergaram, ainda nos
          primeiros movimentos da Inteligência Artificial, uma oportunidade real de aproximar essa
          tecnologia das pessoas comuns. Naquele momento, era apenas uma ideia — um projeto que reunia
          tecnologia, internet e vontade de construir algo que ajudasse gente de verdade a evoluir.
        </p>
        <p>
          Por circunstâncias da vida, o projeto ficou guardado por um tempo. Mas a ideia nunca desapareceu.
          Em 2026, com a popularização acelerada da Inteligência Artificial e a transformação do mercado
          digital, ficou claro que era hora de tirar aquela visão do papel — e assim nasceu, oficialmente,
          o Somos Impulso.
        </p>
        <p>
          O projeto começou em Formiga, Minas Gerais, mas nasceu com um olhar para o Brasil inteiro. Nossa
          missão não é falar sobre Inteligência Artificial de forma distante ou técnica demais — é mostrar,
          na prática, como estudantes, profissionais, empreendedores e pequenos negócios podem usar essa
          tecnologia para trabalhar melhor, aprender mais rápido e enxergar oportunidades novas.
        </p>

        <h2>Nosso propósito</h2>
        <p>
          Traduzir tecnologia complexa em conhecimento aplicável. Acreditamos que Inteligência Artificial só
          tem valor real quando ajuda alguém a resolver um problema concreto do dia a dia — seja no trabalho,
          nos estudos ou em um negócio que está começando.
        </p>

        <h2>Em que acreditamos</h2>
        <p>
          Acreditamos em conteúdo útil acima de hype, em clareza acima de jargão técnico, e em tecnologia
          como ferramenta de acesso — não como privilégio de quem já entende do assunto.
        </p>

        <h2>O que queremos construir</h2>
        <p>
          Um portal de referência em português sobre Inteligência Artificial e tecnologia: guias práticos,
          comparativos honestos de ferramentas e conteúdo pensado para quem está começando, sem deixar de
          ser útil para quem já tem alguma experiência. O Somos Impulso é parte da {SITE.parentBrand},
          marca responsável pelos conteúdos educacionais e formações da nossa comunidade.
        </p>
      </div>
    </>
  );
}
