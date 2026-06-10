# AGENT.md

## 1. Rôle de Codex

Codex doit agir comme un développeur senior spécialisé en application de borne tactile pour la restauration rapide.

Son rôle est de développer une application de borne de commande tactile pour Pizza de Nuit, en respectant strictement :

- le contexte projet ;
- l’identité Pizza de Nuit ;
- le site officiel Pizza de Nuit ;
- le parcours à emporter ;
- l’impression du ticket ;
- le paiement au comptoir ;
- un backend minimal, simple et évolutif ;
- la simplicité d’usage sur écran tactile ;
- une architecture propre, maintenable et évolutive.

Codex ne doit pas créer une application générique de pizzeria.

Codex doit construire une borne adaptée à Pizza de Nuit.

---

## 2. Sources de vérité du projet

Avant toute modification, Codex doit respecter en priorité :

1. `PROJECT_CONTEXT.md`
2. `AGENT.md`
3. le site officiel Pizza de Nuit : https://pizza-de-nuit.vercel.app/
4. les documents UX du projet ;
5. les documents design du projet ;
6. les documents techniques du projet ;
7. les fichiers existants du code.

En cas de contradiction, Codex doit suivre cet ordre :

1. `PROJECT_CONTEXT.md`
2. `AGENT.md`
3. demande explicite de l’utilisateur ;
4. site officiel Pizza de Nuit ;
5. code existant ;
6. bonnes pratiques techniques.

Codex doit signaler toute contradiction au lieu d’inventer une solution.

---

## 3. Règle de recherche d’informations Pizza de Nuit

Quand Codex a besoin d’une information liée à Pizza de Nuit, il doit consulter en priorité le site officiel :

https://pizza-de-nuit.vercel.app/

Ce site doit être utilisé pour comprendre ou vérifier :

- l’identité visuelle ;
- l’univers de marque ;
- le ton commercial ;
- les formulations ;
- l’ambiance ;
- les offres visibles ;
- les pizzas présentées ;
- les éléments de menu ;
- les références visuelles ;
- les informations publiques disponibles.

Le site doit être considéré comme la source principale pour comprendre l’essence de Pizza de Nuit.

Codex doit s’en servir pour rester fidèle à :

- l’identité nocturne ;
- l’univers street-food ;
- le style snack/pizzeria moderne ;
- le ton direct et commercial ;
- la présentation des pizzas ;
- les informations visibles sur la marque.

Si une information n’est pas disponible dans `PROJECT_CONTEXT.md` ou sur le site officiel Pizza de Nuit, Codex doit la signaler comme information manquante au lieu de l’inventer.

---

## 4. Résumé du projet

Le projet est une application web tactile de type borne de commande pour Pizza de Nuit.

La borne permet au client de :

1. composer sa commande ;
2. valider sa commande ;
3. imprimer un ticket récapitulatif ;
4. présenter le ticket au comptoir ;
5. régler auprès du personnel ;
6. récupérer sa commande à emporter.

La borne ne doit pas gérer l’encaissement.

La borne ne remplace pas la caisse.

La borne sert à fluidifier la prise de commande.

Le paiement se fait toujours au comptoir.

---

## 5. Fonctionnement obligatoire de la borne

Le fonctionnement central est :

Commande sur borne  
→ Validation  
→ Impression du ticket  
→ Présentation du ticket au comptoir  
→ Paiement au comptoir  
→ Préparation de la commande à emporter

Règles obligatoires :

- la commande est toujours à emporter ;
- le client ne paie jamais sur la borne ;
- le paiement se fait toujours au comptoir ;
- la borne imprime un ticket ;
- le ticket sert de support pour l’encaissement ;
- la borne revient à l’accueil après validation ;
- aucune donnée du client précédent ne doit rester visible.

---

## 6. Règle technique majeure : backend minimal autorisé

Le projet peut contenir un backend minimal, simple et propre, uniquement pour préparer l’évolution future de l’application.

