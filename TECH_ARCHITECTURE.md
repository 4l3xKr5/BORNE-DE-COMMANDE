# TECH_ARCHITECTURE.md

## 1. Objectif du document

Ce document définit l’architecture technique complète de l’application de borne de commande tactile Pizza de Nuit.

Il sert de référence à Codex pour développer une application :

- propre ;
- simple ;
- maintenable ;
- évolutive ;
- typée ;
- adaptée à une borne tactile publique ;
- pensée pour un écran vertical 9:16 de 27 pouces ;
- centrée sur la commande à emporter ;
- centrée sur l’impression du ticket ;
- sans paiement sur borne ;
- sans livraison ;
- sans consommation sur place ;
- sans système de caisse complet.

Ce document ne doit pas être interprété comme une demande de développement immédiat de toutes les fonctionnalités.

Il définit la structure technique à respecter pour construire progressivement le projet.

---

## 2. Sources de vérité

Codex doit respecter les documents suivants dans cet ordre :

1. Dernière demande explicite de l’utilisateur
2. `PROJECT_CONTEXT.md`
3. `AGENT.md`
4. `CAHIER_DES_CHARGES.md`
5. `USER_FLOW.md`
6. `ORDER_RULES.md`
7. `DESIGN_GUIDELINES.md`
8. `TECH_ARCHITECTURE.md`
9. `DATABASE_SCHEMA.md`
10. Site Pizza de Nuit pour l’identité visuelle et les informations publiques
11. Code existant
12. Bonnes pratiques techniques

En cas de contradiction, Codex doit suivre l’ordre de priorité ci-dessus.

Codex ne doit pas inventer une règle, un produit, un prix, une offre, une fonctionnalité ou une donnée absente des documents de référence.

Le site Pizza de Nuit sert à comprendre l’identité visuelle, l’univers, le ton, l’ambiance et les informations publiques visibles.

Il ne doit jamais écraser :

- les règles métier confirmées ;
- le fonctionnement à emporter ;
- l’absence de paiement sur borne ;
- l’impression du ticket ;
- le paiement au comptoir ;
- les consignes présentes dans les documents du projet.

Si une information manque, Codex doit l’indiquer clairement :

Information à confirmer.

---

## 3. Résumé technique du projet

Le projet est une application web tactile de type kiosk ordering app pour Pizza de Nuit.

Le fonctionnement réel est :

1. le client compose sa commande sur la borne ;
2. il valide sa commande ;
3. la borne imprime un ticket récapitulatif ;
4. le client présente le ticket au comptoir ;
5. le personnel encaisse au comptoir ;
6. la commande est préparée à emporter.

La borne ne doit jamais gérer l’encaissement.

La borne ne doit jamais proposer :

- paiement sur borne ;
- paiement en ligne ;
- Stripe ;
- terminal de paiement intégré ;
- livraison ;
- consommation sur place ;
- réservation ;
- compte client obligatoire ;
- logiciel de caisse complet.

L’application doit comprendre :

- une interface client tactile ;
- un panier ;
- une logique de commande ;
- une logique de calcul des prix ;
- une génération de ticket ;
- une impression ticket ;
- un backend minimal ;
- une interface admin simple ;
- une structure prête à évoluer.

---

## 4. Contraintes principales du projet

### 4.1 Contrainte métier centrale

La borne sert uniquement à préparer une commande à emporter.

Le paiement est toujours effectué au comptoir.

La borne doit donc utiliser les formulations suivantes :

- Commander à emporter
- Ajouter au panier
- Valider ma commande
- Valider et imprimer le ticket
- Présentez votre ticket au comptoir pour régler votre commande.

Elle ne doit jamais utiliser comme action finale :

- Payer
- Payer maintenant
- Procéder au paiement
- Régler sur la borne

---

### 4.2 Contrainte écran

L’application doit être conçue pour :

- une tablette / borne tactile de 27 pouces ;
- une orientation verticale ;
- un ratio 9:16 ;
- un usage public ;
- une interaction uniquement au doigt ;
- un client debout face à la borne.

Résolutions à prévoir :

- 1080 x 1920
- 1440 x 2560
- 2160 x 3840

Le design ne doit pas être pensé comme un site desktop.

---

### 4.3 Contrainte de marque

L’application doit respecter l’univers Pizza de Nuit :

- nocturne ;
- urbain ;
- street-food ;
- snack moderne ;
- rapide ;
- commercial ;
- généreux ;
- orienté commande à emporter.

La borne doit reprendre l’esprit du site officiel Pizza de Nuit sans le copier exactement.

Principe visuel à respecter :

Sombre pour créer l’impact nocturne.
Clair pour faciliter la commande.

---

## 5. Principes techniques fondamentaux

Codex doit respecter les principes suivants :

- architecture modulaire ;
- TypeScript strict ;
- composants réutilisables ;
- logique métier centralisée ;
- logique panier centralisée ;
- logique de prix centralisée ;
- types centralisés ;
- données structurées ;
- produits non codés dans les composants UI ;
- prix non codés dans les composants UI ;
- formats configurables ;
- suppléments configurables ;
- disponibilités configurables ;
- séparation entre interface client et interface admin ;
- séparation entre UI, logique métier, données, types et API ;
- backend minimal ;
- aucune logique de paiement ;
- aucune route de paiement ;
- aucun stockage de données bancaires ;
- impression ticket prévue dès l’architecture ;
- admin simple et opérationnel ;
- pas de fichier fourre-tout ;
- pas de duplication inutile.

---

## 6. Stack technique recommandée

### 6.1 Stack principale

La stack recommandée est :

- Next.js
- React
- TypeScript
- Tailwind CSS
- Next.js Route Handlers ou API Routes
- backend minimal intégré à Next.js
- stockage simple à définir
- impression navigateur ou impression locale
- admin simple protégée

---

### 6.2 Pourquoi cette stack

Cette stack est adaptée car elle permet :

- une interface tactile rapide ;
- une architecture modulaire ;
- une bonne séparation des responsabilités ;
- un typage solide ;
- un développement efficace avec Codex ;
- un backend minimal sans complexité excessive ;
- une évolution progressive vers une base de données ou une intégration matérielle ;
- une bonne gestion des composants UI ;
- une bonne compatibilité avec un mode borne.

---

### 6.3 Technologies interdites sans demande explicite

Codex ne doit pas ajouter sans demande explicite :

