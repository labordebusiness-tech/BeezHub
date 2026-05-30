# Level Up — Landing page

Landing page d'acquisition client pour **Level Up**, le programme d'accompagnement de
**Jérémie Laborde** (entrepreneuriat · investissement immobilier · mindset).

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
   - Déclic — 297 €
   - Accélération — 1 497 €
   - Liberté — 2 997 €
2. Copie chaque **Price ID** (commence par `price_…`) dans `script.js`, objet `STRIPE_CONFIG` :
   ```js
   var STRIPE_CONFIG = {
     declic:       'price_xxxxxxxxxxxx',
     acceleration: 'price_xxxxxxxxxxxx',
     liberte:      'price_xxxxxxxxxxxx'
   };
   ```
3. Mets ta **clé secrète** Stripe dans `.env` (`STRIPE_SECRET_KEY`).

> 💡 Les mentions « ou en 3× » sont indicatives. Pour le paiement en plusieurs fois,
> utilise les options de Stripe ou crée un Price d'abonnement et passe `mode` à
> `'subscription'` dans `server.js`.

### 3. Les tarifs (proposés — à ajuster librement)
| Offre | Prix | Pour qui |
|-------|------|----------|
| **Déclic** | 297 € / session | Clarifier son projet, première mise en mouvement |
| **Accélération** ⭐ | 1 497 € / programme | Passer à l'action et scaler (offre la plus choisie) |
| **Liberté** | 2 997 € / programme | Pros : développement, rentabilité, sortie d'opérationnel |

Ces prix sont un point de départ cohérent pour un accompagnement premium en France.
Tu peux les modifier dans `index.html` (section `#tarifs`) — pense à mettre à jour le
prix correspondant dans Stripe.

### 4. Ton Instagram
Dans le `footer` de `index.html`, vérifie le lien `https://instagram.com/j.where.there.wins`.

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
5. **Tarifs** — 3 offres (Déclic / Accélération / Liberté) avec paiement Stripe Checkout
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