Le backend doit rester secondaire par rapport à l’interface borne.

Il ne doit jamais rendre le projet complexe inutilement.

Le cœur du projet reste :

- une borne tactile rapide ;
- une commande à emporter ;
- un ticket imprimé ;
- un paiement au comptoir ;
- une interface simple pour le client ;
- une logique claire pour le personnel.

Le backend est autorisé uniquement pour gérer quelques fonctions essentielles.

---

## 7. Backend autorisé

Codex peut créer un petit backend pour :

### 1. Enregistrer les commandes

Le backend peut servir à :

- sauvegarder les commandes validées ;
- conserver un historique simple ;
- permettre une consultation future côté admin ;
- associer un numéro de commande ;
- suivre le statut de base d’une commande.

### 2. Gérer la configuration du menu

Le backend peut servir à gérer :

- produits ;
- catégories ;
- formats ;
- prix ;
- suppléments ;
- disponibilités.

Cette gestion doit rester simple.

Codex ne doit pas créer un back-office lourd si ce n’est pas demandé.

### 3. Gérer les tickets

Le backend peut servir à :

- générer les données du ticket ;
- conserver le nombre d’impressions ;
- permettre une réimpression depuis l’admin ;
- retrouver une commande imprimée.

### 4. Préparer l’évolution future

Le backend peut préparer plus tard :

- statistiques simples ;
- gestion multi-borne ;
- synchronisation future ;
- écran cuisine ;
- connexion caisse si demandée plus tard.

Ces évolutions ne doivent pas être développées sans demande explicite.

---

## 8. Backend interdit

Même avec un backend minimal, Codex ne doit pas ajouter sans demande explicite :

- paiement en ligne ;
- paiement Stripe ;
- terminal de paiement intégré ;
- livraison ;
- consommation sur place ;
- réservation ;
- compte client obligatoire ;
- programme fidélité complexe ;
- système de caisse complet ;
- synchronisation externe complexe ;
- dashboard avancé ;
- gestion multi-restaurant complexe ;
- service cloud obligatoire ;
- données bancaires ;
- tunnel d’encaissement.

Le backend ne doit jamais transformer la borne en logiciel de caisse complet.

---

## 9. Stack technique recommandée

Sauf instruction contraire, utiliser :

- Next.js ;
- React ;
- TypeScript ;
- Tailwind CSS ;
- Next.js Route Handlers ou API Routes pour le backend minimal ;
- logique serveur minimale ;
- composants réutilisables ;
- logique métier centralisée ;
- données structurées ;
- impression navigateur ou intégration imprimante locale à définir.

Base de données recommandée si nécessaire :

- SQLite pour un fonctionnement local simple ;
- ou un stockage simple équivalent si le contexte technique l’impose.

Codex ne doit pas installer une stack lourde sans nécessité.

Codex ne doit pas imposer une technologie externe non demandée.

Codex ne doit pas utiliser Supabase, Firebase, Prisma, PostgreSQL, MySQL ou MongoDB sans demande explicite.

---

## 10. API minimale recommandée

Le backend peut exposer uniquement quelques routes essentielles :

GET    /api/menu  
GET    /api/settings  
POST   /api/orders  
GET    /api/orders  
GET    /api/orders/:id  
POST   /api/orders/:id/reprint  
GET    /api/health

Ces routes doivent rester simples.

Elles doivent servir uniquement à :

- charger le menu ;
- charger les réglages ;
- créer une commande ;
- consulter les commandes ;
- préparer la réimpression d’un ticket ;
- vérifier que le système fonctionne.

Aucune route de paiement ne doit être créée.

Aucune route de livraison ne doit être créée.

Aucune route de réservation ne doit être créée.

---

## 11. Règles importantes du backend

Le backend doit respecter ces règles :

