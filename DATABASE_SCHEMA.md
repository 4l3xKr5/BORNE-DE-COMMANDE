# DATABASE_SCHEMA.md

## 1. Objectif du document

Ce document définit le schéma de base de données de l’application de borne de commande tactile **Pizza de Nuit**.

Il sert de source de vérité pour Codex afin de structurer toutes les données persistantes et configurables du projet :

- menu ;
- catégories ;
- produits ;
- pizzas ;
- formats ;
- bases ;
- ingrédients ;
- allergènes ;
- suppléments ;
- options ;
- commandes ;
- tickets ;
- réimpressions ;
- réglages de borne ;
- réglages d’administration ;
- historique simple.

Ce document ne sert pas à créer un logiciel de caisse complet.

Ce document ne sert pas à créer un système de paiement.

Ce document ne sert pas à créer un système de livraison.

Ce document ne sert pas à créer un espace client.

La base de données doit rester simple, claire, maintenable et adaptée au fonctionnement réel de la borne Pizza de Nuit.

---

## 2. Sources de vérité

Codex doit respecter les sources suivantes, dans cet ordre :

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

Le site officiel Pizza de Nuit doit être utilisé pour comprendre :

- l’identité nocturne ;
- l’univers street-food ;
- le ton commercial ;
- l’ambiance snack moderne ;
- les éléments visibles de menu ;
- la façon de présenter l’offre ;
- l’essence générale de la marque.

Le site Pizza de Nuit ne doit jamais écraser :

- les règles métier confirmées ;
- le fonctionnement à emporter ;
- l’absence de paiement sur borne ;
- l’impression du ticket ;
- le paiement au comptoir ;
- les consignes présentes dans les documents du projet.

Si une donnée métier n’est pas présente dans les documents ou sur le site officiel, Codex doit écrire exactement :

`Information à confirmer.`

Codex ne doit jamais inventer :

- un produit ;
- un prix ;
- une offre ;
- une adresse ;
- un horaire ;
- une règle de moitié-moitié ;
- un supplément ;
- une boisson ;
- un dessert ;
- une méthode d’impression ;
- une fonctionnalité de paiement.

---

## 3. Résumé du fonctionnement métier

Le fonctionnement réel de la borne est strictement celui-ci :

Commande sur borne  
→ Validation de la commande  
→ Impression du ticket  
→ Présentation du ticket au comptoir  
→ Paiement au comptoir  
→ Préparation de la commande à emporter

La borne sert uniquement à préparer une commande à emporter.

La borne ne remplace pas la caisse.

La borne ne gère jamais l’encaissement.

La borne ne propose jamais de livraison.

La borne ne propose jamais de consommation sur place.

La borne ne propose jamais de réservation.

La borne ne demande pas de compte client obligatoire.

La base de données doit donc stocker uniquement ce qui est utile pour :

- afficher le menu ;
- gérer les produits ;
- gérer les formats ;
- gérer les prix ;
- gérer les suppléments ;
- gérer les disponibilités ;
- enregistrer les commandes validées ;
- générer un numéro de commande ;
- générer un ticket ;
- tracer les impressions et réimpressions ;
- permettre une administration simple.

La base de données ne doit contenir aucune logique de paiement en ligne.

Elle ne doit stocker aucune donnée bancaire.

---

## 4. Stratégie de base de données recommandée

### 4.1 Stratégie globale

Le projet doit rester simple au démarrage.

`DATABASE_SCHEMA.md` décrit une cible complète et évolutive.

Il ne doit pas être interprété comme une obligation d’implémenter toutes les tables dès la V1.

Pour la V1, ne pas implémenter tout le schéma `DATABASE_SCHEMA.md`.

La V1 doit commencer simplement avec :

- des fichiers typés dans `/src/data` ;
- des types centralisés dans `/src/types` ;
- une logique métier claire ;
- des données structurées et remplaçables ;
- aucune base de données lourde au départ ;
- aucune implémentation complète de toutes les tables ;
- aucune migration complète ;
- aucune surarchitecture.

La persistance des commandes ne doit être ajoutée que si nécessaire.

La stratégie recommandée est progressive :

1. commencer avec des fichiers typés dans `/src/data` ;
2. centraliser les types dans `/src/types` ;
3. isoler l’accès aux données dans des services ou repositories simples ;
4. ajouter une persistance locale uniquement si nécessaire ;
5. envisager SQLite plus tard si le besoin est confirmé.

Cette approche permet de démarrer vite sans enfermer le projet dans une stack lourde.

---

### 4.2 Démarrage avec fichiers typés

Au démarrage, Codex peut utiliser des fichiers structurés :

- `/src/data/categories.ts`
- `/src/data/products.ts`
- `/src/data/formats.ts`
- `/src/data/bases.ts`
- `/src/data/ingredients.ts`
- `/src/data/supplements.ts`
- `/src/data/settings.ts`

Cette solution est adaptée si :

- le menu est encore en cours de validation ;
- la base de données définitive n’est pas encore choisie ;
- l’objectif est de construire rapidement l’interface de borne ;
- les produits réels ne sont pas encore totalement confirmés ;
- l’admin n’a pas encore besoin de modifier les données en production.

Les fichiers typés ne doivent pas devenir des composants UI.

Ils doivent rester des sources de données structurées et remplaçables.

---

### 4.3 Évolution vers SQLite

SQLite est recommandé si l’application doit fonctionner localement sur la borne avec une persistance simple.

SQLite est adapté pour :

- enregistrer les commandes ;
- conserver un historique simple ;
- gérer les tickets ;
- tracer les réimpressions ;
- gérer les disponibilités ;
- modifier les prix depuis une admin simple ;
- stocker les réglages de borne ;
- fonctionner sans dépendance cloud lourde.

SQLite doit rester simple.

Codex ne doit pas ajouter Prisma, PostgreSQL, Supabase, Firebase, MySQL, MongoDB ou une autre stack lourde sans demande explicite.

---

### 4.4 Backend minimal

Le backend doit rester limité aux besoins suivants :

- charger le menu ;
- charger les réglages ;
- créer une commande ;
- consulter les commandes ;
- consulter une commande ;
- préparer une réimpression ;
- vérifier l’état de l’application.

Routes API minimales à soutenir :

- `GET /api/menu`
- `GET /api/settings`
- `POST /api/orders`
- `GET /api/orders`
- `GET /api/orders/:id`
- `POST /api/orders/:id/reprint`
- `GET /api/health`

Aucune route de paiement ne doit être créée.

---

## 5. Principes de modélisation

### 5.1 Principes obligatoires

La base de données doit respecter les principes suivants :

- aucune donnée critique codée en dur dans l’UI ;
- produits configurables ;
- catégories configurables ;
- formats configurables ;
- prix configurables ;
- bases configurables ;
- ingrédients configurables ;
- suppléments configurables ;
- options configurables ;
- disponibilités configurables ;
- commandes persistantes ;
- tickets persistants ;
- réimpressions traçables ;
- règles métier séparées de l’interface ;
- statuts simples ;
- relations explicites ;
- données exploitables par TypeScript ;
- compatibilité avec une admin simple ;
- compatibilité avec une impression locale ;
- aucun paiement sur borne ;
- aucune donnée bancaire ;
- aucune livraison ;
- aucune réservation ;
- aucun compte client obligatoire.

---

### 5.2 Données à centraliser

Les données suivantes doivent être centralisées :

- produits ;
- catégories ;
- formats ;
- bases ;
- ingrédients ;
- allergènes ;
- suppléments ;
- options ;
- compatibilités ;
- prix ;
- disponibilités ;
- commandes ;
- tickets ;
- réglages borne ;
- réglages ticket.

Elles ne doivent pas être dispersées dans les composants React.

---

### 5.3 Prix

Les prix doivent être stockés en centimes.

Exemple :

- 10 € = `1000`
- 15 € = `1500`
- 20 € = `2000`
- 30 € = `3000`

La devise doit être stockée séparément avec la valeur :

`EUR`

Les prix ne doivent jamais être stockés sous forme de texte comme `10€`.

