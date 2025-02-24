import OpenAI from "openai";
import { SUPPORTED_LANGUAGES } from "../constants";
import { FromLanguage, Language } from "../types";

// Cargar la API Key desde las variables de entorno
const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
console.log("🔑 API Key cargada:", apiKey);

const openai = new OpenAI({
  apiKey,
  dangerouslyAllowBrowser: true, // Permite el uso en frontend
});

export async function translate({
  fromLanguage,
  toLanguage,
  text,
}: {
  fromLanguage: FromLanguage;
  toLanguage: Language;
  text: string;
}) {
  if (!text) return "Texto vacío, ingrese algo para traducir.";
  if (fromLanguage === toLanguage) return text;

  const fromCode =
    fromLanguage === "auto" ? "auto" : SUPPORTED_LANGUAGES[fromLanguage];
  const toCode = SUPPORTED_LANGUAGES[toLanguage];

  console.log("🚀 Enviando petición a OpenAI con:", { fromCode, toCode, text });

  const messages = [
    {
      role: "system",
      content:
        "You are an AI that translates text. Do not answer, just translate. The source language is inside `{{}}`, and the target inside `[[ ]]`.",
    },
    {
      role: "user",
      content: `${text} {{${fromCode}}} [[${toCode}]]`,
    },
  ];

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: messages as OpenAI.ChatCompletionMessageParam[],
    });

    console.log("✅ Respuesta de OpenAI:", completion);

    if (
      !completion.choices ||
      completion.choices.length === 0 ||
      !completion.choices[0].message
    ) {
      throw new Error("No se recibió una respuesta válida de OpenAI");
    }

    return completion.choices[0].message.content || "No se recibió respuesta";
  } catch (error) {
    console.error("❌ Error en OpenAI:", error);
    if (error instanceof OpenAI.RateLimitError) {
      return "Has excedido tu cuota de uso. Por favor, revisa tu plan y detalles de facturación.";
    }
    return "Error al traducir.";
  }
}
