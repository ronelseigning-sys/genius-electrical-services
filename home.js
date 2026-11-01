document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-i]').forEach(el => { el.innerHTML = ICONS[el.dataset.i]; });
  const ctaWa = document.getElementById('ctaWa'); if (ctaWa) ctaWa.href = waUrl();
  const ctaMail = document.getElementById('ctaMail'); if (ctaMail) ctaMail.href = mailtoUrl();

  const preview = document.getElementById('servicesPreview');
  if (preview) {
    preview.innerHTML = [SERVICES_LIST[0], SERVICES_LIST[2], SERVICES_LIST[3]].map(s => `
      <div class="card service-card reveal">
        <div class="icon">${ICONS[s.icon] || ICONS.bolt}</div>
        <h3>${s.name}</h3>
        <p>${s.desc}</p>
        <a href="services.html" class="more-link">En savoir plus</a>
      </div>
    `).join('');
  }

  setTimeout(() => document.querySelectorAll('.reveal').forEach(el => el.classList.add('in-view')), 50);
});
