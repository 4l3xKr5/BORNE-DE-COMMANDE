# USER_FLOW.md

## 1. Objectif du document

Ce document définit le parcours utilisateur complet de l’application de borne de commande tactile pour **Pizza de Nuit**.

Il sert de référence à Codex pour concevoir et développer les écrans côté client de la borne.

L’objectif est de garantir un parcours :

- simple ;
- rapide ;
- tactile ;
- clair ;
- commercial ;
- adapté à Pizza de Nuit ;
- orienté uniquement vers la commande à emporter ;
- basé sur l’impression d’un ticket ;
- sans paiement sur la borne.

Ce document ne définit pas l’architecture technique complète, ni le design system, ni le back-office détaillé.

Il se concentre uniquement sur le parcours utilisateur côté borne.

---

## 2. Sources de référence

Les sources de vérité du parcours sont :

1. `PROJECT_CONTEXT.md`
2. `AGENT.md`
3. `CAHIER_DES_CHARGES.md`
4. site officiel Pizza de Nuit : `https://pizza-de-nuit.vercel.app/`

Le site Pizza de Nuit doit être utilisé pour comprendre :

- l’identité visuelle ;
- l’ambiance nocturne ;
- l’énergie street-food ;
- le style commercial ;
- l’alternance entre zones sombres et zones claires ;
- le ton direct ;
- la manière de présenter les pizzas.

La borne ne doit pas inventer une nouvelle identité.

Elle doit adapter l’univers du site à une expérience tactile plus simple, plus lisible et plus rapide.

---

## 3. Principes fondamentaux du parcours

Le parcours de la borne repose sur une règle centrale :

> Le client commande sur la borne, valide sa commande, récupère un ticket imprimé, présente ce ticket au comptoir, puis paie auprès du personnel.

La borne sert uniquement à préparer la commande.

Elle ne doit jamais devenir :

- une caisse ;
- une application de paiement ;
- un service de livraison ;
- un outil de réservation ;
- un espace client ;
- une application mobile ;
- un logiciel de gestion complexe.

Règles absolues :

- commande à emporter uniquement ;
- aucun mode sur place ;
- aucune livraison ;
- aucun paiement sur borne ;
- aucun paiement en ligne ;
- aucun bouton `Payer` ;
- aucun compte client obligatoire ;
- aucun formulaire long ;
- aucun tunnel complexe ;
- impression d’un ticket obligatoire ;
- paiement au comptoir obligatoire ;
- retour automatique à l’accueil après la commande.

---

## 4. Acteurs concernés

### 4.1 Client final

Le client utilise la borne pour composer sa commande rapidement.

Ses besoins :

- comprendre immédiatement qu’il commande à emporter ;
- consulter le menu sans aide ;
- voir les pizzas clairement ;
- choisir un format facilement ;
- ajouter des options ou suppléments si nécessaire ;
- vérifier son panier ;
- voir le total ;
- valider sa commande sans confusion ;
- récupérer un ticket ;
- comprendre qu’il doit payer au comptoir.

---

### 4.2 Personnel au comptoir

Le personnel reçoit le ticket imprimé présenté par le client.

Ses besoins :

- lire rapidement la commande ;
- voir le numéro de commande ;
- voir les produits ;
- voir les formats ;
- voir les quantités ;
- voir les suppléments ;
- voir le total ;
- encaisser le client ;
- transmettre ou préparer la commande.

---

### 4.3 Administrateur / gérant

L’administrateur n’intervient pas dans le parcours client direct, mais le parcours doit rester compatible avec :

- la gestion des produits ;
- la gestion des formats ;
- la gestion des prix ;
- la gestion des suppléments ;
- la gestion des disponibilités ;
- la consultation des commandes ;
- la réimpression d’un ticket.

---

## 5. Vue globale du parcours client

Parcours principal :

1. Le client arrive sur l’écran d’accueil.
2. Il appuie sur `Commander à emporter`.
3. Il choisit une catégorie.
4. Il consulte les produits.
5. Il ouvre un produit.
6. Il choisit le format.
7. Il ajoute des options ou suppléments si disponibles.
8. Il ajoute le produit au panier.
9. Il continue ses achats ou ouvre le panier.
10. Il vérifie son panier.
11. Il modifie ou supprime un produit si nécessaire.
12. Il valide sa commande.
13. La borne génère la commande.
14. La borne imprime le ticket.
15. La borne affiche le numéro de commande.
16. La borne indique au client de présenter le ticket au comptoir.
17. La session est réinitialisée.
18. La borne revient automatiquement à l’accueil.

