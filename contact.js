document.addEventListener('DOMContentLoaded', () => {
  const mhref = mailtoUrl();
  ['contactMail','contactMailBtn'].forEach(id => { const el = document.getElementById(id); if (el) el.href = mhref; });
  const cw = document.getElementById('contactWa'); if (cw) cw.href = waUrl();
  const form = document.getElementById('contactForm');
  if (!form) return;
  const success = document.getElementById('contactSuccess');

  form.addEventListener('submit', e => {
    e.preventDefault();
    const nom = document.getElementById('c-nom');
    const email = document.getElementById('c-email');
    const message = document.getElementById('c-message');
    let valid = true;

    if (!Validators.notEmpty(nom.value)) { showFieldError(nom, document.getElementById('err-c-nom'), 'Champ obligatoire.'); valid = false; }
    else clearFieldError(nom, document.getElementById('err-c-nom'));

    if (!Validators.isEmail(email.value)) { showFieldError(email, document.getElementById('err-c-email'), 'Email invalide.'); valid = false; }
    else clearFieldError(email, document.getElementById('err-c-email'));

    if (!Validators.notEmpty(message.value)) { showFieldError(message, document.getElementById('err-c-message'), 'Champ obligatoire.'); valid = false; }
    else clearFieldError(message, document.getElementById('err-c-message'));

    if (!valid) return;

    DB.createContactMessage({
      id: uid('msg'),
      nom: nom.value.trim(),
      email: email.value.trim(),
      sujet: document.getElementById('c-sujet').value.trim(),
      message: message.value.trim(),
      date: new Date().toISOString()
    });

    form.reset();
    success.textContent = 'Votre message a bien été envoyé. Nous vous répondrons rapidement.';
    success.classList.add('show');
    notify('Message envoyé avec succès.', 'success');
  });
});
