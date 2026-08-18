// Schema pronto para colar num projeto Sanity Studio quando a conta for criada.
// Espelha exatamente os campos usados em content/articles.json.
export default {
  name: "post",
  title: "Artigo",
  type: "document",
  fields: [
    { name: "title", title: "Título", type: "string", validation: (Rule) => Rule.required() },
    { name: "slug", title: "Slug", type: "slug", options: { source: "title" }, validation: (Rule) => Rule.required() },
    { name: "excerpt", title: "Resumo", type: "text", rows: 3 },
    { name: "category", title: "Categoria", type: "reference", to: [{ type: "category" }] },
    { name: "coverImage", title: "Imagem de capa", type: "image", options: { hotspot: true } },
    { name: "author", title: "Autor", type: "reference", to: [{ type: "author" }] },
    { name: "date", title: "Data de publicação", type: "datetime" },
    { name: "updatedAt", title: "Data de atualização", type: "datetime" },
    { name: "readTime", title: "Tempo de leitura (min)", type: "number" },
    { name: "body", title: "Conteúdo", type: "array", of: [{ type: "block" }, { type: "image" }] },
    { name: "relatedPosts", title: "Artigos relacionados", type: "array", of: [{ type: "reference", to: [{ type: "post" }] }] },
    { name: "seoTitle", title: "SEO Title", type: "string" },
    { name: "seoDescription", title: "Meta Description", type: "text" },
  ],
};
