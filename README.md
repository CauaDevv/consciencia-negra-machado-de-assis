# Machado de Assis era negro · 20 de novembro, Consciência Negra

Página única de um trabalho escolar sobre o **Dia Nacional de Zumbi e da Consciência Negra** (20 de novembro), tendo **Machado de Assis** como fio condutor: o escritor que a história tentou clarear.

**Ver no ar:** https://cauadevv.github.io/consciencia-negra-machado-de-assis/

## O que a página tem

| Seção | O que mostra |
| --- | --- |
| Abertura | O nome "Machado de Assis" sendo riscado à pena (SVG animado) |
| Hero | Retrato de c. 1904 em um arco, aurora WebGL dourada e vermelha |
| 01 · A data | Manifesto que se revela palavra por palavra com a rolagem (sticky), linha do tempo e números |
| 02 · Quem foi | Galeria elástica de retratos e a vida em 8 cartões (rail horizontal) |
| 03 · O escritor | Textos de Machado sobre a escravidão (*Memórias Póstumas*, *Pai contra Mãe*, *Bons Dias!*) |
| 04 · O apagamento | Comparador de duas reproduções do mesmo retrato e o caso da Caixa (2011) |
| 05 · Quiz | "Mito ou verdade?", 7 perguntas com explicação e fonte |
| 06 · Enfrentar o racismo | O que a lei diz, como agir e o Disque 100 |
| 07 · Compromisso | Lista de compromissos com anel de progresso e selo |

## Critérios do trabalho

- **Informações verificáveis:** os números `[1]`, `[2]`… no texto levam a 18 fontes com link, no fim da página.
- **Textos autorais**, escritos a partir dessas fontes. Onde as fontes divergem (por exemplo, a profissão da mãe de Machado), há uma nota de rigor.
- **Imagens em domínio público** (Wikimedia Commons), sem filtro que altere o tom de pele. As duas reproduções do comparador foram apenas recortadas para alinhar.
- **Acessibilidade:** respeita "menos movimento", navegação por teclado, contraste AA, textos alternativos.

## Rodar localmente

Requer Node 20 ou mais recente.

```bash
npm install
npm run dev          # modo de edição em http://localhost:5173
npm run build        # versão para a web (pasta dist/)
npm run build:unico  # arquivo único dist/index.html, que abre com dois cliques, sem servidor
```

Todo o texto está em `src/data/content.ts`. A aparência fica em `src/styles/`; o arquivo `altura.css` só ajusta alturas e respiros (para cada seção caber melhor na tela) e pode ser removido sem mudar o visual.

## Estrutura

```
src/
  components/   motion/ (animações), ui/ (botão, galeria, comparador...), layout/
  sections/     uma seção da página por arquivo
  data/         content.ts (textos e fontes), imagens.ts, traco.ts (gerado)
  styles/       base, ui, layout, sections, altura
scripts/        preparar-imagens.mjs, gerar-traco.mjs
_originais/     fotos originais de domínio público
```

## Créditos

- Fotos e documentos de Machado de Assis: domínio público, [Wikimedia Commons](https://commons.wikimedia.org/) (links no rodapé da página).
- Aurora do início: shader do [React Bits](https://reactbits.dev/backgrounds/aurora) (David Haz), licença MIT com Commons Clause (uso não comercial).
- Bibliotecas: React, Motion, Lenis e OGL (MIT). Fontes: Fraunces, Source Serif 4 e JetBrains Mono (SIL Open Font License).
