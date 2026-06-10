# CAHIER_DES_CHARGES.md

## 1. Présentation du projet

Le projet consiste à développer une application de borne de commande tactile pour **Pizza de Nuit**.

Cette borne sera utilisée dans un snack/pizzeria proposant uniquement de la vente à emporter.

Le client utilisera la borne pour composer sa commande de manière autonome. Une fois la commande validée, la borne imprimera un ticket récapitulatif. Le client devra ensuite remettre ce ticket à la personne située derrière le comptoir, qui se chargera de l’encaissement.

Le fonctionnement réel de la borne est donc :

1. le client démarre une commande sur la borne ;
2. il sélectionne ses produits ;
3. il personnalise sa commande si nécessaire ;
4. il vérifie son panier ;
5. il valide sa commande ;
6. la borne imprime un ticket ;
7. le client remet le ticket au comptoir ;
8. le personnel encaisse ;
9. la commande est préparée à emporter.

La borne ne remplace pas la caisse.

La borne ne gère pas le paiement.

La borne ne propose ni livraison, ni consommation sur place.

Elle sert uniquement à fluidifier la prise de commande et à générer un ticket clair pour le client, le comptoir et la préparation.

---

## 2. Objectif du projet

L’objectif est de créer une application de borne tactile simple, rapide, moderne, fiable et parfaitement adaptée à Pizza de Nuit.

L’application doit permettre au client de :

- consulter le menu ;
- choisir une ou plusieurs pizzas ;
- choisir un format ;
- ajouter des options ou suppléments ;
- ajouter des boissons ou produits complémentaires si disponibles ;
- consulter le panier ;
- vérifier le total ;
- valider la commande ;
- imprimer un ticket ;
- présenter ce ticket au comptoir pour régler.

L’objectif n’est pas de créer une application complexe.

L’objectif est de créer une borne efficace, claire, commerciale et adaptée à un usage snack / pizzeria de nuit.

La borne doit réduire l’attente, limiter les erreurs de prise de commande et rendre le parcours client plus fluide.

---

## 3. Identité de Pizza de Nuit

Pizza de Nuit doit être traitée comme une marque avec une identité forte.

L’univers à respecter est celui d’une pizzeria/snack :

- nocturne ;
- urbaine ;
- street-food ;
- rapide ;
- généreuse ;
- commerciale ;
- moderne ;
- directe ;
- orientée commande à emporter.

L’application ne doit pas transformer Pizza de Nuit en :

- pizzeria italienne traditionnelle ;
- restaurant gastronomique ;
- restaurant familial classique ;
- service de livraison ;
- application de réservation ;
- logiciel de caisse complexe.

L’expérience doit transmettre une idée simple :

> Une pizza généreuse, urbaine et accessible, pensée pour les envies du soir et de la nuit, avec une commande rapide et un retrait à emporter.

---

## 4. Respect obligatoire de la direction artistique Pizza de Nuit

La borne doit respecter la direction artistique du site officiel Pizza de Nuit :

https://pizza-de-nuit.vercel.app/

Le site officiel doit être utilisé comme référence principale pour comprendre :

- l’ambiance visuelle ;
- l’univers de marque ;
- les couleurs dominantes ;
- les contrastes ;
- le style des sections ;
- le rythme entre zones sombres et zones claires ;
- le style des boutons ;
- le style des cartes ;
- le ton commercial ;
- l’énergie street-food ;
- la hiérarchie visuelle ;
- la manière de présenter les pizzas ;
- l’identité nocturne de la marque.

La borne ne doit pas inventer une nouvelle direction artistique.

Elle doit adapter la direction artistique existante du site à un usage tactile sur borne.

L’objectif est de créer une continuité naturelle entre le site Pizza de Nuit et la borne :

- même univers ;
- même énergie ;
- même ambiance nocturne ;
- même esprit street-food ;
- même style commercial ;
- même logique de contraste ;
- même impact visuel ;
- meilleure lisibilité pour écran tactile.

La borne ne doit pas être une copie exacte du site web.

Elle doit être une adaptation fonctionnelle de la DA du site pour une expérience de commande tactile.

---

## 5. Périmètre du projet

### 5.1 Inclus dans le projet

Le projet inclut :

