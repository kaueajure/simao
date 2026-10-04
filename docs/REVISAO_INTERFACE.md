# Revisão da interface e da seleção de cidades

Revisão em 4 de outubro de 2026. A especificação continua sendo a referência funcional; esta alteração atende à busca automática de cidades e corrige problemas de apresentação e interação.

O visual foi posteriormente unificado com o protótipo Figma do usuário; consulte [PADRAO_VISUAL.md](./PADRAO_VISUAL.md) para a identidade atual e os ajustes adicionais. A navegação móvel agora abre abaixo do cabeçalho, liberando a área inferior para sugestões e conteúdo.

## Problemas corrigidos

| Local                                  | Problema                                                                                               | Correção                                                                                                                                                             |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/app/globals.css:587`              | Campos do feed em alturas diferentes; botão posicionado por uma margem fixa.                           | Labels, campos e ajuda usam linhas compartilhadas de grid. Inputs e botões têm 52 px. Em 1024 px ou mais, os três controles ficam alinhados.                         |
| `src/app/globals.css:1196`             | Filtro do ranking repetia o alinhamento por margem fixa.                                               | Mesmo alinhamento estrutural do feed; controles ocupam a largura disponível no celular.                                                                              |
| `src/components/city-selector.tsx:5`   | Cidade exigia clicar em Buscar, sem sugestões durante a digitação.                                     | Autocomplete compartilhado no onboarding, perfil, pedidos, feed e ranking. Busca após 300 ms, a partir de duas letras.                                               |
| `src/app/api/cities/route.ts:5`        | Busca limitada ao começo do nome e sem distinguir UF na consulta.                                      | Busca por parte do nome, normalização de acentos e filtro de UF opcional, como “Bom Jesus RS”. Resultados nacionais, com município e UF.                             |
| `src/components/city-selector.tsx:29`  | Lista poderia sair da tela ou ficar atrás da navegação inferior.                                       | Lista sobreposta ao formulário, com altura limitada ao espaço disponível; abre acima quando necessário. Considera `visualViewport` e navegação móvel.                |
| `src/components/city-selector.tsx:5`   | Seleção não oferecia controle completo por teclado e poderia exibir resposta antiga.                   | Setas, Enter, Escape e Tab; sem envio acidental. `AbortController` cancela buscas anteriores. Texto livre limpa o identificador e exige selecionar uma sugestão.     |
| `src/components/action-form.tsx:24`    | Uma falha da action apagava campos preenchidos.                                                        | Cancela o reset nativo somente quando a action retorna erro. Mantém os dados no próprio formulário, sem armazenamento separado; foca o campo com erro ou a mensagem. |
| `src/server/actions.ts:37`             | Salvar perfil levava a pessoa ao feed.                                                                 | Edição permanece no perfil, com “Perfil atualizado.”; onboarding continua levando ao feed.                                                                           |
| `src/app/globals.css:408`              | Nomes, bairros e comentários longos podiam forçar larguras em flex/grid.                               | Colunas com `minmax(0, 1fr)`, limites de largura, quebra de texto e truncamento apenas no nome do cabeçalho.                                                         |
| `src/components/navigation.tsx:10`     | Menu desktop não indicava a página atual.                                                              | Estado ativo visual e `aria-current`; também aplicado aos filtros de feed, atividades e administração.                                                               |
| `src/components/scrollable-tabs.tsx:4` | Aba ativa de atividades/admin ficava fora da área visível no celular.                                  | A lista rola horizontalmente até a aba selecionada, inclusive após redimensionar; não desloca a página na vertical.                                                  |
| `src/components/ui.tsx:72`             | “Página 1” aparecia mesmo sem haver outra página.                                                      | Paginação aparece quando há navegação útil; páginas posteriores mantêm o retorno.                                                                                    |
| `src/components/place-search.tsx:25`   | Enter podia iniciar pesquisa curta ou repetida; resultados atrasados e mensagens de rede pouco claras. | Mesmas condições do botão, cancelamento de busca ao editar, limpeza de resultados antigos e erro de rede traduzido.                                                  |

## Fonte das cidades

A API `/api/cities` consulta o catálogo nacional de **5.571 municípios do IBGE**, já importado pelas migrations. Não limita sugestões à cidade do perfil. A aplicação faz requisições conforme a pessoa digita, sem depender de Google Places, billing ou nova chave.

O importador usa a API oficial `https://servicodados.ibge.gov.br/api/v1/localidades/municipios?orderBy=nome`. A busca retorna até 20 sugestões por consulta; digitar mais letras ou incluir a UF refina os resultados. Atualizações do catálogo continuam sendo feitas com `npm run cities:update`, revisão da migration e aplicação no banco.

O formulário envia o identificador estruturado da cidade. Validação, autorização e constraints continuam no servidor e no PostgreSQL. O catálogo municipal não comprova disponibilidade de produtos nem substitui a validação dos estabelecimentos no Google Places.

## Verificação

- Medidas reais de posição e altura dos campos no Chromium em 320, 375, 390, 414, 768, 1024, 1280 e 1440 px.
- Landing, acesso por e-mail, criação, edição, indicação, detalhe aberto/revelado, atividades, ranking, perfil próprio e público, áreas administrativas, páginas legais e página ausente.
- Screenshots em `test-results/`, com inspeção visual dos estados representativos.
- Testes de sugestões automáticas, debounce, teclado, toque em contexto móvel, seleção obrigatória, falha/retry, resposta atrasada, ausência de resultados, UF e municípios de todas as regiões.
- Perfil com nome de 60 caracteres, bairro de 100 caracteres, comentário de 300 caracteres e descrição longa sem espaços; inspeção do ranking e do histórico de recompensas.
- Consulta de leitura ao localhost com a configuração real: HTTP 200 e municípios corretos para Manaus/AM, Salvador/BA e “Rio Preto SP”.

O navegador integrado da sessão não estava disponível; os testes usam o Playwright do próprio repositório. A revisão cobre Chromium e emulação de toque. Safari, Firefox e teclado virtual em aparelhos físicos não foram verificados nesta alteração. As integrações de autenticação/Places nos E2E continuam isoladas em fixtures de teste e PostgreSQL temporário.

Para testar sem sobrescrever um `npm run dev` em execução, use:

```bash
NEXT_DIST_DIR=.next-review npm run build
NEXT_DIST_DIR=.next-review npm run test:e2e
```

Não há nova dependência, variável obrigatória de ambiente ou migration para estas correções.
