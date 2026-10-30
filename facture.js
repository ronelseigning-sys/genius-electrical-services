document.addEventListener('DOMContentLoaded', () => {
  const host = document.getElementById('invoiceHost');
  const actions = document.getElementById('invoiceActions');
  const params = new URLSearchParams(window.location.search);
  const invoiceId = params.get('id');
  const invoice = invoiceId ? DB.getInvoice(invoiceId) : null;

  if (!invoice) {
    host.innerHTML = `
      <div class="empty-state">
        ${ICONS.doc}
        <h3>Facture introuvable</h3>
        <p>Cette facture n'existe pas ou a été supprimée.</p>
        <a href="mon-compte.html" class="btn btn-primary">Retour à mon compte</a>
      </div>`;
    return;
  }

  const user = DB.getUsers().find(u => u.id === invoice.userId) || {};
  const orderStatusLabel = { pending: 'En attente', confirmed: 'Confirmée', done: 'Livrée', cancelled: 'Annulée' };
  const order = DB.getOrder(invoice.orderId);

  const rows = invoice.items.map(it => `
    <tr>
      <td>${it.name || '—'}</td>
      <td class="mono">${it.ref || '—'}</td>
      <td class="num">${it.qty}</td>
      <td class="num">${formatFCFA(it.price || 0)}</td>
      <td class="num">${formatFCFA((it.price || 0) * it.qty)}</td>
    </tr>
  `).join('');

  const dateObj = new Date(invoice.date);

  host.innerHTML = `
    <div class="invoice-sheet">
      <div class="invoice-top">
        <div>
          <img src="assets/logo-light.png" alt="Genius Electrical Service" class="brand-logo">
          <div class="company-info">
            Douala, Akwa — Cameroun<br>
            WhatsApp : +237 673 074 387<br>
            Email : thegeniusservice@gmail.com
          </div>
        </div>
        <div class="invoice-title">
          <h1>FACTURE</h1>
          <div class="mono">N° ${invoice.numero}</div>
          <div class="mono">Commande N° ${invoice.orderNumero}</div>
          <div class="small muted">${dateObj.toLocaleDateString('fr-FR')} à ${dateObj.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</div>
          ${order ? `<span class="badge confirmed invoice-status-badge">${orderStatusLabel[order.status] || 'Confirmée'}</span>` : ''}
        </div>
      </div>

      <div class="invoice-parties">
        <div>
          <h4>Facturé à</h4>
          <p><strong>${user.prenom || ''} ${user.nom || ''}</strong></p>
          <p>${user.telephone || ''}</p>
          <p>${user.email || ''}</p>
          <p>${user.adresse || ''}, ${user.quartier || ''}, ${user.ville || ''}</p>
        </div>
        <div>
          <h4>Émetteur</h4>
          <p><strong>Genius Electrical Service</strong></p>
          <p>WhatsApp : +237 673 074 387</p>
          <p>thegeniusservice@gmail.com</p>
          <p>Akwa, Douala, Cameroun</p>
        </div>
      </div>

      <table class="invoice-table">
        <thead>
          <tr><th>Désignation</th><th>Référence</th><th class="num">Quantité</th><th class="num">Prix unitaire</th><th class="num">Total</th></tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>

      <div class="invoice-totals">
        <div class="summary-row"><span>Sous-total</span><span class="mono">${formatFCFA(invoice.subtotal)}</span></div>
        <div class="summary-row"><span>Réduction</span><span class="mono">${formatFCFA(invoice.discount || 0)}</span></div>
        <div class="summary-row"><span>Frais de livraison</span><span class="mono">${formatFCFA(invoice.livraison || 0)}</span></div>
        <div class="summary-row total"><span>Total à payer</span><span class="val">${formatFCFA(invoice.total)}</span></div>
      </div>

      <div class="current-line"></div>
      <p class="small text-center" style="margin:0;">Merci de votre confiance — Genius Electrical Service.</p>
    </div>
  `;
  actions.style.display = 'flex';

  document.getElementById('printBtn').addEventListener('click', () => window.print());
});
