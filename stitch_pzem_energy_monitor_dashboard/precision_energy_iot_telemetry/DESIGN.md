---
name: Precision Energy & IoT Telemetry
colors:
  surface: '#0b1326'
  surface-dim: '#0b1326'
  surface-bright: '#31394d'
  surface-container-lowest: '#060e20'
  surface-container-low: '#131b2e'
  surface-container: '#171f33'
  surface-container-high: '#222a3d'
  surface-container-highest: '#2d3449'
  on-surface: '#dae2fd'
  on-surface-variant: '#c3c6d7'
  inverse-surface: '#dae2fd'
  inverse-on-surface: '#283044'
  outline: '#8d90a0'
  outline-variant: '#434655'
  surface-tint: '#b4c5ff'
  primary: '#b4c5ff'
  on-primary: '#002a78'
  primary-container: '#2563eb'
  on-primary-container: '#eeefff'
  inverse-primary: '#0053db'
  secondary: '#4cd7f6'
  on-secondary: '#003640'
  secondary-container: '#03b5d3'
  on-secondary-container: '#00424e'
  tertiary: '#45dfa4'
  on-tertiary: '#003825'
  tertiary-container: '#007d57'
  on-tertiary-container: '#bdffdc'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#dbe1ff'
  primary-fixed-dim: '#b4c5ff'
  on-primary-fixed: '#00174b'
  on-primary-fixed-variant: '#003ea8'
  secondary-fixed: '#acedff'
  secondary-fixed-dim: '#4cd7f6'
  on-secondary-fixed: '#001f26'
  on-secondary-fixed-variant: '#004e5c'
  tertiary-fixed: '#68fcbf'
  tertiary-fixed-dim: '#45dfa4'
  on-tertiary-fixed: '#002114'
  on-tertiary-fixed-variant: '#005137'
  background: '#0b1326'
  on-background: '#dae2fd'
  surface-variant: '#2d3449'
typography:
  display-lg:
    fontFamily: JetBrains Mono
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-md:
    fontFamily: JetBrains Mono
    fontSize: 36px
    fontWeight: '600'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  title-sm:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
  metric-xl:
    fontFamily: JetBrains Mono
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
  metric-md:
    fontFamily: JetBrains Mono
    fontSize: 18px
    fontWeight: '500'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  label-mono:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.04em
  label-ui:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1.25rem
  gutter-lg: 1.5rem
  margin: 1.5rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
---

## Brand & Style

Le design system incarne la précision instrumentale, la sobriété industrielle et la clarté opérationnelle d'un centre de contrôle énergétique temps réel. Destiné aux gestionnaires d'énergie, techniciens IoT et passionnés de domotique surveillant des modules de mesure électrique (tels que PZEM-004T), l'interface élimine tout bruit visuel au profit d'une lecture immédiate et sans équivoque.

L'esthétique fusionne un **minimalisme technique** et un **mode sombre high-tech maîtrisé** :
- **Atmosphère nocturne contrôlée :** Des fonds bleu nuit profonds qui réduisent la fatigue oculaire lors d'une surveillance continue sur poste fixe ou tablette.
- **Rigueur télémétrique :** Les métriques électriques (tension, intensité, puissance active, énergie cumulée, fréquence, facteur de puissance) sont traitées comme des instruments de laboratoire, bénéficiant d'une typographie monospace dédiée.
- **Hiérarchie sémiotique stricte :** Les couleurs fonctionnelles (vert menthe, ambre, rouge) sont réservées exclusivement aux statuts d'état et seuils d'alerte, garantissant qu'aucun artefact décoratif ne vienne parasiter l'attention de l'opérateur.

## Colors

La palette de couleurs est rigoureusement partitionnée selon les exigences fonctionnelles de l'instrumentation :

