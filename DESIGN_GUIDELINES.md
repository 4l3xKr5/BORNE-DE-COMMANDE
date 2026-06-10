# DESIGN_GUIDELINES.md

## 1. Objectif du document

Ce document définit les règles de direction artistique, UI design, UX tactile, lisibilité, mise en page et design system de l’application de borne de commande **Pizza de Nuit**.

Il sert de source de vérité visuelle pour Codex afin de concevoir une interface :

- fidèle à l’univers Pizza de Nuit ;
- adaptée à une borne tactile publique ;
- pensée en **format vertical 9:16** ;
- optimisée pour une **tablette / borne tactile 27 pouces** ;
- claire pour commander rapidement ;
- lisible à distance ;
- cohérente avec le site officiel Pizza de Nuit ;
- centrée sur la commande à emporter ;
- centrée sur l’impression du ticket ;
- sans paiement sur la borne.

Ce document ne remplace pas :

- `PROJECT_CONTEXT.md`
- `AGENT.md`
- `CAHIER_DES_CHARGES.md`
- `USER_FLOW.md`
- `ORDER_RULES.md`

Il complète ces documents en définissant uniquement les règles visuelles, UI, UX tactile, format écran et design system.

---

## 2. Sources de vérité

Codex doit respecter les sources suivantes avant toute création ou modification visuelle :

1. `PROJECT_CONTEXT.md`
2. `AGENT.md`
3. `CAHIER_DES_CHARGES.md`
4. `USER_FLOW.md`
5. `ORDER_RULES.md`
6. Site officiel Pizza de Nuit : `https://pizza-de-nuit.vercel.app/`
7. Fichiers existants du projet si l’application est déjà commencée

Le site officiel Pizza de Nuit doit être utilisé pour comprendre :

- l’ambiance nocturne ;
- l’énergie street-food ;
- la logique commerciale ;
- le rythme entre sections sombres et sections claires ;
- les contrastes ;
- les boutons ;
- les cartes ;
- la présentation des pizzas ;
- le ton visuel global ;
- l’identité de marque.

La borne ne doit pas inventer une nouvelle identité.

Elle doit adapter l’identité du site à une expérience tactile plus simple, plus directe, plus lisible et optimisée pour un écran vertical de grande taille.

---

## 3. Contrainte écran principale

L’application sera utilisée sur une **tablette / borne tactile de 27 pouces**, en **orientation verticale**, avec un ratio **9:16**.

Cette contrainte est centrale.

Codex doit concevoir l’interface comme une vraie application de borne tactile portrait, et non comme :

- un site web responsive classique ;
- une interface desktop ;
- une application mobile étirée ;
- une interface horizontale adaptée à la dernière minute.

### 3.1 Format cible

Format principal :

- orientation : verticale / portrait ;
- ratio : 9:16 ;
- support : tablette ou borne tactile 27 pouces ;
- usage : public ;
- interaction : uniquement au doigt ;
- posture : client debout face à l’écran ;
- objectif : commander vite, lire vite, valider vite ;
- priorité : lisibilité, grosses zones tactiles, parcours court.

### 3.2 Résolutions à prévoir

L’interface doit rester stable et lisible sur des résolutions proches de :

- `1080 x 1920`
- `1440 x 2560`
- `2160 x 3840`

Codex ne doit pas dépendre d’une seule résolution exacte.

Le design doit être fluide, mais toujours pensé d’abord pour un écran vertical 9:16.

---

## 4. Essence visuelle de Pizza de Nuit

Pizza de Nuit doit être traitée comme une marque :

- nocturne ;
- urbaine ;
- snack ;
- street-food ;
- rapide ;
- généreuse ;
- commerciale ;
- moderne ;
- directe ;
- orientée commande à emporter.

L’interface doit donner envie de commander rapidement une pizza généreuse, dans une ambiance de nuit, sans créer une expérience froide ou compliquée.

L’application doit transmettre :

- l’envie immédiate de pizza ;
- la rapidité de commande ;
- l’énergie d’un snack nocturne ;
- la générosité des formats ;
- une logique fast-food moderne ;
- une expérience simple à emporter ;
- une forte lisibilité des produits et des prix ;
- une continuité naturelle avec le site Pizza de Nuit.

L’application ne doit pas ressembler à :

- une pizzeria italienne rustique ;
- un restaurant gastronomique ;
- une application de livraison ;
- un logiciel de caisse ;
- un site web vitrine ;
- une interface institutionnelle ;
- une interface minimaliste froide ;
- une interface sombre illisible.

---

## 5. Principe fondamental de design

La borne doit respecter une logique visuelle hybride :

> Sombre pour créer l’impact nocturne.  
> Clair pour faciliter la commande.

