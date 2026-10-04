# ESPECIFICAÇÃO MESTRE — PLATAFORMA COLABORATIVA DE DESCOBERTA LOCAL

> Documento de produto, UX e implementação do MVP.
>
> Nome do produto: **[DEFINIR NOME]**
>
> Princípio central:
>
> **UMA PESSOA PROCURA → OUTRA INDICA → A PESSOA ENCONTRA → QUEM AJUDOU GANHA PONTOS.**

---

# 1. VISÃO DO PRODUTO

Criar uma plataforma web mobile-first que ajude pessoas a descobrir **onde encontrar produtos, alimentos, objetos, materiais, peças, serviços ou itens específicos em uma cidade**, usando o conhecimento real de outras pessoas da região.

O produto transforma um comportamento que hoje acontece de forma desorganizada em grupos de WhatsApp, conversas com amigos, posts em redes sociais e indicações boca a boca em uma experiência estruturada, pesquisável e mensurável.

Exemplo:

> “Onde encontro uma garrafa importada da Itália em São José do Rio Preto?”

Outros usuários podem indicar estabelecimentos reais da cidade.

O solicitante visita os locais e, quando encontrar o que procurava, confirma onde encontrou.

Somente as pessoas cuja indicação corresponde ao local confirmado recebem pontos.

A plataforma não é um marketplace e não deve fingir saber se um estabelecimento possui determinado produto. A resposta continua sendo fornecida por pessoas; o mapa serve para identificar corretamente o estabelecimento indicado.

---

# 2. PROBLEMA QUE O PRODUTO RESOLVE

Hoje, quando alguém precisa encontrar algo específico localmente, geralmente precisa:

- pesquisar manualmente no Google;
- abrir vários estabelecimentos;
- telefonar ou mandar mensagem para lojas;
- perguntar em grupos;
- pedir ajuda para amigos;
- publicar em redes sociais;
- percorrer estabelecimentos sem saber se encontrará.

Mesmo quando outra pessoa já sabe a resposta, esse conhecimento está disperso.

A plataforma centraliza esse conhecimento local.

---

# 3. PROPOSTA DE VALOR

Para quem procura:

> **Pergunte à cidade inteira onde encontrar algo.**

Para quem ajuda:

> **Compartilhe o que você sabe, ajude pessoas e construa reputação local.**

Para a plataforma:

> **Transforme conhecimento local disperso em uma base colaborativa de descobertas reais.**

---

# 4. HIPÓTESE PRINCIPAL DO MVP

O MVP deve validar se existe valor suficiente na mecânica:

1. alguém publica algo que procura;
2. outras pessoas indicam locais;
3. o solicitante visita ou verifica os locais;
4. confirma onde encontrou;
5. quem indicou corretamente recebe pontos;
6. a resolução passa a contribuir para o conhecimento acumulado da cidade.

Não implementar funcionalidades que desviem dessa hipótese antes de validá-la.

---

# 5. PRINCÍPIOS DO PRODUTO

## 5.1 Simplicidade

Publicar uma solicitação deve levar poucos segundos.

Indicar um local deve exigir poucos passos.

Confirmar o resultado deve ser evidente.

## 5.2 Conhecimento humano

O sistema não deve pesquisar automaticamente na internet e afirmar que determinado estabelecimento possui o item.

O local é sugerido por uma pessoa.

## 5.3 Reputação baseada em resultado

Responder não gera pontos.

Quantidade de respostas não gera pontos.

Somente uma indicação posteriormente confirmada gera recompensa.

## 5.4 Sem punição automática

Uma indicação não escolhida não significa necessariamente que estava errada.

O produto pode ter acabado, o estabelecimento pode ter mudado ou o solicitante pode ter escolhido outro local.

No MVP:

- sem pontos negativos;
- sem estrelas;
- sem taxa de acerto;
- sem penalidade por não confirmação;
- sem reputação subjetiva.

## 5.5 Mobile-first de verdade

A experiência principal deve ser excelente primeiro em celular e continuar boa em tablet e desktop.

---

# 6. O QUE O MVP NÃO É

Não transformar o MVP em:

- marketplace;
- e-commerce;
- classificados;
- rede social completa;
- sistema de chat;
- sistema de avaliações de lojas;
- comparador de preços;
- plataforma de cupons;
- catálogo de estoque;
- plataforma de anúncios;
- sistema de entrega;
- sistema de pagamentos;
- app de geolocalização em tempo real.

Também não implementar inicialmente:

- moedas;
- XP;
- níveis;
- vidas;
- energia;
- missões;
- badges complexos;
- recompensas financeiras;
- categorias obrigatórias;
- IA decidindo se uma indicação é correta.

---

# 7. DUAS EXPERIÊNCIAS DIFERENTES

A implementação deve separar claramente:

## 7.1 Site público / Landing page

Serve para explicar o produto para quem ainda não conhece a plataforma e converter visitantes em usuários.

## 7.2 Aplicação autenticada

