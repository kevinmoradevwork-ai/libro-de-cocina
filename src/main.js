import './style.css';
import { RecipeBook } from './book.js';
import { sound } from './audio.js';

const app = document.querySelector('#app');

// Plantilla principal del escenario con navegación lateral y barra inferior limpia
app.innerHTML = `
  <!-- Barra Superior -->
  <header class="top-nav-bar">
    <div class="brand-stamp">
      <span>📖</span>
      <span>Recetario Familiar</span>
    </div>
    <div class="hint-bubble" id="hint-bubble">
      ✨ Pasa las páginas arrastrando o usando las flechas
    </div>
  </header>

  <!-- Escenario del Libro 3D con Botones Flotantes Laterales -->
  <main class="book-stage-container">
    <button class="side-nav-btn side-nav-prev" id="side-btn-prev" aria-label="Página anterior" title="Página anterior">
      <span class="side-arrow">‹</span>
    </button>

    <div id="flipbook-wrapper"></div>

    <button class="side-nav-btn side-nav-next" id="side-btn-next" aria-label="Página siguiente" title="Página siguiente">
      <span class="side-arrow">›</span>
    </button>
  </main>

  <!-- Barra de Controles Inferior (Separada y Compacta) -->
  <footer class="bottom-controls-bar">
    <button class="control-btn" id="btn-prev" aria-label="Página anterior" title="Página anterior">
      <span>◀</span>
      <span class="btn-text">Anterior</span>
    </button>

    <div class="page-counter-badge" id="page-indicator">
      Portada
    </div>

    <button class="control-btn" id="btn-next" aria-label="Página siguiente" title="Página siguiente">
      <span class="btn-text">Siguiente</span>
      <span>▶</span>
    </button>

    <button class="control-btn control-icon-btn" id="btn-audio" aria-label="Silenciar / Activar sonido" title="Sonido">
      <span id="audio-icon">🔊</span>
    </button>

    <button class="control-btn control-icon-btn" id="btn-fullscreen" aria-label="Pantalla completa" title="Pantalla completa">
      <span>⛶</span>
    </button>
  </footer>
`;

// Elementos del DOM
const flipbookWrapper = document.getElementById('flipbook-wrapper');
const btnPrev = document.getElementById('btn-prev');
const btnNext = document.getElementById('btn-next');
const sideBtnPrev = document.getElementById('side-btn-prev');
const sideBtnNext = document.getElementById('side-btn-next');
const btnAudio = document.getElementById('btn-audio');
const audioIcon = document.getElementById('audio-icon');
const btnFullscreen = document.getElementById('btn-fullscreen');
const pageIndicator = document.getElementById('page-indicator');
const hintBubble = document.getElementById('hint-bubble');

// Nombres descriptivos para el contador de páginas
const pageNames = [
  'Portada',
  '1: Prólogo',
  '2: Ingrediente 1',
  '3: Ingrediente 2',
  '4: Ingrediente 3',
  '5: Ingrediente Secreto',
  '6: El Paso Final',
  '7: Dedicatoria',
  'Contraportada'
];

function updateIndicator(pageIndex, totalPages) {
  if (pageIndex === 0) {
    pageIndicator.textContent = 'Portada';
    btnPrev.classList.add('disabled');
    sideBtnPrev.classList.add('disabled');
  } else {
    btnPrev.classList.remove('disabled');
    sideBtnPrev.classList.remove('disabled');
  }

  if (pageIndex >= totalPages - 1) {
    pageIndicator.textContent = 'Contraportada';
    btnNext.classList.add('disabled');
    sideBtnNext.classList.add('disabled');
  } else {
    btnNext.classList.remove('disabled');
    sideBtnNext.classList.remove('disabled');
  }

  if (pageIndex > 0 && pageIndex < totalPages - 1) {
    const descriptive = pageNames[pageIndex] || `Página ${pageIndex}`;
    pageIndicator.textContent = descriptive;
  }

  // Ocultar suavemente el hint tras la primera interacción
  if (pageIndex > 0 && hintBubble) {
    hintBubble.style.opacity = '0.35';
  }
}

// Inicializar el libro
const book = new RecipeBook(flipbookWrapper, updateIndicator);

// Control de botones inferiores
btnPrev.addEventListener('click', () => book.prev());
btnNext.addEventListener('click', () => book.next());

// Control de botones flotantes laterales
sideBtnPrev.addEventListener('click', () => book.prev());
sideBtnNext.addEventListener('click', () => book.next());

// Control de Sonido (Mute/Unmute)
btnAudio.addEventListener('click', () => {
  const isMuted = sound.toggleMute();
  audioIcon.textContent = isMuted ? '🔇' : '🔊';
  btnAudio.title = isMuted ? 'Sonido desactivado' : 'Sonido activado';
});

// Control de Pantalla Completa
btnFullscreen.addEventListener('click', () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch(() => {});
  } else {
    document.exitFullscreen().catch(() => {});
  }
});

// Soporte de navegación por teclado (Flechas ← y → o Espacio)
window.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight' || e.key === ' ') {
    book.next();
  } else if (e.key === 'ArrowLeft') {
    book.prev();
  }
});