- ne jamais gérer le paiement ;
- ne jamais stocker de données bancaires ;
- ne jamais imposer de compte client ;
- ne jamais créer un tunnel de livraison ;
- ne jamais créer un mode sur place ;
- ne jamais inventer des produits ;
- ne jamais inventer des prix ;
- utiliser le site officiel Pizza de Nuit comme référence si une information manque ;
- garder les données simples et modifiables ;
- garder la logique métier lisible ;
- séparer clairement frontend, backend, types et données.

Le backend existe uniquement pour soutenir l’application, pas pour la complexifier.

---

## 12. Identité Pizza de Nuit à respecter

Pizza de Nuit doit être traitée comme une marque :

- nocturne ;
- urbaine ;
- street-food ;
- rapide ;
- commerciale ;
- généreuse ;
- directe ;
- orientée snack ;
- orientée commande à emporter.

L’application doit transmettre :

- une ambiance de nuit ;
- une énergie fast-food moderne ;
- une lecture rapide des produits ;
- une forte mise en avant des pizzas ;
- des prix lisibles ;
- un parcours court ;
- une interface tactile efficace ;
- une expérience simple, commerciale et adaptée à la vente à emporter.

À éviter :

- ambiance gastronomique ;
- pizzeria italienne traditionnelle ;
- design froid ;
- interface 100 % sombre ;
- interface 100 % blanche ;
- tunnel de commande complexe ;
- textes longs ;
- fonctionnalités non demandées.

---

## 13. Interdictions strictes

Codex ne doit jamais ajouter sans demande explicite :

- paiement en ligne ;
- Stripe ;
- terminal de paiement intégré ;
- livraison ;
- consommation sur place ;
- réservation ;
- création de compte client obligatoire ;
- programme fidélité ;
- géolocalisation ;
- suivi livraison ;
- commande à table ;
- QR code de table ;
- système de caisse complet ;
- application mobile ;
- espace client ;
- horaires inventés ;
- adresse inventée ;
- prix inventés ;
- produits inventés ;
- offres inventées.

Codex ne doit jamais utiliser comme action finale :

- `Payer`
- `Payer maintenant`
- `Procéder au paiement`

L’action finale obligatoire est :

`Valider et imprimer le ticket`

Le message final obligatoire est :

`Présentez votre ticket au comptoir pour régler votre commande.`

---

## 14. Architecture obligatoire

Codex doit respecter les principes suivants :

- ne pas coder les produits directement dans les composants UI ;
- ne pas coder les prix directement dans les composants UI ;
- ne pas figer les formats dans l’interface ;
- centraliser la logique panier ;
- centraliser la logique de calcul des prix ;
- centraliser les règles de commande ;
- séparer les composants visuels de la logique métier ;
- séparer les données de l’interface ;
- séparer clairement frontend et backend minimal ;
- rendre les produits facilement modifiables ;
- rendre les prix facilement modifiables ;
- rendre les formats facilement modifiables ;
- rendre les suppléments facilement modifiables ;
- prévoir une structure compatible avec l’impression ticket ;
- garder un code typé, lisible et maintenable.

---

## 15. Structure de projet recommandée

Structure indicative :

/src
  /app
    /(kiosk)
      page.tsx

    /admin
      page.tsx

    /api
      /menu
        route.ts
      /settings
        route.ts
      /orders
        route.ts
      /orders/[id]
        route.ts
      /orders/[id]/reprint
        route.ts
      /health
        route.ts

  /components
    /ui
    /kiosk
    /admin
    /products
    /cart
    /ticket

  /features
    /products
    /categories
    /formats
    /supplements
    /cart
    /orders
    /ticket
    /admin

  /lib
    /pricing
    /cart
    /orders
    /ticket
    /printing
    /storage
    /server
    /utils

  /types
    product.ts
    category.ts
    format.ts
    supplement.ts
    cart.ts
    order.ts
    ticket.ts
    settings.ts

  /config
    app.config.ts
    kiosk.config.ts
    pricing.config.ts
    ticket.config.ts

  /data
    products.ts
    categories.ts
    formats.ts
    supplements.ts
    settings.ts

  /server
    db.ts
    orders.repository.ts
    menu.repository.ts
    settings.repository.ts

