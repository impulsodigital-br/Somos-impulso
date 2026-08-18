"use client";

import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success | error | unconfigured
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setStatus("error");
      setMessage("Digite um e-mail válido.");
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.status === 503) {
        setStatus("unconfigured");
        setMessage(data.message);
        return;
      }
      if (!res.ok) {
        setStatus("error");
        setMessage(data.message || "Não foi possível cadastrar agora. Tente novamente.");
        return;
      }
      setStatus("success");
      setMessage("Cadastro confirmado. Obrigado!");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setMessage("Não foi possível cadastrar agora. Tente novamente.");
    }
  }

  return (
    <form className="nl-form" onSubmit={handleSubmit} noValidate>
      <div className="nl-input-wrap">
        <label htmlFor="newsletter-email" className="sr-only">Seu melhor e-mail</label>
        <input
          id="newsletter-email"
          type="email"
          placeholder="Seu melhor e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === "loading"}
        />
        <button className="btn btn-primary" type="submit" disabled={status === "loading"}>
          {status === "loading" ? "Enviando..." : "Quero receber"}
        </button>
      </div>
      {message && (
        <p className="nl-message" role="status">
          {message}
        </p>
      )}
    </form>
  );
}