Parcours résumé :

    Accueil
    → Catégories
    → Produits
    → Détail produit
    → Format
    → Options / suppléments
    → Panier
    → Validation
    → Impression ticket
    → Confirmation
    → Retour accueil

---

## 6. Parcours principal détaillé

### 6.1 Écran d’accueil

#### Objectif

Permettre au client de démarrer une commande à emporter immédiatement.

L’écran doit poser l’univers Pizza de Nuit : nocturne, street-food, direct, commercial.

#### Contenu affiché

- logo Pizza de Nuit ;
- phrase courte liée à la commande à emporter ;
- bouton principal : `Commander à emporter` ;
- mention visible : `Paiement au comptoir après impression du ticket` ;
- visuel fort ou ambiance inspirée du site Pizza de Nuit.

#### Bouton principal

`Commander à emporter`

#### Actions possibles

- démarrer une commande ;
- accéder au mode maintenance uniquement si prévu par une action admin cachée ou sécurisée.

#### Règles UX

- une seule action principale ;
- aucun choix inutile ;
- aucun écran intermédiaire sur livraison ou sur place ;
- bouton très large ;
- texte court ;
- ambiance plutôt sombre pour poser l’univers nocturne.

#### À ne pas afficher

- `Livraison`
- `Sur place`
- `Payer`
- `Réserver`
- `Connexion`
- `Créer un compte`

#### Passage vers l’écran suivant

Après appui sur `Commander à emporter`, le client arrive sur l’écran catégories.

---

### 6.2 Écran catégories

#### Objectif

Permettre au client de choisir rapidement une famille de produits.

#### Catégories à prévoir dans la structure

Les catégories définitives doivent être confirmées avec la carte officielle Pizza de Nuit.

Catégories à prévoir :

- pizzas base tomate ;
- pizzas base crème fraîche ;
- pizzas spéciales ;
- pizzas à composer si confirmé ;
- boissons ;
- desserts si confirmés ;
- accompagnements si confirmés ;
- sauces si confirmées.

#### Contenu affiché

- titre court : `Choisis ta catégorie` ;
- cartes catégories larges ;
- icône ou visuel simple par catégorie ;
- accès panier visible si un produit a déjà été ajouté ;
- bouton retour vers l’accueil.

#### Actions possibles

- choisir une catégorie ;
- revenir à l’accueil ;
- ouvrir le panier si déjà rempli.

#### Règles UX

- les catégories doivent être grandes et faciles à toucher ;
- le nombre de catégories doit rester limité ;
- les noms doivent être courts ;
- les catégories indisponibles doivent être masquées ou indiquées clairement comme indisponibles.

#### Passage vers l’écran suivant

Après choix d’une catégorie, le client arrive sur la liste des produits de cette catégorie.

---

### 6.3 Écran liste produits

#### Objectif

Permettre au client de choisir rapidement un produit.

#### Contenu affiché sur chaque carte produit

Chaque produit doit afficher :

- nom du produit ;
- image ou visuel ;
- base ;
- ingrédients principaux ;
- prix de départ si confirmé ;
- badge éventuel ;
- indication de disponibilité ;
- zone tactile d’ouverture du produit.

#### Badges possibles

- `Populaire`
- `Format géant`
- `À partager`
- `Épicée`
- `Généreuse`

Les badges doivent être configurables.

Codex ne doit pas les inventer définitivement si l’information n’est pas confirmée.

#### Actions possibles

- ouvrir le détail d’un produit ;
- revenir aux catégories ;
- ouvrir le panier ;
- filtrer ou changer de catégorie si prévu.

#### Règles UX

- les cartes produits doivent être très lisibles ;
- les prix doivent être visibles ;
- les images doivent être grandes et appétissantes ;
- les produits indisponibles ne doivent pas être ajoutables ;
- le client ne doit pas être obligé de lire un long texte.

#### Passage vers l’écran suivant

Après sélection d’un produit, le client arrive sur l’écran détail produit.

---

### 6.4 Écran détail produit

#### Objectif