L’affichage en euros doit être géré par une fonction dédiée côté application.

---

### 5.4 Snapshots de commande

Les commandes doivent conserver des snapshots des informations importantes.

Exemple :

- nom du produit au moment de la commande ;
- nom du format au moment de la commande ;
- nom de la base au moment de la commande ;
- nom du supplément au moment de la commande ;
- prix au moment de la commande.

Objectif :

Si un produit ou un prix est modifié plus tard dans l’admin, les anciennes commandes doivent rester lisibles et cohérentes.

---

## 6. Vue globale des entités

### 6.1 Tables indispensables

Les tables indispensables sont :

- `stores`
- `settings`
- `categories`
- `products`
- `pizza_bases`
- `pizza_formats`
- `product_formats`
- `product_prices`
- `ingredients`
- `product_ingredients`
- `supplements`
- `product_supplements`
- `category_supplements`
- `format_supplements`
- `orders`
- `order_items`
- `order_item_supplements`
- `order_item_options`
- `tickets`
- `ticket_prints`
- `admin_users`

---

### 6.2 Tables importantes

Les tables importantes sont :

- `allergens`
- `ingredient_allergens`
- `options`
- `product_options`
- `half_half_items`
- `activity_logs`

---

### 6.3 Tables optionnelles

Les tables optionnelles sont :

- `store_hours`
- `stock_events`
- `admin_sessions`
- `menu_versions`

Ces tables ne doivent être créées que si le besoin est confirmé.

---

## 7. Schéma des tables

---

## 7.1 Table `stores`

### Rôle

La table `stores` stocke les informations du point de vente.

Même si le projet démarre avec un seul snack, cette table permet de garder une structure propre et évolutive.

### Priorité

Indispensable.

### Champs

| Champ | Type conseillé | Nullable | Défaut | Rôle |
|---|---|---:|---|---|
| `id` | string / uuid | non | généré | Identifiant unique |
| `name` | string | non | `Pizza de Nuit` | Nom du point de vente |
| `slug` | string | non | - | Slug unique |
| `address` | string | oui | null | Adresse du point de vente |
| `city` | string | oui | null | Ville du point de vente |
| `phone` | string | oui | null | Numéro de téléphone |
| `is_active` | boolean | non | true | Point de vente actif |
| `created_at` | datetime | non | now | Date de création |
| `updated_at` | datetime | non | now | Date de modification |

### Contraintes

- `id` est la clé primaire.
- `slug` doit être unique.
- `name` ne doit pas être vide.

### Remarques métier

Adresse exacte :

`Information à confirmer.`

Ville exacte de la borne :

`Information à confirmer.`

Numéro de téléphone :

`Information à confirmer.`

---

## 7.2 Table `settings`

### Rôle

La table `settings` stocke les réglages généraux de la borne et du ticket.

### Priorité

Indispensable.

### Champs

| Champ | Type conseillé | Nullable | Défaut | Rôle |
|---|---|---:|---|---|
| `id` | string / uuid | non | généré | Identifiant unique |
| `store_id` | string / uuid | non | - | Point de vente lié |
| `kiosk_mode` | boolean | non | true | Active le mode borne |
| `maintenance_mode` | boolean | non | false | Bloque les commandes si actif |
| `inactivity_timeout_seconds` | integer | non | 90 | Timeout d’inactivité |
| `return_home_delay_seconds` | integer | non | 8 | Retour accueil après confirmation |
| `ticket_message` | string | non | message obligatoire | Message imprimé sur le ticket |
| `print_mode` | string | non | `browser_print` | Mode d’impression |
| `created_at` | datetime | non | now | Date de création |
| `updated_at` | datetime | non | now | Date de modification |

### Contraintes

- `store_id` référence `stores.id`.
- `print_mode` doit rester simple.

Valeurs possibles pour `print_mode` :

- `browser_print`
- `print_window`
- `local_printer`

Le mode `local_printer` ne doit être activé que si le matériel est confirmé.

### Message ticket par défaut

`Présentez ce ticket au comptoir pour régler votre commande.`

---

## 7.3 Table `categories`

### Rôle

La table `categories` stocke les familles de produits affichées sur la borne.

### Priorité

Indispensable.

### Champs

| Champ | Type conseillé | Nullable | Défaut | Rôle |
|---|---|---:|---|---|
| `id` | string / uuid | non | généré | Identifiant unique |
| `name` | string | non | - | Nom affiché |
| `slug` | string | non | - | Slug unique |
| `description` | string | oui | null | Description courte |
| `type` | string | non | - | Type de catégorie |
| `image_url` | string | oui | null | Image de catégorie |
| `icon` | string | oui | null | Icône |
| `is_available` | boolean | non | true | Catégorie disponible |
| `display_order` | integer | non | 0 | Ordre d’affichage |
| `created_at` | datetime | non | now | Date de création |
| `updated_at` | datetime | non | now | Date de modification |

### Types possibles

- `pizza_tomato`
- `pizza_cream`
- `pizza_special`
- `custom_pizza`
- `drink`
- `dessert`
- `side`
- `sauce`

### Catégories à prévoir dans la structure

- pizzas base tomate ;
- pizzas base crème fraîche ;
- pizzas spéciales ;
- pizzas à composer si confirmé ;
- boissons ;
- desserts si confirmés ;
- accompagnements si confirmés ;
- sauces si confirmées.

### Contraintes

- `slug` doit être unique.
- `display_order` doit permettre un tri stable.
- Une catégorie indisponible ne doit pas être sélectionnable si aucun produit n’est disponible.

### Remarque métier

Les catégories définitives doivent être confirmées avec la carte officielle Pizza de Nuit.

---

## 7.4 Table `products`

### Rôle

La table `products` stocke les pizzas, boissons, desserts, accompagnements, sauces et autres produits simples.

### Priorité

Indispensable.

### Champs

| Champ | Type conseillé | Nullable | Défaut | Rôle |
|---|---|---:|---|---|
| `id` | string / uuid | non | généré | Identifiant unique |
| `category_id` | string / uuid | non | - | Catégorie liée |
| `name` | string | non | - | Nom du produit |
| `slug` | string | non | - | Slug unique |
| `description` | string | oui | null | Description courte |
| `product_type` | string | non | - | Type de produit |
| `image_url` | string | oui | null | Image produit |
| `base_id` | string / uuid | oui | null | Base pizza si applicable |
| `is_available` | boolean | non | true | Disponibilité |
| `is_featured` | boolean | non | false | Mise en avant |
| `badge` | string | oui | null | Badge commercial |
| `display_order` | integer | non | 0 | Ordre d’affichage |
| `created_at` | datetime | non | now | Date de création |
| `updated_at` | datetime | non | now | Date de modification |

### Types possibles

- `pizza`
- `drink`
- `dessert`
- `side`
- `sauce`
- `custom_pizza`

### Contraintes

- `category_id` référence `categories.id`.
- `base_id` référence `pizza_bases.id`, nullable pour les produits non pizza.
- `slug` doit être unique.
- Un produit indisponible ne doit pas être ajoutable au panier.
- Un produit ne doit pas être supprimé silencieusement s’il existe dans des commandes historiques.

### Remarques métier

Les produits exacts doivent venir d’une source validée.

Si la carte officielle n’est pas disponible :

`Information à confirmer.`

Codex ne doit pas inventer la carte Pizza de Nuit.

---

## 7.5 Table `pizza_bases`

### Rôle

La table `pizza_bases` stocke les bases de pizza.

### Priorité

Indispensable.

### Champs

| Champ | Type conseillé | Nullable | Défaut | Rôle |
|---|---|---:|---|---|
| `id` | string / uuid | non | généré | Identifiant unique |
| `name` | string | non | - | Nom de la base |
| `slug` | string | non | - | Slug unique |
| `is_available` | boolean | non | true | Disponibilité |
| `display_order` | integer | non | 0 | Ordre d’affichage |
| `created_at` | datetime | non | now | Date de création |
| `updated_at` | datetime | non | now | Date de modification |

