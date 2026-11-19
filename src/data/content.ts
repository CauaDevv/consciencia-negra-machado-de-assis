/**
 * Todo o texto da página fica aqui. Os números entre colchetes (ref) apontam para
 * a lista de FONTES, no fim do arquivo e no fim da página, para que cada afirmação
 * possa ser conferida.
 */

export type Ref = number[]

/* ------------------------------------------------------------------ HERO */
export const hero = {
  eyebrow: '20 de novembro · Dia Nacional de Zumbi e da Consciência Negra',
  lead:
    'Descendente de pessoas escravizadas libertas, estudou como pôde, começou como aprendiz de tipógrafo e chegou a presidente da Academia Brasileira de Letras. Mesmo assim, tentaram clarear o rosto de um dos maiores nomes da nossa literatura.',
  ref: [1, 2] as Ref,
  chips: ['Funcionário público', 'Cronista', 'Contista', 'Romancista', '1º presidente da ABL'],
}

export const faixaItens = [
  '20 de novembro',
  'Consciência Negra',
  'Zumbi vive',
  'Feriado nacional',
  'Machado de Assis',
  'Racismo é crime',
  'Leia autores negros',
  'O ano inteiro',
]

/* ------------------------------------------------------ POR QUE 20/11 */
export const manifesto =
  'Em 20 de novembro de 1695, Zumbi dos Palmares foi morto. Mais de três séculos depois, o Brasil inteiro faz uma pausa para lembrar dele e de todas as pessoas negras que construíram este país.'

export type Marco = { ano: string; titulo: string; texto: string; ref: Ref }
export const marcos: Marco[] = [
  {
    ano: '1695',
    titulo: 'Zumbi é morto',
    texto: 'Em 20 de novembro, Zumbi dos Palmares, líder do Quilombo dos Palmares, é morto em uma emboscada. A data passa a simbolizar a resistência contra a escravidão.',
    ref: [8, 9],
  },
  {
    ano: '1888',
    titulo: 'Lei Áurea',
    texto: 'Em 13 de maio, o Brasil abole a escravidão, sendo o último país das Américas a fazer isso. Para muitos historiadores, a liberdade veio sem políticas para incluir quem acabava de ser libertado.',
    ref: [12],
  },
  {
    ano: '1971',
    titulo: 'Grupo Palmares escolhe o 20/11',
    texto: 'Em Porto Alegre, universitários negros do Grupo Palmares escolhem o dia da morte de Zumbi para celebrar a cultura negra, em vez do 13 de maio.',
    ref: [8, 9],
  },
  {
    ano: '2011',
    titulo: 'A data vira lei',
    texto: 'A Lei 12.519, de 10 de novembro, institui o Dia Nacional de Zumbi e da Consciência Negra. Ainda não era feriado em todo o país.',
    ref: [9],
  },
  {
    ano: '2023',
    titulo: 'Feriado nacional',
    texto: 'A Lei 14.759, de 21 de dezembro, declara o 20 de novembro feriado nacional. Em 2024, todos os estados e o Distrito Federal celebraram a data pela primeira vez.',
    ref: [5, 6, 7],
  },
]

export type Numero = { valor: number; decimais?: number; sufixo?: string; agrupar?: boolean; rotulo: string; nota: string; ref: Ref }
export const numeros: Numero[] = [
  { valor: 55.5, decimais: 1, sufixo: '%', rotulo: 'dos brasileiros se declararam pretos ou pardos', nota: 'Censo 2022: 45,3% pardos + 10,2% pretos.', ref: [10, 11] },
  { valor: 4.7, decimais: 1, sufixo: ' mi', rotulo: 'de africanos foram trazidos à força para o Brasil', nota: 'Entre 1550 e 1860, segundo a FAPESP.', ref: [13] },
  { valor: 1888, agrupar: false, rotulo: 'ano em que o Brasil aboliu a escravidão', nota: 'O último país das Américas a fazê-lo.', ref: [12] },
]

/* ---------------------------------------------------- QUEM FOI MACHADO */
export const retratos = [
  { id: '01', titulo: 'Anos 1890', categoria: 'Retrato', src: 'ferrez', alt: 'Retrato de Machado de Assis de terno escuro e pincenê, com barba cheia.', legenda: 'c. 1890 · atribuído a Marc Ferrez', posicao: '50% 28%' },
  { id: '02', titulo: 'Aos 57 anos', categoria: 'Retrato', src: 'aos57', alt: 'Machado de Assis de cabelo curto, bigode e pincenê, olhando para o lado.', legenda: 'c. 1896 · aos 57 anos', posicao: '50% 25%' },
  { id: '03', titulo: 'Nos últimos anos', categoria: 'Retrato', src: 'foto1904', alt: 'Machado de Assis de perfil, de cabelos grisalhos e pincenê.', legenda: 'c. 1904 · acervo do Arquivo Nacional', posicao: '40% 42%' },
] as const

