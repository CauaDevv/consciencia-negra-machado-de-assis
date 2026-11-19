# Plano de otimização

## Rodada de 19/11/2026

Regra desta rodada: **o visual não muda**. Nenhuma cor, fonte, espaçamento, animação ou layout foi alterado. O ganho vem de como a página é entregue e de limpeza de código.

### 1. Diagnóstico

- **Stack:** Vite 8 + React 19 + TypeScript, Motion, Lenis e OGL (WebGL). CSS escrito à mão, sem framework. npm. Sem testes nem lint; a rede de segurança é `tsc --noEmit`, o build e a validação no navegador.
- **Arquitetura:** uma página, uma seção por arquivo em `src/sections/`, textos em `src/data/content.ts`, animações em `src/components/motion/`.
- **Entrega original:** tudo embutido em **um único `index.html`** (1.785 KB; ~1.100 KB com gzip): JS, CSS, 5 fontes e 8 imagens em base64. Bom para abrir com dois cliques, ruim para a web: nada é cacheado separadamente, nada carrega em paralelo, as imagens "preguiçosas" são baixadas mesmo assim e o shader da aurora (50 KB) entra no bundle inicial.
- **Achados da auditoria** (`auditar.mjs`, validação no navegador e medições):

| Problema | Onde | Evidência | Prioridade |
| --- | --- | --- | --- |
| Entrega em arquivo único para a web | `vite.config.ts` | 1 requisição de 1.785 KB; imagens `loading="lazy"` embutidas em base64 | P1 |
| 8 imagens sem `width`/`height` | `ElasticGallery`, `Machado`, `Obras`, `ComparadorImagem` | `validar.mjs`: "sem width/height (CLS): 8" | P1 |
| Título do hero "pula" quando a fonte chega | `index.html`, CSS | `layout-shift`: 0,136 no celular, `p.hero__lead 315→270` em t=1,5 s | P1 |
| Código sem uso | `Icon.tsx`, `Reveal.tsx`, `FlowButton.tsx`, `ui.css` | 4 ícones, 2 variantes do `Reveal` e a variante `claro` do botão: nenhuma chamada em lugar nenhum | P3 |
| "Órfão" `aurora-renderer.ts` e 3 pacotes `@fontsource-variable` | auditoria | **Falso positivo**: o primeiro é carregado por `import()` dinâmico; os outros são usados por `url()` no CSS | n/a |

### 2. Plano executado

1. Limpeza de código morto (risco baixo, validado por `tsc` e navegador).
2. Build em dois modos: `npm run build` (arquivos separados, para a web) e `npm run build:unico` (arquivo único, para abrir com dois cliques).
3. Dimensões reais nas imagens.
4. Pré-carregamento das 3 fontes do primeiro desenho (só na versão web).

### 3. Alterações

| Mudança | Arquivo | Motivo técnico | Status |
| --- | --- | --- | --- |
| Build para web com arquivos separados e `base: './'` | `vite.config.ts`, `package.json` | Cache por arquivo, carga em paralelo, imagens realmente preguiçosas, aurora (WebGL) em chunk à parte (14,9 KB gzip) carregado só depois do primeiro desenho | **APLICADO** |
| Arquivo único mantido como `build:unico` → `dist-unico/` | `vite.config.ts` | Preserva o uso offline (abre com dois cliques) | **APLICADO** |
| `width`/`height` reais em 8 imagens (`dimensoes` em `imagens.ts`) | `imagens.ts`, `ElasticGallery.tsx`, `Machado.tsx`, `Obras.tsx`, `ComparadorImagem.tsx` | O navegador reserva o espaço antes da foto chegar. Todas já tinham tamanho definido por CSS, então o visual não muda | **APLICADO** |
| `fetchPriority="high"` e `decoding="async"` na foto do hero | `Hero.tsx` | A foto do hero é o candidato ao LCP | **APLICADO** |
| `<link rel="preload" as="font">` das fontes Fraunces (normal e itálico) e Source Serif 4 (normal) | `index.html` | A fonte chega junto com o CSS; o título não muda de tamanho depois do primeiro desenho | **APLICADO** (só na versão web) |
| Remoção de 4 ícones, 2 variantes do `Reveal` e da variante `claro` do botão | `Icon.tsx`, `Reveal.tsx`, `FlowButton.tsx`, `ui.css` | Código sem nenhum uso | **APLICADO** |
| Remoção dos comentários que citavam projetos externos | vários | Higiene para publicação | **APLICADO** |
| Imagens responsivas (`srcset`) para as fotos do rail e da galeria | | Economia estimada no celular; exige novas versões das imagens | **RECOMENDADO** |
| Instanciar as fontes sem o eixo `opsz` ou reduzir pesos | `base.css` | Source Serif 4 pesa 252 KB; mudaria levemente o desenho das letras (visual) | **RECOMENDADO** (decisão humana) |
| `LazyMotion` no lugar do `motion` completo | componentes de movimento | Estimativa de ~30 KB a menos de JS; exige testar toda animação de SVG | **RECOMENDADO** |

