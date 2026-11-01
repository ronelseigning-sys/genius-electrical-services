document.addEventListener('DOMContentLoaded', () => {
  initPasswordToggles();

  const signupForm = document.getElementById('signupForm');
  if (signupForm) initSignup(signupForm);

  const loginForm = document.getElementById('loginForm');
  if (loginForm) initLogin(loginForm);
});

function initPasswordToggles() {
  document.querySelectorAll('.password-wrap button').forEach(btn => {
    btn.addEventListener('click', () => {
      const input = document.getElementById(btn.dataset.target);
      const isPwd = input.type === 'password';
      input.type = isPwd ? 'text' : 'password';
      btn.innerHTML = isPwd ? ICONS.eyeOff : ICONS.eye;
    });
    btn.innerHTML = ICONS.eye;
  });
}

function passwordStrength(pwd) {
  let score = 0;
  if (pwd.length >= 8) score++;
  if (pwd.length >= 12) score++;
  if (/[A-Z]/.test(pwd) && /[a-z]/.test(pwd)) score++;
  if (/[0-9]/.test(pwd)) score++;
  if (/[^A-Za-z0-9]/.test(pwd)) score++;
  return Math.min(score, 4);
}

function initSignup(form) {
  const formError = document.getElementById('formError');
  const pwdInput = document.getElementById('password');
  const confirmInput = document.getElementById('confirmPassword');

  const strengthBar = document.createElement('div');
  strengthBar.className = 'pwd-strength';
  strengthBar.innerHTML = '<div class="pwd-strength-bar"></div>';
  const strengthLabel = document.createElement('div');
  strengthLabel.className = 'pwd-strength-label';
  pwdInput.closest('.form-group').appendChild(strengthBar);
  pwdInput.closest('.form-group').appendChild(strengthLabel);
  const bar = strengthBar.querySelector('.pwd-strength-bar');

  const levels = [
    { color: 'var(--danger)', width: '20%', label: 'Très faible' },
    { color: 'var(--danger)', width: '40%', label: 'Faible' },
    { color: '#E6A800', width: '60%', label: 'Moyen' },
    { color: '#2FA84F', width: '85%', label: 'Bon' },
    { color: 'var(--success)', width: '100%', label: 'Excellent' }
  ];

  pwdInput.addEventListener('input', () => {
    const score = passwordStrength(pwdInput.value);
    if (!pwdInput.value) { bar.style.width = '0'; strengthLabel.textContent = ''; }
    else {
      const lvl = levels[score];
      bar.style.width = lvl.width;
      bar.style.background = lvl.color;
      strengthLabel.textContent = 'Robustesse : ' + lvl.label;
    }
    checkMatch();
  });

  const matchIndicator = document.createElement('div');
  matchIndicator.className = 'match-indicator';
  confirmInput.closest('.form-group').appendChild(matchIndicator);

  function checkMatch() {
    if (!confirmInput.value) { matchIndicator.classList.remove('show'); return; }
    matchIndicator.classList.add('show');
    if (pwdInput.value === confirmInput.value) {
      matchIndicator.classList.remove('bad'); matchIndicator.classList.add('ok');
      matchIndicator.innerHTML = ICONS.check + ' Les mots de passe correspondent.';
      clearFieldError(confirmInput, document.getElementById('err-confirmPassword'));
    } else {
      matchIndicator.classList.remove('ok'); matchIndicator.classList.add('bad');
      matchIndicator.innerHTML = ICONS.close + ' Les mots de passe ne correspondent pas.';
    }
  }
  confirmInput.addEventListener('input', checkMatch);

  form.addEventListener('submit', e => {
    e.preventDefault();
    formError.classList.remove('show');

    const fields = {
      nom: document.getElementById('nom'),
      prenom: document.getElementById('prenom'),
      telephone: document.getElementById('telephone'),
      email: document.getElementById('email'),
      ville: document.getElementById('ville'),
      quartier: document.getElementById('quartier'),
      adresse: document.getElementById('adresse'),
      password: document.getElementById('password'),
      confirmPassword: document.getElementById('confirmPassword')
    };

    let valid = true;
    const fail = (key, message) => {
      valid = false;
      showFieldError(fields[key], document.getElementById('err-' + key), message);
    };
    const ok = key => clearFieldError(fields[key], document.getElementById('err-' + key));

    Object.keys(fields).forEach(key => {
      if (!Validators.notEmpty(fields[key].value)) fail(key, 'Ce champ est obligatoire.');
      else ok(key);
    });
    if (!valid) {
      formError.textContent = 'Veuillez remplir tous les champs obligatoires.';
      formError.classList.add('show');
      notify('Veuillez remplir tous les champs obligatoires.', 'error');
      return;
    }

    if (!Validators.isPhone(fields.telephone.value)) {
      fail('telephone', 'Numéro de téléphone invalide (ex : 6XXXXXXXX).');
    }

    if (!Validators.isEmail(fields.email.value)) {
      fail('email', 'Adresse email invalide.');
    }

    const existing = DB.findUserByEmailOrPhone(fields.email.value) || DB.findUserByEmailOrPhone(fields.telephone.value);
    if (existing) {
      fail('email', 'Un compte existe déjà avec cet email ou ce téléphone.');
    }

    if (!Validators.isStrongPassword(fields.password.value)) {
      fail('password', 'Le mot de passe doit contenir au moins 8 caractères.');
    }

    if (fields.password.value !== fields.confirmPassword.value) {
      fail('confirmPassword', 'Les mots de passe ne correspondent pas.');
    }

    if (!valid) {
      formError.textContent = 'Le formulaire contient des erreurs. Corrigez-les pour continuer.';
      formError.classList.add('show');
      notify('Le formulaire contient des erreurs.', 'error');
      return;
    }

    const user = {
      id: uid('usr'),
      nom: fields.nom.value.trim(),
      prenom: fields.prenom.value.trim(),
      telephone: fields.telephone.value.trim(),
      email: fields.email.value.trim(),
      ville: fields.ville.value.trim(),
      quartier: fields.quartier.value.trim(),
      adresse: fields.adresse.value.trim(),
      passwordHash: simpleHash(fields.password.value),
      createdAt: new Date().toISOString()
    };
    DB.createUser(user);
    DB.setSession(user.id);
    notify('Compte créé avec succès. Bienvenue ' + user.prenom + ' !', 'success');
    setTimeout(() => window.location.href = 'mon-compte.html', 600);
  });
}

