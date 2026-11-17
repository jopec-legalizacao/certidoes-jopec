# Certidões Jopec

Este é o app Certidões Jopec (PWA), que está no ar em https://certidoes-jopec.vercel.app.

- Raiz: arquivos do site (index.html, sw.js, manifest, ícones, vercel.json).
- `supabase/schema.sql`: tabelas `empresas`, `historico` e `config`, com acesso só para quem está logado.
- `supabase/ia-function.ts`: Edge Function `ia`, que chama a DeepSeek (segredo DEEPSEEK_API_KEY).

Onde fica cada coisa:
- Supabase: projeto `bpnprrkfhrqsdwsevwsk` ("legalização jopec"), na conta mateus.jopec@gmail.com.
- Vercel: projeto `certidoes-jopec`, no time `mateusamigodomei`.

Como publicar uma mudança:
- A Vercel está ligada a este repositório. Todo commit na branch `main` publica o site sozinho.
- Os arquivos do site ficam na raiz. A pasta `supabase/` guarda o banco e a função da IA, e não é publicada.

Regras:
- Nunca digitar senhas nem a chave da DeepSeek.
- Não apagar dados sem perguntar.
- Responder em português do Brasil.