### 4. Resultados (só número medido)

Medições no Edge sem interface, GPU Intel UHD 620, 1.440×900 (desktop) e 390×844 com DPR 2 (celular). A máquina varia entre execuções, então os valores abaixo são **faixas de 2 a 3 execuções**.

| Métrica | Antes (arquivo único) | Depois (web) |
| --- | ---: | ---: |
| Requisições | 1 | 12 |
| Transferido na carga inicial | 1.433–1.785 KB | **810 KB** |
| JS principal | embutido no HTML | 466,9 KB (150,1 KB gzip) |
| Aurora WebGL | no bundle inicial | 48,8 KB (14,9 KB gzip), sob demanda |
| CSS | embutido | 55,1 KB (12,6 KB gzip) |
| Fontes / imagens | embutidas (base64) | 431 KB / 478 KB, em arquivos próprios (imagens só quando perto da tela) |
| FCP desktop | 624–828 ms | **396–612 ms** |
| LCP desktop | 2,2–3,3 s | **1,8–1,9 s** |
| LCP celular | 1,9–2,1 s | **1,7 s** |
| CLS celular | 0 a 0,136 (depende de quando a fonte chega) | **0,000** |
| CLS desktop | 0,015 | **0,0002** |
| Memória JS (heap) | 11,3 MB | 7,4–9,3 MB |
| Imagens sem `width`/`height` | 8 | **0** |
| FCP com CPU 4× mais lenta (desktop / celular) | 2.696 / 2.308 ms | **716 / 656 ms** |

Validação final (`validar.mjs`, desktop, tablet e celular): **nenhuma regressão introduzida**, console limpo, nenhuma imagem quebrada, nenhum HTTP ≥ 400, sem rolagem horizontal. As 5 fontes carregam nas duas versões.

### 5. Pendências e o que foi preservado

- **Erros preexistentes:** nenhum.
- **Introduzido e corrigido na própria rodada:** o pré-carregamento das fontes fez o Vite emitir 3 fontes como arquivos soltos no arquivo único, que ficaria sem elas. Corrigido removendo os links *antes* do processamento do Vite; conferido que 5/5 fontes ficam embutidas e carregam.
- **Preservado de propósito (visual):** textura de ruído sobre a página, aurora com mistura de cores, desfoque do cabeçalho e dos rótulos, sombras grandes, blur das palavras do manifesto, desenho em SVG da abertura. Testei desligar cada um e **não houve ganho mensurável** (ver abaixo); então não há motivo técnico para mexer no visual.
- **Rolagem:** não é gargalo da página. Uma página vazia e alta leva ~42 ms por quadro neste navegador de teste; esta página leva 46–48 ms (cerca de 5 ms a mais), sem JavaScript bloqueando em velocidade normal. Os números com CPU 4× mais lenta exageram o custo do JavaScript e não devem ser lidos como experiência real.
- **Medida descartada:** o "TBT" por `longtask` com CPU 4× mais lenta marcou dezenas de segundos, mas o Long Animation Frames (mais confiável) mostrou carga leve (bundle principal executa em ~0,8 s a 4× mais lento). Não usei esse número como evidência.
- **Preservado por falta de ganho claro:** `scripts/alinhar-busca.mjs` (documenta como o recorte do comparador foi achado) e `_originais/` (fonte das imagens otimizadas).
- **Para a próxima rodada:** ver os itens **RECOMENDADO** acima; o de maior retorno provável é `srcset` para celular.