- Stripe ;
- paiement en ligne ;
- terminal CB intégré ;
- Supabase ;
- Firebase ;
- PostgreSQL ;
- MySQL ;
- MongoDB ;
- Prisma ;
- système de livraison ;
- système de réservation ;
- logiciel de caisse ;
- dashboard avancé ;
- programme fidélité ;
- compte client obligatoire ;
- géolocalisation ;
- application mobile.

Ces outils ou fonctionnalités pourront être envisagés plus tard uniquement si le projet le demande clairement.

---

## 7. Architecture globale

L’application doit être organisée en couches simples.

### 7.1 Couche interface client

Responsabilité :

- afficher les écrans de la borne ;
- gérer la navigation tactile ;
- afficher les produits ;
- afficher les formats ;
- afficher les suppléments ;
- gérer l’ajout au panier ;
- afficher le panier ;
- afficher la validation finale ;
- déclencher la création de commande ;
- déclencher l’impression ticket ;
- afficher la confirmation ;
- retourner automatiquement à l’accueil.

---

### 7.2 Couche interface admin

Responsabilité :

- consulter les commandes ;
- consulter le détail d’une commande ;
- réimprimer un ticket ;
- gérer les produits si activé ;
- gérer les formats si activé ;
- gérer les suppléments si activé ;
- gérer les disponibilités ;
- gérer les réglages simples ;
- rester protégée par une authentification simple.

L’admin ne doit pas devenir une caisse.

---

### 7.3 Couche composants UI

Responsabilité :

- fournir les composants réutilisables ;
- garantir la cohérence visuelle ;
- respecter le format 9:16 ;
- respecter les règles tactiles ;
- éviter les duplications.

Exemples :

- Button
- ProductCard
- CategoryCard
- FormatSelector
- SupplementSelector
- CartSummary
- TotalBar
- KioskHeader
- KioskLayout
- TicketPreview
- StatusBadge

---

### 7.4 Couche logique métier

Responsabilité :

- gérer le panier ;
- calculer les prix ;
- valider les règles de commande ;
- contrôler la compatibilité des suppléments ;
- gérer les formats ;
- gérer les règles de moitié-moitié si confirmées ;
- préparer les données de commande ;
- préparer les données du ticket.

Cette couche ne doit pas dépendre directement de l’UI.

---

### 7.5 Couche données et configuration

Responsabilité :

- stocker les produits ;
- stocker les catégories ;
- stocker les formats ;
- stocker les bases ;
- stocker les suppléments ;
- stocker les réglages borne ;
- permettre une évolution vers une base de données.

Les données doivent rester structurées et typées.

---

### 7.6 Couche backend minimal

Responsabilité :

- exposer quelques routes API simples ;
- charger le menu ;
- charger les réglages ;
- créer une commande ;
- consulter les commandes ;
- réimprimer un ticket ;
- vérifier l’état de l’application.

Le backend ne doit jamais gérer de paiement.

---

### 7.7 Couche impression ticket

Responsabilité :

- générer le contenu du ticket ;
- préparer une version imprimable ;
- déclencher l’impression ;
- gérer le statut d’impression ;
- permettre une réimpression depuis l’admin.

Le modèle exact d’imprimante ne doit pas être inventé.

---

## 8. Arborescence recommandée du projet

/src
  /app
    /(kiosk)
      page.tsx
      layout.tsx

    /admin
      page.tsx
      layout.tsx
      /orders
        page.tsx
      /orders/[id]
        page.tsx
      /products
        page.tsx
      /settings
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
      Button.tsx
      Card.tsx
      Modal.tsx
      Badge.tsx
      EmptyState.tsx
      LoadingState.tsx

    /kiosk
      KioskLayout.tsx
      KioskHeader.tsx
      KioskBottomBar.tsx
      HomeScreen.tsx
      CategoryGrid.tsx
      ProductGrid.tsx
      ProductDetail.tsx
      FormatSelector.tsx
      SupplementSelector.tsx
      CartPanel.tsx
      ConfirmationScreen.tsx

    /admin
      AdminLayout.tsx
      AdminHeader.tsx
      AdminTable.tsx
      AdminOrderCard.tsx
      AdminStatusBadge.tsx

    /products
      ProductCard.tsx
      ProductImage.tsx
      ProductBadge.tsx

    /cart
      CartSummary.tsx
      CartItemRow.tsx
      CartTotal.tsx

    /ticket
      TicketPreview.tsx
      TicketPrintable.tsx
      TicketStatus.tsx

  /features
    /products
      products.service.ts
      products.utils.ts

    /categories
      categories.service.ts

    /formats
      formats.service.ts
      formats.utils.ts

    /bases
      bases.service.ts

    /ingredients
      ingredients.utils.ts

    /supplements
      supplements.service.ts
      supplements.utils.ts

    /cart
      cart.store.ts
      cart.service.ts
      cart.validation.ts

    /pricing
      pricing.service.ts
      pricing.rules.ts

    /orders
      orders.service.ts
      orders.validation.ts
      order-number.service.ts

    /ticket
      ticket.service.ts
      ticket.formatter.ts

    /printing
      printing.service.ts
      print-window.service.ts

    /admin
      admin.service.ts
      admin.validation.ts

    /settings
      settings.service.ts

  /lib
    /cart
      cart-calculations.ts
      cart-helpers.ts

    /pricing
      calculate-line-total.ts
      calculate-cart-total.ts
      format-price.ts

    /orders
      create-order.ts
      order-status.ts

    /ticket
      build-ticket.ts
      ticket-template.ts

    /printing
      print-ticket.ts
      print-css.ts

    /storage
      storage.ts
      local-session.ts

    /server
      api-response.ts
      validate-request.ts

    /utils
      cn.ts
      dates.ts
      ids.ts

  /types
    product.ts
    category.ts
    format.ts
    base.ts
    ingredient.ts
    supplement.ts
    cart.ts
    order.ts
    ticket.ts
    settings.ts
    admin.ts
    api.ts

  /config
    app.config.ts
    kiosk.config.ts
    pricing.config.ts
    ticket.config.ts
    routes.config.ts

  /data
    products.ts
    categories.ts
    formats.ts
    bases.ts
    supplements.ts
    settings.ts

  /server
    db.ts
    menu.repository.ts
    orders.repository.ts
    settings.repository.ts

  /styles
    globals.css
    print.css

---

## 9. Rôle des dossiers principaux