Cette structure peut être adaptée selon le projet existant, mais Codex doit conserver :

- séparation UI / logique métier ;
- séparation frontend / backend minimal ;
- centralisation des types ;
- centralisation des règles de prix ;
- centralisation du panier ;
- données structurées ;
- backend simple et limité.

---

## 16. Modules principaux à prévoir

L’application doit être structurée autour des modules suivants :

- `products`
- `categories`
- `formats`
- `supplements`
- `cart`
- `orders`
- `ticket`
- `printing`
- `admin`
- `settings`
- `storage`
- `server`
- `ui`
- `theme`

Chaque module doit avoir une responsabilité claire.

Codex doit éviter les fichiers fourre-tout.

---

## 17. Données du menu

Les produits, prix, formats, catégories et suppléments doivent être stockés de manière structurée.

Au démarrage, les données peuvent être définies dans :

- `src/data/products.ts`
- `src/data/categories.ts`
- `src/data/formats.ts`
- `src/data/supplements.ts`
- `src/data/settings.ts`

Si le backend minimal est utilisé, ces données peuvent ensuite être chargées via :

- `GET /api/menu`
- `GET /api/settings`

Les données doivent être typées.

Les données ne doivent pas être dispersées dans les composants.

Les prix et formats doivent pouvoir être modifiés facilement sans toucher à l’interface.

Avant de créer ou modifier une donnée liée à Pizza de Nuit, Codex doit vérifier si l’information existe sur le site officiel :

https://pizza-de-nuit.vercel.app/

Codex ne doit jamais inventer une carte, un prix, un produit ou une offre.

---

## 18. Stockage et persistance

Le projet peut utiliser une persistance simple pour :

- commandes validées ;
- historique local simple ;
- tickets imprimés ;
- nombre de réimpressions ;
- configuration simple du menu ;
- réglages de la borne.

Solutions acceptables :

- SQLite si le projet tourne localement ;
- fichier local structuré si adapté ;
- stockage simple côté serveur Next.js si le contexte le permet ;
- `localStorage` uniquement pour les éléments temporaires côté client.

Codex doit éviter toute solution lourde.

Codex doit garder la persistance facile à comprendre et facile à remplacer.

---

## 19. Administration simple

L’interface admin doit rester simple.

Elle peut permettre :

- visualiser les produits ;
- visualiser les formats ;
- visualiser les suppléments ;
- consulter les commandes ;
- consulter le détail d’une commande ;
- réimprimer un ticket ;
- changer un statut simple ;
- gérer la disponibilité d’un produit si prévu ;
- modifier certains réglages simples si prévu.

L’admin ne doit pas devenir un logiciel de caisse complet.

Codex ne doit pas créer :

- gestion multi-utilisateur complexe ;
- rôles avancés ;
- statistiques avancées ;
- comptabilité ;
- gestion de TVA complexe ;
- gestion de livraison ;
- gestion de paiement ;
- dashboard lourd.

---

## 20. Règles UX pour borne tactile

L’interface doit être pensée pour un écran tactile public.

Règles obligatoires :

- boutons larges ;
- zones tactiles confortables ;
- navigation simple ;
- une action principale par écran ;
- retour arrière visible ;
- panier toujours accessible ;
- total toujours clair ;
- textes courts ;
- contraste fort ;
- aucun formulaire long ;
- aucun clavier sauf nécessité absolue ;
- pas d’interaction complexe ;
- confirmation claire ;
- retour automatique à l’accueil après commande.

L’utilisateur doit comprendre immédiatement :

- qu’il commande à emporter ;
- qu’il ne paie pas sur la borne ;
- qu’il doit présenter le ticket au comptoir.

---

## 21. Règles UI et design

L’interface doit respecter l’univers réel de Pizza de Nuit sans le réduire à un simple dark mode.

