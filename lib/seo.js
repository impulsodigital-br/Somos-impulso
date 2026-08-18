import { SITE } from "@/lib/site";

export function buildMetadata({ title, description, path = "/", image }) {
  const url = `${SITE.url}${path}`;
  const fullTitle = title ? `${title} | ${SITE.name}` : `${SITE.name} — ${SITE.tagline}`;
  const ogImage = image || `${SITE.url}/logo.jpg`;

  return {
    title: fullTitle,
    description: description || SITE.description,
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description: description || SITE.description,
      url,
      siteName: SITE.name,
      images: [{ url: ogImage }],
      locale: "pt_BR",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: description || SITE.description,
      images: [ogImage],
    },
  };
}

export function articleJsonLd(article) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.date,
    dateModified: article.updatedAt || article.date,
    author: { "@type": "Organization", name: article.author || SITE.name },
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      logo: { "@type": "ImageObject", url: `${SITE.url}/logo.jpg` },
    },
    mainEntityOfPage: `${SITE.url}/artigos/${article.slug}`,
  };
}

export function breadcrumbJsonLd(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE.url}${item.path}`,
    })),
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    url: SITE.url,
    logo: `${SITE.url}/logo.jpg`,
    sameAs: [SITE.instagramUrl],
  };
}
