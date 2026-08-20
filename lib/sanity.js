import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export const sanityEnabled = Boolean(projectId);

export const sanityClient = sanityEnabled
  ? createClient({
      projectId,
      dataset,
      apiVersion: "2024-01-01",
      useCdn: true,
    })
  : null;

// Converte o array de Portable Text do Sanity para o mesmo formato de blocos
// {type, text/items} que as páginas do site já sabem renderizar.
export function portableTextToBlocks(pt) {
  if (!Array.isArray(pt)) return [];
  const blocks = [];
  let currentList = null;

  for (const block of pt) {
    if (block._type !== "block") continue;
    const text = (block.children || []).map((c) => c.text).join("");

    if (block.listItem === "bullet") {
      if (!currentList) {
        currentList = { type: "ul", items: [] };
        blocks.push(currentList);
      }
      currentList.items.push(text);
      continue;
    }
    currentList = null;

    if (block.style === "h2") blocks.push({ type: "h2", text });
    else blocks.push({ type: "p", text });
  }
  return blocks;
}

const POST_PROJECTION = `{
  "slug": slug.current,
  title,
  excerpt,
  "category": category->slug.current,
  "author": author->name,
  date,
  updatedAt,
  readTime,
  body,
  "relatedSlugs": relatedPosts[]->slug.current,
  "coverGradient": "thumb-1"
}`;

export async function sanityGetAllArticles() {
  const posts = await sanityClient.fetch(`*[_type == "post"] | order(date desc) ${POST_PROJECTION}`);
  return posts.map((p) => ({ ...p, body: portableTextToBlocks(p.body) }));
}

export async function sanityGetArticleBySlug(slug) {
  const post = await sanityClient.fetch(
    `*[_type == "post" && slug.current == $slug][0] ${POST_PROJECTION}`,
    { slug }
  );
  if (!post) return null;
  return { ...post, body: portableTextToBlocks(post.body) };
}

export async function sanityGetAllCategories() {
  return sanityClient.fetch(`*[_type == "category"]{ "slug": slug.current, name, description }`);
}

export async function sanityGetAllTools() {
  return sanityClient.fetch(
    `*[_type == "tool"]{ "slug": slug.current, name, description, category, pricing, bestFor, officialUrl, tags }`
  );
}
