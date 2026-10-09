# PROMPTS STITCH — Régénération « Responsive Multiplateforme » des maquettes RAJI

Objectif : régénérer **toutes les pages** en **une seule maquette responsive multiplateforme** par page (au lieu des versions Desktop / Tablette / Mobile séparées), en restant **strictement fidèle** à : couleurs RAJI, logo RAJI, images et expérience utilisateur.

---

## MODE D'EMPLOI (à lire d'abord)

1. Ouvre le projet Stitch **« Remix of RAJI Network Portal »** (`projects/7846795211100844824`).
2. Pour chaque page, **sélectionne l'écran source** listé dans le tableau ci-dessous (colonne « id écran source »), puis lance une édition (`stitch_edit_screens`).
3. **Prompt final = BLOC COMMUN + BLOC PAGE** (colle le BLOC COMMUN d'abord, puis le bloc de la page, dans le même message).
4. **Important** : l'édition Stitch crée en général un **NOUVEL écran** (elle ne modifie pas l'original). Le nouvel écran sera nommé automatiquement. C'est normal et souhaité (on garde l'ancien pour comparaison).
5. Réglages conseillés : `deviceType = DESKTOP` (le code doit couvrir mobile→desktop), `model = GEMINI_3_8_FLASH`.
6. Quand tu as généré les écrans, **envoie-moi la liste des nouveaux écrans/identifiants** : je les réimporte dans `raji2` (téléchargement local des images, remplacement du logo par `assets_raji/image.png/screen.png`, régénération de `index.html`).

> Pages socles à régénérer en priorité (12) : Accueil, À propos, Innovateurs (annuaire + fiche), Soumettre (étapes), RAJI Média (+ article), Événements (liste + détail), Partenaires (liste + devenir), Opportunités (liste + détail), Contact, Administration, Design System, RAJI Match.

---

## TABLEAU DES PAGES & ÉCRANS SOURCES

| # | Page | id écran source (Desktop) |
|---|------|---------------------------|
| 01 | Accueil | `10911d8b0a73467c81595d0c63a45c16` |
| 02 | À propos | `f4eb473397b64cf9b1b76146ec26e122` |
| 03 | Innovateurs — Annuaire | `244a0b9d383742c3b5647908704a96d0` |
| 04 | Innovateurs — Fiche profil | `e91128c96e6b429282aad2ad0ba22291` |
| 05 | Innovateurs — Profil (contact non partagé) | `4c5a3eee06ab468f95dbc850f7bd4b08` |
| 06 | Innovateurs — Aucun résultat | `e5f23a8d80e443efb578c6b380d3222e` |
| 07 | Soumettre — Étape 1 | `59f7f9d04b7043aea32e0c4b4477dff9` |
| 08 | Soumettre — Étape 1 (erreurs de validation) | `767e2a254e6a4fad9ebcfcbec372a477` |
| 09 | Soumettre — Étape 2 | `4625bba800a94b4baebcd7736c3530bd` |
| 10 | Soumettre — Étape 3 | `9a0f6b2dd13842f8bdc6f8cfdbdd8d02` |
| 11 | Soumettre — Étape 4 | `5bbc1aa38b0f43d7a80dc87ada8da6d3` |
| 12 | Soumettre — Succès | `b3fab9ca6d1d48a897bf038a0ed176b6` |
| 13 | RAJI Média — Accueil | `1770f51adf78451e8d47b12eb50ea45b` |
| 14 | RAJI Média — Article | `3f837a57d29f442e9a750738870bc080` |
| 15 | Événements — Liste | `9a192ca86d6f4222b212c113d741cd38` |
| 16 | Événements — Détail & inscription | `2861e26055cb4fcb8c979b052468bc1f` |
| 17 | Partenaires — Liste | `b0af0ee73ccd48fc9bc9abc28f1e11bc` |
| 18 | Partenaires — Devenir partenaire | `c77c60a684a045ba99aaf51dee7b8782` |
| 19 | Opportunités — Liste | `778593a28fa44edfbe278edae41c723e` |
| 20 | Opportunités — Détail | `6ee550137c644b39988cea3e30ff3133` |
| 21 | Contact | `02afbfe9afa94220b3802102c5044447` |
| 22 | Administration — Tableau de bord | `9c0f6899e4434f3486fb6b9a4f7534b8` |
| 23 | Administration — Candidatures | `fadba3ee529f4a1392e78245c3b7c025` |
| 24 | Aperçu Design System | `7411548381e542658286d97a5bcc7fc1` |
| 25 | RAJI Match | `10701f779b154d16869bdcc1efffd1a7` |