### Bases à prévoir

- tomate ;
- crème fraîche ;
- autre base uniquement si confirmée.

### Contraintes

- `slug` doit être unique.
- Une base indisponible ne doit pas être sélectionnable.

### Remarque métier

La base doit être une donnée structurée.

Elle ne doit pas exister uniquement dans une description texte.

---

## 7.6 Table `pizza_formats`

### Rôle

La table `pizza_formats` stocke les formats de pizzas disponibles.

### Priorité

Indispensable.

### Champs

| Champ | Type conseillé | Nullable | Défaut | Rôle |
|---|---|---:|---|---|
| `id` | string / uuid | non | généré | Identifiant unique |
| `label` | string | non | - | Libellé affiché |
| `slug` | string | non | - | Slug unique |
| `description` | string | oui | null | Description courte |
| `size_value` | string | oui | null | Valeur de taille |
| `size_unit` | string | oui | null | Unité |
| `is_large_format` | boolean | non | false | Grand format |
| `supports_half_half` | boolean | non | false | Compatible moitié-moitié |
| `is_available` | boolean | non | true | Disponibilité |
| `badge` | string | oui | null | Badge |
| `display_order` | integer | non | 0 | Ordre d’affichage |
| `created_at` | datetime | non | now | Date de création |
| `updated_at` | datetime | non | now | Date de modification |

### Formats à prévoir

- 31 cm ;
- 40 cm ;
- 1/2 mètre ;
- 60 cm.

### Prix initiaux de configuration

Sous réserve de confirmation finale :

- 31 cm : 10 € ;
- 40 cm : 15 € ;
- 1/2 mètre : 20 € ;
- 60 cm : 30 €.

### Contraintes

- `slug` doit être unique.
- Les prix ne doivent pas être stockés uniquement dans `pizza_formats` si un produit peut avoir des prix différents selon le format.
- La table `product_prices` doit gérer les prix par produit et par format.

### Remarque métier

Les grands formats peuvent être valorisés avec des badges :

- `Format géant`
- `À partager`

---

## 7.7 Table `product_formats`

### Rôle

La table `product_formats` définit quels formats sont disponibles pour quels produits.

### Priorité

Indispensable.

### Champs

| Champ | Type conseillé | Nullable | Défaut | Rôle |
|---|---|---:|---|---|
| `id` | string / uuid | non | généré | Identifiant unique |
| `product_id` | string / uuid | non | - | Produit lié |
| `format_id` | string / uuid | non | - | Format lié |
| `is_available` | boolean | non | true | Compatibilité active |
| `created_at` | datetime | non | now | Date de création |
| `updated_at` | datetime | non | now | Date de modification |

### Contraintes

- `product_id` référence `products.id`.
- `format_id` référence `pizza_formats.id`.
- Le couple `product_id + format_id` doit être unique.

### Remarque métier

Un format non compatible avec un produit doit être masqué ou désactivé dans l’interface.

Il ne doit jamais être sélectionnable.

---

## 7.8 Table `product_prices`

### Rôle

La table `product_prices` stocke les prix des produits.

Pour une pizza, le prix dépend généralement du format.

Pour un produit simple, le prix peut exister sans format.

### Priorité

Indispensable.

### Champs

| Champ | Type conseillé | Nullable | Défaut | Rôle |
|---|---|---:|---|---|
| `id` | string / uuid | non | généré | Identifiant unique |
| `product_id` | string / uuid | non | - | Produit lié |
| `format_id` | string / uuid | oui | null | Format lié si pizza |
| `price_cents` | integer | non | - | Prix en centimes |
| `currency` | string | non | `EUR` | Devise |
| `is_active` | boolean | non | true | Prix actif |
| `created_at` | datetime | non | now | Date de création |
| `updated_at` | datetime | non | now | Date de modification |

### Contraintes

- `product_id` référence `products.id`.
- `format_id` référence `pizza_formats.id`, nullable pour produits simples.
- `price_cents` doit être supérieur ou égal à 0.
- `currency` doit valoir `EUR` au démarrage.

### Remarque technique

Les prix doivent être stockés en centimes pour éviter les erreurs d’arrondi.

L’affichage en euros doit être fait côté application avec une fonction dédiée.

---

## 7.9 Table `ingredients`

### Rôle

La table `ingredients` stocke les ingrédients.

### Priorité

Indispensable.

### Champs

| Champ | Type conseillé | Nullable | Défaut | Rôle |
|---|---|---:|---|---|
| `id` | string / uuid | non | généré | Identifiant unique |
| `name` | string | non | - | Nom de l’ingrédient |
| `slug` | string | non | - | Slug unique |
| `is_available` | boolean | non | true | Disponibilité |
| `display_order` | integer | non | 0 | Ordre d’affichage |
| `created_at` | datetime | non | now | Date de création |
| `updated_at` | datetime | non | now | Date de modification |

### Contraintes

- `slug` doit être unique.
- Un ingrédient indisponible peut rendre certaines options indisponibles.

### Remarque métier

Les ingrédients exacts doivent être confirmés avec la carte officielle.

---

## 7.10 Table `allergens`

### Rôle

La table `allergens` stocke les allergènes.

### Priorité

Important.

### Champs

| Champ | Type conseillé | Nullable | Défaut | Rôle |
|---|---|---:|---|---|
| `id` | string / uuid | non | généré | Identifiant unique |
| `name` | string | non | - | Nom de l’allergène |
| `slug` | string | non | - | Slug unique |
| `description` | string | oui | null | Description |
| `created_at` | datetime | non | now | Date de création |
| `updated_at` | datetime | non | now | Date de modification |

### Contraintes

- `slug` doit être unique.

### Remarque métier

Les allergènes doivent être renseignés uniquement avec des données fiables.

Si l’information n’est pas disponible :

`Information à confirmer.`

---

## 7.11 Table `product_ingredients`

### Rôle

La table `product_ingredients` relie les produits aux ingrédients.

### Priorité

Indispensable.

### Champs

| Champ | Type conseillé | Nullable | Défaut | Rôle |
|---|---|---:|---|---|
| `id` | string / uuid | non | généré | Identifiant unique |
| `product_id` | string / uuid | non | - | Produit lié |
| `ingredient_id` | string / uuid | non | - | Ingrédient lié |
| `is_removable` | boolean | non | false | Peut être retiré |
| `is_default` | boolean | non | true | Ingrédient par défaut |
| `display_order` | integer | non | 0 | Ordre d’affichage |
| `created_at` | datetime | non | now | Date de création |
| `updated_at` | datetime | non | now | Date de modification |

### Contraintes

- `product_id` référence `products.id`.
- `ingredient_id` référence `ingredients.id`.
- Le couple `product_id + ingredient_id` doit être unique.

---

## 7.12 Table `ingredient_allergens`

### Rôle

La table `ingredient_allergens` relie les ingrédients aux allergènes.

### Priorité

Important.

### Champs

| Champ | Type conseillé | Nullable | Défaut | Rôle |
|---|---|---:|---|---|
| `id` | string / uuid | non | généré | Identifiant unique |
| `ingredient_id` | string / uuid | non | - | Ingrédient lié |
| `allergen_id` | string / uuid | non | - | Allergène lié |

### Contraintes

- `ingredient_id` référence `ingredients.id`.
- `allergen_id` référence `allergens.id`.
- Le couple `ingredient_id + allergen_id` doit être unique.

---

## 7.13 Table `supplements`

### Rôle

La table `supplements` stocke les suppléments payants ou configurables.

### Priorité

Indispensable.

### Champs

| Champ | Type conseillé | Nullable | Défaut | Rôle |
|---|---|---:|---|---|
| `id` | string / uuid | non | généré | Identifiant unique |
| `name` | string | non | - | Nom du supplément |
| `slug` | string | non | - | Slug unique |
| `description` | string | oui | null | Description courte |
| `price_cents` | integer | non | 0 | Prix en centimes |
| `currency` | string | non | `EUR` | Devise |
| `is_available` | boolean | non | true | Disponibilité |
| `max_quantity` | integer | non | 1 | Quantité maximale |
| `display_order` | integer | non | 0 | Ordre d’affichage |
| `created_at` | datetime | non | now | Date de création |
| `updated_at` | datetime | non | now | Date de modification |