function initLogin(form) {
  const formError = document.getElementById('formError');
  const hintBanner = document.getElementById('authHint');

  form.addEventListener('submit', e => {
    e.preventDefault();
    formError.classList.remove('show');
    if (hintBanner) hintBanner.classList.remove('show');

    const identifier = document.getElementById('identifier');
    const password = document.getElementById('password');
    const errId = document.getElementById('err-identifier');
    const errPwd = document.getElementById('err-password');
    let valid = true;

    if (!Validators.notEmpty(identifier.value)) { showFieldError(identifier, errId, 'Champ obligatoire.'); valid = false; }
    else clearFieldError(identifier, errId);
    if (!Validators.notEmpty(password.value)) { showFieldError(password, errPwd, 'Champ obligatoire.'); valid = false; }
    else clearFieldError(password, errPwd);
    if (!valid) return;

    const user = DB.findUserByEmailOrPhone(identifier.value);

    if (!user) {
      if (hintBanner) {
        hintBanner.innerHTML = 'Compte introuvable. Vous n\'avez pas encore de compte ? <a href="inscription.html">Inscrivez-vous</a>.';
        hintBanner.classList.add('show');
      }
      notify('Compte introuvable.', 'error');
      return;
    }

    if (user.passwordHash !== simpleHash(password.value)) {
      formError.textContent = 'Mot de passe incorrect. Veuillez réessayer.';
      formError.classList.add('show');
      notify('Mot de passe incorrect.', 'error');
      return;
    }

    DB.setSession(user.id);
    notify('Connexion réussie. Bon retour, ' + user.prenom + ' !', 'success');
    const params = new URLSearchParams(window.location.search);
    setTimeout(() => window.location.href = params.get('redirect') || 'mon-compte.html', 500);
  });
}
