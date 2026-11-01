const SITE = {
  name: 'Genius Electrical Service',
  email: 'thegeniusservice@gmail.com',
  phones: [
    { display: '+237 672 508 196', e164: '+237672508196', wa: '237672508196' },
    { display: '+237 673 074 387', e164: '+237673074387', wa: '237673074387' }
  ],

  whatsappIndex: 0,

  firstMessage: 'Puis-je en savoir plus sur votre entreprise ?',
  emailSubject: 'Demande d\u2019informations'
};

function waUrl(msg) {
  const p = SITE.phones[SITE.whatsappIndex];
  return 'https://wa.me/' + p.wa + '?text=' + encodeURIComponent(msg || SITE.firstMessage);
}
function isMobileDevice() {
  return /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);
}

function mailtoUrl(subject, body) {
  return 'mailto:' + SITE.email + '?subject=' + encodeURIComponent(subject || SITE.emailSubject) +
         '&body=' + encodeURIComponent(body || SITE.firstMessage);
}
function gmailWebUrl(subject, body) {
  return 'https://mail.google.com/mail/?view=cm&fs=1&to=' + encodeURIComponent(SITE.email) +
         '&su=' + encodeURIComponent(subject || SITE.emailSubject) +
         '&body=' + encodeURIComponent(body || SITE.firstMessage);
}
document.addEventListener('click', e => {
  const a = e.target.closest('a[data-mail]');
  if (!a || isMobileDevice()) return;
  e.preventDefault();
  window.open(gmailWebUrl(), '_blank', 'noopener');
});