### Suppléments à prévoir dans la structure

- cheesy crust ;
- ingrédient supplémentaire ;
- fromage supplémentaire ;
- sauce ;
- option épicée ;
- autres suppléments à confirmer.

### Contraintes

- `slug` doit être unique.
- `price_cents` doit être supérieur ou égal à 0.
- `max_quantity` doit être supérieur ou égal à 1.

### Remarque métier

Un supplément ne doit pas être disponible partout par défaut.

Sa compatibilité doit être contrôlée par les tables de liaison.

---

## 7.14 Table `product_supplements`

### Rôle

La table `product_supplements` définit la compatibilité entre un supplément et un produit.

### Priorité

Indispensable.

### Champs

| Champ | Type conseillé | Nullable | Défaut | Rôle |
|---|---|---:|---|---|
| `id` | string / uuid | non | généré | Identifiant unique |
| `product_id` | string / uuid | non | - | Produit lié |
| `supplement_id` | string / uuid | non | - | Supplément lié |
| `is_available` | boolean | non | true | Compatibilité active |
| `created_at` | datetime | non | now | Date de création |
| `updated_at` | datetime | non | now | Date de modification |

### Contraintes

- `product_id` référence `products.id`.
- `supplement_id` référence `supplements.id`.
- Le couple `product_id + supplement_id` doit être unique.

---

## 7.15 Table `category_supplements`

### Rôle

La table `category_supplements` définit la compatibilité entre un supplément et une catégorie.

### Priorité

Indispensable.

### Champs

| Champ | Type conseillé | Nullable | Défaut | Rôle |
|---|---|---:|---|---|
| `id` | string / uuid | non | généré | Identifiant unique |
| `category_id` | string / uuid | non | - | Catégorie liée |
| `supplement_id` | string / uuid | non | - | Supplément lié |
| `is_available` | boolean | non | true | Compatibilité active |
| `created_at` | datetime | non | now | Date de création |
| `updated_at` | datetime | non | now | Date de modification |

### Contraintes

- `category_id` référence `categories.id`.
- `supplement_id` référence `supplements.id`.
- Le couple `category_id + supplement_id` doit être unique.

---

## 7.16 Table `format_supplements`

### Rôle

La table `format_supplements` définit la compatibilité entre un supplément et un format.

### Priorité

Indispensable.

### Champs

| Champ | Type conseillé | Nullable | Défaut | Rôle |
|---|---|---:|---|---|
| `id` | string / uuid | non | généré | Identifiant unique |
| `format_id` | string / uuid | non | - | Format lié |
| `supplement_id` | string / uuid | non | - | Supplément lié |
| `is_available` | boolean | non | true | Compatibilité active |
| `created_at` | datetime | non | now | Date de création |
| `updated_at` | datetime | non | now | Date de modification |

### Contraintes

- `format_id` référence `pizza_formats.id`.
- `supplement_id` référence `supplements.id`.
- Le couple `format_id + supplement_id` doit être unique.

---

## 7.17 Table `options`

### Rôle

La table `options` stocke les options non assimilables à un supplément payant.

Exemples :

- retirer un ingrédient ;
- option épicée si gratuite ;
- instruction simple autorisée ;
- choix interne non payant.

### Priorité

Important.

### Champs

| Champ | Type conseillé | Nullable | Défaut | Rôle |
|---|---|---:|---|---|
| `id` | string / uuid | non | généré | Identifiant unique |
| `name` | string | non | - | Nom de l’option |
| `slug` | string | non | - | Slug unique |
| `description` | string | oui | null | Description courte |
| `option_type` | string | non | - | Type d’option |
| `is_available` | boolean | non | true | Disponibilité |
| `display_order` | integer | non | 0 | Ordre d’affichage |
| `created_at` | datetime | non | now | Date de création |
| `updated_at` | datetime | non | now | Date de modification |

### Types possibles

- `remove_ingredient`
- `free_choice`
- `spicy_level`
- `instruction`

### Contraintes

- `slug` doit être unique.
- Les options ne doivent pas créer de formulaire long.

---

## 7.18 Table `product_options`

### Rôle

La table `product_options` définit les options disponibles pour un produit.

### Priorité

Important.

### Champs

| Champ | Type conseillé | Nullable | Défaut | Rôle |
|---|---|---:|---|---|
| `id` | string / uuid | non | généré | Identifiant unique |
| `product_id` | string / uuid | non | - | Produit lié |
| `option_id` | string / uuid | non | - | Option liée |
| `is_available` | boolean | non | true | Compatibilité active |
| `created_at` | datetime | non | now | Date de création |
| `updated_at` | datetime | non | now | Date de modification |

### Contraintes

- `product_id` référence `products.id`.
- `option_id` référence `options.id`.
- Le couple `product_id + option_id` doit être unique.

---

## 7.19 Table `orders`

### Rôle

La table `orders` stocke les commandes validées sur la borne.

### Priorité

Indispensable.

### Champs

| Champ | Type conseillé | Nullable | Défaut | Rôle |
|---|---|---:|---|---|
| `id` | string / uuid | non | généré | Identifiant unique |
| `order_number` | string | non | généré | Numéro visible client |
| `store_id` | string / uuid | non | - | Point de vente lié |
| `order_type` | string | non | `takeaway` | Type de commande |
| `subtotal_cents` | integer | non | 0 | Sous-total |
| `total_cents` | integer | non | 0 | Total |
| `currency` | string | non | `EUR` | Devise |
| `order_status` | string | non | `created` | Statut commande |
| `payment_status` | string | non | `awaiting_counter_payment` | Statut paiement comptoir |
| `print_status` | string | non | `not_started` | Statut impression |
| `ticket_print_count` | integer | non | 0 | Nombre d’impressions |
| `created_at` | datetime | non | now | Date de création |
| `updated_at` | datetime | non | now | Date de modification |
| `cancelled_at` | datetime | oui | null | Date d’annulation |

### Valeur obligatoire de `order_type`

- `takeaway`

### Statuts de commande

- `created`
- `ticket_printed`
- `awaiting_counter_payment`
- `paid_at_counter`
- `in_preparation`
- `ready`
- `handed_to_customer`
- `cancelled`

### Statuts de paiement

- `awaiting_counter_payment`
- `paid_at_counter`
- `cancelled`

### Statuts d’impression

- `not_started`
- `printing`
- `printed`
- `failed`
- `reprinted`

### Contraintes

- `order_number` doit être unique.
- `store_id` référence `stores.id`.
- `order_type` doit toujours être `takeaway`.
- `subtotal_cents` doit être supérieur ou égal à 0.
- `total_cents` doit être supérieur ou égal à 0.
- `currency` doit valoir `EUR` au démarrage.
- `payment_status` ne doit jamais correspondre à un paiement sur borne.

### Remarque métier

Le champ `payment_status` sert uniquement au suivi opérationnel du paiement au comptoir.

Il ne doit déclencher aucun encaissement.

---

## 7.20 Table `order_items`

### Rôle

La table `order_items` stocke les lignes de commande.

### Priorité

Indispensable.

### Champs

| Champ | Type conseillé | Nullable | Défaut | Rôle |
|---|---|---:|---|---|
| `id` | string / uuid | non | généré | Identifiant unique |
| `order_id` | string / uuid | non | - | Commande liée |
| `product_id` | string / uuid | oui | null | Produit source |
| `product_name_snapshot` | string | non | - | Nom produit au moment de la commande |
| `product_type` | string | non | - | Type de produit |
| `format_id` | string / uuid | oui | null | Format source |
| `format_label_snapshot` | string | oui | null | Format affiché au moment de la commande |
| `base_id` | string / uuid | oui | null | Base source |
| `base_label_snapshot` | string | oui | null | Base affichée au moment de la commande |
| `quantity` | integer | non | 1 | Quantité |
| `unit_price_cents` | integer | non | 0 | Prix unitaire |
| `line_total_cents` | integer | non | 0 | Total ligne |
| `notes` | string | oui | null | Note simple si autorisée |
| `created_at` | datetime | non | now | Date de création |

