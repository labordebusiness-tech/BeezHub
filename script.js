/* ====================================================================
   LEVEL UP — interactions
   ==================================================================== */

document.addEventListener('DOMContentLoaded', function () {

  /* ---- Année dynamique dans le footer ---- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---- Menu mobile ---- */
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    // Ferme le menu après un clic sur un lien
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---- Animation d'apparition au scroll ---- */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---- Garde-fou : avertir si les liens Stripe ne sont pas configurés ---- */
  document.querySelectorAll('[data-stripe]').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      var href = btn.getAttribute('href') || '';
      if (href.indexOf('REMPLACER') !== -1) {
        e.preventDefault();
        alert('Lien de paiement Stripe à configurer.\n\nRemplace l\'attribut href de ce bouton (data-stripe="' +
          btn.getAttribute('data-stripe') + '") par ton Stripe Payment Link dans index.html.');
      }
    });
  });

  /* ---- Chargement du widget Calendly (uniquement si un lien valide est présent) ---- */
  var calendlyEl = document.querySelector('.calendly-inline-widget');
  if (calendlyEl) {
    var url = calendlyEl.getAttribute('data-url') || '';
    if (url.indexOf('REMPLACER') === -1) {
      var s = document.createElement('script');
      s.src = 'https://assets.calendly.com/assets/external/widget.js';
      s.async = true;
      document.body.appendChild(s);

      var css = document.createElement('link');
      css.rel = 'stylesheet';
      css.href = 'https://assets.calendly.com/assets/external/widget.css';
      document.head.appendChild(css);
    } else {
      // Placeholder visuel tant que le lien n'est pas configuré
      calendlyEl.style.display = 'grid';
      calendlyEl.style.placeItems = 'center';
      calendlyEl.style.padding = '40px';
      calendlyEl.style.textAlign = 'center';
      calendlyEl.style.color = '#a7adba';
      calendlyEl.innerHTML =
        '<div><strong style="color:#e7c860;font-family:Sora,sans-serif;font-size:1.1rem;">Calendly à configurer</strong><br><br>' +
        'Remplace <code>REMPLACER-TON-LIEN-CALENDLY</code> par ton vrai lien Calendly ' +
        'dans <code>index.html</code> (attribut <code>data-url</code>) pour afficher ton calendrier ici.</div>';
    }
  }

});
