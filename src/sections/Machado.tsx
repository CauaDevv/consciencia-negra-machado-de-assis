import { HorizontalRail } from '@/components/motion/HorizontalRail'
import { Reveal } from '@/components/motion/Reveal'
import { StaggerText } from '@/components/motion/StaggerText'
import { BordaLuminosa } from '@/components/ui/BordaLuminosa'
import { ElasticGallery, type ItemGaleria } from '@/components/ui/ElasticGallery'
import { Refs } from '@/components/ui/Refs'
import { retratos, vida, type Cartao } from '@/data/content'
import { imagens, type ChaveImagem } from '@/data/imagens'

const itensGaleria: ItemGaleria[] = retratos.map((r) => ({ ...r, src: imagens[r.src as ChaveImagem] }))

function CartaoVida({ c, n, total }: { c: Cartao; n: number; total: number }) {
  return (
    <BordaLuminosa as="article" className="cartao-vida" raio={26}>
      <div className="cartao-vida__miolo">
        <span className="cartao-vida__ano" aria-hidden="true">{c.ano}</span>
        <h3 className="cartao-vida__titulo"><span className="sr-only">{c.ano}: </span>{c.titulo}</h3>
        <p>{c.texto}<Refs ids={c.ref} /></p>
        {c.imagem && (
          <figure className="cartao-vida__foto">
            <img src={imagens[c.imagem as ChaveImagem]} alt={c.legendaImagem ?? ''} loading="lazy" decoding="async" />
            <figcaption>{c.legendaImagem}</figcaption>
          </figure>
        )}
        <p className="cartao-vida__rodape" aria-hidden="true"><span>Cartão {String(n).padStart(2, '0')}</span><span>{String(total).padStart(2, '0')}</span></p>
      </div>
    </BordaLuminosa>
  )
}

/** "Quem foi": retratos em galeria elástica e, logo abaixo, o rail horizontal preso à rolagem com a vida em 8 cartões. */
export function Machado() {
  return (
    <>
      <section id="machado" className="sec sec--ink machado" aria-labelledby="machado-titulo">
        <div className="container">
          <div className="sec__head">
            <p className="eyebrow">02 · Quem foi</p>
            <h2 id="machado-titulo" className="sec__title">
              <StaggerText text="Um menino do" /> <br />
              <StaggerText text="Morro do" delay={0.12} /> <StaggerText text="Livramento." delay={0.2} className="acento" />
            </h2>
            <Reveal as="p" className="sec__lead" delay={0.2}>
              Joaquim Maria Machado de Assis nasceu no Rio de Janeiro em 1839, quando a escravidão ainda era lei. Não teve curso regular, estudou como pôde, aprendeu um ofício e escreveu algumas das páginas mais admiradas da língua portuguesa.
              <Refs ids={[1]} />
            </Reveal>
          </div>

          <Reveal kind="scale" duration={1} amount={0.1}>
            <ElasticGallery itens={itensGaleria} rotulo="Retratos de Machado de Assis em diferentes fases da vida" />
          </Reveal>
        </div>
      </section>

      <section id="vida" data-nav="machado" className="sec sec--ink vida" aria-label="A vida de Machado de Assis, ano a ano">
        <HorizontalRail
          className="rail-vida"
          label="A vida de Machado de Assis, ano a ano"
          trackVh={320}
          title={
            <div className="sec__head rail-vida__cabeca">
              <p className="eyebrow">A vida em oito cartões</p>
              <h2 className="sec__title">Do morro à <em>Academia</em></h2>
              <p className="sec__lead">Role a página para andar pelos anos. No celular, deslize para o lado.</p>
            </div>
          }
        >
          {vida.map((c, i) => <CartaoVida key={c.ano} c={c} n={i + 1} total={vida.length} />)}
        </HorizontalRail>
      </section>
    </>
  )
}