### Contraintes

- `order_id` référence `orders.id`.
- `product_id` référence `products.id`, nullable pour conserver l’historique si le produit est supprimé plus tard.
- `format_id` référence `pizza_formats.id`, nullable pour produits simples.
- `base_id` référence `pizza_bases.id`, nullable pour produits simples.
- `quantity` doit être supérieur à 0.
- `unit_price_cents` doit être supérieur ou égal à 0.
- `line_total_cents` doit être supérieur ou égal à 0.

### Remarque métier

Les champs snapshot sont obligatoires pour conserver une commande lisible même si le menu est modifié plus tard.

---

## 7.21 Table `order_item_supplements`

### Rôle

La table `order_item_supplements` stocke les suppléments réellement choisis dans une ligne de commande.

### Priorité

Indispensable.

### Champs

| Champ | Type conseillé | Nullable | Défaut | Rôle |
|---|---|---:|---|---|
| `id` | string / uuid | non | généré | Identifiant unique |
| `order_item_id` | string / uuid | non | - | Ligne liée |
| `supplement_id` | string / uuid | oui | null | Supplément source |
| `supplement_name_snapshot` | string | non | - | Nom au moment de la commande |
| `quantity` | integer | non | 1 | Quantité |
| `unit_price_cents` | integer | non | 0 | Prix unitaire |
| `total_price_cents` | integer | non | 0 | Total supplément |

### Contraintes

- `order_item_id` référence `order_items.id`.
- `supplement_id` référence `supplements.id`, nullable pour historique.
- `quantity` doit être supérieur à 0.
- `unit_price_cents` doit être supérieur ou égal à 0.
- `total_price_cents` doit être supérieur ou égal à 0.

---

## 7.22 Table `order_item_options`

### Rôle

La table `order_item_options` stocke les options choisies dans une ligne de commande.

### Priorité

Indispensable.

### Champs

| Champ | Type conseillé | Nullable | Défaut | Rôle |
|---|---|---:|---|---|
| `id` | string / uuid | non | généré | Identifiant unique |
| `order_item_id` | string / uuid | non | - | Ligne liée |
| `option_id` | string / uuid | oui | null | Option source |
| `option_name_snapshot` | string | non | - | Nom au moment de la commande |
| `value` | string | oui | null | Valeur de l’option |
| `created_at` | datetime | non | now | Date de création |

### Contraintes

- `order_item_id` référence `order_items.id`.
- `option_id` référence `options.id`, nullable pour historique.

---

## 7.23 Table `half_half_items`

### Rôle

La table `half_half_items` stocke les informations d’une pizza moitié-moitié.

### Priorité

Important.

### Activation

Cette table peut être prévue dans le schéma, mais la fonctionnalité ne doit pas être activée sans confirmation du gérant.

### Champs

| Champ | Type conseillé | Nullable | Défaut | Rôle |
|---|---|---:|---|---|
| `id` | string / uuid | non | généré | Identifiant unique |
| `order_item_id` | string / uuid | non | - | Ligne de commande liée |
| `left_product_id` | string / uuid | oui | null | Pizza moitié gauche |
| `left_product_name_snapshot` | string | non | - | Nom moitié gauche |
| `right_product_id` | string / uuid | oui | null | Pizza moitié droite |
| `right_product_name_snapshot` | string | non | - | Nom moitié droite |
| `format_id` | string / uuid | oui | null | Format source |
| `format_label_snapshot` | string | non | - | Format affiché |
| `base_id` | string / uuid | oui | null | Base source |
| `base_label_snapshot` | string | oui | null | Base affichée |
| `pricing_rule` | string | oui | null | Règle de calcul utilisée |
| `calculated_price_cents` | integer | non | 0 | Prix calculé |
| `created_at` | datetime | non | now | Date de création |

### Contraintes

- `order_item_id` référence `order_items.id`.
- `left_product_id` référence `products.id`.
- `right_product_id` référence `products.id`.
- `format_id` référence `pizza_formats.id`.
- `base_id` référence `pizza_bases.id`.
- `calculated_price_cents` doit être supérieur ou égal à 0.

### Règles métier

La moitié-moitié doit vérifier :

- deux moitiés sélectionnées ;
- format compatible ;
- base identique si la règle est confirmée ;
- produits disponibles ;
- prix calculable ;
- affichage clair dans le panier ;
- affichage clair sur le ticket.

Règle de calcul moitié-moitié :

`Information à confirmer.`

Disponibilité moitié-moitié :

`Information à confirmer.`

---

## 7.24 Table `tickets`

### Rôle

La table `tickets` stocke les tickets générés à partir des commandes.

### Priorité

Indispensable.

### Champs

| Champ | Type conseillé | Nullable | Défaut | Rôle |
|---|---|---:|---|---|
| `id` | string / uuid | non | généré | Identifiant unique |
| `order_id` | string / uuid | non | - | Commande liée |
| `ticket_number` | string | non | généré | Numéro ticket |
| `content_snapshot` | text / json | non | - | Contenu figé du ticket |
| `customer_message` | string | non | message obligatoire | Message client |
| `print_status` | string | non | `not_started` | Statut impression |
| `print_count` | integer | non | 0 | Nombre d’impressions |
| `created_at` | datetime | non | now | Date de création |
| `updated_at` | datetime | non | now | Date de modification |

### Contraintes

- `order_id` référence `orders.id`.
- `ticket_number` doit être unique.
- `print_count` doit être supérieur ou égal à 0.

### Message ticket obligatoire

`Présentez ce ticket au comptoir pour régler votre commande.`

### Contenu interdit sur le ticket

Le ticket ne doit jamais contenir :

- lien de paiement ;
- QR code de paiement ;
- indication de paiement en ligne ;
- adresse de livraison ;
- frais de livraison ;
- numéro de table ;
- réservation ;
- compte client obligatoire.

---

## 7.25 Table `ticket_prints`

### Rôle

La table `ticket_prints` trace chaque impression ou réimpression de ticket.

### Priorité

Indispensable.

### Champs

| Champ | Type conseillé | Nullable | Défaut | Rôle |
|---|---|---:|---|---|
| `id` | string / uuid | non | généré | Identifiant unique |
| `ticket_id` | string / uuid | non | - | Ticket lié |
| `order_id` | string / uuid | non | - | Commande liée |
| `print_type` | string | non | `initial` | Type d’impression |
| `print_status` | string | non | `printing` | Statut |
| `printed_at` | datetime | oui | null | Date impression réussie |
| `error_message` | string | oui | null | Erreur éventuelle |
| `created_at` | datetime | non | now | Date de création |

### Types d’impression

- `initial`
- `reprint`

### Statuts possibles

- `printing`
- `printed`
- `failed`

### Contraintes

- `ticket_id` référence `tickets.id`.
- `order_id` référence `orders.id`.

### Remarque métier

Une réimpression ne doit pas créer une nouvelle commande.

Elle doit conserver le même numéro de commande.

---

## 7.26 Table `admin_users`

### Rôle

La table `admin_users` stocke les accès simples à l’interface d’administration.

### Priorité

Indispensable.

### Champs

| Champ | Type conseillé | Nullable | Défaut | Rôle |
|---|---|---:|---|---|
| `id` | string / uuid | non | généré | Identifiant unique |
| `username` | string | non | - | Identifiant admin |
| `password_hash` | string | non | - | Mot de passe hashé |
| `role` | string | non | `admin` | Rôle simple |
| `is_active` | boolean | non | true | Compte actif |
| `created_at` | datetime | non | now | Date création |
| `updated_at` | datetime | non | now | Date modification |
| `last_login_at` | datetime | oui | null | Dernière connexion |

### Rôles simples

- `admin`
- `staff`

### Contraintes

- `username` doit être unique.
- Le mot de passe ne doit jamais être stocké en clair.