Présenter le produit choisi et préparer sa personnalisation.

#### Contenu affiché

- nom du produit ;
- image produit ;
- description courte ;
- base ;
- ingrédients principaux ;
- allergènes si disponibles ;
- prix dynamique ;
- bouton `Choisir le format` ou affichage direct des formats ;
- bouton retour vers la liste produits.

#### Actions possibles

- lire les informations du produit ;
- choisir un format ;
- revenir à la liste ;
- ouvrir le panier si déjà rempli.

#### Règles UX

- l’écran doit être court ;
- la zone prix doit être immédiatement visible ;
- les informations importantes doivent être hiérarchisées ;
- les ingrédients doivent rester lisibles sans surcharge ;
- les données produit doivent venir d’une source validée.

#### Passage vers l’écran suivant

Le client passe au choix du format.

---

### 6.5 Écran choix format

#### Objectif

Permettre au client de choisir le format de sa pizza.

#### Formats à prévoir dans la structure

- 31 cm ;
- 40 cm ;
- 1/2 mètre ;
- 60 cm.

Les formats exacts et leurs prix doivent rester configurables.

#### Contenu affiché

Chaque format doit afficher :

- nom du format ;
- prix associé si confirmé ;
- indication visuelle de taille ;
- badge si pertinent.

Exemples de badges :

- `Format géant`
- `À partager`

#### Actions possibles

- choisir un format ;
- revenir au détail produit ;
- ouvrir le panier si déjà rempli.

#### Règles UX

- les formats doivent être présentés comme des boutons larges ;
- le prix doit être visible sur chaque format ;
- les grands formats doivent être valorisés ;
- les formats non disponibles pour un produit doivent être masqués ou désactivés ;
- les prix ne doivent jamais être codés en dur dans l’interface.

#### Passage vers l’écran suivant

Après choix du format, le client passe aux options et suppléments si disponibles.

S’il n’y a aucune option, il peut ajouter directement le produit au panier.

---

### 6.6 Écran options et suppléments

#### Objectif

Permettre au client de personnaliser son produit sans complexifier le parcours.

#### Options possibles à prévoir

Les options exactes doivent être confirmées.

Structure à prévoir :

- cheesy crust ;
- ingrédient supplémentaire ;
- fromage supplémentaire ;
- sauce ;
- option épicée ;
- retrait d’un ingrédient si autorisé.

#### Contenu affiché

Chaque option doit afficher :

- nom ;
- prix ;
- état disponible / indisponible ;
- quantité maximale si nécessaire.

#### Actions possibles

- ajouter un supplément ;
- retirer un supplément ;
- modifier la quantité si autorisé ;
- continuer sans supplément ;
- ajouter au panier.

#### Bouton principal

`Ajouter au panier`

#### Règles UX

- ne pas afficher trop d’options à la fois ;
- les suppléments doivent être compatibles avec le produit et le format ;
- un supplément indisponible ne doit pas être sélectionnable ;
- le prix total doit se mettre à jour immédiatement ;
- le client doit pouvoir passer cette étape sans choix obligatoire si aucun supplément n’est requis.

#### Passage vers l’écran suivant

Après appui sur `Ajouter au panier`, le client est redirigé vers :

- la liste produits ;
- ou le panier ;
- selon le comportement choisi pour l’application.

Recommandation UX :

> Après ajout au panier, afficher une confirmation courte avec deux choix : `Continuer ma commande` et `Voir le panier`.

---

### 6.7 Écran pizza moitié-moitié si confirmée

#### Objectif

Permettre au client de composer une pizza moitié-moitié uniquement si cette fonctionnalité est validée par le gérant.

#### Condition d’affichage

Cet écran ne doit exister que si la fonctionnalité moitié-moitié est confirmée.

#### Règles à prévoir

- fonction disponible uniquement sur certains formats si confirmé ;
- le client choisit une première pizza ;
- le client choisit une deuxième pizza ;
- la base doit être identique si cette règle est confirmée ;
- le calcul du prix doit être configurable ;
- le panier doit afficher clairement les deux moitiés.

#### Contenu affiché

- format choisi ;
- moitié 1 ;
- moitié 2 ;
- base ;
- suppléments éventuels ;
- total dynamique ;
- message d’aide court.

#### Exemple de message

`Choisis deux pizzas pour composer ton format moitié-moitié.`