Pizza de Nuit doit être traduit visuellement comme une marque :

- nocturne ;
- street-food ;
- urbaine ;
- commerciale ;
- énergique ;
- généreuse ;
- lisible ;
- directe ;
- moderne ;
- orientée commande rapide.

L’identité visuelle de l’application doit reprendre une logique hybride :

- sections sombres pour l’impact, l’ambiance nocturne, l’accueil, les zones hero et les moments forts ;
- sections blanches ou très claires pour la lisibilité, les produits, les cartes, les listes, les informations et les zones de choix ;
- contrastes forts entre noir, blanc, jaune, rouge et visuels pizza ;
- alternance claire / sombre pour éviter une interface lourde ou monotone ;
- rendu snack moderne, pas restaurant gastronomique.

La borne ne doit pas utiliser un fond noir partout.

Le noir ou le très sombre doit servir à créer :

- l’ambiance de nuit ;
- l’impact visuel ;
- les zones fortes ;
- les bandeaux importants ;
- les appels à l’action prioritaires.

Le blanc ou les fonds clairs doivent servir à améliorer :

- la lisibilité ;
- les cartes produits ;
- les choix de formats ;
- les listes d’ingrédients ;
- les écrans panier ;
- les récapitulatifs ;
- les zones de validation ;
- les informations pratiques.

Palette recommandée :

- noir / anthracite : ambiance nuit, sections fortes, header, hero, footer ;
- blanc / blanc cassé : lisibilité, cartes, zones de contenu, panneaux de commande ;
- jaune / doré : énergie, prix, CTA secondaires, accents marque ;
- rouge : promotions, urgence commerciale, badges, éléments appétissants ;
- gris clair : séparateurs, fonds neutres, zones secondaires.

Les produits doivent être affichés dans des cartes très lisibles :

- fond blanc ou clair possible ;
- image pizza bien visible ;
- nom court ;
- ingrédients principaux ;
- format ou prix de départ ;
- badge commercial si utile ;
- bouton tactile large.

À privilégier :

- alternance visuelle entre sombre et clair ;
- gros titres ;
- prix très lisibles ;
- boutons francs ;
- contrastes forts ;
- hiérarchie immédiate ;
- photos pizza généreuses ;
- cards produits très propres ;
- interface tactile moderne ;
- style snack nocturne mais lisible ;
- design commercial proche d’un fast-food moderne.

À éviter :

- interface entièrement noire ;
- interface entièrement blanche ;
- design italien rustique ;
- ambiance gastronomique ;
- design froid ou institutionnel ;
- minimalisme trop vide ;
- textes longs ;
- boutons petits ;
- cartes produits trop sombres et peu lisibles ;
- animations lentes ;
- effets décoratifs inutiles.

Règle principale :

Codex doit s’inspirer du site Pizza de Nuit pour construire une interface de borne qui mélange l’impact nocturne avec la clarté commerciale.

L’application doit être sombre quand il faut créer l’ambiance, claire quand il faut faciliter la commande.

---

## 22. Parcours client obligatoire

Le parcours client doit suivre cette logique :

1. Écran d’accueil
2. Bouton `Commander à emporter`
3. Sélection de catégorie
4. Liste des produits
5. Détail produit
6. Choix du format
7. Choix des options ou suppléments
8. Ajout au panier
9. Consultation du panier
10. Validation finale
11. Impression ticket
12. Message de paiement au comptoir
13. Retour automatique à l’accueil

Aucun écran ne doit proposer :

- livraison ;
- sur place ;
- réservation ;
- paiement en ligne ;
- création de compte client.

---

## 23. Écran d’accueil

L’écran d’accueil doit contenir :

- logo Pizza de Nuit ;
- phrase courte orientée commande à emporter ;
- bouton principal : `Commander à emporter` ;
- mention visible : `Paiement au comptoir après impression du ticket`.

L’écran d’accueil ne doit pas contenir :

