# Somos Impulso — projeto Next.js

Site pronto para rodar localmente e ser publicado na Vercel. Hoje o conteúdo (artigos,
categorias, ferramentas) vem dos arquivos em `/content`, sem depender de nenhuma conta externa.

## Rodando localmente

```
npm install
npm run dev
```

Abra http://localhost:3000

## O que já está pronto

- Todas as páginas do mapa do site, navegáveis de verdade (sem nenhum `href="#"`)
- 8 artigos completos, categorias, catálogo de 9 ferramentas
- Busca funcional (Fuse.js, roda no navegador, sem precisar de servidor)
- SEO: title/description por página, canonical, Open Graph, Twitter Card, sitemap.xml,
  robots.txt e Schema.org (Article, Breadcrumb, Organization)
- Formulário de newsletter e de contato funcionais na interface, prontos para conectar
  a um serviço real (ver abaixo)
- Design system aplicado consistentemente (cores, tipografia, componentes)
- Responsivo (testado nos breakpoints pedidos)

## O que depende de você para ativar de verdade

### 1. Domínio + Vercel (publicar o site)
1. Crie uma conta gratuita em vercel.com (pode entrar com GitHub)
2. Crie um repositório no GitHub e suba esta pasta para lá
3. Na Vercel, clique em "New Project" e importe esse repositório
4. A Vercel builda e publica automaticamente — você recebe uma URL tipo `somos-impulso.vercel.app`
5. Quando registrar o domínio (ex: somosimpulso.com.br), adicione-o nas configurações do projeto na Vercel e aponte o DNS conforme as instruções que ela mostrar

**Você precisa fazer:** criar conta na Vercel e no GitHub, registrar o domínio.
**Depois, me diga:** se quer que eu documente algo específico do domínio escolhido (ex: ajustar `NEXT_PUBLIC_SITE_URL` no `.env`).

### 2. Sanity CMS (publicar artigos sem mexer em código)
Hoje os artigos vêm de `/content/articles.json`. Os schemas em `/sanity-schemas` já estão prontos
para colar num projeto Sanity Studio quando você quiser migrar para o painel visual.

1. Crie uma conta gratuita em sanity.io
2. Crie um novo projeto (Sanity vai gerar um Project ID)
3. Configure o Studio usando os arquivos de `/sanity-schemas`

**Você precisa fazer:** criar a conta e o projeto no Sanity.
**Depois, me envie:** o Project ID e o Dataset (geralmente "production"). Com isso eu troco `lib/content.js`
para buscar do Sanity em vez do JSON local, sem alterar nenhuma página.

### 3. MailerLite (newsletter de verdade)
O formulário já envia para `/api/newsletter`, mas hoje essa rota responde "ainda não configurado"
porque não há chave de API.

1. Crie uma conta gratuita em mailerlite.com
2. Crie um grupo de contatos (ex: "Newsletter Somos Impulso")
3. Gere uma API key em Integrações > Developer API

**Você precisa fazer:** criar a conta, o grupo e a API key.
**Depois, me envie:** a API key e o ID do grupo — eu configuro como variável de ambiente na Vercel
(nunca direto no código) e a newsletter passa a funcionar de verdade.

### 4. Formulário de contato com envio automático (opcional)
Hoje, ao enviar o formulário, a pessoa recebe a mensagem "escreva para somosdigitalai@gmail.com"
porque não há serviço de envio conectado — isso é intencional, não é bug.

Se quiser envio automático: crie conta gratuita em resend.com, gere uma API key.
**Depois, me envie:** a API key e o e-mail de destino — eu conecto a rota `/api/contact`.

### 5. Google Analytics / Search Console / AdSense
Variáveis já preparadas em `.env.example` (`NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_GSC_VERIFICATION`,
`NEXT_PUBLIC_ADSENSE_CLIENT_ID`). Quando você tiver esses IDs, me envie que eu ativo — nada disso
funciona com placeholders, então por enquanto ficam desligados.

## Variáveis de ambiente (resumo)

Veja `.env.example`. Nenhuma é obrigatória para o site funcionar hoje (com conteúdo local) —
elas ativam, uma a uma, cada integração acima conforme você for configurando as contas.

## Estrutura de pastas

```
app/            rotas do site (App Router do Next.js)
components/     componentes de UI reutilizáveis
content/        conteúdo local (artigos, categorias, ferramentas) em JSON
lib/            acesso a dados, SEO, configuração do site
sanity-schemas/ schemas prontos para o Sanity Studio (quando for criado)
public/         logo e arquivos estáticos
```
