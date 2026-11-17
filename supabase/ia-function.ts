// Função "ia": recebe {prompt, json} de um usuário logado e consulta a DeepSeek.
const CORS = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type", "Access-Control-Allow-Methods": "POST, OPTIONS" };
const resp = (b: unknown, s = 200) => new Response(JSON.stringify(b), { status: s, headers: { ...CORS, "Content-Type": "application/json" } });
Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS });
  try {
    const { prompt, json } = await req.json();
    if (typeof prompt !== "string" || !prompt.trim()) return resp({ error: "Pedido vazio." }, 400);
    if (prompt.length > 150000) return resp({ error: "Texto grande demais. Envie menos de cada vez." }, 413);
    const key = Deno.env.get("DEEPSEEK_API_KEY");
    if (!key) return resp({ error: "A chave da IA (DEEPSEEK_API_KEY) ainda não foi configurada no Supabase." }, 500);
    const body: Record<string, unknown> = { model: "deepseek-chat", temperature: 0.2, messages: [{ role: "user", content: prompt }] };
    if (json) body.response_format = { type: "json_object" };
    const r = await fetch("https://api.deepseek.com/chat/completions", { method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` }, body: JSON.stringify(body) });
    if (!r.ok) return resp({ error: `A IA respondeu com erro ${r.status}.` }, 502);
    const d = await r.json();
    return resp({ text: d.choices?.[0]?.message?.content ?? "" });
  } catch (_e) {
    return resp({ error: "Falha ao consultar a IA." }, 500);
  }
});
