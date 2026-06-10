# ORDER_RULES.md

## 1. Objectif du document

Ce document définit les règles métier de commande de l’application de borne tactile **Pizza de Nuit**.

Il sert de source de vérité pour Codex concernant :

- les produits ;
- les catégories ;
- les pizzas ;
- les formats ;
- les bases ;
- les ingrédients ;
- les suppléments ;
- les options ;
- le panier ;
- le calcul des prix ;
- la validation de commande ;
- la création de commande ;
- les statuts de commande ;
- l’impression du ticket ;
- la réimpression du ticket ;
- les erreurs métier ;
- les cas limites ;
- les règles admin liées aux commandes.

Ce document ne définit pas :

- la direction artistique complète ;
- l’architecture technique globale ;
- le design system ;
- le parcours UX détaillé ;
- le back-office complet ;
- un système de caisse ;
- un tunnel de paiement.

Il se concentre uniquement sur les règles métier liées à la commande.

---

## 2. Sources de vérité

Codex doit respecter les sources suivantes, dans cet ordre de priorité :

1. `PROJECT_CONTEXT.md`
2. `AGENT.md`
3. `CAHIER_DES_CHARGES.md`
4. `USER_FLOW.md`
5. site officiel Pizza de Nuit : `https://pizza-de-nuit.vercel.app/`
6. bonnes pratiques métier de borne de commande

En cas de contradiction, Codex doit appliquer l’ordre de priorité ci-dessus.

Codex ne doit jamais inventer une règle métier si l’information est absente des documents ou du site officiel.

Si une donnée manque, Codex doit indiquer clairement :

> Information à confirmer.

---

## 3. Principe central de commande

Le fonctionnement métier central de la borne est :

Commande sur borne  
→ Validation de la commande  
→ Impression du ticket  
→ Présentation du ticket au comptoir  
→ Paiement au comptoir  
→ Préparation de la commande à emporter

La borne sert uniquement à préparer une commande.

Elle ne sert pas à encaisser.

Elle ne remplace pas la caisse.

Elle ne gère pas le paiement.

Elle ne propose pas de livraison.

Elle ne propose pas de consommation sur place.

La commande est toujours une commande à emporter.

Le ticket imprimé est l’élément central entre :

- le client ;
- le comptoir ;
- l’encaissement ;
- la préparation.

---

## 4. Interdictions absolues

Codex ne doit jamais ajouter :

- paiement sur borne ;
- paiement en ligne ;
- Stripe ;
- terminal de paiement intégré ;
- route API de paiement ;
- données bancaires ;
- livraison ;
- frais de livraison ;
- choix d’adresse de livraison ;
- consommation sur place ;
- réservation ;
- commande à table ;
- QR code de table ;
- compte client obligatoire ;
- espace client ;
- système de caisse complet ;
- comptabilité ;
- gestion TVA avancée ;
- dashboard statistique complexe ;
- programme fidélité complexe ;
- application mobile ;
- géolocalisation ;
- suivi de livraison ;
- horaires inventés ;
- adresses inventées ;
- produits inventés ;
- offres inventées ;
- prix non confirmés ;
- boutons de paiement.

Codex ne doit jamais utiliser comme action finale :

- `Payer`
- `Payer maintenant`
- `Procéder au paiement`
- `Régler sur la borne`

L’action finale obligatoire est :

`Valider et imprimer le ticket`

Le message final obligatoire est :

`Présentez votre ticket au comptoir pour régler votre commande.`

---

## 5. Règles générales de données

Toutes les données métier doivent être structurées, configurables et séparées de l’interface.

Codex ne doit pas coder directement dans les composants UI :

- les produits ;
- les prix ;
- les formats ;
- les bases ;
- les suppléments ;
- les options ;
- les catégories ;
- les disponibilités ;
- les règles de calcul ;
- les règles de moitié-moitié.

Les données principales doivent pouvoir être modifiées depuis une configuration ou une interface admin simple.

Les données doivent être pensées pour évoluer vers une base de données sans casser l’application.

Les données critiques doivent être centralisées dans des fichiers, modules ou tables dédiés.

Exemples de données à structurer :