### 9.1 /src/app

Contient les routes Next.js.

Il doit séparer clairement :

- l’interface borne client ;
- l’interface admin ;
- les routes API.

---

### 9.2 /src/components

Contient les composants React réutilisables.

Les composants ne doivent pas contenir de logique métier lourde.

Ils doivent recevoir des données et déclencher des actions, mais ne doivent pas décider seuls des règles de prix, de formats ou de commande.

---

### 9.3 /src/features

Contient les modules fonctionnels.

Chaque module doit gérer une responsabilité claire :

- produits ;
- catégories ;
- formats ;
- suppléments ;
- panier ;
- prix ;
- commandes ;
- ticket ;
- impression ;
- admin ;
- réglages.

---

### 9.4 /src/lib

Contient les fonctions techniques ou métier réutilisables.

Ce dossier peut contenir :

- calculs ;
- helpers ;
- validations ;
- formatages ;
- fonctions d’impression ;
- fonctions de stockage ;
- fonctions serveur.

---

### 9.5 /src/types

Contient les types TypeScript principaux.

Les types doivent être centralisés afin d’éviter les duplications.

---

### 9.6 /src/config

Contient la configuration générale du projet.

Exemples :

- configuration de l’application ;
- configuration de la borne ;
- configuration des tickets ;
- configuration des routes ;
- configuration du pricing.

---

### 9.7 /src/data

Contient les données initiales.

Ces données peuvent être utilisées au démarrage avant une base de données.

Elles doivent être typées et facilement remplaçables par une persistance plus avancée.

---

### 9.8 /src/server

Contient les éléments backend minimal.

Il peut contenir :

- accès au stockage ;
- repositories ;
- fonctions de persistance ;
- logique serveur.

---

### 9.9 /src/styles

Contient :

- styles globaux ;
- styles d’impression ;
- règles CSS print.

---

## 10. Modules principaux

### 10.1 Module products

Responsabilité :

- gérer les produits ;
- fournir la liste des produits ;
- filtrer les produits par catégorie ;
- vérifier la disponibilité ;
- exposer les informations utiles aux cards produits ;
- ne jamais inventer la carte officielle.

---

### 10.2 Module categories

Responsabilité :

- gérer les catégories ;
- afficher les familles de produits ;
- contrôler l’ordre d’affichage ;
- masquer ou désactiver les catégories indisponibles.

Catégories à prévoir dans la structure :

- pizzas base tomate ;
- pizzas base crème fraîche ;
- pizzas spéciales ;
- pizzas à composer si confirmé ;
- boissons ;
- desserts si confirmés ;
- accompagnements si confirmés ;
- sauces si confirmées.

---

### 10.3 Module formats

Responsabilité :

- gérer les formats disponibles ;
- gérer les prix par format ;
- gérer les compatibilités produit / format ;
- gérer les badges grands formats.

Formats à prévoir :

- 31 cm ;
- 40 cm ;
- 1/2 mètre ;
- 60 cm.

Ces formats doivent rester configurables.

---

### 10.4 Module bases

Responsabilité :

- gérer les bases pizza ;
- structurer les bases ;
- afficher la base dans l’UI, le panier et le ticket.

Bases à prévoir :

- tomate ;
- crème fraîche ;
- autre base uniquement si confirmée.

---

### 10.5 Module ingredients

Responsabilité :

- gérer les ingrédients ;
- afficher les ingrédients principaux ;
- prévoir les allergènes si disponibles ;
- éviter les textes non structurés.

---

### 10.6 Module supplements

Responsabilité :

- gérer les suppléments ;
- gérer les prix ;
- gérer les compatibilités produit ;
- gérer les compatibilités format ;
- gérer les quantités maximales ;
- empêcher les options incompatibles.

Suppléments à prévoir dans la structure :

- cheesy crust ;
- ingrédient supplémentaire ;
- fromage supplémentaire ;
- sauce ;
- option épicée ;
- autres suppléments à confirmer.

---

### 10.7 Module cart

Responsabilité :

- ajouter un produit ;
- modifier une ligne ;
- supprimer une ligne ;
- changer une quantité ;
- vider le panier ;
- valider le panier ;
- conserver l’état temporaire de session ;
- afficher le total ;
- empêcher un panier invalide.

La logique panier doit être centralisée.

---

### 10.8 Module pricing

Responsabilité :

- calculer le total d’une ligne ;
- calculer le total du panier ;
- gérer les suppléments ;
- gérer les quantités ;
- gérer les formats ;
- gérer les règles moitié-moitié si confirmées.

Les calculs ne doivent jamais être dispersés dans les composants UI.

---

### 10.9 Module orders

Responsabilité :

- créer une commande ;
- générer un numéro de commande ;
- associer les lignes de commande ;
- associer les statuts ;
- préparer la commande pour impression ;
- sauvegarder la commande si la persistance est activée.

---

### 10.10 Module ticket

Responsabilité :

- générer les données du ticket ;
- formater le ticket ;
- préparer la version imprimable ;
- gérer le contenu obligatoire ;
- permettre la réimpression.

---

### 10.11 Module printing

Responsabilité :

- déclencher l’impression ;
- gérer la fenêtre ou page d’impression ;
- appliquer les styles print ;
- gérer les erreurs simples ;
- ne pas inventer de modèle d’imprimante.

---

### 10.12 Module admin

Responsabilité :

- afficher les commandes ;
- afficher le détail d’une commande ;
- changer un statut simple ;
- réimprimer un ticket ;
- gérer les produits si prévu ;
- gérer les formats si prévu ;
- gérer les suppléments si prévu ;
- gérer les disponibilités.

L’admin doit rester simple.

---

### 10.13 Module settings

Responsabilité :

- gérer les réglages de la borne ;
- gérer les réglages du ticket ;
- gérer les informations du point de vente ;
- gérer les réglages d’inactivité ;
- gérer les réglages d’impression.

---

### 10.14 Module theme

Responsabilité :

- centraliser les couleurs ;
- centraliser les styles communs ;
- respecter la direction visuelle Pizza de Nuit ;
- éviter les couleurs arbitraires dispersées.

---

## 11. Architecture frontend

### 11.1 Interface client borne

L’interface client doit suivre ce parcours :

1. accueil ;
2. catégories ;
3. liste produits ;
4. détail produit ;
5. choix format ;
6. options et suppléments ;
7. panier ;
8. validation finale ;
9. impression ticket ;
10. confirmation ;
11. retour automatique à l’accueil.

