const razones = [
    "Porque me haces reír hasta cuando no quiero.",
    "Porque contigo todo es más bonito.",
    "Porque tu presencia es mi lugar favorito.",
    "Porque me encanta compartir mi vida contigo.",
    "Porque cada flor me recuerda a ti.",
    "Porque entre tantas personas te sigo eligiendo.",
    "Porque siempre encuentro una razón más para amarte."
];

// ===== FLORES EN SVG (todo local, sin imágenes externas) =====
const petalos = (n, cy, rx, ry, fill, stroke) => {
    let s = "";
    for (let i = 0; i < n; i++) {
        s += `<ellipse cy="${cy}" rx="${rx}" ry="${ry}" transform="rotate(${(360 / n) * i})" fill="${fill}" stroke="${stroke}" stroke-width="1.3"/>`;
    }
    return s;
};
const margarita = () => petalos(8, -27, 9, 23, "#efc4ce", "#d8a4b2") +
    '<circle r="11" fill="#e6c98f"/><circle r="5" fill="#f6e5b9"/>';
const gerbera = () => petalos(12, -31, 7, 25, "#f3e2a8", "#e1c98f") +
    '<circle r="12" fill="#c99c73"/><circle r="7" fill="#f2d8a6"/>';
const lirio = () => {
    let s = "";
    for (let i = 0; i < 6; i++) {
        s += `<path d="M0 0C-34 -13 -38 -55 -18 -63C-5 -45 0 -20 0 0Z" transform="rotate(${60 * i})" fill="#e3d5e9" stroke="#c7adcf" stroke-width="1.4"/>`;
    }
    return s + '<circle r="7" fill="#e9d6a5"/>';
};
const tulipan = (tallo = true) =>
    '<path d="M0 4C-28 -15 -24 -48 -8 -54C-2 -42 0 -35 0 -29C5 -47 17 -58 26 -48C34 -25 17 -5 0 4Z" fill="#efc4ce" stroke="#d5a0ae" stroke-width="1.5"/>' +
    '<path d="M0 3Q-4 -20 0 -42Q5 -17 0 3Z" fill="#f9e4e6" opacity=".8"/>' +
    (tallo ? '<path d="M0 4Q-4 35 -2 73" fill="none" stroke="#9db69a" stroke-width="4" stroke-linecap="round"/>' +
        '<path d="M-1 42Q-38 15 -42 43Q-26 61 -1 42Z" fill="#c9d9bd" stroke="#9db69a"/>' +
        '<path d="M-1 56Q25 25 42 43Q30 62 -1 56Z" fill="#d8e2cb" stroke="#9db69a"/>' : "");
const ramita = () =>
    '<path d="M0 100Q20 40 2 0" fill="none" stroke="#a9bea2" stroke-width="3"/>' +
    '<path d="M7 75Q-35 40 -43 66Q-20 91 7 75Z" fill="#d8e5d0" stroke="#a9bea2"/>' +
    '<path d="M4 49Q42 18 51 42Q31 65 4 49Z" fill="#c8d9c1" stroke="#a9bea2"/>' +
    '<path d="M1 25Q-25 0 -29 19Q-17 39 1 25Z" fill="#dce8d5" stroke="#a9bea2"/>';

const FLORES = { margarita, gerbera, lirio, tulipan, ramita };

function ramo() {
    return `<svg viewBox="0 0 340 200" aria-hidden="true">
        <path d="M170 195Q160 120 170 55M170 195Q115 130 92 85M170 195Q225 130 255 78" fill="none" stroke="#9eb69a" stroke-width="4" stroke-linecap="round"/>
        <path d="M160 155Q95 110 75 142Q110 170 160 155Z" fill="#d4e2cb" stroke="#a9bea2"/>
        <path d="M177 140Q230 95 255 122Q224 158 177 140Z" fill="#d4e2cb" stroke="#a9bea2"/>
        <g transform="translate(170 56) scale(.8)">${margarita()}</g>
        <g transform="translate(92 88) scale(.72)">${tulipan(false)}</g>
        <g transform="translate(255 80) scale(.7)">${lirio()}</g>
    </svg>`;
}