---

# BLOC COMMUN — À COLLER AU DÉBUT DE CHAQUE PROMPT

```
Refais cet écran sous forme d'UNE SEULE maquette RESPONSIVE MULTIPLATEFORME (et non 3 versions séparées) : le même écran doit s'adapter de Desktop 1440px à Tablette 768px et Mobile 390px.

MARQUE — design system "Pan-African Innovation Sovereign" (aucune déviation) :
- Couleurs uniquement : navy #071934 (primaire, fonds sombres, texte), or #D3A940 (CTA principaux, badges, soulignement actif — texte navy au-dessus), blanc #FFFFFF (cartes), canvas #F3F4F5, bordures 1px #E6E8EB, texte secondaire #44474D. Aucune autre teinte.
- Typographie Inter uniquement : hero 48px poids 800, headline 30px poids 700, body 16–18px, labels 12–14px, interlignage 1.5, tracking négatif sur les grandes tailles.
- Rayons : cartes 12px, boutons/champs 8px, badges 4px, avatars/pastilles circulaires.
- Boutons : primaire fond or #D3A940 + texte navy #071934 (poids 600–700) ; secondaire fond navy + texte blanc ; outline 2px. Navigation : lien actif souligné or (border-bottom 2px).
- Motifs géométriques africains en traits fins, opacité 4% uniquement sur les fonds navy.

LOGO RAJI :
- Place le logo OFFICIEL RAJI dans le header ET dans le footer, dans un conteneur blanc (padding 4–8px, rayon 8px) pour garantir le contraste sur les fonds navy. Jamais de logo étiré/déformé ; hauteur ~44–56px dans le header, ~48–56px dans le footer.

RESPONSIVE (vrais paliers, classes Tailwind sm/md/lg ou media queries réelles) :
- Desktop ≥1024 : grille 12 colonnes, conteneur centré max 1200px, marges 24px, cartes 3–4 colonnes.
- Tablette 768–1023 : grille 8 colonnes, cartes 2 colonnes, sections py-12.
- Mobile <768 : 1 colonne, navigation en menu hamburger, CTA pleine largeur, images pleine largeur, texte ≥16px, cibles tactiles ≥44px, sections py-10.

IMAGES : vraies photos cohérentes et réalistes (agritech, healthtech, cleantech, portraits d'innovateurs africains), ratios fixes, attribut alt en français, loading="lazy". Aucune zone de placeholder vide.

UX / ACCESSIBILITÉ : focus visible or, contraste AA (navy/blanc, blanc/navy, navy/or), ordre de lecture logique, navigation clavier, états hover/active/focus cohérents.

FIDÉLITÉ : conserve l'INTÉGRALITÉ du contenu français existant (titres, textes, chiffres, noms, libellés de boutons). Ne réécris pas le contenu : améliore uniquement la mise en page responsive et l'application stricte de la marque.
```

---

# BLOCS PAR PAGE — À COLLER APRÈS LE BLOC COMMUN