#### Actions possibles

- choisir la première moitié ;
- choisir la deuxième moitié ;
- modifier une moitié ;
- revenir au choix format ;
- ajouter au panier.

#### Règles UX

- ne pas mélanger moitié-moitié et pizza classique dans le même écran sans distinction claire ;
- afficher visuellement les deux côtés ;
- ne pas laisser valider si une moitié manque ;
- ne pas figer les règles moitié-moitié dans l’interface.

#### Passage vers l’écran suivant

Après validation, le produit moitié-moitié est ajouté au panier.

---

### 6.8 Écran panier

#### Objectif

Permettre au client de vérifier, modifier ou valider sa commande.

#### Contenu affiché

Pour chaque ligne panier :

- nom du produit ;
- format ;
- base ;
- options ;
- suppléments ;
- quantité ;
- prix unitaire ;
- total ligne ;
- bouton `Modifier` ;
- bouton `Supprimer`.

Informations globales :

- total général ;
- nombre d’articles ;
- mention : `Paiement au comptoir après impression du ticket.` ;
- bouton principal : `Valider ma commande` ;
- bouton secondaire : `Ajouter d’autres produits`.

#### Actions possibles

- modifier un produit ;
- supprimer un produit ;
- modifier la quantité ;
- revenir au menu ;
- valider la commande.

#### Règles UX

- le total doit être très visible ;
- le bouton de validation doit être clair ;
- le client doit comprendre qu’il ne paie pas encore ;
- le panier vide doit être géré proprement ;
- aucune mention de paiement immédiat ne doit apparaître.

#### Panier vide

Si le panier est vide :

- afficher `Votre panier est vide.` ;
- afficher un bouton `Voir les pizzas` ;
- ne pas afficher le bouton de validation.

#### Passage vers l’écran suivant

Après appui sur `Valider ma commande`, le client arrive sur l’écran de validation finale.

---

### 6.9 Écran validation finale

#### Objectif

Permettre au client de confirmer définitivement sa commande avant impression du ticket.

#### Contenu affiché

- récapitulatif complet ;
- total ;
- mention : `Commande à emporter` ;
- mention : `Paiement au comptoir` ;
- message explicatif court ;
- bouton principal : `Valider et imprimer le ticket` ;
- bouton secondaire : `Modifier mon panier`.

#### Message recommandé

`Après validation, un ticket sera imprimé. Présentez-le au comptoir pour régler votre commande.`

#### Bouton final obligatoire

`Valider et imprimer le ticket`

#### Règles UX

- ne jamais utiliser `Payer` ;
- ne jamais utiliser `Payer maintenant` ;
- ne jamais utiliser `Procéder au paiement` ;
- le client doit comprendre que l’action déclenche l’impression du ticket ;
- la validation doit être explicite ;
- le bouton final doit être large et très visible.

#### Passage vers l’écran suivant

Après validation, la commande est créée et le processus d’impression commence.

---

### 6.10 Écran impression ticket

#### Objectif

Informer le client que le ticket est en cours d’impression.

#### Contenu affiché

- message de chargement ;
- icône ou animation courte d’impression ;
- numéro de commande si déjà généré ;
- message : `Impression de votre ticket en cours...`

#### Actions possibles

Aucune action principale immédiate.

#### Règles UX

- l’écran doit rassurer le client ;
- l’attente doit être courte ;
- aucun bouton de paiement ;
- aucun choix supplémentaire ;
- si l’impression échoue, afficher un écran d’erreur clair.

#### Passage vers l’écran suivant

Si l’impression réussit, afficher l’écran confirmation commande.

Si l’impression échoue, afficher l’écran erreur impression.

---

### 6.11 Écran confirmation commande

#### Objectif

Confirmer au client que sa commande est validée et lui indiquer l’étape suivante.

#### Contenu affiché

- message de confirmation ;
- numéro de commande ;
- instruction claire ;
- total ;
- mention à emporter ;
- mention paiement comptoir.

#### Message principal

`Commande validée.`

#### Message obligatoire

`Présentez votre ticket au comptoir pour régler votre commande.`

#### Variante possible

`Prenez votre ticket et présentez-le au comptoir pour régler votre commande.`

#### Actions possibles

- retour automatique à l’accueil ;
- bouton manuel possible : `Terminer`.