- interface client tactile ;
- écran d’accueil ;
- parcours de commande à emporter ;
- affichage des catégories ;
- affichage des produits ;
- affichage des pizzas ;
- détail produit ;
- choix du format ;
- choix des options ;
- choix des suppléments ;
- gestion du panier ;
- calcul du total ;
- validation finale ;
- impression ticket ;
- numéro de commande ;
- message de paiement au comptoir ;
- retour automatique à l’accueil ;
- interface administration simple ;
- gestion des produits ;
- gestion des prix ;
- gestion des formats ;
- gestion des suppléments ;
- gestion des disponibilités ;
- consultation des commandes ;
- réimpression ticket ;
- backend minimal ;
- historique simple des commandes.

---

### 5.2 Exclu du projet

Le projet exclut strictement :

- paiement sur borne ;
- paiement en ligne ;
- Stripe ;
- terminal de paiement intégré ;
- livraison ;
- consommation sur place ;
- réservation ;
- compte client obligatoire ;
- programme fidélité complexe ;
- application mobile ;
- logiciel de caisse complet ;
- comptabilité ;
- gestion TVA avancée ;
- dashboard statistique complexe ;
- gestion multi-restaurant avancée ;
- géolocalisation ;
- suivi de livraison.

La borne ne doit jamais devenir une caisse complète.

Elle doit rester une borne de commande à emporter avec ticket imprimé.

---

## 6. Utilisateurs concernés

### 6.1 Client final

Le client utilise la borne pour passer sa commande rapidement.

Profil probable :

- client pressé ;
- client de snack ;
- client nocturne ;
- jeune adulte ;
- étudiant ;
- groupe d’amis ;
- client qui commande à emporter ;
- client qui veut voir rapidement les produits et les prix.

Besoins du client :

- comprendre rapidement l’offre ;
- voir les pizzas clairement ;
- choisir un format facilement ;
- personnaliser simplement ;
- voir le total ;
- corriger son panier si besoin ;
- valider sans confusion ;
- récupérer son ticket ;
- comprendre qu’il doit payer au comptoir.

---

### 6.2 Personnel derrière le comptoir

Le personnel reçoit le ticket imprimé.

Besoins du personnel :

- lire la commande facilement ;
- identifier le numéro de commande ;
- voir les produits commandés ;
- voir les formats ;
- voir les quantités ;
- voir les options et suppléments ;
- voir le total ;
- encaisser rapidement ;
- transmettre ou préparer la commande.

---

### 6.3 Administrateur / gérant

L’administrateur utilise l’interface admin pour gérer les données essentielles.

Besoins de l’administrateur :

- gérer les produits ;
- gérer les prix ;
- gérer les formats ;
- gérer les suppléments ;
- gérer les disponibilités ;
- consulter les commandes ;
- réimprimer un ticket ;
- configurer les informations de base de la borne.

L’administration doit rester simple et efficace.

Elle ne doit pas devenir un logiciel de caisse complet.

---

## 7. Parcours utilisateur principal

Le parcours client doit être court, clair et sans ambiguïté.

Parcours obligatoire :

1. écran d’accueil ;
2. bouton `Commander à emporter` ;
3. choix d’une catégorie ;
4. consultation des produits ;
5. ouverture d’un produit ;
6. choix du format ;
7. ajout d’options ou suppléments ;
8. ajout au panier ;
9. consultation du panier ;
10. modification ou suppression si nécessaire ;
11. validation finale ;
12. impression du ticket ;
13. message de paiement au comptoir ;
14. retour automatique à l’accueil.

Aucun écran ne doit proposer :

- livraison ;
- sur place ;
- réservation ;
- paiement en ligne ;
- création de compte client.

---

## 8. Fonctionnalités côté client

L’interface client doit permettre de :

- démarrer une commande à emporter ;
- consulter les catégories ;
- consulter les pizzas ;
- consulter les boissons si disponibles ;
- consulter les desserts ou accompagnements si disponibles ;
- voir le nom d’un produit ;
- voir la description d’un produit ;
- voir les ingrédients principaux ;
- choisir un format ;
- choisir une base si le produit le permet ;
- ajouter des suppléments compatibles ;
- choisir une quantité ;
- ajouter au panier ;
- modifier le panier ;
- supprimer un produit ;
- voir le total général ;
- valider la commande ;
- déclencher l’impression du ticket ;
- afficher un numéro de commande ;
- afficher l’instruction de paiement au comptoir ;
- revenir automatiquement à l’accueil.