export type Cartao = { ano: string; titulo: string; texto: string; ref: Ref; imagem?: string; legendaImagem?: string }
export const vida: Cartao[] = [
  { ano: '1839', titulo: 'Nasce no Rio de Janeiro', texto: 'Joaquim Maria Machado de Assis nasce em 21 de junho e cresce no Morro do Livramento, filho do pintor e dourador Francisco José de Assis.', ref: [1], imagem: 'morro', legendaImagem: 'Morro do Livramento, no Rio' },
  { ano: '1854', titulo: 'Primeiro poema publicado', texto: 'Com 15 anos incompletos, sem meios para cursos regulares, publica um soneto no Periódico dos Pobres. Estudava como podia.', ref: [1] },
  { ano: '1856', titulo: 'Aprendiz de tipógrafo', texto: 'Entra na Imprensa Nacional para aprender o ofício de compor textos com tipos de metal. Ali conhece Manuel Antônio de Almeida, que o protege.', ref: [1], imagem: 'imprensa', legendaImagem: 'Imprensa Nacional, c. 1886 · Marc Ferrez' },
  { ano: '1869', titulo: 'Casa-se com Carolina', texto: 'Em 12 de novembro se casa com Carolina Augusta Xavier de Novais. Foram 35 anos de companheirismo.', ref: [1] },
  { ano: '1873', titulo: 'Funcionário público', texto: 'É nomeado primeiro oficial do Ministério da Agricultura, Comércio e Obras Públicas. O emprego público foi, até o fim da vida, seu principal meio de sustento.', ref: [1] },
  { ano: '1881', titulo: 'Memórias Póstumas de Brás Cubas', texto: 'O livro sai em volume depois de ser publicado em capítulos na Revista Brasileira. Muda a direção de toda a sua carreira literária.', ref: [1] },
  { ano: '1897', titulo: 'Primeiro presidente da ABL', texto: 'Quando a Academia Brasileira de Letras é instalada, em 28 de janeiro, Machado é eleito presidente. Fica no cargo até morrer.', ref: [1] },
  { ano: '1908', titulo: 'A despedida', texto: 'Morre no Rio de Janeiro em 29 de setembro. Deixa romances, contos, crônicas, peças e poemas lidos até hoje.', ref: [1] },
]

/* ------------------------------------------- O ESCRITOR E A ESCRAVIDÃO */
export type Obra = { tipo: 'livro' | 'jornal'; ano: string; titulo: string; subtitulo: string; trecho?: string; texto: string; leitura: string; capa?: string; ref: Ref }
export const obras: Obra[] = [
  {
    tipo: 'livro',
    ano: '1881',
    titulo: 'Memórias Póstumas de Brás Cubas',
    subtitulo: 'O menino e o “cavalinho”',
    texto: 'Quando criança, Brás Cubas monta em Prudêncio, menino escravizado da família, como se fosse um cavalo, e bate nele. Anos depois, encontra Prudêncio já liberto… batendo em outro homem escravizado.',
    leitura: 'Leitura possível: a violência sofrida pode virar violência repetida. Está no capítulo LXVIII.',
    ref: [16],
  },
  {
    tipo: 'livro',
    ano: '1906',
    titulo: 'Pai contra Mãe',
    subtitulo: 'Conto de Relíquias de Casa Velha',
    trecho: '“A escravidão levou consigo ofícios e aparelhos, como terá de levar muitas instituições pias e outras que não são pias.”',
    texto: 'A primeira frase já avisa o assunto. O conto acompanha um homem que ganha a vida capturando pessoas escravizadas que fugiram, e mostra a crueldade do sistema sem precisar gritar.',
    leitura: 'É um dos contos em que Machado trata a escravidão de forma mais direta. Está em domínio público.',
    capa: 'capaReliquias',
    ref: [16],
  },
  {
    tipo: 'jornal',
    ano: '1888–89',
    titulo: 'Bons Dias!',
    subtitulo: 'Crônicas na Gazeta de Notícias',
    texto: 'Entre abril de 1888 e agosto de 1889, Machado escreveu uma coluna quinzenal, sem assinatura, em que cada texto começava com “Bons dias!”. Nela, usou a ironia para expor as contradições da abolição da escravidão.',
    leitura: 'Leitura possível: a Lei Áurea, sozinha, não resolvia a vida de quem foi libertado.',
    ref: [17],
  },
]

