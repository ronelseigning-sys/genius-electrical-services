document.addEventListener('DOMContentLoaded', () => {
  const host = document.getElementById('cartContainer');
  render();

  function render() {
    const cart = DB.getCart();
    if (!cart.length) {
      host.innerHTML = `
        <div class="empty-state">
          ${ICONS.cart}
          <h3>Votre panier est vide</h3>
          <p>Parcourez notre boutique pour ajouter des produits.</p>
          <a href="boutique.html" class="btn btn-primary">Voir la boutique</a>
        </div>`;
      return;
    }

    const rows = cart.map(item => {
      const p = DB.getProduct(item.productId);
      if (!p) return '';
      return `
        <tr data-id="${p.id}">
          <td>
            <div class="cart-item">
              <div class="thumb">${ICONS.image}</div>
              <div>
                <div style="font-weight:600;">${p.name}</div>
                <div class="small muted">${p.category}</div>
              </div>
            </div>
          </td>
          <td class="mono">${formatFCFA(p.price)}</td>
          <td>
            <div class="qty-control">
              <button class="qty-minus" aria-label="Diminuer">−</button>
              <span>${item.qty}</span>
              <button class="qty-plus" aria-label="Augmenter">+</button>
            </div>
          </td>
          <td class="mono">${formatFCFA(p.price * item.qty)}</td>
          <td><button class="remove-btn">Supprimer</button></td>
        </tr>`;
    }).join('');

    const total = DB.cartTotal();

    host.innerHTML = `
      <div class="grid" style="grid-template-columns:2fr 1fr;gap:32px;align-items:start;">
        <div style="overflow-x:auto;">
          <table class="cart-table">
            <thead><tr><th>Produit</th><th>Prix</th><th>Quantité</th><th>Sous-total</th><th></th></tr></thead>
            <tbody>${rows}</tbody>
          </table>
        </div>
        <div class="cart-summary">
          <h3>Résumé de la commande</h3>
          <div class="summary-row"><span>Sous-total</span><span class="mono">${formatFCFA(total)}</span></div>
          <div class="summary-row"><span>Livraison</span><span class="mono">À confirmer</span></div>
          <div class="summary-row total"><span>Total</span><span class="val">${formatFCFA(total)}</span></div>
          <div id="orderMsg" class="form-success-banner"></div>
          <button class="btn btn-primary btn-block" id="checkoutBtn">Commander</button>
          <a href="boutique.html" class="btn btn-outline btn-block" style="margin-top:10px;">Continuer mes achats</a>
        </div>
      </div>
    `;

    host.querySelectorAll('.qty-plus').forEach(b => b.addEventListener('click', e => {
      const id = e.target.closest('tr').dataset.id;
      const item = DB.getCart().find(i => i.productId === id);
      DB.updateCartQty(id, item.qty + 1);
      render();
    }));
    host.querySelectorAll('.qty-minus').forEach(b => b.addEventListener('click', e => {
      const id = e.target.closest('tr').dataset.id;
      const item = DB.getCart().find(i => i.productId === id);
      if (item.qty <= 1) { DB.removeFromCart(id); } else { DB.updateCartQty(id, item.qty - 1); }
      render();
    }));
    host.querySelectorAll('.remove-btn').forEach(b => b.addEventListener('click', e => {
      const id = e.target.closest('tr').dataset.id;
      DB.removeFromCart(id);
      notify('Produit retiré du panier.', 'info');
      render();
    }));

    document.getElementById('checkoutBtn').addEventListener('click', checkout);
  }

  function checkout() {
    const user = DB.getCurrentUser();
    if (!user) {
      notify('Connectez-vous pour finaliser votre commande.', 'info');
      window.location.href = 'connexion.html?redirect=panier.html';
      return;
    }
    const cart = DB.getCart();
    if (!cart.length) { notify('Votre panier est vide.', 'error'); return; }

    const items = cart.map(i => {
      const p = DB.getProduct(i.productId);
      return { productId: i.productId, ref: p?.ref, name: p?.name, price: p?.price, qty: i.qty };
    });
    const total = DB.cartTotal();
    const orderNumber = DB.nextOrderNumber();
    const order = {
      id: uid('cmd'),
      numero: orderNumber,
      userId: user.id,
      items,
      subtotal: total,
      livraison: 0,
      total,
      address: `${user.adresse}, ${user.quartier}, ${user.ville}`,
      phone: user.telephone,
      status: 'confirmed',
      date: new Date().toISOString()
    };
    DB.createOrder(order);

    const invoice = {
      id: uid('fac'),
      numero: DB.nextInvoiceNumber(),
      orderId: order.id,
      orderNumero: order.numero,
      userId: user.id,
      items,
      subtotal: total,
      discount: 0,
      livraison: 0,
      total,
      date: new Date().toISOString()
    };
    DB.createInvoice(invoice);
    DB.clearCart();

    notify('Commande confirmée avec succès !', 'success');
    window.location.href = 'facture.html?id=' + invoice.id;
  }
});