- `products`
- `categories`
- `formats`
- `bases`
- `ingredients`
- `supplements`
- `options`
- `cart`
- `orders`
- `tickets`
- `settings`

---

## 6. Règles des catégories

Les catégories doivent permettre au client de trouver rapidement les produits.

Catégories à prévoir dans la structure :

- pizzas base tomate ;
- pizzas base crème fraîche ;
- pizzas spéciales ;
- pizzas à composer si confirmé ;
- boissons ;
- desserts si confirmés ;
- accompagnements si confirmés ;
- sauces si confirmées.

Les catégories définitives doivent être confirmées avec la carte officielle Pizza de Nuit.

Chaque catégorie doit contenir :

- identifiant ;
- nom affiché ;
- slug ;
- description courte si utile ;
- ordre d’affichage ;
- disponibilité ;
- image ou icône si utile ;
- type de catégorie.

Une catégorie indisponible doit être :

- masquée ;
- ou affichée comme indisponible ;
- mais jamais sélectionnable si aucun produit n’est disponible.

Codex ne doit pas inventer des catégories définitives non confirmées.

---

## 7. Règles des produits

Chaque produit doit être structuré avec les champs suivants :

- `id`
- `name`
- `slug`
- `description`
- `categoryId`
- `image`
- `base`
- `ingredients`
- `allergens`
- `availableFormats`
- `pricesByFormat`
- `availableOptions`
- `compatibleSupplements`
- `isAvailable`
- `displayOrder`
- `badge`
- `productType`

Les produits exacts doivent venir d’une source validée.

Codex ne doit pas inventer la carte officielle.

Si la carte exacte n’est pas disponible, Codex doit créer uniquement une structure prête à recevoir les produits.

Chaque produit doit pouvoir être :

- activé ;
- désactivé ;
- modifié ;
- réordonné ;
- affiché ou masqué ;
- associé à des formats ;
- associé à des suppléments compatibles.

Un produit indisponible ne doit pas être ajoutable au panier.

---

## 8. Règles des pizzas

Une pizza doit obligatoirement contenir :

- un nom ;
- une catégorie ;
- une base ;
- une liste d’ingrédients ;
- au moins un format disponible ;
- un prix par format disponible ;
- une disponibilité ;
- des suppléments compatibles si applicable.

La base ne doit pas être uniquement un texte dans la description.

La base doit être une donnée structurée.

Le format est obligatoire avant ajout au panier.

Le prix d’une pizza dépend du format sélectionné.

Une pizza ne peut pas être ajoutée au panier si :

- aucun format n’est sélectionné ;
- le produit est indisponible ;
- le format choisi est indisponible ;
- une option incompatible est sélectionnée ;
- le prix ne peut pas être calculé.

Les ingrédients doivent être affichables clairement sur la borne et sur le ticket si nécessaire.

Les allergènes doivent être prévus dans la structure si l’information est disponible.

---

## 9. Règles des bases

Bases à prévoir dans la structure :

- tomate ;
- crème fraîche ;
- autre base uniquement si confirmée.

Chaque base doit contenir :

- identifiant ;
- nom ;
- disponibilité ;
- ordre d’affichage.

La base doit être affichée :

- sur l’écran produit ;
- dans le panier ;
- sur le ticket.

La base doit pouvoir être utilisée comme condition de compatibilité pour :

- certaines pizzas ;
- certaines options ;
- certains suppléments ;
- la pizza moitié-moitié si cette règle est confirmée.

Codex ne doit pas inventer une base supplémentaire non confirmée.

---

## 10. Règles des formats

Formats à prévoir dans la structure :

- 31 cm ;
- 40 cm ;
- 1/2 mètre ;
- 60 cm.

Prix projet initiaux à prévoir comme configuration, sous réserve de validation finale :

- 31 cm : 10 € ;
- 40 cm : 15 € ;
- 1/2 mètre : 20 € ;
- 60 cm : 30 €.

Ces prix doivent rester configurables.

Ils ne doivent jamais être codés en dur dans les composants UI.

Chaque format doit contenir :