L’interface client ne doit pas permettre de :

- payer sur la borne ;
- choisir une livraison ;
- choisir une consommation sur place ;
- réserver une table ;
- créer un compte client obligatoire.

---

## 9. Fonctionnalités côté administration

L’interface admin doit permettre de :

- accéder à une zone protégée ;
- consulter les commandes ;
- voir le détail d’une commande ;
- changer un statut simple ;
- réimprimer un ticket ;
- consulter les produits ;
- modifier un produit ;
- désactiver un produit ;
- modifier les prix ;
- gérer les catégories ;
- gérer les formats ;
- gérer les suppléments ;
- gérer les disponibilités ;
- configurer les informations de base du ticket.

Statuts de commande recommandés :

- `created`
- `ticket_printed`
- `awaiting_counter_payment`
- `paid_at_counter`
- `in_preparation`
- `ready`
- `handed_to_customer`
- `cancelled`

L’admin doit être utile, simple et lisible.

Il ne doit pas inclure de comptabilité, de paiement, de livraison ou de caisse complète.

---

## 10. Logique métier pizzeria

### 10.1 Produits

Chaque produit doit contenir :

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

Codex ne doit pas inventer de produits.

---

### 10.2 Catégories

Catégories à prévoir dans la structure :

- pizzas base tomate ;
- pizzas base crème fraîche ;
- pizzas spéciales ;
- pizzas à composer si confirmé ;
- boissons ;
- desserts si confirmés ;
- accompagnements si confirmés ;
- sauces si confirmées.

Les catégories définitives devront être confirmées avec la carte officielle Pizza de Nuit.

---

### 10.3 Formats

Les formats à prévoir dans l’architecture sont :

- 31 cm ;
- 40 cm ;
- 1/2 mètre ;
- 60 cm.

Les prix initiaux du projet sont :

- 31 cm : 10 € ;
- 40 cm : 15 € ;
- 1/2 mètre : 20 € ;
- 60 cm : 30 €.

Ces prix doivent rester configurables.

Ils ne doivent jamais être codés en dur dans les composants d’interface.

Les grands formats doivent être valorisés visuellement avec des badges comme :

- `Format géant`
- `À partager`

---

### 10.4 Bases

Bases à prévoir :

- tomate ;
- crème fraîche ;
- autre base uniquement si confirmée.

La base doit être une donnée structurée.

Elle ne doit pas être uniquement intégrée dans une description texte.

---

### 10.5 Suppléments et options

Les suppléments doivent être configurables.

Exemples de suppléments à prévoir :

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

Sa disponibilité doit être contrôlée par les données.

---

### 10.6 Pizza moitié-moitié

La fonctionnalité moitié-moitié doit être prévue dans l’architecture si elle est confirmée.

Elle doit permettre :

- choix de deux pizzas différentes ;
- choix d’un format compatible ;
- base identique si cette règle est confirmée ;
- calcul de prix configurable ;
- affichage clair dans le panier ;
- affichage clair sur le ticket.

Le panier doit afficher clairement :

- format ;
- moitié 1 ;
- moitié 2 ;
- base ;
- suppléments ;
- total.

La règle exacte de calcul doit être confirmée avant développement final.

---

### 10.7 Panier

Le panier doit afficher :

- nom du produit ;
- format choisi ;
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

Les calculs de prix ne doivent pas être dispersés dans les composants.

---

### 10.8 Commande

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
- nombre d’impressions du ticket.

Le statut paiement ne doit jamais déclencher une logique de paiement sur borne.

---

## 11. Ticket imprimé

Le ticket imprimé est au cœur du fonctionnement de la borne.

Il sert à :

- confirmer la commande au client ;
- transmettre la commande au personnel ;
- faciliter l’encaissement ;
- faciliter la préparation.

Le ticket doit contenir :

- nom : `Pizza de Nuit` ;
- numéro de commande ;
- date et heure ;
- mention : `Commande à emporter` ;
- détail des produits ;
- formats ;
- bases ;
- options ;
- suppléments ;
- quantités ;
- total ;
- mention : `Paiement au comptoir` ;
- message client.

Message client recommandé :

`Présentez ce ticket au comptoir pour régler votre commande.`