/* ----------------------------------------------------- O APAGAMENTO */
export const apagamento = {
  titulo: 'Tentaram clarear Machado.',
  paragrafos: [
    'Depois da morte do escritor, a discussão sobre a cor dele continuou. Segundo a Fundação Perseu Abramo, o atestado de óbito, de 1908, o registrou como branco.',
    'Quando o crítico José Veríssimo o chamou de “mulato” em um texto de homenagem, o amigo Joaquim Nabuco pediu que o trecho fosse retirado: “Eu não o teria chamado mulato e penso que nada lhe doeria mais do que essa síntese”. É o retrato de uma época em que ser negro era visto como defeito.',
    'Em 2011, a Caixa Econômica Federal tirou do ar um comercial pelos seus 150 anos em que um ator branco interpretava Machado. A Seppir, órgão federal de promoção da igualdade racial, criticou a peça por contribuir com a invisibilização dos afro-brasileiros.',
  ],
  refs: [2, 3, 4] as Ref,
  fecho: 'Reconhecer a cor de Machado não diminui o escritor. Corrige a história.',
  comparadorNota:
    'Duas reproduções do mesmo retrato (c. 1896), com tratamentos de imagem diferentes. A diferença de tom mostra como o jeito de reproduzir uma foto pode mudar a leitura de um rosto, e por que o debate sobre o “embranquecimento” de Machado existe. Arraste para comparar.',
}

/* ------------------------------------------------------------- QUIZ */
export type Pergunta = { afirmacao: string; verdade: boolean; explicacao: string; ref: Ref }
export const perguntas: Pergunta[] = [
  { afirmacao: 'Machado de Assis era um homem branco, de família rica.', verdade: false, explicacao: 'Era filho de um pintor e dourador, descendente de pessoas escravizadas libertas, e cresceu no Morro do Livramento. Estudou como pôde.', ref: [1, 2] },
  { afirmacao: 'Machado de Assis foi o primeiro presidente da Academia Brasileira de Letras.', verdade: true, explicacao: 'Foi eleito presidente quando a ABL foi instalada, em 28 de janeiro de 1897, e ficou no cargo até morrer, em 1908.', ref: [1] },
  { afirmacao: 'O 20 de novembro lembra o dia em que a Lei Áurea foi assinada.', verdade: false, explicacao: 'A Lei Áurea é de 13 de maio de 1888. O 20 de novembro lembra a morte de Zumbi dos Palmares, em 1695.', ref: [8, 12] },
  { afirmacao: 'O Brasil foi o último país das Américas a abolir a escravidão.', verdade: true, explicacao: 'A Lei Áurea, de 13 de maio de 1888, encerrou oficialmente a escravidão no país.', ref: [12] },
  { afirmacao: 'Machado só escreveu sobre amor e ciúme, nunca sobre escravidão.', verdade: false, explicacao: 'A escravidão aparece em Memórias Póstumas de Brás Cubas, no conto “Pai contra Mãe” e nas crônicas “Bons Dias!”, entre outros textos.', ref: [16, 17] },
  { afirmacao: 'O 20 de novembro é feriado nacional, em todo o Brasil, desde 2024.', verdade: true, explicacao: 'A Lei 14.759/2023 declarou o feriado nacional, e em 2024 todos os estados e o DF celebraram a data pela primeira vez.', ref: [5, 7] },
  { afirmacao: 'Injúria racial é só uma ofensa e não conta como crime de racismo.', verdade: false, explicacao: 'Desde a Lei 14.532/2023, a injúria racial é crime de racismo: reclusão de 2 a 5 anos e multa, sem prescrever e sem direito a fiança.', ref: [14] },
]

export const resultadosQuiz = [
  { ate: 3, titulo: 'Bom começo.', texto: 'Muita coisa que a escola e a TV não contam. Releia as seções acima: a história de Machado e do 20 de novembro vale a viagem.' },
  { ate: 5, titulo: 'Quase lá!', texto: 'Você já sabe bastante. Que tal ler um conto de Machado e contar o que descobriu para alguém?' },
  { ate: 7, titulo: 'Consciência em dia.', texto: 'Agora o desafio é espalhar: converse sobre o assunto e ajude a desmentir os mitos.' },
]

/* ------------------------------------------------- RACISMO É CRIME */
export const tagsLei = [
  'Racismo é crime', 'Inafiançável', 'Imprescritível', 'Injúria racial = racismo', '2 a 5 anos de reclusão', 'Lei 7.716/1989',
  'Lei 14.532/2023', 'Disque 100', 'Constituição, art. 5º', 'Lei 10.639/2003', 'Denuncie', 'Consciência Negra o ano todo',
]