- `id`
- `label`
- `description`
- `price`
- `isAvailable`
- `isLargeFormat`
- `supportsHalfHalf`
- `displayOrder`
- `badge`

Les formats peuvent varier selon les produits.

Un format non disponible pour une pizza doit être :

- masqué ;
- ou désactivé ;
- mais jamais sélectionnable.

Les grands formats doivent pouvoir être valorisés avec des badges :

- `Format géant`
- `À partager`

---

## 11. Règles des grands formats

Les formats suivants sont considérés comme des formats différenciants :

- 1/2 mètre ;
- 60 cm.

Ils doivent être traités comme des formats forts de l’offre Pizza de Nuit.

Ils peuvent être mis en avant avec :

- badge `Format géant` ;
- badge `À partager` ;
- mise en avant visuelle ;
- explication courte ;
- prix très lisible.

Les grands formats doivent être compatibles avec la moitié-moitié uniquement si cette fonctionnalité est confirmée.

Les règles de compatibilité doivent rester configurables.

Codex ne doit pas figer la logique des grands formats dans les composants UI.

---

## 12. Règles de la pizza moitié-moitié

La pizza moitié-moitié doit être prévue dans l’architecture uniquement si elle est confirmée par le gérant.

Elle ne doit pas être activée par défaut sans confirmation.

Règles à prévoir :

- disponibilité configurable ;
- formats compatibles configurables ;
- choix de deux pizzas différentes ;
- base identique si cette règle est confirmée ;
- calcul de prix configurable ;
- affichage clair dans le panier ;
- affichage clair sur le ticket.

Une pizza moitié-moitié doit contenir :

- format ;
- moitié 1 ;
- moitié 2 ;
- base ;
- suppléments éventuels ;
- prix calculé ;
- quantité.

La validation doit être impossible si :

- aucune moitié n’est sélectionnée ;
- une seule moitié est sélectionnée ;
- le format n’est pas compatible ;
- les bases sont incompatibles si la base identique est obligatoire ;
- une des deux pizzas est indisponible ;
- le prix ne peut pas être calculé.

Le panier doit afficher clairement :

- `Moitié 1 : [nom pizza]`
- `Moitié 2 : [nom pizza]`
- format ;
- base ;
- suppléments ;
- total.

Le ticket doit afficher la moitié-moitié de manière lisible pour le personnel.

Codex ne doit pas figer cette logique dans l’UI.

---

## 13. Règles des suppléments et options

Les suppléments doivent être configurables.

Suppléments à prévoir dans la structure :

- cheesy crust ;
- ingrédient supplémentaire ;
- fromage supplémentaire ;
- sauce ;
- option épicée ;
- autres suppléments à confirmer.

Chaque supplément doit contenir :

- `id`
- `name`
- `description`
- `price`
- `isAvailable`
- `compatibleProductIds`
- `compatibleCategoryIds`
- `compatibleFormatIds`
- `maxQuantity`
- `displayOrder`

Un supplément ne doit pas être disponible partout par défaut.

Sa compatibilité doit être contrôlée par les données.

Un supplément peut dépendre :

- du produit ;
- de la catégorie ;
- du format ;
- de la base ;
- de la disponibilité admin.

Le prix d’un supplément doit être ajouté au total en temps réel.

Un supplément indisponible ne doit pas être sélectionnable.

Un supplément incompatible doit être :

- masqué ;
- ou affiché désactivé avec un message clair.

Message recommandé :

`Cette option n’est pas disponible avec ce format.`

---

## 14. Règles des boissons

Les boissons doivent être traitées comme des produits simples.

Chaque boisson doit contenir :

- identifiant ;
- nom ;
- catégorie ;
- image si disponible ;
- prix unitaire ;
- disponibilité ;
- quantité ;
- ordre d’affichage.

Les boissons ne doivent pas nécessiter de personnalisation complexe sauf confirmation.

Une boisson doit pouvoir être :

- ajoutée au panier ;
- supprimée du panier ;
- modifiée en quantité ;
- désactivée depuis l’admin si prévu.

Les boissons exactes doivent être confirmées avec la carte officielle.

Codex ne doit pas inventer la liste des boissons.

---

