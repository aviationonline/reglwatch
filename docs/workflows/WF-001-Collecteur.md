# WF-001 - Collecteur

## Objectif

Collecter automatiquement les nouvelles publications des sources officielles.

## Entrée

Table `sources`

## Sortie

Table `source_documents`

## Étapes

1. Lire les sources actives.
2. Télécharger les publications.
3. Normaliser les données.
4. Calculer un hash.
5. Vérifier les doublons.
6. Enregistrer dans `source_documents`.

## Résultat attendu

Une nouvelle publication officielle est enregistrée une seule fois dans `source_documents`.

## Critères de validation

- Le workflow peut être relancé sans créer de doublons.
- Les erreurs sont journalisées.
- Chaque document possède un hash unique.