### Remarque métier

Ne pas créer de système complexe de permissions sans demande explicite.

---

## 7.27 Table `activity_logs`

### Rôle

La table `activity_logs` trace certaines actions importantes de l’admin.

### Priorité

Important.

### Champs

| Champ | Type conseillé | Nullable | Défaut | Rôle |
|---|---|---:|---|---|
| `id` | string / uuid | non | généré | Identifiant unique |
| `actor_id` | string / uuid | oui | null | Admin ayant fait l’action |
| `action` | string | non | - | Action effectuée |
| `entity_type` | string | non | - | Type d’entité |
| `entity_id` | string | oui | null | Identifiant entité |
| `payload` | text / json | oui | null | Détails |
| `created_at` | datetime | non | now | Date de création |

### Actions utiles

- `order_status_updated`
- `ticket_reprinted`
- `product_updated`
- `product_availability_updated`
- `price_updated`
- `settings_updated`

### Contraintes

- `actor_id` référence `admin_users.id`, nullable si action système.

---

## 8. Relations entre les tables

Relations principales :

- `stores` 1--N `settings`
- `stores` 1--N `orders`
- `categories` 1--N `products`
- `pizza_bases` 1--N `products`
- `products` N--N `pizza_formats` via `product_formats`
- `products` 1--N `product_prices`
- `pizza_formats` 1--N `product_prices`
- `products` N--N `ingredients` via `product_ingredients`
- `ingredients` N--N `allergens` via `ingredient_allergens`
- `products` N--N `supplements` via `product_supplements`
- `categories` N--N `supplements` via `category_supplements`
- `pizza_formats` N--N `supplements` via `format_supplements`
- `products` N--N `options` via `product_options`
- `orders` 1--N `order_items`
- `order_items` 1--N `order_item_supplements`
- `order_items` 1--N `order_item_options`
- `order_items` 1--0/1 `half_half_items`
- `orders` 1--1 `tickets`
- `tickets` 1--N `ticket_prints`
- `admin_users` 1--N `activity_logs`

---

## 9. Diagramme relationnel textuel

stores 1--N settings  
stores 1--N orders  

categories 1--N products  
pizza_bases 1--N products  

products N--N pizza_formats via product_formats  
products 1--N product_prices  
pizza_formats 1--N product_prices  

products N--N ingredients via product_ingredients  
ingredients N--N allergens via ingredient_allergens  

products N--N supplements via product_supplements  
categories N--N supplements via category_supplements  
pizza_formats N--N supplements via format_supplements  

products N--N options via product_options  

orders 1--N order_items  
order_items 1--N order_item_supplements  
order_items 1--N order_item_options  
order_items 1--0/1 half_half_items  

orders 1--1 tickets  
tickets 1--N ticket_prints  

admin_users 1--N activity_logs  

---

## 10. Règles de prix

### 10.1 Stockage des prix

Tous les prix doivent être stockés en centimes.

Exemples :

- 10 € = `1000`
- 15 € = `1500`
- 20 € = `2000`
- 30 € = `3000`

La devise doit être `EUR`.

Les prix ne doivent jamais être stockés sous forme de texte.

---

### 10.2 Pizza classique

Pour une pizza classique :

Total ligne = (prix du format + total suppléments) × quantité

Le prix du format doit venir de `product_prices`.

Les suppléments doivent venir de `supplements`.

Les compatibilités doivent être vérifiées avant calcul.

---

### 10.3 Produit simple

Pour un produit simple :

Total ligne = prix unitaire × quantité

Les produits simples peuvent être :

- boissons ;
- desserts ;
- sauces ;
- accompagnements.

Les produits exacts doivent être confirmés.

---

### 10.4 Pizza moitié-moitié

Pour une moitié-moitié :

Total ligne = prix calculé selon la règle validée + suppléments éventuels

La règle exacte de calcul moitié-moitié est :

`Information à confirmer.`

Codex ne doit pas inventer cette règle.

La table `half_half_items` permet de stocker la structure, mais l’activation dépend de la confirmation métier.

---

### 10.5 Cohérence des totaux

Le total doit être identique :

- dans le panier ;
- dans la validation finale ;
- dans la commande enregistrée ;
- sur le ticket imprimé ;
- dans l’administration.

Aucun calcul de prix ne doit être dispersé dans les composants UI.

Le calcul doit être centralisé dans le module pricing.

---

## 11. Règles de commande

### 11.1 Validation du panier

Avant de créer une commande, le système doit vérifier :

- le panier n’est pas vide ;
- chaque produit existe ;
- chaque produit est disponible ;
- chaque pizza possède un format ;
- chaque format est compatible ;
- chaque supplément est compatible ;
- chaque option est compatible ;
- chaque quantité est valide ;
- chaque total est calculable ;
- la moitié-moitié est complète si utilisée ;
- aucune logique de paiement n’est déclenchée ;
- le type de commande est `takeaway`.

---

### 11.2 Création de commande

Une commande est créée uniquement après validation finale.

La création doit :

1. valider le panier ;
2. générer un identifiant unique ;
3. générer un numéro de commande visible ;
4. enregistrer les lignes de commande ;
5. enregistrer les suppléments ;
6. enregistrer les options ;
7. enregistrer les snapshots utiles ;
8. enregistrer le total ;
9. définir `order_type` à `takeaway` ;
10. définir `payment_status` à `awaiting_counter_payment` ;
11. préparer un ticket ;
12. déclencher l’impression ;
13. réinitialiser la session après confirmation.

---

### 11.3 Statuts de commande

Statuts autorisés :

- `created`
- `ticket_printed`
- `awaiting_counter_payment`
- `paid_at_counter`
- `in_preparation`
- `ready`
- `handed_to_customer`
- `cancelled`

Ces statuts doivent rester simples.

Ils ne doivent pas transformer l’application en caisse complète.

---

### 11.4 Statut paiement

Le statut paiement sert uniquement au suivi du paiement au comptoir.

Statuts autorisés :

- `awaiting_counter_payment`
- `paid_at_counter`
- `cancelled`

Aucun statut ne doit correspondre à un paiement sur borne.

Aucun statut ne doit déclencher :

- Stripe ;
- terminal CB ;
- paiement en ligne ;
- encaissement automatique ;
- stockage de données bancaires.

---

## 12. Règles de ticket

### 12.1 Rôle du ticket

Le ticket est l’élément central entre :

- le client ;
- le comptoir ;
- l’encaissement ;
- la préparation.

Il doit être court, clair et exploitable rapidement.

---

### 12.2 Contenu obligatoire du ticket

Le ticket doit contenir :

- nom `Pizza de Nuit` ;
- numéro de commande ;
- date et heure ;
- mention `Commande à emporter` ;
- détail des produits ;
- formats ;
- bases ;
- options ;
- suppléments ;
- quantités ;
- total ;
- mention `Paiement au comptoir` ;
- message client.

Message client obligatoire :

`Présentez ce ticket au comptoir pour régler votre commande.`

---

### 12.3 Tables liées au ticket

Tables utilisées :

- `tickets`
- `ticket_prints`

La table `tickets` conserve le contenu du ticket.

La table `ticket_prints` conserve les impressions et réimpressions.

---

### 12.4 Réimpression

La réimpression doit :

- conserver le même numéro de commande ;
- conserver le même contenu de commande ;
- incrémenter le compteur d’impression ;
- tracer l’action dans `ticket_prints` ;
- ne pas créer une nouvelle commande ;
- ne pas modifier silencieusement les prix.

---

## 13. Règles d’administration

### 13.1 Actions admin autorisées

L’admin peut permettre :

- consulter les commandes ;
- voir le détail d’une commande ;
- changer un statut simple ;
- réimprimer un ticket ;
- activer un produit ;
- désactiver un produit ;
- modifier un prix si prévu ;
- modifier un format si prévu ;
- modifier un supplément si prévu ;
- modifier les réglages ticket ;
- modifier le mode maintenance ;
- consulter les logs simples si prévus.

---

### 13.2 Actions admin interdites