## 15. Règles des desserts, accompagnements et sauces

Les desserts, accompagnements et sauces sont des produits complémentaires uniquement si confirmés.

Ils doivent rester simples et configurables.

Chaque produit complémentaire doit contenir :

- identifiant ;
- nom ;
- catégorie ;
- description courte si utile ;
- image si disponible ;
- prix unitaire ;
- disponibilité ;
- quantité ;
- ordre d’affichage.

Ils doivent pouvoir être ajoutés au panier comme des produits simples.

Ils ne doivent pas ajouter de complexité inutile au parcours.

Codex ne doit pas inventer :

- desserts ;
- accompagnements ;
- sauces ;
- menus ;
- offres.

Si l’information manque :

> Information à confirmer.

---

## 16. Règles du panier

Le panier doit centraliser toutes les lignes de commande avant validation.

Chaque ligne panier doit contenir :

- identifiant de ligne ;
- produit ;
- type de produit ;
- format si applicable ;
- base si applicable ;
- options ;
- suppléments ;
- quantité ;
- prix unitaire ;
- total de ligne ;
- informations spécifiques moitié-moitié si applicable.

Le panier doit permettre :

- ajouter un produit ;
- modifier un produit ;
- supprimer un produit ;
- modifier une quantité ;
- revenir au menu ;
- valider la commande.

Le panier doit toujours afficher :

- le détail des produits ;
- les formats ;
- les bases ;
- les options ;
- les suppléments ;
- les quantités ;
- le total général ;
- la mention paiement au comptoir.

Mention obligatoire dans le panier :

`Paiement au comptoir après impression du ticket.`

Le panier ne doit jamais afficher :

- paiement CB sur borne ;
- paiement en ligne ;
- livraison ;
- sur place ;
- frais de livraison ;
- choix d’adresse ;
- bouton `Payer`.

La logique panier doit être centralisée.

Codex ne doit pas disperser la logique panier dans les composants UI.

---

## 17. Règles de calcul des prix

Le calcul des prix doit être centralisé dans une logique dédiée.

Le calcul doit prendre en compte :

- prix du produit ;
- prix du format ;
- prix des suppléments ;
- quantité ;
- total de ligne ;
- total général.

Pour une pizza classique :

Total ligne = (prix du format + total suppléments) × quantité

Pour un produit simple :

Total ligne = prix unitaire × quantité

Pour une moitié-moitié :

Total ligne = prix calculé selon la règle moitié-moitié configurée + suppléments éventuels

La règle exacte de calcul moitié-moitié doit être confirmée.

Codex ne doit pas l’inventer.

Le total affiché doit être identique :

- dans le panier ;
- dans la validation finale ;
- dans la commande enregistrée ;
- sur le ticket imprimé.

Les prix doivent être stockés en valeur numérique exploitable.

L’affichage en euros doit être géré séparément.

Les arrondis doivent être simples et cohérents.

Aucun prix ne doit être codé en dur dans l’UI.

---

## 18. Règles de validation panier

Avant validation de la commande, Codex doit vérifier :

- le panier n’est pas vide ;
- chaque pizza possède un format sélectionné ;
- chaque produit est disponible ;
- chaque format sélectionné est disponible ;
- chaque supplément est compatible ;
- chaque supplément est disponible ;
- chaque quantité est valide ;
- le total est calculable ;
- la moitié-moitié est complète si utilisée ;
- la mention paiement au comptoir est visible ;
- aucun paiement borne n’est déclenché.

La validation doit être bloquée si :

- panier vide ;
- format manquant ;
- produit indisponible ;
- supplément incompatible ;
- moitié-moitié incomplète ;
- total impossible à calculer ;
- erreur de création de commande.

Messages recommandés :

- `Votre panier est vide.`
- `Sélectionnez un format pour continuer.`
- `Ce produit est actuellement indisponible.`
- `Cette option n’est pas disponible avec ce format.`
- `Choisissez les deux moitiés de votre pizza.`

---

## 19. Règles de création de commande

Une commande doit être créée uniquement après validation finale.

Chaque commande doit contenir :

