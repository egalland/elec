# Atelier Tableau · Elec

Configurateur pédagogique de tableau électrique en Three.js : quatre rangées de treize modules, appareils génériques, peignes et liaisons de principe.

**Démo : https://egalland.github.io/elec/**

## Utilisation

- Ajouter des disjoncteurs, des différentiels et des accessoires depuis le catalogue.
- Ajouter des peignes à broches ou à fourches par rangée, ou une liaison verticale générique.
- Faire un clic droit dans le tableau pour ajouter, retirer ou déplacer un appareil.
- Glisser un appareil vers une autre position ou une autre rangée ; le placement s’aimante et refuse les rangées pleines.
- Filtrer les liaisons par phase, neutre, terre ou circuit sélectionné.
- Nommer les circuits, renseigner les références, annuler les modifications, exporter et importer le projet en JSON.
- Utiliser le bouton **Actions ⋯** pour accéder aux actions sans clic droit.

Le projet est sauvegardé dans le navigateur utilisé. Une vue SVG interactive prend le relais si WebGL n’est pas disponible.

## Limites électriques

Cette maquette n’est pas un plan d’exécution. Les points de raccordement sont symboliques ; la forme des peignes et des appareils est générique. Elle ne valide ni les bornes réelles, ni les sections, ni les calibres, ni les serrages, ni la compatibilité des peignes, ni la conformité de l’installation.

La bibliothèque de composants n’est pas un catalogue Siemens officiel. Les références fabricant et le dimensionnement doivent être vérifiés avant un montage réel. Les appareils multiphasés et certains accessoires n’ont pas de câblage automatique.

## Lancer en local

Aucune compilation ni installation de dépendances n’est nécessaire.

```sh
python3 -m http.server 8080 --directory dist
```

Ouvrir ensuite http://localhost:8080/. Les modules JavaScript nécessitent un serveur HTTP : une ouverture directe de `index.html` en `file://` ne suffit pas.

## Tests

Avec Node.js 22 ou supérieur :

```sh
node --test tests/*.test.mjs
```

Les huit tests couvrent les déplacements, les rangées pleines, la séparation des groupes de peignes et la génération de géométries Three.js sans coordonnées invalides. Le rendu WebGL n’a pas pu être vérifié visuellement dans le navigateur de développement ; les interactions ont été vérifiées dans la vue SVG de secours.

## Organisation

- `dist/` : application statique prête à servir.
- `dist/board-core.js` : règles de placement et groupes de peignes.
- `tests/` : tests du placement et de la géométrie.
- `THIRD_PARTY_NOTICES.md` : licence des bibliothèques embarquées.

## Historique

Le dépôt reprend les trois commits de travail disponibles, avec leurs identifiants, parents, auteurs et dates d’origine. Il ne reconstruit pas de commits pour les étapes antérieures qui n’avaient pas été enregistrées dans Git.

Les fichiers de Three.js et OrbitControls sont embarqués en version 0.170.0. Les polices sont chargées depuis Google Fonts ; une police système est utilisée en secours.
