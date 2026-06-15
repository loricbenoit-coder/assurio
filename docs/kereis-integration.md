# Intégration Kereis — Cartographie du parcours FinanceConseil

Document de référence basé sur le parcours réel utilisé en interne (logiciel FinanceConseil / Kereis France).
Objectif : préparer l'automatisation (extraction de documents par IA + remplissage automatique de l'API Kereis).

## Étape 0 — Choix de l'offre (point d'entrée, le plus important)

Premier écran du parcours, 3 options possibles :

1. **Nouveaux prêts à assurer** — le client vient d'obtenir un prêt et veut l'assurer
2. **Changement d'assurance de prêt** — le client a déjà une assurance (souvent via sa banque) et veut la remplacer (loi Lemoine)
3. **Complément de quotité à un contrat ADE** — un contrat d'Assurance Décès Emprunteur existe déjà mais la quotité doit être complétée (ex: passage de 50% à 100% sur un emprunteur)

→ Le simulateur du site doit poser cette question **en tout premier**, avant toute extraction de document, car elle déclenche le parcours adapté.

## Vue d'ensemble des parcours

- **Nouveau prêt à assurer** : Coordonnées → Informations personnelles → Prêts → Prêteur → Simulations → Informations adhésion → Souscription → Analyse et décision
- **Changement d'assurance de prêt (loi Lemoine)** : idem + étape supplémentaire **Substitution** (entre "Informations adhésion" et "Souscription")
- **Complément de quotité à un contrat ADE** : parcours à documenter (non capturé pour l'instant)

## Sources de données

| Source | Documents fournis par le client |
|---|---|
| **CNI** (carte d'identité) | Identité, civilité, date/lieu/pays de naissance, nationalité, adresse (si à jour) |
| **Offre de prêt** | Montant, taux, durée, type de prêt, paliers, organisme prêteur/agence, objet du financement |
| **RIB** | IBAN |
| **Questionnaire en ligne** (saisie client, non extractible) | Profession, statut professionnel, habitudes de vie, fumeur, sports à risque, email/téléphone, coordonnées conseiller bancaire (si substitution) |

## Étape 1 — Coordonnées (extractible CNI)

Par assuré (1 et 2 si co-emprunteurs) :
- Civilité (Madame/Monsieur)
- Nom, Prénom
- Date de naissance
- Email *(saisie client)*
- Téléphone *(saisie client)*

## Étape 2 — Informations personnelles (questionnaire, non extractible)

Par assuré :
- Qualité (Emprunteur/Co-emprunteur)
- Pays + code postal de résidence fiscale *(CNI possible pour code postal)*
- Statut professionnel (liste déroulante)
- Profession à risque (oui/non)
- Profession (texte libre)
- Profession manuelle (oui/non)
- Travaux en hauteur (oui/non)
- Déplacements professionnels/an (< ou ≥ 20 000 km)
- Sports à risque (multi-select)
- Fumeur (oui/non)

## Étape 3 — Prêts (extractible offre de prêt)

Champs globaux :
- Date d'effet des garanties
- Objet du financement (résidence principale, etc.)

Par prêt :
- Nature de prêt (amortissable, etc.)
- Montant
- Taux
- Type de taux (fixe / variable)
- Type d'échéances (constantes...)
- Périodicité (mensuel)
- Durée du prêt (mois)
- Durée du différé d'amortissement (mois)

**Paliers** (sous-section du prêt, liste de lignes) :
- Durée (mois) + Montant (€) par palier — "+ Ajouter un palier"

## Étape 4 — Prêteur (extractible offre de prêt, en-tête)

- Organisme prêteur (banque)
- Agence : nom, domiciliation, code agence
- Adresse : n° et nom de rue, complément, localité/code postal

→ Nécessite recoupement avec la liste de référence des organismes Kereis.

## Étape 5 — Simulations (sortie API tarification)

Par assuré :
- Garanties (ex: Décès-PTIA-ITT/IPP/IPT), Quotité (%), Franchise (90j)
- Options (affections dorsales/psy, indemnisation forfaitaire)
- Éligibilité loi Lemoine (alerte si questionnaire de santé requis)

Liste de propositions (ex: 16 assureurs), par assureur :
- Coût total assurance, coût "8 premières années", total des cotisations
- Réduction couple (applicable/appliquée)
- Capital restant dû / initial
- Compatible banque (badge)
- Lien formalités médicales

→ C'est la sortie attendue pour le **comparateur de devis en temps réel** côté site.

Export possible par assuré : Devis assuré, Synthèse devis, Devoir de conseil, Détail de l'offre, Document d'information produit, Notice.

## Étape 6 — Informations adhésion (extractible CNI + RIB)

Par assuré :
- Nom de naissance, nationalité, pays/département/ville de naissance *(CNI)*
- Adresse postale actuelle (rue, complément, immeuble, état/région/commune, pays, ville) *(CNI/justificatif domicile)*
- "Adresse va-t-elle bientôt changer ?" (oui/non, déclaratif)
- IBAN *(RIB)*
- Checkbox certification identité (côté courtier, pas client)

## Étape 7 — Substitution (uniquement si changement d'assurance)

- Envoi automatique du courrier de substitution (oui/non, au nom de qui)
- Informations bancaires : référence prêt, coordonnées conseiller bancaire (prénom, nom, email, téléphone)
- Par assuré : contrat actuel souscrit auprès de — Banque / Assureur externe

## Étape 8 — Souscription (finalisation)

Confirmation : date d'effet, organisme prêteur
Par assuré :
- Support d'adhésion (Numérique/Papier)
- Email, Téléphone

## Étape 9 — Analyse et décision (suivi post-souscription)

- Prochaines étapes par catégorie (Adhésion / Substitution) : statut en cours/à venir (ex: "Attestation en attente de Kereis", "Échange avec l'organisme prêteur" + import de document)
- Récapitulatif de l'offre retenue : assureur, total des cotisations, détail par prêt (quotité, taux moyen, TAEA)
- Décision : Acceptée / Refusée / En attente
- Timeline horodatée du dossier (Initialisation, Simulation, Signature adhésion, Signature proposition, Attestation...) avec documents téléchargeables

→ Pertinent pour un futur **espace client de suivi de dossier** (phase 3, après extraction + tarification + souscription).

## Prochaines étapes

1. Obtenir de Kereis : doc technique API (champs exacts, formats, sandbox), conditions d'accès, délais
2. Pilote restreint : extraction CNI + offre de prêt simple (sans palier) → JSON structuré
3. Construire le questionnaire en ligne pour les données non extractibles (étape 2 + email/tel)
4. Mapper le JSON extrait + questionnaire vers le format API Kereis (étapes 1, 3, 4, 6)
5. Afficher le résultat de l'étape 5 (comparateur) sur le site
6. Phase 2 : souscription en ligne (étapes 7-8)
