const ICONS = {
  bolt: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13 2 4 14h6l-1 8 9-12h-6l1-8z"/></svg>',
  cart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>',
  user: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
  search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>',
  sun: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"/></svg>',
  moon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>',
  menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12h18M3 6h18M3 18h18"/></svg>',
  close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>',
  chat: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>',
  whatsapp: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.44 1.32 4.94L2 22l5.28-1.38a9.9 9.9 0 0 0 4.76 1.21h.01c5.46 0 9.9-4.45 9.9-9.91C22 6.45 17.5 2 12.04 2zm0 18.14h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.13.82.84-3.05-.2-.31a8.2 8.2 0 0 1-1.26-4.36c0-4.54 3.7-8.24 8.26-8.24 2.2 0 4.28.86 5.84 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.55-3.71 8.22-8.26 8.22zm4.52-6.16c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.13-.17.24-.64.81-.78.97-.14.17-.29.19-.53.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.39-1.72-.14-.24-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.15.16-.25.25-.42.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.42-.14-.01-.31-.01-.47-.01-.17 0-.44.06-.67.31-.23.24-.87.85-.87 2.08s.89 2.41 1.02 2.58c.12.17 1.75 2.67 4.24 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.55.1.47-.07 1.47-.6 1.68-1.18.2-.58.2-1.08.14-1.18-.06-.1-.22-.16-.47-.28z"/></svg>',
  mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16v16H4z" opacity="0"/><path d="m4 6 8 7 8-7"/><rect x="4" y="4" width="16" height="16" rx="2"/></svg>',
  up: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>',
  send: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>',
  facebook: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.5-3.89 3.78-3.89 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12Z"/></svg>',
  instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4.2"/><circle cx="17.3" cy="6.7" r="1"/></svg>',
  linkedin: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6.94 5a2 2 0 1 1-4-.02 2 2 0 0 1 4 .02zM3.5 8.75h3.9V21H3.5V8.75zM10.2 8.75h3.74v1.68h.05c.52-.98 1.8-2.02 3.7-2.02 3.96 0 4.7 2.6 4.7 6v6.59h-3.9v-5.84c0-1.4-.03-3.2-1.95-3.2-1.96 0-2.26 1.53-2.26 3.1v5.94h-3.9V8.75z"/></svg>',
  plug: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 2v6M15 2v6M7 8h10l-1 6a4 4 0 0 1-4 3.5A4 4 0 0 1 8 14l-1-6Z"/><path d="M12 17.5V22"/></svg>',
  wrench: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a4 4 0 0 0-5.6 5.6L2 19l3 3 7.1-7.1a4 4 0 0 0 5.6-5.6l-2.5 2.5-2-2 2.5-2.5Z"/></svg>',
  cable: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9a5 5 0 0 0 5 5h6a5 5 0 0 1 5 5"/><path d="M4 4v5M20 23v-5M9 3v3M15 21v-3"/></svg>',
  shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2 4 5v6c0 5 3.4 8.7 8 11 4.6-2.3 8-6 8-11V5l-8-3Z"/></svg>',
  socket: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M9 9v2M15 9v2M12 14v2"/></svg>',
  camera: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2Z"/><circle cx="12" cy="13" r="4"/></svg>',
  lightbulb: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7c.5.4.9 1.1.9 1.8V17h6.2v-.5c0-.7.4-1.4.9-1.8A7 7 0 0 0 12 2Z"/></svg>',
  doc: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6M9 13h6M9 17h6"/></svg>',
  star: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="m12 2 3.1 6.3 7 1-5 4.9L18.2 21 12 17.8 5.8 21l1.1-6.8-5-4.9 7-1Z"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>',
  image: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>',
  trash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0-1 14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2L4 6"/></svg>',
  upload: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/></svg>',
  eye: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Z"/><circle cx="12" cy="12" r="3"/></svg>',
  eyeOff: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.9 17.9A10.9 10.9 0 0 1 12 20c-7 0-11-8-11-8a19.7 19.7 0 0 1 4.2-5.3M9.9 4.2A10.6 10.6 0 0 1 12 4c7 0 11 8 11 8a19.7 19.7 0 0 1-2.2 3.2M14.1 14.1a3 3 0 1 1-4.2-4.2M1 1l22 22"/></svg>'
};

const NAV_ITEMS_BASE = [
  { href: 'index.html', label: 'Accueil' },
  { href: 'services.html', label: 'Nos services' },
  { href: 'boutique.html', label: 'Boutique' },
  { href: 'a-propos.html', label: 'À propos' },
  { href: 'contact.html', label: 'Contact' },
  { href: 'assistance.html', label: 'Assistance' }
];

function currentPage() {
  const p = location.pathname.split('/').pop();
  return p === '' ? 'index.html' : p;
}

function currentLogoSrc() {
  const theme = document.documentElement.getAttribute('data-theme') || 'light';
  return theme === 'dark' ? 'assets/logo-dark.png' : 'assets/logo-light.png';
}
function refreshLogos() {
  const src = currentLogoSrc();
  document.querySelectorAll('.brand-logo').forEach(img => { if (img.src.indexOf(src) === -1) img.src = src; });
}