#### Règles UX

- le client doit immédiatement comprendre qu’il doit prendre son ticket ;
- le message doit être très visible ;
- la session doit être nettoyée après affichage ;
- aucune donnée du panier ne doit rester accessible au client suivant.

---

### 6.12 Retour automatique à l’accueil

#### Objectif

Réinitialiser la borne pour le client suivant.

#### Déclenchement

Le retour automatique intervient :

- après confirmation de commande ;
- après inactivité prolongée ;
- après abandon confirmé ;
- après annulation de panier ;
- après mode erreur résolu.

#### Règles

- vider le panier ;
- supprimer les choix temporaires ;
- masquer les données du client précédent ;
- revenir à l’écran d’accueil ;
- remettre l’état de session à zéro.

#### Message possible avant retour

`Retour à l’accueil...`

---

## 7. Parcours secondaires

### 7.1 Retour arrière

Le client doit toujours pouvoir revenir à l’écran précédent avant validation finale.

Règles :

- bouton `Retour` visible ;
- ne pas perdre le panier ;
- ne pas perdre les choix déjà ajoutés ;
- demander confirmation uniquement si le retour risque de supprimer une personnalisation en cours.

---

### 7.2 Continuer la commande après ajout panier

Après ajout d’un produit au panier, afficher une confirmation courte.

Message possible :

`Produit ajouté au panier.`

Actions :

- `Continuer ma commande`
- `Voir le panier`

---

### 7.3 Modifier un produit depuis le panier

Le client peut modifier :

- format ;
- quantité ;
- options ;
- suppléments ;
- pizza moitié-moitié si applicable.

Règles :

- rouvrir le produit avec les choix existants ;
- recalculer le prix après modification ;
- revenir au panier après validation des changements.

Bouton recommandé :

`Enregistrer les modifications`

---

### 7.4 Supprimer un produit du panier

Le client peut supprimer une ligne du panier.

Règle :

- demander une confirmation simple si nécessaire.

Message possible :

`Supprimer ce produit du panier ?`

Actions :

- `Annuler`
- `Supprimer`

---

### 7.5 Abandon de commande

Le client peut abandonner sa commande avant validation finale.

Règle :

- demander confirmation si le panier contient des produits.

Message possible :

`Voulez-vous vraiment annuler votre commande ?`

Actions :

- `Continuer ma commande`
- `Annuler la commande`

Après annulation, retour à l’accueil et suppression du panier.

---

### 7.6 Inactivité client

Si le client reste inactif trop longtemps, afficher un écran de prévention.

Message possible :

`Êtes-vous toujours là ?`

Actions :

- `Continuer ma commande`
- `Annuler et revenir à l’accueil`

Si aucune action n’est faite, la session est annulée automatiquement.

Règles :

- vider le panier ;
- supprimer les choix temporaires ;
- revenir à l’accueil ;
- ne conserver aucune donnée visible.

---

### 7.7 Produit indisponible

Si un produit devient indisponible :

- il ne doit pas être ajoutable ;
- il doit être marqué clairement ;
- le client doit pouvoir choisir un autre produit.

Message possible :

`Ce produit est actuellement indisponible.`

Action :

`Choisir un autre produit`

---

### 7.8 Erreur impression

Si l’impression échoue :

- ne pas afficher de message technique complexe ;
- indiquer que le personnel peut aider ;
- conserver la commande si elle a été créée ;
- permettre une réimpression depuis l’admin si prévu.

Message possible :

`Le ticket n’a pas pu être imprimé. Merci de demander de l’aide au comptoir.`

Actions possibles :

- `Réessayer l’impression`
- `Appeler le personnel`
- `Retour accueil` uniquement si la procédure opérationnelle le permet.

---

## 8. Gestion des erreurs et cas limites

### 8.1 Panier vide

Cas :

Le client ouvre le panier sans produit.

Message :

`Votre panier est vide.`

Action :

`Voir les pizzas`

---

### 8.2 Format non sélectionné

Cas :

Le client tente d’ajouter une pizza sans choisir de format.

Message :

`Sélectionnez un format pour continuer.`

Action :

Rester sur l’écran choix format.

---

### 8.3 Option incompatible

Cas :

Le client choisit un supplément incompatible avec le produit ou le format.

Message :

`Cette option n’est pas disponible avec ce format.`