L’admin ne doit pas gérer :

- paiement intégré ;
- Stripe ;
- terminal CB ;
- comptabilité ;
- TVA avancée ;
- livraison ;
- réservation ;
- fidélité complexe ;
- dashboard lourd ;
- caisse complète ;
- compte client obligatoire.

---

### 13.3 Simplicité

L’administration doit rester simple et opérationnelle.

Elle doit aider le gérant à gérer les données utiles sans transformer le projet en ERP ou logiciel de caisse.

---

## 14. Données seed initiales

### 14.1 Stores

Seed minimal :

- name : `Pizza de Nuit`
- slug : `pizza-de-nuit`
- address : `Information à confirmer.`
- city : `Information à confirmer.`
- phone : `Information à confirmer.`
- is_active : true

---

### 14.2 Settings

Seed minimal :

- kiosk_mode : true
- maintenance_mode : false
- inactivity_timeout_seconds : 90
- return_home_delay_seconds : 8
- ticket_message : `Présentez ce ticket au comptoir pour régler votre commande.`
- print_mode : `browser_print`

---

### 14.3 Catégories structurelles

Catégories à prévoir :

- pizzas base tomate ;
- pizzas base crème fraîche ;
- pizzas spéciales ;
- pizzas à composer si confirmé ;
- boissons ;
- desserts si confirmés ;
- accompagnements si confirmés ;
- sauces si confirmées.

Les catégories définitives sont :

`Information à confirmer.`

---

### 14.4 Bases

Bases initiales :

- tomate ;
- crème fraîche.

Autres bases :

`Information à confirmer.`

---

### 14.5 Formats

Formats initiaux :

- 31 cm ;
- 40 cm ;
- 1/2 mètre ;
- 60 cm.

Prix de configuration initiaux, sous réserve de confirmation :

- 31 cm : 1000 centimes ;
- 40 cm : 1500 centimes ;
- 1/2 mètre : 2000 centimes ;
- 60 cm : 3000 centimes.

Prix définitifs :

`Information à confirmer.`

---

### 14.6 Produits

Produits réels :

`Information à confirmer avec la carte officielle Pizza de Nuit.`

Codex ne doit pas inventer les pizzas.

---

### 14.7 Suppléments

Suppléments à prévoir dans la structure :

- cheesy crust ;
- ingrédient supplémentaire ;
- fromage supplémentaire ;
- sauce ;
- option épicée.

Prix des suppléments :

`Information à confirmer.`

Compatibilités :

`Information à confirmer.`

---

### 14.8 Statuts

Statuts commande :

- `created`
- `ticket_printed`
- `awaiting_counter_payment`
- `paid_at_counter`
- `in_preparation`
- `ready`
- `handed_to_customer`
- `cancelled`

Statuts paiement comptoir :

- `awaiting_counter_payment`
- `paid_at_counter`
- `cancelled`

Statuts impression :

- `not_started`
- `printing`
- `printed`
- `failed`
- `reprinted`

---

## 15. Index recommandés

### 15.1 Index catégories

- `categories.slug`
- `categories.type`
- `categories.is_available`
- `categories.display_order`

---

### 15.2 Index produits

- `products.slug`
- `products.category_id`
- `products.product_type`
- `products.is_available`
- `products.display_order`

---

### 15.3 Index prix et formats

- `product_formats.product_id`
- `product_formats.format_id`
- `product_prices.product_id`
- `product_prices.format_id`
- `product_prices.is_active`
- `pizza_formats.slug`
- `pizza_formats.is_available`

---

### 15.4 Index suppléments

- `supplements.slug`
- `supplements.is_available`
- `product_supplements.product_id`
- `product_supplements.supplement_id`
- `category_supplements.category_id`
- `format_supplements.format_id`

---

### 15.5 Index commandes

- `orders.order_number`
- `orders.created_at`
- `orders.order_status`
- `orders.payment_status`
- `orders.print_status`
- `orders.store_id`

---

### 15.6 Index lignes de commande

- `order_items.order_id`
- `order_item_supplements.order_item_id`
- `order_item_options.order_item_id`

---

### 15.7 Index tickets

- `tickets.order_id`
- `tickets.ticket_number`
- `ticket_prints.ticket_id`
- `ticket_prints.order_id`
- `ticket_prints.print_status`

---

## 16. Contraintes et validations

### 16.1 Contraintes générales

Contraintes obligatoires :

- les slugs doivent être uniques ;
- `order_number` doit être unique ;
- `ticket_number` doit être unique ;
- `price_cents` doit être supérieur ou égal à 0 ;
- `quantity` doit être supérieur à 0 ;
- `subtotal_cents` doit être supérieur ou égal à 0 ;
- `total_cents` doit être supérieur ou égal à 0 ;
- `line_total_cents` doit être supérieur ou égal à 0 ;
- `order_type` doit toujours être `takeaway` ;
- `currency` doit valoir `EUR` au démarrage ;
- aucun champ ne doit stocker de données bancaires ;
- aucun champ ne doit stocker d’adresse de livraison ;
- aucun champ ne doit stocker de numéro de table ;
- aucun champ ne doit déclencher un paiement sur borne.

---

### 16.2 Validation serveur recommandée

Lors de `POST /api/orders`, le serveur doit valider :

- panier non vide ;
- produits existants ;
- produits disponibles ;
- formats valides ;
- formats compatibles ;
- suppléments compatibles ;
- options compatibles ;
- quantités valides ;
- total cohérent ;
- order_type = `takeaway` ;
- payment_status = `awaiting_counter_payment` ;
- absence de données interdites.

---

### 16.3 Données interdites

La base ne doit jamais stocker :

- numéro de carte bancaire ;
- token de paiement ;
- session Stripe ;
- adresse de livraison ;
- frais de livraison ;
- numéro de table ;
- réservation ;
- données personnelles client obligatoires ;
- compte client obligatoire.

---

## 17. Tables interdites

Codex ne doit pas créer les tables suivantes sans demande explicite :

- `payments`
- `payment_transactions`
- `stripe_sessions`
- `online_checkout`
- `card_terminals`
- `delivery_orders`
- `delivery_addresses`
- `delivery_fees`
- `reservations`
- `tables`
- `dining_tables`
- `customer_accounts`
- `loyalty_accounts`
- `pos_transactions`
- `cash_registers`

Ces tables ne correspondent pas au fonctionnement réel de la borne Pizza de Nuit.

Exception importante :

Le champ `payment_status` dans `orders` est autorisé, car il sert uniquement au suivi du paiement au comptoir.

Il ne doit jamais déclencher une logique de paiement sur borne.

---

## 18. Compatibilité avec l’API minimale

### 18.1 `GET /api/menu`

Tables utilisées :

- `categories`
- `products`
- `pizza_bases`
- `pizza_formats`
- `product_formats`
- `product_prices`
- `ingredients`
- `product_ingredients`
- `supplements`
- `product_supplements`
- `category_supplements`
- `format_supplements`
- `options`
- `product_options`

Cette route doit retourner uniquement les données nécessaires à l’affichage du menu.

Elle ne doit retourner aucune donnée de paiement.

---

### 18.2 `GET /api/settings`

Tables utilisées :

- `stores`
- `settings`

Cette route doit retourner :

- nom du restaurant ;
- réglages de borne ;
- message ticket ;
- mode maintenance ;
- délais d’inactivité ;
- configuration d’impression simple.

Elle ne doit pas exposer de secret admin.

---

### 18.3 `POST /api/orders`

Tables utilisées :

- `orders`
- `order_items`
- `order_item_supplements`
- `order_item_options`
- `half_half_items` si activée
- `tickets`
- `ticket_prints`

Cette route doit :

- créer une commande ;
- créer les lignes ;
- générer un ticket ;
- préparer l’impression ;
- ne déclencher aucun paiement.

---

### 18.4 `GET /api/orders`

Tables utilisées :

- `orders`
- `order_items`

Cette route est destinée à l’admin.

Elle doit être protégée.

Elle permet de consulter l’historique simple des commandes.

---