L’interface ne doit jamais être entièrement noire.

L’interface ne doit jamais être entièrement blanche.

La bonne direction est une alternance maîtrisée :

- zones sombres pour l’accueil, les moments forts, les bandeaux, les headers, les confirmations importantes ;
- zones claires pour les produits, les choix, les formats, le panier, les récapitulatifs et les validations ;
- accents jaunes ou dorés pour l’énergie, les prix, les éléments actifs et certains CTA ;
- accents rouges pour les badges commerciaux, les alertes utiles et les éléments appétissants ;
- gris neutres pour les séparateurs, états désactivés et fonds secondaires.

La borne doit être plus lisible que le site, car elle sera utilisée debout, rapidement, sur un écran tactile 27 pouces, par des clients pressés.

---

## 6. Direction artistique générale

### 6.1 Intention

L’interface doit mélanger :

- impact nocturne ;
- clarté commerciale ;
- énergie street-food ;
- gros visuels appétissants ;
- boutons francs ;
- prix visibles ;
- parcours court ;
- hiérarchie immédiate ;
- verticalité assumée.

### 6.2 Ambiance

L’ambiance doit évoquer :

- la nuit ;
- la pizza généreuse ;
- le snack moderne ;
- la commande rapide ;
- le retrait à emporter ;
- l’univers urbain ;
- la convivialité simple d’un fast-food de nuit.

### 6.3 Style à privilégier

Codex doit privilégier :

- grands titres impactants ;
- contrastes forts ;
- cartes produits claires ;
- photos pizzas généreuses ;
- badges commerciaux visibles ;
- boutons très larges ;
- arrondis modernes ;
- ombres légères ;
- interface rythmée ;
- alternance sombre / clair ;
- ton direct ;
- verticalité claire ;
- barre basse d’action très visible.

### 6.4 Style à éviter

Codex doit éviter :

- full dark mode ;
- full white mode ;
- style italien traditionnel ;
- fond type trattoria ;
- textures rustiques ;
- design gastronomique ;
- interface froide ;
- design trop vide ;
- textes longs ;
- cartes produits sombres et peu lisibles ;
- boutons petits ;
- animations lentes ;
- effets décoratifs inutiles ;
- surcharge visuelle ;
- layout desktop ;
- interface pensée pour écran horizontal ;
- grilles à 3 ou 4 colonnes.

---

## 7. Règles de layout pour écran vertical 9:16

L’interface doit exploiter la hauteur de l’écran.

### 7.1 Structure verticale recommandée

Chaque écran doit suivre une structure verticale simple :

1. zone haute : logo, titre, retour, panier ;
2. zone centrale : contenu principal ;
3. zone basse : total, message important, bouton principal ;
4. bouton principal toujours visible dans la zone basse quand c’est pertinent.

### 7.2 Header

Le haut de l’écran peut rester fixe avec :

- logo Pizza de Nuit ;
- nom de l’écran ;
- bouton retour ;
- accès panier ;
- indicateur de total si utile.

Le header doit rester compact.

Il ne doit pas voler trop d’espace au contenu.

### 7.3 Zone centrale

La zone centrale doit contenir l’action principale de l’écran :

- catégories ;
- cards produits ;
- détail pizza ;
- choix format ;
- options ;
- panier ;
- récapitulatif.

La zone centrale peut scroller verticalement si nécessaire.

Le scroll doit être fluide, visible et naturel.

### 7.4 Barre basse fixe

La zone basse est prioritaire.

Elle peut contenir :

- total panier ;
- message important ;
- mention paiement comptoir ;
- bouton principal ;
- validation.

Exemples de boutons en barre basse :

- `Ajouter au panier`
- `Valider ma commande`
- `Valider et imprimer le ticket`

Sur une borne verticale, le bouton principal doit idéalement rester en bas d’écran, facile à atteindre et impossible à manquer.

### 7.5 Ce qu’il faut éviter

Codex doit éviter :

- les menus horizontaux complexes ;
- les grilles trop larges ;
- les layouts desktop ;
- les colonnes trop nombreuses ;
- les contenus écrasés ;
- les boutons placés trop haut ;
- les boutons trop petits ;
- les interactions cachées ;
- les panneaux latéraux façon desktop.

---

## 8. Grille recommandée

Pour un écran vertical 9:16 :

- privilégier 1 à 2 colonnes maximum ;
- utiliser de grandes cartes produits ;
- afficher moins d’éléments à la fois mais mieux lisibles ;
- garder une forte respiration verticale ;
- prévoir un scroll fluide si nécessaire ;
- garder le panier ou le total toujours visible quand c’est pertinent.

### 8.1 Produits

Pour les cartes produits :