Action :

Désactiver ou masquer l’option.

---

### 8.4 Moitié-moitié incomplète

Cas :

Le client tente d’ajouter une moitié-moitié avec une seule moitié sélectionnée.

Message :

`Choisissez les deux moitiés de votre pizza.`

Action :

Bloquer l’ajout au panier.

---

### 8.5 Commande non créée

Cas :

Erreur lors de la création de commande.

Message :

`La commande n’a pas pu être validée. Merci de réessayer ou de demander de l’aide au comptoir.`

Actions :

- `Réessayer`
- `Retour au panier`

---

### 8.6 Borne en maintenance

Cas :

La borne est temporairement indisponible.

Message :

`Borne temporairement indisponible. Merci de commander directement au comptoir.`

Aucune commande ne doit pouvoir être démarrée.

---

## 9. Règles UX tactiles

L’interface doit être pensée pour un usage public sur écran tactile.

Règles obligatoires :

- boutons larges ;
- zones tactiles confortables ;
- textes courts ;
- prix très visibles ;
- contraste fort ;
- navigation simple ;
- une action principale par écran ;
- retour arrière toujours visible ;
- panier toujours accessible ;
- total toujours lisible ;
- aucun formulaire long ;
- aucun clavier sauf nécessité absolue ;
- aucune interaction complexe ;
- aucune information critique cachée ;
- animations courtes ;
- aucun effet décoratif ralentissant ;
- retour automatique à l’accueil après commande.

Priorités UX :

1. compréhension immédiate ;
2. rapidité de commande ;
3. lisibilité des prix ;
4. simplicité du panier ;
5. absence de confusion entre validation et paiement ;
6. ticket clair ;
7. paiement au comptoir compris par le client.

---

## 10. Règles de wording et messages obligatoires

### 10.1 Boutons autorisés

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

---

### 10.2 Messages obligatoires

Mention visible dans le panier :

`Paiement au comptoir après impression du ticket.`

Bouton final obligatoire :

`Valider et imprimer le ticket`

Message final obligatoire :

`Présentez votre ticket au comptoir pour régler votre commande.`

Message ticket recommandé :

`Présentez ce ticket au comptoir pour régler votre commande.`

---

### 10.3 Termes interdits

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

## 11. Règles liées au panier

Le panier doit contenir toutes les informations nécessaires pour éviter les erreurs au comptoir.

Chaque ligne panier doit afficher :

- produit ;
- format ;
- base ;
- options ;
- suppléments ;
- quantité ;
- prix unitaire ;
- total de ligne.

Le panier doit permettre :

- modification d’un produit ;
- suppression d’un produit ;
- modification de quantité ;
- retour au menu ;
- validation de la commande.

Le panier doit toujours afficher :

- total général ;
- mention paiement au comptoir ;
- bouton de validation.

Le panier ne doit jamais afficher :

- paiement CB sur borne ;
- paiement en ligne ;
- livraison ;
- sur place ;
- frais de livraison ;
- choix d’adresse.

---

## 12. Règles liées au ticket

Le ticket est un élément central du parcours.

Il sert à :

- confirmer la commande ;
- permettre au personnel de lire la commande ;
- faciliter l’encaissement ;
- faciliter la préparation.

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

Message client recommandé :

`Présentez ce ticket au comptoir pour régler votre commande.`

Règles :

- le ticket doit être clair ;
- le ticket doit être court ;
- les formats doivent être visibles ;
- les suppléments doivent être visibles ;
- le total doit être visible ;
- le numéro de commande doit être visible ;
- le ticket doit pouvoir être réimprimé depuis l’administration si la commande est enregistrée.

---

## 13. Adaptation de la DA Pizza de Nuit au parcours

La borne doit reprendre l’esprit Pizza de Nuit sans copier le site à l’identique.

### 13.1 Intention visuelle

L’interface doit transmettre :

- la nuit ;
- le street-food ;
- la générosité ;
- la rapidité ;
- l’efficacité ;
- la commande directe ;
- l’envie de pizza.

### 13.2 Alternance sombre / clair

L’interface ne doit pas être entièrement noire.

Utilisation recommandée :

