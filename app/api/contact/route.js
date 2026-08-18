export async function POST(request) {
  const { name, email, subject, message } = await request.json();

  if (!name || !email || !message || !email.includes("@")) {
    return Response.json({ message: "Preencha nome, e-mail e mensagem corretamente." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;

  if (!apiKey || !toEmail) {
    return Response.json(
      {
        message:
          "O envio automático ainda não está configurado. Por enquanto, escreva diretamente para somosdigitalai@gmail.com.",
      },
      { status: 503 }
    );
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: "Somos Impulso <contato@somosimpulso.com.br>",
        to: toEmail,
        reply_to: email,
        subject: `[Contato] ${subject || "Nova mensagem"} — ${name}`,
        text: message,
      }),
    });

    if (!res.ok) {
      return Response.json({ message: "Não foi possível enviar agora." }, { status: res.status });
    }
    return Response.json({ message: "Mensagem enviada com sucesso." }, { status: 200 });
  } catch (err) {
    return Response.json({ message: "Não foi possível enviar agora." }, { status: 500 });
  }
}
