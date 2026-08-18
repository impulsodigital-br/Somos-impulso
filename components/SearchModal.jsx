"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import Fuse from "fuse.js";

export default function SearchModal({ open, onClose, searchIndex }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);

  const fuse = useMemo(
    () =>
      new Fuse(searchIndex, {
        keys: ["title", "excerpt", "categoryName", "tags"],
        threshold: 0.35,
      }),
    [searchIndex]
  );

  const results = query.trim().length > 1 ? fuse.search(query).slice(0, 8).map((r) => r.item) : [];

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setQuery("");
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    function handleKey(e) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  if (!open) return null;

  return (
    <div className="search-overlay" role="dialog" aria-modal="true" aria-label="Buscar no site">
      <div className="search-panel">
        <div className="search-input-row">
          <input
            ref={inputRef}
            type="search"
            placeholder="Buscar artigos, guias, ferramentas..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Buscar"
          />
          <button className="icon-btn" onClick={onClose} aria-label="Fechar busca">
            &#10005;
          </button>
        </div>
        <div className="search-results">
          {query.trim().length > 1 && results.length === 0 && (
            <p className="search-empty">Nenhum resultado para &quot;{query}&quot;.</p>
          )}
          {results.map((item) => (
            <Link key={item.url} href={item.url} className="search-result" onClick={onClose}>
              <span className="search-result-type">{item.type}</span>
              <span className="search-result-title">{item.title}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
