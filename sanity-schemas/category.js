export default {
  name: "category",
  title: "Categoria",
  type: "document",
  fields: [
    { name: "name", title: "Nome", type: "string" },
    { name: "slug", title: "Slug", type: "slug", options: { source: "name" } },
    { name: "description", title: "Descrição", type: "text" },
  ],
};
