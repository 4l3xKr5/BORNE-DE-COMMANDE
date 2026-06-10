# PROJECT_CONTEXT.md

## 1. Présentation du projet

Ce projet consiste à développer une application complète de **borne de commande tactile** pour **Pizza de Nuit**, un snack/pizzeria orienté vente à emporter.

La borne sera installée dans le snack et servira uniquement à permettre aux clients de préparer leur commande sur écran tactile.

Le fonctionnement réel est le suivant :

1. le client compose sa commande sur la borne ;
2. il valide sa commande ;
3. la borne imprime un ticket récapitulatif ;
4. le client remet ce ticket à la personne derrière le comptoir ;
5. le personnel encaisse la commande ;
6. la commande est préparée pour être emportée.

La borne ne doit pas gérer le paiement directement.  
La borne ne doit pas proposer de consommation sur place.  
La borne ne doit pas proposer de livraison.  
Le parcours doit être exclusivement orienté **commande à emporter + ticket + paiement au comptoir**.

Source principale à respecter : le site de référence Pizza de Nuit.

---

## 2. Objectif de l’application

L’objectif est de créer une application de borne tactile permettant aux clients de commander rapidement, clairement et sans assistance.

L’application doit permettre de :

- consulter le menu ;
- choisir une ou plusieurs pizzas ;
- choisir un format ;
- sélectionner des options ou suppléments ;
- ajouter des produits au panier ;
- vérifier le récapitulatif ;
- valider la commande ;
- imprimer un ticket clair ;
- inviter le client à présenter le ticket au comptoir pour régler.

L’application doit remplacer la prise de commande orale au comptoir, mais pas l’encaissement.

Le client ne paie pas sur la borne.  
Le personnel encaisse après lecture du ticket.

---

## 3. Présentation de Pizza de Nuit

**Pizza de Nuit** est une enseigne de pizza à l’identité nocturne, urbaine, rapide et street-food.

Éléments importants à retenir :

- nom de marque : **Pizza de Nuit** ;
- positionnement : pizza de nuit, snack, street-food, commande rapide ;
- univers : nocturne, urbain, commercial, direct ;
- fonctionnement de la borne : commande à emporter uniquement ;
- la borne sert à fluidifier la prise de commande ;
- le ticket imprimé sert de support pour l’encaissement au comptoir.

Pizza de Nuit ne doit pas être traitée comme une pizzeria italienne traditionnelle ou gastronomique.  
L’application doit traduire une identité de snack/pizzeria moderne, efficace, nocturne et commerciale.

---

## 4. Essence de la marque

L’essence de Pizza de Nuit :

> Une pizza généreuse, urbaine et accessible, pensée pour les envies du soir et de la nuit, avec une commande rapide, des formats forts et une expérience simple à emporter.

L’application doit transmettre :

- une ambiance nocturne ;
- une énergie street-food ;
- une lecture immédiate des produits ;
- une forte mise en avant des pizzas ;
- un parcours court ;
- une logique commerciale claire ;
- une interface pensée pour commander vite ;
- une expérience adaptée aux clients qui veulent prendre à emporter.

L’ADN à respecter :

- nuit ;
- snack ;
- pizza ;
- rapidité ;
- street-food ;
- vente à emporter ;
- formats généreux ;
- commande efficace ;
- ticket imprimé ;
- paiement au comptoir.

---

## 5. Positionnement commercial

Pizza de Nuit doit être positionnée comme une pizzeria/snack :

- nocturne ;
- urbaine ;
- directe ;
- généreuse ;
- rapide ;
- commerciale ;
- adaptée aux groupes ;
- adaptée aux commandes tardives ;
- adaptée au retrait à emporter.

Le positionnement ne doit pas être :

- gastronomique ;
- institutionnel ;
- familial traditionnel ;
- premium froid ;
- trop minimaliste ;
- trop complexe.

Le ton doit être court, clair et orienté action.

Exemples de formulations adaptées :

- “Commander à emporter”
- “Choisis ta pizza”
- “Sélectionne ton format”
- “Ajoute au panier”
- “Valider et imprimer le ticket”
- “Présente ton ticket au comptoir”
- “Paiement au comptoir”
- “Commande à emporter”

