// netlify/functions/send-email.js
const formData = require("form-data");
const Mailgun = require("mailgun.js");

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  try {
    const data = JSON.parse(event.body);
    const { name, email } = data;

    if (!name || !email) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Nome e email são obrigatórios" }),
      };
    }

    // Configuração do Mailgun
    const mailgun = new Mailgun(formData);
    const mg = mailgun.client({
      username: "api",
      key: process.env.MAILGUN_API_KEY, // Defina no Netlify
    });

    // Envia o e-mail
    await mg.messages.create(process.env.MAILGUN_DOMAIN, {
      from: "Vantasec <contato@seu-dominio.com>",
      to: email,
      subject: "Análise de Segurança - Vantasec",
      text: `Olá ${name}, recebemos seu pedido de avaliação gratuita.

Por favor, envie uma mensagem para o meu número privado para conversarmos melhor sobre a análise de segurança para você ou sua empresa.

📞 Número: +55 (XX) XXXXX-XXXX

Atenciosamente,
Equipe Vantasec.`,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "E-mail enviado com sucesso" }),
    };
  } catch (error) {
    console.error("Erro ao enviar e-mail:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Erro ao enviar e-mail" }),
    };
  }
};
