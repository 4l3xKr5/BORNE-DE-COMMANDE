# ROADMAP.md

## 1. Rôle du document

Ce document définit la roadmap de développement de l’application de borne de commande tactile **Pizza de Nuit**.

Il sert de feuille de route pour Codex afin de développer le projet dans le bon ordre, sans improvisation, sans surcomplexité et sans ajout de fonctionnalités hors périmètre.

La roadmap doit permettre de construire progressivement :

1. le socle technique ;
2. les données structurées ;
3. l’interface tactile verticale 9:16 ;
4. le parcours client ;
5. la logique panier ;
6. la validation de commande ;
7. le ticket imprimé ;
8. le backend minimal ;
9. l’administration simple ;
10. les tests ;
11. le mode borne ;
12. la préparation au déploiement.

---

## 2. Sources de vérité

Avant toute phase de développement, Codex doit lire et respecter les documents suivants :

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

Le site officiel indique l’univers général de Pizza de Nuit : **La Street Pizza de la Nuit**, avec une identité nocturne, urbaine, directe et commerciale.

Le site Pizza de Nuit sert à comprendre l’identité visuelle, l’univers, le ton, l’ambiance et les informations publiques visibles.

Il ne doit jamais écraser :

- les règles métier confirmées ;
- le fonctionnement à emporter ;
- l’absence de paiement sur borne ;
- l’impression du ticket ;
- le paiement au comptoir ;
- les consignes présentes dans les documents du projet.

En cas de contradiction, appliquer l’ordre de priorité ci-dessus.

---

## 3. Fonctionnement central de la borne

Le fonctionnement réel de la borne est strictement celui-ci :

```text
Client sur la borne
→ Commande à emporter
→ Sélection des produits
→ Personnalisation éventuelle
→ Panier
→ Validation finale
→ Impression du ticket
→ Présentation du ticket au comptoir
→ Paiement au comptoir
→ Préparation de la commande à emporter