Serve para procurar, publicar, indicar, confirmar resultados, acompanhar solicitações, consultar ranking e perfil.

Não misturar as duas experiências em uma única tela confusa.

---

# 8. LANDING PAGE PÚBLICA

Rota sugerida:

`/`

A landing page precisa explicar a ideia em poucos segundos.

## 8.1 Header

Elementos:

- logo/nome;
- “Como funciona”;
- “Ranking” ou demonstração pública, se existir;
- “Entrar”;
- CTA principal: **Começar agora**.

No mobile, simplificar.

## 8.2 Hero

Mensagem recomendada:

### **Procurando algo na sua cidade? Pergunte para quem conhece.**

Subtexto:

> Publique o que você precisa encontrar, receba indicações de lugares reais e confirme onde encontrou.

CTA principal:

**Perguntar à cidade**

CTA secundário:

**Entender como funciona**

Visual principal:

Uma representação realista da interface mostrando uma solicitação e o fluxo de indicações.

Exemplo visual:

> “Onde encontro uma massa italiana específica?”
>
> São José do Rio Preto — SP
>
> 4 indicações recebidas

Evitar ilustrações genéricas de pessoas segurando celulares.

## 8.3 Demonstração “Como funciona”

Mostrar visualmente 4 etapas:

1. **Pergunte**
2. **Receba indicações**
3. **Encontre**
4. **Confirme e recompense quem ajudou**

A seção deve ser extremamente simples.

## 8.4 Exemplo real do fluxo

Mostrar um exemplo completo:

> Você procura: “Garrafa importada da Itália”

Usuários indicam:

- Empório A
- Empório B
- Empório A

Resultado:

> Encontrado no Empório A

As pessoas que indicaram o Empório A recebem +10 pontos.

Isso explica a mecânica melhor do que parágrafos longos.

## 8.5 Valor acumulado

Explicar que solicitações resolvidas podem formar uma memória coletiva da cidade.

Mensagem:

> **Cada pergunta resolvida torna a cidade um pouco mais fácil de navegar.**

## 8.6 Ranking como prova de comunidade

Mostrar uma pequena prévia visual:

> Pessoas que mais ajudaram em São José do Rio Preto

Não transformar o ranking em elemento dominante da landing page.

## 8.7 CTA final

Mensagem:

> **Não sabe onde encontrar? Talvez alguém da sua cidade saiba.**

Botão:

**Fazer minha primeira pergunta**

---

# 9. DIREÇÃO VISUAL

A interface deve transmitir:

- utilidade;
- confiança;
- proximidade;
- comunidade;
- agilidade;
- modernidade.

Evitar aparência de:

- dashboard SaaS genérico;
- template de IA;
- marketplace;
- rede social adolescente;
- jogo excessivamente gamificado.

## 9.1 Estilo

Preferir:

- fundo claro;
- superfícies limpas;
- tipografia forte;
- contraste alto;
- uma única cor de destaque bem definida;
- bordas discretas;
- sombras sutis;
- bastante respiro;
- ícones simples;
- microinterações funcionais.

Usar cards apenas quando fizerem sentido estruturalmente.

Não colocar cada informação dentro de uma caixa flutuante.

## 9.2 Tipografia

Usar uma família moderna e altamente legível, como Inter ou equivalente.

## 9.3 Movimento

Animações devem ser discretas:

- entrada suave;
- feedback de clique;
- mudança de estado;
- confirmação;
- skeleton/loading.

Não adicionar animações pesadas apenas por estética.

---

# 10. NAVEGAÇÃO DA ÁREA LOGADA

Mobile:

Barra inferior com até quatro destinos principais:

- **Início**
- **Minhas atividades**
- **Ranking**
- **Perfil**

O botão para criar uma nova solicitação deve estar sempre fácil de encontrar.

Desktop:

Pode utilizar header ou sidebar leve, sem transformar a aplicação em dashboard corporativo.

---

# 11. HOME DO APLICATIVO

Rota sugerida:

`/app`

A home logada deve responder imediatamente:

> “O que você está procurando?”

Elementos prioritários:

1. campo principal de busca/pergunta;
2. cidade atual da solicitação;
3. botão para publicar;
4. solicitações abertas da cidade;
5. solicitações resolvidas relevantes;
6. acesso às próprias solicitações.

Exemplo:

### O que você está procurando?

`[ Preciso encontrar... ]`

📍 São José do Rio Preto — SP

**PUBLICAR PEDIDO**

A cidade do perfil é apenas o valor inicial sugerido.

O usuário pode procurar em outra cidade.

---

# 12. BUSCA ANTES DE PUBLICAR

Melhoria importante para o MVP:

Antes de criar uma nova solicitação, procurar solicitações semelhantes já resolvidas na mesma cidade.

Exemplo:

Usuário digita:

> “massa italiana De Cecco”

O sistema pode mostrar:

> “Talvez alguém já tenha procurado algo parecido.”

Se existir uma resolução anterior, mostrar o resultado como conteúdo da própria plataforma.

