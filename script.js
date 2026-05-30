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

  /* =================================================================
     STRIPE CHECKOUT (intégré via le back-end)
     -----------------------------------------------------------------
     Chaque offre est reliée à un "Price ID" Stripe (commence par price_).
     Récupère-les dans ton Dashboard Stripe → Produits, puis colle-les ici.
     Le bouton appelle le back-end (server.js) qui crée une session de
     paiement sécurisée et redirige le client vers Stripe Checkout.
     ================================================================= */
  var STRIPE_CONFIG = {
    // offre  ->  Price ID Stripe
    declic:       'REMPLACER_PRICE_ID_DECLIC',       // Déclic — 275 € / 1h
    acceleration: 'REMPLACER_PRICE_ID_ACCELERATION', // Accélération — 2 900 € / 30 jours
    businesspro:  'REMPLACER_PRICE_ID_BUSINESSPRO'   // Business Pro — 12 000 € / an
  };
  // Endpoint du back-end qui crée la session Checkout (voir server.js)
  var CHECKOUT_ENDPOINT = '/create-checkout-session';

  document.querySelectorAll('[data-checkout]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var offer = btn.getAttribute('data-checkout');
      var priceId = STRIPE_CONFIG[offer];

      if (!priceId || priceId.indexOf('REMPLACER') !== -1) {
        alert('Paiement à configurer.\n\nRenseigne le Price ID Stripe de l\'offre "' + offer +
          '" dans script.js (objet STRIPE_CONFIG), et lance le back-end (server.js).');
        return;
      }

      var original = btn.textContent;
      btn.disabled = true;
      btn.textContent = 'Redirection…';

      fetch(CHECKOUT_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId: priceId, offer: offer })
      })
        .then(function (r) { return r.json(); })
        .then(function (data) {
          if (data && data.url) {
            window.location.href = data.url; // redirection vers Stripe Checkout
          } else {
            throw new Error(data && data.error ? data.error : 'Réponse invalide du serveur');
          }
        })
        .catch(function (err) {
          alert('Le paiement n\'a pas pu démarrer.\n\n' + err.message +
            '\n\nVérifie que le back-end (server.js) tourne et que ta clé Stripe est configurée.');
          btn.disabled = false;
          btn.textContent = original;
        });
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
