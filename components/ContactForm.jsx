"use client";

import { useState } from "react";
import { SITE } from "@/lib/site";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState("idle");
  const [feedback, setFeedback] = useState("");

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      setFeedback(data.message);
      setStatus(res.ok ? "success" : "info");
      if (res.ok) setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      setStatus("error");
      setFeedback("Não foi possível enviar agora.");
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Nome</label>
        <input id="name" required value={form.name} onChange={(e) => update("name", e.target.value)} />
      </div>
      <div>
        <label htmlFor="email">E-mail</label>
        <input id="email" type="email" required value={form.email} onChange={(e) => update("email", e.target.value)} />
      </div>
      <div>
        <label htmlFor="subject">Assunto</label>
        <input id="subject" value={form.subject} onChange={(e) => update("subject", e.target.value)} />
      </div>
      <div>
        <label htmlFor="message">Mensagem</label>
        <textarea id="message" required value={form.message} onChange={(e) => update("message", e.target.value)} />
      </div>
      <button type="submit" className="btn btn-primary" disabled={status === "loading"}>
        {status === "loading" ? "Enviando..." : "Enviar mensagem"}
      </button>
      {feedback && <p className="form-note">{feedback}</p>}
      <p className="form-note">
        Prefere e-mail direto? Escreva para{" "}
        <a href={`mailto:${SITE.email}`} style={{ color: "var(--cyan)" }}>{SITE.email}</a>.
      </p>
    </form>
  );
}
