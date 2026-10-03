/* ============ CONFIGURAÇÃO (edite aqui) ============ */
const CONFIG = {
  whatsapp: "5527988490854",          // DDI + DDD + número, sem espaços
  instagram: "costura_marciateixeira"
};

// Para adicionar uma peça: coloque a foto em img/ e acrescente uma linha abaixo.
// cat deve ser uma das chaves de CATEGORIAS.
const CATEGORIAS = {
  infantil: "Infantil",
  junina: "Festa junina",
  pet: "Pet",
  festa: "Festa e sob medida",
  personalizados: "Personalizados"
};

const PECAS = [
  { img: "infantil-xadrez-fitas.jpg",   nome: "Vestido infantil xadrez com fitas",   cat: "infantil" },
  { img: "infantil-xadrez-lacao.jpg",   nome: "Vestido infantil xadrez com laço",    cat: "infantil" },
  { img: "infantil-floral-vermelho.jpg", nome: "Vestido infantil floral vermelho",   cat: "infantil" },
  { img: "junina-xadrez.jpg",           nome: "Conjunto de quadrilha xadrez",        cat: "junina" },
  { img: "junina-kid-floral.jpg",       nome: "Conjunto junino infantil floral",     cat: "junina" },
  { img: "pet-xadrez-vermelho.jpg",     nome: "Vestido pet xadrez com renda",        cat: "pet" },
  { img: "pet-bolinha-renda.jpg",       nome: "Vestido pet de bolinha com laço",     cat: "pet" },
  { img: "pet-bolinha-natal.jpg",       nome: "Vestido pet de bolinha e roupa de Natal", cat: "pet" },
  { img: "corset-saia-lurex.jpg",       nome: "Corset com saia em lurex",            cat: "festa" },
  { img: "corset-detalhe.jpg",          nome: "Corset sob medida (detalhe)",         cat: "festa" },
  { img: "vestido-preto-frente.jpg",    nome: "Vestido preto com estampa",           cat: "festa" },
  { img: "vestido-preto-detalhe.jpg",   nome: "Vestido preto com decote vazado",     cat: "festa" },
  { img: "camarote-laranja.jpg",        nome: "Camiseta personalizada de camarote (laranja)", cat: "personalizados" },
  { img: "camarote-rosa.jpg",           nome: "Camiseta personalizada de camarote (rosa)",    cat: "personalizados" },
  { img: "bolsa-azul.jpg",              nome: "Bolsa de tecido com detalhe estampado", cat: "personalizados" },
  { img: "avental-marrom.jpg",          nome: "Avental com bolso xadrez",            cat: "personalizados" }
];
/* ==================================================== */

const linkWhats = (mensagem) =>
  `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(mensagem)}`;

const galeria = document.getElementById("galeria");
const filtros = document.getElementById("filtros");

function mostrarPecas(cat) {
  const lista = cat === "todas" ? PECAS : PECAS.filter((p) => p.cat === cat);
  galeria.innerHTML = "";
  lista.forEach((p) => {
    const item = document.createElement("article");
    item.className = "peca";

    const foto = document.createElement("img");
    foto.src = `img/${p.img}`;
    foto.alt = p.nome;
    foto.loading = "lazy";

    const titulo = document.createElement("h3");
    titulo.textContent = p.nome;

    const link = document.createElement("a");
    link.textContent = "Quero uma assim";
    link.href = linkWhats(`Olá, Márcia! Vi no site a peça "${p.nome}" e gostaria de um orçamento.`);
    link.target = "_blank";
    link.rel = "noopener";

    item.append(foto, titulo, link);
    galeria.append(item);
  });
}

function criarFiltros() {
  const opcoes = { todas: "Todas", ...CATEGORIAS };
  Object.entries(opcoes).forEach(([chave, rotulo]) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "filtro";
    b.textContent = rotulo;
    b.dataset.cat = chave;
    b.setAttribute("aria-pressed", chave === "todas");
    filtros.append(b);
  });
  filtros.addEventListener("click", (e) => {
    const b = e.target.closest(".filtro");
    if (!b) return;
    filtros.querySelectorAll(".filtro").forEach((x) => x.setAttribute("aria-pressed", x === b));
    mostrarPecas(b.dataset.cat);
  });
}

// Botões de WhatsApp e Instagram
document.querySelectorAll("[data-wa]").forEach((a) => {
  a.href = linkWhats("Olá, Márcia! Vim pelo site e gostaria de um orçamento.");
  a.target = "_blank";
  a.rel = "noopener";
});
document.querySelectorAll("[data-insta]").forEach((a) => {
  a.href = `https://www.instagram.com/${CONFIG.instagram}/`;
});

// Menu no celular
const menuBtn = document.querySelector(".menu-btn");
const menu = document.getElementById("menu");
menuBtn.addEventListener("click", () => {
  const aberto = menu.classList.toggle("aberto");
  menuBtn.setAttribute("aria-expanded", aberto);
});
menu.addEventListener("click", (e) => {
  if (e.target.closest("a")) {
    menu.classList.remove("aberto");
    menuBtn.setAttribute("aria-expanded", false);
  }
});

document.getElementById("ano").textContent = new Date().getFullYear();

criarFiltros();
mostrarPecas("todas");
