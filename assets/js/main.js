/**
 * GRAFMEN.COM — MASTER PRODUCTION JS (TRUE 1:1 SOURCE RECOVERY)
 * Handles: Hero text rotation animation, Sliding panel mobile navigation
 */

document.addEventListener('DOMContentLoaded', () => {
  initCookieConsent();
  initStickyHeader();
  initHeroTextAnimation();
  initSlidingPanels();
});

/**
 * 1. Hero Text Push Animation (Cycles through the 4 promotional phrases)
 */
function initHeroTextAnimation() {
  const animWrappers = document.querySelectorAll('.text-anim--push, .js-text-anim');
  
  animWrappers.forEach(animWrapper => {
    const words = animWrapper.querySelectorAll('.text-anim__word, .js-text-anim__word');
    if (words.length <= 1) return;

    let currentIndex = 0;
    
    // Ensure the first word is marked as active in
    words.forEach((w, idx) => {
      if (idx === 0) {
        w.classList.add('text-anim__word--in');
        w.classList.remove('text-anim__word--out');
      } else {
        w.classList.remove('text-anim__word--in');
        w.classList.remove('text-anim__word--out');
      }
    });

    setInterval(() => {
      const currentWord = words[currentIndex];
      const nextIndex = (currentIndex + 1) % words.length;
      const nextWord = words[nextIndex];

      // Current word moves out (upwards)
      currentWord.classList.remove('text-anim__word--in');
      currentWord.classList.add('text-anim__word--out');

      // Next word moves in
      nextWord.classList.remove('text-anim__word--out');
      nextWord.classList.add('text-anim__word--in');

      // Clean up previous word out-class after animation completes
      setTimeout(() => {
        currentWord.classList.remove('text-anim__word--out');
      }, 650);

      currentIndex = nextIndex;
    }, 2800);
  });
}

/**
 * 2. Sliding Panel Mobile Navigation (Greenshift sliding panel + Blocksy drawer)
 */
function initSlidingPanels() {
  // Triggers
  const panelButtons = document.querySelectorAll('.gspb_button_wrapper[data-paneltype], [data-toggle-panel], .mobile-menu-toggle, .ct-header-trigger');
  const slidingPanels = document.querySelectorAll('.gspb_slidingPanel, #offcanvas');

  panelButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const panelId = btn.getAttribute('id') || btn.getAttribute('data-panelid');
      let targetPanel = document.querySelector(`.gspb_slidingPanel[data-panelid="${panelId}"]`) || document.querySelector('.gspb_slidingPanel') || document.querySelector('#offcanvas');

      if (targetPanel) {
        targetPanel.classList.add('is-active', 'panel-open');
        document.body.classList.add('panel-is-open');
      }
    });
  });

  // Close buttons and overlay clicks
  slidingPanels.forEach(panel => {
    const closeBtn = panel.querySelector('.gspb_slidingPanel-close, .ct-toggle-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        panel.classList.remove('is-active', 'panel-open');
        document.body.classList.remove('panel-is-open');
      });
    }

    // Clicking on backdrop (outside inner wrap)
    panel.addEventListener('click', (e) => {
      if (e.target === panel) {
        panel.classList.remove('is-active', 'panel-open');
        document.body.classList.remove('panel-is-open');
      }
    });
  });

  // ESC key closes panels
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      slidingPanels.forEach(panel => {
        panel.classList.remove('is-active', 'panel-open');
      });
      document.body.classList.remove('panel-is-open');
    }
  });
}

/**
 * 3. Sticky Header Scroll Effect (Drewmax.pro style)
 * Applies glassmorphism and compact header on scroll
 */