Isso evita duplicidade e transforma solicitações resolvidas em conhecimento reutilizável.

IMPORTANTE:

- não usar o Google para afirmar que um comércio possui o produto;
- não inventar respostas;
- apenas reutilizar resoluções reais registradas na plataforma;
- permitir ao usuário publicar mesmo assim caso a resposta antiga não seja suficiente.

No MVP, essa busca pode ser textual simples. Não é necessário implementar IA semântica.

---

# 13. AUTENTICAÇÃO

No MVP:

**Google OAuth**

Não criar cadastro tradicional por senha.

No primeiro login:

1. autenticar com Google;
2. criar identidade interna;
3. abrir onboarding;
4. concluir perfil.

Nunca identificar usuários apenas por nome ou e-mail.

Utilizar o identificador único da autenticação.

---

# 14. ONBOARDING

Solicitar somente:

- nome de exibição;
- username único;
- foto;
- cidade principal.

A foto do Google pode ser usada como padrão.

Cidade deve ser estruturada.

Armazenar pelo menos:

- nome da cidade;
- estado;
- país;
- identificador normalizado da cidade.

Não utilizar texto livre como única representação da cidade.

---

# 15. CIDADE DO PERFIL X CIDADE DA SOLICITAÇÃO

Regra:

**cidade do perfil não determina obrigatoriamente a cidade da solicitação.**

Exemplo:

Usuário mora em Mirassol.

Pode procurar algo em São José do Rio Preto.

Pode também indicar um estabelecimento em São José do Rio Preto.

A validação deve considerar a cidade da solicitação e a cidade do estabelecimento indicado, não a residência do usuário.

---

# 16. CRIAÇÃO DE SOLICITAÇÃO

Rota sugerida:

`/pedidos/novo`

Campos obrigatórios:

## O que você está procurando?

Texto livre.

Máximo inicial recomendado: 300 caracteres.

## Cidade

Obrigatória.

Preenchida inicialmente com a cidade do perfil.

Campos opcionais:

## Bairro ou região

Não obrigar.

Não incluir:

- preço;
- orçamento;
- categoria;
- marca obrigatória;
- foto obrigatória.

O sistema deve aceitar solicitações variadas.

---

# 17. SOLICITAÇÕES

Cada solicitação deve possuir:

- id;
- autor;
- descrição;
- cidade;
- bairro/região opcional;
- status;
- quantidade de indicações;
- data de criação;
- data em que as indicações foram reveladas;
- resolução, quando existir.

Cards de solicitação devem mostrar somente o necessário.

Exemplo:

> **Garrafa importada da Itália**
>
> São José do Rio Preto — SP
>
> 3 indicações
>
> Procurando

Antes do momento correto, não revelar os locais indicados.

---

# 18. ESTADOS DA SOLICITAÇÃO

Usar uma máquina de estados simples.

Estados persistidos recomendados:

- `OPEN`
- `REVEALED`
- `RESOLVED`
- `CLOSED_NO_RESULT`
- `CANCELED`

Não criar um estado separado apenas para “possui indicações”.

A existência de indicações deve ser derivada da contagem.

## Transições válidas

`OPEN → REVEALED`

`OPEN → CANCELED`

`REVEALED → RESOLVED`

`REVEALED → CLOSED_NO_RESULT`

`REVEALED → CANCELED`, somente se a regra de produto permitir cancelamento após revelação.

Uma solicitação resolvida ou encerrada não volta a receber indicações.

---

# 19. EDIÇÃO DA SOLICITAÇÃO

Corrigir a ambiguidade do documento anterior.

A descrição, cidade e bairro somente podem ser editados se:

- ainda não existir nenhuma indicação;
- e as respostas ainda não tiverem sido reveladas.

Ou seja:

**zero indicações AND não revelada.**

Depois da primeira indicação, bloquear edição dos dados principais.

O solicitante ainda pode cancelar conforme a regra definida.

---

# 20. INDICAR LOCAL

Rota ou modal:

`/pedidos/[id]/indicar`

Somente usuário autenticado.

Fluxo:

1. clicar em **Indicar local**;
2. pesquisar estabelecimento;
3. selecionar resultado do Google Places;
4. visualizar nome e endereço;
5. adicionar comentário opcional;
6. confirmar indicação.

Comentário:

- opcional;
- máximo inicial de 300 caracteres.

Não aceitar como indicação válida somente um nome digitado manualmente quando o fluxo exige estabelecimento verificável.

---

# 21. REGRA DE UMA INDICAÇÃO POR USUÁRIO

Cada usuário pode criar no máximo uma indicação por solicitação.

Banco:

`UNIQUE(request_id, user_id)`

Não permitir trocar repetidamente de estabelecimento depois de enviar para tentar aumentar chance de acerto.

---

# 22. AUTOINDICAÇÃO

O autor da solicitação nunca pode indicar um local para sua própria solicitação.

Validar no backend.

Nunca confiar apenas em botão escondido no frontend.

---

# 23. VALIDAÇÃO DO ESTABELECIMENTO