- **Fond principal (Canvas) :** `#0F172A` (Bleu nuit profond) assure la base absorbante et immersive de l'application.
- **Surfaces de travail (Cards & Panneaux) :** `#1E293B` (Bleu ardoise foncé) détache les blocs fonctionnels du fond. Les séparations reposent sur des bordures subtiles `#334155`.
- **Action & Sélection (Primary) :** `#2563EB` (Bleu électrique) pilote les états actifs, la navigation courante et les déclencheurs primaires.
- **Télémétrie & Flux (Secondary) :** `#06B6D4` (Cyan électrique) est réservé aux séries de données continues, courbes de charge, jauges radiales, points d'inflexion et hyperliens textuels.
- **Typographie :**
  - Titres et valeurs prioritaires : `#F1F5F9` (Blanc cassé haute lisibilité).
  - Libellés d'unités, métadonnées, horodatages : `#64748B` (Gris acier).
- **États & Alertes (Functional Semantics) :**
  - Opérationnel / En ligne / Mode Éco : `#34D399` (Vert menthe).
  - Avertissement / Dépassement de seuil indicatif : `#F59E0B` (Ambre).
  - Défaut critique / Surtension / Déconnexion sonde : `#EF4444` (Rouge vif).

## Typography

Le système typographique repose sur une séparation fonctionnelle nette entre deux familles de fontes :

1. **Inter (Interface & Navigation) :** Utilisée pour l'ensemble des titres, descriptions, labels de boutons, filtres et menus. Elle offre une neutralité suisse et une clarté optique parfaite sur fond sombre.
2. **JetBrains Mono (Mesures & Télémétrie) :** Obligatoire pour toutes les grandeurs physiques mesurées (V, A, W, kWh, Hz, PF), compteurs incrémentaux, adresses IP de modules, horodatages d'échantillonnage et données tabulaires. La chasse fixe garantit la stabilité visuelle des chiffres lors des rafraîchissements haute fréquence sans sautillement d'alignement.

Les unités physiques associées aux métriques (ex: `V`, `kW`, `Hz`) sont toujours rendues dans une graisse plus légère (`fontWeight: 400` ou `500`) et dans la couleur secondaire gris acier `#64748B`, afin de faire ressortir la magnitude numérique.

## Layout & Spacing

L'architecture spatiale est conçue pour des environnements de supervision denses mais aérés :

- **Modèle de grille :**
  - **Desktop (≥ 1024px) :** Barre latérale gauche fixe (largeur standard 260px repliable à 72px en mode compact). Zone principale organisée en grille fluide de 12 colonnes, avec des gouttières de `1.5rem` (`gutter-lg`) et une marge extérieure de `1.5rem`.
  - **Mobile (< 768px) :** La barre latérale se replie en panneau tiroir (drawer modal). Le contenu bascule en flux 1 colonne avec gouttières de `1rem` et marge extérieure de `1rem`.
- **Rythme vertical & horizontal :**
  - Espacements internes de cartes : `1.25rem` à `1.5rem`.
  - Écartement compact entre valeurs télémétriques et libellés : `space-xs` (4px) à `space-sm` (8px).
  - Écartement entre modules de métriques (KPI cards) : `gutter` (20px).

## Elevation & Depth

La hiérarchie d'élévation en mode sombre évite les ombres portées noires opaques qui s'annulent sur `#0F172A`. Elle s'appuie sur le contraste surfacique et des bordures techniques luminescentes discrètes :

1. **Niveau 0 (Toile de fond) :** Couleur `#0F172A`, plate, sans relief.
2. **Niveau 1 (Cartes de métriques & panneaux graphiques) :** Fond `#1E293B`, délimité par une bordure fine continue de 1px en `#334155`. Ombre discrète : `box-shadow: 0 4px 12px -2px rgba(0, 0, 0, 0.35)`.
3. **Niveau 2 (Survol & cartes sélectionnées) :** La bordure de carte s'éclaire subtilement vers un mélange ardoise-cyan ou bleu (`border-color: rgba(6, 182, 212, 0.4)`), accompagnée d'une lueur d'ambiance diffuse : `box-shadow: 0 8px 24px -4px rgba(6, 182, 212, 0.12)`.
4. **Niveau 3 (Modales, menus déroulants, infobulles de graphiques) :** Fond `#1E293B` enrichi d'un léger effet dépoli (`backdrop-filter: blur(8px)` avec 95% d'opacité), bordure `#475569`, et ombre portée marquée : `box-shadow: 0 12px 32px -4px rgba(0, 0, 0, 0.6)`.