- 1 colonne si les visuels doivent être très grands ;
- 2 colonnes maximum pour les listes de pizzas ;
- jamais 3 ou 4 colonnes sur l’écran principal de commande.

### 8.2 Catégories

Pour les catégories :

- grandes cartes verticales ;
- grille 2 colonnes maximum ;
- icône ou image simple ;
- nom court ;
- zone tactile large.

### 8.3 Panier

Pour le panier :

- liste verticale claire ;
- total en bas ;
- bouton principal fixe ;
- mention paiement comptoir visible.

---

## 9. Tailles tactiles adaptées au 27 pouces

Sur une tablette / borne 27 pouces, les éléments doivent être grands, mais pas disproportionnés.

### 9.1 Boutons

Recommandations :

- bouton principal : 88 à 112 px de hauteur ;
- bouton secondaire : 72 à 88 px ;
- bouton danger : 72 à 88 px ;
- zone tactile minimale : 64 px ;
- espace entre zones tactiles : 16 à 24 px.

Le client doit pouvoir utiliser la borne rapidement, sans viser précisément.

### 9.2 Textes

Recommandations :

- titre écran : 48 à 72 px ;
- sous-titre : 28 à 36 px ;
- nom produit : 28 à 36 px ;
- prix produit : 36 à 56 px ;
- texte courant : 22 à 28 px ;
- texte secondaire : 18 à 22 px minimum ;
- bouton principal : 26 à 34 px.

### 9.3 Icônes

Recommandations :

- icône simple : 32 à 48 px ;
- icône importante : 48 à 64 px ;
- icône seule cliquable : à éviter si elle n’est pas accompagnée d’une zone tactile large.

---

## 10. Palette de couleurs

### 10.1 Couleurs principales

La palette doit être construite autour de :

- noir / anthracite ;
- blanc / blanc cassé ;
- jaune / doré ;
- rouge ;
- gris clair ;
- gris foncé.

### 10.2 Noir / anthracite

Usage recommandé :

- écran d’accueil ;
- header ;
- zones hero ;
- bandeaux forts ;
- footer ;
- confirmation importante ;
- ambiance nocturne ;
- contraste de marque.

Le noir ne doit pas être utilisé partout.

Il doit créer l’impact, pas nuire à la lisibilité.

### 10.3 Blanc / blanc cassé

Usage recommandé :

- cartes produits ;
- listes ;
- choix de formats ;
- panier ;
- récapitulatif ;
- validation finale ;
- interface admin ;
- zones de lecture ;
- informations de prix ;
- choix d’options.

Le blanc doit servir à commander vite.

Il doit rendre les produits, les prix et les choix plus lisibles.

### 10.4 Jaune / doré

Usage recommandé :

- accent de marque ;
- prix ;
- éléments sélectionnés ;
- CTA secondaire ;
- icônes importantes ;
- surlignage de format ;
- indication commerciale.

Le jaune doit attirer l’œil sans devenir agressif.

### 10.5 Rouge

Usage recommandé :

- badges commerciaux ;
- promotions si confirmées ;
- signal visuel fort ;
- erreur ou action danger ;
- élément appétissant ;
- mise en avant ponctuelle.

Le rouge ne doit pas remplacer le jaune comme couleur principale.

Il doit rester maîtrisé.

### 10.6 Gris

Usage recommandé :

- séparateurs ;
- états désactivés ;
- fonds secondaires ;
- bordures ;
- textes secondaires ;
- zones neutres.

Le gris doit aider à structurer l’écran sans l’éteindre.

---

## 11. Tokens de couleurs recommandés

Codex peut utiliser des tokens de ce type dans Tailwind ou dans le thème de l’application :

    colors:
      night:
        950: "#0B0B0D"
        900: "#111114"
        800: "#1A1A1F"

      paper:
        50: "#FFFDF7"
        100: "#F7F3EA"

      gold:
        400: "#FFD24A"
        500: "#FFC400"
        600: "#E0A900"

      red:
        500: "#E6392E"
        600: "#C92F26"

      neutral:
        100: "#F3F3F3"
        200: "#E5E5E5"
        500: "#737373"
        700: "#404040"

Ces valeurs peuvent être adaptées si le projet contient déjà une palette plus fidèle au site officiel.

Codex ne doit pas multiplier les couleurs inutilement.

---

## 12. Typographie

### 12.1 Rôle de la typographie

La typographie doit servir à :

- comprendre vite ;
- lire les prix immédiatement ;
- identifier les produits ;
- guider l’action ;
- éviter les longues explications.

### 12.2 Titres

Les titres doivent être :

- grands ;
- courts ;
- impactants ;
- faciles à lire à distance ;
- orientés action.