## 01 · ACCUEIL — id source `10911d8b0a73467c81595d0c63a45c16`
```
PAGE : Accueil du site officiel RAJI.
À CONSERVER (sections et contenus exacts, dans cet ordre) :
- Header sticky : logo RAJI + navigation (Accueil, À propos, Annuaire des Innovateurs, Soumettre mon innovation, RAJI Média, Événements, Partenaires, Opportunités, Contact) + CTA "Soumettre mon innovation".
- Hero : titre « Réseau Africain des Jeunes Innovateurs » + slogan « L'AFRIQUE INNOVE DÉJÀ. MAIS QUI REGARDE ? » + 2 CTA.
- « Les 4 Piliers d'Action du RAJI » : Ils inventent / Ils créent / Ils transforment / Ils innoveront ensemble.
- Bloc partenaire « TECHLAB ».
- « Innovations mises en avant » : AgriFlow Sahel, Bio-Pesticide Nilotica, VoltGrid Decentral (cartes avec image, catégorie, statut, localisation, CTA).
- « Derniers innovateurs » : Fatou Diop, Kofi Mensah, Amina Cherif, Tariq Al-Hassan (portraits ronds).
- « Dernières interviews » : 3 articles RAJI Média.
- « Prochains événements » : Sommet Panafricain de la Jeunesse Innovante, Forum Régional AgriTech & Climat, Salon Continental des Solutions Vertes.
- Bandeau de conversion « Vous êtes un jeune innovateur africain ? Présentez votre projet au réseau. » + CTA.
- Footer complet : logo RAJI en conteneur blanc, colonnes de liens, réseaux (Facebook officiel), copyright « © 2026 Réseau Africain des Jeunes Innovateurs (RAJI) ».
À CONCEVOIR : hero plein écran navy avec motif géométrique 4%, chiffres clés, grilles de cartes qui passent de 4→2→1 colonnes.
```

## 02 · À PROPOS — id source `f4eb473397b64cf9b1b76146ec26e122`
```
PAGE : À propos du RAJI.
À CONSERVER : titre « À propos de RAJI » ; « Le catalyseur de l'ingéniosité africaine » ; « Nos lignes directrices » (Notre mission, Notre vision, Répondre aux défis majeurs de l'écosystème) ; « Nos objectifs prioritaires » (Valoriser les innovateurs, Créer des connexions régionales, Faciliter l'accès aux partenaires, Renforcer la souveraineté technologique) ; « Ce qui guide nos actions » (Intégrité, Excellence, Collaboration, Impact durable) ; « Les jalons de notre développement » (Naissance de l'initiative, Structuration du Réseau, Déploiement de RAJI Média, Consolidation & Sommet Continental) — timeline ; « L'équipe d'animation du réseau » (Dr. Salimata Kone, Kwaku Mensah, Amina Cherif, Ibrahim Touré, Fatoumata Bamba, David Mutua) ; bandeau final innovateur + footer.
À CONCEVOIR : mise en page éditoriale (texte + visuels), timeline verticale sur mobile / horizontale sur desktop, grille équipe 4→2→1.
```

## 03 · INNOVATEURS — ANNUAIRE — id source `244a0b9d383742c3b5647908704a96d0`
```
PAGE : Annuaire des innovateurs.
À CONSERVER : titre « Annuaire des innovateurs » ; barre de recherche + filtres (pays, secteur, maturité) ; grille de cartes innovateurs (Amadou Diallo – AgriFlow Sahel, Aïssata Traoré – CardioScan Mobiles, Kofi Osei – BioVolt Mini-Grids, Samuel Nguema – AfriLearn Offline, Yasmine Bennani – HydraDrone Oasis, Jean-Paul Kayiranga – Bio-Pesticide Nilotica, Akosua Mensah – AgroMicro Trust, Gildas Dossou – EcoPlast Pavés, Mialy Razafindrakoto – VolaMamy SolarCool) avec portrait rond, nom, pays, projet, statut ; pagination ; bandeau CTA « Vous êtes un jeune innovateur africain ? » ; footer.
À CONCEVOIR : filtres repliables dans un tiroir sur mobile, grille 3→2→1, cartes accessibles (min 44px).
```

