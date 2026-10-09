# Plan d'Implémentation - Plateforme Web Officielle du RAJI

Création du site web officiel et de la plateforme interactive du **RAJI (Réseau Africain des Jeunes Innovateurs)** conformément au cahier des charges officiel. Le projet servira à la fois de site vitrine institutionnel, média d'information, annuaire interactif des innovateurs, portail de soumission de projets, gestionnaire d'événements, tableau de bord d'administration et prototype du système de mise en relation **RAJI Match**.

---

## User Review Required

> [!IMPORTANT]
> **Stack Technique recommandée** : Web App réactive moderne bâtie avec **Vite + React + Lucide Icons + CSS / Tailwind CSS** dans le répertoire `/home/joaness/.gemini/antigravity-ide/scratch/raji-official-platform`.
> 
> **Charte Graphique Respectée** : 
> - Couleur Dominante : **Bleu Navy Profond (`#071934`)**
> - Couleur Canvas / Fond : **Blanc Pur (`#FFFFFF`) & Surface Douce (`#F8F9FC`)**
> - Accent : **Or Chaud (`#D3A940`)**
> - Typographie : **Inter**

> [!NOTE]
> La plateforme intégrera également une simulation complète de l'**Espace Administration** (gestion des candidatures, validation, statistiques) ainsi qu'un prototype interactif du module **RAJI Match** (mise en relation Innovateur $\rightarrow$ Investisseur).

---

## Open Questions

1. **Intégration Stitch** : Souhaitez-vous également que nous générions des variantes d'écrans Stitch complémentaires sur votre projet Stitch existant `projects/7846795211100844824` (*Remix of RAJI Network Portal*) en parallèle de l'application React interactive ?
2. **Langues** : Pour cette V1, l'interface sera principalement en Français (comme indiqué au cahier des charges). Souhaitez-vous prévoir un sélecteur de langue (FR / EN) pour la vision panafricaine ?

---

## Proposed Changes

### Structure des Fichiers de l'Application Web

Nous allons créer l'application dans `/home/joaness/.gemini/antigravity-ide/scratch/raji-official-platform`.