Chaque écran doit avoir :

- une action principale claire ;
- des boutons larges ;
- un total visible quand nécessaire ;
- un retour visible ;
- une compatibilité tactile ;
- aucune confusion avec un paiement.

---

### 11.2 Layout borne

Le layout borne doit être vertical.

Structure recommandée :

1. header compact ;
2. zone centrale de contenu ;
3. barre basse fixe pour l’action principale ;
4. total ou message important si nécessaire.

La barre basse peut contenir :

- total panier ;
- mention paiement au comptoir ;
- bouton principal.

---

### 11.3 Gestion du panier côté frontend

Le panier peut être géré côté client pendant la session.

Il doit être réinitialisé :

- après commande validée ;
- après retour automatique à l’accueil ;
- après inactivité prolongée ;
- après abandon confirmé.

Le panier temporaire peut utiliser un store client ou un état React centralisé.

Le localStorage peut être utilisé uniquement si nécessaire pour une session temporaire, jamais comme source de vérité finale d’une commande validée.

---

### 11.4 États à prévoir

L’interface doit prévoir :

- chargement du menu ;
- produit indisponible ;
- panier vide ;
- format non sélectionné ;
- supplément incompatible ;
- moitié-moitié incomplète si activée ;
- création commande impossible ;
- impression en cours ;
- impression réussie ;
- impression échouée ;
- retour automatique à l’accueil ;
- borne en maintenance.

---

### 11.5 Contraintes tactiles

Règles obligatoires :

- pas de hover obligatoire ;
- zones tactiles larges ;
- boutons primaires très visibles ;
- scroll vertical fluide ;
- une action principale par écran ;
- pas de formulaires longs ;
- pas de clavier sauf nécessité absolue ;
- pas de menu desktop complexe ;
- pas de grille à 3 ou 4 colonnes ;
- 1 à 2 colonnes maximum.

---

## 12. Architecture backend minimal

Le backend doit être limité et utile.

Il peut servir à :

- charger le menu ;
- charger les réglages ;
- enregistrer les commandes ;
- générer un numéro de commande ;
- conserver un historique simple ;
- consulter les commandes côté admin ;
- préparer la réimpression d’un ticket ;
- vérifier l’état du système.

Le backend ne doit jamais gérer :

- paiement ;
- Stripe ;
- terminal CB ;
- données bancaires ;
- livraison ;
- frais de livraison ;
- consommation sur place ;
- réservation ;
- compte client obligatoire ;
- système de caisse complet ;
- comptabilité ;
- TVA avancée ;
- dashboard complexe.

---

## 13. Routes API minimales

### 13.1 GET /api/menu

Rôle :

- retourner les catégories ;
- retourner les produits ;
- retourner les formats ;
- retourner les bases ;
- retourner les suppléments ;
- retourner les disponibilités.

Données retournées :

- categories
- products
- formats
- bases
- supplements

Règles :

- ne pas retourner de données inutiles ;
- ne pas retourner de données de paiement ;
- ne pas inventer de produits.

---

### 13.2 GET /api/settings

Rôle :

- retourner les réglages de l’application ;
- retourner les réglages de la borne ;
- retourner les réglages du ticket.

Données retournées possibles :

- nom du point de vente ;
- message ticket ;
- temps d’inactivité ;
- configuration impression ;
- activation maintenance ;
- réglages visuels simples.

Règles :

- ne pas exposer de données sensibles ;
- ne pas exposer de secret admin.

---

### 13.3 POST /api/orders

Rôle :

- créer une commande validée ;
- générer un numéro de commande ;
- enregistrer les lignes ;
- enregistrer le total ;
- préparer l’impression du ticket.

Données reçues :

- lignes du panier ;
- total calculé ;
- type de commande ;
- informations de session minimales.

Règles obligatoires :

- orderType doit être takeaway ou à emporter ;
- paymentStatus doit être à régler au comptoir ;
- aucun paiement ne doit être déclenché ;
- aucune donnée bancaire ne doit être reçue ;
- le panier doit être validé côté serveur autant que possible.

---

### 13.4 GET /api/orders

Rôle :

- retourner la liste des commandes pour l’admin.

Données retournées :

- numéro de commande ;
- date ;
- total ;
- statut ;
- statut impression ;
- statut paiement comptoir ;
- nombre de lignes.

Règles :

- route destinée à l’admin ;
- protection minimale nécessaire ;
- ne pas exposer au client public.

---

### 13.5 GET /api/orders/:id

Rôle :

- retourner le détail d’une commande.

Données retournées :

- commande complète ;
- lignes ;
- formats ;
- suppléments ;
- total ;
- statut ;
- nombre d’impressions ;
- données ticket.

Règles :

- route destinée à l’admin ;
- protection minimale nécessaire.

---

### 13.6 POST /api/orders/:id/reprint

Rôle :

- préparer une réimpression de ticket ;
- incrémenter le nombre d’impressions si pertinent ;
- retourner les données nécessaires à l’impression.

Règles :

- ne pas modifier silencieusement la commande ;
- ne pas recalculer le total sans raison ;
- ne pas créer une nouvelle commande ;
- indiquer qu’il s’agit d’une réimpression si nécessaire.

---

### 13.7 GET /api/health

Rôle :

- vérifier que l’application répond ;
- vérifier que le backend minimal fonctionne ;
- vérifier éventuellement l’accès au stockage.

Données retournées :

- statut simple ;
- timestamp ;
- environnement si utile.

Règles :

- ne pas exposer d’informations sensibles ;
- ne pas retourner de secrets.

---

## 14. Routes API interdites

Codex ne doit jamais créer sans demande explicite :

- POST /api/payment
- POST /api/checkout
- POST /api/stripe
- POST /api/delivery
- POST /api/reservation
- POST /api/customer-account
- POST /api/table-order
- POST /api/pos
- toute route d’encaissement ;
- toute route de paiement en ligne ;
- toute route de livraison.

---

## 15. Types TypeScript indispensables

Les types doivent être centralisés dans /src/types.

---

### 15.1 Product

Champs à prévoir :

- id
- name
- slug
- description
- categoryId
- productType
- image
- baseId
- ingredientIds
- allergenIds
- availableFormatIds
- pricesByFormat
- availableOptionIds
- compatibleSupplementIds
- isAvailable
- displayOrder
- badge

---