export const leis = [
  { sigla: 'CF/1988', titulo: 'Constituição Federal', texto: 'No artigo 5º, inciso XLII, a Constituição determina que a prática do racismo é crime inafiançável e imprescritível.', ref: [15] as Ref },
  { sigla: 'Lei 7.716/1989', titulo: 'Crimes de racismo', texto: 'Define os crimes resultantes de preconceito de raça ou de cor. É a principal lei contra o racismo no Brasil.', ref: [18] as Ref },
  { sigla: 'Lei 14.532/2023', titulo: 'Injúria racial é racismo', texto: 'A ofensa racial passa a ser crime de racismo, com reclusão de 2 a 5 anos e multa. Não prescreve e não admite fiança.', ref: [14] as Ref },
  { sigla: 'Lei 10.639/2003', titulo: 'História afro-brasileira na escola', texto: 'Torna obrigatório o ensino de história e cultura afro-brasileira nas escolas. É por isso que este trabalho existe.', ref: [18] as Ref },
]

export const comoAgir = [
  { titulo: 'Não deixe passar', texto: 'Não ria, não compartilhe e não aceite o “foi só brincadeira”. O silêncio ajuda o racismo.' },
  { titulo: 'Acolha quem sofreu', texto: 'Pergunte como a pessoa está e o que ela quer fazer. A decisão é dela; o apoio é nosso.' },
  { titulo: 'Guarde as provas', texto: 'Prints, data, horário, local e nome de quem presenciou. Isso fortalece a denúncia.' },
  { titulo: 'Denuncie', texto: 'Disque 100 (Direitos Humanos): gratuito, 24 horas, pode ser anônimo. Também pelo WhatsApp (61) 99611-0100 ou em uma delegacia.' },
  { titulo: 'Leve para a escola', texto: 'Converse com professores e direção. A escola é lugar de aprender a combater o racismo, e não de passar por ele.' },
]

/* ------------------------------------------------------ COMPROMISSO */
export const compromissos = [
  'Vou chamar as pessoas pelo nome, e nunca por apelidos que ofendem.',
  'Não vou rir nem repassar piada racista.',
  'Vou ler pelo menos um conto de Machado de Assis (sugestão: “Pai contra Mãe”).',
  'Vou procurar e indicar autores e autoras negros.',
  'Vou apoiar quem sofrer racismo e ajudar a denunciar.',
  'Vou lembrar do 20 de novembro nos outros 364 dias do ano.',
]