## 04 · INNOVATEURS — FICHE PROFIL — id source `e91128c96e6b429282aad2ad0ba22291`
```
PAGE : Fiche profil d'innovateur.
À CONSERVER : titre « Amadou Diallo » ; sous-titre « AgriFlow Sahel — Irrigation solaire intelligente basse consommation » ; sections « Problème résolu », « Fonctionnement technique », « Ressources techniques et schémas » (galerie), « Besoins du projet », « Contact de l'innovateur » ; badges catégorie/maturité/localisation ; footer.
À CONCEVOIR : colonne latérale récapitulative (sticky sur desktop) qui passe au-dessus du contenu sur mobile, galerie responsive, badges et CTA conformes.
```

## 05 · INNOVATEURS — PROFIL (CONTACT NON PARTAGÉ) — id source `4c5a3eee06ab468f95dbc850f7bd4b08`
```
PAGE : Fiche profil d'innovateur avec contact non partagé.
À CONSERVER : mêmes sections que la fiche profil (Problème résolu, Fonctionnement technique, Besoins du projet, Contact de l'innovateur) MAIS la section contact affiche un état « contact non partagé » (message explicatif + bouton de demande de mise en relation), sans afficher les coordonnées.
À CONCEVOIR : état verrouillé clair mais non anxiogène, style conformé au design system, responsive 1 colonne sur mobile.
```

## 06 · INNOVATEURS — AUCUN RÉSULTAT — id source `e5f23a8d80e443efb578c6b380d3222e`
```
PAGE : Annuaire des innovateurs — état « aucun résultat ».
À CONSERVER : titre « Innovateurs » ; barre de recherche + filtres toujours visibles ; zone centrale « Aucun résultat trouvé » avec message d'aide et bouton « Réinitialiser les filtres » ; suggestions de recherche ; bloc « Vous êtes un jeune innovateur africain ? » ; footer.
À CONCEVOIR : état vide soigné (illustration légère SVG aux couleurs de la marque), CTA bien visible, responsive.
```

## 07 · SOUMETTRE — ÉTAPE 1 — id source `59f7f9d04b7043aea32e0c4b4477dff9`
```
PAGE : Soumettre mon innovation — Étape 1 sur 4 (informations personnelles).
À CONSERVER : titre « Soumettre mon innovation » ; indicateur d'étapes 1/4 ; titre « Étape 1 sur 4 : Vos informations personnelles » ; encart « Avant de commencer » (conseils d'éligibilité) ; champs (nom, prénom, email, téléphone, pays, organisation) ; boutons « Suivant » (or) et retour ; footer.
À CONCEVOIR : barre de progression responsive (compacte sur mobile), champs full-width sur mobile, messages d'aide sous les champs, CTA pleine largeur sur mobile, cibles ≥44px.
```

## 08 · SOUMETTRE — ÉTAPE 1 (ERREURS) — id source `767e2a254e6a4fad9ebcfcbec372a477`
```
PAGE : Soumettre mon innovation — Étape 1 sur 4, avec erreurs de validation.
À CONSERVER : mêmes éléments que l'Étape 1, MAIS les champs en erreur sont marqués (bordure rouge d'erreur, texte d'aide en erreur, icône) et un résumé d'erreurs est affiché en tête de formulaire.
À CONCEVOIR : l'erreur reste lisible sur mobile, ne dépend pas uniquement de la couleur (icône + texte), contraste AA, focus or conservé.
```

## 09 · SOUMETTRE — ÉTAPE 2 — id source `4625bba800a94b4baebcd7736c3530bd`
```
PAGE : Soumettre mon innovation — Étape 2 sur 4 (détails de l'innovation).
À CONSERVER : titre, indicateur d'étapes 2/4, titre « Étape 2 sur 4 : Détails de votre innovation », encart conseils, champs (titre du projet, catégorie, description, maturité, pays), téléversement de fichiers/images, boutons Précédent / Suivant, footer.
À CONCEVOIR : zone de dépôt de fichiers responsive, aperçu des images en grille 1→2→3, CTA pleine largeur mobile.
```