Exemples :

- `Choisis ta pizza`
- `Sélectionne ton format`
- `Ton panier`
- `Valide ta commande`
- `Commande validée`

### 12.3 Textes courants

Les textes doivent être courts.

Règles :

- 1 phrase courte par bloc ;
- pas de paragraphe long ;
- pas de texte marketing inutile dans le tunnel de commande ;
- pas de termes techniques ;
- pas de formulation ambiguë.

### 12.4 Prix

Les prix doivent être très visibles.

Règles :

- taille supérieure au texte descriptif ;
- contraste fort ;
- emplacement stable ;
- affichage clair en euros ;
- jamais noyés dans un paragraphe.

### 12.5 Lisibilité sur écran 27 pouces

L’écran 27 pouces permet de grands éléments.

Codex doit exploiter cet espace pour :

- agrandir les titres ;
- agrandir les prix ;
- agrandir les boutons ;
- améliorer la respiration ;
- limiter la densité ;
- éviter les petits textes.

L’objectif n’est pas d’afficher le plus d’informations possible.

L’objectif est de rendre chaque choix évident.

---

## 13. Hiérarchie visuelle

L’interface doit toujours guider le client dans cet ordre :

1. action principale ;
2. produit ou pizza ;
3. prix ;
4. format ;
5. options et suppléments ;
6. total ;
7. message de paiement au comptoir ;
8. action secondaire.

Chaque écran doit avoir une seule action principale dominante.

Exemples :

- accueil : `Commander à emporter`
- produit : `Ajouter au panier`
- panier : `Valider ma commande`
- validation finale : `Valider et imprimer le ticket`
- confirmation : `Présentez votre ticket au comptoir pour régler votre commande.`

Les informations secondaires ne doivent jamais concurrencer l’action principale.

---

## 14. Boutons

### 14.1 Bouton primaire

Usage :

- action principale de l’écran.

Style recommandé :

- grand ;
- très contrasté ;
- fond jaune/doré ou rouge selon contexte ;
- texte noir ou blanc selon contraste ;
- arrondi moderne ;
- état pressé visible ;
- ombre légère possible ;
- position basse recommandée sur écran vertical.

Exemples :

- `Commander à emporter`
- `Ajouter au panier`
- `Valider ma commande`
- `Valider et imprimer le ticket`

### 14.2 Bouton secondaire

Usage :

- retour ;
- continuer commande ;
- voir panier ;
- modifier.

Style recommandé :

- fond clair ;
- bordure visible ;
- texte sombre ;
- état sélectionné clair.

### 14.3 Bouton danger

Usage :

- supprimer ;
- annuler une commande ;
- abandonner.

Style recommandé :

- rouge ;
- texte blanc ;
- confirmation si l’action supprime un panier ou une ligne.

### 14.4 Bouton désactivé

Usage :

- produit indisponible ;
- format non sélectionné ;
- moitié-moitié incomplète ;
- panier vide.

Style recommandé :

- gris ;
- texte réduit en contraste ;
- non cliquable ;
- message explicatif proche si nécessaire.

### 14.5 Bouton final obligatoire

Le bouton final doit toujours être :

`Valider et imprimer le ticket`

Il ne doit jamais être remplacé par :

- `Payer`
- `Payer maintenant`
- `Procéder au paiement`
- `Régler`
- `Commander et payer`

---

## 15. Cards produits

### 15.1 Rôle

Les cards produits doivent permettre au client de comprendre rapidement :

- ce qu’est le produit ;
- ce qu’il contient ;
- combien il coûte à partir de ;
- s’il est disponible ;
- s’il est populaire ou différenciant.

### 15.2 Structure recommandée

Chaque card produit doit contenir :

- image produit ;
- nom court ;
- base ;
- ingrédients principaux ;
- prix de départ si confirmé ;
- badge éventuel ;
- bouton ou zone tactile claire.

### 15.3 Style recommandé

- fond blanc ou blanc cassé ;
- image pizza grande ;
- bordure légère ;
- arrondi moderne ;
- ombre douce ;
- prix très visible ;
- badge contrasté ;
- bouton large.

Les cartes produits ne doivent pas être trop sombres.

Une carte sombre peut être belle, mais elle ralentit souvent la lecture sur une borne.

### 15.4 Format vertical

Sur écran vertical 9:16 :

- grille 2 colonnes maximum ;
- cards hautes et lisibles ;
- image généreuse ;
- nom et prix visibles sans effort ;
- scroll vertical fluide.

### 15.5 Densité

Une card doit rester simple.

Ne pas afficher :

- description longue ;
- texte marketing excessif ;
- trop d’ingrédients ;
- trop de badges ;
- informations non nécessaires à la décision.

