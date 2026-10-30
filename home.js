document.addEventListener('DOMContentLoaded', () => {
  const heroBolt = document.getElementById('heroBolt');
  if (heroBolt) heroBolt.innerHTML = ICONS.bolt;

  // Aperçu des 4 premiers services
  const preview = document.getElementById('servicesPreview');
  if (preview) {
    preview.innerHTML = SERVICES_LIST.slice(0, 4).map(s => `
      <div class="card service-card reveal">
        <div class="icon">${ICONS[s.icon] || ICONS.bolt}</div>
        <h3>${s.name}</h3>
        <p>${s.desc}</p>
      </div>
    `).join('');
  }

  // Témoignages
  const testiGrid = document.getElementById('testimonialsGrid');
  if (testiGrid) {
    testiGrid.innerHTML = TESTIMONIALS.map(t => `
      <div class="card testimonial reveal">
        <div class="stars">${'★'.repeat(t.stars)}${'☆'.repeat(5 - t.stars)}</div>
        <p>« ${t.text} »</p>
        <div class="who">
          <div class="avatar">${t.name.charAt(0)}</div>
          <div>
            <div class="name">${t.name}</div>
            <div class="role">${t.role}</div>
          </div>
        </div>
      </div>
    `).join('');
  }

  // Compteurs animés pour les statistiques
  const counters = document.querySelectorAll('.stat .num');
  const counterObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.count, 10);
      let current = 0;
      const step = Math.max(1, Math.ceil(target / 60));
      const timer = setInterval(() => {
        current += step;
        if (current >= target) { current = target; clearInterval(timer); }
        el.textContent = current;
      }, 20);
      counterObs.unobserve(el);
    });
  }, { threshold: 0.4 });
  counters.forEach(c => counterObs.observe(c));

  setTimeout(() => document.querySelectorAll('.reveal').forEach(el => el.classList.add('in-view')), 50);
});
