# Referências para UI de mockup de iPhone e dashboard de vídeo/social

Pesquisa feita em 23/09/2026. O foco foi encontrar padrões de primeira parte que possam orientar a seção interativa em `components/Observatory.tsx`: uma prévia de plataforma com seleção de vídeos, comparação temporal, métricas e gráfico de evolução.

## Fontes primárias

### Apple Design Resources — molduras e UI de iPhone

O portal oficial reúne o **iOS UI Kit** e uma área de **Product Bezels** com molduras de iPhone, incluindo o arquivo “iPhone Duo” e modelos de gerações recentes. A Apple também aponta as diretrizes de identidade e marketing que acompanham o uso das molduras. [Apple Design Resources](https://developer.apple.com/design/resources/)

Padrão útil para o mockup: separar visualmente a moldura física do viewport da interface. A moldura deve funcionar como uma casca consistente, enquanto o conteúdo interno conserva o recorte, a proporção vertical e as áreas seguras do sistema. Essa é uma recomendação de composição derivada dos templates oficiais; não é necessário reproduzir a interface inteira do iOS para comunicar que a tela está em um iPhone.

### Apple Human Interface Guidelines — Charts

As diretrizes de gráficos descrevem uma anatomia composta por área de plotagem, marcas, eixos, linhas de grade, ticks e rótulos. Recomendam manter os dados como elemento mais proeminente, usando eixos e descrições como contexto; em espaços compactos, a área de plotagem deve ganhar largura e os rótulos dos eixos devem ser curtos. Também recomendam um título informativo, um resumo da mensagem principal e uma interação que permita explorar valores ao longo da série. [Apple HIG — Charts](https://developer.apple.com/design/human-interface-guidelines/charts)

Aplicação à seção: preservar no gráfico uma leitura simples de “o que mudou” (linha, pontos e marco de 100 mil), mas colocar o contexto em uma legenda curta e num resumo textual. No mobile, a área de dados deve continuar sendo a maior parte do componente; detalhes podem aparecer ao tocar ou deslizar sobre o plot. A diretriz também pede rótulos acessíveis com contexto — por exemplo, valor e dia — em vez de apenas anunciar o número.

### Apple Human Interface Guidelines — Accessibility

As diretrizes de acessibilidade pedem que diferenças de estado e significado não dependam somente de cor, e que a interface aceite texto maior e seja descrita para VoiceOver. [Apple HIG — Accessibility](https://developer.apple.com/design/human-interface-guidelines/accessibility)

Aplicação à seção: indicar crescimento, critério atingido e estado temporal com texto, ícone ou forma além da cor; manter contraste entre fundo, métricas, linha e limiar; e dar ao gráfico e aos controles rótulos que expliquem a ação. Isso é especialmente importante quando a paleta escura e os acentos vivos forem usados como linguagem visual.

### YouTube Analytics — estrutura de um dashboard de vídeo

O YouTube Studio organiza a análise em abas com papéis distintos: Overview, Content, Reach, Engagement, Audience, Revenue e Trends. A visão geral resume o desempenho; Content permite filtrar por tipo; Reach reúne impressões, taxa de cliques, views e viewers únicos; Engagement mostra watch time, duração média e engaged views; Audience expõe audiência mensal, inscritos e segmentos de espectadores. O Advanced Mode permite comparar desempenho e exportar o relatório. [Get started with YouTube Analytics](https://support.google.com/youtube/answer/9002587?hl=en)

Padrões transferíveis:

- hierarquia em camadas: resumo primeiro, explicação por dimensão depois;
- filtros e abas com verbos claros para trocar o recorte sem perder o contexto;
- cartões de métricas que agrupam alcance, atenção e audiência, em vez de misturar todos os números;
- comparação temporal como ação explícita, útil para diferenciar o primeiro registro de uma janela observada.

Para a `Observatory`, isso valida a sequência “identificação do vídeo → período → números principais → evolução → leitura”. O conjunto atual de visualizações, curtidas e compartilhamentos pode ganhar uma distinção semântica entre alcance e ação, caso novas métricas sejam incluídas.

### TikTok Studio — visão compacta com conteúdo recente

O TikTok descreve o Studio como um espaço de criação, gerenciamento e análise. Na web, a página inicial reúne visão da conta com métricas-chave, prévias dos vídeos recentes e comentários mais novos. A área de Analytics se divide em Key metrics, Content e Followers; posts individuais expõem detalhes como likes, shares e views. [TikTok — Creator tools on TikTok](https://support.tiktok.com/en/using-tiktok/creating-videos/creator-tools-on-tiktok)

Padrões transferíveis:

- uma coluna ou faixa de itens recentes dá contexto visual para os números;
- biblioteca de vídeos e análise detalhada podem coexistir no mesmo fluxo;
- o detalhe do post deve manter o vínculo entre capa, título, plataforma e métricas;
- comentários ou sinais qualitativos podem aparecer como evidência adjacente, sem competir com o KPI principal.

Isso apoia a biblioteca lateral da seção atual e sugere que cada item selecionado deve manter a capa como âncora visual, enquanto a área de análise mostra o recorte temporal e o insight derivado.

### Meta for Business — formato vertical e safe zone para Reels

O material oficial de Reels trata o formato como uma experiência mobile imersiva e recomenda criativos verticais 9:16 com áudio e mensagens-chave dentro da safe zone. A mesma página orienta testar a criação nativa para Reels e disponibiliza um verificador de safe zone. [Meta for Business — Instagram & Facebook Reels](https://www.facebook.com/business/ads/facebook-instagram-reels-ads)

Aplicação ao mockup: usar o viewport do telefone em 9:16 para capas e telas de vídeo; reservar margens internas para que título, ícone de plataforma, métrica e CTA não encostem no recorte do aparelho; tratar a capa como conteúdo principal, não como textura de fundo. A referência é específica de Reels e deve ser entendida como orientação para o painel de vídeo vertical, não como regra para todos os formatos sociais.

## Síntese visual para a seção

| Decisão | Padrão de referência | Consequência para a composição |
| --- | --- | --- |
| Mockup de iPhone | Moldura oficial + viewport vertical da Apple; formato 9:16 de Reels | Uma tela dominante, com moldura física legível e conteúdo interno protegido por safe area |
| Cabeçalho do dashboard | Overview, filtros e dimensões do YouTube Studio | Identificação do vídeo, plataforma e período antes dos números |
| Métricas | Cards de alcance, atenção e audiência do YouTube; views/likes/shares do TikTok | Poucos KPIs primários, cada um com nome completo e unidade; comparação com o primeiro registro quando existir |
| Gráfico | Anatomia de Charts da Apple | Linha e pontos em plot amplo, grade discreta, limiar nomeado e rótulos diretos |
| Evidência qualitativa | Prévia de conteúdo e comentários recentes do TikTok Studio | Capa/título como âncora e um insight curto ligado ao movimento observado |
| Estado e acessibilidade | HIG Accessibility + rótulos contextuais de Charts | Texto e ícone acompanham a cor; estados e dados continuam compreensíveis com zoom e leitor de tela |
| Responsividade | Área compacta de gráficos + viewport vertical mobile | No mobile, biblioteca pode virar faixa de seleção; o gráfico e o insight permanecem prioritários |

## Fontes consultadas

- [Apple Design Resources](https://developer.apple.com/design/resources/)
- [Apple Human Interface Guidelines — Charts](https://developer.apple.com/design/human-interface-guidelines/charts)
- [Apple Human Interface Guidelines — Accessibility](https://developer.apple.com/design/human-interface-guidelines/accessibility)
- [YouTube Help — Get started with YouTube Analytics](https://support.google.com/youtube/answer/9002587?hl=en)
- [TikTok Help Center — Creator tools on TikTok](https://support.tiktok.com/en/using-tiktok/creating-videos/creator-tools-on-tiktok)
- [Meta for Business — Instagram & Facebook Reels](https://www.facebook.com/business/ads/facebook-instagram-reels-ads)

