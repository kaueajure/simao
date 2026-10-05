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
- Telas internas usam o mesmo painel principal: largura máxima de 1.280 px e altura determinada pela janela, sem crescer com o conteúdo. A estrutura `app-shell` ocupa `100dvh`, reserva a linha do cabeçalho e distribui o restante ao painel. Margens superior/inferior de 22 px no desktop e 10 px no celular; espaçamento interno de 24 px no desktop e menor no celular.
- Landing, login, cadastro, recuperação de senha e páginas legais usam o layout público completo, com rolagem natural do documento, cabeçalho e rodapé. Não usam `app-shell` ou `ViewportContent`. Formulários de acesso têm largura máxima de 560 px e altura natural; textos legais têm largura máxima de 740 px.
- Formulários internos têm largura de leitura controlada **dentro** do painel. O onboarding, exibido após autenticação, também usa esse painel. Composição e perfil usam duas colunas a partir de 768 px.
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
- O autor continua disponível no celular. O documento não rola: conteúdos que excedem o espaço permanecem acessíveis por rolagem interna em `ViewportContent`, com o painel e o cabeçalho fixos. A navegação para outra página/filtro retorna o conteúdo ao início. A densidade é ajustada em janelas baixas, preservando texto legível e controles acessíveis.

## Verificação

Os testes em `tests/e2e/design.spec.ts` verificam fonte/carregamento, cores, disposição das colunas, tamanho da ilustração, limites da superfície, privacidade e ferramentas permitidas no pedido aberto. Também exercitam menu por mouse/teclado, Escape, clique externo, links e acesso administrativo, além de cópia e alternativa manual de compartilhamento.

As suítes existentes continuam verificando o fluxo completo e a responsividade das demais telas. Larguras: 320, 375, 390, 414, 768, 1.024, 1.280 e 1.440 px. Screenshots são geradas em `test-results/`, incluindo `prototipo-pedido-vazio-*` e `prototipo-menu-*`, para comparação com a referência.

`tests/e2e/viewport.spec.ts` compara posição, largura e altura do painel entre feed, ranking, atividades, perfis, composição, edição e detalhe, nos oito tamanhos e em alturas de 600 e 850 px. Verifica ausência de rolagem do documento, acesso aos controles ao fim de formulários longos, cabeçalho imóvel, navegação ao início e sugestões de cidade dentro do espaço visível. A lista de cidades considera tanto `visualViewport` quanto a área interna do painel.

`tests/e2e/public.spec.ts` verifica que landing, login, cadastro, recuperação e páginas legais têm rolagem natural, rodapé acessível e ausência de overflow horizontal nas oito larguras, com altura de 600 px. As páginas públicas preservam a identidade visual sem o painel fixo das telas internas.

Não há nova migration, configuração obrigatória de ambiente ou alteração em autenticação, RLS, pontuação e validação de estabelecimentos. A dependência de fonte Inter substitui DM Sans e Manrope. O teste visual usa Chromium; serviços externos nos E2E ficam isolados nas fixtures existentes, conforme `VERIFICACAO.md`.