O local indicado precisa pertencer à cidade da solicitação.

Exemplo:

Solicitação:

> São José do Rio Preto — SP

Não aceitar automaticamente um estabelecimento em:

- Mirassol;
- Catanduva;
- Bady Bassitt;
- Cedral;
- outra cidade.

## Estratégia

O cliente envia o `place_id`.

O backend deve consultar/validar os dados oficiais do local novamente.

Não confiar em:

- nome enviado pelo navegador;
- endereço enviado pelo navegador;
- cidade enviada pelo navegador;
- latitude/longitude enviada pelo navegador como prova final.

Comparar componentes estruturados de endereço e a cidade normalizada.

Se não for possível validar com segurança, rejeitar a indicação e informar o usuário.

---

# 24. GOOGLE PLACES

Usar a API oficial atual do Google Places.

Usar `place_id` como identificador externo do estabelecimento.

Armazenar somente os dados necessários, por exemplo:

- `place_id`;
- nome;
- endereço formatado;
- latitude;
- longitude;
- cidade;
- estado;
- país;
- referência/URL quando permitido.

Respeitar políticas, atribuições e regras de armazenamento da API utilizada.

Utilizar restrições adequadas nas chaves.

Preferir máscaras de campos e evitar chamadas desnecessárias.

---

# 25. MESMO LOCAL INDICADO POR VÁRIAS PESSOAS

Exemplo:

João → Empório A

Maria → Empório A

Carlos → Empório B

Na interface do solicitante:

> **Empório A**
>
> 2 pessoas indicaram este local

As indicações continuam sendo registros independentes.

Agrupar visualmente por `place_id`.

Não criar três estabelecimentos diferentes para o mesmo local.

---

# 26. SISTEMA ANTI-CÓPIA

Antes do solicitante revelar respostas, ele vê apenas:

> 4 indicações recebidas

Botão:

**VER INDICAÇÕES**

Outros usuários também não devem poder visualizar os locais de outras indicações enquanto ainda puderem responder.

Ao solicitante clicar em **VER INDICAÇÕES**:

1. backend registra `responses_revealed_at`;
2. status muda de `OPEN` para `REVEALED`;
3. novas indicações ficam bloqueadas;
4. as respostas são mostradas ao solicitante.

Isso impede:

1. usuário abrir respostas;
2. copiar um estabelecimento já indicado;
3. publicar a mesma resposta;
4. tentar ganhar pontos por cópia.

A operação precisa ser atômica no backend.

---

# 27. VISUALIZAÇÃO DAS INDICAÇÕES

Depois da revelação, mostrar ao solicitante:

- estabelecimento;
- endereço;
- mapa/link;
- nome da pessoa;
- username;
- foto;
- comentário, se existir;
- data/hora;
- convergência de pessoas no mesmo local.

Agrupar primeiro por estabelecimento e, dentro dele, mostrar quem indicou.

Exemplo:

> **Empório A**
>
> 3 pessoas indicaram este local
>
> João — “Comprei lá semana passada.”
>
> Maria
>
> Carlos

---

# 28. VISIBILIDADE PARA OUTROS USUÁRIOS

Enquanto a solicitação estiver aberta ou apenas revelada:

- somente o solicitante vê o conteúdo completo das indicações;
- outros usuários não veem os estabelecimentos indicados.

Depois que a solicitação for resolvida, o MVP pode exibir o local confirmado como conhecimento histórico da cidade.

Isso aumenta a utilidade acumulada da plataforma sem comprometer o mecanismo anti-cópia, porque a solicitação já estará encerrada.

Não exibir dados pessoais desnecessários.

---

# 29. CONFIRMAÇÃO DO RESULTADO

Depois de revelar as indicações, o solicitante pode escolher:

## ENCONTREI

Seleciona exatamente um **estabelecimento indicado**.

## ENCONTREI EM OUTRO LOCAL

Permite encerrar registrando que o local vencedor não veio das indicações.

Ninguém recebe pontos.

Se for simples e permitido pela integração, o usuário pode selecionar o outro local no Maps apenas para registrar o resultado.

## NÃO ENCONTREI

Encerra sem recompensa.

Ninguém perde pontos.

---

# 30. CORREÇÃO IMPORTANTE: A RESOLUÇÃO SELECIONA O LOCAL

Não modelar a resolução exclusivamente como `selected_indication_id`.

Isso cria conflito quando várias pessoas indicaram o mesmo estabelecimento.

Exemplo:

João → Empório A

Maria → Empório A

Solicitante confirma:

> Encontrei no Empório A.

Resultado esperado:

João +10

Maria +10

Portanto, a resolução deve identificar o **local confirmado**.

Exemplo de modelagem:

- `resolution_place_id`;
- `resolution_type`;
- `resolved_at`.

Depois, o sistema recompensa todas as indicações elegíveis daquela solicitação cujo local corresponde ao local confirmado.

---

# 31. PONTUAÇÃO

Regra inicial:

**indicação confirmada = +10 pontos**

Nada além disso.