### 15.2 Category

Champs à prévoir :

- id
- name
- slug
- description
- type
- image
- icon
- isAvailable
- displayOrder

---

### 15.3 PizzaFormat

Champs à prévoir :

- id
- label
- description
- price
- isAvailable
- isLargeFormat
- supportsHalfHalf
- displayOrder
- badge

---

### 15.4 PizzaBase

Champs à prévoir :

- id
- name
- isAvailable
- displayOrder

---

### 15.5 Ingredient

Champs à prévoir :

- id
- name
- allergenIds
- isAvailable
- displayOrder

---

### 15.6 Supplement

Champs à prévoir :

- id
- name
- description
- price
- isAvailable
- compatibleProductIds
- compatibleCategoryIds
- compatibleFormatIds
- maxQuantity
- displayOrder

---

### 15.7 CartItem

Champs à prévoir :

- id
- productId
- productType
- formatId
- baseId
- supplements
- options
- quantity
- unitPrice
- lineTotal
- halfHalf
- notes

---

### 15.8 Cart

Champs à prévoir :

- items
- subtotal
- total
- updatedAt

---

### 15.9 Order

Champs à prévoir :

- id
- orderNumber
- createdAt
- orderType
- items
- subtotal
- total
- orderStatus
- paymentStatus
- printStatus
- ticketPrintCount

---

### 15.10 OrderItem

Champs à prévoir :

- id
- productName
- productType
- formatLabel
- baseLabel
- supplements
- options
- quantity
- unitPrice
- lineTotal
- halfHalf

---

### 15.11 Ticket

Champs à prévoir :

- orderNumber
- createdAt
- restaurantName
- orderTypeLabel
- items
- total
- paymentLabel
- customerMessage
- printCount

---

### 15.12 AppSettings

Champs à prévoir :

- restaurantName
- kioskMode
- maintenanceMode
- inactivityTimeoutSeconds
- returnHomeDelaySeconds
- ticketMessage
- printMode
- storeInfo

---

### 15.13 OrderStatus

Statuts recommandés :

- created
- ticket_printed
- awaiting_counter_payment
- paid_at_counter
- in_preparation
- ready
- handed_to_customer
- cancelled

---

### 15.14 PaymentStatus

Statuts recommandés :

- awaiting_counter_payment
- paid_at_counter
- cancelled

Aucun statut ne doit correspondre à un paiement sur borne.

---

### 15.15 PrintStatus

Statuts recommandés :

- not_started
- printing
- printed
- failed
- reprinted

---

## 16. Données et configuration

### 16.1 Fichiers de données initiaux

Au démarrage, les données peuvent être stockées dans :

- src/data/products.ts
- src/data/categories.ts
- src/data/formats.ts
- src/data/bases.ts
- src/data/supplements.ts
- src/data/settings.ts

Ces fichiers doivent être temporaires ou configurables.

Ils ne doivent pas enfermer le projet dans une logique impossible à faire évoluer.

---

### 16.2 Données configurables

Doivent rester configurables :

- produits ;
- catégories ;
- formats ;
- prix ;
- bases ;
- ingrédients ;
- suppléments ;
- options ;
- disponibilités ;
- badges ;
- message ticket ;
- temps de retour automatique ;
- réglages d’impression.

---

### 16.3 Données interdites en dur dans l’UI

Codex ne doit pas coder directement dans les composants :

- noms des pizzas ;
- prix ;
- formats ;
- règles de calcul ;
- suppléments ;
- bases ;
- disponibilités ;
- messages critiques ;
- règles moitié-moitié ;
- statut de paiement ;
- contenu du ticket.

---

## 17. Logique panier

### 17.1 Responsabilité

La logique panier doit permettre :

- ajouter un produit ;
- modifier un produit ;
- supprimer un produit ;
- modifier une quantité ;
- vider le panier ;
- calculer le total ;
- valider le panier ;
- préparer la commande.

---

### 17.2 Règles d’ajout au panier

Une pizza ne peut être ajoutée que si :

- le produit est disponible ;
- le format est sélectionné ;
- le format est compatible ;
- les suppléments sont compatibles ;
- le prix est calculable.

Un produit simple peut être ajouté si :

- le produit est disponible ;
- le prix est défini ;
- la quantité est valide.

---

### 17.3 Règles de modification

Depuis le panier, le client doit pouvoir :

- modifier le format ;
- modifier les suppléments ;
- modifier la quantité ;
- supprimer le produit ;
- revenir au menu.

Après modification, le total doit être recalculé.

---

### 17.4 Panier vide

Si le panier est vide :

- afficher Votre panier est vide.
- proposer Voir les pizzas
- masquer ou désactiver la validation.

---

### 17.5 Mention obligatoire

Le panier doit toujours afficher :

Paiement au comptoir après impression du ticket.

---

## 18. Logique de calcul des prix

### 18.1 Principe

Le calcul des prix doit être centralisé dans le module pricing.

Aucun calcul de prix ne doit être dispersé dans les composants UI.

---

### 18.2 Pizza classique

Formule :

Total ligne = (prix du format + total suppléments) × quantité

---

### 18.3 Produit simple

Formule :

Total ligne = prix unitaire × quantité

---

### 18.4 Pizza moitié-moitié

La moitié-moitié doit être prévue uniquement si confirmée.

La formule doit rester configurable.

Le système doit pouvoir gérer :

- choix de deux pizzas ;
- format compatible ;
- base identique si confirmée ;
- prix calculé selon règle validée ;
- suppléments éventuels ;
- affichage clair dans le panier ;
- affichage clair sur le ticket.

Codex ne doit pas inventer la règle de calcul.

Si la règle est absente :

Information à confirmer.

---

### 18.5 Affichage des prix

Les prix doivent être stockés sous forme numérique.

L’affichage en euros doit être géré par une fonction dédiée.

Le total doit être identique :

- dans le panier ;
- dans la validation finale ;
- dans la commande enregistrée ;
- sur le ticket imprimé.

---

## 19. Logique de validation panier

Avant validation finale, le système doit vérifier :

- le panier n’est pas vide ;
- chaque produit existe ;
- chaque produit est disponible ;
- chaque pizza possède un format ;
- chaque format est compatible ;
- chaque supplément est compatible ;
- chaque quantité est valide ;
- chaque total est calculable ;
- la moitié-moitié est complète si utilisée ;
- aucune logique de paiement n’est déclenchée.

