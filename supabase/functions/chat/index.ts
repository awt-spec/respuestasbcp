import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `Eres un asistente experto de SYSDE International. Tu rol es responder preguntas sobre SYSDE, sus productos (SYSDE PLUS, FileMaster), implementaciones, clientes y capacidades.

Contexto clave sobre SYSDE:
- SYSDE International tiene 34+ años de trayectoria en el sector financiero
- +878 clientes activos en el sector financiero
- Productos principales: SYSDE PLUS (Leasing, Factoring, Créditos, Tarjetas, Banca Digital, Fondos de Pensiones), FileMaster (Expedientes Digitales)
- Presencia en más de 20 países de Latinoamérica, Caribe, África y Europa
- Certificaciones ISO internacionales
- Arquitectura cloud sobre Microsoft Azure con microservicios
- Implementaciones recientes incluyen: Grupo CMI (Guatemala, +20 países), AMC (El Salvador), Dos Pinos (Costa Rica), Grupo Apex y Grupo Aurum (Guatemala)
- Unicomer Caribbean Holding opera en +19 países con SYSDE PLUS
- SYSDE PLUS cubre +80% del mercado de pensiones en Latinoamérica
- SYSDE PLUS es modular: Leasing, Factoring y Créditos pueden activarse independientemente
- Integración nativa con SAP y otros ERPs via APIs
- El core de leasing tiene +30 años en el mercado

Este documento es una respuesta a consultas de BCP (Banco de Crédito del Perú) sobre la solución de Leasing de SYSDE.

Responde siempre en español a menos que te pregunten en inglés. Sé profesional, conciso y útil. Usa datos específicos cuando sea posible.`;

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Demasiadas solicitudes, intenta de nuevo en un momento." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Créditos agotados." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "Error del servicio de IA" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("chat error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Error desconocido" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
