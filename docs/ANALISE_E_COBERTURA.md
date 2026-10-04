# Análise do repositório e cobertura

## Estado encontrado

A leitura integral da especificação ocorreu antes da implementação. O diretório continha um único arquivo: `ESPECIFICACAO_MVP_DESCOBERTA_LOCAL.md`. Não havia `.git`, código, pastas de aplicação, package.json, dependências, banco, autenticação, componentes, estilos, configuração de ambiente, testes ou funcionalidades implementadas. Não existia base utilizável para preservar ou refatorar. O documento original foi preservado.

A stack recomendada foi adotada: Next.js App Router, TypeScript, React, Supabase SSR/Auth, PostgreSQL com RLS, Google OAuth, Places API (New), Zod, migrations, Vitest e Playwright. CSS próprio e fontes locais evitam dependência de um kit genérico de dashboard.

## Comparação com a especificação

| Área da especificação                          | Implementação                                                                                                                |
| ---------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| Landing, demonstração, CTA, valor acumulado    | `/`; exemplos explicitamente ilustrativos; ranking real quando configurado                                                   |
| Autenticação e identidade interna              | E-mail/senha adicionado a pedido do responsável; Google opcional, callback PKCE/OTP, conta interna via trigger Auth          |
| Onboarding e perfil                            | `/onboarding`, `/perfil`, `/perfil/[username]`; foto Google opcional; email privado                                          |
| Cidades estruturadas e independentes do perfil | Catálogo IBGE completo, seleção por município/UF, cidade editável no pedido                                                  |
| Criação, busca e feed paginado                 | `/pedidos/novo`, `/app`; pesquisa textual no PostgreSQL e filtros de cidade/status                                           |
| Reutilização de resoluções reais               | Busca em resultados `RESOLVED` durante composição, link ao histórico com data                                                |
| Indicação de local real                        | Autocomplete oficial, seleção e revalidação no servidor; envio apenas do identificador                                       |
| Validação segura da cidade                     | Componentes estruturados, normalização de acentos, município/UF/país, rejeição de ambiguidades                               |
| Uma indicação e autoindicação                  | UNIQUE(request_id,user_id), RPC e trigger; dados principais imutáveis após envio                                             |
| Anti-cópia e contagem                          | RLS esconde conteúdo; count agregado próprio sem revelar nomes/locais                                                        |
| Revelação e bloqueio definitivo                | RPC transacional com lock de linha da solicitação                                                                            |
| Edição antes da primeira indicação             | RPC e trigger; registro de indicação moderada também impede editar                                                           |
| Resolução pelo local                           | request_resolutions.place_id; um registro por solicitação; três tipos de resultado                                           |
| Pontos e ledger                                | INSERT SELECT recompensa todos os elegíveis do local; +10; unicidade dupla; imutável                                         |
| Idempotência e concorrência                    | Mesmo lock em indicação/revelação/resolução; retry equivalente retorna resolução existente                                   |
| Ranking por cidade                             | Soma do ledger da cidade do pedido; desempate determinístico                                                                 |
| Atividades e histórico                         | `/atividades` com cinco filtros, perfil próprio e ledger individual                                                          |
| Administração e reports                        | `/admin`; busca de usuários/conteúdo, bloqueio, remoção, denúncia, revisão, ledger e logs                                    |
| Auditoria e fraude                             | Logs de cadastro/login/ações e sinais de resolução rápida, pares repetidos, volume e contas recentes; sem punição automática |
| Rate limits                                    | Contadores transacionais compartilhados por usuário, cotas de chamadas Places e analytics por fingerprint                    |
| Segurança                                      | Sessão verificada no servidor, RPCs de menor privilégio, RLS, grants explícitos, CSP com nonce, CSRF                         |
| Erros, estados vazios e loading                | Formulários com feedback, mensagens traduzidas, boundaries e skeleton                                                        |
| Acessibilidade e mobile                        | Labels, foco, teclado, skip link, navegação inferior, reduced motion, testes de 320–1440 px                                  |
| SEO público                                    | Metadata, canonical, Open Graph, imagem OG, ícone, sitemap, robots e páginas legais                                          |
| Analytics e métricas                           | Contadores agregados públicos e eventos de produto no audit log; painel de métricas                                          |
| Testes                                         | Unitários de validação/Places, integração PostgreSQL/RLS/concurrency, E2E do ciclo completo e responsividade                 |

## Integrações que precisam de configuração externa

O código possui as integrações reais e não usa fixtures como fallback em execução normal. O acesso por e-mail requer configuração do Supabase Auth, entrega de e-mails e migrations. Google OAuth é opcional; billing/chave Places continua necessário para a indicação de estabelecimentos. Os testes de browser usam fornecedores de teste isolados; a autorização externa real, as cotas e o domínio de produção precisam da homologação descrita em `HOMOLOGACAO.md`.

## Decisões de escopo

Brasil é o país do MVP, com municípios estruturados do IBGE. Não foi inventado nome ou logo definitivo, monetização, categoria, chat, moeda ou recompensa financeira. “Encontrei em outro local” encerra sem registrar outro estabelecimento, opção explicitamente permitida pela especificação. O cancelamento pelo solicitante é permitido somente em OPEN; após REVEALED, ele usa uma das três conclusões. Administradores podem remover conteúdo em qualquer estado.
