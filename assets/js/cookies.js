/**
 * GRAFMEN.COM — GDPR/RODO Cookie Consent Controller
 * Fully client-side, privacy-first, localStorage-persisted
 */

(function() {
  const STORAGE_KEY = 'grafmen-cookie-consent';

  document.addEventListener('DOMContentLoaded', () => {
    const wrapper = document.getElementById('cookie-consent-wrapper');
    if (!wrapper) return;

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

    // ESC key closes panel
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

      // If user hasn't made a choice, show toast after short delay
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
  });
})();
