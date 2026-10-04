# Padrão visual do aplicativo

Referência: [protótipo publicado no Figma](https://frame-think-79547627.figma.site/), analisado em 4 de outubro de 2026. A especificação `ESPECIFICACAO_MVP_DESCOBERTA_LOCAL.md` permanece como fonte das regras de produto.

## Identidade

| Elemento                | Padrão                                                                                                                                 |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| Tipografia              | Inter variável, hospedada localmente pelo pacote `@fontsource-variable/inter`. Títulos em peso 600; marca e pequenos destaques em 700. |
| Texto principal         | `#172b2a`                                                                                                                              |
| Texto secundário        | `#526664`, também usado nas informações menores para manter contraste.                                                                 |
| Fundo da página         | `#eef2ef`                                                                                                                              |
| Superfície principal    | `#ffffff`                                                                                                                              |
| Superfície secundária   | `#f2f6f3`                                                                                                                              |
| Destaque                | `#0b746c`; interação escura `#075c56`.                                                                                                 |
| Superfícies de destaque | `#e7f4f1` e `#f0f8f6`.                                                                                                                 |
| Divisórias              | `#dfe7e4` e `#e9efec`.                                                                                                                 |
| Cantos                  | 20 px na superfície principal, 16 px nos painéis internos, 10 px nos controles e formato circular nos avatares/status.                 |
| Espaçamento             | Base de 4 px, com uso recorrente de 8, 12, 16, 24 e 32 px.                                                                             |

Os tokens e os estilos compartilhados estão em `src/app/globals.css`. Novas telas devem usar esses tokens e os componentes existentes. Ícones são SVGs locais em `src/components/icon.tsx`, com traço de 1,6 px; a bússola identifica a marca no cabeçalho, favicon e imagem de compartilhamento.

## Estrutura

- Cabeçalho branco de 68 px no desktop e 64 px no celular. Navegação central no desktop, perfil à direita e menu expansível no celular. Página atual indicada visualmente e com `aria-current`.
- Conteúdo autenticado em uma única superfície branca, com largura máxima de 1.280 px, margem superior de 22 px e espaçamento interno de 32 px. No celular, margens laterais de 16 px e espaçamento interno menor.
- Formulários têm largura de leitura controlada. Login, cadastro, recuperação, onboarding e páginas legais recebem a mesma identidade e superfícies brancas.
- Feed, atividades, ranking e administração continuam usando listas com divisórias. Painéis adicionais aparecem quando representam uma função específica, como o contexto de um pedido ou um grupo de indicações.
- Inputs e botões de filtro têm 52 px e compartilham a linha do campo, mantendo labels e textos de ajuda separados. Ações compactas do detalhe têm área de interação de pelo menos 44 px no celular.
- Abas rolam horizontalmente quando necessário e mantêm a opção ativa visível. Cidades usam o autocomplete nacional já existente, sem botão de busca.
- Estados vazios usam a ilustração de localização do protótipo, sem redução involuntária do tamanho no celular. Erros, carregamento, foco e sucesso continuam sendo comunicados pelos componentes funcionais.
- Avatares sem foto mostram até duas iniciais. As estatísticas de pontos e confirmações do perfil compartilham a mesma linha de base, sem a margem vertical automática entre parágrafos.

## Detalhe do pedido

O detalhe reproduz a hierarquia do protótipo: retorno à cidade, status e data, ferramentas autorizadas, título, município e autor. Indicações e contexto ficam em duas colunas a partir de 1.024 px; abaixo disso, o contexto vem depois das respostas.

A ilustração da área é decorativa e não representa coordenadas reais nem disponibilidade de produtos. O município vem do pedido persistido. Consultas e links reais de estabelecimentos continuam usando Google Places/Maps com atribuição.

As adaptações funcionais seguem a especificação:

- A contagem representa **indicações recebidas**. Estabelecimentos e autores das outras respostas permanecem privados antes da revelação.
- Editar só aparece quando a solicitação é editável. Cancelar mantém confirmação e validação no servidor/banco.
- Revelar encerra o recebimento de novas respostas. O solicitante confirma o estabelecimento por meio do fluxo existente; a interface não fornece um atalho para marcar o pedido como encontrado sem essa decisão.
- Indicações reveladas continuam agrupadas por estabelecimento, com participantes, comentários, denúncia e confirmação. Recompensas e idempotência permanecem no PostgreSQL.
- Compartilhar usa a interface nativa do dispositivo quando disponível. A alternativa copia a URL canônica do pedido; se o clipboard estiver indisponível ou for recusado, mostra um campo para cópia manual. Parâmetros de feedback e paginação são removidos do link. O acesso ao pedido mantém os requisitos de autenticação existentes.
- O autor continua disponível no celular. A página rola naturalmente, permitindo visualizar descrições, comentários e históricos longos.

## Verificação

Os testes em `tests/e2e/design.spec.ts` verificam fonte/carregamento, cores, disposição das colunas, tamanho da ilustração, limites da superfície, privacidade e ferramentas permitidas no pedido aberto. Também exercitam menu por mouse/teclado, Escape, clique externo, links e acesso administrativo, além de cópia e alternativa manual de compartilhamento.

As suítes existentes continuam verificando o fluxo completo e a responsividade das demais telas. Larguras: 320, 375, 390, 414, 768, 1.024, 1.280 e 1.440 px. Screenshots são geradas em `test-results/`, incluindo `prototipo-pedido-vazio-*` e `prototipo-menu-*`, para comparação com a referência.

Não há nova migration, configuração obrigatória de ambiente ou alteração em autenticação, RLS, pontuação e validação de estabelecimentos. A dependência de fonte Inter substitui DM Sans e Manrope. O teste visual usa Chromium; serviços externos nos E2E ficam isolados nas fixtures existentes, conforme `VERIFICACAO.md`.
