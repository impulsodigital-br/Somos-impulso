// Rota pronta para o MailerLite. Enquanto as variaveis de ambiente
// MAILERLITE_API_KEY e MAILERLITE_GROUP_ID nao estiverem configuradas na Vercel,
// retorna 503 e uma mensagem clara — nunca finge sucesso.

export async function POST(request) {
  const { email } = await request.json();

  if (!email || typeof email !== "string" || !email.includes("@")) {
    return Response.json({ message: "E-mail inválido." }, { status: 400 });
  }

  const apiKey = process.env.MAILERLITE_API_KEY;
  const groupId = process.env.MAILERLITE_GROUP_ID;

  if (!apiKey || !groupId) {
    return Response.json(
      {
        message:
          "A newsletter ainda não está conectada a um serviço de e-mail. Configure o MailerLite para ativar.",
      },
      { status: 503 }
    );
  }

  try {
    const res = await fetch("https://connect.mailerlite.com/api/subscribers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({ email, groups: [groupId] }),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      return Response.json(
        { message: errorData.message || "Não foi possível cadastrar agora." },
        { status: res.status }
      );
    }

    return Response.json({ message: "Cadastro confirmado." }, { status: 200 });
  } catch (err) {
    return Response.json({ message: "Não foi possível cadastrar agora." }, { status: 500 });
  }
}
