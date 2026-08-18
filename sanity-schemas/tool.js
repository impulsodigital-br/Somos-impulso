export default {
  name: "tool",
  title: "Ferramenta de IA",
  type: "document",
  fields: [
    { name: "name", title: "Nome", type: "string" },
    { name: "slug", title: "Slug", type: "slug", options: { source: "name" } },
    { name: "logo", title: "Logo", type: "image" },
    { name: "description", title: "Descrição", type: "text" },
    { name: "category", title: "Categoria", type: "string" },
    { name: "pricing", title: "Preço/Plano", type: "string" },
    { name: "hasFreeTier", title: "Tem plano gratuito?", type: "boolean" },
    { name: "bestFor", title: "Melhor para", type: "string" },
    { name: "officialUrl", title: "Link oficial", type: "url" },
    { name: "editorialRating", title: "Avaliação editorial (1-5)", type: "number" },
    { name: "tags", title: "Tags", type: "array", of: [{ type: "string" }] },
  ],
};