function fondo() {
    const items = [
        ["ramita", 30, 20, -24, 1.7], ["tulipan", 110, 110, -12, 1.35], ["margarita", 205, 85, 0, 1.1],
        ["gerbera", 75, 235, 0, .85], ["lirio", 225, 250, 0, .85],
        ["ramita", 1360, 10, 25, -1.7], ["tulipan", 1280, 110, 14, 1.25], ["gerbera", 1195, 90, 0, 1.05],
        ["margarita", 1320, 250, 0, .9], ["lirio", 1170, 245, 0, .8],
        ["ramita", 10, 880, -15, 1.5], ["lirio", 110, 835, 0, .95], ["margarita", 220, 865, 0, .9],
        ["tulipan", 65, 735, 0, 1.05], ["gerbera", 245, 735, 0, .8],
        ["ramita", 1390, 890, 20, -1.5], ["gerbera", 1280, 835, 0, .95], ["tulipan", 1180, 855, 0, 1.1],
        ["margarita", 1350, 720, 0, .9], ["lirio", 1160, 725, 0, .8]
    ];
    const g = items.map(([t, x, y, r, s]) =>
        `<g transform="translate(${x} ${y}) rotate(${r}) scale(${s} ${Math.abs(s)})">${FLORES[t]()}</g>`).join("");
    return `<svg viewBox="0 0 1400 950" preserveAspectRatio="xMidYMid slice">
        <defs><filter id="suave"><feGaussianBlur stdDeviation="1.3"/></filter></defs>
        <g opacity=".7" filter="url(#suave)">${g}</g></svg>`;
}

const $ = (id) => document.getElementById(id);
$("fondo").innerHTML = fondo();
document.querySelectorAll("[data-ramo]").forEach((el) => { el.innerHTML = ramo(); });
document.querySelectorAll("[data-flor]").forEach((el) => {
    el.innerHTML = `<svg viewBox="-40 -40 80 80"><g transform="scale(.8)">${margarita()}</g></svg>`;
});

// ===== NAVEGACIÓN =====
const pantallas = ["portada", "bienvenida", "album", "final", "enojo"];
const paginasRecuerdo = document.querySelectorAll(".recuerdo");
const TOTAL = paginasRecuerdo.length;
let actual = 0;
let cambiandoPagina = false;
let pantallaActual = "portada";

function mostrarPantalla(id) {
    pantallas.forEach((p) => $(p).classList.add("oculto"));
    $(id).classList.remove("oculto");
    pantallaActual = id;
    window.scrollTo({ top: 0, behavior: "smooth" });
}

function actualizarRecuerdo() {
    paginasRecuerdo.forEach((p, i) => p.classList.toggle("oculto", i !== actual));
    $("contador").textContent = `RECUERDO ${actual + 1} DE ${TOTAL}`;
    $("anterior").disabled = actual === 0;
    $("siguiente").textContent = actual === TOTAL - 1 ? "Terminar el álbum" : "Siguiente página";
    $("puntos").innerHTML = Array.from({ length: TOTAL }, (_, i) =>
        `<span class="${i === actual ? "activo" : ""}"></span>`).join("");
}

const esperar = (ms) => new Promise((r) => window.setTimeout(r, ms));

function animarEntrada() {
    const a = $("album");
    a.classList.remove("volteando-entrada", "volteando-salida");
    void a.offsetWidth;
    a.classList.add("volteando-entrada");
}

function abrirLibro() {
    $("abrir").disabled = true;
    $("folder").classList.add("abriendo");
    window.setTimeout(() => mostrarPantalla("bienvenida"), 1250);
}

function comenzarAlbum() {
    actual = 0;
    cambiandoPagina = false;
    actualizarRecuerdo();
    mostrarPantalla("album");
    animarEntrada();
}

async function cambiarPagina(direccion) {
    if (cambiandoPagina) return;
    const siguiente = actual + direccion;
    if (siguiente < 0) return;

    cambiandoPagina = true;
    const album = $("album");
    album.classList.remove("volteando-entrada");
    album.classList.add("volteando-salida");
    await esperar(470);

    if (siguiente >= TOTAL) {
        album.classList.remove("volteando-salida");
        resetearTerminar();
        mostrarPantalla("final");
        cambiandoPagina = false;
        return;
    }

    actual = siguiente;
    actualizarRecuerdo();
    animarEntrada();
    await esperar(700);
    album.classList.remove("volteando-entrada");
    cambiandoPagina = false;
}

// ===== FINAL =====
let indiceRazon = 0;

