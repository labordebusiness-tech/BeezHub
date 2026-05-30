/* ====================================================================
   LEVEL UP — Back-end minimal pour Stripe Checkout intégré
   --------------------------------------------------------------------
   Sert la landing page (fichiers statiques) ET crée les sessions de
   paiement Stripe Checkout. Léger volontairement : facile à faire
   évoluer (ajout d'un webhook, d'une base de données, d'emails, etc.).

   Lancement :
     1. npm install
     2. copie .env.example en .env et renseigne STRIPE_SECRET_KEY
     3. npm start   →  http://localhost:4242
   ==================================================================== */

require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 4242;

// Domaine public du site (pour les URLs de retour Stripe)
const DOMAIN = process.env.DOMAIN || `http://localhost:${PORT}`;

// Clé secrète Stripe (jamais exposée côté client)
const stripeKey = process.env.STRIPE_SECRET_KEY;
if (!stripeKey) {
  console.warn(
    '\n⚠️  STRIPE_SECRET_KEY manquante. Copie .env.example en .env et renseigne ta clé Stripe.\n' +
    '   Le site se charge quand même, mais le paiement renverra une erreur.\n'
  );
}
const stripe = stripeKey ? require('stripe')(stripeKey) : null;

app.use(express.json());
// Sert index.html, styles.css, script.js, etc.
app.use(express.static(__dirname));

/* ---- Création d'une session Stripe Checkout ---- */
app.post('/create-checkout-session', async (req, res) => {
  try {
    if (!stripe) {
      return res.status(500).json({ error: 'Stripe non configuré sur le serveur (STRIPE_SECRET_KEY).' });
    }

    const { priceId } = req.body || {};
    if (!priceId || typeof priceId !== 'string' || priceId.indexOf('price_') !== 0) {
      return res.status(400).json({ error: 'Price ID Stripe invalide ou manquant.' });
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'payment', // paiement unique ; passe à 'subscription' pour un abonnement
      line_items: [{ price: priceId, quantity: 1 }],
      locale: 'fr',
      billing_address_collection: 'auto',
      success_url: `${DOMAIN}/success.html?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${DOMAIN}/cancel.html`
    });

    res.json({ id: session.id, url: session.url });
  } catch (err) {
    console.error('Erreur Stripe Checkout :', err.message);
    res.status(500).json({ error: err.message });
  }
});

/* ---- (Optionnel, à activer plus tard) Webhook Stripe ----
   Permet de réagir aux paiements confirmés (envoi d'email, accès au
   programme, CRM…). Nécessite STRIPE_WEBHOOK_SECRET et un body brut.

app.post('/webhook', express.raw({ type: 'application/json' }), (req, res) => {
  const sig = req.headers['stripe-signature'];
  try {
    const event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    if (event.type === 'checkout.session.completed') {
      // TODO : traiter la commande payée
    }
    res.json({ received: true });
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`);
  }
});
*/

app.listen(PORT, () => {
  console.log(`\n✅ Level Up en ligne sur ${DOMAIN}\n`);
});