La réimpression du ticket doit être possible depuis l’administration si la commande est enregistrée.

Le format exact du ticket dépendra du matériel choisi.

---

## 12. Impression ticket

L’impression doit être simple, fiable et adaptée à une borne.

Solutions possibles selon le matériel :

- impression navigateur ;
- fenêtre dédiée à l’impression ;
- CSS print ;
- imprimante USB ;
- imprimante réseau ;
- intégration locale spécifique si validée.

Le modèle d’imprimante ne doit pas être inventé.

La méthode d’impression doit être validée selon le matériel réel.

Le système doit rester compatible avec une impression locale depuis la borne.

---

## 13. Contraintes UX borne tactile

L’interface doit être pensée pour un usage public sur écran tactile.

Contraintes obligatoires :

- boutons larges ;
- zones tactiles confortables ;
- textes courts ;
- contraste fort ;
- navigation simple ;
- une action principale par écran ;
- retour arrière visible ;
- panier toujours accessible ;
- total toujours clair ;
- aucun formulaire long ;
- aucun clavier sauf nécessité absolue ;
- aucun élément difficile à toucher ;
- confirmation claire avant impression ;
- retour automatique à l’accueil après commande ;
- réinitialisation de la session après commande ou inactivité.

Le client doit comprendre immédiatement :

- qu’il commande à emporter ;
- qu’il ne paie pas sur la borne ;
- qu’il doit présenter le ticket au comptoir.

---

## 14. Contraintes UI et direction artistique

L’interface doit respecter strictement la direction artistique du site officiel Pizza de Nuit :

https://pizza-de-nuit.vercel.app/

Avant toute création d’écran, Codex doit analyser le site pour comprendre :

- le style général ;
- les couleurs ;
- les contrastes ;
- les zones sombres ;
- les zones claires ;
- le style commercial ;
- le style des boutons ;
- le style des cartes ;
- le rythme visuel ;
- la présentation des produits ;
- l’ambiance street-food ;
- l’énergie nocturne.

La borne doit reprendre l’esprit de la DA existante, mais l’adapter à un usage tactile.

Elle doit conserver :

- l’impact nocturne ;
- l’énergie snack ;
- la lisibilité commerciale ;
- la générosité des visuels ;
- la clarté des prix ;
- la force des appels à l’action.

L’interface ne doit pas être entièrement noire.

L’interface ne doit pas être entièrement blanche.

Elle doit utiliser une alternance visuelle claire :

- sections sombres pour l’ambiance de nuit, l’accueil, les zones fortes et les bandeaux importants ;
- sections claires pour les produits, les listes, les choix, le panier et les récapitulatifs.

Palette recommandée à adapter selon le site :

- noir / anthracite ;
- blanc / blanc cassé ;
- jaune / doré ;
- rouge ;
- gris clair.

À privilégier :

- gros titres ;
- prix très lisibles ;
- boutons francs ;
- cartes produits propres ;
- visuels pizzas généreux ;
- badges commerciaux ;
- contraste fort ;
- hiérarchie immédiate ;
- design fast-food moderne ;
- alternance sombre / clair ;
- interface tactile énergique.

À éviter :

- design italien rustique ;
- ambiance gastronomique ;
- interface froide ;
- minimalisme trop vide ;
- textes longs ;
- boutons petits ;
- cartes produits illisibles ;
- interface 100 % sombre ;
- interface 100 % blanche ;
- animations lentes ;
- effets décoratifs inutiles.

Règle principale :

> La borne doit donner l’impression d’appartenir naturellement à Pizza de Nuit, tout en étant plus simple, plus lisible et plus tactile que le site web.

---

## 15. Contraintes techniques

L’application doit être :

- propre ;
- typée ;
- maintenable ;
- modulaire ;
- rapide ;
- compatible tactile ;
- compatible impression ticket ;
- compatible backend minimal ;
- facile à faire évoluer.

Stack recommandée :

- Next.js ;
- React ;
- TypeScript ;
- Tailwind CSS ;
- Route Handlers ou API Routes Next.js ;
- stockage simple à définir.

Principes techniques obligatoires :

- ne pas coder les produits dans les composants UI ;
- ne pas coder les prix dans les composants UI ;
- ne pas figer les formats dans l’interface ;
- centraliser la logique panier ;
- centraliser la logique prix ;
- centraliser les règles de commande ;
- séparer interface client et interface admin ;
- séparer logique métier et composants visuels ;
- structurer les données ;
- prévoir une structure compatible avec l’impression ticket.