Formulations à éviter :

- “Payer maintenant”
- “Réserver une table”
- “Choisir livraison”
- “Consommer sur place”
- “Créer un compte”
- “Suivre ma livraison”

---

## 6. Utilisateurs concernés

### Client final

Le client utilise la borne pour commander sans passer immédiatement par le personnel.

Profil probable :

- client pressé ;
- client de snack ;
- client qui commande à emporter ;
- jeune adulte ;
- étudiant ;
- groupe d’amis ;
- client nocturne ;
- client habitué au fast-food ;
- client qui veut voir rapidement le prix total.

Besoins :

- comprendre l’offre sans aide ;
- voir les produits rapidement ;
- choisir un format facilement ;
- personnaliser si nécessaire ;
- valider sans confusion ;
- récupérer un ticket ;
- savoir clairement où payer.

### Personnel derrière le comptoir

Le personnel reçoit le ticket du client.

Besoins :

- lire facilement la commande ;
- comprendre les formats ;
- voir les options et suppléments ;
- vérifier le total ;
- encaisser rapidement ;
- transmettre la commande en préparation.

### Administrateur / gérant

Le gérant utilise l’interface admin.

Besoins :

- gérer le menu ;
- modifier les prix ;
- désactiver un produit ;
- gérer les formats ;
- gérer les suppléments ;
- consulter les commandes ;
- gérer l’impression ticket ;
- ajuster les informations selon le point de vente.

---

## 7. Type d’application à développer

Application web tactile de type **kiosk ordering app**.

L’application doit être conçue pour :

- une borne tactile physique ;
- un usage public ;
- une navigation sans souris ni clavier ;
- des boutons larges ;
- une lecture rapide ;
- un environnement snack ;
- une commande à emporter uniquement ;
- une impression automatique du ticket ;
- un retour automatique à l’accueil après commande.

Modules principaux :

- interface client tactile ;
- panier ;
- tunnel de validation ;
- génération de commande ;
- impression ticket ;
- interface administration ;
- gestion des produits ;
- gestion des prix ;
- gestion des commandes ;
- configuration des formats et options.

---

## 8. Parcours principal de commande

### 1. Écran d’accueil

Objectif : lancer la commande immédiatement.

Contenu :

- logo Pizza de Nuit ;
- phrase courte liée à la commande à emporter ;
- bouton principal : **“Commander à emporter”** ;
- indication claire : **“Paiement au comptoir après impression du ticket”**.

À ne pas afficher :

- livraison ;
- sur place ;
- réservation ;
- compte client ;
- paiement en ligne.

---

### 2. Sélection des catégories

Catégories à prévoir :

- pizzas base tomate ;
- pizzas base crème fraîche ;
- pizzas spéciales ;
- pizzas à composer si confirmé ;
- boissons ;
- accompagnements si confirmés ;
- desserts si confirmés.

Les catégories doivent être grandes, visuelles et faciles à toucher.

---

### 3. Liste des produits

Chaque carte produit doit afficher :

- nom de la pizza ;
- image ou visuel ;
- base ;
- ingrédients principaux ;
- prix de départ ;
- badge éventuel : populaire, épicée, généreuse, format géant ;
- bouton ou zone tactile d’ajout.

Les produits exacts doivent être confirmés avec la carte officielle avant intégration définitive.

---

### 4. Détail produit

L’écran détail doit permettre de choisir :

- le format ;
- la quantité ;
- les options ;
- les suppléments ;
- les instructions éventuelles si autorisées.

L’écran doit afficher :

- nom du produit ;
- ingrédients ;
- base ;
- prix dynamique ;
- bouton **“Ajouter au panier”**.

---

### 5. Panier

Le panier doit afficher :

- chaque produit ;
- format choisi ;
- quantité ;
- options ;
- suppléments ;
- prix ligne par ligne ;
- total ;
- bouton modifier ;
- bouton supprimer ;
- bouton **“Valider ma commande”**.

Le panier doit rappeler clairement :

> Paiement au comptoir après impression du ticket.

---

### 6. Validation finale

L’écran final doit afficher :

