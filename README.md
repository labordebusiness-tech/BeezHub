# Level Up — Landing page

Landing page d'acquisition client pour **Level Up**, le programme d'accompagnement de
**Jérémie Laborde** (entrepreneuriat · investissement immobilier · mindset).

Page en **HTML / CSS / JS pur** — aucune installation, aucun build. Il suffit d'ouvrir
`index.html` dans un navigateur, ou de l'héberger (GitHub Pages, Netlify, Vercel, OVH…).

## Aperçu en local

Ouvre simplement le fichier `index.html` dans ton navigateur.
Ou, pour un rendu identique à la prod, lance un petit serveur local :

```bash
python3 -m http.server 8080
# puis ouvre http://localhost:8080
```

## ✅ À personnaliser avant la mise en ligne

Tout ce qui est à remplacer contient le mot **`REMPLACER`** ou **`XXX`**, facile à retrouver
avec un Ctrl+F. Voici la check-list :

### 1. Lien Calendly (prise de rendez-vous)
Dans `index.html`, section `#contact` :
- Remplace `https://calendly.com/REMPLACER-TON-LIEN-CALENDLY` par ton **vrai lien Calendly**
  (à 2 endroits : l'attribut `data-url` du widget **et** le lien de secours en dessous).

Tant que le lien n'est pas mis, un encart "Calendly à configurer" s'affiche à la place.

### 2. Liens de paiement Stripe (Payment Links)
Crée tes liens sur https://dashboard.stripe.com/payment-links puis, dans `index.html`,
section `#tarifs`, remplace :
- `REMPLACER_LIEN_STRIPE_STARTER` → lien Stripe de l'offre **Starter**
- `REMPLACER_LIEN_STRIPE_ACCELERATION` → lien Stripe de l'offre **Accélération**

(L'offre **Premium** est "sur devis" et renvoie vers le formulaire de contact / Calendly.)

### 3. Les tarifs
Toujours dans `#tarifs`, remplace les montants `XXX €` et `XXXX €` par tes vrais prix.

### 4. Ton Instagram
Dans le `footer` de `index.html`, vérifie le lien :
`https://instagram.com/j.where.there.wins` — corrige le pseudo si besoin.

### 5. (Optionnel) Image de partage
Ajoute une image `og-image.jpg` (1200×630) à la racine pour un joli aperçu quand le lien
est partagé sur les réseaux. Référencée dans les balises `og:image` du `<head>`.

## Structure

```
.
├── index.html   → contenu et structure de la page
├── styles.css   → design (thème sombre & or, responsive)
├── script.js    → menu mobile, animations, Calendly, garde-fou Stripe
└── README.md    → ce fichier
```

## Sections de la page
1. **Hero** — accroche + appels à l'action
2. **Pour qui** — 2 personas : *Débutant* et *Pro*
3. **La méthode** — 4 étapes (appel → diagnostic → action → résultats)
4. **Mindset** — développement personnel inclus
5. **Tarifs** — 3 offres (Starter / Accélération / Premium) avec paiement Stripe
6. **Témoignages** — emplacements à remplir
7. **FAQ**
8. **Contact** — widget Calendly
9. **Footer** — liens + Instagram

## Mettre en ligne gratuitement (GitHub Pages)
1. Pousse ce dépôt sur GitHub.
2. Repo → *Settings* → *Pages* → Source : branche `main` (ou ta branche) / dossier `/root`.
3. Ton site est en ligne quelques minutes plus tard à l'URL indiquée.
