/* ==========================================================================
   GENIUS ELECTRICAL SERVICE — Données & couche d'accès Local Storage
   ⚠️ Toutes les fonctions ci-dessous sont volontairement isolées dans un
   objet DB. Le jour où une vraie base de données existera, il suffira de
   remplacer le corps de ces fonctions par des appels fetch() vers l'API :
   le reste de l'interface (HTML/JS des pages) n'aura pas à changer.
   ========================================================================== */

const DB_KEYS = {
  USERS: 'ges_users',
  SESSION: 'ges_session',
  CART: 'ges_cart',
  ORDERS: 'ges_orders',
  INVOICES: 'ges_invoices',
  SERVICE_REQUESTS: 'ges_service_requests',
  CONTACT_MESSAGES: 'ges_contact_messages',
  CHAT_MESSAGES: 'ges_chat_messages',
  THEME: 'ges_theme',
  SEEDED: 'ges_seeded'
};

const SERVICES_LIST = [
  { id: 'installation', name: 'Installation électrique', desc: "Installation complète et sécurisée des réseaux électriques pour logements, bureaux et chantiers.", icon: 'plug' },
  { id: 'maintenance', name: 'Maintenance électrique', desc: "Contrôle, entretien préventif et mise aux normes de vos installations existantes.", icon: 'wrench' },
  { id: 'depannage', name: "Dépannage d'urgence", desc: "Intervention rapide 24/7 en cas de panne, court-circuit ou coupure de courant.", icon: 'bolt' },
  { id: 'solaire', name: 'Installation solaire', desc: "Pose de panneaux solaires et solutions d'énergie autonome pour réduire votre facture.", icon: 'sun' },
  { id: 'cables', name: 'Vente de câbles électriques', desc: "Câbles électriques certifiés, toutes sections, pour tous types de chantiers.", icon: 'cable' },
  { id: 'disjoncteurs', name: 'Vente de disjoncteurs', desc: "Disjoncteurs et coffrets de protection adaptés à votre installation.", icon: 'shield' },
  { id: 'prises', name: 'Vente de prises et interrupteurs', desc: "Large gamme de prises, interrupteurs et accessoires design.", icon: 'socket' },
  { id: 'camera', name: 'Installation de caméras de surveillance', desc: "Sécurisez votre domicile ou local professionnel avec des systèmes de vidéosurveillance fiables.", icon: 'camera' },
  { id: 'eclairage', name: "Installation d'éclairage intelligent", desc: "Éclairage connecté et automatisé pour plus de confort et d'économies d'énergie.", icon: 'lightbulb' },
  { id: 'devis', name: 'Devis gratuit', desc: "Recevez une estimation gratuite et sans engagement pour votre projet électrique.", icon: 'doc' }
];

const PRODUCTS_SEED = [
  { id: 'p1', ref: 'GES-CAB-001', name: 'Câble électrique 2.5mm² (100m)', category: 'Câbles', price: 45000, stock: 24 },
  { id: 'p2', ref: 'GES-CAB-002', name: 'Câble électrique 6mm² (100m)', category: 'Câbles', price: 78000, stock: 18 },
  { id: 'p3', ref: 'GES-DIS-001', name: 'Disjoncteur 20A unipolaire', category: 'Disjoncteurs', price: 6500, stock: 40 },
  { id: 'p4', ref: 'GES-DIS-002', name: 'Disjoncteur différentiel 30mA', category: 'Disjoncteurs', price: 15500, stock: 22 },
  { id: 'p5', ref: 'GES-DIS-003', name: 'Coffret électrique 12 modules', category: 'Disjoncteurs', price: 32000, stock: 8 },
  { id: 'p6', ref: 'GES-PRI-001', name: 'Prise murale simple 16A', category: 'Prises & interrupteurs', price: 2500, stock: 60 },
  { id: 'p7', ref: 'GES-PRI-002', name: 'Interrupteur va-et-vient', category: 'Prises & interrupteurs', price: 3200, stock: 55 },
  { id: 'p8', ref: 'GES-PRI-003', name: 'Prise étanche extérieure', category: 'Prises & interrupteurs', price: 5800, stock: 5 },
  { id: 'p9', ref: 'GES-SOL-001', name: 'Panneau solaire 150W monocristallin', category: 'Solaire', price: 95000, stock: 10 },
  { id: 'p10', ref: 'GES-SOL-002', name: 'Régulateur solaire MPPT 30A', category: 'Solaire', price: 42000, stock: 14 },
  { id: 'p11', ref: 'GES-SEC-001', name: 'Caméra de surveillance HD Wi-Fi', category: 'Sécurité', price: 38000, stock: 16 },
  { id: 'p12', ref: 'GES-ECL-001', name: 'Ampoule LED connectée', category: 'Éclairage intelligent', price: 9000, stock: 0 }
];

const TESTIMONIALS = [
  { name: 'Marie A.', role: 'Propriétaire, Douala', text: "Intervention rapide et travail impeccable pour la remise aux normes de ma maison. Je recommande.", stars: 5 },
  { name: 'Jean-Paul K.', role: 'Gérant de boutique, Yaoundé', text: "L'équipe a installé nos caméras de surveillance en une journée, sérieux et ponctuel.", stars: 5 },
  { name: 'Fatima N.', role: 'Particulier, Bafoussam', text: "Devis clair, prix honnête et panneaux solaires posés proprement. Très satisfaite.", stars: 4 }
];