- récapitulatif complet ;
- total ;
- mention **“Commande à emporter”** ;
- mention **“Paiement au comptoir”** ;
- bouton final : **“Valider et imprimer le ticket”**.

Ne jamais utiliser le mot **“Payer”** pour le bouton final.

---

### 7. Impression du ticket

Après validation :

- la commande est créée ;
- le ticket est imprimé ;
- le panier est vidé ;
- un numéro de commande est affiché ;
- le client reçoit une instruction claire.

Message recommandé :

> Commande validée.  
> Prenez votre ticket et présentez-le au comptoir pour régler votre commande.

---

### 8. Retour automatique à l’accueil

Après quelques secondes :

- l’écran revient à l’accueil ;
- la session client est réinitialisée ;
- aucune donnée du client précédent ne reste visible.

---

## 9. Fonctionnalités principales côté client

L’interface client doit permettre :

- commander uniquement à emporter ;
- consulter le menu ;
- filtrer par catégorie ;
- voir les pizzas ;
- voir les ingrédients ;
- choisir un format ;
- ajouter des options ;
- ajouter des suppléments ;
- gérer les quantités ;
- ajouter au panier ;
- modifier un produit dans le panier ;
- supprimer un produit ;
- voir le total en temps réel ;
- valider la commande ;
- imprimer le ticket ;
- afficher le numéro de commande ;
- afficher l’instruction de paiement au comptoir ;
- revenir automatiquement à l’accueil.

L’interface client ne doit pas proposer :

- paiement sur borne ;
- paiement en ligne ;
- livraison ;
- consommation sur place ;
- réservation ;
- compte client obligatoire ;
- programme fidélité au démarrage ;
- saisie longue d’informations personnelles.

---

## 10. Fonctionnalités principales côté administration

L’interface admin doit permettre :

- connexion sécurisée ;
- tableau de bord simple ;
- gestion des pizzas ;
- ajout / modification / suppression de produits ;
- activation / désactivation d’un produit ;
- gestion des catégories ;
- gestion des ingrédients ;
- gestion des bases ;
- gestion des formats ;
- gestion des prix ;
- gestion des suppléments ;
- gestion des boissons ;
- gestion des disponibilités ;
- consultation des commandes ;
- consultation du détail d’une commande ;
- changement de statut d’une commande ;
- réimpression d’un ticket ;
- annulation d’une commande ;
- configuration du ticket ;
- configuration du point de vente.

Statuts de commande recommandés :

- créée ;
- ticket imprimé ;
- en attente de paiement comptoir ;
- payée au comptoir ;
- en préparation ;
- prête ;
- remise au client ;
- annulée.

L’admin doit rester opérationnel et simple.  
Il ne doit pas devenir un logiciel de caisse complet au démarrage.

---

## 11. Logique métier pizzeria

### Produit

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

---

### Catégories

Catégories à prévoir :

- pizzas base tomate ;
- pizzas base crème fraîche ;
- pizzas spéciales ;
- pizzas à composer si confirmé ;
- boissons ;
- accompagnements si confirmés ;
- desserts si confirmés.

---

### Bases

Bases à prévoir :

- tomate ;
- crème fraîche ;
- base spéciale si confirmée ;
- base au choix si pizza à composer confirmée.

La base doit être une donnée structurée, pas un simple texte libre.

---

### Formats

Formats projet à prévoir :

- 31 cm ;
- 40 cm ;
- 1/2 mètre ;
- 60 cm.

Prix projet fournis à intégrer comme configuration initiale, sous réserve de confirmation finale :

- 31 cm : 10 € ;
- 40 cm : 15 € ;
- 1/2 mètre : 20 € ;
- 60 cm : 30 €.

Important :

- les prix de la borne doivent être ceux validés par le snack ;
- les prix ne doivent jamais être codés en dur ;
- les prix doivent être modifiables depuis l’administration ;
- les plateformes externes peuvent afficher des prix différents, notamment à cause des commissions ou des conditions de livraison.

---

### Grands formats

Les formats 1/2 mètre et 60 cm doivent être traités comme des éléments différenciants.

L’application doit les valoriser avec :

- badge “Format géant” ;
- badge “À partager” ;
- mise en avant visuelle ;
- explication claire ;
- prix visible ;
- compatibilité avec moitié-moitié si confirmé.