## 10 · SOUMETTRE — ÉTAPE 3 — id source `9a0f6b2dd13842f8bdc6f8cfdbdd8d02`
```
PAGE : Soumettre mon innovation — Étape 3 sur 4 (traction et financement).
À CONSERVER : titre, indicateur 3/4, titre « Étape 3 sur 4 : Traction et financement », encart « Conseils traction », champs (utilisateurs, revenus, financements déjà obtenus, besoins de financement), boutons Précédent / Suivant, footer.
À CONCEVOIR : champs numériques clairs, aide contextuelle, responsive.
```

## 11 · SOUMETTRE — ÉTAPE 4 — id source `5bbc1aa38b0f43d7a80dc87ada8da6d3`
```
PAGE : Soumettre mon innovation — Étape 4 sur 4 (médias et accord).
À CONSERVER : titre, indicateur 4/4, titre « Étape 4 sur 4 : Médias et accord », « Présence en ligne et réseaux sociaux », « Vérification finale avant envoi » (récapitulatif), case à cocher d'accord, bouton « Soumettre » (or), footer.
À CONCEVOIR : récapitulatif en cartes empilées sur mobile, CTA de soumission bien visible, responsive.
```

## 12 · SOUMETTRE — SUCCÈS — id source `b3fab9ca6d1d48a897bf038a0ed176b6`
```
PAGE : Soumettre mon innovation — confirmation de succès.
À CONSERVER : message « Merci ! Votre innovation a bien été soumise. », explications des prochaines étapes, CTA « Retour à l'accueil » / « Voir les innovations », footer.
À CONCEVOIR : page de confirmation avec icône de succès or/navy, layout centré responsive.
```

## 13 · RAJI MÉDIA — ACCUEIL — id source `1770f51adf78451e8d47b12eb50ea45b`
```
PAGE : RAJI Média (accueil éditorial).
À CONSERVER : titre « RAJI Média » ; article à la une « Comment l'intelligence artificielle frugale redéfinit le pré-diagnostic rural » ; section « Derniers articles & reportages » (Transformer les résidus agricoles en énergie propre…, Détecter le stress hydrique par drones solaires, Aïssata Traoré : pionnière de l'électrocardiogramme frugal, ColdChain Solaire, Immersion dans les ateliers d'éco-matériaux de Cotonou, Du prototype d'irrigation à 120 fermes connectées au Sahel, Bio-pesticides endogènes, Samuel Nguema et les bibliothèques numériques hors-ligne, AgroMicro Trust) ; section « Vous avez une innovation ou une histoire à partager ? » + CTA ; footer.
À CONCEVOIR : grille éditoriale 3→2→1, carte à la une mise en avant, responsive.
```

## 14 · RAJI MÉDIA — ARTICLE — id source `3f837a57d29f442e9a750738870bc080`
```
PAGE : RAJI Média — page article.
À CONSERVER : titre d'article « Transformer les résidus agricoles en énergie propre pour les zones rurales » (ou l'article ouvert), chapo, contenu, images, « De la paillasse de laboratoire à l'atelier d'assemblage local », bloc « Entretien vidéo avec l'équipe fondatrice », section « Articles et interviews recommandés » (ColdChain Solaire, Immersion dans les ateliers d'éco-matériaux de Cotonou, Aïssata Traoré), footer.
À CONCEVOIR : colonne de lecture confortable (max ~720px) sur desktop, pleine largeur sur mobile, images responsive, citations mises en forme, responsive.
```

## 15 · ÉVÉNEMENTS — LISTE — id source `9a192ca86d6f4222b212c113d741cd38`
```
PAGE : Événements RAJI — liste.
À CONSERVER : titre « Événements RAJI » ; événement à la une « RAJI Investor Day — Kigali 2026 » ; autres événements (Sommet Panafricain de l'IA, Session Démo Day Énergie Propre & Climat, Forum des Technologies Agricoles Durables, Carrefour des Jeunes Chercheurs & Brevets, Assises Africaines de la Cybersécurité Civile, Fintech Inclusion Forum West Africa, Foire Panafricaine de l'Équipement Médical, Salon des Matériaux Biosourcés, Pitch Marathon EdTech) avec date, lieu, image, bouton ; bandeau « Vous organisez un événement d'envergure en Afrique ? » ; footer.
À CONCEVOIR : filtres par date/type, cartes responsive 3→2→1, responsive.
```

