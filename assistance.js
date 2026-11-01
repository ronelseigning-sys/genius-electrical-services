document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('chatIcon').innerHTML = ICONS.chat;
  document.getElementById('waIcon').innerHTML = ICONS.whatsapp;
  document.getElementById('callIcon').innerHTML = ICONS.bolt;

  document.getElementById('waLink').href = waUrl();
  const mailEl = document.getElementById('mailLink');
  if (mailEl) mailEl.href = mailtoUrl();

  document.getElementById('startChatBtn').addEventListener('click', () => {
    document.getElementById('fabBtn')?.click();
    setTimeout(() => document.getElementById('openChatBtn')?.click(), 80);
  });

  setTimeout(() => document.querySelectorAll('.reveal').forEach(el => el.classList.add('in-view')), 50);

  const form = document.getElementById('assistForm');
  const success = document.getElementById('assistSuccess');
  form.addEventListener('submit', e => {
    e.preventDefault();
    const nom = document.getElementById('a-nom');
    const email = document.getElementById('a-email');
    const message = document.getElementById('a-message');
    let valid = true;

    if (!Validators.notEmpty(nom.value)) { showFieldError(nom, document.getElementById('err-a-nom'), 'Champ obligatoire.'); valid = false; }
    else clearFieldError(nom, document.getElementById('err-a-nom'));
    if (!Validators.isEmail(email.value)) { showFieldError(email, document.getElementById('err-a-email'), 'Email invalide.'); valid = false; }
    else clearFieldError(email, document.getElementById('err-a-email'));
    if (!Validators.notEmpty(message.value)) { showFieldError(message, document.getElementById('err-a-message'), 'Champ obligatoire.'); valid = false; }
    else clearFieldError(message, document.getElementById('err-a-message'));
    if (!valid) return;

    DB.createContactMessage({
      id: uid('msg'),
      nom: nom.value.trim(),
      email: email.value.trim(),
      sujet: 'Demande d\'assistance',
      message: message.value.trim(),
      date: new Date().toISOString()
    });

    form.reset();
    success.textContent = 'Votre demande a été envoyée à notre équipe. Nous vous répondrons rapidement.';
    success.classList.add('show');
    notify('Demande d\'assistance envoyée.', 'success');
  });
});