function renderHeader() {
  const host = document.getElementById('site-header');
  if (!host) return;
  const page = currentPage();
  const user = DB.getCurrentUser();

  const navItems = [...NAV_ITEMS_BASE];
  if (user) {
    navItems.push({ href: 'mon-compte.html', label: 'Mon compte', mobileOnly: true });
  } else {
    navItems.push({ href: 'connexion.html', label: 'Connexion', mobileOnly: true });
    navItems.push({ href: 'inscription.html', label: 'Inscription', mobileOnly: true });
  }
  navItems.push({ href: 'panier.html', label: 'Panier', mobileOnly: true });

  const links = navItems.map(item =>
    `<a href="${item.href}" class="${page === item.href ? 'active' : ''}${item.mobileOnly ? ' mobile-only' : ''}">${item.label}</a>`
  ).join('');

  host.innerHTML = `
    <div class="navbar">
      <div class="container">
        <a href="index.html" class="brand">
          <img src="${currentLogoSrc()}" alt="Genius Electrical Service" class="brand-logo">
        </a>
        <nav class="nav-links" id="navLinks">${links}</nav>
        <div class="nav-actions">
          <a class="icon-btn" href="${user ? 'mon-compte.html' : 'connexion.html'}" title="${user ? 'Mon compte' : 'Connexion'}" aria-label="Mon compte">${ICONS.user}</a>
          <a class="icon-btn" href="panier.html" title="Panier" aria-label="Panier">
            ${ICONS.cart}<span class="cart-badge">0</span>
          </a>
          <a href="commande-service.html" class="btn btn-primary btn-sm nav-cta">Demander un devis</a>
          <button class="nav-toggle" id="navToggle" aria-label="Ouvrir le menu">${ICONS.menu}</button>
        </div>
      </div>
    </div>
  `;
  DB.updateCartBadge();
}

function renderFooter() {
  const host = document.getElementById('site-footer');
  if (!host) return;
  host.innerHTML = `
    <footer class="site-footer">
      <div class="container">
        <div class="footer-grid">
          <div class="footer-brand">
            <a href="index.html" style="display:inline-block;margin-bottom:14px;">
              <img src="assets/logo-dark.png" alt="Genius Electrical Service" class="brand-logo footer-logo">
            </a>
            <p>Votre partenaire de confiance pour l'installation, la maintenance et le dépannage électrique — au service des particuliers et des entreprises.</p>
            <div class="social-row">
              <a href="#" aria-label="Facebook">${ICONS.facebook}</a>
              <a href="#" aria-label="Instagram">${ICONS.instagram}</a>
              <a href="#" aria-label="LinkedIn">${ICONS.linkedin}</a>
            </div>
          </div>
          <div>
            <h4>Navigation</h4>
            <a href="index.html">Accueil</a>
            <a href="services.html">Nos services</a>
            <a href="boutique.html">Boutique</a>
            <a href="a-propos.html">À propos</a>
          </div>
          <div>
            <h4>Client</h4>
            <a href="contact.html">Contact</a>
            <a href="assistance.html">Assistance</a>
            <a href="${waUrl()}" target="_blank" rel="noopener">WhatsApp</a>
            <a href="conditions.html">Conditions d'utilisation</a>
            <a href="confidentialite.html">Politique de confidentialité</a>
          </div>
          <div>
            <h4>Contact</h4>
            ${SITE.phones.map(p => `<a href="tel:${p.e164}">${p.display}</a>`).join('')}
            <a href="${mailtoUrl()}" data-mail>${SITE.email}</a>
            <a href="contact.html">Douala, Cameroun</a>
          </div>
        </div>
        <div class="current-line" style="margin:0 0 24px;"></div>
        <div class="footer-bottom">
          <span>© ${new Date().getFullYear()} Genius Electrical Service. Tous droits réservés.</span>
          <span>Électricité, solaire et sécurité</span>
        </div>
      </div>
    </footer>
  `;
}

function renderSupportWidget() {
  if (document.getElementById('supportFab')) return;
  const wrap = document.createElement('div');
  wrap.innerHTML = `
    <div class="support-fab" id="supportFab">
      <div class="support-menu" id="supportMenu">
        <button id="openChatBtn">${ICONS.chat} Discuter avec le service client</button>
        <a href="${waUrl()}" target="_blank" rel="noopener">${ICONS.whatsapp} Discuter sur WhatsApp</a>
        <a href="${mailtoUrl()}" data-mail>${ICONS.mail} Écrire par email</a>
        <a href="contact.html">${ICONS.mail} Formulaire de contact</a>
      </div>
      <button class="fab-btn" id="fabBtn" aria-label="Assistance client">${ICONS.chat}</button>
    </div>
    <div class="chat-window" id="chatWindow">
      <div class="chat-head">
        <div>
          <strong>Assistance Genius</strong>
          <div class="small" style="color:#B9C4D2;">En ligne · répond sous quelques minutes</div>
        </div>
        <button id="closeChatBtn" aria-label="Fermer">${ICONS.close}</button>
      </div>
      <div class="chat-body" id="chatBody"></div>
      <form class="chat-input" id="chatForm">
        <input type="text" id="chatInput" placeholder="Écrivez votre message…" autocomplete="off">
        <button type="submit" aria-label="Envoyer">${ICONS.send}</button>
      </form>
    </div>
    <button class="back-top" id="backTop" aria-label="Retour en haut">${ICONS.up}</button>
    <div id="page-loader">
      <span class="loader-bolt">${ICONS.bolt}</span>
      <div class="loader-bar"></div>
    </div>
  `;
  document.body.appendChild(wrap);
}

document.addEventListener('DOMContentLoaded', () => {
  renderHeader();
  renderFooter();
  renderSupportWidget();
  if (typeof initUI === 'function') initUI();
});