## 16 · ÉVÉNEMENTS — DÉTAIL & INSCRIPTION — id source `2861e26055cb4fcb8c979b052468bc1f`
```
PAGE : Événement — détail & inscription.
À CONSERVER : titre « Forum Panafricain de l'Innovation Frugale et des Éco-Technologies » ; « Présentation générale & Enjeux » ; « Programme détaillé » (Cérémonie d'ouverture, Table ronde Frugalité technologique, Atelier micro-réseaux & IoT frugal, Session Pitch 20 finalistes, Démonstrations, Cocktail & Mentorat, B2B, Remise des Prix d'Excellence RAJI 2026, Manifeste de Yaoundé) ; « Galerie & Rétrospective des éditions précédentes » ; formulaire « Inscription à l'événement » ; footer.
À CONCEVOIR : colonne programme en timeline, encart d'inscription sticky sur desktop qui passe en bas sur mobile, responsive.
```

## 17 · PARTENAIRES — LISTE — id source `b0af0ee73ccd48fc9bc9abc28f1e11bc`
```
PAGE : Partenaires — liste.
À CONSERVER : titre « Nos Partenaires » ; catégories : Institutions & Ministères, Entreprises & Industries, Banques & Organismes Financiers, Universités & Centres de Recherche, Incubateurs & Accélérateurs, Médias partenaires (logos) ; « Modes d'intervention conjoints » (Validation Institutionnelle, Transfert & R&D Partagée, Visibilité & Diffusion Marché) ; bandeau « Vous souhaitez vous associer à l'émergence des talents africains ? » ; footer.
À CONCEVOIR : grilles de logos uniformes (fond blanc, bordure #E6E8EB), responsive 4→2→2.
```

## 18 · PARTENAIRES — DEVENIR PARTENAIRE — id source `c77c60a684a045ba99aaf51dee7b8782`
```
PAGE : Devenir partenaire du réseau RAJI.
À CONSERVER : titre « Devenir Partenaire du Réseau RAJI » ; « Pourquoi devenir partenaire ? » (Visibilité Panafricaine, Sourcing d'Innovations, Co-construction de Programmes, Réseau d'Experts) ; « Formulaire de demande de partenariat » (organisation, type de partenariat, contact, message) ; footer.
À CONCEVOIR : colonne argumentaire + formulaire en 2 colonnes sur desktop / 1 colonne sur mobile, CTA or, responsive.
```

## 19 · OPPORTUNITÉS — LISTE — id source `778593a28fa44edfbe278edae41c723e`
```
PAGE : Opportunités pour innovateurs — liste.
À CONSERVER : titre « Opportunités pour Innovateurs » ; cartes : Fonds d'amorçage AgriTech Sahel 2026, Grand Prix Panafricain de l'Éco-Innovation, Accélérateur HealthTech & Dispositifs Médicaux, Masterclass Prototypage Matériel & Énergie Frugale, Bourse de Mobilité Chercheur-Innovateur, Partenariat Déploiement Mini-Réseaux Ruraux (type, montant/dotation, échéance, CTA) ; bandeau « Vous proposez une opportunité pour les jeunes innovateurs ? » ; footer.
À CONCEVOIR : filtres par type, cartes responsive 3→2→1, badges d'échéance.
```

## 20 · OPPORTUNITÉS — DÉTAIL — id source `6ee550137c644b39988cea3e30ff3133`
```
PAGE : Opportunité — détail.
À CONSERVER : titre « Fonds d'amorçage AgriTech Sahel 2026 : Soutien au prototypage et à la validation terrain » ; « Présentation générale du programme » ; « Éligibilité & Critères de sélection » ; « Avantages accordés aux 12 lauréats » (Dotation matérielle & FabLab, Bancs de test d'irrigation, Mentorat & Coopératives, Rayonnement RAJI Média) ; « Calendrier & Dates clés » ; CTA « Prêt à soumettre votre dossier ? » ; footer.
À CONCEVOIR : colonne récapitulative sticky (échéance, montant, CTA) sur desktop, responsive.
```

