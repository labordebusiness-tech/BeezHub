# Level Up — Landing page

Landing page d'acquisition client pour **Level Up**, le programme d'accompagnement
en entrepreneuriat, investissement immobilier & mindset (compte&nbsp;: **@Jay.WhodaresWins**).

- **Front** : HTML / CSS / JS pur — léger, rapide, hébergeable partout.
- **Paiement** : **Stripe Checkout intégré** via un petit back-end Node/Express (`server.js`),
  volontairement minimal mais facile à faire évoluer (webhooks, base de données, emails, CRM…).
- **Prise de RDV** : widget **Calendly**.

## Démarrage rapide

```bash
# 1. Installer les dépendances
npm install

# 2. Configurer les secrets
cp .env.example .env
#   puis ouvre .env et renseigne ta STRIPE_SECRET_KEY

# 3. Lancer le serveur
npm start
#   → le site tourne sur http://localhost:4242
```

> Tu peux aussi ouvrir `index.html` directement pour voir le design sans paiement,
> mais le bouton de paiement nécessite le back-end (`npm start`).

## ✅ À personnaliser avant la mise en ligne

Tout ce qui est à remplacer contient le mot **`REMPLACER`** (Ctrl+F pour les retrouver).

### 1. Lien Calendly (prise de rendez-vous)
Dans `index.html`, section `#contact` — remplace `https://calendly.com/REMPLACER-TON-LIEN-CALENDLY`
par ton **vrai lien Calendly** (à 2 endroits : l'attribut `data-url` du widget **et** le lien de
secours juste en dessous). Tant que ce n'est pas fait, un encart "Calendly à configurer" s'affiche.

### 2. Paiement Stripe (Checkout intégré)
1. Dans ton **Dashboard Stripe → Produits**, crée 3 produits avec un prix (un *Price*) :
   - Déclic — 275 €
   - Accélération — 2 900 €
   - Business Pro — 12 000 €
2. Copie chaque **Price ID** (commence par `price_…`) dans `script.js`, objet `STRIPE_CONFIG` :
   ```js
   var STRIPE_CONFIG = {
     declic:       'price_xxxxxxxxxxxx',
     acceleration: 'price_xxxxxxxxxxxx',
     businesspro:  'price_xxxxxxxxxxxx'
   };
   ```
3. Mets ta **clé secrète** Stripe dans `.env` (`STRIPE_SECRET_KEY`).

> 💡 Business Pro est un suivi annuel : tu peux le vendre en paiement unique (mode `payment`,
> par défaut) ou en abonnement mensuel — dans ce cas crée un Price récurrent dans Stripe et
> passe `mode` à `'subscription'` dans `server.js`.

### 3. Les tarifs
| Offre | Prix | Pour qui |
|-------|------|----------|
| **Déclic** | 275 € / session 1h | Clarifier son projet, débloquer la suite |
| **Accélération** ⭐ | 2 900 € / 30 jours intensifs | Passer à l'action et scaler (offre la plus choisie) |
| **Business Pro** | 12 000 € / an | Pros : développement, rentabilité, sortie d'opérationnel |

Tu peux les modifier dans `index.html` (section `#tarifs`) — pense à mettre à jour le
prix correspondant dans Stripe.

### 4. Ton Instagram
Le compte affiché est **@Jay.WhodaresWins** (`https://instagram.com/Jay.WhodaresWins`),
présent dans le `footer` et dans la carte « Mindset » de `index.html`. Vérifie l'URL exacte.

> 🔒 Confidentialité : aucun nom réel n'apparaît sur le site. La marque mise en avant est
> **Level Up**, et la seule signature est **@Jay.WhodaresWins**.

### 5. (Optionnel) Image de partage
Ajoute `og-image.jpg` (1200×630) à la racine pour un bel aperçu lors des partages.

## Structure

```
.
├── index.html      → contenu et structure de la page
├── styles.css      → design (thème sombre & or, responsive)
├── script.js       → menu, animations, Calendly, déclenchement Stripe Checkout
├── server.js       → back-end Express + création des sessions Stripe Checkout
├── success.html    → page de confirmation après paiement
├── cancel.html     → page si le paiement est annulé
├── package.json    → dépendances Node
├── .env.example    → modèle de configuration (à copier en .env)
└── README.md
```

## Sections de la page
1. **Hero** — accroche + appels à l'action
2. **Pour qui** — 2 personas : *Débutant* et *Pro*
3. **La méthode** — 4 étapes (appel → diagnostic → action → résultats)
4. **Mindset** — développement personnel inclus
5. **Tarifs** — 3 offres (Déclic / Accélération / Business Pro) avec paiement Stripe Checkout
6. **Témoignages** — emplacements à remplir
7. **FAQ**
8. **Contact** — widget Calendly
9. **Footer** — liens + Instagram

## Mise en production
Le site ayant un back-end Node, héberge-le sur une plateforme qui exécute Node :
**Render, Railway, Fly.io, un VPS**, etc. Configure-y les variables d'environnement
(`STRIPE_SECRET_KEY`, `DOMAIN=https://ton-domaine.com`). Passe en clés Stripe `live`
le moment venu.

> Besoin d'évoluer ? On peut ajouter : webhook Stripe (accès auto au programme),
> emails de confirmation, paiement en plusieurs fois, espace membre, etc.