---

## 16. Backend minimal

Un backend minimal est autorisé.

Il doit rester simple et utile.

Le backend peut servir à :

- charger le menu ;
- charger les réglages ;
- enregistrer les commandes ;
- générer un numéro de commande ;
- conserver un historique simple ;
- consulter les commandes depuis l’admin ;
- préparer une réimpression ticket ;
- vérifier l’état du système.

Le backend ne doit pas gérer :

- paiement ;
- données bancaires ;
- livraison ;
- réservation ;
- caisse complète ;
- compte client obligatoire ;
- fidélité complexe.

Le backend doit soutenir l’application.

Il ne doit pas la complexifier.

---

## 17. API minimale recommandée

Routes recommandées :

- `GET /api/menu`
- `GET /api/settings`
- `POST /api/orders`
- `GET /api/orders`
- `GET /api/orders/:id`
- `POST /api/orders/:id/reprint`
- `GET /api/health`

Aucune route de paiement ne doit être créée.

Aucune route de livraison ne doit être créée.

Aucune route de réservation ne doit être créée.

---

## 18. Données et configuration

Les données principales à prévoir sont :

- produits ;
- catégories ;
- formats ;
- bases ;
- ingrédients ;
- suppléments ;
- commandes ;
- tickets ;
- réglages borne ;
- informations du point de vente.

Les produits, prix, formats et suppléments doivent être configurables.

Les informations critiques ne doivent pas être codées en dur dans l’interface.

Au démarrage, les données peuvent être stockées simplement, puis évoluer vers une base de données si nécessaire.

---

## 19. Sécurité

Le projet doit prévoir :

- aucune donnée bancaire ;
- aucune donnée de paiement ;
- aucune donnée personnelle obligatoire ;
- protection simple de l’administration ;
- validation des données envoyées au backend ;
- séparation claire entre client et admin ;
- routes backend limitées ;
- variables d’environnement uniquement si nécessaire.

Le projet ne doit pas faire croire à une sécurité avancée si elle n’est pas réellement implémentée.

La simplicité doit rester prioritaire.

---

## 20. Performance

La borne doit être rapide et fluide.

Exigences :

- chargement rapide ;
- interaction tactile immédiate ;
- images optimisées ;
- composants légers ;
- animations courtes ;
- transitions utiles ;
- aucun effet bloquant ;
- panier réactif ;
- retour automatique à l’accueil ;
- interface utilisable par un client pressé.

La performance est prioritaire sur les effets visuels décoratifs.

---

## 21. Accessibilité et lisibilité

L’application doit être lisible par tous les clients.

Prévoir :

- gros textes ;
- prix très visibles ;
- contraste fort ;
- boutons clairs ;
- icônes simples ;
- zones tactiles larges ;
- formulations courtes ;
- messages d’erreur compréhensibles ;
- consignes explicites.

Textes adaptés :

- `Commander à emporter`
- `Ajouter au panier`
- `Modifier`
- `Supprimer`
- `Valider et imprimer le ticket`
- `Présentez votre ticket au comptoir pour régler votre commande.`

Termes à éviter :

- `Payer`
- `Payer maintenant`
- `Livraison`
- `Sur place`
- `Réserver`
- `Créer un compte`

---

## 22. Écrans à prévoir

### 22.1 Écrans côté client

Écrans nécessaires :

1. Accueil
2. Catégories
3. Liste produits
4. Détail produit
5. Choix format
6. Options et suppléments
7. Panier
8. Validation finale
9. Impression / confirmation
10. Erreur impression si nécessaire
11. Mode maintenance
12. Retour accueil automatique

---

### 22.2 Écrans côté admin

Écrans nécessaires :

1. Connexion admin
2. Tableau de bord simple
3. Liste des commandes
4. Détail commande
5. Réimpression ticket
6. Liste produits
7. Modification produit
8. Gestion formats
9. Gestion suppléments
10. Gestion disponibilités
11. Réglages ticket

---

## 23. Messages obligatoires

Bouton principal accueil :

`Commander à emporter`

Mention visible dans le panier :

`Paiement au comptoir après impression du ticket.`

Bouton final obligatoire :