- `id`
- `orderNumber`
- `createdAt`
- `orderType`
- `items`
- `subtotal`
- `total`
- `orderStatus`
- `printStatus`
- `paymentStatus`
- `ticketPrintCount`

La valeur de `orderType` doit toujours être :

- `takeaway`
- ou `à emporter`

La valeur de `paymentStatus` doit indiquer :

`à régler au comptoir`

La création de commande ne doit jamais déclencher :

- paiement ;
- terminal CB ;
- Stripe ;
- encaissement ;
- livraison ;
- réservation.

Après création de commande :

1. le numéro de commande est généré ;
2. le ticket est préparé ;
3. l’impression est déclenchée ;
4. le client reçoit l’instruction de présenter le ticket au comptoir ;
5. la session est réinitialisée.

---

## 20. Règles des statuts de commande

Statuts recommandés :

- `created`
- `ticket_printed`
- `awaiting_counter_payment`
- `paid_at_counter`
- `in_preparation`
- `ready`
- `handed_to_customer`
- `cancelled`

Définition des statuts :

### `created`

La commande est créée dans le système.

### `ticket_printed`

Le ticket a été imprimé avec succès.

### `awaiting_counter_payment`

Le client doit présenter le ticket au comptoir et régler auprès du personnel.

### `paid_at_counter`

Le personnel a encaissé la commande au comptoir.

### `in_preparation`

La commande est en préparation.

### `ready`

La commande est prête.

### `handed_to_customer`

La commande a été remise au client.

### `cancelled`

La commande a été annulée.

Ces statuts doivent rester simples.

Ils ne doivent pas transformer l’application en caisse complète.

Le statut de paiement ne doit jamais être relié à un paiement sur borne.

---

## 21. Règles de paiement au comptoir

La borne ne paie jamais.

La borne indique uniquement que le paiement se fait au comptoir.

La commande validée doit afficher clairement :

`Paiement au comptoir`

Message obligatoire :

`Présentez votre ticket au comptoir pour régler votre commande.`

Le statut paiement sert uniquement au suivi admin.

Il ne doit pas déclencher :

- terminal de paiement ;
- Stripe ;
- paiement CB sur borne ;
- paiement en ligne ;
- stockage de données bancaires ;
- route API de paiement.

Aucune donnée bancaire ne doit être demandée ou stockée.

---

## 22. Règles du ticket

Le ticket est obligatoire après validation de commande.

Il doit être clair pour :

- le client ;
- le personnel au comptoir ;
- la préparation.

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

Message ticket obligatoire :

`Présentez ce ticket au comptoir pour régler votre commande.`

Le ticket ne doit pas contenir :

- lien de paiement ;
- QR code de paiement ;
- indication de paiement en ligne ;
- livraison ;
- adresse client ;
- table ;
- réservation.

Le ticket doit être court, lisible et exploitable rapidement.

Les formats doivent être visibles.

Les suppléments doivent être visibles.

Le total doit être visible.

Le numéro de commande doit être visible.

---

## 23. Règles de réimpression ticket

La réimpression du ticket doit être possible depuis l’admin si la commande est enregistrée.

Chaque commande doit conserver :

- nombre d’impressions ;
- date de création ;
- dernier statut d’impression si utile.

Une réimpression ne doit pas modifier silencieusement la commande.

Si une commande déjà imprimée est modifiée, Codex doit prévoir une règle claire.

Règle recommandée :

- ne pas modifier une commande déjà imprimée sans action admin explicite ;
- conserver la trace de la réimpression ;
- afficher clairement que le ticket est une réimpression si nécessaire.

Mention possible :

`Réimpression`

La méthode exacte d’impression dépend du matériel.

Informations à confirmer :

- modèle d’imprimante ;
- largeur ticket ;
- connexion imprimante ;
- besoin d’un ticket cuisine ;
- méthode réelle d’impression.

---

## 24. Règles admin liées aux commandes

L’admin peut permettre :

- consulter les commandes ;
- consulter le détail d’une commande ;
- changer un statut simple ;
- réimprimer un ticket ;
- annuler une commande ;
- gérer la disponibilité des produits ;
- modifier les prix si prévu ;
- modifier les formats si prévu ;
- modifier les suppléments si prévu.

