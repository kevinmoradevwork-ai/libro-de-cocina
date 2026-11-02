import pageFlipPkg from 'page-flip';
import { bookContent } from './pagesData.js';
import { sound } from './audio.js';
import { launchCelebration } from './celebrations.js';

// Manejador seguro para compatibilidad de empaquetado ESM/CJS de page-flip
const PageFlip = pageFlipPkg.PageFlip || pageFlipPkg;

export class RecipeBook {
  constructor(containerElement, onPageChangeCallback) {
    this.container = containerElement;
    this.onPageChange = onPageChangeCallback;
    this.pageFlip = null;
    this.climaxTriggered = false;
    this.init();
  }

  generateHTML() {
    return `
      <!-- PORTADA (Hard Cover) -->
      <div class="page page-cover page-cover-front" data-density="hard">
        <div class="page-content leather-cover">
          <div class="embossed-border">
            <div class="corner-ornament top-left"></div>
            <div class="corner-ornament top-right"></div>
            <div class="corner-ornament bottom-left"></div>
            <div class="corner-ornament bottom-right"></div>

            <div class="cover-inner-frame">
              <div class="cover-badge">${bookContent.cover.badge}</div>
              
              <div class="vintage-utensil-icon">
                <svg viewBox="0 0 100 100" class="gold-icon" width="50" height="50">
                  <path d="M50 15 C45 25 35 35 35 50 C35 65 45 75 50 85 C55 75 65 65 65 50 C65 35 55 25 50 15 Z" fill="none" stroke="currentColor" stroke-width="2.5" />
                  <circle cx="50" cy="50" r="10" fill="none" stroke="currentColor" stroke-width="2" />
                  <line x1="30" y1="50" x2="70" y2="50" stroke="currentColor" stroke-width="2" />
                </svg>
              </div>

              <h1 class="cover-title">${bookContent.cover.title}</h1>
              <div class="cover-ribbon-divider">
                <span>✦ ✦ ✦</span>
              </div>
              <h2 class="cover-subtitle">${bookContent.cover.subtitle}</h2>
              <p class="cover-edition">${bookContent.cover.edition}</p>

              <div class="cover-hint">
                <span>${bookContent.cover.hint}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- PÁGINA 1: Portadilla / Prólogo (Interior Soft) -->
      <div class="page parchment-page page-left" data-density="soft">
        <div class="page-content">
          <div class="page-spine-shadow"></div>
          <div class="deckled-border"></div>
          <div class="flour-dust dust-tr"></div>
          <div class="flour-dust dust-bl"></div>

          <div class="page-header-small">
            <span>MEMORIAS DE COCINA FAMILIAR</span>
          </div>

          <div class="ex-libris-box">
            <div class="ex-libris-label">RECETARIO EXCLUSIVO</div>
            <div class="ex-libris-name">${bookContent.page1.bookplate}</div>
          </div>

          <h3 class="recipe-book-title">${bookContent.page1.title}</h3>
          <div class="vintage-line-divider">❧ ❦ ❧</div>

          <p class="prose-text">${bookContent.page1.text1}</p>
          <p class="prose-text highlight-quote">${bookContent.page1.quote}</p>
          <p class="prose-text">${bookContent.page1.text2}</p>

          <div class="handwritten-note parchment-note">
            <span class="script-text">${bookContent.page1.instruction}</span>
          </div>

          <div class="page-number-footer">1</div>
        </div>
      </div>

      <!-- PÁGINA 2: Ingrediente 1 -->
      <div class="page parchment-page page-right" data-density="soft">
        <div class="page-content">
          <div class="page-spine-shadow"></div>
          <div class="deckled-border"></div>
          <div class="flour-dust dust-tl"></div>
          <div class="coffee-stain stain-br"></div>

          <div class="ingredient-badge">
            <span class="ing-step">INGREDIENTE</span>
            <span class="ing-num">${bookContent.ingredient1.number}</span>
          </div>

          <h2 class="ingredient-title">${bookContent.ingredient1.name}</h2>
          <div class="vintage-line-divider">✦ ✦ ✦</div>

          <div class="ingredient-illustration">
            <svg viewBox="0 0 120 90" width="75" height="52" class="sepia-sketch">
              <!-- Vintage Teacup / Measuring Cup Sketch -->
              <path d="M 25 35 C 25 65, 45 75, 70 75 C 95 75, 105 65, 105 35 Z" fill="none" stroke="#7b5534" stroke-width="2.2" stroke-linecap="round" />
              <ellipse cx="65" cy="35" rx="40" ry="10" fill="#fbf8f0" stroke="#7b5534" stroke-width="2.2" />
              <!-- Steam waves -->
              <path d="M 50 25 C 45 18, 55 12, 50 5" fill="none" stroke="#9e724a" stroke-width="1.8" stroke-dasharray="2,2" />
              <path d="M 65 24 C 60 17, 70 11, 65 4" fill="none" stroke="#9e724a" stroke-width="1.8" stroke-dasharray="2,2" />
              <path d="M 80 25 C 75 18, 85 12, 80 5" fill="none" stroke="#9e724a" stroke-width="1.8" stroke-dasharray="2,2" />
              <!-- Handle -->
              <path d="M 105 40 C 120 40, 120 62, 100 65" fill="none" stroke="#7b5534" stroke-width="2.2" />
              <!-- Saucer -->
              <path d="M 15 78 C 45 88, 85 88, 115 78" fill="none" stroke="#7b5534" stroke-width="2.5" />
            </svg>
          </div>

          <p class="recipe-prose">${bookContent.ingredient1.description}</p>

          <div class="recipe-postit">
            <div class="postit-pin"></div>
            <p class="handwritten-script">✍ ${bookContent.ingredient1.handwrittenNote}</p>
          </div>

          <div class="page-number-footer">2</div>
        </div>
      </div>

      <!-- PÁGINA 3: Ingrediente 2 -->
      <div class="page parchment-page page-left" data-density="soft">
        <div class="page-content">
          <div class="page-spine-shadow"></div>
          <div class="deckled-border"></div>
          <div class="flour-dust dust-br"></div>
          <div class="oil-drop-stain stain-tl"></div>

          <div class="ingredient-badge">
            <span class="ing-step">INGREDIENTE</span>
            <span class="ing-num">${bookContent.ingredient2.number}</span>
          </div>

          <h2 class="ingredient-title">${bookContent.ingredient2.name}</h2>
          <div class="vintage-line-divider">✦ ✦ ✦</div>

          <div class="ingredient-illustration">
            <svg viewBox="0 0 120 90" width="75" height="52" class="sepia-sketch">
              <!-- Wooden Spoons / Whisks Sketch -->
              <line x1="20" y1="20" x2="90" y2="75" stroke="#7b5534" stroke-width="3" stroke-linecap="round" />
              <ellipse cx="20" cy="20" rx="14" ry="9" transform="rotate(-35 20 20)" fill="none" stroke="#7b5534" stroke-width="2.2" />
              <line x1="95" y1="20" x2="25" y2="75" stroke="#9e724a" stroke-width="3" stroke-linecap="round" />
              <ellipse cx="95" cy="20" rx="14" ry="9" transform="rotate(35 95 20)" fill="none" stroke="#9e724a" stroke-width="2.2" />
              <!-- Hearts floating -->
              <path d="M 58 25 C 58 20 64 16 68 20 C 72 16 78 20 78 25 C 78 32 68 38 68 38 C 68 38 58 32 58 25 Z" fill="#c25e5e" opacity="0.6" />
            </svg>
          </div>

          <p class="recipe-prose">${bookContent.ingredient2.description}</p>

          <div class="recipe-postit taped-card">
            <div class="washi-tape-strip"></div>
            <p class="handwritten-script">✍ ${bookContent.ingredient2.handwrittenNote}</p>
          </div>

          <div class="page-number-footer">3</div>
        </div>
      </div>

      <!-- PÁGINA 4: Ingrediente 3 -->
      <div class="page parchment-page page-right" data-density="soft">
        <div class="page-content">
          <div class="page-spine-shadow"></div>
          <div class="deckled-border"></div>
          <div class="flour-dust dust-tr"></div>
          <div class="coffee-stain stain-bl"></div>

          <div class="ingredient-badge">
            <span class="ing-step">INGREDIENTE</span>
            <span class="ing-num">${bookContent.ingredient3.number}</span>
          </div>

          <h2 class="ingredient-title">${bookContent.ingredient3.name}</h2>
          <div class="vintage-line-divider">✦ ✦ ✦</div>

          <div class="ingredient-illustration">
            <svg viewBox="0 0 120 90" width="75" height="52" class="sepia-sketch">
              <!-- Vintage Spice Jar Sketch -->
              <rect x="42" y="25" width="36" height="50" rx="6" fill="none" stroke="#7b5534" stroke-width="2.2" />
              <rect x="46" y="16" width="28" height="10" rx="2" fill="none" stroke="#7b5534" stroke-width="2.2" />
              <line x1="42" y1="42" x2="78" y2="42" stroke="#9e724a" stroke-width="1.5" stroke-dasharray="3,3" />
              <line x1="42" y1="58" x2="78" y2="58" stroke="#9e724a" stroke-width="1.5" stroke-dasharray="3,3" />
              <text x="60" y="52" fill="#7b5534" font-family="'Courier Prime', monospace" font-size="9" text-anchor="middle">AMOR</text>
              <!-- Star anise / cinnamon stick -->
              <line x1="88" y1="35" x2="108" y2="70" stroke="#684528" stroke-width="4" stroke-linecap="round" />
            </svg>
          </div>

          <p class="recipe-prose">${bookContent.ingredient3.description}</p>

          <div class="recipe-postit">
            <div class="postit-pin"></div>
            <p class="handwritten-script">✍ ${bookContent.ingredient3.handwrittenNote}</p>
          </div>

          <div class="page-number-footer">4</div>
        </div>
      </div>

      <!-- PÁGINA 5: Ingrediente 4 (El Ingrediente Secreto) -->
      <div class="page parchment-page page-left" data-density="soft">
        <div class="page-content">
          <div class="page-spine-shadow"></div>
          <div class="deckled-border"></div>
          <div class="flour-dust dust-tl"></div>
          <div class="flour-dust dust-br"></div>

          <div class="ingredient-badge secret-badge">
            <span class="ing-step">INGREDIENTE ESPECIAL</span>
            <span class="ing-num">★</span>
          </div>

          <h2 class="ingredient-title secret-title">${bookContent.ingredient4.name}</h2>
          <div class="vintage-line-divider">✦ ✦ ✦</div>

          <div class="secret-box-card">
            <div class="wax-heart-mini">♥</div>
            <p class="secret-prose">${bookContent.ingredient4.description}</p>
          </div>

          <div class="anticipation-block">
            <p class="anticipation-question">${bookContent.ingredient4.anticipation}</p>
            <div class="arrow-turn">
              <span class="script-cursive">${bookContent.ingredient4.handwrittenNote}</span>
              <span class="animated-arrow">➔</span>
            </div>
          </div>

          <div class="page-number-footer">5</div>
        </div>
      </div>

      <!-- PÁGINA 6: El Clímax (¡HORNEADO: 9 MESES Y ULTRASONIDO!) -->
      <div class="page parchment-page page-right climax-page" data-density="soft">
        <div class="page-content">
          <div class="page-spine-shadow"></div>
          <div class="deckled-border"></div>
          <div class="golden-sparkles-bg"></div>

          <div class="climax-banner">
            <span class="climax-step-tag">${bookContent.climax.step}</span>
            <h2 class="baking-time-text">${bookContent.climax.bakingTime}</h2>
            <div class="grandma-reveal-tag">${bookContent.climax.bigReveal}</div>
          </div>

          <!-- Marco Polaroid Vintage con la Foto de Ecografía -->
          <div class="polaroid-wrapper" id="polaroid-card">
            <div class="washi-tape-top"></div>
            <div class="polaroid-inner">
              <div class="ultrasound-container" id="ultrasound-container" title="Área de fotografía (puedes hacer clic para seleccionar tu foto o guardar public/ultrasonido.jpg)">
                <input type="file" id="ultrasound-input" accept="image/*" style="display: none;" />
                <img id="ultrasound-img" src="${bookContent.climax.image || '/ultrasonido.jpg'}" alt="Ecografía de tu futuro nieto/a" onerror="this.onerror=null; this.src='/ultrasonido-placeholder.svg';" />
              </div>
              <div class="polaroid-caption">
                <p class="caption-handwritten">${bookContent.climax.babyNote}</p>
              </div>
            </div>
          </div>

          <div class="page-number-footer">6</div>
        </div>
      </div>

      <!-- PÁGINA 7: Dedicatoria y Cierre Emotivo -->
      <div class="page parchment-page page-left" data-density="soft">
        <div class="page-content">
          <div class="page-spine-shadow"></div>
          <div class="deckled-border"></div>
          <div class="flour-dust dust-tr"></div>
          <div class="flour-dust dust-bl"></div>

          <h3 class="epilogue-title">${bookContent.epilogue.title}</h3>
          <div class="vintage-line-divider">❧ ❦ ❧</div>

          <p class="prose-text">${bookContent.epilogue.text1}</p>
          <p class="prose-text">${bookContent.epilogue.text2}</p>

          <div class="arrival-date-box">
            <div class="calendar-icon">🗓️</div>
            <div class="date-text" id="arrival-date-display">${bookContent.epilogue.estimatedArrival}</div>
          </div>

          <div class="signatures-wrapper">
            ${bookContent.epilogue.signaturePrompt ? `<p class="sign-prompt">${bookContent.epilogue.signaturePrompt}</p>` : ''}
            <p class="handwritten-signature">${bookContent.epilogue.signature}</p>
          </div>

          <div class="page-number-footer">7</div>
        </div>
      </div>

      <!-- CONTRAPORTADA (Hard Cover Back) -->
      <div class="page page-cover page-cover-back" data-density="hard">
        <div class="page-content leather-cover">
          <div class="embossed-border">
            <div class="corner-ornament top-left"></div>
            <div class="corner-ornament top-right"></div>
            <div class="corner-ornament bottom-left"></div>
            <div class="corner-ornament bottom-right"></div>

            <div class="back-cover-center">
              <div class="wax-seal-3d">
                <div class="seal-ring">
                  <div class="seal-inner-heart">♥</div>
                  <div class="seal-text">${bookContent.backCover.sealText}</div>
                </div>
              </div>

              <div class="back-cover-badge">${bookContent.backCover.familyBadge}</div>
              <p class="back-quote">«${bookContent.backCover.quote}»</p>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  init() {
    this.container.innerHTML = this.generateHTML();

    // Restaurar foto de ultrasonido guardada previamente si existe
    this.restoreSavedUltrasound();

    // Configuración optimizada de PageFlip con aspecto adaptable y sin desborde
    this.pageFlip = new PageFlip(this.container, {
      width: 420,
      height: 570,
      size: 'stretch',
      minWidth: 260,
      maxWidth: 480,
      minHeight: 340,
      maxHeight: 640,
      maxShadowOpacity: 0.65,
      showCover: true,
      usePortrait: true,
      flippingTime: 850,
      useMouseEvents: true,
      mobileScrollSupport: false,
      swipeDistance: 25,
      disableFlipByClick: false
    });

    // Cargar páginas HTML
    const pages = this.container.querySelectorAll('.page');
    this.pageFlip.loadFromHTML(pages);

    // Conectar eventos
    this.attachEvents();
    this.attachUltrasoundUploader();
  }

  attachEvents() {
    this.pageFlip.on('flip', (e) => {
      sound.playPageFlip();
      const pageIndex = e.data;

      if (this.onPageChange) {
        this.onPageChange(pageIndex, this.pageFlip.getPageCount());
      }

      // En modo portrait (celular), solo se ve una página: la ecografía es exclusivamente la página 6
      // En modo landscape (computadora/tablet), se ve doble página: el pliego 5-6 muestra la ecografía a la derecha
      const isPortrait = this.pageFlip.getOrientation() === 'portrait';
      const isClimaxPage = isPortrait ? (pageIndex === 6) : (pageIndex === 5 || pageIndex === 6);

      // Si el usuario regresa a la portada, reiniciar para permitir celebrar nuevamente al llegar al clímax
      if (pageIndex === 0) {
        this.climaxTriggered = false;
      }

      if (isClimaxPage) {
        if (!this.climaxTriggered) {
          this.climaxTriggered = true;
          sound.playChime();
          launchCelebration();
        }
      }
    });

    this.pageFlip.on('changeState', (e) => {
      if (e.data === 'user_fold') {
        sound.ensureContext();
      }
    });

    // Botón de confeti en la misma página de clímax
    const confettiBtn = document.getElementById('climax-confetti-btn');
    if (confettiBtn) {
      confettiBtn.addEventListener('click', (ev) => {
        ev.stopPropagation();
        sound.playChime();
        launchCelebration();
      });
    }
  }

  attachUltrasoundUploader() {
    const container = document.getElementById('ultrasound-container');
    const input = document.getElementById('ultrasound-input');
    const img = document.getElementById('ultrasound-img');

    if (container && input) {
      container.addEventListener('click', (ev) => {
        ev.stopPropagation();
        input.click();
      });
    }

    if (input && img) {
      input.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (loadEvent) => {
          const result = loadEvent.target.result;
          img.src = result;
          try {
            localStorage.setItem('revelacion_ultrasonido_foto', result);
          } catch (storageError) {
            console.warn('Imagen guardada solo en memoria de sesión:', storageError);
          }
          launchCelebration();
        };
        reader.readAsDataURL(file);
      });
    }
  }

  restoreSavedUltrasound() {
    try {
      const saved = localStorage.getItem('revelacion_ultrasonido_foto');
      const img = document.getElementById('ultrasound-img');
      if (saved && img) {
        img.src = saved;
      }
    } catch (e) {
      // noop
    }
  }

  next() {
    if (this.pageFlip) {
      sound.ensureContext();
      this.pageFlip.flipNext();
    }
  }

  prev() {
    if (this.pageFlip) {
      sound.ensureContext();
      this.pageFlip.flipPrev();
    }
  }

  goToPage(num) {
    if (this.pageFlip) {
      sound.ensureContext();
      this.pageFlip.flip(num);
    }
  }

  getCurrentPage() {
    return this.pageFlip ? this.pageFlip.getCurrentPageIndex() : 0;
  }

  getTotalPages() {
    return this.pageFlip ? this.pageFlip.getPageCount() : 8;
  }
}