---

## 16. Images et visuels

### 16.1 Style des images

Les images doivent être :

- appétissantes ;
- généreuses ;
- nettes ;
- lumineuses ;
- adaptées à la commande rapide ;
- cohérentes avec l’univers street-food nocturne.

### 16.2 Cadrage

Recommandation :

- pizza bien visible ;
- produit centré ;
- lumière chaude ;
- contraste fort ;
- arrière-plan simple ;
- pas de décor gastronomique inutile.

### 16.3 Utilisation sur écran vertical

Sur une borne 27 pouces verticale :

- les images peuvent être grandes ;
- elles ne doivent pas pousser les informations importantes hors écran ;
- elles doivent renforcer l’envie sans ralentir la commande ;
- elles doivent rester cohérentes d’une card à l’autre.

### 16.4 À éviter

Éviter :

- photos trop sombres ;
- pizzas peu visibles ;
- photos froides ;
- assiettes gastronomiques ;
- fonds italiens rustiques ;
- images incohérentes entre elles ;
- visuels trop décoratifs qui ralentissent l’interface.

---

## 17. Badges commerciaux

### 17.1 Badges possibles

Badges prévus dans la structure :

- `Populaire`
- `Format géant`
- `À partager`
- `Généreuse`
- `Épicée`
- `Nouveau`
- `Indisponible`

Ces badges doivent rester configurables.

Codex ne doit pas inventer définitivement quels produits les portent si l’information n’est pas confirmée.

### 17.2 Style

Recommandation :

- forme capsule ;
- texte court ;
- fort contraste ;
- taille lisible ;
- position stable en haut de card ;
- pas plus de 2 badges visibles par produit.

### 17.3 Couleurs

- jaune/doré : mise en avant positive ;
- rouge : urgence, épicé, promo, signal fort ;
- gris : indisponible ou secondaire ;
- noir : badge premium ou contraste ponctuel.

---

## 18. Adaptation des écrans au format vertical 9:16

### 18.1 Écran d’accueil

Objectif :

Lancer immédiatement une commande à emporter.

Direction visuelle :

- dominante sombre ;
- ambiance nocturne ;
- logo visible en haut ;
- visuel pizza ou ambiance forte au centre ;
- bouton principal très large en bas ;
- mention paiement comptoir visible.

Contenu obligatoire :

- logo Pizza de Nuit ;
- phrase courte ;
- bouton `Commander à emporter` ;
- mention `Paiement au comptoir après impression du ticket`.

Règles spécifiques 9:16 :

- exploiter la hauteur ;
- créer un accueil très impactant ;
- placer l’action principale dans la zone basse ;
- éviter plusieurs choix concurrents ;
- ne pas ajouter livraison, sur place ou réservation.

À éviter :

- livraison ;
- sur place ;
- réservation ;
- compte client ;
- bouton payer ;
- choix inutile.

---

### 18.2 Écran catégories

Objectif :

Choisir rapidement une famille de produits.

Direction visuelle :

- fond clair ou alternance clair/sombre ;
- grandes cartes catégories ;
- icônes ou visuels simples ;
- navigation évidente ;
- panier accessible si rempli.

Règles spécifiques 9:16 :

- cartes verticales larges ;
- grille 2 colonnes maximum ;
- grande hauteur de card ;
- noms courts ;
- scroll fluide si nécessaire.

---

### 18.3 Liste produits

Objectif :

Voir rapidement les pizzas et produits disponibles.

Direction visuelle :

- fond clair recommandé ;
- cards produits lisibles ;
- photos généreuses ;
- prix visibles ;
- badges commerciaux ;
- panier accessible.

Règles spécifiques 9:16 :

- 2 colonnes maximum ;
- 1 colonne autorisée si les cards doivent être premium et très lisibles ;
- prix visible sans ouvrir le détail ;
- scroll vertical fluide ;
- aucun layout horizontal desktop.

---

### 18.4 Détail produit

Objectif :

Présenter la pizza avant choix du format.

Composition verticale recommandée :

1. image produit large ;
2. nom + ingrédients ;
3. choix format ;
4. options ;
5. prix dynamique ;
6. bouton `Ajouter au panier` en bas.

Direction visuelle :

- grande image ;
- zone d’informations claire ;
- nom fort ;
- ingrédients principaux ;
- base visible ;
- prix dynamique visible ;
- CTA clair.

Règles :

- éviter les longues descriptions ;
- afficher les informations utiles ;
- conserver la lisibilité des options ;
- garder le bouton principal visible en bas si possible.

---

### 18.5 Choix format

Objectif :

Sélectionner le format de pizza.

Formats à prévoir :

- 31 cm ;
- 40 cm ;
- 1/2 mètre ;
- 60 cm.