L’admin ne doit pas devenir un logiciel de caisse complet.

L’admin ne doit pas gérer :

- paiement intégré ;
- Stripe ;
- terminal CB ;
- comptabilité ;
- TVA avancée ;
- livraison ;
- réservation ;
- fidélité complexe ;
- dashboard lourd.

Les statuts admin doivent rester simples et opérationnels.

Les actions admin liées aux commandes doivent être traçables si possible.

---

## 25. Cas limites et erreurs

### Panier vide

Si le panier est vide, la validation est impossible.

Message :

`Votre panier est vide.`

Action recommandée :

`Voir les pizzas`

### Format manquant

Si une pizza n’a pas de format sélectionné, l’ajout au panier est impossible.

Message :

`Sélectionnez un format pour continuer.`

### Produit indisponible

Si un produit est indisponible, il ne doit pas être ajoutable.

Message :

`Ce produit est actuellement indisponible.`

### Supplément incompatible

Si un supplément est incompatible avec le produit ou le format, il doit être désactivé ou masqué.

Message :

`Cette option n’est pas disponible avec ce format.`

### Moitié-moitié incomplète

Si une moitié-moitié n’a pas ses deux moitiés sélectionnées, l’ajout au panier est impossible.

Message :

`Choisissez les deux moitiés de votre pizza.`

### Commande impossible

Si la commande ne peut pas être créée, la validation doit être bloquée.

Message :

`La commande n’a pas pu être validée. Merci de réessayer ou de demander de l’aide au comptoir.`

### Ticket non imprimé

Si le ticket ne peut pas être imprimé, la borne doit afficher un message simple.

Message :

`Le ticket n’a pas pu être imprimé. Merci de demander de l’aide au comptoir.`

Actions possibles :

- réessayer l’impression ;
- appeler le personnel ;
- revenir à l’accueil uniquement si la procédure opérationnelle le permet.

### Inactivité client

En cas d’inactivité, la borne doit demander une confirmation.

Message :

`Êtes-vous toujours là ?`

Actions :

- `Continuer ma commande`
- `Annuler et revenir à l’accueil`

Si aucune action n’est effectuée, la session doit être réinitialisée.

### Retour automatique à l’accueil

Après confirmation de commande, la borne doit :

- vider le panier ;
- supprimer les choix temporaires ;
- masquer les données du client précédent ;
- revenir à l’accueil ;
- remettre la session à zéro.

---

## 26. Règles de wording métier

### Boutons autorisés

Boutons recommandés :

- `Commander à emporter`
- `Voir les pizzas`
- `Choisir`
- `Sélectionner`
- `Ajouter au panier`
- `Continuer ma commande`
- `Voir le panier`
- `Modifier`
- `Supprimer`
- `Valider ma commande`
- `Valider et imprimer le ticket`
- `Terminer`

### Messages obligatoires

Mention visible dans le panier :

`Paiement au comptoir après impression du ticket.`

Bouton final obligatoire :

`Valider et imprimer le ticket`

Message final obligatoire :

`Présentez votre ticket au comptoir pour régler votre commande.`

Message ticket obligatoire :

`Présentez ce ticket au comptoir pour régler votre commande.`

### Termes interdits

Ne jamais utiliser comme action principale :

- `Payer`
- `Payer maintenant`
- `Procéder au paiement`
- `Régler sur la borne`
- `Livraison`
- `Sur place`
- `Réserver`
- `Créer un compte`

---

## 27. Règles pour Codex

Codex doit :

- centraliser les règles métier ;
- centraliser le calcul panier ;
- centraliser le calcul prix ;
- centraliser les formats ;
- centraliser les suppléments ;
- centraliser les règles de commande ;
- ne pas coder les produits dans les composants ;
- ne pas coder les prix dans les composants ;
- ne pas figer les formats dans l’UI ;
- ne pas figer la moitié-moitié dans l’UI ;
- ne pas inventer la carte ;
- ne pas inventer les prix ;
- ne pas inventer les horaires ;
- ne pas inventer les offres ;
- signaler les informations manquantes ;
- garder une architecture claire ;
- garder une logique métier maintenable ;
- garder le backend minimal ;
- séparer interface client et admin ;
- séparer logique métier et composants visuels.

