document.addEventListener('DOMContentLoaded', () => {
  const products = DB.getProducts();
  const categories = ['Tous', ...new Set(products.map(p => p.category))];
  const chipsHost = document.getElementById('filterChips');
  const grid = document.getElementById('productsGrid');
  const resultCount = document.getElementById('resultCount');
  const sortSelect = document.getElementById('sortSelect');

  const params = new URLSearchParams(window.location.search);
  let activeCategory = 'Tous';
  let searchQuery = (params.get('q') || '').toLowerCase();

  chipsHost.innerHTML = categories.map(c =>
    `<button class="chip ${c === activeCategory ? 'active' : ''}" data-cat="${c}">${c}</button>`
  ).join('');

  function stockBadge(stock) {
    if (stock <= 0) return `<span class="stock-tag" style="background:rgba(230,57,70,.12);color:var(--danger);">Rupture de stock</span>`;
    if (stock <= 8) return `<span class="stock-tag low">Stock limité</span>`;
    return `<span class="stock-tag in">En stock</span>`;
  }

  function render() {
    let list = products.filter(p => activeCategory === 'Tous' || p.category === activeCategory);
    if (searchQuery) list = list.filter(p => p.name.toLowerCase().includes(searchQuery));

    const sort = sortSelect ? sortSelect.value : 'default';
    if (sort === 'price-asc') list = [...list].sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') list = [...list].sort((a, b) => b.price - a.price);
    if (sort === 'name') list = [...list].sort((a, b) => a.name.localeCompare(b.name));

    resultCount.textContent = `${list.length} produit${list.length > 1 ? 's' : ''}`;

    grid.innerHTML = list.length ? list.map(p => `
      <div class="card product-card reveal">
        <div class="product-img">${ICONS.image}</div>
        <div class="product-body">
          <div class="product-meta"><span>${p.ref}</span>${stockBadge(p.stock)}</div>
          <span class="cat">${p.category}</span>
          <h3>${p.name}</h3>
          <span class="price">${formatFCFA(p.price)}</span>
          <div class="product-actions">
            <button class="btn btn-outline add-to-cart" data-id="${p.id}" ${p.stock <= 0 ? 'disabled' : ''}>Ajouter</button>
            <button class="btn btn-primary buy-now" data-id="${p.id}" ${p.stock <= 0 ? 'disabled' : ''}>Acheter</button>
          </div>
        </div>
      </div>
    `).join('') : `<div class="empty-state" style="grid-column:1/-1;">
        ${ICONS.image}
        <p>Aucun produit ne correspond à votre recherche.</p>
      </div>`;

    setTimeout(() => document.querySelectorAll('.reveal').forEach(el => el.classList.add('in-view')), 30);

    grid.querySelectorAll('.add-to-cart').forEach(btn => {
      btn.addEventListener('click', () => {
        DB.addToCart(btn.dataset.id, 1);
        notify('Produit ajouté au panier.', 'success');
      });
    });
    grid.querySelectorAll('.buy-now').forEach(btn => {
      btn.addEventListener('click', () => {
        DB.addToCart(btn.dataset.id, 1);
        window.location.href = 'panier.html';
      });
    });
  }

  chipsHost.querySelectorAll('.chip').forEach(chip => {
    chip.addEventListener('click', () => {
      activeCategory = chip.dataset.cat;
      chipsHost.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      render();
    });
  });
  if (sortSelect) sortSelect.addEventListener('change', render);

  render();
});
