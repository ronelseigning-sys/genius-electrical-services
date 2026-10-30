document.addEventListener('DOMContentLoaded', () => {
  const user = DB.getCurrentUser();
  const loggedOutIcon = document.getElementById('loggedOutIcon');
  if (loggedOutIcon) loggedOutIcon.innerHTML = ICONS.user;

  if (!user) {
    document.getElementById('accountSection').style.display = 'none';
    document.getElementById('loggedOutSection').style.display = 'block';
    return;
  }

  document.getElementById('welcomeTitle').textContent = `Bonjour, ${user.prenom} 👋`;

  // Pré-remplir le profil
  document.getElementById('p-nom').value = user.nom;
  document.getElementById('p-prenom').value = user.prenom;
  document.getElementById('p-telephone').value = user.telephone;
  document.getElementById('p-email').value = user.email;
  document.getElementById('p-ville').value = user.ville;
  document.getElementById('p-quartier').value = user.quartier;
  document.getElementById('p-adresse').value = user.adresse;

  document.getElementById('profileForm').addEventListener('submit', e => {
    e.preventDefault();
    DB.updateUser(user.id, {
      nom: document.getElementById('p-nom').value.trim(),
      prenom: document.getElementById('p-prenom').value.trim(),
      telephone: document.getElementById('p-telephone').value.trim(),
      email: document.getElementById('p-email').value.trim(),
      ville: document.getElementById('p-ville').value.trim(),
      quartier: document.getElementById('p-quartier').value.trim(),
      adresse: document.getElementById('p-adresse').value.trim()
    });
    const banner = document.getElementById('profileSuccess');
    banner.textContent = 'Vos informations ont été mises à jour.';
    banner.classList.add('show');
    notify('Profil mis à jour avec succès.', 'success');
    document.getElementById('welcomeTitle').textContent = `Bonjour, ${document.getElementById('p-prenom').value.trim()} 👋`;
  });

  document.getElementById('logoutBtn').addEventListener('click', () => {
    DB.clearSession();
    notify('Vous avez été déconnecté.', 'info');
    setTimeout(() => window.location.href = 'index.html', 400);
  });

  // Onglets
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById('tab-' + btn.dataset.tab).classList.add('active');
    });
  });

  // Historique des commandes
  const orders = DB.ordersForUser(user.id);
  const ordersHost = document.getElementById('ordersList');
  const statusLabel = { pending: 'En attente', confirmed: 'Confirmée', done: 'Livrée', cancelled: 'Annulée' };
  const statusClass = { pending: 'pending', confirmed: 'confirmed', done: 'done', cancelled: 'cancelled' };
  ordersHost.innerHTML = orders.length ? orders.map(o => {
    const inv = DB.getInvoiceByOrder(o.id);
    return `
    <div class="list-row">
      <div>
        <div style="font-weight:600;">Commande ${o.numero || o.id}</div>
        <div class="small muted">${new Date(o.date).toLocaleDateString('fr-FR')} · ${o.items.length} article(s)</div>
      </div>
      <span class="mono">${formatFCFA(o.total)}</span>
      <span class="badge ${statusClass[o.status] || 'pending'}">${statusLabel[o.status] || 'En attente'}</span>
      <div class="flex gap-8">
        ${inv ? `<a href="facture.html?id=${inv.id}" class="btn btn-outline btn-sm">Voir la facture</a>` : ''}
      </div>
    </div>`;
  }).join('') : `<div class="empty-state">${ICONS.cart}<p>Aucune commande pour le moment.</p><a href="boutique.html" class="btn btn-primary">Aller à la boutique</a></div>`;

  // Mes factures
  const invoices = DB.invoicesForUser(user.id);
  const invoicesHost = document.getElementById('invoicesList');
  invoicesHost.innerHTML = invoices.length ? invoices.map(inv => `
    <div class="list-row">
      <div>
        <div style="font-weight:600;">Facture ${inv.numero}</div>
        <div class="small muted">${new Date(inv.date).toLocaleDateString('fr-FR')} · Commande ${inv.orderNumero}</div>
      </div>
      <span class="mono">${formatFCFA(inv.total)}</span>
      <div class="flex gap-8">
        <a href="facture.html?id=${inv.id}" class="btn btn-outline btn-sm">Voir</a>
        <a href="facture.html?id=${inv.id}" class="btn btn-primary btn-sm">Imprimer</a>
      </div>
    </div>
  `).join('') : `<div class="empty-state">${ICONS.doc}<p>Aucune facture pour le moment.</p></div>`;

  // Historique des demandes de service
  const requests = DB.requestsForUser(user.id);
  const reqHost = document.getElementById('requestsList');
  reqHost.innerHTML = requests.length ? requests.map(r => `
    <div class="list-row">
      <div>
        <div style="font-weight:600;">${r.serviceName} <span class="mono small muted">(${r.numero || r.id})</span></div>
        <div class="small muted">${r.ville}, ${r.quartier} · ${r.date} à ${r.heure}</div>
      </div>
      <span class="badge pending">En attente</span>
    </div>
  `).join('') : `<div class="empty-state">${ICONS.doc}<p>Aucune demande de service pour le moment.</p></div>`;
});