Não usar:

- multiplicadores;
- streaks;
- bônus por velocidade;
- penalidade;
- pontos negativos;
- bônus por quantidade de respostas.

---

# 32. LEDGER DE RECOMPENSAS

Nunca depender apenas de um campo mutável como:

`users.points = 1230`

Criar um histórico auditável de eventos de pontuação.

Exemplo:

`SUCCESSFUL_INDICATION_REWARD`

Campos:

- id;
- user_id;
- request_id;
- indication_id;
- type;
- points;
- city_id;
- created_at.

Criar restrições de unicidade.

Exemplo:

`UNIQUE(indication_id, type)`

Também garantir que um mesmo usuário não receba duas recompensas pela mesma solicitação e mesmo tipo de evento.

O saldo exibido pode ser soma do ledger ou cache derivado.

---

# 33. IDEMPOTÊNCIA

Duplo clique, refresh, retry, conexão lenta ou duas requisições não podem duplicar pontos.

A confirmação deve ser idempotente.

O banco deve impedir a duplicação mesmo se o frontend falhar.

---

# 34. CONCORRÊNCIA

Tratar de forma transacional operações críticas.

## Caso A — indicação e revelação simultâneas

Se a indicação for confirmada no banco antes da revelação, ela entra.

Se a revelação bloquear primeiro, a indicação é rejeitada.

Nunca existir indicação criada depois do bloqueio lógico.

## Caso B — duas confirmações simultâneas

Somente uma pode resolver a solicitação.

A segunda recebe resposta de que a solicitação já foi encerrada.

Nenhuma recompensa adicional é criada.

## Caso C — vários usuários indicando ao mesmo tempo

Usuários diferentes podem indicar normalmente enquanto a solicitação estiver aberta.

---

# 35. RANKING

Ranking baseado apenas em evidências objetivas.

Mostrar:

- posição;
- foto;
- nome;
- username;
- pontos;
- quantidade de indicações confirmadas.

Não mostrar “taxa de acerto”.

## Ranking por cidade

Os pontos pertencem à cidade da **solicitação resolvida**, e não à cidade do perfil do usuário.

Exemplo:

Maria mora em Mirassol.

Ajuda alguém em São José do Rio Preto.

Os +10 contam para São José do Rio Preto.

## Desempate

1. maior pontuação;
2. maior número de confirmações;
3. data da primeira confirmação;
4. id estável como último critério técnico, se necessário.

Nunca aleatório.

---

# 36. PERFIL

Rota sugerida:

`/perfil/[username]`

Mostrar:

- foto;
- nome;
- username;
- cidade principal;
- pontos;
- indicações confirmadas.

No perfil do próprio usuário, também mostrar:

- solicitações criadas;
- indicações realizadas;
- confirmações;
- histórico de pontos.

Não mostrar e-mail, identificador OAuth ou informações privadas.

---

# 37. MINHAS ATIVIDADES

Criar uma tela simples para o usuário não precisar “caçar” o que aconteceu.

Seções:

- Minhas solicitações;
- Pedidos aguardando minha decisão;
- Indicações que fiz;
- Indicações confirmadas;
- Encerrados.

Badges simples podem indicar:

> 3 novas indicações

Não é necessário implementar push notification no primeiro MVP.

---

# 38. SOLICITAÇÕES RESOLVIDAS COMO BASE DE CONHECIMENTO

Uma melhoria estratégica importante:

Solicitações resolvidas não devem desaparecer.

Elas podem ser reutilizadas como conhecimento histórico.

Exemplo:

> “Onde encontro farinha Caputo?”
>
> Encontrado no Empório X
>
> Resolvido há 12 dias

Isso cria efeito de rede:

quanto mais o app é usado, mais útil fica.

Porém, deixar claro que uma resolução histórica não garante estoque atual.

Mensagem sugerida:

> “Este item foi encontrado neste local em [data]. A disponibilidade pode ter mudado.”

---

# 39. MODERAÇÃO E ANTIABUSO

Implementar mínimo necessário:

- rate limit;
- bloquear usuário;
- remover conteúdo;
- denunciar solicitação;
- denunciar indicação;
- logs;
- validação de texto;
- proteção contra manipulação de IDs;
- proteção contra XSS;
- autorização no backend.

Não criar sistema automatizado de punição complexo.

## Fraude de ranking

Registrar sinais para auditoria, sem bloquear automaticamente no MVP:

- muitas confirmações repetidas entre o mesmo par de usuários;
- volume anormal;
- criação e confirmação em intervalos muito curtos;
- contas recém-criadas interagindo repetidamente entre si.

Administrador pode revisar.

---

# 40. PAINEL ADMINISTRATIVO

Rota interna:

`/admin`

Apenas administradores.

Funcionalidades mínimas:

## Usuários

- listar;
- pesquisar;
- visualizar;
- bloquear/desbloquear.

## Solicitações

- buscar;
- visualizar;
- encerrar/remover conteúdo inadequado.

## Indicações

- visualizar;
- remover quando necessário.