```
raji-official-platform/
├── src/
│   ├── assets/               # Logos, motifs géométriques et visuels
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.jsx    # Navigation principale, logo, sélecteur de rubrique & CTAs
│   │   │   ├── Footer.jsx    # Pied de page avec liens directs RS (WhatsApp, LinkedIn, etc.)
│   │   │   └── Banner.jsx    # Slogan et annonces urgentes
│   │   ├── home/
│   │   │   ├── Hero.jsx      # Hero section impactant avec slogan et statistiques
│   │   │   ├── ImpactMap.jsx # Carte/Statistiques de la présence panafricaine
│   │   │   └── Highlights.jsx# Focus sur les dernières innovations & interviews
│   │   ├── directory/
│   │   │   ├── InnovatorCard.jsx  # Carte d'un innovateur avec tags et statut
│   │   │   ├── InnovatorFilter.jsx# Filtres (Pays, Secteur, Stade du projet)
│   │   │   └── InnovatorModal.jsx # Fiche détaillée de l'innovation
│   │   ├── submission/
│   │   │   └── SubmissionWizard.jsx # Formulaire multi-étapes "Soumettre mon innovation"
│   │   ├── media/
│   │   │   └── MediaGrid.jsx  # Grille d'interviews, vidéos, et portraits
│   │   ├── events/
│   │   │   ├── EventCard.jsx  # Carte d'événement avec compte à rebours & inscription
│   │   │   └── EventsSection.jsx # Événements à venir et archives
│   │   ├── partners/
│   │   │   └── PartnerModal.jsx # Formulaire "Devenir Partenaire"
│   │   ├── opportunities/
│   │   │   └── OpportunityBoard.jsx # Appels à projets et financements
│   │   ├── admin/
│   │   │   └── AdminDashboard.jsx # Dashboard d'administration avec validation des projets et stats
│   │   └── match/
│   │       └── RajiMatchEngine.jsx # Prototype interactif du matching Innovateurs <-> Investisseurs
│   ├── data/
│   │   └── mockData.js       # Données de démonstration réalistes (Innovateurs, Interviews, Événements, Partenaires)
│   ├── context/
│   │   └── AppContext.jsx    # State global pour la soumission, la recherche et l'administration
│   ├── App.jsx               # Composant racine avec routage/navigation
│   ├── index.css             # Tokens CSS (Navy `#071934`, Or `#D3A940`, Inter font, animations)
│   └── main.jsx
├── package.json
└── vite.config.js
```

---

## Components & Feature Plan

#### [NEW] [`index.css`](file:///home/joaness/.gemini/antigravity-ide/scratch/raji-official-platform/src/index.css)
- Configuration complète des variables CSS d'après le Design System **Pan-African Innovation Matrix** :
  - Primary Navy: `#071934`
  - Accent Gold: `#D3A940`
  - Soft Surface: `#F8F9FC`
  - Text & Muted tones: `#191C1E`, `#526071`
  - Motifs filigranes géométriques discrets (triangles/chevrons africains à 4% d'opacité)
  - Ombres et élévations Level 0 à Level 3

#### [NEW] [`Header.jsx`](file:///home/joaness/.gemini/antigravity-ide/scratch/raji-official-platform/src/components/layout/Header.jsx)
- Navigation complète avec toutes les rubriques du Cahier des Charges :
  - **Accueil**, **À Propos**, **Innovateurs**, **Soumettre mon Innovation**, **RAJI Média**, **Événements**, **Partenaires**, **Opportunités**, **RAJI Match**, **Contact**, **Administration**.
- Boutons d'action rapide : **"Soumettre mon Innovation"** et **"WhatsApp Direct"**.

#### [NEW] [`Hero.jsx`](file:///home/joaness/.gemini/antigravity-ide/scratch/raji-official-platform/src/components/home/Hero.jsx)
- Slogan officiel : *"RAJI - Aujourd'hui innovateurs, demain bâtisseurs de l'Afrique."*
- Compteur dynamique d'impact : Innovateurs référencés, Pays représentés, Montants levés, Partenaires engagés.
- Liens d'action directe pour les Innovateurs et les Investisseurs/Partenaires.

#### [NEW] [`InnovatorFilter.jsx` & `InnovatorCard.jsx`](file:///home/joaness/.gemini/antigravity-ide/scratch/raji-official-platform/src/components/directory/InnovatorFilter.jsx)
- Filtrage en temps réel par :
  - **Pays** (Bénin, Sénégal, Côte d'Ivoire, Nigeria, Cameroun, Togo, etc.)
  - **Secteur** (Agritech, FinTech, Énergie Solaire, HealthTech, EdTech, IA & Robotique)
  - **Stade du projet** (Idéation, Prototype fonctionnel, Commercialisation, Croissance)
- Fiche popup avec détails du projet, vidéo/photo de démonstration, besoins financiers et contact professionnel.

#### [NEW] [`SubmissionWizard.jsx`](file:///home/joaness/.gemini/antigravity-ide/scratch/raji-official-platform/src/components/submission/SubmissionWizard.jsx)
- Formulaire interactif en 4 étapes :
  1. *Identité de l'Innovateur* (Nom, Pays, Ville, WhatsApp, Email)
  2. *Présentation du Projet & Innovation* (Secteur, Problème résolu, Solution, Niveau d'avancement)
  3. *Impact & Modèle Économique* (Clients, Revenus, Nombre d'emplois créés)
  4. *Besoins & Financement* (Montant recherché en FCFA, utilisation des fonds, photos/vidéos, consentement)

#### [NEW] [`MediaGrid.jsx`](file:///home/joaness/.gemini/antigravity-ide/scratch/raji-official-platform/src/components/media/MediaGrid.jsx)
- Portail multimédia RAJI Média avec catégories : Interviews, Portraits d'innovateurs, Innovation de la semaine, Success stories.
- Lecteur vidéo/audio simulé et intégration des articles récents.

#### [NEW] [`EventsSection.jsx`](file:///home/joaness/.gemini/antigravity-ide/scratch/raji-official-platform/src/components/events/EventsSection.jsx)
- Présentation du **RAJI Investor Day**, des foires et salons d'innovation.
- Compte à rebours avant le prochain événement, modal d'inscription pour participants/investisseurs, et galerie des événements passés.

#### [NEW] [`PartnerModal.jsx` & `PartnerSection.jsx`](file:///home/joaness/.gemini/antigravity-ide/scratch/raji-official-platform/src/components/partners/PartnerModal.jsx)
- Grille des logos de partenaires par catégorie (Institutions, Banques, Entreprises, Médias, Universités).
- Formulaire "Devenir Partenaire de RAJI" conformément à la section XVI du cahier des charges.

#### [NEW] [`RajiMatchEngine.jsx`](file:///home/joaness/.gemini/antigravity-ide/scratch/raji-official-platform/src/components/match/RajiMatchEngine.jsx)
- Démonstrateur interactif du module futur **RAJI Match** (Matching automatique entre le besoin d'un innovateur et les critères d'investissement d'un fond/partneraire).

#### [NEW] [`AdminDashboard.jsx`](file:///home/joaness/.gemini/antigravity-ide/scratch/raji-official-platform/src/components/admin/AdminDashboard.jsx)
- Espace Administration sécurisé (simulation de rôles : Administrateur Général, Communication, Affaires Extérieures).
- Modération des candidatures d'innovateurs, statistiques de fréquentation, gestion des publications et exportation des données.

---

## Verification Plan

### Automated Verification
- Validation de la compilation Vite et de l'absence d'erreurs d'importation.
- Exécution du serveur de développement local (`npm run dev`).

### Manual Verification
- Test d'interactivité de la navigation entre toutes les rubriques (Accueil, À propos, Innovateurs, Média, Événements, Partenaires, Opportunités, Contact, Admin).
- Test du filtrage d'annuaire (par pays, secteur, stade).
- Test complet du parcours de soumission d'innovation multi-étapes avec ajout simulé dans l'annuaire et le tableau de bord Admin.
- Test de la réactivité responsive sur mobile, tablette et desktop.
