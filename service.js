document.addEventListener('DOMContentLoaded', () => {
  const select = document.getElementById('serviceType');
  select.innerHTML = SERVICES_LIST.map(s => `<option value="${s.id}">${s.name}</option>`).join('');

  const params = new URLSearchParams(window.location.search);
  const preselect = params.get('service');
  if (preselect) select.value = preselect;

  document.getElementById('date').min = new Date().toISOString().split('T')[0];

  const user = DB.getCurrentUser();
  if (user) {
    document.getElementById('adresse').value = `${user.adresse}, ${user.quartier}, ${user.ville}`;
    document.getElementById('telephone').value = user.telephone;
  }

  let photoData = null;
  const photoInput = document.getElementById('photo');
  const preview = document.getElementById('filePreview');
  const previewImg = document.getElementById('previewImg');
  const previewName = document.getElementById('previewName');

  photoInput.addEventListener('change', () => {
    const file = photoInput.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = e => {
      photoData = e.target.result;
      previewImg.src = photoData;
      previewName.textContent = file.name;
      preview.classList.add('show');
    };
    reader.readAsDataURL(file);
  });
  document.getElementById('removePhoto').addEventListener('click', () => {
    photoData = null;
    photoInput.value = '';
    preview.classList.remove('show');
  });

  const form = document.getElementById('serviceForm');
  const formError = document.getElementById('formError');
  const formSuccess = document.getElementById('formSuccess');

  form.addEventListener('submit', e => {
    e.preventDefault();
    formError.classList.remove('show');
    formSuccess.classList.remove('show');

    const fields = ['ville', 'quartier', 'adresse', 'telephone', 'date', 'heure', 'description'];
    let valid = true;
    fields.forEach(f => {
      const el = document.getElementById(f);
      const err = document.getElementById('err-' + f);
      if (!Validators.notEmpty(el.value)) {
        showFieldError(el, err, 'Ce champ est obligatoire.');
        valid = false;
      } else {
        clearFieldError(el, err);
      }
    });

    const telEl = document.getElementById('telephone');
    if (Validators.notEmpty(telEl.value) && !Validators.isPhone(telEl.value)) {
      showFieldError(telEl, document.getElementById('err-telephone'), 'Numéro de téléphone invalide (ex : 6XXXXXXXX).');
      valid = false;
    }

    if (!valid) {
      formError.textContent = 'Veuillez corriger les champs indiqués avant de continuer.';
      formError.classList.add('show');
      notify('Veuillez corriger les champs indiqués.', 'error');
      return;
    }

    const requests = DB.getServiceRequests();
    const numero = 'DEM-' + new Date().getFullYear() + '-' + String(requests.length + 1).padStart(4, '0');

    const request = {
      id: uid('srv'),
      numero,
      userId: user ? user.id : null,
      serviceId: select.value,
      serviceName: select.options[select.selectedIndex].text,
      ville: document.getElementById('ville').value.trim(),
      quartier: document.getElementById('quartier').value.trim(),
      adresse: document.getElementById('adresse').value.trim(),
      telephone: telEl.value.trim(),
      date: document.getElementById('date').value,
      heure: document.getElementById('heure').value,
      description: document.getElementById('description').value.trim(),
      notes: document.getElementById('notes').value.trim(),
      photo: photoData,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    DB.createServiceRequest(request);

    form.reset();
    preview.classList.remove('show');
    photoData = null;
    formSuccess.textContent = `Votre demande N° ${numero} a bien été envoyée. Notre équipe vous contactera très vite pour confirmer le rendez-vous.`;
    formSuccess.classList.add('show');
    notify('Demande de service envoyée avec succès.', 'success');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});
