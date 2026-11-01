function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  const btn = document.getElementById('themeToggle');
  if (btn) btn.innerHTML = theme === 'dark' ? ICONS.sun : ICONS.moon;
  if (typeof refreshLogos === 'function') refreshLogos();
}
function initTheme() {
  applyTheme('dark');
  const btn = document.getElementById('themeToggle');
  if (btn) {
    btn.addEventListener('click', () => {
      const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      localStorage.setItem(DB_KEYS.THEME, next);
      applyTheme(next);
    });
  }
}

function initMobileNav() {
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');
  if (!toggle || !links) return;
  toggle.addEventListener('click', () => {
    links.classList.toggle('open');
    toggle.innerHTML = links.classList.contains('open') ? ICONS.close : ICONS.menu;
  });
  links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    links.classList.remove('open');
    toggle.innerHTML = ICONS.menu;
  }));
}

function initSearch() {
  const form = document.getElementById('searchForm');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const q = document.getElementById('searchInput').value.trim();
    window.location.href = 'boutique.html' + (q ? '?q=' + encodeURIComponent(q) : '');
  });
}

function initBackTop() {
  const btn = document.getElementById('backTop');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('show', window.scrollY > 500);
  });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

function initLoader() {
  const loader = document.getElementById('page-loader');
  if (!loader) return;
  window.addEventListener('load', () => {
    setTimeout(() => loader.classList.add('hide'), 350);
  });
}

function initReveal() {
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in-view'); });
  }, { threshold: 0.15 });
  items.forEach(el => obs.observe(el));
}

function initSupportWidget() {
  const fab = document.getElementById('fabBtn');
  const menu = document.getElementById('supportMenu');
  const chatWindow = document.getElementById('chatWindow');
  const openChatBtn = document.getElementById('openChatBtn');
  const closeChatBtn = document.getElementById('closeChatBtn');
  const chatForm = document.getElementById('chatForm');
  const chatBody = document.getElementById('chatBody');

  if (fab) fab.addEventListener('click', () => menu.classList.toggle('open'));

  function openChat() {
    menu.classList.remove('open');
    chatWindow.classList.add('open');
    renderChatMessages();
    if (!DB.getChatMessages().length) {
      DB.addChatMessage({ id: uid('msg'), sender: 'agent', text: "Comment pouvons-nous vous aider aujourd'hui ?", date: new Date().toISOString() });
      renderChatMessages();
    }
  }
  if (openChatBtn) openChatBtn.addEventListener('click', openChat);
  if (closeChatBtn) closeChatBtn.addEventListener('click', () => chatWindow.classList.remove('open'));

  function renderChatMessages() {
    if (!chatBody) return;
    chatBody.innerHTML = DB.getChatMessages().map(m =>
      `<div class="chat-msg ${m.sender === 'user' ? 'user' : 'agent'}">${escapeHtml(m.text)}</div>`
    ).join('');
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  if (chatForm) {
    chatForm.addEventListener('submit', e => {
      e.preventDefault();
      const input = document.getElementById('chatInput');
      const text = input.value.trim();
      if (!text) return;
      DB.addChatMessage({ id: uid('msg'), sender: 'user', text, date: new Date().toISOString() });
      input.value = '';
      renderChatMessages();
      setTimeout(() => {
        DB.addChatMessage({
          id: uid('msg'), sender: 'agent',
          text: "Merci pour votre message. Un conseiller Genius Electrical Service vous répondra très rapidement. Pour une urgence, contactez-nous directement sur WhatsApp.",
          date: new Date().toISOString()
        });
        renderChatMessages();
      }, 900);
    });
  }
}

function ensureToastStack() {
  let stack = document.getElementById('toastStack');
  if (!stack) {
    stack = document.createElement('div');
    stack.id = 'toastStack';
    stack.className = 'toast-stack';
    document.body.appendChild(stack);
  }
  return stack;
}
function notify(message, type = 'info', duration = 3800) {
  const stack = ensureToastStack();
  const el = document.createElement('div');
  el.className = `toast ${type}`;
  const icon = type === 'success' ? ICONS.check : type === 'error' ? ICONS.close : ICONS.bolt;
  el.innerHTML = `<span class="toast-icon">${icon}</span><span>${escapeHtml(message)}</span>`;
  stack.appendChild(el);
  setTimeout(() => {
    el.classList.add('fade-out');
    setTimeout(() => el.remove(), 300);
  }, duration);
}

function escapeHtml(str) {
  const d = document.createElement('div');
  d.textContent = str;
  return d.innerHTML;
}
function formatFCFA(n) {
  return new Intl.NumberFormat('fr-FR').format(n) + ' FCFA';
}

const Validators = {
  isEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()); },

  isPhone(v) {
    const cleaned = v.trim().replace(/[\s.-]/g, '');
    return /^(\+237)?6\d{8}$/.test(cleaned);
  },
  isStrongPassword(v) { return v.length >= 8; },
  notEmpty(v) { return v !== undefined && v !== null && v.trim() !== ''; }
};

function showFieldError(inputEl, errorEl, message) {
  inputEl.style.borderColor = 'var(--danger)';
  if (errorEl) { errorEl.textContent = message; errorEl.classList.add('show'); }
}
function clearFieldError(inputEl, errorEl) {
  inputEl.style.borderColor = '';
  if (errorEl) { errorEl.classList.remove('show'); errorEl.textContent = ''; }
}

function initUI() {
  initTheme();
  initMobileNav();
  initSearch();
  initBackTop();
  initLoader();
  initReveal();
  initSupportWidget();
}