---

### Pizza moitié-moitié

À prévoir si confirmé par le gérant.

Règles recommandées :

- disponible uniquement sur les grands formats ;
- choix de deux pizzas différentes ;
- base identique obligatoire si règle confirmée ;
- prix calculé selon la règle validée ;
- affichage clair dans le panier.

Le panier doit afficher :

- format ;
- moitié 1 ;
- moitié 2 ;
- base ;
- suppléments ;
- total.

---

### Suppléments

Suppléments à prévoir dans la structure :

- cheesy crust ;
- ingrédient supplémentaire ;
- fromage supplémentaire ;
- sauce ;
- option épicée ;
- autres suppléments à confirmer.

Chaque supplément doit contenir :

- nom ;
- prix ;
- disponibilité ;
- compatibilité avec certains formats ;
- quantité maximale si nécessaire.

Le supplément ne doit pas être disponible partout par défaut.  
Sa compatibilité doit être contrôlée par la donnée.

---

### Boissons

La borne doit permettre :

- affichage des boissons ;
- prix unitaire ;
- quantité ;
- ajout au panier ;
- disponibilité admin.

Les boissons exactes doivent être confirmées avec la carte officielle du snack.

---

### Panier

Le panier doit calculer :

- prix produit ;
- prix format ;
- prix suppléments ;
- quantité ;
- sous-total ;
- total général.

Chaque ligne panier doit contenir :

- produit ;
- format ;
- base ;
- options ;
- suppléments ;
- quantité ;
- prix unitaire ;
- total ligne.

---

### Commande

Chaque commande doit contenir :

- identifiant unique ;
- numéro de commande visible ;
- date et heure ;
- type : à emporter ;
- statut ;
- lignes de commande ;
- total ;
- statut paiement : à régler au comptoir ;
- statut impression ;
- nombre d’impressions du ticket.

---

## 12. Contraintes UX pour borne tactile

L’application doit respecter les contraintes suivantes :

- boutons très larges ;
- navigation simple ;
- aucune interaction complexe ;
- aucun clavier sauf nécessité absolue ;
- aucun formulaire long ;
- textes courts ;
- contraste fort ;
- total visible ;
- panier accessible ;
- retour arrière visible ;
- confirmation claire ;
- impression ticket compréhensible ;
- retour automatique à l’accueil ;
- suppression automatique de la session après commande.

Règles spécifiques au fonctionnement Pizza de Nuit :

- le client doit comprendre qu’il commande à emporter ;
- le client doit comprendre qu’il ne paie pas sur la borne ;
- la validation doit être distinguée du paiement ;
- le bouton final doit indiquer l’impression du ticket ;
- le ticket doit être présenté comme l’étape finale de la borne ;
- le comptoir doit être présenté comme l’étape suivante.

Bouton final obligatoire :

> Valider et imprimer le ticket

Message final obligatoire :

> Présentez votre ticket au comptoir pour régler votre commande.

---

## 13. Contraintes UI et direction visuelle

L’interface doit respecter l’univers Pizza de Nuit :

- sombre ;
- nocturne ;
- urbain ;
- street-food ;
- rapide ;
- commercial ;
- énergique ;
- appétissant.

Direction visuelle recommandée :

- fond noir ou très sombre ;
- accents jaunes ou dorés ;
- accents rouges pour les éléments commerciaux ;
- blanc pour la lisibilité ;
- visuels pizza grands et appétissants ;
- cartes produits dynamiques ;
- badges visibles ;
- interface tactile moderne ;
- ambiance snack de nuit ;
- design plus proche d’un fast-food moderne que d’un restaurant classique.

À privilégier :

- gros titres ;
- prix très lisibles ;
- boutons francs ;
- contrastes forts ;
- hiérarchie visuelle immédiate ;
- photos produit généreuses ;
- icônes simples ;
- parcours visuel rapide.

À éviter :

- design italien rustique ;
- ambiance gastronomique ;
- interface trop blanche ;
- interface trop froide ;
- textes longs ;
- boutons petits ;
- navigation web classique ;
- animations lentes ;
- effets décoratifs inutiles.

---