## Shapes

La géométrie des conteneurs répond à la spécification `rounded-xl` (12px / `0.75rem`), conférant au tableau de bord un équilibre moderne entre souplesse visuelle et rigueur industrielle :

- **Cartes et panneaux graphiques :** Coins arrondis à 12px (`0.75rem`), créant un découpage net et régulier des modules de mesure.
- **Boutons d'action et champs de saisie :** Coins arrondis à 8px (`0.5rem`) pour une manipulation ergonomique sans dispersion géométrique.
- **Badges de statut et pastilles d'unités :** Rayon arrondi à 6px ou pleine pilule (`9999px`) pour les indicateurs ponctuels d'activité ("En ligne", "Standby").
- **Épaisseur des traits de structure :** 1px uniforme sur toutes les bordures (`border: 1px solid #334155`).

## Components

### 1. Cartes de Métrique Électrique (PZEM Metric Cards)
- **Structure :** En-tête avec label en `body-sm` (`#64748B`) et icône linéaire Lucide 18px (ex: `Zap`, `Activity`, `Gauge`, `Cpu`).
- **Corps :** Valeur principale en `JetBrains Mono` (`metric-xl` ou `display-md`, `#F1F5F9`) suivie immédiatement du symbole d'unité en `label-mono` (`#06B6D4` ou `#64748B`).
- **Pied de carte :** Mini sparkline SVG cyan ou différentiel d'évolution en pourcentage avec flèche Lucide (`TrendingUp` vert menthe ou `TrendingDown` rouge).

### 2. Boutons
- **Primaire :** Fond `#2563EB`, texte `#F1F5F9`, poids 500. Au survol : fond éclairci `#1D4ED8`. Clic : micro-compression (`scale(0.98)`).
- **Secondaire / Outlined :** Fond transparent, bordure 1px `#334155`, texte `#F1F5F9`. Au survol : fond `#1E293B`, bordure `#64748B`.
- **Danger (Coupure relais / Reset kWh) :** Fond transparent, bordure 1px `#EF4444`, texte `#EF4444`. Au survol : fond `#EF4444` avec texte blanc.

### 3. Indicateurs de Statut (Live Badges)
- Pastille circulaire pulsante de 8px :
  - Vert menthe `#34D399` avec halo animé (`ping`) pour signifier une liaison active PZEM/MQTT.
  - Ambre `#F59E0B` pour latence élevée ou facteur de puissance dégradé (cos φ < 0.8).
  - Rouge `#EF4444` fixe pour rupture de trame Modbus ou surintensité.

### 4. Graphiques et Jauges
- **Courbes de charge :** Trait cyan électrique `#06B6D4` d'épaisseur 2px, surface inférieure remplie par un dégradé vertical décroissant (`rgba(6, 182, 212, 0.25)` vers `rgba(6, 182, 212, 0.0)`).
- **Réticules et grilles :** Lignes pointillées très discrètes en `#334155` avec opacité 50%.
- **Infobulles (Tooltips de points) :** Fond `#0F172A`, bordure `#06B6D4`, valeurs affichées en `JetBrains Mono`.

### 5. Barre Latérale (Sidebar)
- Fond `#0F172A` avec bordure droite verticale 1px `#334155`.
- Éléments de menu : hauteur 44px, disposition icône Lucide 20px + label texte `title-sm`.
- État actif : texte `#F1F5F9`, fond `#1E293B`, liseré vertical gauche de 3px en bleu électrique `#2563EB`.

### 6. Champs de Saisie et Sélecteurs de Période
- Conteneurs en fond `#0F172A` ou `#1E293B` interne, bordure 1px `#334155`. Focus ring : double pixel cyan `#06B6D4`.
- Sélecteurs de plage temporelle (1h, 24h, 7j, 30j) : segment toggle regroupé avec fond inactif `#0F172A` et bouton actif bleu électrique `#2563EB`.