// netlify/functions/send-email.js
import fetch from "node-fetch";

export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const data = JSON.parse(event.body);

    const nome = data.nome;
    const email = data.email;

    const POSTMARK_TOKEN = process.env.POSTMARK_API_TOKEN;

    // 1️⃣ Enviar e-mail para VOCÊ
    await fetch("https://api.postmarkapp.com/email", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "X-Postmark-Server-Token": POSTMARK_TOKEN
      },
      body: JSON.stringify({
        From: "seuemail@seudominio.com",
        To: "seuemail@seudominio.com",
        Subject: `Nova solicitação de avaliação: ${nome}`,
        TextBody: `Nome: ${nome}\nE-mail: ${email}`
      })
    });

    // 2️⃣ Responder automaticamente para o visitante
    await fetch("https://api.postmarkapp.com/email", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "X-Postmark-Server-Token": POSTMARK_TOKEN
      },
      body: JSON.stringify({
        From: "seuemail@seudominio.com",
        To: email,
        Subject: "Sua solicitação de análise de segurança",
        TextBody: `Olá ${nome}, obrigado por solicitar uma análise de segurança. 
        Para conversarmos melhor, envie uma mensagem para o meu número privado: +55 45999866965.`
      })
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "E-mail enviado com sucesso!" })
    };

  } catch (err) {
    console.error(err);
    return { statusCode: 500, body: "Erro ao enviar e-mail" };
  }
}