- bouton livraison ;
- bouton sur place ;
- bouton réservation ;
- bouton connexion client ;
- bouton paiement.

L’écran d’accueil peut utiliser une dominante sombre ou nocturne, car il doit poser l’univers de marque.

Les écrans de sélection, panier et validation peuvent utiliser davantage de fonds blancs ou clairs pour améliorer la lisibilité.

---

## 24. Règles catalogue produit

Chaque produit doit être structuré avec :

- identifiant ;
- nom ;
- slug ;
- description ;
- catégorie ;
- image ;
- base ;
- ingrédients ;
- allergènes si disponibles ;
- formats disponibles ;
- prix par format ;
- options disponibles ;
- suppléments compatibles ;
- disponibilité ;
- ordre d’affichage ;
- badge marketing éventuel.

Les produits exacts doivent venir d’une source validée.

Codex ne doit pas inventer la carte.

Avant de signaler une information produit comme manquante, Codex doit vérifier si elle est disponible sur le site officiel Pizza de Nuit :

https://pizza-de-nuit.vercel.app/

---

## 25. Règles formats pizza

Les formats à prévoir dans la structure sont :

- 31 cm ;
- 40 cm ;
- 1/2 mètre ;
- 60 cm.

Les prix doivent rester configurables.

Prix projet initiaux si confirmés :

- 31 cm : 10 € ;
- 40 cm : 15 € ;
- 1/2 mètre : 20 € ;
- 60 cm : 30 €.

Ces prix ne doivent jamais être codés en dur dans les composants.

Les grands formats doivent pouvoir être valorisés visuellement avec des badges :

- `Format géant`
- `À partager`

---

## 26. Règles pizza moitié-moitié

La pizza moitié-moitié doit être prévue dans l’architecture si confirmée.

Règles à prévoir :

- disponible uniquement sur certains formats ;
- choix de deux pizzas différentes ;
- base identique si cette règle est confirmée ;
- prix calculé selon une règle configurable ;
- affichage clair dans le panier ;
- affichage clair sur le ticket.

Le panier doit afficher :

- format ;
- moitié 1 ;
- moitié 2 ;
- base ;
- suppléments ;
- total.

Codex ne doit pas figer les règles moitié-moitié dans l’UI.

---

## 27. Règles suppléments et options

Les suppléments doivent être configurables.

Exemples de suppléments à prévoir dans la structure :

- cheesy crust ;
- ingrédient supplémentaire ;
- fromage supplémentaire ;
- sauce ;
- option épicée.

Chaque supplément doit contenir :

- nom ;
- prix ;
- disponibilité ;
- compatibilité produit ;
- compatibilité format ;
- quantité maximale si nécessaire.

Un supplément ne doit pas être disponible partout par défaut.

Sa compatibilité doit être contrôlée par les données.

---

## 28. Règles panier

Le panier doit afficher :

- produit ;
- format ;
- base ;
- options ;
- suppléments ;
- quantité ;
- prix unitaire ;
- total par ligne ;
- total général.

Le panier doit permettre :

- modifier un produit ;
- supprimer un produit ;
- modifier la quantité ;
- revenir au menu ;
- valider la commande.

Le panier doit rappeler clairement :

`Paiement au comptoir après impression du ticket.`

La logique panier doit être centralisée.

Les calculs ne doivent pas être dispersés dans les composants.

---

## 29. Règles commande

Chaque commande doit contenir :

- identifiant unique ;
- numéro de commande visible ;
- date et heure ;
- type : `à emporter` ;
- lignes de commande ;
- total ;
- statut de commande ;
- statut d’impression ;
- statut paiement : `à régler au comptoir` ;
- nombre d’impressions ticket.

Statuts recommandés :

- `created`
- `ticket_printed`
- `awaiting_counter_payment`
- `paid_at_counter`
- `in_preparation`
- `ready`
- `handed_to_customer`
- `cancelled`

Ces statuts doivent rester simples.

---

## 30. Règles ticket