Messages recommandés :

- Votre panier est vide.
- Sélectionnez un format pour continuer.
- Ce produit est actuellement indisponible.
- Cette option n’est pas disponible avec ce format.
- Choisissez les deux moitiés de votre pizza.
- La commande n’a pas pu être validée. Merci de réessayer ou de demander de l’aide au comptoir.

---

## 20. Logique de commande

### 20.1 Création de commande

Une commande est créée uniquement après validation finale.

La création doit :

1. valider le panier ;
2. générer un identifiant unique ;
3. générer un numéro de commande visible ;
4. enregistrer les lignes de commande ;
5. enregistrer le total ;
6. définir le type à emporter ;
7. définir le statut de paiement à régler au comptoir ;
8. préparer les données du ticket ;
9. déclencher l’impression ;
10. réinitialiser la session après confirmation.

---

### 20.2 Données de commande

Chaque commande doit contenir :

- identifiant unique ;
- numéro de commande visible ;
- date et heure ;
- type : à emporter ;
- lignes de commande ;
- total ;
- statut de commande ;
- statut d’impression ;
- statut paiement : à régler au comptoir ;
- nombre d’impressions ticket.

---

### 20.3 Statuts de commande

Statuts recommandés :

- created
- ticket_printed
- awaiting_counter_payment
- paid_at_counter
- in_preparation
- ready
- handed_to_customer
- cancelled

Ces statuts doivent rester simples.

Ils ne doivent pas transformer l’application en caisse complète.

---

### 20.4 Statut paiement

Le statut paiement sert uniquement à indiquer l’état opérationnel au comptoir.

Il ne doit jamais déclencher :

- paiement CB ;
- Stripe ;
- paiement en ligne ;
- terminal de paiement ;
- stockage de données bancaires ;
- route API de paiement.

Valeur initiale obligatoire :

à régler au comptoir

---

## 21. Logique ticket

### 21.1 Rôle du ticket

Le ticket est l’élément central entre :

- le client ;
- le comptoir ;
- l’encaissement ;
- la préparation.

Il doit être clair, court et exploitable rapidement.

---

### 21.2 Contenu obligatoire du ticket

Le ticket doit contenir :

- nom Pizza de Nuit ;
- numéro de commande ;
- date et heure ;
- mention Commande à emporter ;
- détail des produits ;
- formats ;
- bases ;
- options ;
- suppléments ;
- quantités ;
- total ;
- mention Paiement au comptoir ;
- message client.

Message obligatoire :

Présentez ce ticket au comptoir pour régler votre commande.

---

### 21.3 Contenu interdit sur le ticket

Le ticket ne doit pas contenir :

- lien de paiement ;
- QR code de paiement ;
- indication de paiement en ligne ;
- adresse de livraison ;
- frais de livraison ;
- numéro de table ;
- réservation ;
- compte client obligatoire.

---

### 21.4 Réimpression ticket

La réimpression doit être possible depuis l’admin si la commande est enregistrée.

Règles :

- ne pas créer une nouvelle commande ;
- ne pas modifier silencieusement la commande ;
- incrémenter le compteur d’impression si prévu ;
- afficher éventuellement une mention Réimpression ;
- garder le même numéro de commande.

---

## 22. Impression ticket

### 22.1 Stratégie initiale recommandée

L’impression doit rester simple au démarrage.

Solutions possibles :

- impression navigateur ;
- page dédiée imprimable ;
- composant TicketPrintable ;
- CSS print ;
- fenêtre d’impression dédiée.

---

### 22.2 Évolution possible

Plus tard, selon le matériel confirmé, le projet pourra évoluer vers :

- imprimante USB ;
- imprimante réseau ;
- service local d’impression ;
- intégration spécifique à une imprimante ticket.

Codex ne doit pas inventer :

- modèle d’imprimante ;
- largeur ticket ;
- protocole d’impression ;
- intégration matérielle complexe.

Si ces données sont absentes :

Information à confirmer.

---

### 22.3 Styles print

Prévoir un fichier :

- src/styles/print.css

Ce fichier doit gérer :

- largeur ticket ;
- tailles de texte ;
- alignements ;
- séparateurs ;
- masquage des éléments UI ;
- lisibilité du ticket.

La largeur exacte dépendra du matériel.

---

## 23. Stockage et persistance

### 23.1 Objectif

La persistance doit rester simple.

Elle peut servir à stocker :

- commandes validées ;
- historique simple ;
- tickets imprimés ;
- nombre d’impressions ;
- réglages de borne ;
- menu configurable si nécessaire.

---

### 23.2 Options acceptables

Options possibles :

1. fichiers structurés au démarrage ;
2. stockage serveur simple ;
3. SQLite local si le projet tourne localement ;
4. base plus avancée uniquement si demandée plus tard.

`DATABASE_SCHEMA.md` décrit une cible complète et évolutive. Il ne doit pas être interprété comme une obligation d’implémenter toutes les tables dès la V1.

---

### 23.3 Usage du localStorage

Le localStorage peut être utilisé uniquement pour :

- session temporaire ;
- panier temporaire ;
- préférence non critique.

Il ne doit pas être la source de vérité pour :

- commandes validées ;
- tickets ;
- historique admin ;
- données critiques.

---

### 23.4 SQLite

SQLite est acceptable si le projet doit fonctionner localement sur la borne.

Avantages :

- simple ;
- local ;
- léger ;
- adapté à un backend minimal ;
- suffisant pour commandes et réglages.

Codex ne doit pas ajouter SQLite si ce n’est pas nécessaire dans l’étape en cours.

---

## 24. Interface admin

### 24.1 Objectif

L’admin doit être simple, lisible et opérationnel.

Il doit permettre de gérer les éléments essentiels sans devenir une caisse.

---

### 24.2 Écrans admin recommandés

Écrans possibles :

1. connexion admin ;
2. tableau de bord simple ;
3. liste des commandes ;
4. détail commande ;
5. réimpression ticket ;
6. liste produits ;
7. modification produit ;
8. gestion formats ;
9. gestion suppléments ;
10. gestion disponibilités ;
11. réglages ticket ;
12. réglages borne.

---

### 24.3 Actions admin autorisées

L’admin peut permettre :

- consulter les commandes ;
- consulter le détail d’une commande ;
- changer un statut simple ;
- réimprimer un ticket ;
- activer ou désactiver un produit ;
- modifier un prix si prévu ;
- modifier un format si prévu ;
- modifier un supplément si prévu ;
- modifier les réglages ticket.

