import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set");
    return NextResponse.json(
      { error: "Servicio de email no configurado." },
      { status: 503 }
    );
  }

  const resend = new Resend(apiKey);

  try {
    const body = await request.json();
    const { name, email, userType, message } = body;

    if (!name || typeof name !== "string" || !email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Nombre y email son obligatorios." },
        { status: 400 }
      );
    }

    const toEmail = process.env.CONTACT_EMAIL ?? process.env.RESEND_TO ?? "contacto@noah.estate";
    const fromEmail = process.env.RESEND_FROM ?? "onboarding@resend.dev";

    const userTypeLabel =
      userType === "administrador_fincas"
        ? "Administrador de fincas"
        : userType === "presidente"
          ? "Presidente"
          : userType === "otro"
            ? "Otro"
            : userType || "—";

    const text = [
      "Nueva solicitud Noah",
      "",
      "Nombre: " + (name || "—"),
      "Email: " + (email || "—"),
      "Tipo de usuario: " + userTypeLabel,
      "Mensaje: " + (message || "—"),
    ].join("\n");

    const { error } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      subject: "Nueva solicitud Noah",
      text,
      html: `
        <h2>Nueva solicitud Noah</h2>
        <p><strong>Nombre:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Tipo de usuario:</strong> ${escapeHtml(userTypeLabel)}</p>
        <p><strong>Mensaje:</strong> ${message ? escapeHtml(message) : "—"}</p>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "No se pudo enviar el email. Inténtalo más tarde." },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("Contact API error:", e);
    return NextResponse.json(
      { error: "Error interno. Inténtalo más tarde." },
      { status: 500 }
    );
  }
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