## Recompensas

- histórico auditável.

## Logs

- login;
- cadastro;
- criação;
- indicação;
- revelação;
- resolução;
- recompensa;
- cancelamento;
- bloqueio;
- ação administrativa.

Não criar CMS completo.

---

# 41. MODELO DE DADOS RECOMENDADO

O banco deve ser relacional.

## `profiles`

- `id` UUID, relacionado ao usuário autenticado;
- `username` único;
- `display_name`;
- `avatar_url`;
- `home_city_id`;
- `status`;
- `created_at`;
- `updated_at`.

## `cities`

- `id`;
- `name`;
- `state_name`;
- `state_code`;
- `country_name`;
- `country_code`;
- identificador externo quando disponível;
- `slug`/chave normalizada.

Centralizar cidades evita variações de texto e melhora ranking.

## `requests`

- `id`;
- `requester_id`;
- `description`;
- `city_id`;
- `neighborhood`;
- `status`;
- `responses_revealed_at`;
- `created_at`;
- `updated_at`;
- `canceled_at`.

## `places`

- `id`;
- `google_place_id` único;
- `name`;
- `formatted_address`;
- `latitude`;
- `longitude`;
- `city_id`;
- `state`;
- `country`;
- `maps_uri`;
- `last_verified_at`.

## `indications`

- `id`;
- `request_id`;
- `user_id`;
- `place_id`;
- `comment`;
- `created_at`.

Constraint:

`UNIQUE(request_id, user_id)`

## `request_resolutions`

- `id`;
- `request_id` único;
- `type`;
- `place_id` nullable;
- `resolved_by`;
- `created_at`.

Tipos sugeridos:

- `INDICATED_PLACE`
- `OTHER_PLACE`
- `NOT_FOUND`

## `reward_events`

- `id`;
- `user_id`;
- `request_id`;
- `indication_id`;
- `city_id`;
- `type`;
- `points`;
- `created_at`.

Unicidade suficiente para garantir idempotência.

## `reports`

- `id`;
- `reporter_id`;
- `target_type`;
- `target_id`;
- `reason`;
- `status`;
- `created_at`.

## `audit_logs`

- `id`;
- `actor_id`;
- `event_type`;
- `entity_type`;
- `entity_id`;
- metadados seguros;
- `created_at`.

Não salvar segredos nos logs.

---

# 42. AUTORIZAÇÃO

Todas as regras críticas precisam existir no servidor e/ou banco.

## Visitante

Pode:

- ver landing page;
- ver conteúdo público permitido;
- iniciar login.

## Usuário autenticado

Pode:

- criar solicitação;
- indicar em solicitações de terceiros;
- acompanhar atividades;
- consultar ranking;
- editar o próprio perfil.

## Solicitante

Em sua própria solicitação, pode:

- revelar indicações;
- resolver;
- encerrar;
- cancelar conforme regra;
- editar somente antes da primeira indicação.

## Administrador

Pode moderar conforme permissões específicas.

Nunca confiar em `user_id` enviado pelo cliente como prova de identidade.

---

# 43. SEGURANÇA

Obrigatório:

- autenticação validada no servidor;
- autorização por recurso;
- Row Level Security, quando aplicável;
- menor privilégio;
- validação de schema;
- sanitização/escape;
- rate limiting;
- proteção contra IDOR;
- constraints no banco;
- transações para operações críticas;
- chaves secretas apenas no servidor;
- chaves públicas do Google com restrições apropriadas;
- logs sem dados sensíveis.

Nenhuma regra crítica pode existir somente no frontend.

---

# 44. STACK RECOMENDADA

Se o projeto ainda não possui stack definida, utilizar uma arquitetura simples e moderna:

## Frontend e aplicação web

- Next.js com App Router;
- TypeScript;
- React;
- CSS/Tailwind CSS com design system próprio;
- componentes acessíveis;
- evitar dependência excessiva de bibliotecas de UI prontas.

## Backend

Utilizar os recursos server-side do Next.js para operações da aplicação:

- Server Functions/Actions quando fizer sentido;
- Route Handlers para APIs e integrações;
- validação explícita de sessão e autorização.

## Banco/Auth

Supabase:

- PostgreSQL;
- Supabase Auth com Google;
- Row Level Security;
- migrations;
- funções/transações no banco para operações críticas.

## Mapas

Google Maps Platform / Places API atual.

## Validação

Zod ou equivalente.

## Testes

- unitários/integrados para regras;
- Playwright para fluxos críticos de ponta a ponta.

## Deploy

Arquitetura compatível com deploy serverless moderno, como Vercel + Supabase.

Não adicionar Docker, Kubernetes, filas, microserviços ou infraestrutura complexa sem necessidade real.

---

# 45. ORGANIZAÇÃO SUGERIDA

Exemplo:

```text
src/
  app/
    (public)/
      page.tsx
    (auth)/
      onboarding/
      app/
      pedidos/
      ranking/
      perfil/
      admin/
    api/
  components/
    ui/
    requests/
    places/
    ranking/
    profile/
  features/
    auth/
    requests/
    indications/
    resolutions/
    rewards/
    moderation/
  lib/
    supabase/
    google/
    validation/
    auth/
    permissions/
  server/
    services/
    repositories/
    transactions/
  types/
  styles/

supabase/
  migrations/
  tests/

tests/
  unit/
  integration/
  e2e/
```

Adaptar se a estrutura real do projeto exigir outra organização.

---

# 46. COMPONENTES PRINCIPAIS

Criar componentes reutilizáveis, sem fragmentar excessivamente.

Exemplos:

- `RequestComposer`
- `RequestCard`
- `RequestStatus`
- `CitySelector`
- `PlaceSearch`
- `PlaceResult`
- `IndicationGroup`
- `RevealIndicationsButton`
- `ResolutionDialog`
- `RankingList`
- `UserAvatar`
- `EmptyState`
- `ErrorState`
- `LoadingState`

---

# 47. UX DE ERROS

Nunca mostrar erro técnico bruto.

Exemplos:

## Local fora da cidade

> Este estabelecimento fica em outra cidade. Escolha um local dentro de São José do Rio Preto.

## Você já indicou

> Você já fez uma indicação para esta solicitação.

## Respostas já reveladas

> As indicações desta solicitação já foram abertas e novas respostas não são mais aceitas.

## Solicitação encerrada

> Esta solicitação já foi encerrada.

## Maps indisponível

> Não foi possível validar este estabelecimento agora. Tente novamente em instantes.

---

# 48. ESTADOS VAZIOS

Nunca deixar telas sem contexto.

Exemplos:

## Nenhuma solicitação aberta

> Ainda não há pedidos por aqui. Que tal ser a primeira pessoa a perguntar?

## Nenhuma indicação

> Ainda ninguém indicou um local.

## Ranking vazio

> Ainda não existem pontos nesta cidade.

## Nenhuma atividade

> Suas perguntas e indicações aparecerão aqui.

---

# 49. ACESSIBILIDADE

Implementar:

- navegação por teclado;
- foco visível;
- labels reais;
- contraste adequado;
- áreas de toque confortáveis;
- mensagens de erro associadas aos campos;
- estados não dependentes apenas de cor;
- suporte a leitores de tela nos fluxos principais.

---

# 50. PERFORMANCE

Priorizar:

- Server Components onde forem úteis;
- carregamento sob demanda;
- paginação;
- cache apenas quando seguro;
- imagens otimizadas;
- poucas chamadas à API do Maps;
- field masks;
- evitar refetch desnecessário;
- skeletons curtos em vez de spinners eternos.

Não carregar todas as solicitações da cidade de uma vez.

---

# 51. RESPONSIVIDADE

Testar pelo menos:

- 320 px;
- 375 px;
- 390 px;
- 414 px;
- 768 px;
- 1024 px;
- 1280 px;
- 1440 px.

A interface não deve apenas “caber” no desktop; deve utilizar bem o espaço disponível.

---

# 52. TESTES OBRIGATÓRIOS

Criar testes para:

1. login Google;
2. onboarding;
3. criação de solicitação;
4. usuário sem login tentando indicar;
5. autoindicação;
6. segunda indicação pelo mesmo usuário;
7. local fora da cidade;
8. usuário de outra cidade indicando local válido;
9. duas pessoas indicando o mesmo `place_id`;
10. contagem de indicações sem revelar conteúdo;
11. revelação bloqueando novas respostas;
12. corrida entre indicação e revelação;
13. confirmação de local indicado por uma pessoa;
14. confirmação de local indicado por várias pessoas;
15. `+10` para todos os indicantes do mesmo local confirmado;
16. nenhuma recompensa para outros locais;
17. “não encontrei” sem recompensa;
18. “encontrei em outro local” sem recompensa;
19. duplo clique em confirmar;
20. requisição de confirmação repetida;
21. confirmação simultânea em dois dispositivos;
22. solicitação cancelada recebendo tentativa de indicação;
23. solicitação resolvida recebendo tentativa de indicação;
24. edição depois da primeira indicação;
25. manipulação de IDs;
26. acesso indevido aos dados de outro usuário;
27. RLS/grants;
28. ranking por cidade da solicitação;
29. ledger sem duplicidade;
30. falha/timeout do Google Places.

---

# 53. CRITÉRIOS DE ACEITAÇÃO DO MVP

O MVP somente é considerado funcional quando o seguinte ciclo completo puder acontecer:

**LOGIN GOOGLE**

→ **ONBOARDING**

→ **CRIAR SOLICITAÇÃO**

→ **OUTRA PESSOA INDICAR UM LOCAL REAL**

→ **BACKEND VALIDAR O LOCAL**

→ **RECEBER OUTRAS INDICAÇÕES**

→ **SOLICITANTE VER APENAS A QUANTIDADE**

→ **SOLICITANTE REVELAR**

→ **BLOQUEAR NOVAS INDICAÇÕES**