/* -------------------------------------------------------- FONTES */
export const fontes: { n: number; rotulo: string; url?: string }[] = [
  { n: 1, rotulo: 'Academia Brasileira de Letras. Machado de Assis: biografia.', url: 'https://www.academia.org.br/academicos/machado-de-assis/biografia' },
  { n: 2, rotulo: 'Fundação Perseu Abramo. Machado de Assis e o embranquecimento da história.', url: 'https://fpabramo.org.br/machado-de-assis-e-o-embranquecimento-da-historia/' },
  { n: 3, rotulo: 'Jornal do Brasil (21/9/2011). Caixa tira do ar propaganda com Machado de Assis branco.', url: 'https://www.jb.com.br/pais/noticias/2011/09/21/amp/caixa-tira-do-ar-propaganda-com-machado-de-assis-branco.html' },
  { n: 4, rotulo: 'Meio & Mensagem. Caixa se desculpa por comercial.', url: 'https://www.meioemensagem.com.br/comunicacao/caixa-se-desculpa-por-comercial' },
  { n: 5, rotulo: 'Agência Senado (22/12/2023). Dia da Consciência Negra se torna feriado nacional.', url: 'https://www12.senado.leg.br/noticias/materias/2023/12/22/dia-da-consciencia-negra-se-torna-feriado-nacional' },
  { n: 6, rotulo: 'Câmara dos Deputados. Lei nº 14.759, de 21 de dezembro de 2023 (texto original).', url: 'https://www2.camara.leg.br/legin/fed/lei/2023/lei-14759-21-dezembro-2023-795091-publicacaooriginal-170522-pl.html' },
  { n: 7, rotulo: 'Agência Gov (2024). Brasil celebra pela primeira vez nacionalmente o feriado da Consciência Negra.', url: 'https://agenciagov.ebc.com.br/noticias/202411/brasil-celebra-pela-primeira-vez-nacionalmente-o-feriado-da-consciencia-negra' },
  { n: 8, rotulo: 'Brasil de Fato (2019). 20 de novembro: conheça a história do Dia da Consciência Negra.', url: 'https://www.brasildefato.com.br/2019/11/20/20-de-novembro-conheca-a-historia-do-dia-da-consciencia-negra' },
  { n: 9, rotulo: 'História do Mundo. 20 de novembro: Dia da Consciência Negra (inclui a Lei 12.519/2011).', url: 'https://www.historiadomundo.com.br/idade-contemporanea/20-novembro-dia-consciencia-negra.htm' },
  { n: 10, rotulo: 'IBGE (Agência de Notícias). Censo 2022: pela primeira vez desde 1991, a maior parte da população se declara parda.', url: 'https://agenciadenoticias.ibge.gov.br/agencia-noticias/2012-agencia-de-noticias/noticias/38719-censo-2022-pela-primeira-vez-desde-1991-a-maior-parte-da-populacao-do-brasil-se-declara-parda' },
  { n: 11, rotulo: 'Folha Vitória. Pardos e pretos juntos ampliam maioria para 55,5% da população em 2022, diz IBGE.', url: 'https://www.folhavitoria.com.br/geral/pardos-e-pretos-juntos-ampliam-maioria-para-55-5-da-populacao-em-2022-diz-ibge/' },
  { n: 12, rotulo: 'Ipea (Nota Técnica 110). A luta pela igualdade racial: o Brasil, último país das Américas a abolir a escravidão (13/5/1888).', url: 'https://repositorio.ipea.gov.br/bitstream/11058/12387/1/NT_110_Disoc_a_luta.pdf' },
  { n: 13, rotulo: 'Revista Pesquisa FAPESP. Caminhos da liberdade.', url: 'https://revistapesquisa.fapesp.br/caminhos-da-liberdade/' },
  { n: 14, rotulo: 'Planalto. Lei nº 14.532, de 11 de janeiro de 2023 (injúria racial como crime de racismo).', url: 'https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2023/lei/l14532.htm' },
  { n: 15, rotulo: 'Ministério dos Direitos Humanos e da Cidadania. Disque 100 e a Constituição (art. 5º, XLII).', url: 'https://www.gov.br/mdh/pt-br/acesso-a-informacao/disque-100/disque-100' },
  { n: 16, rotulo: 'Machado de Assis. Memórias Póstumas de Brás Cubas (1881) e “Pai contra Mãe”, em Relíquias de Casa Velha (1906). Obras em domínio público.', url: 'https://periodicos.ufms.br/index.php/cadec/article/view/7726/5547' },
  { n: 17, rotulo: 'Revista Uniletras (UEPG). Estudo sobre a coluna “Bons Dias!”, na Gazeta de Notícias (1888–1889).', url: 'https://revistas.uepg.br/index.php/uniletras/article/download/7833/5300/32235' },
  { n: 18, rotulo: 'Planalto. Lei nº 7.716/1989 e Lei nº 10.639/2003.', url: 'https://www.planalto.gov.br/ccivil_03/leis/l7716.htm' },
]

export const creditosImagens = [
  { rotulo: 'Retrato c. 1890, atribuído a Marc Ferrez (restauração digital: Adam Cuerden)', url: 'https://commons.wikimedia.org/wiki/File:Machado_de_Assis_by_Marc_Ferrez.jpg' },
  { rotulo: 'Retrato c. 1896 (reprodução escura)', url: 'https://commons.wikimedia.org/wiki/File:Machado_de_Assis_aos_57_anos_(cropped).jpg' },
  { rotulo: 'Retrato c. 1896 (reprodução clara)', url: 'https://commons.wikimedia.org/wiki/File:Machado_de_Assis_big_photo.jpg' },
  { rotulo: 'Retrato de c. 1904, Arquivo Nacional', url: 'https://commons.wikimedia.org/wiki/File:Machado_de_Assis,_sem_data.tif' },
  { rotulo: 'Morro do Livramento', url: 'https://commons.wikimedia.org/wiki/File:Morro_do_Livramento,_onde_Machado_nasceu.jpg' },
  { rotulo: 'Imprensa Nacional, por Marc Ferrez', url: 'https://commons.wikimedia.org/wiki/File:Imprensa_Nacional_onde_trabalhou_como_tip%C3%B3grafo,_por_Marc_Ferrez.jpg' },
  { rotulo: 'Assinatura de Machado de Assis', url: 'https://commons.wikimedia.org/wiki/File:Assinatura_de_Machado_de_Assis.png' },
  { rotulo: 'Capa da 1ª edição de Relíquias de Casa Velha', url: 'https://commons.wikimedia.org/wiki/File:Rel%C3%ADquias_de_Casa_Velha_-_Machado_de_Assis_(Capa_da_1%C2%AA_edi%C3%A7%C3%A3o).jpg' },
]