Direction visuelle :

- gros boutons ou grandes cards verticales ;
- prix visibles ;
- badges pour grands formats ;
- indication visuelle de taille.

Règles spécifiques 9:16 :

- formats empilés verticalement ;
- chaque format doit être très facile à toucher ;
- les grands formats doivent être visuellement valorisés ;
- le prix doit être immédiatement lisible.

Badges recommandés :

- `Format géant`
- `À partager`

Les prix doivent être configurables et ne jamais être codés en dur dans les composants.

---

### 18.6 Options et suppléments

Objectif :

Permettre la personnalisation sans complexifier le parcours.

Direction visuelle :

- fond clair ;
- listes simples ;
- options en cards ou lignes tactiles ;
- prix additionnel visible ;
- état sélectionné net.

Règles spécifiques 9:16 :

- éviter les listes trop longues ;
- grouper les options ;
- afficher le total dynamique dans la zone basse ;
- garder `Ajouter au panier` visible ;
- permettre de continuer sans supplément.

---

### 18.7 Moitié-moitié

Objectif :

Permettre une pizza moitié-moitié uniquement si la fonctionnalité est confirmée.

Direction visuelle :

- représentation en deux parties ;
- moitié 1 / moitié 2 clairement séparées ;
- format visible ;
- base visible ;
- total visible.

Règles spécifiques 9:16 :

- afficher les deux moitiés verticalement ou en visuel partagé clair ;
- ne pas mélanger avec une pizza classique ;
- garder la sélection lisible ;
- bloquer l’ajout si une moitié manque.

Règles métier :

- ne pas activer sans confirmation ;
- afficher clairement les deux moitiés dans le panier ;
- afficher clairement les deux moitiés sur le ticket.

---

### 18.8 Panier

Objectif :

Vérifier la commande avant validation.

Direction visuelle :

- fond clair recommandé ;
- lignes de panier très lisibles ;
- total très visible ;
- boutons modifier / supprimer accessibles ;
- mention paiement comptoir visible ;
- CTA principal en bas.

Règles spécifiques 9:16 :

- liste verticale au centre ;
- total fixe en bas ;
- bouton `Valider ma commande` en bas ;
- mention paiement comptoir au-dessus ou sous le total ;
- éviter toute ressemblance avec une page de paiement.

Mention obligatoire :

`Paiement au comptoir après impression du ticket.`

Bouton recommandé :

`Valider ma commande`

À ne jamais afficher :

- paiement CB ;
- paiement en ligne ;
- livraison ;
- sur place ;
- frais de livraison ;
- bouton `Payer`.

---

### 18.9 Validation finale

Objectif :

Confirmer définitivement avant impression du ticket.

Direction visuelle :

- écran clair ;
- récapitulatif simple ;
- total très visible ;
- message explicatif court ;
- bouton final massif.

Règles spécifiques 9:16 :

- le bouton final doit occuper une place importante en bas ;
- le récapitulatif doit rester lisible ;
- le message ticket doit être impossible à manquer ;
- aucune ambiguïté avec un paiement.

Message recommandé :

`Après validation, un ticket sera imprimé. Présentez-le au comptoir pour régler votre commande.`

Bouton obligatoire :

`Valider et imprimer le ticket`

---

### 18.10 Impression ticket

Objectif :

Rassurer le client pendant l’impression.

Direction visuelle :

- fond sombre ou clair selon continuité ;
- animation courte ;
- message simple ;
- numéro de commande si disponible.

Message :

`Impression de votre ticket en cours...`

Règles :

- pas d’action complexe ;
- pas de paiement ;
- pas d’écran long ;
- feedback immédiat.

---

### 18.11 Confirmation commande

Objectif :

Indiquer clairement l’étape suivante.

Direction visuelle :

- message très lisible ;
- numéro de commande très visible ;
- instruction comptoir dominante ;
- retour automatique à l’accueil.

Règles spécifiques 9:16 :

- numéro de commande très grand ;
- message visible à distance ;
- instruction comptoir en zone centrale ;
- bouton `Terminer` possible en bas ;
- retour automatique obligatoire.

Message principal :

`Commande validée.`

Message obligatoire :

`Présentez votre ticket au comptoir pour régler votre commande.`

Règles :

- aucune donnée du client précédent ne doit rester visible après retour accueil ;
- bouton `Terminer` possible ;
- retour automatique obligatoire.

---

### 18.12 Erreur impression

Objectif :

Aider sans créer de panique.

Direction visuelle :

- message clair ;
- pictogramme simple ;
- bouton de réessai si prévu ;
- instruction comptoir visible.

Message recommandé :