→ **VISUALIZAR OS LOCAIS**

→ **CONFIRMAR ONDE ENCONTROU**

→ **RECOMPENSAR TODOS QUE INDICARAM AQUELE LOCAL**

→ **CRIAR RECOMPENSA UMA ÚNICA VEZ**

→ **ATUALIZAR RANKING**

→ **REGISTRAR RESOLUÇÃO**

→ **EXIBIR HISTÓRICO**

Tudo deve continuar correto com:

- refresh;
- duplo clique;
- retry;
- conexão lenta;
- duas abas;
- múltiplos dispositivos;
- operações simultâneas;
- IDs manipulados;
- usuário malicioso;
- erro da API externa.

---

# 54. ORDEM RECOMENDADA DE IMPLEMENTAÇÃO

## Fase 1 — fundação

- Next.js/TypeScript;
- design system;
- Supabase;
- autenticação Google;
- migrations;
- perfis;
- cidades;
- RLS.

## Fase 2 — núcleo

- criar solicitação;
- feed;
- detalhe;
- busca de locais;
- criar indicação;
- validar cidade.

## Fase 3 — mecânica crítica

- anti-cópia;
- revelação transacional;
- resolução;
- reward ledger;
- idempotência;
- concorrência.

## Fase 4 — produto

- ranking;
- perfil;
- minhas atividades;
- busca em resoluções anteriores;
- estados vazios;
- loading/error.

## Fase 5 — site público

- landing page;
- exemplos;
- CTA;
- SEO;
- Open Graph.

## Fase 6 — confiança

- admin;
- reports;
- rate limits;
- logs;
- testes;
- hardening.

---

# 55. SEO DA LANDING PAGE

A parte pública deve possuir:

- title;
- description;
- canonical;
- Open Graph;
- favicon;
- sitemap;
- robots;
- metadata por ambiente;
- conteúdo semântico;
- boa performance;
- páginas legais básicas quando necessário.

A aplicação autenticada não precisa ser indexada.

---

# 56. ANALYTICS DO MVP

Medir somente eventos importantes para validar o produto:

- landing visitada;
- CTA clicado;
- cadastro concluído;
- solicitação criada;
- primeira indicação recebida;
- respostas reveladas;
- solicitação resolvida;
- indicação confirmada;
- tempo até primeira indicação;
- tempo até resolução.

Não coletar dados pessoais desnecessários.

---

# 57. MÉTRICAS QUE IMPORTAM

Principais métricas de validação:

## Liquidez

Percentual de solicitações que recebem ao menos uma indicação.

## Tempo para primeira indicação

Quanto tempo leva para alguém ajudar.

## Resolução

Percentual de solicitações que terminam com local confirmado.

## Reutilização

Quantas buscas encontram conhecimento já resolvido anteriormente.

## Contribuição

Quantidade de usuários que não apenas perguntam, mas também ajudam.

Não otimizar apenas cadastro ou pageview.

---

# 58. DECISÕES QUE A IA NÃO DEVE TOMAR SOZINHA

Não inventar:

- nome definitivo;
- logo definitiva;
- monetização;
- plano premium;
- publicidade;
- categorias;
- sistema financeiro;
- parcerias comerciais;
- recompensas materiais;
- regras de negócio não descritas.

Quando uma decisão não estiver especificada, escolher a alternativa mais simples e documentar.

---

# 59. REGRAS ABSOLUTAS PARA IMPLEMENTAÇÃO

1. Não reescrever a ideia como marketplace.
2. Não adicionar features “legais” fora do MVP.
3. Não usar Maps como fonte da resposta sobre disponibilidade do produto.
4. Não dar pontos no momento da indicação.
5. Não dar pontos por quantidade de respostas.
6. Não descontar pontos.
7. Não permitir autoindicação.
8. Não permitir mais de uma indicação por usuário e solicitação.
9. Não permitir novas indicações depois da revelação.
10. Não confiar no cliente para validar localização.
11. Não confiar no cliente para autorização.
12. Não duplicar recompensas.
13. Não selecionar apenas uma `indication_id` quando várias pessoas indicarem o local vencedor.
14. Não expor dados privados.
15. Não implementar regra crítica somente no frontend.
16. Não criar visual genérico de dashboard.
17. Não sacrificar mobile para favorecer desktop.
18. Não usar dados históricos como garantia de estoque atual.

---

# 60. DEFINIÇÃO FINAL DO PRODUTO

A plataforma é uma rede colaborativa de conhecimento local.

Ela não responde automaticamente:

> “essa loja vende isso”.

Ela permite que pessoas respondam:

> “eu sei onde você pode encontrar”.

A plataforma então registra:

- quem ajudou;
- qual lugar foi indicado;
- onde a pessoa realmente encontrou;
- quais contribuições foram confirmadas.

O ciclo central deve continuar sendo:

> **PROCURE → RECEBA INDICAÇÕES → ENCONTRE → CONFIRME → RECOMPENSE QUEM AJUDOU.**

Todo o restante é secundário.
