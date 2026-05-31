# ✅ Mise en ligne — la checklist en 3 valeurs

La landing page **Level Up** est terminée et fonctionnelle. Pour la passer en
production, il ne reste qu'à coller **3 informations qui t'appartiennent**.
Cherche le mot `REMPLACER` (Ctrl+F) dans les fichiers indiqués.

---

## 1️⃣ Ton lien Calendly  → fichier `index.html`
Remplace `REMPLACER-TON-LIEN-CALENDLY` (2 endroits, vers la ligne 330) par
ton vrai lien, par exemple `levelup/appel-decouverte` :

```html
data-url="https://calendly.com/TON-LIEN"
...
<a href="https://calendly.com/TON-LIEN" ...>Ouvrir mon Calendly...</a>
```

## 2️⃣ Tes 3 Price IDs Stripe  → fichier `script.js`
Dans ton **Dashboard Stripe → Produits**, crée 3 produits (paiement unique) :

| Produit | Prix |
|---|---|
| Déclic | **275 €** |
| Accélération | **2 900 €** |
| Business Pro | **12 000 €** |

Copie le **Price ID** de chacun (commence par `price_…`) dans `STRIPE_CONFIG` :

```js
var STRIPE_CONFIG = {
  declic:       'price_xxxxxxxxxxxx',
  acceleration: 'price_xxxxxxxxxxxx',
  businesspro:  'price_xxxxxxxxxxxx'
};
```

> Les 3 offres sont en **paiement unique** (le mode est déjà réglé sur
> `payment` dans `server.js`). Business Pro à 12 000 € se paie donc en une fois.

## 3️⃣ Ta clé secrète Stripe  → variable d'environnement
- **En local** : `cp .env.example .env` puis renseigne `STRIPE_SECRET_KEY=sk_test_...`
- **En production** : colle-la dans les variables d'environnement de l'hébergeur
  (jamais dans le code, jamais commitée).

---

## Tester en local
```bash
npm install
cp .env.example .env      # puis colle ta clé Stripe dedans
npm start                 # → http://localhost:4242
```
Astuce : utilise d'abord une clé **test** (`sk_test_…`) et la carte de test
Stripe `4242 4242 4242 4242` (date future, CVC au hasard) pour vérifier le
paiement sans débiter de vrai argent.

## Mettre en ligne (le plus simple : Render, gratuit)
1. Pousse le dépôt sur GitHub.
2. Sur [render.com](https://render.com) → **New + → Blueprint** → sélectionne ce repo
   (il détecte `render.yaml` automatiquement).
3. Renseigne `STRIPE_SECRET_KEY` et `DOMAIN` (ex. `https://level-up.onrender.com`).
4. Déploie. Quand tout est validé, passe la clé Stripe en `sk_live_…`.

C'est en ligne ! 🚀