`Le ticket n’a pas pu être imprimé. Merci de demander de l’aide au comptoir.`

---

### 18.13 Mode maintenance

Objectif :

Empêcher une commande si la borne est indisponible.

Direction visuelle :

- très simple ;
- message lisible ;
- aucune action de commande ;
- invitation à commander au comptoir.

Message recommandé :

`Borne temporairement indisponible. Merci de commander directement au comptoir.`

---

## 19. Interface admin

L’interface admin doit rester sobre, simple et opérationnelle.

Elle doit être cohérente avec Pizza de Nuit, mais la priorité est la lisibilité.

### 19.1 Style recommandé

- fond clair ;
- tableaux lisibles ;
- boutons simples ;
- statuts visibles ;
- accents de marque limités ;
- pas d’ambiance trop immersive.

### 19.2 Adaptation au 9:16

Si l’admin est utilisé sur la même borne verticale :

- privilégier listes verticales ;
- éviter tableaux trop larges ;
- utiliser des cards admin ;
- afficher les actions principales en bas ;
- éviter les colonnes multiples complexes.

Si l’admin est aussi utilisé sur ordinateur, prévoir une adaptation responsive séparée.

L’interface client de borne reste prioritaire.

### 19.3 Écrans admin possibles

- connexion ;
- tableau de bord simple ;
- commandes ;
- détail commande ;
- réimpression ticket ;
- produits ;
- formats ;
- suppléments ;
- disponibilités ;
- réglages ticket.

### 19.4 À éviter

- dashboard lourd ;
- statistiques complexes ;
- interface caisse ;
- gestion paiement ;
- livraison ;
- réservation ;
- design trop décoratif.

---

## 20. Motion design

### 20.1 Objectif

Le motion design doit aider à comprendre, pas décorer.

### 20.2 Animations autorisées

- transition courte entre écrans ;
- feedback au toucher ;
- ajout au panier ;
- chargement impression ;
- confirmation visuelle ;
- sélection de format ;
- sélection de supplément.

### 20.3 Durées recommandées

- micro-interaction : 100 à 180 ms ;
- transition écran : 180 à 300 ms ;
- animation impression : courte, non bloquante.

### 20.4 À éviter

- animations longues ;
- parallaxe ;
- effets lourds ;
- transitions lentes ;
- animations qui bloquent la commande ;
- effets décoratifs sans utilité.

La performance est prioritaire sur l’effet visuel.

---

## 21. Accessibilité et lisibilité

L’application doit être utilisable par tous les clients, rapidement et sans aide.

### 21.1 Règles obligatoires

- contraste fort ;
- gros textes ;
- boutons larges ;
- prix très visibles ;
- messages courts ;
- icônes simples ;
- feedback clair ;
- erreurs compréhensibles ;
- aucune information critique cachée ;
- pas de texte minuscule ;
- pas de dépendance au hover.

### 21.2 Messages importants

Les messages suivants doivent être visuellement forts :

- `Paiement au comptoir après impression du ticket.`
- `Valider et imprimer le ticket`
- `Présentez votre ticket au comptoir pour régler votre commande.`

Ces messages ne doivent jamais être relégués en petit texte peu visible.

### 21.3 Distance d’utilisation

La borne 27 pouces sera utilisée debout.

Codex doit donc prévoir :

- textes lisibles à distance ;
- prix très visibles ;
- boutons faciles à toucher ;
- messages essentiels placés dans les zones de regard naturelles ;
- aucune information critique en petit.

---

## 22. Wording visuel

### 22.1 Boutons autorisés

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

### 22.2 Termes interdits

Ne jamais utiliser comme action principale :

- `Payer`
- `Payer maintenant`
- `Procéder au paiement`
- `Régler sur la borne`
- `Livraison`
- `Sur place`
- `Réserver`
- `Créer un compte`

La borne valide une commande et imprime un ticket.

Elle ne paie jamais.

---

## 23. Règles Tailwind recommandées

### 23.1 Structure des classes

Codex doit privilégier :

- classes lisibles ;
- composants réutilisables ;
- tokens centralisés ;
- pas de couleurs arbitraires dispersées ;
- pas de tailles incohérentes.

### 23.2 Composants UI à prévoir

- `Button`
- `ProductCard`
- `CategoryCard`
- `FormatSelector`
- `SupplementSelector`
- `CartSummary`
- `TotalBar`
- `KioskHeader`
- `KioskLayout`
- `ConfirmationPanel`
- `TicketStatus`
- `AdminTable`
- `StatusBadge`

### 23.3 Tokens d’espacement

Recommandation :

- `space-2` : micro-espacement ;
- `space-4` : espacement standard ;
- `space-6` : séparation de blocs ;
- `space-8` : séparation d’écrans ;
- `space-12` : respiration forte.