---

### 24.4 Actions admin interdites au démarrage

L’admin ne doit pas gérer :

- paiement ;
- terminal CB ;
- Stripe ;
- comptabilité ;
- TVA avancée ;
- livraison ;
- réservation ;
- fidélité complexe ;
- dashboard lourd ;
- multi-restaurant complexe ;
- caisse complète.

---

## 25. Sécurité

### 25.1 Principes

Le projet doit rester simple, mais ne doit pas être négligé.

Principes :

- aucune donnée bancaire ;
- aucune donnée de paiement ;
- aucune donnée personnelle obligatoire ;
- routes API limitées ;
- validation des entrées ;
- admin protégée ;
- séparation client/admin ;
- pas de secrets exposés côté client ;
- pas de fausse promesse de sécurité avancée.

---

### 25.2 Admin

L’admin doit être protégée par une méthode simple.

Options possibles :

- mot de passe local ;
- session simple ;
- middleware Next.js ;
- protection par variable d’environnement si adaptée.

Codex ne doit pas créer un système complexe de rôles et permissions sans demande explicite.

---

### 25.3 Validation serveur

Les routes API doivent valider :

- panier non vide ;
- produits existants ;
- formats valides ;
- suppléments compatibles ;
- quantités valides ;
- total cohérent ;
- absence de données interdites.

---

## 26. Performance

### 26.1 Objectif

La borne doit répondre immédiatement.

Le client doit pouvoir commander vite.

---

### 26.2 Règles de performance

Codex doit privilégier :

- composants légers ;
- données chargées rapidement ;
- images optimisées ;
- animations courtes ;
- calculs simples ;
- API minimale ;
- peu d’effets décoratifs ;
- aucun blocage inutile ;
- retour accueil fluide ;
- impression déclenchée rapidement.

---

### 26.3 Images

Les images doivent être :

- optimisées ;
- cohérentes ;
- rapides à charger ;
- adaptées à l’écran vertical ;
- suffisamment grandes pour donner envie ;
- pas trop lourdes pour ralentir la borne.

---

### 26.4 Animations

Les animations doivent aider à comprendre.

Durées recommandées :

- micro-interaction : 100 à 180 ms ;
- transition écran : 180 à 300 ms ;
- animation impression : courte.

À éviter :

- animations longues ;
- parallaxe ;
- effets lourds ;
- animations bloquantes ;
- transitions décoratives inutiles.

---

## 27. Compatibilité borne tactile 27 pouces 9:16

### 27.1 Contraintes techniques UI

L’interface doit respecter :

- orientation verticale ;
- ratio 9:16 ;
- boutons larges ;
- zones tactiles confortables ;
- absence de hover ;
- scroll vertical naturel ;
- 1 à 2 colonnes maximum ;
- barre basse fixe pour CTA ;
- total visible ;
- panier accessible ;
- textes courts ;
- prix très visibles ;
- messages importants lisibles à distance.

---

### 27.2 Structure d’écran recommandée

Chaque écran doit suivre cette structure :

1. header compact ;
2. titre clair ;
3. contenu central ;
4. zone basse fixe ;
5. bouton principal large.

---

### 27.3 Actions principales en zone basse

Les actions suivantes doivent idéalement être en bas d’écran :

- Commander à emporter
- Ajouter au panier
- Valider ma commande
- Valider et imprimer le ticket
- Terminer

---

### 27.4 Interdictions de layout

Codex doit éviter :

- layout desktop horizontal ;
- panneaux latéraux complexes ;
- grilles à 3 ou 4 colonnes ;
- menus trop petits ;
- boutons en haut difficilement accessibles ;
- textes longs ;
- interactions cachées ;
- UI dépendante du hover.

---

## 28. Maintenabilité

### 28.1 Principes

Le code doit être :

- lisible ;
- typé ;
- modulaire ;
- prévisible ;
- facile à relire ;
- facile à modifier ;
- facile à tester ;
- sans duplication inutile.

---

### 28.2 Séparation des responsabilités

Chaque fichier doit avoir un rôle clair.

À éviter :

- composants géants ;
- fichiers fourre-tout ;
- logique panier dans l’UI ;
- calculs de prix dans les composants ;
- types dupliqués ;
- données dispersées ;
- routes API trop nombreuses ;
- backend complexe.

---

### 28.3 Conventions de nommage

Recommandations :

- composants React en PascalCase ;
- hooks en useSomething ;
- services en something.service.ts ;
- validations en something.validation.ts ;
- types en fichiers dédiés ;
- fonctions utilitaires nommées explicitement ;
- routes API simples et lisibles.

---

### 28.4 Réutilisation

Avant de créer un fichier, Codex doit vérifier :

- si un fichier équivalent existe ;
- si un composant existant peut être réutilisé ;
- si une fonction existe déjà ;
- si un type existe déjà ;
- si la logique doit être centralisée ailleurs.

---

## 29. Évolutivité future

Le projet doit pouvoir évoluer sans être surchargé au démarrage.

### 29.1 Évolutions possibles à prévoir sans développer

Prévoir l’architecture pour pouvoir ajouter plus tard :

- écran cuisine ;
- statistiques simples ;
- multi-borne ;
- synchronisation caisse ;
- imprimante réseau ;
- promotions ;
- fidélité ;
- gestion multi-point de vente ;
- intégration terminal de paiement uniquement si demandée ;
- intégration caisse uniquement si demandée.

---

### 29.2 Règle importante

Ces évolutions ne doivent pas être développées au démarrage.

Elles doivent seulement être rendues possibles par une architecture propre.

Codex doit éviter d’ajouter de la complexité pour des fonctionnalités futures non demandées.

---

## 30. Interdictions techniques absolues

Codex ne doit jamais ajouter sans demande explicite :

- paiement sur borne ;
- Stripe ;
- route de paiement ;
- terminal CB intégré ;
- données bancaires ;
- paiement en ligne ;
- livraison ;
- frais de livraison ;
- choix d’adresse ;
- consommation sur place ;
- réservation ;
- compte client obligatoire ;
- espace client ;
- QR code de table ;
- commande à table ;
- système de caisse complet ;
- comptabilité ;
- TVA avancée ;
- dashboard complexe ;
- application mobile ;
- géolocalisation ;
- suivi de livraison ;
- produits inventés ;
- prix inventés ;
- horaires inventés ;
- adresses inventées ;
- offres inventées ;
- prix codés en dur dans l’UI ;
- formats figés dans les composants ;
- logique panier dispersée ;
- logique prix dispersée ;
- interface desktop horizontale ;
- grille produit à 3 ou 4 colonnes ;
- bouton final Payer.