Le ticket doit être clair pour :

- le client ;
- le personnel au comptoir ;
- la préparation.

Le ticket doit contenir :

- nom Pizza de Nuit ;
- numéro de commande ;
- date et heure ;
- mention `Commande à emporter` ;
- détail des produits ;
- formats ;
- quantités ;
- options ;
- suppléments ;
- total ;
- mention `Paiement au comptoir` ;
- message client.

Message client recommandé :

`Présentez ce ticket au comptoir pour régler votre commande.`

Le ticket doit pouvoir être réimprimé depuis l’administration si la commande est enregistrée.

---

## 31. Impression ticket

Codex doit prévoir une impression simple et fiable.

Solutions possibles selon le matériel :

- impression navigateur ;
- fenêtre d’impression dédiée ;
- CSS print ;
- intégration imprimante locale si confirmée ;
- solution technique spécifique uniquement après validation.

Codex ne doit pas inventer le modèle d’imprimante.

Codex ne doit pas créer de service d’impression complexe sans demande explicite.

Le système doit rester compatible avec une impression locale depuis la borne.

---

## 32. Règles sécurité

Codex doit prévoir :

- aucune donnée bancaire ;
- aucune donnée de paiement ;
- aucune donnée personnelle obligatoire ;
- routes backend minimales ;
- validation simple des données envoyées au backend ;
- protection basique de l’admin si nécessaire ;
- séparation claire entre interface client et interface admin ;
- variables d’environnement uniquement si nécessaire.

Codex ne doit pas faire croire à une sécurité avancée si elle n’existe pas.

Codex doit éviter toute complexité inutile.

---

## 33. Règles performance

L’application doit être rapide et fluide.

Codex doit privilégier :

- chargement rapide ;
- images optimisées ;
- composants légers ;
- animations courtes ;
- transitions utiles ;
- absence d’effets bloquants ;
- API minimale et rapide ;
- interface utilisable par un client pressé.

La borne doit répondre immédiatement aux actions tactiles.

---

## 34. Règles de maintenabilité

Codex doit produire un code :

- lisible ;
- typé ;
- modulaire ;
- documenté quand nécessaire ;
- sans duplication inutile ;
- sans logique cachée ;
- facile à modifier ;
- facile à tester.

Avant de créer un fichier, Codex doit vérifier qu’un fichier équivalent n’existe pas déjà.

Avant de créer un composant, Codex doit vérifier qu’un composant existant peut être réutilisé.

Avant de créer une route API, Codex doit vérifier qu’elle est réellement nécessaire.

---

## 35. Checklist avant chaque modification

Avant chaque modification, Codex doit vérifier :

- le changement respecte `PROJECT_CONTEXT.md` ;
- le changement respecte `AGENT.md` ;
- si besoin d’informations Pizza de Nuit, le site officiel a été consulté ;
- la direction visuelle respecte l’alternance sombre / clair du site Pizza de Nuit ;
- aucune fonctionnalité interdite n’est ajoutée ;
- aucune logique de paiement n’est ajoutée ;
- aucune logique de livraison n’est ajoutée ;
- aucune logique de sur place n’est ajoutée ;
- le backend reste minimal ;
- les routes API sont réellement nécessaires ;
- la borne reste orientée à emporter ;
- les prix ne sont pas codés en dur dans l’UI ;
- les produits ne sont pas codés en dur dans l’UI ;
- la logique métier reste séparée des composants ;
- les composants existants ont été vérifiés ;
- l’impact sur le panier est maîtrisé ;
- l’impact sur le ticket est maîtrisé ;
- l’impact sur le backend minimal est maîtrisé.

---

## 36. Checklist après chaque modification

Après chaque modification, Codex doit vérifier :

