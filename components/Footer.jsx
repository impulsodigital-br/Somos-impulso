import Link from "next/link";
import Image from "next/image";
import { SITE, FOOTER_NAV } from "@/lib/site";
import { getAllCategories } from "@/lib/content";

export default function Footer() {
  const categories = getAllCategories().slice(0, 4);
  return (
    <footer>
      <div className="footer-grid">
        <div>
          <div className="footer-brand">
            <Image src="/logo.jpg" alt="Somos Impulso" width={32} height={32} className="logo-img" />
            <span>{SITE.name}</span>
          </div>
          <p className="desc">{SITE.description} Parte da {SITE.parentBrand}.</p>
        </div>
        <div>
          <h5>Navegação</h5>
          <ul>
            {FOOTER_NAV.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h5>Categorias</h5>
          <ul>
            {categories.map((cat) => (
              <li key={cat.slug}>
                <Link href={`/categoria/${cat.slug}`}>{cat.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h5>Contato</h5>
          <ul>
            <li><a href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
            <li><a href={SITE.instagramUrl} target="_blank" rel="noopener noreferrer">Instagram {SITE.instagramHandle}</a></li>
            <li><Link href="/contato">Fale conosco</Link></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <span>&copy; {new Date().getFullYear()} {SITE.name}. Parte da {SITE.parentBrand}.</span>
        <span>
          <Link href="/politica-de-privacidade">Política de Privacidade</Link> &middot;{" "}
          <Link href="/termos-de-uso">Termos de Uso</Link> &middot;{" "}
          <Link href="/politica-de-cookies">Política de Cookies</Link>
        </span>
      </div>
    </footer>
  );
}
