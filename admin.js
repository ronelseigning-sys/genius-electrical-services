document.addEventListener('DOMContentLoaded', () => {
  const users = DB.getUsers();
  const orders = DB.getOrders();
  const requests = DB.getServiceRequests();
  const messages = DB.getContactMessages();

  document.getElementById('kpiUsers').textContent = users.length;
  document.getElementById('kpiOrders').textContent = orders.length;
  document.getElementById('kpiRequests').textContent = requests.length;
  document.getElementById('kpiMessages').textContent = messages.length;

  document.getElementById('tableUsers').innerHTML = `
    <thead><tr><th>Nom</th><th>Téléphone</th><th>Email</th><th>Ville</th><th>Inscrit le</th></tr></thead>
    <tbody>${users.length ? users.map(u => `
      <tr><td>${u.prenom} ${u.nom}</td><td>${u.telephone}</td><td>${u.email}</td><td>${u.ville}</td>
      <td>${new Date(u.createdAt).toLocaleDateString('fr-FR')}</td></tr>
    `).join('') : `<tr><td colspan="5" class="muted">Aucune inscription pour le moment.</td></tr>`}</tbody>`;

  document.getElementById('tableOrders').innerHTML = `
    <thead><tr><th>Référence</th><th>Client</th><th>Articles</th><th>Total</th><th>Date</th><th>Statut</th></tr></thead>
    <tbody>${orders.length ? orders.map(o => {
      const u = users.find(x => x.id === o.userId);
      return `<tr><td class="mono">${o.numero || o.id}</td><td>${u ? u.prenom + ' ' + u.nom : 'Client'}</td>
      <td>${o.items.length}</td><td class="mono">${formatFCFA(o.total)}</td>
      <td>${new Date(o.date).toLocaleDateString('fr-FR')}</td><td><span class="badge confirmed">Confirmée</span></td></tr>`;
    }).join('') : `<tr><td colspan="6" class="muted">Aucune commande pour le moment.</td></tr>`}</tbody>`;

  const invoices = DB.getInvoices();
  document.getElementById('tableInvoices').innerHTML = `
    <thead><tr><th>N° Facture</th><th>N° Commande</th><th>Client</th><th>Total</th><th>Date</th></tr></thead>
    <tbody>${invoices.length ? invoices.map(inv => {
      const u = users.find(x => x.id === inv.userId);
      return `<tr><td class="mono">${inv.numero}</td><td class="mono">${inv.orderNumero}</td>
      <td>${u ? u.prenom + ' ' + u.nom : 'Client'}</td><td class="mono">${formatFCFA(inv.total)}</td>
      <td>${new Date(inv.date).toLocaleDateString('fr-FR')}</td></tr>`;
    }).join('') : `<tr><td colspan="5" class="muted">Aucune facture pour le moment.</td></tr>`}</tbody>`;

  document.getElementById('tableRequests').innerHTML = `
    <thead><tr><th>N°</th><th>Service</th><th>Client</th><th>Ville / Quartier</th><th>Date</th><th>Heure</th><th>Statut</th></tr></thead>
    <tbody>${requests.length ? requests.map(r => {
      const u = users.find(x => x.id === r.userId);
      return `<tr><td class="mono">${r.numero || r.id}</td><td>${r.serviceName}</td><td>${u ? u.prenom + ' ' + u.nom : 'Invité'}</td>
      <td>${r.ville}, ${r.quartier}</td><td>${r.date}</td><td>${r.heure}</td><td><span class="badge pending">En attente</span></td></tr>`;
    }).join('') : `<tr><td colspan="7" class="muted">Aucune demande pour le moment.</td></tr>`}</tbody>`;

  document.getElementById('tableMessages').innerHTML = `
    <thead><tr><th>Nom</th><th>Email</th><th>Sujet</th><th>Message</th><th>Date</th></tr></thead>
    <tbody>${messages.length ? messages.map(m => `
      <tr><td>${m.nom}</td><td>${m.email}</td><td>${m.sujet || '—'}</td>
      <td style="max-width:260px;">${m.message}</td><td>${new Date(m.date).toLocaleDateString('fr-FR')}</td></tr>
    `).join('') : `<tr><td colspan="5" class="muted">Aucun message pour le moment.</td></tr>`}</tbody>`;

  document.querySelectorAll('.admin-side button').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.admin-side button').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.admin-panel').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById('panel-' + btn.dataset.panel).classList.add('active');
    });
  });
});