## 21 · CONTACT — id source `02afbfe9afa94220b3802102c5044447`
```
PAGE : Contact.
À CONSERVER : titre « Contactez-nous » ; section « Envoyez-nous un message » (formulaire : nom, email, sujet, message) ; « Coordonnées officielles » (email contact@raji.africa, réseaux, adresse) ; carte/plan si présent ; footer.
À CONCEVOIR : 2 colonnes formulaire + coordonnées sur desktop, 1 colonne sur mobile, CTA or, messages d'erreur accessibles, responsive.
```

## 22 · ADMINISTRATION — TABLEAU DE BORD — id source `9c0f6899e4434f3486fb6b9a4f7534b8`
```
PAGE : Administration — tableau de bord général.
À CONSERVER : libellé « Console d'administration » ; titre « Tableau de bord général » ; cartes de métriques (KPI) ; « Évolution du trafic (30 derniers jours) » (courbe) ; « Provenance des visiteurs » ; « Pages les plus consultées » ; « Candidatures en attente de revue » (liste/tableau) ; footer.
À CONCEVOIR : barre latérale de navigation admin qui devient un menu hamburger/tiroir sur mobile, graphiques responsives (SVG, largeur fluide), tableaux avec défilement horizontal sur mobile, responsive.
```

## 23 · ADMINISTRATION — CANDIDATURES — id source `fadba3ee529f4a1392e78245c3b7c025`
```
PAGE : Administration — gestion des candidatures.
À CONSERVER : titre « Gestion des candidatures » ; filtres/statuts ; tableau des candidatures (nom, projet, pays, date, statut, actions) ; pagination ; footer.
À CONCEVOIR : tableau responsive (défilement horizontal ou cartes empilées sur mobile), badges de statut conformes au design system, responsive.
```

## 24 · APERÇU DESIGN SYSTEM — id source `7411548381e542658286d97a5bcc7fc1`
```
PAGE : Aperçu du Design System RAJI (documentation vivante).
À CONSERVER : titre « RAJI — Aujourd'hui innovateurs, demain bâtisseurs de l'Afrique » ; « Boutons & Actions » ; « Badges & Indicateurs » ; « Formulaires & Champs de Saisie » ; « Onglets & Métadonnées » ; « Cartes & Métriques d'Impact » ; « Spécifications des Composants » ; « Prêt pour le déploiement applicatif » ; footer.
À CONCEVOIR : présentation en sections/blocs documentaires, palette affichée (navy #071934, or #D3A940, #F3F4F5, #E6E8EB), échelle typographique Inter, exemples de composants dans tous leurs états, responsive.
```

## 25 · RAJI MATCH — id source `10701f779b154d16869bdcc1efffd1a7`
```
PAGE : RAJI Match — plateforme institutionnelle de matching d'investissement.
À CONSERVER : titre « RAJI Match : Connecter les innovateurs africains aux investisseurs et partenaires stratégiques » ; « Critères de ciblage & Matching d'investissement » ; entités (Fonds Panafricain Transition Énergie & Climat, West Africa Angel Syndicate (WAAS), Banque Régionale de Développement & d'Impact) ; « Protocole de Confidentialité et Protection de la Propriété Intellectuelle » ; CTA de mise en relation ; footer.
À CONCEVOIR : présentation institutionnelle sobre, cartes d'investisseurs 3→2→1, bloc protocole/confidentialité mis en avant, responsive.
```

---

## APRÈS GÉNÉRATION

- Convention de nommage souhaitée (si l'outil le permet) : `RAJI — <Page> (Responsive Multiplateforme)`.
- Envoie-moi ensuite la liste des nouveaux écrans : je les récupère via leurs `downloadUrl`, je télécharge les images en local, je remplace le logo par `assets_raji/image.png/screen.png`, puis je régénère `index.html` (section « Multiplateforme »).
