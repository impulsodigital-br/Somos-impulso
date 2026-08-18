export const SITE = {
  name: "Somos Impulso",
  tagline: "Inteligência Artificial para sua evolução.",
  description:
    "Portal brasileiro de conteúdo sobre Inteligência Artificial, tecnologia, produtividade, negócios e evolução digital.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.somosimpulso.com.br",
  instagramUrl: "https://www.instagram.com/somosimpulso.ai/",
  instagramHandle: "@somosimpulso.ai",
  email: "somosdigitalai@gmail.com",
  parentBrand: "Somos Digital",
};

export const NAV_LINKS = [
  { label: "Início", href: "/" },
  { label: "IA", href: "/categoria/inteligencia-artificial" },
  { label: "Tecnologia", href: "/categoria/tecnologia" },
  { label: "Negócios", href: "/categoria/negocios" },
  { label: "Produtividade", href: "/categoria/produtividade" },
  { label: "Marketing", href: "/categoria/marketing-digital" },
  { label: "Ferramentas", href: "/ferramentas" },
  { label: "Guias", href: "/categoria/guias" },
  { label: "Sobre", href: "/sobre" },
];

export const FOOTER_NAV = [
  { label: "Início", href: "/" },
  { label: "Artigos", href: "/artigos" },
  { label: "Ferramentas", href: "/ferramentas" },
  { label: "Sobre", href: "/sobre" },
  { label: "Contato", href: "/contato" },
];