- écran d’accueil : plus sombre, impactant, nocturne ;
- catégories : contrastées, très lisibles ;
- produits : cartes claires pour faciliter la lecture ;
- détail produit : mélange visuel fort + informations claires ;
- panier : clair, lisible, orienté vérification ;
- validation : très claire, rassurante ;
- confirmation : impactante, simple, très lisible.

### 13.3 Couleurs à privilégier

Palette à adapter selon le site :

- noir / anthracite pour l’ambiance nocturne ;
- blanc / blanc cassé pour la lisibilité ;
- jaune / doré pour l’énergie, les accents et certains CTA ;
- rouge pour les badges, promotions ou éléments commerciaux ;
- gris clair pour les séparateurs et zones secondaires.

### 13.4 Style des écrans

À privilégier :

- gros titres ;
- visuels pizza généreux ;
- boutons francs ;
- prix très visibles ;
- cartes produits propres ;
- contrastes forts ;
- badges commerciaux ;
- hiérarchie immédiate ;
- interface tactile moderne ;
- style snack nocturne.

À éviter :

- design italien rustique ;
- ambiance gastronomique ;
- interface trop froide ;
- interface trop minimaliste ;
- interface 100 % sombre ;
- interface 100 % blanche ;
- textes longs ;
- boutons petits ;
- animations lentes ;
- cartes produits illisibles.

---

## 14. Ce que Codex ne doit pas faire

Codex ne doit pas :

- créer un parcours générique de pizzeria ;
- créer un site vitrine ;
- créer une interface non tactile ;
- ajouter un paiement sur borne ;
- ajouter Stripe ;
- ajouter un terminal de paiement ;
- créer une route de paiement ;
- proposer la livraison ;
- proposer la consommation sur place ;
- proposer une réservation ;
- demander la création d’un compte client ;
- inventer des produits ;
- inventer des prix ;
- inventer des horaires ;
- inventer des adresses ;
- inventer des offres ;
- figer les prix dans les composants ;
- figer les formats dans l’interface ;
- disperser la logique panier ;
- utiliser `Payer` comme bouton final ;
- oublier l’impression ticket ;
- oublier le message de paiement au comptoir ;
- oublier le retour automatique à l’accueil ;
- créer un parcours long ou confus ;
- créer un back-office lourd depuis ce document.

---

## 15. Checklist de validation UX

Le parcours est valide si :

- [ ] le client comprend immédiatement qu’il commande à emporter ;
- [ ] le bouton d’accueil est `Commander à emporter` ;
- [ ] aucun mode livraison n’existe ;
- [ ] aucun mode sur place n’existe ;
- [ ] aucun paiement sur borne n’existe ;
- [ ] aucun bouton `Payer` n’est utilisé ;
- [ ] le parcours est court ;
- [ ] chaque écran a une action principale claire ;
- [ ] les boutons sont adaptés au tactile ;
- [ ] le panier est toujours accessible ;
- [ ] le retour arrière est visible ;
- [ ] les prix sont lisibles ;
- [ ] le total est toujours clair dans le panier ;
- [ ] les formats sont sélectionnables ;
- [ ] les suppléments sont compatibles et configurables ;
- [ ] la moitié-moitié est prévue uniquement si confirmée ;
- [ ] le panier rappelle le paiement au comptoir ;
- [ ] la validation finale affiche `Valider et imprimer le ticket` ;
- [ ] le ticket contient le détail utile ;
- [ ] le message final indique de présenter le ticket au comptoir ;
- [ ] la session revient automatiquement à l’accueil ;
- [ ] aucune donnée du client précédent ne reste visible ;
- [ ] la DA respecte l’univers Pizza de Nuit ;
- [ ] l’interface alterne correctement zones sombres et zones claires ;
- [ ] le parcours reste simple, rapide et commercial.

---

## 16. Conclusion

Ce fichier définit le parcours utilisateur de référence pour la borne de commande Pizza de Nuit.

Le fonctionnement à respecter est simple :

> Le client commande à emporter sur la borne, valide sa commande, récupère un ticket imprimé, présente ce ticket au comptoir, paie auprès du personnel, puis récupère sa commande.

Codex doit utiliser ce document pour développer une expérience tactile claire, rapide, fiable et fidèle à Pizza de Nuit.

Le parcours doit toujours rester centré sur :

- commande à emporter ;
- panier clair ;
- validation explicite ;
- ticket imprimé ;
- paiement au comptoir ;
- retour automatique à l’accueil.