`Valider et imprimer le ticket`

Message final obligatoire :

`Présentez votre ticket au comptoir pour régler votre commande.`

Le mot `Payer` ne doit jamais être utilisé comme action finale de la borne.

---

## 24. Critères de validation du projet

Le projet est validé si :

- le client peut commander à emporter sans aide ;
- le parcours est clair du début à la fin ;
- aucun mode livraison n’existe ;
- aucun mode sur place n’existe ;
- aucun paiement sur borne n’existe ;
- le panier calcule correctement le total ;
- les formats sont sélectionnables ;
- les suppléments sont configurables ;
- le bouton final est `Valider et imprimer le ticket` ;
- le ticket contient toutes les informations nécessaires ;
- le message de paiement au comptoir est visible ;
- la session revient automatiquement à l’accueil ;
- l’interface est utilisable au tactile ;
- la direction artistique du site Pizza de Nuit est respectée ;
- l’application ressemble à une extension naturelle de l’univers Pizza de Nuit ;
- le backend reste minimal ;
- Codex peut développer sans ambiguïté à partir du document.

---

## 25. Points à confirmer

### 25.1 Informations restaurant

- adresse exacte du point de vente concerné ;
- ville exacte de la borne ;
- horaires réels ;
- numéro de téléphone ;
- logo final ;
- photos officielles ;
- couleurs officielles ;
- typographies officielles.

---

### 25.2 Menu

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

---

### 25.3 Formats et options

- confirmation des formats réellement disponibles ;
- confirmation des prix ;
- disponibilité du 1/2 mètre ;
- disponibilité du 60 cm ;
- disponibilité de la moitié-moitié ;
- règle de calcul moitié-moitié ;
- base identique obligatoire ou non ;
- prix du cheesy crust ;
- prix des suppléments ;
- compatibilité des suppléments par format.

---

### 25.4 Matériel

- format écran de la borne ;
- orientation écran : vertical ou horizontal ;
- modèle d’imprimante ;
- largeur ticket ;
- connexion imprimante : USB, réseau ou autre ;
- méthode réelle d’impression ;
- besoin d’un ticket cuisine ;
- besoin de réimpression ;
- environnement de déploiement.

---

### 25.5 Administration

- niveau exact de l’admin ;
- besoin de comptes multiples ou non ;
- besoin de statistiques ou non ;
- besoin d’export ou non ;
- méthode de stockage souhaitée ;
- choix définitif de la base de données.

---

## 26. Règles à respecter par Codex

Codex doit toujours :

- lire `PROJECT_CONTEXT.md` avant de développer ;
- lire `AGENT.md` avant de développer ;
- consulter le site officiel Pizza de Nuit pour comprendre la DA ;
- respecter le fonctionnement à emporter ;
- respecter l’impression ticket ;
- respecter le paiement au comptoir ;
- garder le backend minimal ;
- structurer le code proprement ;
- centraliser les règles métier ;
- centraliser la logique panier ;
- ne pas inventer la carte ;
- ne pas inventer les prix ;
- ne pas inventer les horaires ;
- ne pas inventer les produits ;
- ne pas créer de paiement ;
- ne pas créer de livraison ;
- ne pas créer de sur place ;
- ne pas créer de système de réservation.

Codex doit signaler les informations manquantes au lieu de les inventer.

---

## 27. Conclusion

L’application à développer est une borne tactile de commande à emporter pour Pizza de Nuit.

Elle doit rester :

- simple ;
- rapide ;
- claire ;
- tactile ;
- fiable ;
- commerciale ;
- fidèle à la direction artistique du site officiel Pizza de Nuit.

Le fonctionnement central à respecter est :

1. le client commande sur la borne ;
2. la borne imprime un ticket ;
3. le client présente le ticket au comptoir ;
4. le personnel encaisse ;
5. la commande est préparée à emporter.

Le projet doit respecter l’ADN Pizza de Nuit :

- pizza de nuit ;
- street-food ;
- snack urbain ;
- formats généreux ;
- commande rapide ;
- interface commerciale ;
- ticket clair ;
- paiement au comptoir ;
- direction artistique cohérente avec le site officiel.

Codex devra utiliser ce cahier des charges comme référence pour développer une application cohérente, maintenable, tactile et fidèle au fonctionnement réel de Pizza de Nuit.