Sur borne, mieux vaut trop d’espace que trop de densité.

### 23.4 Rayons

Recommandation :

- cards : `rounded-2xl`
- boutons : `rounded-xl` ou `rounded-2xl`
- panneaux : `rounded-3xl`
- badges : `rounded-full`

### 23.5 Ombres

Utiliser les ombres avec modération :

- cards produits ;
- panneaux importants ;
- CTA ;
- modales.

Ne pas créer une interface trop lourde.

---

## 24. Do / Don’t

### 24.1 Do

- respecter le site Pizza de Nuit ;
- concevoir d’abord pour un écran vertical 9:16 ;
- adapter l’interface à une borne tactile 27 pouces ;
- alterner sombre et clair ;
- utiliser le sombre pour l’impact ;
- utiliser le clair pour la commande ;
- afficher de grandes photos de pizza ;
- rendre les prix très visibles ;
- créer de grands boutons tactiles ;
- placer les actions principales en zone basse ;
- garder un parcours court ;
- afficher clairement le paiement au comptoir ;
- mettre en avant le ticket imprimé ;
- garder une interface commerciale ;
- prévoir des composants réutilisables ;
- optimiser la lisibilité.

### 24.2 Don’t

- créer une interface 100 % noire ;
- créer une interface 100 % blanche ;
- copier un style italien rustique ;
- créer un design gastronomique ;
- créer une application de livraison ;
- créer une interface de paiement ;
- utiliser `Payer` comme bouton final ;
- cacher le total ;
- faire des boutons petits ;
- ajouter trop d’animations ;
- écrire des textes longs ;
- surcharger les cards ;
- inventer des produits ou prix ;
- ignorer les règles métier ;
- ignorer le ticket imprimé ;
- concevoir pour desktop horizontal ;
- utiliser une grille à 3 ou 4 colonnes ;
- placer l’action principale dans une zone difficile à atteindre.

---

## 25. Checklist de validation design

Avant de valider un écran, Codex doit vérifier :

- [ ] l’écran respecte l’univers Pizza de Nuit ;
- [ ] l’écran est conçu pour une tablette / borne tactile 27 pouces ;
- [ ] l’écran respecte le ratio vertical 9:16 ;
- [ ] l’écran respecte l’alternance sombre / clair ;
- [ ] l’écran est utilisable au tactile ;
- [ ] l’action principale est évidente ;
- [ ] l’action principale est idéalement placée en zone basse ;
- [ ] les boutons sont assez grands ;
- [ ] les textes sont courts ;
- [ ] les prix sont visibles ;
- [ ] le panier est accessible si nécessaire ;
- [ ] le total est visible dans le panier ;
- [ ] la mention paiement au comptoir est visible ;
- [ ] aucun bouton `Payer` n’existe ;
- [ ] aucune mention livraison n’existe ;
- [ ] aucune mention sur place n’existe ;
- [ ] aucune réservation n’existe ;
- [ ] le bouton final est `Valider et imprimer le ticket` ;
- [ ] le message final est `Présentez votre ticket au comptoir pour régler votre commande.` ;
- [ ] les cartes produits sont lisibles ;
- [ ] les photos sont appétissantes ;
- [ ] les badges ne surchargent pas l’écran ;
- [ ] les animations sont courtes ;
- [ ] le design reste cohérent avec les documents projet ;
- [ ] le rendu est plus proche d’un snack moderne que d’un restaurant gastronomique ;
- [ ] aucun layout desktop horizontal n’est utilisé.

---

## 26. Règles finales pour Codex

Codex doit toujours concevoir l’interface comme une borne tactile de commande à emporter.

La contrainte d’écran principale est :

> tablette / borne tactile 27 pouces, format vertical 9:16, usage public, client debout.

La priorité est :

1. compréhension immédiate ;
2. rapidité de commande ;
3. lisibilité des pizzas ;
4. lisibilité des prix ;
5. simplicité du panier ;
6. clarté du ticket ;
7. paiement au comptoir compris par le client ;
8. cohérence avec Pizza de Nuit ;
9. adaptation parfaite au format vertical 9:16.

Codex ne doit jamais ajouter une logique visuelle ou fonctionnelle qui laisse penser que le client paie sur la borne.

La borne doit rester :

- simple ;
- rapide ;
- claire ;
- tactile ;
- verticale ;
- commerciale ;
- nocturne ;
- street-food ;
- fidèle à Pizza de Nuit.

Rappel absolu :

> Le client commande sur la borne.  
> La borne imprime un ticket.  
> Le client présente le ticket au comptoir.  
> Le paiement se fait au comptoir.  
> La commande est préparée à emporter.