/**
 * ============================================================================
 * INVITACIÓN DIGITAL DE GRADUACIÓN - PROMOCIÓN DREAM 2026
 * Colegio Particular Evangélico "La Misión de Jesús"
 * Script Principal ES6+
 * ============================================================================
 */

(() => {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ==========================================================================
     1. CATÁLOGO DE LAS 27 FOTOGRAFÍAS GRUPALES Y FRASES EMOTIVAS
     ========================================================================== */
  const GROUP_PHOTOS = [
    { file: 'DSC_0637.jpg', quote: '“Más que compañeros, una familia.”' },
    { file: 'DSC_0641.jpg', quote: '“Cada recuerdo forma parte de nuestra historia.”' },
    { file: 'DSC_0642.jpg', quote: '“Los caminos cambian, pero la amistad permanece.”' },
    { file: 'DSC_0645.jpg', quote: '“Unidos por un mismo sueño: Promoción DREAM 2026.”' },
    { file: 'DSC_0648.jpg', quote: '“Más que compañeros, una familia.”' },
    { file: 'DSC_0650.jpg', quote: '“Cada recuerdo forma parte de nuestra historia.”' },
    { file: 'DSC_0652.jpg', quote: '“Los caminos cambian, pero la amistad permanece.”' },
    { file: 'DSC_0669.jpg', quote: '“Agradecidos con quienes nos guiaron en este camino.”' },
    { file: 'DSC_0671.jpg', quote: '“Momentos que quedarán grabados para siempre en el alma.”' },
    { file: 'DSC_0674.jpg', quote: '“Más que compañeros, una familia.”' },
    { file: 'DSC_0678.jpg', quote: '“Divertidos Recuerdos Entre Amigos Memorables.”' },
    { file: 'DSC_0679.jpg', quote: '“Cada recuerdo forma parte de nuestra historia.”' },
    { file: 'DSC_0681.jpg', quote: '“La risa compartida hace eterna nuestra juventud.”' },
    { file: 'DSC_0683.jpg', quote: '“Los caminos cambian, pero la amistad permanece.”' },
    { file: 'DSC_0694.jpg', quote: '“Juntos construimos una etapa inolvidable.”' },
    { file: 'DSC_0697.jpg', quote: '“Más que compañeros, una familia.”' },
    { file: 'DSC_0701.jpg', quote: '“Cada paso dado juntos nos trajo hasta esta gran meta.”' },
    { file: 'DSC_0732.jpg', quote: '“Cada recuerdo forma parte de nuestra historia.”' },
    { file: 'DSC_0737.jpg', quote: '“Risas, complicidad y sueños que hoy florecen.”' },
    { file: 'DSC_0740.jpg', quote: '“Los caminos cambian, pero la amistad permanece.”' },
    { file: 'DSC_0745.jpg', quote: '“Celebrando la dicha de haber coincidido en esta vida.”' },
    { file: 'DSC_0748.jpg', quote: '“Orgullosos de llevar en alto el nombre de DREAM 26.”' },
    { file: 'DSC_0756.jpg', quote: '“Más que compañeros, una familia.”' },
    { file: 'DSC_0766.jpg', quote: '“Cada recuerdo forma parte de nuestra historia.”' },
    { file: 'DSC_0768.jpg', quote: '“Los caminos cambian, pero la amistad permanece.”' },
    { file: 'DSC_0771.jpg', quote: '“Amistades verdaderas que el tiempo jamás borrará.”' },
    { file: 'DSC_0774.jpg', quote: '“Mirando hacia el futuro con gratitud y esperanza.”' },
    { file: 'DSC_0780.jpg', quote: '“Más que compañeros, una familia.”' },
    { file: 'DSC_0788.jpg', quote: '“Cada recuerdo forma parte de nuestra historia.”' },
    { file: 'DSC_0790.jpg', quote: '“Los caminos cambian, pero la amistad permanece.”' },
    { file: 'DSC_0792.jpg', quote: '“Brillando juntos hoy y siempre: DREAM 2026.”' },
    { file: 'DSC_0799.jpg', quote: '“No es el final de nuestra historia, es el comienzo de nuestros sueños.”' }
  ];

  /* ==========================================================================
     2. CONTROLADOR DE MÚSICA DE FONDO ("YELOW")
     ========================================================================== */
  class GalaAudioController {
    constructor() {
      this.audioEl = document.getElementById('bgAudio');
      this.toggleBtn = document.getElementById('musicToggleBtn');
      this.btnLabel = document.getElementById('musicBtnLabel');
      this.isPlaying = false;

      this.init();
    }

    init() {
      if (this.audioEl) {
        this.audioEl.volume = 0.55;
        this.audioEl.addEventListener('play', () => {
          this.isPlaying = true;
          this.updateUI();
        });
        this.audioEl.addEventListener('pause', () => {
          this.isPlaying = false;
          this.updateUI();
        });
        this.audioEl.addEventListener('ended', () => {
          this.isPlaying = false;
          this.updateUI();
        });
      }
      if (this.toggleBtn) {
        this.toggleBtn.addEventListener('click', () => this.toggle());
      }
    }

    async start() {
      if (!this.audioEl || this.isPlaying) return;

      try {
        await this.audioEl.play();
        this.isPlaying = true;
        this.updateUI();
      } catch (err) {
        console.warn('No se pudo reproducir el audio automáticamente:', err);
        this.isPlaying = false;
        this.updateUI();
      }
    }

    stop() {
      this.isPlaying = false;
      if (this.audioEl && !this.audioEl.paused) {
        this.audioEl.pause();
      }
      this.updateUI();
    }

    toggle() {
      if (this.isPlaying) {
        this.stop();
      } else {
        this.start();
      }
    }

    updateUI() {
      if (!this.toggleBtn) return;
      this.toggleBtn.classList.toggle('is-playing', this.isPlaying);
      this.toggleBtn.setAttribute('aria-pressed', String(this.isPlaying));
      if (this.btnLabel) {
        this.btnLabel.textContent = this.isPlaying ? 'Sonando' : 'Música';
      }
    }
  }

  /* ==========================================================================
     3. PARTÍCULAS DORADAS EN CANVAS
     ========================================================================== */
  function initGoldParticles() {
    const canvas = document.getElementById('goldParticles');
    if (!canvas || prefersReducedMotion) return;

    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let animationFrameId = null;

    const particleCount = window.innerWidth < 768 ? 36 : 68;
    const colors = ['#FFD700', '#D4AF37', '#C9A227', '#FFF3B0'];

    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2.2 + 0.6,
      speedY: -(Math.random() * 0.35 + 0.12),
      speedX: (Math.random() - 0.5) * 0.28,
      alpha: Math.random() * 0.65 + 0.2,
      alphaSpeed: (Math.random() * 0.012 + 0.004) * (Math.random() < 0.5 ? 1 : -1),
      color: colors[Math.floor(Math.random() * colors.length)]
    }));

    function render() {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.speedX;
        p.y += p.speedY;
        p.alpha += p.alphaSpeed;

        if (p.alpha <= 0.15 || p.alpha >= 0.85) {
          p.alphaSpeed *= -1;
        }

        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        ctx.save();
        ctx.globalAlpha = Math.max(0.1, Math.min(0.9, p.alpha));
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    }

    render();

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    document.addEventListener('visibilitychange', () => {
      if (document.hidden && animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      } else if (!document.hidden && !animationFrameId) {
        render();
      }
    });
  }

  /* ==========================================================================
     4. PANTALLA DE BIENVENIDA Y APERTURA CINEMATOGRÁFICA
     ========================================================================== */
  function initWelcomeScreen(audioController) {
    const welcomeScreen = document.getElementById('welcomeScreen');
    const mainInvitation = document.getElementById('mainInvitation');
    const openBtn = document.getElementById('openInvitationBtn');

    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    if (!welcomeScreen || !mainInvitation || !openBtn) return;

    openBtn.addEventListener('click', () => {
      // Iniciar música tras la interacción del visitante
      audioController.start();

      // Desbloquear scroll y animar transición desde el principio de la página
      document.body.classList.remove('locked-scroll');
      window.scrollTo(0, 0);
      welcomeScreen.classList.add('is-opening');
      mainInvitation.setAttribute('aria-hidden', 'false');
      mainInvitation.classList.add('is-visible');

      setTimeout(() => {
        welcomeScreen.style.display = 'none';
      }, 1150);
    });
  }

  /* ==========================================================================
     5. CUENTA REGRESIVA (28 DE NOVIEMBRE DE 2026 - 19:00 UTC-4 BOLIVIA)
     ========================================================================== */
  function initCountdown() {
    const daysEl = document.getElementById('cdDays');
    const hoursEl = document.getElementById('cdHours');
    const minutesEl = document.getElementById('cdMinutes');
    const secondsEl = document.getElementById('cdSeconds');
    const boxesEl = document.getElementById('countdownBoxes');
    const completedEl = document.getElementById('countdownCompleted');

    if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

    // Fecha objetivo exacta en hora de Bolivia (UTC-4)
    const targetTime = new Date('2026-11-28T19:00:00-04:00').getTime();

    function updateCounter() {
      const now = Date.now();
      const diff = targetTime - now;

      if (diff <= 0) {
        if (boxesEl) boxesEl.hidden = true;
        if (completedEl) completedEl.hidden = false;
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      daysEl.textContent = String(days).padStart(2, '0');
      hoursEl.textContent = String(hours).padStart(2, '0');
      minutesEl.textContent = String(minutes).padStart(2, '0');
      secondsEl.textContent = String(seconds).padStart(2, '0');
    }

    updateCounter();
    setInterval(updateCounter, 1000);
  }

  /* ==========================================================================
     6. CARRUSEL INTERACTIVO Y GALERÍA DE RECUERDOS GRUPALES
     ========================================================================== */
  function initMemoriesGallery(openLightboxCallback) {
    const mainImg = document.getElementById('carouselMainImg');
    const quoteText = document.getElementById('carouselQuoteText');
    const counterEl = document.getElementById('carouselCounter');
    const prevBtn = document.getElementById('carouselPrev');
    const nextBtn = document.getElementById('carouselNext');
    const fullscreenBtn = document.getElementById('carouselFullscreenBtn');
    const autoplayBtn = document.getElementById('carouselAutoplayBtn');
    const autoplayLabel = document.getElementById('carouselAutoplayLabel');
    const thumbsContainer = document.getElementById('carouselThumbs');
    const toggleGridBtn = document.getElementById('toggleAllMemoriesBtn');
    const fullGridContainer = document.getElementById('memoriesFullGrid');
    const stage = document.getElementById('carouselStage');

    if (!mainImg || !thumbsContainer) return;

    let currentIndex = 0;
    let isAutoplay = !prefersReducedMotion;
    let autoplayInterval = null;
    const total = GROUP_PHOTOS.length;

    // Construir miniaturas y cuadrícula completa
    GROUP_PHOTOS.forEach((item, index) => {
      const imgPath = `assets/grupales/${item.file}`;

      // Miniatura del carrusel
      const thumbBtn = document.createElement('button');
      thumbBtn.type = 'button';
      thumbBtn.className = `carousel-thumb${index === 0 ? ' is-active' : ''}`;
      thumbBtn.setAttribute('aria-label', `Ver recuerdo ${index + 1}`);
      thumbBtn.innerHTML = `<img src="${imgPath}" alt="Miniatura recuerdo ${index + 1}" loading="lazy" />`;
      thumbBtn.addEventListener('click', () => {
        goToSlide(index);
        resetAutoplay();
      });
      thumbsContainer.appendChild(thumbBtn);

      // Elemento de cuadrícula completa
      if (fullGridContainer) {
        const gridItem = document.createElement('div');
        gridItem.className = 'memory-grid-item';
        gridItem.setAttribute('role', 'button');
        gridItem.setAttribute('tabindex', '0');
        gridItem.setAttribute('aria-label', `Ampliar fotografía grupal ${index + 1}`);
        gridItem.innerHTML = `<img src="${imgPath}" alt="Recuerdo grupal ${index + 1} - DREAM 2026" loading="lazy" />`;
        gridItem.addEventListener('click', () => {
          openLightboxCallback(
            GROUP_PHOTOS.map((g, i) => ({
              src: `assets/grupales/${g.file}`,
              title: `Recuerdo DREAM 2026 (${i + 1} de ${total})`,
              subtitle: g.quote
            })),
            index
          );
        });
        gridItem.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            gridItem.click();
          }
        });
        fullGridContainer.appendChild(gridItem);
      }
    });

    const thumbButtons = Array.from(thumbsContainer.querySelectorAll('.carousel-thumb'));

    function goToSlide(index) {
      currentIndex = (index + total) % total;
      const item = GROUP_PHOTOS[currentIndex];
      const newSrc = `assets/grupales/${item.file}`;

      mainImg.classList.add('is-switching');

      setTimeout(() => {
        mainImg.src = newSrc;
        mainImg.alt = `Recuerdo grupal ${currentIndex + 1} - Promoción DREAM 2026`;
        if (quoteText) quoteText.textContent = item.quote;
        if (counterEl) counterEl.textContent = `${currentIndex + 1} / ${total}`;
        mainImg.classList.remove('is-switching');
      }, 180);

      thumbButtons.forEach((btn, idx) => {
        const active = idx === currentIndex;
        btn.classList.toggle('is-active', active);
        if (active && thumbsContainer) {
          const targetScrollLeft =
            btn.offsetLeft - thumbsContainer.clientWidth / 2 + btn.clientWidth / 2;
          thumbsContainer.scrollTo({
            left: Math.max(0, targetScrollLeft),
            behavior: 'smooth'
          });
        }
      });
    }

    function nextSlide() {
      goToSlide(currentIndex + 1);
    }

    function prevSlide() {
      goToSlide(currentIndex - 1);
    }

    function startAutoplay() {
      stopAutoplay();
      if (!isAutoplay) return;
      autoplayInterval = window.setInterval(nextSlide, 4500);
    }

    function stopAutoplay() {
      if (autoplayInterval) {
        clearInterval(autoplayInterval);
        autoplayInterval = null;
      }
    }

    function resetAutoplay() {
      if (isAutoplay) {
        startAutoplay();
      }
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        prevSlide();
        resetAutoplay();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoplay();
      });
    }

    // Abrir en pantalla completa desde el carrusel
    const openCurrentFullscreen = () => {
      openLightboxCallback(
        GROUP_PHOTOS.map((g, i) => ({
          src: `assets/grupales/${g.file}`,
          title: `Recuerdo DREAM 2026 (${i + 1} de ${total})`,
          subtitle: g.quote
        })),
        currentIndex
      );
    };

    if (fullscreenBtn) {
      fullscreenBtn.addEventListener('click', openCurrentFullscreen);
    }
    mainImg.addEventListener('click', openCurrentFullscreen);

    // Botón de Autoplay
    if (autoplayBtn) {
      autoplayBtn.addEventListener('click', () => {
        isAutoplay = !isAutoplay;
        autoplayBtn.setAttribute('aria-pressed', String(isAutoplay));
        if (autoplayLabel) {
          autoplayLabel.textContent = `Carrusel Automático: ${isAutoplay ? 'Activo' : 'Pausado'}`;
        }
        if (isAutoplay) startAutoplay();
        else stopAutoplay();
      });
    }

    // Botón para desplegar/ocultar cuadrícula de 27 fotos
    if (toggleGridBtn && fullGridContainer) {
      toggleGridBtn.addEventListener('click', () => {
        const isHidden = fullGridContainer.hasAttribute('hidden');
        if (isHidden) {
          fullGridContainer.removeAttribute('hidden');
          toggleGridBtn.querySelector('span').textContent = 'Ocultar cuadrícula de fotografías';
        } else {
          fullGridContainer.setAttribute('hidden', '');
          toggleGridBtn.querySelector('span').textContent = `Ver las ${total} fotografías en cuadrícula`;
        }
      });
    }

    // Soporte táctil (Swipe) en el escenario del carrusel
    if (stage) {
      let touchStartX = 0;
      let touchEndX = 0;

      stage.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        stopAutoplay();
      }, { passive: true });

      stage.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const delta = touchEndX - touchStartX;
        if (Math.abs(delta) > 45) {
          if (delta < 0) nextSlide();
          else prevSlide();
        }
        resetAutoplay();
      }, { passive: true });

      stage.addEventListener('mouseenter', stopAutoplay);
      stage.addEventListener('mouseleave', resetAutoplay);
    }

    goToSlide(0);
    startAutoplay();
  }

  /* ==========================================================================
     7. MODAL LIGHTBOX (ESTUDIANTES, DOCENTES Y RECUERDOS)
     ========================================================================== */
  function initLightbox() {
    const modal = document.getElementById('lightboxModal');
    const backdrop = document.getElementById('lightboxBackdrop');
    const closeBtn = document.getElementById('lightboxClose');
    const prevBtn = document.getElementById('lightboxPrev');
    const nextBtn = document.getElementById('lightboxNext');
    const imgEl = document.getElementById('lightboxImg');
    const titleEl = document.getElementById('lightboxTitle');
    const subtitleEl = document.getElementById('lightboxSubtitle');

    if (!modal || !imgEl) return () => {};

    let currentList = [];
    let currentIndex = 0;
    let lastFocusedEl = null;

    function renderSlide() {
      if (!currentList.length) return;
      const item = currentList[currentIndex];
      imgEl.src = item.src;
      imgEl.alt = item.title || 'Fotografía ampliada';
      if (titleEl) titleEl.textContent = item.title || '';
      if (subtitleEl) subtitleEl.textContent = item.subtitle || '';

      const showNav = currentList.length > 1;
      if (prevBtn) prevBtn.style.display = showNav ? 'flex' : 'none';
      if (nextBtn) nextBtn.style.display = showNav ? 'flex' : 'none';
    }

    function openLightbox(items, startIndex = 0) {
      if (!items || !items.length) return;
      lastFocusedEl = document.activeElement;
      currentList = items;
      currentIndex = startIndex;
      renderSlide();
      modal.removeAttribute('hidden');
      document.body.style.overflow = 'hidden';
      if (closeBtn) closeBtn.focus();
    }

    function closeLightbox() {
      modal.setAttribute('hidden', '');
      imgEl.src = '';
      document.body.style.overflow = '';
      if (lastFocusedEl && typeof lastFocusedEl.focus === 'function') {
        lastFocusedEl.focus();
      }
    }

    function showPrev() {
      if (!currentList.length) return;
      currentIndex = (currentIndex - 1 + currentList.length) % currentList.length;
      renderSlide();
    }

    function showNext() {
      if (!currentList.length) return;
      currentIndex = (currentIndex + 1) % currentList.length;
      renderSlide();
    }

    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    if (backdrop) backdrop.addEventListener('click', closeLightbox);
    if (prevBtn) prevBtn.addEventListener('click', showPrev);
    if (nextBtn) nextBtn.addEventListener('click', showNext);

    // Teclado: Escape y flechas
    document.addEventListener('keydown', (e) => {
      if (modal.hasAttribute('hidden')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'ArrowRight') showNext();
    });

    // Soporte táctil en modal
    let touchStartX = 0;
    modal.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    modal.addEventListener('touchend', (e) => {
      const delta = e.changedTouches[0].screenX - touchStartX;
      if (Math.abs(delta) > 50) {
        if (delta < 0) showNext();
        else showPrev();
      }
    }, { passive: true });

    // Vincular tarjetas declarativas (Estudiantes y Docentes)
    const groups = {};
    document.querySelectorAll('[data-lightbox-group]').forEach((el) => {
      const groupName = el.getAttribute('data-lightbox-group');
      if (!groups[groupName]) groups[groupName] = [];
      const itemIndex = groups[groupName].length;

      groups[groupName].push({
        src: el.getAttribute('data-src'),
        title: el.getAttribute('data-title'),
        subtitle: el.getAttribute('data-subtitle')
      });

      const triggerOpen = () => openLightbox(groups[groupName], itemIndex);
      el.addEventListener('click', triggerOpen);
      el.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          triggerOpen();
        }
      });
    });

    return openLightbox;
  }

  /* ==========================================================================
     8. INTERSECTION OBSERVER Y BOTÓN FLOTANTE REGRESAR AL INICIO
     ========================================================================== */
  function initScrollEffects() {
    const revealItems = document.querySelectorAll('.reveal-item');
    const backToTopBtn = document.getElementById('backToTopBtn');

    if ('IntersectionObserver' in window && !prefersReducedMotion) {
      const observer = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-revealed');
              obs.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.14, rootMargin: '0px 0px -40px 0px' }
      );

      revealItems.forEach((item) => observer.observe(item));
    } else {
      revealItems.forEach((item) => item.classList.add('is-revealed'));
    }

    if (backToTopBtn) {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 480) {
          backToTopBtn.removeAttribute('hidden');
        } else {
          backToTopBtn.setAttribute('hidden', '');
        }
      }, { passive: true });

      backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  }

  /* ==========================================================================
     INICIALIZACIÓN GENERAL
     ========================================================================== */
  document.addEventListener('DOMContentLoaded', () => {
    const audioController = new GalaAudioController();
    initGoldParticles();
    initWelcomeScreen(audioController);
    initCountdown();
    const openLightbox = initLightbox();
    initMemoriesGallery(openLightbox);
    initScrollEffects();
  });
})();