### 18.5 `GET /api/orders/:id`

Tables utilisées :

- `orders`
- `order_items`
- `order_item_supplements`
- `order_item_options`
- `half_half_items`
- `tickets`
- `ticket_prints`

Cette route est destinée à l’admin.

Elle permet d’afficher le détail complet d’une commande.

---

### 18.6 `POST /api/orders/:id/reprint`

Tables utilisées :

- `orders`
- `tickets`
- `ticket_prints`

Cette route doit :

- préparer une réimpression ;
- incrémenter le compteur si nécessaire ;
- conserver le même numéro de commande ;
- ne pas modifier les produits ;
- ne pas recalculer silencieusement le total ;
- ne pas créer une nouvelle commande.

---

### 18.7 `GET /api/health`

Tables utilisées :

- aucune obligatoire ;
- accès simple au stockage si nécessaire.

Cette route doit retourner un statut simple.

Elle ne doit exposer aucun secret.

---

## 19. Compatibilité avec les types TypeScript

Le schéma doit être aligné avec les types TypeScript du projet.

Types principaux à prévoir dans `/src/types` :

- `Product`
- `Category`
- `PizzaFormat`
- `PizzaBase`
- `Ingredient`
- `Allergen`
- `Supplement`
- `Option`
- `CartItem`
- `Cart`
- `Order`
- `OrderItem`
- `Ticket`
- `AppSettings`
- `OrderStatus`
- `PaymentStatus`
- `PrintStatus`
- `AdminUser`

Codex doit éviter les duplications de types.

Les types doivent refléter les données réellement stockées.

Les champs snapshot doivent être inclus dans les types liés aux commandes.

---

## 20. Migration progressive recommandée

### Étape 1 — Fichiers typés

Créer les fichiers suivants :

- `/src/data/categories.ts`
- `/src/data/products.ts`
- `/src/data/formats.ts`
- `/src/data/bases.ts`
- `/src/data/ingredients.ts`
- `/src/data/supplements.ts`
- `/src/data/settings.ts`

Objectif :

- construire rapidement l’interface ;
- éviter une base prématurée ;
- travailler avec des données typées ;
- garder les prix configurables.

---

### Étape 2 — Repositories simples

Créer une couche d’accès aux données :

- `menu.repository.ts`
- `orders.repository.ts`
- `settings.repository.ts`

Objectif :

- isoler la source des données ;
- pouvoir remplacer les fichiers par SQLite plus tard ;
- éviter que l’UI dépende directement de `/src/data`.

---

### Étape 3 — SQLite local si nécessaire

Migrer vers SQLite si :

- les commandes doivent être historisées ;
- l’admin doit modifier les disponibilités ;
- l’admin doit consulter les commandes ;
- les tickets doivent être réimprimables ;
- la borne doit fonctionner localement avec persistance.

Objectif :

- garder une persistance simple ;
- éviter une dépendance cloud ;
- conserver une architecture légère.

---

### Étape 4 — Admin simple

Ajouter une admin simple pour :

- consulter les commandes ;
- voir le détail ;
- changer un statut ;
- réimprimer un ticket ;
- activer/désactiver un produit ;
- modifier un prix si prévu ;
- modifier un supplément si prévu ;
- modifier les réglages ticket.

Ne pas créer de dashboard complexe.

---

## 21. Informations à confirmer

### 21.1 Menu

- carte officielle complète ;
- liste exacte des pizzas ;
- ingrédients exacts ;
- allergènes ;
- boissons ;
- desserts ;
- accompagnements ;
- sauces ;
- prix définitifs ;
- disponibilités par point de vente.

### 21.2 Formats et prix

- confirmation des formats réellement disponibles ;
- prix définitifs ;
- disponibilité du 1/2 mètre ;
- disponibilité du 60 cm ;
- disponibilité de la moitié-moitié ;
- règle de calcul moitié-moitié ;
- base identique obligatoire ou non ;
- prix du cheesy crust ;
- prix des suppléments ;
- compatibilité des suppléments par format.

### 21.3 Point de vente

- adresse exacte ;
- ville exacte ;
- numéro de téléphone ;
- horaires réels ;
- logo final ;
- mentions légales éventuelles.

### 21.4 Ticket et impression

- largeur ticket ;
- logo sur ticket ;
- besoin d’un ticket cuisine ;
- modèle d’imprimante ;
- connexion imprimante ;
- méthode réelle d’impression ;
- besoin de réimpression ;
- contenu exact du ticket.

### 21.5 Administration

- niveau réel souhaité pour l’admin ;
- besoin de comptes multiples ou non ;
- besoin de statistiques ou non ;
- besoin d’export ou non ;
- méthode de stockage souhaitée ;
- choix définitif de la base de données ;
- environnement réel de déploiement.

---

## 22. Checklist de validation

Avant de considérer le schéma comme valide, vérifier :

- [ ] la commande est uniquement à emporter ;
- [ ] aucune table de paiement sur borne n’existe ;
- [ ] aucune table Stripe n’existe ;
- [ ] aucune table de livraison n’existe ;
- [ ] aucune table de réservation n’existe ;
- [ ] aucune table de compte client obligatoire n’existe ;
- [ ] aucune donnée bancaire n’est stockée ;
- [ ] aucune adresse de livraison n’est stockée ;
- [ ] aucun numéro de table n’est stocké ;
- [ ] les produits sont configurables ;
- [ ] les catégories sont configurables ;
- [ ] les formats sont configurables ;
- [ ] les prix sont configurables ;
- [ ] les bases sont configurables ;
- [ ] les ingrédients sont configurables ;
- [ ] les suppléments sont configurables ;
- [ ] les options sont configurables ;
- [ ] les disponibilités sont configurables ;
- [ ] aucun produit n’est inventé ;
- [ ] aucun prix n’est codé en dur dans l’UI ;
- [ ] les prix sont stockés en centimes ;
- [ ] la devise est stockée séparément ;
- [ ] les formats 31 cm, 40 cm, 1/2 mètre et 60 cm sont prévus ;
- [ ] la moitié-moitié est prévue sans être activée sans confirmation ;
- [ ] les règles de compatibilité sont structurées ;
- [ ] le panier peut être validé proprement ;
- [ ] les commandes sont persistantes ;
- [ ] les lignes de commande ont des snapshots ;
- [ ] les tickets sont persistants ;
- [ ] les réimpressions sont traçables ;
- [ ] les statuts de commande sont simples ;
- [ ] le statut paiement sert uniquement au comptoir ;
- [ ] le backend reste minimal ;
- [ ] les routes API minimales sont supportées ;
- [ ] aucune route de paiement n’est nécessaire ;
- [ ] le schéma est compatible avec Next.js ;
- [ ] le schéma est compatible avec SQLite si besoin ;
- [ ] le schéma reste compatible avec des fichiers typés au démarrage ;
- [ ] les types TypeScript peuvent être alignés facilement ;
- [ ] l’admin reste simple ;
- [ ] le ticket imprimé reste central ;
- [ ] le message ticket obligatoire est présent ;
- [ ] Codex peut développer sans ambiguïté.

---

## 23. Conclusion

`DATABASE_SCHEMA.md` est la source de vérité pour toutes les données persistantes et configurables de la borne tactile Pizza de Nuit.

Le schéma doit rester aligné avec le fonctionnement réel :

Le client commande sur la borne.  
La borne imprime un ticket.  
Le client présente le ticket au comptoir.  
Le paiement se fait au comptoir.  
La commande est préparée à emporter.

La priorité technique est :

- simplicité ;
- clarté ;
- maintenabilité ;
- backend minimal ;
- données structurées ;
- prix configurables ;
- produits configurables ;
- ticket imprimé ;
- réimpression possible ;
- admin simple ;
- aucun paiement sur borne ;
- aucune livraison ;
- aucune réservation ;
- aucune caisse complète.

Codex doit utiliser ce document pour créer une structure de données propre, évolutive et fidèle à Pizza de Nuit, sans inventer de carte, de prix, d’offre ou de fonctionnalité non confirmée.