/* ---------------- Helpers bas niveau ---------------- */
function readLS(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (e) {
    return fallback;
  }
}
function writeLS(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
function uid(prefix) {
  return prefix + '_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}
function simpleHash(str) {
  // Obfuscation simple côté démo — à remplacer par un vrai hachage serveur (bcrypt, etc.)
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return 'h' + Math.abs(hash) + '_' + str.length;
}

/* ---------------- Objet DB : point d'accès unique ---------------- */
const DB = {
  seedIfNeeded() {
    if (readLS(DB_KEYS.SEEDED, false)) return;
    writeLS(DB_KEYS.USERS, []);
    writeLS(DB_KEYS.CART, []);
    writeLS(DB_KEYS.ORDERS, []);
    writeLS(DB_KEYS.INVOICES, []);
    writeLS(DB_KEYS.SERVICE_REQUESTS, []);
    writeLS(DB_KEYS.CONTACT_MESSAGES, []);
    writeLS(DB_KEYS.CHAT_MESSAGES, []);
    writeLS(DB_KEYS.SEEDED, true);
  },
  // ---- Produits (statiques pour la démo) ----
  getProducts() { return PRODUCTS_SEED; },
  getProduct(id) { return PRODUCTS_SEED.find(p => p.id === id); },

  // ---- Utilisateurs / session ----
  getUsers() { return readLS(DB_KEYS.USERS, []); },
  saveUsers(list) { writeLS(DB_KEYS.USERS, list); },
  createUser(user) {
    const users = this.getUsers();
    users.push(user);
    this.saveUsers(users);
    return user;
  },
  findUserByEmailOrPhone(value) {
    const v = value.trim().toLowerCase();
    return this.getUsers().find(u => u.email.toLowerCase() === v || u.telephone === value.trim());
  },
  updateUser(id, patch) {
    const users = this.getUsers();
    const idx = users.findIndex(u => u.id === id);
    if (idx === -1) return null;
    users[idx] = { ...users[idx], ...patch };
    this.saveUsers(users);
    return users[idx];
  },
  getSession() { return readLS(DB_KEYS.SESSION, null); },
  setSession(userId) { writeLS(DB_KEYS.SESSION, userId); },
  clearSession() { localStorage.removeItem(DB_KEYS.SESSION); },
  getCurrentUser() {
    const id = this.getSession();
    if (!id) return null;
    return this.getUsers().find(u => u.id === id) || null;
  },

  // ---- Panier ----
  getCart() { return readLS(DB_KEYS.CART, []); },
  saveCart(cart) { writeLS(DB_KEYS.CART, cart); this.updateCartBadge(); },
  addToCart(productId, qty) {
    const cart = this.getCart();
    const existing = cart.find(i => i.productId === productId);
    if (existing) existing.qty += qty;
    else cart.push({ productId, qty });
    this.saveCart(cart);
  },
  updateCartQty(productId, qty) {
    let cart = this.getCart();
    cart = cart.map(i => i.productId === productId ? { ...i, qty: Math.max(1, qty) } : i);
    this.saveCart(cart);
  },
  removeFromCart(productId) {
    const cart = this.getCart().filter(i => i.productId !== productId);
    this.saveCart(cart);
  },
  clearCart() { this.saveCart([]); },
  cartCount() { return this.getCart().reduce((s, i) => s + i.qty, 0); },
  cartTotal() {
    return this.getCart().reduce((s, i) => {
      const p = this.getProduct(i.productId);
      return s + (p ? p.price * i.qty : 0);
    }, 0);
  },
  updateCartBadge() {
    document.querySelectorAll('.cart-badge').forEach(b => b.textContent = this.cartCount());
  },

  // ---- Commandes ----
  getOrders() { return readLS(DB_KEYS.ORDERS, []); },
  nextOrderNumber() {
    const n = this.getOrders().length + 1;
    return 'CMD-' + new Date().getFullYear() + '-' + String(n).padStart(4, '0');
  },
  createOrder(order) {
    const orders = this.getOrders();
    orders.unshift(order);
    writeLS(DB_KEYS.ORDERS, orders);
    return order;
  },
  ordersForUser(userId) { return this.getOrders().filter(o => o.userId === userId); },
  getOrder(id) { return this.getOrders().find(o => o.id === id); },

  // ---- Factures ----
  getInvoices() { return readLS(DB_KEYS.INVOICES, []); },
  nextInvoiceNumber() {
    const n = this.getInvoices().length + 1;
    return 'FAC-' + new Date().getFullYear() + '-' + String(n).padStart(4, '0');
  },
  createInvoice(invoice) {
    const list = this.getInvoices();
    list.unshift(invoice);
    writeLS(DB_KEYS.INVOICES, list);
    return invoice;
  },
  getInvoice(id) { return this.getInvoices().find(i => i.id === id); },
  getInvoiceByOrder(orderId) { return this.getInvoices().find(i => i.orderId === orderId); },
  invoicesForUser(userId) { return this.getInvoices().filter(i => i.userId === userId); },

  // ---- Demandes de service ----
  getServiceRequests() { return readLS(DB_KEYS.SERVICE_REQUESTS, []); },
  createServiceRequest(req) {
    const list = this.getServiceRequests();
    list.unshift(req);
    writeLS(DB_KEYS.SERVICE_REQUESTS, list);
    return req;
  },
  requestsForUser(userId) { return this.getServiceRequests().filter(r => r.userId === userId); },

  // ---- Contact ----
  getContactMessages() { return readLS(DB_KEYS.CONTACT_MESSAGES, []); },
  createContactMessage(msg) {
    const list = this.getContactMessages();
    list.unshift(msg);
    writeLS(DB_KEYS.CONTACT_MESSAGES, list);
    return msg;
  },

  // ---- Chat assistance ----
  getChatMessages() { return readLS(DB_KEYS.CHAT_MESSAGES, []); },
  addChatMessage(msg) {
    const list = this.getChatMessages();
    list.push(msg);
    writeLS(DB_KEYS.CHAT_MESSAGES, list);
    return msg;
  }
};

DB.seedIfNeeded();