---

## 31. Ordre recommandé de développement technique

### Étape 1 — Socle projet

1. initialiser le projet ;
2. configurer TypeScript ;
3. configurer Tailwind ;
4. créer la structure de dossiers ;
5. créer les types principaux ;
6. créer la configuration de base.

---

### Étape 2 — Données et modèles

1. créer les catégories ;
2. créer les formats ;
3. créer les bases ;
4. créer les suppléments ;
5. créer la structure produit ;
6. créer les réglages.

---

### Étape 3 — Design system de base

1. créer Button ;
2. créer Card ;
3. créer Badge ;
4. créer KioskLayout ;
5. créer KioskHeader ;
6. créer KioskBottomBar.

---

### Étape 4 — Interface borne

1. écran accueil ;
2. écran catégories ;
3. écran liste produits ;
4. écran détail produit ;
5. choix format ;
6. choix suppléments ;
7. panier ;
8. validation finale.

---

### Étape 5 — Logique métier

1. logique panier ;
2. logique calcul prix ;
3. validation panier ;
4. création commande ;
5. statuts commande ;
6. reset session.

---

### Étape 6 — Ticket

1. données ticket ;
2. template ticket ;
3. preview ticket ;
4. CSS print ;
5. impression ;
6. réimpression.

---

### Étape 7 — Backend minimal

1. GET /api/menu
2. GET /api/settings
3. POST /api/orders
4. GET /api/orders
5. GET /api/orders/:id
6. POST /api/orders/:id/reprint
7. GET /api/health

---

### Étape 8 — Admin simple

1. connexion admin ;
2. liste commandes ;
3. détail commande ;
4. réimpression ticket ;
5. gestion produits simple ;
6. gestion disponibilités ;
7. réglages ticket.

---

### Étape 9 — États et erreurs

1. panier vide ;
2. produit indisponible ;
3. format manquant ;
4. supplément incompatible ;
5. erreur création commande ;
6. erreur impression ;
7. inactivité ;
8. retour accueil ;
9. mode maintenance.

---

### Étape 10 — Finalisation borne

1. optimisation tactile ;
2. optimisation 9:16 ;
3. optimisation images ;
4. performance ;
5. tests parcours complet ;
6. tests impression ;
7. tests admin ;
8. validation finale Codex.

---

## 32. Checklist de validation Codex

Avant de considérer l’architecture comme valide, vérifier :

- [ ] l’application est bien une borne de commande tactile ;
- [ ] l’application est pensée pour un écran vertical 9:16 ;
- [ ] l’application est adaptée à une borne 27 pouces ;
- [ ] la commande est uniquement à emporter ;
- [ ] aucun paiement sur borne n’existe ;
- [ ] aucun Stripe n’existe ;
- [ ] aucune route de paiement n’existe ;
- [ ] aucune livraison n’existe ;
- [ ] aucun mode sur place n’existe ;
- [ ] aucune réservation n’existe ;
- [ ] aucun compte client obligatoire n’existe ;
- [ ] le backend reste minimal ;
- [ ] les routes API sont limitées ;
- [ ] les produits sont configurables ;
- [ ] les prix sont configurables ;
- [ ] les formats sont configurables ;
- [ ] les suppléments sont configurables ;
- [ ] les disponibilités sont configurables ;
- [ ] aucun prix n’est codé en dur dans l’UI ;
- [ ] aucun produit n’est codé en dur dans les composants ;
- [ ] la logique panier est centralisée ;
- [ ] la logique prix est centralisée ;
- [ ] la logique commande est centralisée ;
- [ ] les types TypeScript sont centralisés ;
- [ ] l’interface client est séparée de l’admin ;
- [ ] l’UI est séparée de la logique métier ;
- [ ] le ticket est prévu ;
- [ ] l’impression est prévue ;
- [ ] la réimpression est prévue côté admin ;
- [ ] le message paiement comptoir est visible ;
- [ ] le bouton final est Valider et imprimer le ticket ;
- [ ] aucun bouton final Payer n’existe ;
- [ ] le retour automatique à l’accueil est prévu ;
- [ ] les erreurs principales sont prévues ;
- [ ] l’admin reste simple ;
- [ ] l’application reste fidèle à Pizza de Nuit ;
- [ ] Codex peut développer sans ambiguïté.

---

## 33. Informations à confirmer avant implémentation finale

Les informations suivantes doivent être confirmées avant intégration définitive :

- carte officielle complète ;
- liste exacte des pizzas ;
- ingrédients exacts ;
- allergènes ;
- boissons ;
- desserts ;
- accompagnements ;
- sauces ;
- prix définitifs ;
- prix des suppléments ;
- disponibilité du cheesy crust ;
- disponibilité de la moitié-moitié ;
- règle de calcul moitié-moitié ;
- base identique obligatoire ou non ;
- disponibilité du 1/2 mètre ;
- disponibilité du 60 cm ;
- compatibilité des grands formats ;
- moyens de paiement acceptés au comptoir ;
- modèle d’imprimante ;
- largeur ticket ;
- connexion imprimante ;
- besoin d’un ticket cuisine ;
- méthode réelle d’impression ;
- niveau réel souhaité pour l’admin ;
- méthode de stockage définitive ;
- environnement de déploiement.

Si une information est absente, Codex doit écrire :

Information à confirmer.

Codex ne doit jamais inventer ces données.

---

## 34. Règle finale

L’architecture doit toujours préserver la simplicité du projet.

L’objectif n’est pas de créer une application complexe.

L’objectif est de créer une borne tactile claire, rapide et fiable pour Pizza de Nuit.

Fonctionnement absolu à respecter :

Le client commande sur la borne.
La borne imprime un ticket.
Le client présente le ticket au comptoir.
Le paiement se fait au comptoir.
La commande est préparée à emporter.

La priorité technique est :

1. simplicité ;
2. lisibilité ;
3. rapidité ;
4. robustesse ;
5. maintenabilité ;
6. backend minimal ;
7. impression ticket fiable ;
8. fidélité à Pizza de Nuit ;
9. évolutivité sans complexité.