- le projet compile ;
- TypeScript ne remonte pas d’erreur ;
- l’interface reste utilisable au tactile ;
- le parcours client reste clair ;
- le panier fonctionne ;
- le total est correct ;
- le message paiement au comptoir reste visible ;
- le bouton final reste `Valider et imprimer le ticket` ;
- aucun bouton `Payer` n’a été ajouté ;
- aucune logique de paiement n’a été ajoutée ;
- aucune logique de livraison n’a été ajoutée ;
- aucune logique de sur place n’a été ajoutée ;
- aucune API inutile n’a été ajoutée ;
- aucun doublon de composant n’a été créé ;
- aucune donnée critique n’a été figée dans l’UI ;
- le code reste lisible et maintenable.

---

## 37. Priorités de développement

### Priorité 1 — Socle projet

- structure projet ;
- types TypeScript ;
- thème visuel ;
- composants UI de base ;
- structure des données ;
- configuration simple.

### Priorité 2 — Socle métier

- modèles produits ;
- modèles catégories ;
- modèles formats ;
- modèles suppléments ;
- logique prix ;
- logique panier ;
- modèle commande.

### Priorité 3 — Backend minimal

- route `GET /api/menu` ;
- route `GET /api/settings` ;
- route `POST /api/orders` ;
- route `GET /api/orders` ;
- route `GET /api/health` ;
- persistance simple des commandes si nécessaire.

### Priorité 4 — Parcours client tactile

- écran accueil ;
- catégories ;
- liste produits ;
- détail produit ;
- choix format ;
- options ;
- panier ;
- validation.

### Priorité 5 — Ticket

- génération ticket ;
- contenu ticket ;
- numéro de commande ;
- message paiement comptoir ;
- impression locale ;
- réimpression depuis admin si prévue.

### Priorité 6 — Admin simple

- visualisation produits ;
- visualisation formats ;
- visualisation suppléments ;
- consultation commandes ;
- détail commande ;
- réimpression ticket ;
- réglages simples.

### Priorité 7 — Finitions borne

- retour automatique accueil ;
- timeout inactivité ;
- mode plein écran ;
- états d’erreur ;
- optimisation tactile ;
- design final Pizza de Nuit.

---

## 38. Informations à confirmer avant d’inventer

Codex doit vérifier en priorité le site officiel Pizza de Nuit avant de signaler une information comme manquante :

https://pizza-de-nuit.vercel.app/

Si l’information n’est pas disponible dans `PROJECT_CONTEXT.md` ou sur le site officiel, Codex doit la signaler comme manquante au lieu de l’inventer.

Informations à confirmer avant toute invention :

- adresse exacte ;
- horaires réels ;
- numéro de téléphone ;
- logo final ;
- photos officielles ;
- carte officielle ;
- liste exacte des pizzas ;
- ingrédients exacts ;
- allergènes ;
- boissons ;
- desserts ;
- accompagnements ;
- prix officiels ;
- disponibilité du moitié-moitié ;
- règle de calcul moitié-moitié ;
- prix des suppléments ;
- modèle d’imprimante ;
- format du ticket ;
- besoin d’un ticket cuisine ;
- format écran de la borne ;
- type d’impression locale ;
- niveau réel souhaité pour l’admin ;
- méthode de stockage souhaitée ;
- choix définitif de la base de données ;
- environnement réel de déploiement.

---

## 39. Règle finale

Codex doit toujours privilégier :

- simplicité ;
- rapidité ;
- lisibilité ;
- robustesse ;
- cohérence ;
- maintenabilité ;
- fidélité à Pizza de Nuit ;
- backend minimal ;
- évolutivité sans complexité.

L’objectif n’est pas de créer une application complexe.

L’objectif est de créer une borne tactile claire, rapide et fiable pour commander à emporter chez Pizza de Nuit, avec un petit backend utile pour enregistrer les commandes, gérer les données essentielles et préparer les futures améliorations.

Rappel absolu :

Le client commande sur la borne.  
La borne imprime un ticket.  
Le client présente le ticket au comptoir.  
Le paiement se fait au comptoir.  
La commande est préparée à emporter.  
Le backend reste simple, minimal et évolutif.