// Corazones que suben desde abajo de la pantalla
function lanzarCorazones() {
    const capa = $("lluvia");
    const colores = ["#e7899f", "#d96f8c", "#f0a5b8", "#c9859c", "#f4b6c4"];
    for (let i = 0; i < 22; i++) {
        const c = document.createElement("span");
        c.className = "corazon-sube";
        c.textContent = i % 3 === 0 ? "♡" : "♥";
        c.style.left = `${Math.random() * 100}%`;
        c.style.fontSize = `${16 + Math.random() * 26}px`;
        c.style.color = colores[i % colores.length];
        c.style.animationDuration = `${3 + Math.random() * 2.5}s`;
        c.style.animationDelay = `${Math.random() * 1.2}s`;
        c.style.setProperty("--vaiven", `${(Math.random() - 0.5) * 90}px`);
        c.addEventListener("animationend", () => c.remove());
        capa.appendChild(c);
    }
}

// Flores que brotan alrededor del texto
function lanzarFlores() {
    const zona = $("flores-razon");
    const tipos = [margarita, lirio, gerbera];
    for (let i = 0; i < 8; i++) {
        const f = document.createElement("span");
        f.className = "flor-razon";
        f.innerHTML = `<svg viewBox="-65 -65 130 130">${tipos[i % tipos.length]()}</svg>`;
        f.style.left = `${Math.random() * 90}%`;
        f.style.top = `${Math.random() * 75}%`;
        f.style.width = `${34 + Math.random() * 28}px`;
        f.style.animationDelay = `${i * 0.12}s`;
        f.addEventListener("animationend", () => f.remove());
        zona.appendChild(f);
    }
}

$("siempre").addEventListener("click", () => {
    $("sorpresa").textContent = "Siempre te amaré, hoy y mañana.";
    lanzarCorazones();
});

$("razon").addEventListener("click", () => {
    $("sorpresa").textContent = razones[indiceRazon % razones.length];
    indiceRazon++;
    lanzarFlores();
});

// Botón de broma: huye 5 veces y luego se deja atrapar.
const btnTerminar = $("terminar");
const huidas = ["Uy, casi...", "Ni lo toques.", "¿En serio lo intentas?", "Mejor presiona el otro botón.", "No me vas a atrapar."];
const MAX_HUIDAS = huidas.length;
let intentos = 0;

function resetearTerminar() {
    intentos = 0;
    btnTerminar.classList.remove("huyendo");
    btnTerminar.style.left = "";
    btnTerminar.style.top = "";
    $("pista").textContent = "";
}

function escapar(evento) {
    if (intentos >= MAX_HUIDAS) return;
    if (evento.cancelable) evento.preventDefault();
    btnTerminar.classList.add("huyendo");
    const maxX = Math.max(10, window.innerWidth - btnTerminar.offsetWidth - 20);
    const maxY = Math.max(10, window.innerHeight - btnTerminar.offsetHeight - 20);
    btnTerminar.style.left = `${Math.random() * maxX}px`;
    btnTerminar.style.top = `${Math.random() * maxY}px`;
    intentos++;
    $("pista").textContent = intentos >= MAX_HUIDAS ? "Ya, me cansé... haz lo que quieras." : huidas[intentos - 1];
}

btnTerminar.addEventListener("pointerenter", escapar);
btnTerminar.addEventListener("touchstart", escapar, { passive: false });
btnTerminar.addEventListener("click", () => {
    if (intentos < MAX_HUIDAS) { escapar(new Event("click")); return; }
    resetearTerminar();
    mostrarPantalla("enojo");
});

$("perdon").addEventListener("click", () => {
    mostrarPantalla("final");
    $("sorpresa").textContent = "Así me gusta. Te amo.";
});

$("volver").addEventListener("click", () => {
    $("folder").classList.remove("abriendo");
    $("abrir").disabled = false;
    $("sorpresa").textContent = "";
    resetearTerminar();
    mostrarPantalla("portada");
});

$("abrir").addEventListener("click", abrirLibro);
$("comenzar").addEventListener("click", comenzarAlbum);
$("anterior").addEventListener("click", () => cambiarPagina(-1));
$("siguiente").addEventListener("click", () => cambiarPagina(1));

// Flechas del teclado en el álbum
document.addEventListener("keydown", (e) => {
    if (pantallaActual !== "album") return;
    if (e.key === "ArrowRight") cambiarPagina(1);
    if (e.key === "ArrowLeft") cambiarPagina(-1);
});