function initStickyHeader() {
  const header = document.querySelector('.site-header, #gspb_row-id-gsbp-94ae97c7-9ca3');
  if (!header) return;

  document.body.classList.add('has-sticky-header');

  const logoImg = header.querySelector('.site-logo img, .custom-logo');
  const defaultLogoSrc = logoImg ? logoImg.getAttribute('src') : null;
  const isPermanentOutline = defaultLogoSrc && defaultLogoSrc.includes('outline');

  function handleScroll() {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
      if (logoImg && defaultLogoSrc && !isPermanentOutline) {
        logoImg.src = defaultLogoSrc.replace('logo_Grafmen.svg', 'logo_Grafmen_outline.svg');
      }
    } else {
      header.classList.remove('scrolled');
      if (logoImg && defaultLogoSrc && !isPermanentOutline) {
        logoImg.src = defaultLogoSrc;
      }
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}


/**
 * 4. Premium GDPR/RODO Cookie Consent System (Matching szkola.best)
 */
function initCookieConsent() {
  const STORAGE_KEY = 'grafmen-cookie-consent';

  const isSubdir = window.location.pathname.includes('/portfolio/') || window.location.pathname.endsWith('/portfolio');
  const cssHref = isSubdir ? '../assets/css/cookies.css' : 'assets/css/cookies.css';
  if (!document.getElementById('grafmen-cookies-css') && !document.querySelector('link[href*="cookies.css"]')) {
    const link = document.createElement('link');
    link.id = 'grafmen-cookies-css';
    link.rel = 'stylesheet';
    link.href = cssHref;
    document.head.appendChild(link);
  }

  let wrapper = document.getElementById('cookie-consent-wrapper');
  if (!wrapper) {
    const policyUrl = isSubdir ? '../polityka-prywatnosci.html' : 'polityka-prywatnosci.html';

    const wrapperHtml = `
<div class="cookie-consent-wrapper" id="cookie-consent-wrapper">
  <!-- Pływający przycisk (bottom-left) -->
  <button id="cookie-trigger-btn" class="cookie-trigger-btn hidden" aria-label="Zarządzaj plikami cookies" title="Preferencje cookies">
    <div class="cookie-icon-wrapper">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5Z"></path>
        <path d="M8.5 8.5v.01"></path>
        <path d="M16 15.5v.01"></path>
        <path d="M12 12v.01"></path>
        <path d="M11 16v.01"></path>
        <path d="M7 13v.01"></path>
      </svg>
    </div>
  </button>

  <!-- Panel boczny preferencji (wysuwany z prawej) -->
  <div id="cookie-panel" class="cookie-panel">
    <div class="cookie-panel-content">
      <div class="cookie-panel-header">
        <h3 class="cookie-panel-title">Dostosuj preferencje dotyczące zgody</h3>
        <button id="cookie-panel-close" class="cookie-panel-close" aria-label="Zamknij preferencje">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      <div class="cookie-panel-body">
        <div class="cookie-info-box">
          <p>Używam plików cookie, aby pomóc w sprawnej nawigacji, analizować ruch oraz dostosowywać treści do Twoich potrzeb. Szczegółowe informacje o wszystkich kategoriach znajdziesz poniżej.</p>
          <p>Pliki cookie sklasyfikowane jako „niezbędne” są przechowywane w Twojej przeglądarce, ponieważ są niezbędne do podstawowych funkcji witryny <strong>Grafmen — Krzysztof Krawczyk</strong>.</p>
          <p class="cookie-more-link-container">
            <button id="toggle-more-text" class="cookie-more-link">Pokaż więcej</button>
          </p>
          <div id="more-text-content" class="more-text-hidden">
            <p>Używam również plików cookie stron trzecich, które pomagają analizować sposób korzystania ze strony, zapisywać preferencje oraz dostarczać treści dopasowane do Twoich potrzeb. Te pliki są przechowywane wyłącznie za Twoją uprzednią zgodą.</p>
            <p>Więcej szczegółów oraz zasady przetwarzania danych znajdziesz w naszej <a href="${policyUrl}" class="cookie-policy-link">Polityce prywatności</a>.</p>
          </div>
        </div>

        <div class="cookie-categories">
          <!-- Kategoria 1: Niezbędne -->
          <div class="cookie-category-item expanded">
            <div class="cookie-category-header">
              <div class="cookie-category-title-wrap">
                <span class="accordion-arrow">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </span>
                <span class="cookie-category-name">Niezbędne</span>
              </div>
              <span class="status-always-active">Zawsze aktywne</span>
            </div>
            <div class="cookie-category-desc">
              <p>Niezbędne pliki cookie mają kluczowe znaczenie dla podstawowych funkcji witryny (bezpieczeństwo sesji, nawigacja, zapamiętanie zgody RODO). Witryna nie może bez nich poprawnie funkcjonować.</p>
            </div>
          </div>

          <!-- Kategoria 2: Funkcjonalne -->
          <div class="cookie-category-item">
            <div class="cookie-category-header">
              <div class="cookie-category-title-wrap">
                <span class="accordion-arrow">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </span>
                <span class="cookie-category-name">Funkcjonalne</span>
              </div>
              <label class="cookie-switch">
                <input type="checkbox" id="cookie-chk-functional" checked>
                <span class="cookie-slider"></span>
              </label>
            </div>
            <div class="cookie-category-desc">
              <p>Funkcjonalne pliki cookie pomagają w wykonywaniu określonych zadań, takich jak odtwarzanie animacji, interaktywne slidery opinii i procesów czy integracje formularzy.</p>
            </div>
          </div>

          <!-- Kategoria 3: Analityczne -->
          <div class="cookie-category-item">
            <div class="cookie-category-header">
              <div class="cookie-category-title-wrap">
                <span class="accordion-arrow">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </span>
                <span class="cookie-category-name">Analityczne</span>
              </div>
              <label class="cookie-switch">
                <input type="checkbox" id="cookie-chk-analytics" checked>
                <span class="cookie-slider"></span>
              </label>
            </div>
            <div class="cookie-category-desc">
              <p>Służą do zrozumienia, w jaki sposób odwiedzający korzystają ze strony. Pomagają dostarczać anonimowe statystyki dotyczące liczby odsłon, źródeł wizyt i zachowań użytkowników.</p>
            </div>
          </div>

          <!-- Kategoria 4: Reklamowe -->
          <div class="cookie-category-item">
            <div class="cookie-category-header">
              <div class="cookie-category-title-wrap">
                <span class="accordion-arrow">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </span>
                <span class="cookie-category-name">Reklamowe</span>
              </div>
              <label class="cookie-switch">
                <input type="checkbox" id="cookie-chk-marketing" checked>
                <span class="cookie-slider"></span>
              </label>
            </div>
            <div class="cookie-category-desc">
              <p>Mogą być wykorzystywane do dostarczania spersonalizowanych treści i mierzenia skuteczności kampanii promocyjnych w mediach społecznościowych.</p>
            </div>
          </div>
        </div>
      </div>

      <div class="cookie-panel-actions">
        <button id="cookie-accept-all" class="cookie-btn cookie-btn-primary">Akceptuj wszystkie</button>
        <button id="cookie-save-preferences" class="cookie-btn cookie-btn-secondary">Zapisz preferencje</button>
        <button id="cookie-reject-all" class="cookie-btn cookie-btn-outline">Odrzuć opcjonalne</button>
      </div>
    </div>
  </div>

  <!-- Dolny wyskakujący baner (Toast) -->
  <div id="cookie-toast" class="cookie-toast">
    <div class="cookie-toast-container">
      <div class="cookie-toast-text">
        <p>Ta strona korzysta z plików cookie, aby świadczyć usługi na najwyższym poziomie, optymalizować działanie witryny oraz do celów analitycznych. Klikając „Akceptuj wszystkie”, wyrażasz zgodę na ich użycie na stronie <strong>Grafmen</strong>. Możesz także dostosować preferencje lub odrzucić opcjonalne pliki.</p>
      </div>
      <div class="cookie-toast-buttons">
        <button id="cookie-toast-accept" class="cookie-btn cookie-btn-primary">Akceptuj wszystkie</button>
        <button id="cookie-toast-reject" class="cookie-btn cookie-btn-outline">Odrzuć wszystkie</button>
        <button id="cookie-toast-customize" class="cookie-btn cookie-btn-secondary">Dostosuj</button>
      </div>
    </div>
  </div>

  <!-- Tło nakładki (Backdrop) -->
  <div id="cookie-overlay" class="cookie-overlay-bg"></div>
</div>
`;
    document.body.insertAdjacentHTML('beforeend', wrapperHtml);
    wrapper = document.getElementById('cookie-consent-wrapper');
  }

  const triggerBtn = document.getElementById('cookie-trigger-btn');
  const panel = document.getElementById('cookie-panel');
  const panelClose = document.getElementById('cookie-panel-close');
  const overlay = document.getElementById('cookie-overlay');
  const toast = document.getElementById('cookie-toast');

  // Toast buttons
  const toastAccept = document.getElementById('cookie-toast-accept');
  const toastCustomize = document.getElementById('cookie-toast-customize');
  const toastReject = document.getElementById('cookie-toast-reject');

  // Panel buttons
  const acceptAll = document.getElementById('cookie-accept-all');
  const rejectAll = document.getElementById('cookie-reject-all');
  const savePreferences = document.getElementById('cookie-save-preferences');

  // Checkboxes
  const chkFunctional = document.getElementById('cookie-chk-functional');
  const chkAnalytics = document.getElementById('cookie-chk-analytics');
  const chkMarketing = document.getElementById('cookie-chk-marketing');

  // Accordions in panel
  document.querySelectorAll('.cookie-category-header').forEach(header => {
    header.addEventListener('click', (e) => {
      if (e.target.closest('.cookie-switch')) return;
      const item = header.closest('.cookie-category-item');
      if (item) item.classList.toggle('expanded');
    });
  });

  // "Pokaż więcej" toggle
  const toggleMore = document.getElementById('toggle-more-text');
  const moreText = document.getElementById('more-text-content');
  if (toggleMore && moreText) {
    toggleMore.addEventListener('click', () => {
      const isShown = moreText.classList.toggle('show');
      toggleMore.textContent = isShown ? 'Pokaż mniej' : 'Pokaż więcej';
    });
  }

  function updateTriggerVisibility() {
    if (!triggerBtn) return;
    const isToastShowing = toast && toast.classList.contains('show');
    const isPanelOpen = panel && panel.classList.contains('open');
    if (isToastShowing || isPanelOpen) {
      triggerBtn.classList.add('hidden');
    } else {
      triggerBtn.classList.remove('hidden');
    }
  }

  function openPanel() {
    if (panel) panel.classList.add('open');
    if (overlay) overlay.classList.add('show');
    if (toast) toast.classList.remove('show');
    updateTriggerVisibility();
  }

  function closePanel() {
    if (panel) panel.classList.remove('open');
    if (overlay) overlay.classList.remove('show');
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved && toast) {
      toast.classList.add('show');
    }
    updateTriggerVisibility();
  }

  if (triggerBtn) triggerBtn.addEventListener('click', openPanel);
  if (panelClose) panelClose.addEventListener('click', closePanel);
  if (overlay) overlay.addEventListener('click', closePanel);
  if (toastCustomize) toastCustomize.addEventListener('click', openPanel);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && panel && panel.classList.contains('open')) {
      closePanel();
    }
  });

  function initConsent() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const data = JSON.parse(saved);
        if (data.userMadeChoice) {
          if (chkFunctional) chkFunctional.checked = !!data.functional;
          if (chkAnalytics) chkAnalytics.checked = !!data.analytics;
          if (chkMarketing) chkMarketing.checked = !!data.marketing;
          if (toast) toast.classList.remove('show');
          updateTriggerVisibility();
          return;
        }
      } catch (err) {
        console.error('Error reading saved cookie choices', err);
      }
    }

    setTimeout(() => {
      const currentSaved = localStorage.getItem(STORAGE_KEY);
      if (!currentSaved && panel && !panel.classList.contains('open')) {
        if (toast) toast.classList.add('show');
        updateTriggerVisibility();
      }
    }, 1000);
  }

  function saveConsent(choices) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(choices));
    } catch (e) {
      console.error('LocalStorage write error', e);
    }
    window.dispatchEvent(new CustomEvent('grafmen-cookies-updated', { detail: choices }));
    closePanel();
    if (toast) toast.classList.remove('show');
    updateTriggerVisibility();
  }

  function handleAcceptAll() {
    const choices = {
      necessary: true,
      functional: true,
      analytics: true,
      marketing: true,
      userMadeChoice: true
    };
    if (chkFunctional) chkFunctional.checked = true;
    if (chkAnalytics) chkAnalytics.checked = true;
    if (chkMarketing) chkMarketing.checked = true;
    saveConsent(choices);
  }

  function handleRejectAll() {
    const choices = {
      necessary: true,
      functional: false,
      analytics: false,
      marketing: false,
      userMadeChoice: true
    };
    if (chkFunctional) chkFunctional.checked = false;
    if (chkAnalytics) chkAnalytics.checked = false;
    if (chkMarketing) chkMarketing.checked = false;
    saveConsent(choices);
  }

  function handleSavePreferences() {
    const choices = {
      necessary: true,
      functional: chkFunctional ? chkFunctional.checked : false,
      analytics: chkAnalytics ? chkAnalytics.checked : false,
      marketing: chkMarketing ? chkMarketing.checked : false,
      userMadeChoice: true
    };
    saveConsent(choices);
  }

  if (toastAccept) toastAccept.addEventListener('click', handleAcceptAll);
  if (toastReject) toastReject.addEventListener('click', handleRejectAll);
  if (acceptAll) acceptAll.addEventListener('click', handleAcceptAll);
  if (rejectAll) rejectAll.addEventListener('click', handleRejectAll);
  if (savePreferences) savePreferences.addEventListener('click', handleSavePreferences);

  initConsent();
}