## 14. Contraintes techniques générales

Codex doit construire une application :

- propre ;
- maintenable ;
- typée ;
- modulaire ;
- data-driven ;
- compatible borne tactile ;
- facile à connecter à une imprimante ticket ;
- facile à administrer ;
- évolutive.

Stack recommandée si non modifiée :

- Next.js ;
- React ;
- TypeScript ;
- Tailwind CSS ;
- base de données à définir ;
- système d’impression ticket à définir ;
- interface admin protégée.

Principes techniques obligatoires :

- ne pas coder les produits directement dans les composants ;
- ne pas coder les prix directement dans l’UI ;
- centraliser la logique panier ;
- centraliser la logique de calcul ;
- centraliser les formats ;
- séparer interface client et administration ;
- séparer logique métier et composants visuels ;
- prévoir une structure compatible impression ticket ;
- prévoir une configuration simple pour le point de vente.

Modules recommandés :

- `products`
- `categories`
- `formats`
- `options`
- `supplements`
- `cart`
- `orders`
- `ticket`
- `admin`
- `settings`

---

## 15. Rôle de Codex dans le projet

Codex doit agir comme un développeur senior produit.

Son rôle :

- respecter ce fichier comme source de vérité ;
- construire une borne de commande à emporter ;
- ne pas ajouter de paiement borne sans demande ;
- ne pas ajouter de livraison ;
- ne pas ajouter de sur place ;
- ne pas inventer de produits ;
- ne pas inventer de prix non confirmés ;
- structurer le code proprement ;
- isoler la logique métier ;
- prioriser l’usage tactile ;
- prévoir l’impression ticket ;
- signaler les informations manquantes ;
- rester fidèle à l’identité Pizza de Nuit.

Codex doit toujours privilégier :

- simplicité ;
- rapidité ;
- lisibilité ;
- robustesse ;
- cohérence ;
- maintenabilité ;
- fidélité au fonctionnement réel du snack.

---

## 16. Règles importantes à respecter

Règles métier :

- la borne sert uniquement à commander à emporter ;
- le client ne paie pas sur la borne ;
- le client paie au comptoir ;
- la borne imprime un ticket ;
- le ticket sert de support de commande et d’encaissement ;
- aucun mode sur place ;
- aucun mode livraison ;
- aucun compte client obligatoire ;
- aucun paiement en ligne au démarrage.

Règles produit :

- les formats doivent être configurables ;
- les prix doivent être configurables ;
- les suppléments doivent être configurables ;
- les produits doivent être administrables ;
- les disponibilités doivent être administrables ;
- les commandes doivent être consultables ;
- les tickets doivent pouvoir être réimprimés.

Règles UX :

- une action principale par écran ;
- retour arrière toujours disponible ;
- panier toujours accessible ;
- total clair ;
- validation finale explicite ;
- message de paiement au comptoir visible ;
- retour automatique à l’accueil.

Règles techniques :

- code propre ;
- composants réutilisables ;
- logique panier centralisée ;
- logique prix centralisée ;
- données structurées ;
- pas de valeurs critiques codées en dur ;
- séparation client/admin ;
- structure prête pour base de données.

---

## 17. Ce que Codex ne doit pas faire

Codex ne doit pas :

- créer une pizzeria générique ;
- créer un site vitrine ;
- créer une interface non tactile ;
- intégrer Stripe par défaut ;
- intégrer un terminal de paiement par défaut ;
- proposer le paiement en ligne ;
- proposer le paiement sur borne ;
- proposer la livraison ;
- proposer la consommation sur place ;
- proposer une réservation ;
- demander une création de compte client ;
- inventer des horaires ;
- inventer des adresses ;
- inventer des offres ;
- inventer des produits non confirmés ;
- figer les prix dans le code ;
- figer les formats dans l’UI ;
- mélanger interface client et interface admin ;
- ignorer le ticket imprimé ;
- utiliser le mot “Payer” comme action finale de la borne.

---

## 18. Priorités du développement

### Priorité 1 — Socle métier

- structure des produits ;
- structure des catégories ;
- structure des formats ;
- structure des prix ;
- structure des suppléments ;
- logique panier ;
- calcul total ;
- modèle de commande.