Avant toute modification liée à la commande, Codex doit vérifier :

- `PROJECT_CONTEXT.md`
- `AGENT.md`
- `CAHIER_DES_CHARGES.md`
- `USER_FLOW.md`
- `ORDER_RULES.md`
- site officiel Pizza de Nuit si une information de marque ou de menu manque.

---

## 28. Informations à confirmer

Informations à confirmer avant développement final :

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
- largeur ticket ;
- logo sur ticket ou non ;
- mentions légales éventuelles ;
- besoin d’un ticket cuisine ;
- modèle d’imprimante ;
- méthode d’impression réelle ;
- niveau réel souhaité pour l’admin.

Codex ne doit jamais inventer ces informations.

Si elles sont absentes :

> Information à confirmer.

---

## 29. Checklist de validation ORDER_RULES.md

Le document est valide si :

- [ ] les règles métier sont claires ;
- [ ] la commande est uniquement à emporter ;
- [ ] aucun paiement borne n’existe ;
- [ ] aucun paiement en ligne n’existe ;
- [ ] aucune route de paiement n’existe ;
- [ ] aucune livraison n’existe ;
- [ ] aucun mode sur place n’existe ;
- [ ] aucune réservation n’existe ;
- [ ] aucun compte client obligatoire n’existe ;
- [ ] les produits sont configurables ;
- [ ] les catégories sont configurables ;
- [ ] les formats sont configurables ;
- [ ] les prix sont configurables ;
- [ ] les suppléments sont configurables ;
- [ ] les disponibilités sont configurables ;
- [ ] aucun prix n’est codé en dur dans l’UI ;
- [ ] aucun produit n’est codé en dur dans les composants ;
- [ ] les formats 31 cm, 40 cm, 1/2 mètre et 60 cm sont prévus ;
- [ ] les prix initiaux sont indiqués comme configuration sous réserve de confirmation ;
- [ ] les grands formats peuvent être valorisés ;
- [ ] la moitié-moitié est prévue uniquement si confirmée ;
- [ ] la logique moitié-moitié est configurable ;
- [ ] les suppléments ne sont pas disponibles partout par défaut ;
- [ ] la logique panier est centralisée ;
- [ ] la logique prix est centralisée ;
- [ ] le panier affiche les produits, formats, options, suppléments, quantités et total ;
- [ ] le panier rappelle le paiement au comptoir ;
- [ ] la validation bloque les paniers invalides ;
- [ ] la commande contient un numéro visible ;
- [ ] la commande contient un statut paiement à régler au comptoir ;
- [ ] le ticket contient toutes les informations utiles ;
- [ ] le message ticket est présent ;
- [ ] la réimpression ticket est prévue ;
- [ ] les cas limites sont prévus ;
- [ ] le bouton final est `Valider et imprimer le ticket` ;
- [ ] aucun bouton `Payer` n’est utilisé ;
- [ ] Codex peut développer sans ambiguïté ;
- [ ] les informations manquantes sont indiquées comme à confirmer.

---

## 30. Conclusion

`ORDER_RULES.md` est la source de vérité métier pour la commande sur la borne tactile Pizza de Nuit.

Le fonctionnement à respecter est simple :

Le client commande sur la borne.  
La borne imprime un ticket.  
Le client présente le ticket au comptoir.  
Le paiement se fait au comptoir.  
La commande est préparée à emporter.

Codex doit utiliser ce document avant toute création ou modification liée :

- aux produits ;
- aux formats ;
- aux suppléments ;
- au panier ;
- au calcul des prix ;
- à la commande ;
- au ticket ;
- aux statuts ;
- à l’administration des commandes.

La priorité absolue est de conserver une borne :

- simple ;
- rapide ;
- tactile ;
- claire ;
- fiable ;
- fidèle à Pizza de Nuit ;
- centrée sur la commande à emporter ;
- centrée sur le ticket imprimé ;
- sans paiement sur borne ;
- sans livraison ;
- sans consommation sur place.