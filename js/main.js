/**
 * ForgCV by Vixfor — Global Utilities
 */

/* ════════ NAVIGATION ════════ */
function initNav() {
  const nav       = document.querySelector('.nav');
  const hamburger = document.querySelector('.nav-hamburger');
  const mobileNav = document.querySelector('.nav-mobile');

  // Active link
  const currentPath = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .nav-mobile a').forEach(a => {
    const href = a.getAttribute('href')?.split('/').pop() || '';
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  // Hamburger toggle
  hamburger?.addEventListener('click', (e) => {
    e.stopPropagation();
    hamburger.classList.toggle('open');
    mobileNav?.classList.toggle('open');
  });

  document.addEventListener('click', (e) => {
    if (!nav?.contains(e.target)) {
      hamburger?.classList.remove('open');
      mobileNav?.classList.remove('open');
    }
  });

  // Shadow on scroll
  window.addEventListener('scroll', () => {
    nav?.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });
}

/* ════════ SCROLL REVEAL ════════ */
function initScrollReveal() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
}

/* ════════ TOAST ════════ */
let toastContainer = null;

function showToast(message, type = 'info', duration = 3500) {
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
  }

  const icons = { success: '✓', error: '✕', warning: '⚠', info: 'ℹ' };
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<span class="toast-icon">${icons[type] || icons.info}</span><span>${message}</span>`;
  toastContainer.appendChild(toast);

  const remove = () => {
    toast.classList.add('leaving');
    toast.addEventListener('animationend', () => toast.remove(), { once: true });
  };

  const timer = setTimeout(remove, duration);
  toast.addEventListener('click', () => { clearTimeout(timer); remove(); });
}

/* ════════ CV COUNTER — Live realistic ════════ */
const CV_BASE       = 247891;       // base count at launch (Jan 1 2026)
const CV_LAUNCH_TS  = 1735689600000; // Jan 1 2026 00:00 UTC
const CV_DAILY_RATE = 87;           // avg CVs/day (realistic for early SaaS)

function getLiveCVCount() {
  let local = 0;
  try { local = parseInt(localStorage.getItem('fgcv_total') || '0', 10) || 0; } catch(e) {}
  const daysSinceLaunch = Math.max(0, (Date.now() - CV_LAUNCH_TS) / 86400000);
  return CV_BASE + Math.floor(daysSinceLaunch * CV_DAILY_RATE) + local;
}

function incrementCVCount() {
  try {
    const cur = parseInt(localStorage.getItem('fgcv_total') || '0', 10) || 0;
    localStorage.setItem('fgcv_total', cur + 1);
  } catch(e) {}
  // Update any visible counter on the page
  document.querySelectorAll('[data-cv-counter]').forEach(el => {
    el.textContent = getLiveCVCount().toLocaleString();
  });
}

/* ════════ COUNTER ANIMATION ════════ */
function animateCounter(el) {
  // If this is the CV counter, use live count
  const isCVCounter = parseInt(el.dataset.target) === 247891 || el.hasAttribute('data-cv-main');
  const target = isCVCounter ? getLiveCVCount() : parseFloat(el.dataset.target || 0);
  const suffix = el.dataset.suffix || '';
  const isFloat = el.dataset.float === 'true';
  const duration = 2000;
  let start = null;

  const easeOut = t => 1 - Math.pow(1 - t, 3);

  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const eased = easeOut(progress);
    const current = target * eased;
    el.textContent = isFloat
      ? current.toFixed(1) + suffix
      : Math.round(current).toLocaleString() + suffix;
    if (progress < 1) requestAnimationFrame(step);
  };

  requestAnimationFrame(step);
}

function initCounters() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('[data-target]').forEach(el => io.observe(el));
}

/* ════════ SMOOTH SCROLL ════════ */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

/* ════════ AUTO-SAVE INDICATOR ════════ */
let saveTimer = null;
function triggerAutoSave(callback) {
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    if (callback) callback();
    const indicator = document.querySelector('.autosave-indicator span:last-child');
    if (indicator) {
      const saved = typeof t === 'function' ? t('cv_autosave') : 'Saved';
      indicator.textContent = saved + ' ✓';
      setTimeout(() => {
        indicator.textContent = saved;
      }, 2000);
    }
  }, 800);
}

/* ════════ COPY TO CLIPBOARD ════════ */
async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    showToast('Copied to clipboard!', 'success');
    return true;
  } catch {
    // Fallback
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.cssText = 'position:fixed;opacity:0';
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    showToast('Copied!', 'success');
    return true;
  }
}

/* ════════ INIT ════════ */
document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initScrollReveal();
  initCounters();
  initSmoothScroll();
});