### Priorité 2 — Parcours client tactile

- écran d’accueil ;
- bouton “Commander à emporter” ;
- catégories ;
- liste produits ;
- détail produit ;
- choix format ;
- options ;
- panier ;
- validation ;
- message paiement comptoir.

### Priorité 3 — Ticket

- génération du ticket ;
- contenu clair ;
- numéro de commande ;
- détail produits ;
- total ;
- mention à emporter ;
- mention paiement comptoir ;
- impression ;
- réimpression admin.

### Priorité 4 — Administration

- gestion produits ;
- gestion prix ;
- gestion formats ;
- gestion suppléments ;
- gestion disponibilités ;
- gestion commandes ;
- réimpression ticket ;
- changement de statut.

### Priorité 5 — Finitions borne

- timeout inactivité ;
- retour accueil ;
- mode plein écran ;
- optimisation tactile ;
- états d’erreur ;
- confirmation impression ;
- design final Pizza de Nuit.

### Priorité 6 — Intégrations futures seulement si demandées

- écran cuisine ;
- statistiques ;
- multi-point de vente ;
- synchronisation caisse ;
- imprimante réseau ;
- fidélité ;
- promotions ;
- paiement intégré.

---

## 19. Points à confirmer si absents du site

### Informations restaurant

- adresse exacte du snack concerné ;
- ville exacte de la borne ;
- numéro de téléphone ;
- horaires réels ;
- logo final ;
- photos officielles ;
- couleurs officielles ;
- typographies officielles.

### Fonctionnement opérationnel

- nombre de bornes ;
- emplacement de la borne ;
- type d’écran ;
- format écran vertical ou horizontal ;
- modèle d’imprimante ticket ;
- connexion imprimante : USB, réseau, Bluetooth ;
- besoin de réimpression ;
- besoin d’un double ticket cuisine ;
- besoin d’un écran cuisine ou non.

### Menu

- liste officielle des pizzas ;
- ingrédients exacts ;
- catégories exactes ;
- bases disponibles ;
- pizzas base tomate ;
- pizzas base crème fraîche ;
- pizzas spéciales ;
- pizzas à composer ;
- boissons ;
- desserts ;
- accompagnements ;
- sauces ;
- allergènes ;
- disponibilité selon point de vente.

### Formats et prix

- prix exacts à utiliser sur la borne ;
- différence éventuelle entre prix borne et prix plateformes ;
- formats réellement disponibles ;
- disponibilité du 1/2 mètre ;
- disponibilité du 60 cm ;
- disponibilité du moitié-moitié ;
- règle de calcul moitié-moitié ;
- base identique obligatoire ou non ;
- supplément cheesy crust ;
- prix des suppléments ;
- compatibilité des suppléments par format.

### Encaissement

- paiement uniquement au comptoir confirmé ;
- moyens de paiement acceptés au comptoir ;
- besoin d’afficher “espèces / CB” ou non ;
- besoin de numéro de commande ;
- besoin de code commande ;
- besoin d’un statut “payé” dans l’admin.

### Ticket

- largeur ticket ;
- logo sur ticket ou non ;
- mentions légales ;
- TVA ou non ;
- détail TVA ou non ;
- numéro de commande ;
- date et heure ;
- message client ;
- message cuisine ;
- QR code ou non.

### Administration

- rôles admin ;
- mot de passe unique ou comptes multiples ;
- gestion multi-ville ou non ;
- statistiques nécessaires ;
- exports nécessaires ;
- annulation commande ;
- modification commande après impression ;
- historique des commandes.

---

## Conclusion de référence

L’application à développer est une **borne tactile de commande à emporter** pour **Pizza de Nuit**.

Elle doit respecter ce fonctionnement central :

> Le client commande sur la borne, valide sa commande, récupère un ticket imprimé, remet le ticket au comptoir, puis paie auprès du personnel.

L’ADN à respecter :

> Pizza de nuit, street-food, snack urbain, commande rapide, formats généreux, interface tactile simple, ticket clair, paiement au comptoir.

Codex doit utiliser ce fichier comme référence avant toute création de code, de composant, de logique panier, de modèle de données, d’écran client, d’interface admin ou de système d’impression.