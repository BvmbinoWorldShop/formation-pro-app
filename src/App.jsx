import { useState, useRef, useEffect } from "react";
import { Analytics } from "@vercel/analytics/react";
import { KB, detect, webSearch, LIBRARY, CATS, matchCat, ROADMAP_SECTIONS, QUICK } from "./data.js";


const ALL_FORMATIONS = [
  {id:"conflits",icon:"🤝",title:"Gestion des Conflits",subtitle:"Sensibilisation 3h",price:"1 200€ HT",color:"#C9A84C",cat:"standard",
   tagline:"Transformer les tensions en leviers de performance collective",
   public:"Managers, équipes RH, collaborateurs — tout secteur",
   legal:"Aucun agrément obligatoire. Certification RS possible pour CPF.",
   objectifs:["Identifier les 3 types de conflits en entreprise","Comprendre les 4 stades d'escalade d'un conflit","Maîtriser la méthode OSBD de la CNV","Adopter une posture assertive face aux tensions","Construire un plan d'action préventif personnel"],
   modules:[
      {
        num:"01",title:"Introduction — Le Conflit",duree:"20 min",
        contenu:"Tour de table interactif pour identifier les attentes. Définition claire : un conflit n'est pas un simple désaccord, c'est une opposition avec charge émotionnelle bloquante. Décodage des 3 types de conflits : interpersonnels (valeurs), structurels (rôles flous), et d'intérêts (ressources). Analyse des impacts financiers et psychologiques sur l'équipe. Auto-évaluation individuelle du profil face au conflit.",
        methode:"Brise-glace · Discussion guidée",
        guide:{
          accroche:"« Savez-vous qu'un manager passe en moyenne 3 heures par semaine à gérer des conflits ? C'est un mois entier par an parti en fumée. »",
          etudes:"CPP Global Human Capital Report : 85% des employés vivent des conflits, coûtant 359 milliards $ par an en heures perdues.",
          posture:"Ton assertif mais accueillant. Fais participer la salle tout de suite : « Qui a déjà repoussé une discussion difficile par peur de la réaction de l'autre ? » Garde une posture d'écoute active et de non-jugement absolue.",
          objections:"'Dans mon équipe il n'y a pas de conflits.' -> Réponse : 'Attention aux conflits larvés ou silencieux, ce sont souvent les plus destructeurs à long terme car ils tuent l'engagement sans faire de bruit.'"
        }
      },
      {
        num:"02",title:"Comprendre les Mécanismes",duree:"50 min",
        contenu:"Analyse des 4 stades de l'escalade conflictuelle (Friedrich Glasl) : du malaise à la destruction mutuelle. Identification des déclencheurs cognitifs : stress chronique, manque de reconnaissance, biais d'interprétation. Introduction approfondie à la Communication Non Violente (Marshall Rosenberg) et la matrice OSBD (Observation, Sentiment, Besoin, Demande). Décryptage des 3 réactions primitives de survie : Fuite (Flight), Attaque (Fight), et Paralysie (Freeze), pour ramener à l'Assertivité.",
        methode:"Apport théorique · Exemples concrets",
        guide:{
          accroche:"« Sous stress, notre cerveau reptilien prend le contrôle en 1/4 de seconde. La CNV, c'est le bouton pause pour ramener le cortex préfrontal dans la partie. »",
          etudes:"Daniel Goleman (Intelligence Émotionnelle) sur le 'détournement amygdalien'. Les travaux de Marshall Rosenberg prouvent que séparer l'observation de l'évaluation réduit la défensivité de 80%.",
          posture:"Sois posé et rassurant. Utilise le tableau blanc pour dessiner l'escalade de Glasl. Quand tu parles de la CNV, baisse le volume de ta voix pour instaurer un climat de réflexion profonde.",
          objections:"'La CNV c'est le monde des bisounours.' -> Réponse : 'C'est l'inverse. La CNV demande un courage énorme car elle force à dire la vérité nue sans accuser l'autre. C'est l'arme des négociateurs de crise.'"
        }
      },
      {
        num:"03",title:"Pratique — Outils Concrets",duree:"50 min",
        contenu:"Passage à l'action. Exercices de reformulation active (écoute empathique) en binôme rotatif en utilisant strictement la structure OSBD. Jeu de rôle A : Un manager recadre un collaborateur brillant mais toxique. Jeu de rôle B : Conflit de territoire entre deux collègues de même niveau. Utilisation de la 'Carte des émotions' pour aider à verbaliser les ressentis complexes. Phase de débriefing collectif pour ancrer les bonnes pratiques.",
        methode:"Jeux de rôle · Feedback croisé",
        guide:{
          accroche:"« Un outil n'a de valeur que s'il devient un réflexe sous la pression. On va transformer la théorie en mémoire musculaire. »",
          etudes:"L'ancrage mémoriel par la pratique active (Edgar Dale, Cone of Experience) augmente la rétention de l'information de 20% (lecture) à 75% (pratique).",
          posture:"Deviens un vrai coach sportif ! Circule beaucoup entre les groupes, corrige les postures physiques (bras croisés, regard fuyant). N'hésite pas à interrompre un jeu de rôle pour faire rejouer une scène bloquante.",
          objections:"'Je n'aime pas les jeux de rôle, c'est faux.' -> Réponse : 'Jouez le jeu à 50% si vous voulez, mais prêtez votre voix. C'est le seul moyen sûr de tester ces mots avant de les utiliser face à un vrai collègue en colère.'"
        }
      },
      {
        num:"04",title:"Études de Cas Réels",duree:"30 min",
        contenu:"Travail d'intelligence collective en sous-groupes (4/5 personnes) sur des dossiers réels anonymisés. Cas 1 : Le conflit silencieux et générationnel (rétention d'information). Cas 2 : L'explosion émotionnelle en réunion (agressivité ouverte). Les groupes doivent identifier : le stade du conflit, les erreurs de communication initiales, les besoins cachés des deux parties, et proposer un plan d'intervention en 3 étapes. Restitution croisée au paperboard.",
        methode:"Travail en sous-groupes · Discussion",
        guide:{
          accroche:"« L'empathie, c'est comme le muscle de la résolution de problèmes. Sur ces cas réels, vous êtes les chirurgiens de la relation. »",
          etudes:"Étude du Centre of Effective Dispute Resolution (CEDR) : l'intervention d'un tiers neutre (médiation) résout 80% des conflits en moins d'un jour.",
          posture:"Efface-toi. Laisse-les débattre et chercher. Interviens uniquement si un groupe s'enlise dans le jugement ('Il est juste con'). Recadre-les sur les Faits et Besoins objectifs.",
          objections:"'Dans le Cas 1, la direction devrait juste le virer.' -> Réponse : 'Le licenciement coûte entre 6 et 9 mois de salaire et ne règle pas la culture toxique. La médiation est toujours la 1ère étape logique.'"
        }
      },
      {
        num:"05",title:"Évaluation & Plan d'Action",duree:"30 min",
        contenu:"Validation des acquis via un Quiz QCM de 10 questions (score minimum requis : 7/10). Rédaction de la Fiche d'Engagement Individuel : chaque participant identifie 3 changements de comportement immédiats et 1 situation conflictuelle à désamorcer dans la semaine. Tour de table métaphorique de clôture ('Si cette formation était un mot...'). Remise des attestations de réussite et remplissage de la grille de satisfaction Qualiopi.",
        methode:"QCM · Fiche individuelle · Attestation",
        guide:{
          accroche:"« La véritable formation commence demain, à 9h00, lors de votre premier café avec l'équipe. »",
          etudes:"Les théories de l'engagement (Kiesler) prouvent que l'écriture manuscrite d'un plan d'action multiplie par 3 les chances de passage à l'acte réel post-formation.",
          posture:"Solennel et engageant. Assure-toi que les engagements pris sur la fiche sont précis et temporels (SMART). Félicite chaleureusement le groupe pour sa vulnérabilité tout au long de la session.",
          objections:"'Je n'ai pas le temps de remplir le questionnaire de satisfaction.' -> Réponse : 'Cela prend 2 minutes chrono et c'est une exigence légale indispensable pour valider définitivement vos acquis d'aujourd'hui.'"
        }
      },
    ],
   materiel:["Vidéoprojecteur","Paperboard","Fiches OSBD plastifiées","Roue des émotions","Scénarios jeux de rôle"],
   livrables:["Programme","Feuille d'émargement","Attestation","Questionnaire satisfaction","Fiche plan d'action"],
   tarifs:{"Groupe 8-12 pers.":"1 200€ HT","Journée complète":"2 400€ HT","Coaching individuel":"250€/h"},
   arguments:["Tous les managers en ont besoin — marché énorme","Aucun agrément → démarrer immédiatement","Facile à vendre aux DRH","Upsell : module 2 jours à 2400€"],
  },
  {id:"incendie",icon:"🔥",title:"Évacuation & Incendie",subtitle:"Sensibilisation 3h",price:"900€ HT",color:"#E05555",cat:"standard",
   tagline:"Préparer chaque salarié à agir vite et bien face au feu",
   public:"Tout salarié — obligatoire légalement dans toutes les entreprises",
   legal:"Art. R4227-38 Code du travail : exercice évacuation annuel obligatoire. Agrément CNPP ou SDIS recommandé pour manipulation extincteurs.",
   objectifs:["Connaître la réglementation incendie applicable","Comprendre les rôles de guide-file et serre-file","Coordonner une évacuation rapide et sécurisée","Utiliser correctement un extincteur","Identifier et signaler les risques incendie"],
   modules:[
      {
        num:"01",title:"Réglementation & Obligations",duree:"25 min",
        contenu:"Explication claire du cadre légal (Art. R4227-38 du Code du travail) : obligations de l'employeur concernant la formation incendie et l'exercice d'évacuation annuel. Définition des catégories d'Établissements Recevant du Public (ERP). Analyse détaillé d'un Plan de prévention incendie. Vue d'ensemble des sanctions pénales et financières en cas de manquement à la sécurité.",
        methode:"Présentation · Support visuel",
        guide:{
          accroche:"« Un employeur qui ne fait pas son exercice d'évacuation annuel risque jusqu'à 10 000€ d'amende et la prison en cas d'accident. La sécurité incendie n'est pas une option, c'est un bouclier légal. »",
          etudes:"Institut National de Recherche et de Sécurité (INRS) : 70% des entreprises touchées par un incendie majeur font faillite dans les mois qui suivent.",
          posture:"Solennel. C'est le module où tu dois faire comprendre la gravité pénale du sujet. Regarde les dirigeants ou managers dans les yeux quand tu parles de responsabilité.",
          objections:"'On n'a jamais eu de feu ici.' -> Réponse : 'C'est justement pour ça qu'on est là. Le jour où ça arrive, la panique multiplie le temps d'évacuation par 3 si le geste n'est pas automatique.'"
        }
      },
      {
        num:"02",title:"Rôles & Responsabilités",duree:"40 min",
        contenu:"Définition précise des acteurs de l'évacuation. Le Guide-file : rôle de leader, ouverture des issues, guidage du groupe vers le point de rassemblement sans retour en arrière. Le Serre-file : fermeture de la marche, vérification des zones isolées (toilettes, locaux techniques), fermeture des portes (ralentir le feu). L'Équipier de Première Intervention (EPI). Fonctionnement de la chaîne d'alerte interne et externe.",
        methode:"Présentation · Mise en situation verbale",
        guide:{
          accroche:"« Lors d'une évacuation, ce n'est pas le feu qui tue en premier, c'est le chaos. Le guide-file et le serre-file sont les bergers de l'entreprise. »",
          etudes:"Études des pompiers (FNSPF) : une organisation claire avec guide/serre-file divise le temps d'évacuation total par 2.",
          posture:"Très dynamique. Nomme des volontaires dans la salle ('Toi, tu es guide-file, que fais-tu ?'). Fais-les répondre à haute voix pour vérifier qu'ils ont compris leur position spatiale.",
          objections:"'Et si quelqu'un refuse de sortir ?' -> Réponse : 'On ne se bat pas. L'ordre est donné clairement, s'il refuse, le serre-file note son nom et son emplacement exact pour le donner aux pompiers.'"
        }
      },
      {
        num:"03",title:"Procédures d'Évacuation",duree:"35 min",
        contenu:"Savoir lire un plan d'évacuation rapidement. Repérage des issues de secours. Procédure de déclenchement d'alarme manuelle. Gestion spécifique des Personnes à Mobilité Réduite (PMR) et espaces d'attente sécurisés. Conduite de survie en cas d'enfumage : se baisser, longer les murs. Rappel strict des interdits : utiliser l'ascenseur, revenir chercher des affaires.",
        methode:"Exercice pratique sur plan · Simulation partielle",
        guide:{
          accroche:"« Une fumée toxique opacifie une pièce en moins de 3 minutes. À hauteur d'homme il fait 300°C, au sol il fait 30°C. Si ça fume, on rampe. »",
          etudes:"Données des sapeurs-pompiers : 80% des décès dans les incendies sont dus à l'intoxication par les fumées, bien avant les flammes.",
          posture:"Mime les gestes de survie (se baisser, toucher une porte avant de l'ouvrir). L'anecdote marque les esprits : raconte l'histoire d'une personne sauvée car elle est restée près du sol.",
          objections:"'Je dois absolument prendre mon ordinateur/sac.' -> Réponse : 'Rien de ce que vous avez dans vos tiroirs ne vaut votre vie. Une inspiration de fumée toxique suffit à vous faire perdre connaissance.'"
        }
      },
      {
        num:"04",title:"Manipulation des Extincteurs",duree:"30 min",
        contenu:"Le triangle du feu (combustible, comburant, énergie). Les classes de feu : A (solides), B (liquides), C (gaz), F (huiles). Choix du type d'extincteur : Eau pulvérisée avec additif, CO2, Poudre. Maîtrise de la technique PASS en 4 étapes : Pointer, Actionner, Balayer, Stopper. Les distances de sécurité à respecter selon l'extincteur et le type de feu.",
        methode:"Démonstration · Manipulation si extincteur dispo",
        guide:{
          accroche:"« Un extincteur vous donne exactement 15 secondes pour agir. Si vous vous trompez d'appareil, vous aggravez le feu. »",
          etudes:"Bilan INRS : un départ de feu maîtrisé avec le bon extincteur dans la première minute évite l'intervention des pompiers dans 90% des cas.",
          posture:"Très technique et précis. Utilise un extincteur de démonstration si possible. Fais répéter l'acronyme PASS à voix haute à tout le groupe.",
          objections:"'Je préfère appeler les pompiers direct.' -> Réponse : 'Les pompiers mettent en moyenne 10 à 15 minutes pour arriver. Un feu double de volume chaque minute. L'extincteur sert uniquement à éteindre le départ de feu pour fuir en sécurité.'"
        }
      },
      {
        num:"05",title:"Bilan & Plan d'Action",duree:"10 min",
        contenu:"Validation via Quiz de révision. Échange interactif sur les points d'amélioration repérés par les participants dans leurs propres locaux (ex: portes calées ouvertes). Élaboration d'un mini plan d'action correctif à remonter à la direction. Remise des attestations de formation incendie.",
        methode:"QCM · Débriefing · Attestation",
        guide:{
          accroche:"« Vous êtes maintenant les yeux de la sécurité dans ce bâtiment. Une porte coupe-feu calée avec une poubelle, c'est vous qui l'enlevez. »",
          etudes:"La prévention participative réduit de 40% les risques d'accidents domestiques et en entreprise en responsabilisant chaque individu.",
          posture:"Encourageant. Transforme-les en ambassadeurs de la sécurité. Finis sur une note très positive sur leur rôle de protection de leurs collègues.",
          objections:"'L'employeur ne fera jamais les travaux demandés.' -> Réponse : 'Votre seul travail est de signaler par écrit ce que vous voyez. Dès que c'est signalé, la responsabilité pénale du dirigeant est totalement engagée.'"
        }
      },
    ],
   materiel:["Extincteur de démonstration","Plans d'évacuation du site","Vidéoprojecteur","Signalétique de sécurité"],
   livrables:["Programme","Feuille d'émargement","Attestation","Questionnaire satisfaction","Fiche réflexe évacuation"],
   tarifs:{"Groupe 8-15 pers.":"900€ HT","Journée + extincteurs réels":"1 800€ HT","Renouvellement annuel":"600€ HT"},
   arguments:["Toutes les entreprises sont légalement obligées","Très facile à vendre : mise en conformité immédiate","Package possible : Incendie + SST = journée 2500€","Renouvellement annuel = client récurrent garanti"],
  },
  {id:"postures",icon:"🧘",title:"Gestes & Postures",subtitle:"Sensibilisation 3h",price:"900€ HT",color:"#4CAF82",cat:"standard",
   tagline:"Prévenir les TMS et réduire l'absentéisme dès aujourd'hui",
   public:"Logistique, BTP, santé, aide à domicile, bureaux — tout secteur avec effort physique",
   legal:"PRAP : certification INRS recommandée. Aucun agrément obligatoire pour sensibilisation.",
   objectifs:["Comprendre les mécanismes des TMS (Troubles Musculo-Squelettiques)","Identifier les postures et gestes à risque","Appliquer les principes d'économie articulaire","Maîtriser les techniques de manutention manuelle sécurisée","Proposer des améliorations ergonomiques concrètes"],
   modules:[
      {
        num:"01",title:"Introduction aux TMS",duree:"25 min",
        contenu:"Analyse des Troubles Musculo-Squelettiques : définition, chiffres clés (1ère cause de maladie pro en France). Identification des zones corporelles les plus touchées (lombaires, épaules, canal carpien). Décryptage des 3 facteurs de risques majeurs : Biomécaniques (gestes répétitifs, port de charges), Organisationnels (cadence, pauses), et Psychosociaux (stress). Calcul du coût réel pour l'entreprise (absentéisme, primes d'assurance).",
        methode:"Présentation · Auto-évaluation posture",
        guide:{
          accroche:"« Les TMS représentent 87% des maladies professionnelles en France. C'est une épidémie silencieuse qui coûte 2 milliards d'euros par an aux entreprises. »",
          etudes:"Données Assurance Maladie - Risques Professionnels : le coût moyen d'un TMS pour une entreprise est de 21 000€ (indemnités + remplacement).",
          posture:"Pédagogue et orienté chiffres (pour les managers) et santé (pour les salariés). Fais lever les mains : 'Qui a déjà eu mal au dos en fin de journée de travail ?'",
          objections:"'C'est normal d'avoir mal en vieillissant.' -> Réponse : 'Vieillir use, mais le travail mal fait casse. Les TMS sont de l'usure prématurée qui peut être évitée à quasi 100% avec les bonnes postures.'"
        }
      },
      {
        num:"02",title:"Anatomie & Biomécanique",duree:"35 min",
        contenu:"Vulgarisation du fonctionnement du corps humain. La colonne vertébrale : amortisseur en S, préservation des 3 courbures naturelles. La mécanique des disques intervertébraux. Loi des leviers : soulever 10kg dos rond exerce une pression de 250kg sur les lombaires. Compréhension de la fatigue musculaire, tendineuse et articulaire.",
        methode:"Schémas anatomiques illustrés",
        guide:{
          accroche:"« Votre colonne vertébrale est un mât de grue haubané. Si vous pliez la grue pour lever la charge, elle casse. »",
          etudes:"Études de biomécanique de Kapandji (physiologie articulaire) : la pression intradiscale est multipliée par 2 en position assise avachie par rapport à la position debout.",
          posture:"Très visuel. Mime les mauvaises postures (ex: dos rond, bras tendus) et exagère l'inconfort. Utilise un modèle de colonne vertébrale en plastique si tu en as un, c'est ultra efficace.",
          objections:"'L'ergonomie c'est fatiguant d'y penser.' -> Réponse : 'Les 3 premières semaines, oui. Mais on va transformer votre corps en reprogrammant vos réflexes moteurs. Après, ce sera purement automatique.'"
        }
      },
      {
        num:"03",title:"Techniques de Manutention",duree:"50 min",
        contenu:"Application stricte des principes de sécurité physique absolue (économie articulaire). Règle d'or : Dos droit / Fixer la colonne / Genoux fléchis / Charge près du corps. Décomposition du lever de charge complexe en 5 étapes. Techniques de transfert et de manutention en binôme. L'importance cruciale de l'utilisation prioritaire des aides techniques (transpalettes automatiques, chariots).",
        methode:"Démonstration · Pratique en binôme · Corrections",
        guide:{
          accroche:"« Un bon sportif ne soulève pas de poids avec son dos, il pousse le sol avec ses jambes. Vous allez travailler comme des athlètes. »",
          etudes:"Principes directeurs PRAP (Prévention des Risques liés à l'Activité Physique) par l'INRS : le travail des muscles jambiers (quadriceps) protège les lombaires à 100%.",
          posture:"Atelier purement sportif ! Mets la tenue appropriée, fais lever toute la salle, fais-les tous squatter, vérifie les placements de dos. Ne laisse passer aucune mauvaise courbure.",
          objections:"'Moi je préfère le faire à l'arrache, ça va plus vite.' -> Réponse : 'Gagner 5 secondes aujourd'hui pour perdre 6 mois de salaire l'année prochaine avec une hernie discale, est-ce vraiment rentable ?'"
        }
      },
      {
        num:"04",title:"Ergonomie du Poste",duree:"30 min",
        contenu:"Pour les postes administratifs : réglage du poste de travail avec la règle des angles à 90° (coudes, hanches, genoux). Positionnement de l'écran (bord supérieur hauteur des yeux). Pour les postes physiques : aménagement de la zone de prise et de dépose pour limiter l'amplitude articulaire. Intégraiton des micro-pauses actives (3 min d'étirements toutes les heures). Autodiagnostic du poste par chaque participant.",
        methode:"Audit express · Fiche d'amélioration individuelle",
        guide:{
          accroche:"« Le corps humain est fait pour bouger. La chaise est l'invention la plus dangereuse de l'histoire pour votre métabolisme. »",
          etudes:"Revue Lancet Public Health : la sédentarité au travail augmente de 30% les risques cardiovasculaires, compensables uniquement par des pauses actives régulières.",
          posture:"Consultant ergonome. Fais asseoir quelqu'un au bureau et règle son siège, son écran en dirigeant tout le monde. Montre 3 étirements simples (cervicales, épaules, poignets) réalisables discrètement.",
          objections:"'C'est l'employeur qui doit acheter du bon matériel.' -> Réponse : 'Un siège à 1000€ mal réglé vous détruira le dos autant qu'un tabouret. Commençons par savoir utiliser ce qu'on a, on fera les demandes d'achats après.'"
        }
      },
      {
        num:"05",title:"Engagement & Suivi",duree:"10 min",
        contenu:"Test de validation des acquis via QCM. Rédaction d'une fiche d'engagement personnel avec 3 corrections posturales à appliquer immédiatement de retour au poste de travail. Distribution d'un guide d'étirements offerts par le formateur. Clôture chaleureuse et remise des attestations de suivi.",
        methode:"QCM · Fiche d'engagement · Guide offert · Attestation",
        guide:{
          accroche:"« Demain, c'est à vous de jouer. La douleur n'est pas une fatalité, c'est un choix d'ignorer la biomécanique. »",
          etudes:"Psychologie du comportement de santé (Health Belief Model) : l'appropriation des pratiques santé augmente quand les barrières perçues sont levées par l'action immédiate.",
          posture:"Bienveillant et motivant. Rappelle-leur qu'ils ne font pas ça pour l'entreprise, mais pour pouvoir porter leurs enfants ou jouer au sport le week-end sans douleur.",
          objections:"'Je n'y arriverai pas tout seul.' -> Réponse : 'Faites-le en équipe ! Corrigez-vous mutuellement avec bienveillance. C\'est pour ça qu\'on s\'est formés ensemble aujourd\'hui.'"
        }
      },
    ],
   materiel:["Cartons de différents poids (5-15kg)","Espace dégagé pour pratique","Vidéoprojecteur","Fiches anatomiques","Bureau et chaise pour démo ergonomie"],
   livrables:["Programme","Feuille d'émargement","Attestation","Questionnaire satisfaction","Fiche auto-évaluation poste","Guide étirements A4"],
   tarifs:{"Groupe 8-15 pers.":"900€ HT","Formation PRAP complète":"2 000€ HT","Audit poste de travail":"600€"},
   arguments:["ROI prouvé : 1€ investi en prévention TMS = 2,20€ économisés (INRS)","TMS = 1ère cause de maladie pro → argument fort pour DRH","Upsell : formation PRAP certifiante à 2000€","Secteurs obligés : logistique, BTP, santé"],
  },
  {id:"sst",icon:"🧯",title:"SST — Premiers Secours",subtitle:"Formation initiale 14h (2 jours)",price:"1 500€ HT",color:"#4A7CFF",cat:"standard",
   tagline:"Former les acteurs de sécurité qui protègent vraiment leur équipe",
   public:"Tout salarié. 1 SST pour 10 salariés recommandé (INRS). Certification 24 mois.",
   legal:"Formation certifiante INRS/Croix-Rouge. Pour devenir formateur SST : agrément INRS obligatoire.",
   objectifs:["Maîtriser la conduite à tenir face à un accident du travail","Effectuer un bilan et alerter efficacement","Pratiquer les gestes de secours sur mannequin","Utiliser un défibrillateur automatisé (DAE)","Contribuer à la prévention des risques en entreprise"],
   modules:[
      {
        num:"01",title:"Le Sauveteur Secouriste",duree:"20 min",
        contenu:"Rôle exact et cadre juridique du SST. Explication de la chaîne des secours. Les 3 missions fondamentales (Protéger, Alerter, Secourir). Statistiques des accidents du travail spécifiques au secteur des participants (BTP, bureaux, logistique). Délimitation de la responsabilité civile et pénale du SST : l'obligation de moyens, pas de résultat.",
        methode:"Présentation · Vidéos choc INRS",
        guide:{
          accroche:"« Le Code pénal (Art. 223-6) punit de 5 ans de prison la non-assistance à personne en danger. Vous n'êtes pas des médecins, mais vous êtes le maillon qui fait la différence entre la vie et la mort les 5 premières minutes. »",
          etudes:"Assurance Maladie : 600 000 accidents du travail par an en France (environ 1 toutes les minutes). Avoir 10% d'effectif formé SST divise la mortalité par 4.",
          posture:"Grave et solennel. Regarde les gens dans les yeux : 'Si mon cœur s'arrête maintenant, qui dans cette salle sait quoi faire ?' (Généralement, silence). 'C'est pour ça qu'on est là.'",
          objections:"'J'ai peur de faire pire que mieux.' -> Réponse : 'Une personne en arrêt cardiaque est cliniquement morte. Vous ne pouvez pas faire pire que la mort. Vous ne pouvez qu'améliorer ses chances.'"
        }
      },
      {
        num:"02",title:"Protéger & Alerter",duree:"40 min",
        contenu:"Savoir examiner la situation sans se mettre en danger (sur-accident). Repérage visuel des dangers persistants : électricité, feu, gaz, machine tournante. Procédures pour supprimer ou isoler le danger, ou baliser la zone. L'Alerte parfaite : numéros (15, 18, 112, 114) et message standardisé (lieu exact, nature de l'accident, nombre de victimes, état apparent).",
        methode:"Exercice d'alerte téléphonique en binôme",
        guide:{
          accroche:"« Le sur-accident est le pire cauchemar des secours. Un héros mort ne sauve personne. Protégez-vous avant de protéger la victime. »",
          etudes:"Observatoire National du Secourisme : 15% des accidents graves en entreprise impliquent une deuxième victime (souvent un collègue qui a voulu aider sans réfléchir).",
          posture:"Dynamique. Simule un faux appel au SAMU avec un participant. Fais-lui rater l'appel (oubli de l'adresse exacte) pour montrer à quel point le stress fait perdre nos moyens cognitifs.",
          objections:"'Dans le stress je vais oublier les numéros.' -> Réponse : 'C'est pour cela qu'on retient un seul numéro maître aujourd'hui : le 112. Il marche partout en Europe, même sans carte SIM.'"
        }
      },
      {
        num:"03",title:"Secourir — Gestes Essentiels",duree:"90 min",
        contenu:"Bilan vital en 3 secondes : conscience, respiration, circulation. Pratique intensive : la Position Latérale de Sécurité (PLS) pour victime inconsciente qui respire. La Réanimation Cardio-Pulmonaire (RCP) pour victime qui ne respire plus (30 compressions, 2 insufflations à 100-120 bpm). Gestion des hémorragies (compression 10 min). Méthode de Heimlich (obstruction totale) et traitement des brûlures (règle des 15).",
        methode:"Démonstration · Entraînement mannequin",
        guide:{
          accroche:"« Pour un saignement artériel, une victime perd connaissance en 1 minute. Vous ne réfléchissez plus, vos mains agissent. On va reprogrammer votre mémoire musculaire. »",
          etudes:"Fédération Française de Cardiologie : chaque minute de perdue lors d'un arrêt cardiaque, c'est 10% de chances de survie en moins.",
          posture:"Ultra-physique. Mets-toi à genoux avec eux. Corrige violemment (mais avec le sourire) les bras pliés pendant le massage cardiaque. Fais mettre la musique 'Stayin' Alive' des Bee Gees (104 bpm) pour le rythme.",
          objections:"'Je n'oserai jamais le faire sur une femme (placer les mains).' -> Réponse : 'Le sternum est au milieu de la poitrine de tout être humain. La pudeur n'a pas sa place face à la mort.'"
        }
      },
      {
        num:"04",title:"Défibrillateur (DAE)",duree:"30 min",
        contenu:"Explication simplifiée de la fibrillation ventriculaire (pourquoi le cœur tremble). Repérage signalétique des DAE dans l'entreprise. Utilisation stricte pas-à-pas : allumer, écouter la voix, placer les électrodes (adulte/enfant), s'écarter pour l'analyse, choquer si demandé. Reprise immédiate du massage cardiaque après le choc.",
        methode:"Pratique DAE formation · Binômes",
        guide:{
          accroche:"« Cet appareil (le DAE) est plus intelligent que vous et moi réunis. Il est conçu pour qu'un enfant de 8 ans puisse s'en servir. »",
          etudes:"Étude New England Journal of Medicine : la survie passe de 5% (RCP seule) à 74% si un DAE est utilisé dans les 3 premières minutes.",
          posture:"Accompagnant. Laisse la machine vocale faire le travail pendant l'exercice. Crie bien fort 'Écartez-vous !' pendant le choc virtuel pour créer le réflexe sécuritaire chez tous les participants.",
          objections:"'Si je le choque et que je l'achève ?' -> Réponse : 'C'est médicalement et techniquement impossible. Le DAE ne déclenchera le choc QUE si le cœur est en fibrillation. Il a le dernier mot.'"
        }
      },
      {
        num:"05",title:"Prévention & Certification",duree:"20 min",
        contenu:"Le volet P (Prévention) du SST : repérage et signalement des situations dangereuses avant l'accident. Comprendre le Document Unique (DUERP) de l'entreprise. Évaluation pratique et théorique finale de chaque participant. Distribution des fiches réflexes urgence et remise du Certificat SST officiel (valable 24 mois).",
        methode:"QCM · Évaluation sur cas concret · Attestation",
        guide:{
          accroche:"« Le meilleur secouriste du monde, c'est celui qui n'a jamais à poser les mains sur quelqu'un car il a supprimé le danger avant. »",
          etudes:"INRS : les entreprises avec un réseau SST actif ont 20% d'accidents du travail en moins, grâce à la remontée d'informations préventives.",
          posture:"Félicitations chaleureuses. Remets les cartes SST avec solennité, comme un diplôme militaire. Rappelle l'importance légale du recyclage obligatoire (MAC SST) dans 2 ans.",
          objections:"'Personne ne lit le carnet de liaison sécurité de l'entreprise.' -> Réponse : 'Un email au CHSCT/CSE avec accusé de lecture engage pénalement l'entreprise à réagir.'"
        }
      },
    ],
   materiel:["Mannequin RCP adulte + enfant","DAE de formation","Trousse premiers secours","Matériel de balisage","Vidéoprojecteur"],
   livrables:["Programme","Feuille d'émargement","Certificat SST valable 24 mois","Questionnaire satisfaction","Fiche mémo gestes d'urgence"],
   tarifs:{"Groupe 8-12 pers. (2j)":"1 500€ HT","MAC SST recyclage (7h)":"700€ HT","Package Incendie + SST":"2 200€ HT"},
   arguments:["Obligation légale — toutes les entreprises","Recyclage obligatoire tous les 24 mois = client récurrent","Possible de devenir formateur SST agréé ensuite","Forte demande : BTP, logistique, santé, industrie"],
  },
  {id:"mindset",icon:"🧠",title:"Mindset de Champion",subtitle:"Performance mentale · 4h",price:"1 800€ HT groupe · 350€/h individuel",color:"#C9A84C",cat:"sport",
   tagline:"De la pensée limitante à la performance de haut niveau",
   public:"Sportifs haut niveau, équipes pro, académies, clubs Ligue 1 / Pro A",
   science:"Sources : Carol Dweck (Growth Mindset, Stanford 2006) · Csikszentmihalyi (Flow Theory) · NCAA Mental Health Study 2021 · Protocole USOC",
   objectifs:["Reprogrammer les croyances limitantes (neuroscience cognitivo-comportementale)","Maîtriser les outils de préparation mentale des équipes olympiques","Construire une routine pré-compétition individualisée","Gérer la pression, les échecs et les blessures avec résilience","Développer une identité d'athlète solide et durable"],
   modules:[
      {
        num:"01",title:"Le Cerveau de l'Athlète",duree:"45 min",
        contenu:"Introduction aux neurosciences appliquées au sport. Combat hormonal sous pression (Cortisol vs Dopamine). Le 'Hijack amygdalien' : quand le cerveau émotionnel bloque l'exécution motrice. Théorie de l'activation optimale (Loi de Yerkes-Dodson). Introduction scientifique à l'état de Flow (Mihaly Csikszentmihalyi). Auto-évaluation individuelle via le questionnaire standardisé AMS-3 (Athlete Mental Skills).",
        methode:"Présentation · Test profil mental",exemples:"Le 'Zone' de Kobe Bryant (81 pts) · Usain Bolt (détente pré-course)",
        guide:{
          accroche:"« À niveau technique égal, c'est le système nerveux qui gagne le match. Le talent vous amène sur le terrain, le cerveau vous fait gagner la finale. »",
          etudes:"Journal of Sports Sciences (2018) : Les capacités psychologiques prédisent 39% de la variance des performances Olympiques indépendantes du niveau physique.",
          posture:"Charismatique et intense. Parle de ton expérience dans le basket. Utilise des mots forts ('Système nerveux', 'Exécution chirurgicale'). Établis immédiatement ton autorité par ton parcours.",
          objections:"'Je n'ai pas besoin d'un psy, je suis un dur.' -> Réponse : 'La préparation mentale n'est pas de la psychothérapie pour malades. C'est de l'optimisation neurologique pour élites. Les Navy SEALs en font.'"
        }
      },
      {
        num:"02",title:"Reprogrammer ses Croyances",duree:"60 min",
        contenu:"L'opposition fondamentale entre Fixed Mindset (le talent est inné) et Growth Mindset (le cerveau est un muscle). Identification radicale des biais cognitifs et croyances limitantes ('Je ne suis pas clutch', 'Je suis fragile'). Initiation à la méthode de TCC (Thérapie Cognitivo-Comportementale) du reframing émotionnel. Ateliers d'affirmations identitaires (Déclarations en 'Je SUIS').",
        methode:"Exercice individuel · Partage · Coaching",exemples:"LeBron James : investit 1.5M$/an sur son corps ET son cerveau.",
        guide:{
          accroche:"« Si votre dialogue interne était diffusé dans les haut-parleurs du stade, seriez-vous fier ou honteux ? Vous parlez-vous comme un champion ou comme une victime ? »",
          etudes:"Études de Carol Dweck (Stanford 2006) : un Growth Mindset améliore la résilience à l'échec de 65% chez les athlètes espoirs.",
          posture:"Challenger. Baisse la voix, force-les à l'introspection. L'exercice du journal doit se faire dans un silence absolu. Va chercher les regards qui fuient.",
          objections:"'Si c'était si simple de changer de pensée, tout le monde serait champion.' -> Réponse : 'Ce n'est pas simple. La neuroplasticité demande la même répétition stupide et douloureuse que faire 1000 lancers francs.'"
        }
      },
      {
        num:"03",title:"Préparation Mentale Pratique",duree:"60 min",
        contenu:"Visualisation motrice : Protocole PETTLEP (Holmes & Collins) prouvant l'activation des mêmes réseaux neuronaux que l'action réelle. Respiration tactique 4-7-8 (cohérence cardiaque) pour purger le cortisol dans le vestiaire. Création étape par étape d'une routine pré-compétition inébranlable. Ancrage neuro-linguistique d'un état émotionnel positif (mot-déclencheur).",
        methode:"Pratique guidée · Visualisation collective",exemples:"Routines maladives de Rafael Nadal · Respiration Wim Hof de Novak Djokovic",
        guide:{
          accroche:"« Le cerveau ne fait aucune différence chimique entre une réalité vécue intensément et une réalité imaginée intensément. Utilisez ce hack. »",
          etudes:"Revue de littérature (Guillot & Collet 2008) : l'entraînement mental combiné à la pratique physique améliore l'exécution motrice de 23% vs la pratique physique seule.",
          posture:"Gourou tranquille. Fais fermer les yeux à toute la salle. Guide une visualisation de 3 minutes au rythme de ta voix. Crée un vrai moment de grâce.",
          objections:"'Je n'arrive pas à visualiser d'images.' -> Réponse : 'Pas grave. La visualisation intégrale inclut le ressenti des muscles, le son du ballon, l'odeur du vestiaire. Ressens-le au lieu de le voir.'"
        }
      },
      {
        num:"04",title:"Résilience & Gestion de l'Échec",duree:"45 min",
        contenu:"Déconstruction du mythe de la victoire continue. Les 3 'P' de Seligman face à un traumatisme (sportif, blessure) : Permanence, Pervasivité, Personnalisation. Création d'une stratégie de débriefing d'après-match saine (règle des 24h). Gestion psychologique des blessures longues (ACL/Croisés) : la courbe du deuil athlétique et l'isolement du banc de touche.",
        methode:"Études de cas · Plan de résilience personnel",exemples:"Derrick Rose (comeback mental) · Michael Jordan (les tirs ratés)",
        guide:{
          accroche:"« Michael Jordan a raté 9000 tirs et perdu 300 matchs. La seule différence entre une légende et un oublié, c'est la vitesse à laquelle ils recyclent l'échec. »",
          etudes:"American Psychological Association (2017) : les athlètes de haut-niveau ayant développé des stratégies actives d'adaptation (coping) ont des carrières 30% plus longues.",
          posture:"Empathique mais ferme. Partage tes propres échecs, tes propres blessures. Ne vend pas du rêve, parle de la dureté du traitement post-opératoire. C'est là que tu gagnes leur respect massif.",
          objections:"'Quand le coach me crie dessus, je sors de mon match.' -> Réponse : 'Sépare l'intention du volume sonore. S'il crie, c'est qu'il croit en toi. Prends l'information tactique, jette l'agressivité à la poubelle.'"
        }
      },
      {
        num:"05",title:"Plan Mental Personnalisé",duree:"30 min",
        contenu:"Synthèse opérationnelle. Remplissage du 'Mental Performance Plan' (Standard NBA). Choix de 3 micro-habitudes (Atomic Habits) à intégrer dans la semaine d'entraînement en cours. Fourniture d'une bibliographie premium et de podcasts (Hidden Brain, Finding Mastery). Clôture inspirationnelle.",
        methode:"Coaching express · Fiche MPP · Attestation",exemples:"Framework de performance du Comité Olympique US",
        guide:{
          accroche:"« La motivation est une émotion, elle dure 24h. La discipline est un système, elle gagne des championnats. Voici votre système. »",
          etudes:"Journal of Applied Sport Psychology : l'engagement dans une routine mentale quantifiée double l'adhésion au programme sur 6 mois.",
          posture:"Le coach qui prépare pour la finale. Regarde-les avec fierté. Rappelle-leur qu'ils font partie de l'infime 1% qui investit sur leur cerveau.",
          objections:"'Je n'aurai pas le temps de faire tout ça.' -> Réponse : 'La respiration prend 3 minutes. La visualisation prend 2 minutes dans le bus. Si tu n'as pas 5 minutes pour ta carrière, tu n'as pas de carrière.'"
        }
      },
    ],
   materiel:["Vidéoprojecteur","Fiches 'Mental Performance Plan'","Tableau mind mapping","Musique de fond"],
   livrables:["Programme","Feuille d'émargement","Attestation","Fiche 'Mon Plan Mental'","Bibliothèque de ressources"],
   tarifs:{"Groupe 8-15 pers.":"1 800€ HT","Coaching individuel":"350€/h","Package saison (mensuel)":"800€/mois"},
   arguments:["35% des athlètes élites ont vécu anxiété/dépression (NCAA 2021)","Clubs NBA investissent 500K$/an en préparation mentale","AFDAS finance pour clubs pro du secteur sport — 0€ pour eux","Marché : clubs pro, académies, lycées sportifs, fédérations"],
  },
  {id:"depression",icon:"🌱",title:"Addiction et Dépression du Champion",subtitle:"Santé mentale athlète · 3h",price:"2 000€ HT groupe · 450€/h individuel",color:"#4CAF82",cat:"sport",
   tagline:"Sortir de l'ombre des projecteurs : drogues, addictions et santé mentale",
   public:"Athlètes pro, anciens sportifs en reconversion, staffs médicaux sportifs",
   science:"Sources : NCAA Study 2021 · British J Sports Med 2019 (Reardon & Factor) · IOC Consensus Statement 2019 · Protocoles NBA Mind Matters · Programme FIFPRO Player Care",
   objectifs:["Comprendre la dépression et les mécanismes addictifs (substances, antidouleurs) chez l'athlète","Briser la culture du silence dans le sport de haut niveau","Identifier les signaux d'alerte en soi et chez ses coéquipiers (consommation, isolement)","Connaître les ressources et outils de soutien disponibles","Construire un filet de sécurité émotionnel dans son équipe"],
   modules:[
     {
       num:"01",title:"La Face Cachée du Champion",duree:"40 min",
       contenu:"Levée du tabou sur la santé mentale dans le sport de très haut niveau. Analyse de la culture toxique du 'Play through the pain' et le recours banalisé aux antidouleurs (opioïdes) et aux somnifères. Décryptage de l'identité de rôle précaire : 'Je vaux ce que vaut mon dernier match'. Séparation clinique entre le coping (faire face) par la drogue/alcool, le burn-out, et la dépression clinique. Étude de cas sur les paradis artificiels dans le sport.",
       methode:"Vidéos témoignages · Espace de parole sécurisé",exemples:"Kevin Love (Players Tribune) · L'épidémie silencieuse des opioïdes (Antidouleurs) · Simone Biles",
       guide:{
         accroche:"« Le sport de haut niveau est le seul métier où accepter de détruire son corps à l'aide d'antidouleurs est vu comme un acte d'héroïsme plutôt que comme une urgence médicale. »",
         etudes:"Méta-analyse du British Journal of Sports Medicine (2019) : 34% des athlètes d'élite actifs souffrent d'anxiété ou de dépression, et l'abus d'alcool/substances est le premier moyen d'automédication silencieuse.",
         posture:"Très vulnérable et sécurisant. Partage une expérience où tu as vu des coéquipiers (ou toi-même) avaler des pilules ou se réfugier dans l'alcool pour gérer la pression d'un match raté. C'est l'identification à ton propre vécu ('J'y étais, j'ai vu') qui leur donnera le droit de parler.",
         objections:"'Prendre des cachets, ça fait partie du job.' -> Réponse : 'Soigner une inflammation temporaire, oui. Mais avaler 4 pilules pour pouvoir simplement dormir parce que ton cerveau tourne à 1000 à l'heure, c'est le début d'une addiction.'"
       }
     },
     {
       num:"02",title:"Neurobiologie de la Dépendance et Facteurs de Risque",duree:"45 min",
       contenu:"Exploration de la neurobiologie : comment le surentraînement vide la dopamine, poussant le cerveau à chercher des substituts chimiques (drogues récréatives, alcool). Les 3 facteurs de bascule vers l'addiction : 1) La blessure longue durée (perte de statut + exposition aux opioïdes), 2) La transition de fin de carrière (remplacer l'adrénaline des matchs), 3) La surpression médiatique. Comprendre le crash dopaminergique post-match.",
       methode:"Apport théorique illustré · Auto-évaluation des risques",exemples:"André Agassi (Autobiographie 'Open' et la crystal meth) · Lamar Odom",
       guide:{
         accroche:"« Un match devant 10 000 personnes libère plus de dopamine qu'une dose de cocaïne. Quand le buzzer final retentit, le cerveau est en manque immédiat. C'est là que le danger commence. »",
         etudes:"Étude Universitaire de Washington : Les athlètes masculins subissant une blessure sévère ont 4 fois plus de risques de développer une dépendance aux substances (analgésiques ou alcool) dans l'année qui suit.",
         posture:"Expert neurobiologiste compréhensible. Explique que l'addiction est une tentative désespérée du cerveau pour réparer une douleur chimique, pas un manque de volonté. Dédramatise tout en choquant avec la science.",
         objections:"'Moi je contrôle, c'est juste festif.' -> Réponse : 'Toutes les addictions mortelles ont commencé de façon festive. Le piège dans le sport, c'est qu'on a un corps incroyablement résistant qui nous fait croire qu'on contrôle la toxicité de ce qu'on avale.'"
       }
     },
     {
       num:"03",title:"Sortir de l'Ombre : Outils de Survie et Sevrage",duree:"50 min",
       contenu:"Cartographie des thérapies validées pour les athlètes : TCC (restructuration cognitive), EMDR (traumas). Substitution de l'adrénaline toxique : Création d'une routine 'Sanctuaire'. Rôle massif du sommeil naturel (sans chimie) pour purger les récepteurs liés à l'addiction. Introduction à la méditation de pleine conscience, méthode scientifiquement validée pour réduire le craving (l'envie irrépressible de consommer).",
       methode:"Atelier pratique · Respiration · Carte du soutien",exemples:"Le Programme de réhabilitation 'Player Care' de la FIFPRO",
       guide:{
         accroche:"« Vous ne pouvez pas battre une addiction chimique ou la dépression par pure volonté. Pas plus que vous ne pouvez soigner une fracture ouverte en serrant les dents. Il faut des outils professionnels. »",
         etudes:"Recherche clinique : 60 jours de pratique régulière de la méditation sportive de pleine conscience réduisent de 40% l'activation de l'amygdale (la zone du stress paranoïaque et des envies addictives).",
         posture:"Proactif et apaisant. Fais pratiquer la routine de cohérence cardiaque (5 sec inspiration, 5 sec expiration) pendant 3 vraies minutes dans le silence total de la salle. Montre qu'on peut s'apaiser sans pilule.",
         objections:"'Les psys c'est pour ceux qui sont fous.' -> Réponse : 'Un psychologue spécialisé en addictologie sportive, c'est le préparateur physique de ta santé mentale. Il renforce ce qui est tordu pour que tu marches droit.'"
       }
     },
     {
       num:"04",title:"Aider Sans Remplacer le Spécialiste",duree:"30 min",
       contenu:"Former les participants (capitaines, coachs) à la détection de la détresse silencieuse (isolement, retards à l'entraînement, odeurs, pupilles, insomnie, dettes de jeu, alcool). Pratique de l'écoute active ('Je suis là, J'écoute, Je ne juge pas'). Limite de l'approche 'Vestiaire' : savoir à quel moment exact il faut alerter anonymement une cellule psychologique ou addictologique externe. Création du réseau d'urgence.",
       methode:"Jeux de rôle de détection · Guide du bon soutien",exemples:"Protocoles d'intervention du réseau Players Association (PA)",
       guide:{
         accroche:"« En tant que coach ou coéquipier, vous n'êtes pas des médecins. Vous êtes le système d'alerte précoce de l'équipe. N'essayez pas de désintoxiquer un joueur, envoyez-le aux pros. »",
         etudes:"Programme 'Mental Health First Aid' : l'intervention bienveillante d'un pair (non-jugeant) augmente de 60% la probabilité que l'athlète accepte d'entrer en thérapie (Rehab).",
         posture:"Très opérationnel. Jeu de rôle clinique : comment aborder un coéquipier qui sent l'alcool au shooting du matin ou qui tremble à cause des antalgiques potentiellement.",
         objections:"'Si je le dis au staff, je suis une balance.' -> Réponse : 'Si tu le caches, tu es un complice de son auto-destruction. Protéger sa santé prévaut toujours sur le silence du vestiaire.'"
       }
     },
     {
       num:"05",title:"Ma Boussole de Vie",duree:"15 min",
       contenu:"Atelier d'élargissement identitaire. Le sport n'est que ce que l'on FAIT. Remplissage de la matrice 'Boussole de Vie' (Relations non-sportives, Projets, Famille, Santé mentale propre). Engagement pour 1 action de santé et d'hygiène de vie cette semaine. Remise du livret de ressources d'urgence confidentielles (numéros verts, addictologues sportifs, psychologues spécialisés).",
       methode:"Fiche 'Boussole de Vie' · Coaching collectif",
       guide:{
         accroche:"« Quand les projecteurs s'éteindront définitivement, il ne restera que ce que vous êtes humainement. Ne laissez pas les substances écrire ce dernier chapitre. »",
         etudes:"Modèle de Brewer : une identité sportive exclusive est le terreau numéro 1 de la dépression sévère en fin de carrière si elle s'arrête brusquement sans autre projet de vie.",
         posture:"Introspectif et paternel/maternel. Laisse-leur le temps de remplir leur fiche en silence. Ton expérience de haut niveau résonne ici : tu as survécu intact à ce milieu hostile. C'est le message d'espoir final.",
         objections:"'Moi je n'ai que le sport dans ma vie.' -> Réponse : 'C'est un risque massif. On va commencer à cultiver d'autres jardins pour amortir le choc quand la compétition s'arrêtera.'"
       }
     },
   ],
   materiel:["Salle confidentielle et confortable","Fiches 'Ma Boussole de Vie'","Liste de ressources addictologie et santé mentale","Post-its"],
   livrables:["Programme","Feuille d'émargement","Attestation","Guide d'urgence anti-addiction et dépression","Fiche 'Mon Plan de Vie'"],
   tarifs:{"Groupe 8-15 pers.":"2 000€ HT","Coaching individuel":"450€/h","Package staff médical":"1 200€/session"},
   arguments:["Thématique urgente et d'actualité dans tous les sports pros (opioïdes, alcool)","Aucun concurrent sur ce créneau couplant dépression/addiction dans le basket","AFDAS finance pour clubs pro","Légitimité totale : tu connais l'envers du décor du monde pro"],
  },
  {id:"vitalism",icon:"⚡",title:"Vie Saine Après la Performance",subtitle:"Reconversion & équilibre · 3h",price:"1 500€ HT groupe · 300€/h individuel",color:"#4A7CFF",cat:"sport",
   tagline:"Reconstruire une vie épanouissante après le sport d'élite",
   public:"Sportifs en reconversion, fin de carrière, clubs accompagnant leurs joueurs",
   science:"Sources : Lavallee (2005) sur la retraite sportive · Schlossberg Transition Model · Programme NFL Legends · NBA Alumni Transition Program",
   objectifs:["Réussir la transition identitaire : de l'athlète à l'être humain complet","Construire des routines saines sans le cadre du sport pro","Gérer nutrition, sommeil et activité physique hors compétition","Explorer ses compétences transférables et nouvelles voies","Créer un projet de vie concret et motivant post-carrière"],
   modules:[
     {
       num:"01",title:"Qui Suis-Je Sans le Sport ?",duree:"35 min",
       contenu:"Explication du Modèle de Schlossberg (Système des 4S de la transition : Situation, Soi, Soutien, Stratégies). Cartographie des 5 deuils inévitables de l'arrêt : perte d'identité publique, perte de la routine millimétrée, perte du statut financier, perte de la 'tribu' (le vestiaire), et changement du corps. Traduction des 'Soft Skills' sportives (discipline, résilience sous pression, éthique de travail) en vocabulaire d'entreprise (gestion de crise, leadership).",
       methode:"Exercice de la roue de la vie",exemples:"Tony Parker (entrepreneur) · Magic Johnson (holding multimillionnaire)",
       guide:{
         accroche:"« Vous avez passé 15 ans à affûter votre corps et votre mental pour être dans le top 1% mondial de votre discipline. Croyez-vous vraiment que vous allez devenir moyen dans la vraie vie ? »",
         etudes:"Revue 'Psychology of Sport and Exercise' : Les athlètes ayant préparé leur transition 1 an avant l'arrêt ont 70% de chances en moins de développer des addictions post-carrière.",
         posture:"Inspirant et rassurant. Fais-leur écrire sur un tableau toutes les compétences bizarres du sport (ex: supporter un coach tyrannique) pour les traduire en compétences Corporate (ex: intelligence émotionnelle sous management toxique).",
         objections:"'Je n'ai pas de diplôme, je ne sais rien faire d'autre.' -> Réponse : 'Un diplôme valide la capacité d'étudier 5 ans assis. Tu as validé la capacité de performer 15 ans sous une pression que 99% des diplômés ne supporteraient pas 5 minutes.'"
       }
     },
     {
       num:"02",title:"Le Corps Après la Performance",duree:"40 min",
       contenu:"La désintoxication des endorphines et du cortisol. Le crash métabolique : comment adapter sa nutrition de 4000 kcal/jour à un métabolisme de sédentaire sans prendre 20kg. Mettre fin à la culture de la 'punition corporelle' : redécouvrir le sport-plaisir vs le sport-performance. La crise de l'insomnie post-carrière (recalibrage du rythme circadien). La fenêtre de vulnérabilité aux addictions (alcool, jeux) pour compenser le manque d'adrénaline spectaculaire.",
       methode:"Apport expert · Autotest sommeil",exemples:"Programme NFL Legends · NBA Alumni Program",
       guide:{
         accroche:"« À l'instant où votre contrat se termine, votre corps arrête d'être une machine de guerre et redevient un temple. Il faut changer de carburant et de manuel d'entretien. »",
         etudes:"Étude sur les anciens joueurs NFL : près de 40% déclarent un gain de poids sévère dans la première année, entraînant des problèmes mécaniques sur des articulations déjà usées.",
         posture:"Pédagogue et avertisseur. Très peu de sportifs sont prêts au changement radical de physique. Sois déculpabilisant : le corps d'un retraité sportif ne peut pas ressembler à celui d'un actif. C'est physiologique.",
         objections:"'Je vais continuer à m'entraîner tous les jours.' -> Réponse : 'Ton corps ne l'acceptera plus parce que l'objectif et la structure ne sont plus là. Le but n'est plus la performance, le but est désormais la longévité sans douleur.'"
       }
     },
     {
       num:"03",title:"Reconstruire son Quotidien",duree:"45 min",
       contenu:"Le drame de l'agenda vide. Comment structurer les 16 heures d'éveil sans les convocations du coach. Implémenter une routine matinale d'ancrage. La reconstruction du réseau social (aller chercher des amis en dehors de la bulle sportive). Le choc de la gestion financière (financement des rentrées fixes vs salaires massifs et courts). Élaboration du plan 'Les 90 premiers jours de la nouvelle vie'.",
       methode:"Horloge visuelle · Tableau de vie",
       guide:{
         accroche:"« Mercredi matin, 9h00. Avant, vous étiez à la vidéo ou sur le terrain. Demain, vous serez sur votre canapé. Que faites-vous à 9h05 ? C'est ce vide qu'il faut remplir. »",
         etudes:"Projet de recherche Global Athlete : Le vide structurel est la première cause de rechute psychologique dans les 6 mois de la retraite sportive.",
         posture:"Très concret, presque militaire. Donne-leur des outils d'agenda (Google Calendar, Notion) pour qu'ils créent eux-mêmes les 'entraînements' de leur vie civile (rdv banque, apprentissage).",
         objections:"'Je n'ai pas envie d'avoir de routine, j'ai envie de profiter.' -> Réponse : 'Profiter sans structure, ça s'appelle des vacances. Des vacances qui durent plus de 2 mois, ça s'appelle la déprime. L'humain a besoin de but.'"
       }
     },
     {
       num:"04",title:"Explorer ses Nouvelles Voies",duree:"30 min",
       contenu:"Panorama des reconversions réussies et des pièges classiques (le restaurant avec les amis qui fait faillite). Les formations courtes et diplômantes (Agent, Coach mental, Consultant TV, Immobilier). L'entrepreneuriat (apprendre à déléguer l'hyper-contrôle). Création fondamentale de son Personal Branding (profil LinkedIn professionnel de Haut Niveau, prise de parole en public).",
       methode:"Bilan compétences express",
       guide:{
         accroche:"« Vous avez passé 15 ans à construire la marque de votre club. Il est temps d'investir 100% de cette énergie pour construire la marque YOU, Inc. »",
         etudes:"Rapport syndical : l'investissement dans une franchise 'coup de cœur' sans formation business est la principale cause de ruine des athlètes dans les 5 années post-carrière.",
         posture:"Coach business. Fais-leur ouvrir l'application LinkedIn en direct. Montre-leur que d'écrire 'Ancien Basketteur Pro' est infiniment plus puissant que 80% des CV en entreprise s'il savent le vendre.",
         objections:"'Je ne sais pas écrire un CV.' -> Réponse : 'Ton CV c'est ton histoire. La résilience, l'adaptation culturelle (si contrats à l'étranger), le leadership d'équipe. On va l'écrire ensemble ce matin.'"
       }
     },
     {
       num:"05",title:"Mon Plan 90 Jours",duree:"30 min",
       contenu:"Planification chirurgicale. Rédaction individuelle de la charte d'action ('Plan 90 Jours'). Sélection obligatoire de 3 actions immédiates pour la semaine 1 (ex: prendre un rdv bilan financier, appeler un ancien joueur reconverti). Fixation de 3 objectifs mesurables et précis à 30 jours. Distribution de la bibliographie Reconversions. Clôture de l'atelier.",
       methode:"Fiche 'Plan 90 jours' · Engagement public",exemples:"Framework de transition des vétérans militaires",
       guide:{
         accroche:"« La transition ne se fera pas seule quand vous rangerez vos affaires de sport. Elle commence ce matin, en signant ce papier. »",
         etudes:"Harvard Business Review : la formulation d'intentions de mise en œuvre (Implementation Intentions) du type 'si-alors' augmente de 300% le taux d'exécution des objectifs complexes.",
         posture:"Ferme et engagé. Fais-leur lire à voix haute, devant les autres, l'action numéro 1 qu'ils feront lundi matin. L'engagement public scelle le contrat.",
         objections:"'Et si je me trompe de voie ?' -> Réponse : 'Tu te tromperas de voie. C'est statisticiennement impossible de trouver directement. L'objectif n'est pas d'avoir raison du premier coup, c'est de se mettre en mouvement.'"
       }
     },
   ],
   materiel:["Fiches 'Roue de la Vie'","Fiches 'Plan 90 jours'","Post-its","Tableau blanc"],
   livrables:["Programme","Feuille d'émargement","Attestation","Fiche Plan 90 jours","Guide ressources reconversion"],
   tarifs:{"Groupe 8-15 pers.":"1 500€ HT","Coaching individuel":"300€/h","Programme reconversion complet":"3 500€"},
   arguments:["FIFPRO oblige les clubs à accompagner leurs joueurs","AFDAS finance pour le secteur sport","Créneau unique : formation + coaching + santé mentale","Possibilité de créer un programme certifiant complet"],
  },
  {id:"elite360",icon:"🏆",title:"ELITE 360° — Performance Totale",subtitle:"Formation complète · 2 jours (14h)",price:"4 500€ HT groupe · 500€/h coaching",color:"#FFD700",cat:"sport",
   tagline:"Le programme tout-en-un pour performer au plus haut niveau et durer",
   public:"Équipes professionnelles, sélections nationales, académies élites, athlètes olympiques",
   science:"Sources : IOC Consensus Statement on Mental Health 2019 · Nixdorf et al. 2013 (15% athlètes élites → dépression) · USOC Mental Health Protocol · Meta-analyse Gardner & Moore 2006 (mindfulness en sport) · APA Guidelines for Sport Psychology",
   objectifs:["Construire une identité d'athlète robuste et multidimensionnelle","Maîtriser l'ensemble des outils de performance mentale des équipes olympiques","Prévenir la dépression sportive et les crises de santé mentale","Développer des capacités de résilience extraordinaires","Créer une culture d'équipe orientée bien-être ET performance","Préparer sa reconversion avec sérénité"],
   modules:[
     {
       num:"J1A",title:"JOUR 1 Matin — Architectures Cérébrales",duree:"3h",
       contenu:"Fusion des neurosciences (Cortisol vs Dopamine) et de la théorie de l'état de 'Flow'. Passation du diagnostic Mental Profiling (AMS-3). Déconstruction violente des croyances limitantes du vestiaire. Ateliers intenses de reframing cognitif (TCC). Implémentation de la respiration tactique des forces spéciales (Box Breathing). Création microscopique du protocole individuel de visualisation d'avant-match.",
       methode:"Tests psycores · Visualisation yeux fermés",exemples:"Modèle de préparation mentale des Navy SEALs et de la Team USA",
       guide:{
         accroche:"« Ne vous trompez pas. Ce qu'on va faire pendant 48 heures n'est pas de la motivation. La motivation, c'est pour les amateurs. On va faire de l'ingénierie neurologique. »",
         etudes:"Méta-analyse Gardner & Moore (2006) validant les protocoles MAC (Mindfulness-Acceptance-Commitment) pour l'augmentation massive de la concentration (focus) sous pression extrême.",
         posture:"Très haut niveau d'exigence (Coach de l'élite). Rythme soutenu, pas de temps morts. Ne tolère aucune inattention. Tu es là pour sculpter des machines à performer. Les pauses sont des récompenses.",
         objections:"'Ça fait beaucoup d'informations d'un coup.' -> Réponse : 'C'est l'équivalent de 10 ans d'essais-erreurs condensés en une matinée. Votre cerveau brûle des calories, c'est le signe que vous apprenez vraiment.'"
       }
     },
     {
       num:"J1B",title:"JOUR 1 Après-midi — Déverrouiller la Santé Mentale",duree:"2h",
       contenu:"Briser l'omerta dans le vestiaire pro. Chiffres chocs de la NCAA et du CIO. Confrontation avec le 'Mythe du Gladiateur' qui détruit des carrières. Identification viscérale de la différence entre fatigue, burn-out neurobiologique et dépression clinique. Charte du coéquipier sauveur : Savoir détecter un partenaire qui sombre dans l'isolement et intervenir sans agir comme un psy.",
       methode:"Travail de groupe sans filtre",exemples:"Le témoignage-choc de Kevin Love / Les alertes de Ricky Rubio",
       guide:{
         accroche:"« Le paradoxe du sport de haut niveau : on vous apprend à ignorer la douleur physique, et du coup vous ignorez les fractures de votre cerveau jusqu'à l'effondrement. »",
         etudes:"Consensus IOC 2019 : L'intervention par les pairs dans dans une équipe solidaire réduit de moitié le temps moyen de souffrance isolée avant une prise en charge médicale.",
         posture:"Protecteur et direct. Tu descends d'un ton, la voix s'adoucit, le rythme ralentit. L'après-midi, on est dans la survie de l'homme sous le maillot. Tu crées une 'Safe Zone' totale.",
         objections:"'Dans l'équipe, on ne parle pas de ça, ça casse le moral.' -> Réponse : 'C'est cette culture toxique du silence qui tue vos coéquipiers. Un vrai leader d'équipe soutient son meneur autant dans la souffrance que dans la victoire.'"
       }
     },
     {
       num:"J2A",title:"JOUR 2 Matin — Masterclass Résilience & Blessure",duree:"3h",
       contenu:"Ingénierie de la résilience. Reframing post-échec (règle des 24h). Gestion millimétrée des crises de confiance et des bad buzz réseaux sociaux (détox dopamine). La psychologie de réhabilitation des ligaments croisés postérieurs : comment ne pas perdre le cerveau quand le genou lâche. Construction algorithmique du Plan de Résilience Individuel (Ce que je fais QUAND je perds, QUAND je me blesse).",
       methode:"Études de cas réels · Plan de crise",exemples:"Le documentaire 'The Last Dance' sur la gestion de crise interne",
       guide:{
         accroche:"« Une saison n'est pas testée par vos 10 victoires consécutives, mais par votre capacité à ne pas vous auto-détruire après une série de 3 défaites humiliantes. »",
         etudes:"Research in Sports Medicine : les athlètes ayant un plan écrit de gestion d'une blessure grave retournent 2 semaines plus tôt sur le terrain et à 95% de leurs capacités mentales passées.",
         posture:"Analytique, clinique. Présente les cas de blessures comme des problèmes mathématiques à résoudre. Exige d'eux qu'ils écrivent leur protocole avant que la blessure n'arrive. Provoque-les.",
         objections:"'Je préfère ne pas penser à la blessure, ça porte malheur.' -> Réponse : 'Ne pas y penser, c'est choisir l'assurance panique le jour J. L'anticipation froide détruit la peur panique.'"
       }
     },
     {
       num:"J2B",title:"JOUR 2 Après-midi — Le Sanctuaire Post-Carrière",duree:"1h30",
       contenu:"Préparation anticipée de la retraite mortelle (psychologiquement) du sportif de haut niveau. Diagnostic identitaire pur (La Roue de la Vie). Traduction instantanée des compétences du terrain en lexique professionnel du CAC40. L'écosystème nutritif et somnifère non-performant (comment manger quand on ne court plus). Blueprint de la semaine 1 après la retraite.",
       methode:"Exercices Identitaires · Projection",exemples:"Les cellules d'accompagnement de la FIFPRO.",
       guide:{
         accroche:"« Vous mourrez deux fois. La première fois aura lieu exactement le jour de l'expiration de votre dernier contrat. Préparons votre renaissance. »",
         etudes:"Journal of Clinical Sport Psychology : L'anticipation identitaire multipliée de la fin de carrière divise par trois le syndrome du 'Lendemain de fête' sportif dépressif.",
         posture:"Visionnaire. Tu es le guide qui connaît le chemin vers l'autre côté de la montagne. Fais-leur comprendre la puissance phénoménale d'un CV de sportif s'il est mentalement assumé.",
         objections:"'Penser à l'après, ça va me déconcentrer pour la saison actuelle.' -> Réponse : 'Faux, la science prouve l'inverse. Quand ton cerveau sait que ton avenir financier et humain n'est pas en danger, ton niveau de stress fond, t'ancrant totalement dans le présent.'"
       }
     },
     {
       num:"J2C",title:"JOUR 2 Fin — Certification & Rituels d'Équipe",duree:"1h30",
       contenu:"Écriture finale des Livrables de performance : Le 'Mental Performance Plan' 4 pages personnel, imprimé, signé. Création de la Charte de Bien-Être Collectif de l'équipe (les 3 règles sacrées du vestiaire de cette saison). Célébration, Q&R finaux, ancrage profond du week-end. Remise officielle des Certifications Elite 360° avec serrage de main (eye-contact exigé).",
       methode:"Livrables physiques · Rituel collectif engageant",exemples:"La charte des All-Blacks ('Sweep the Sheds')",
       guide:{
         accroche:"« Ce document de 4 pages ne vaut rien si vous le mettez dans un tiroir. C'est le manuel opérationnel de survie mentale de votre meilleure version. Le contrat commence maintenant. »",
         etudes:"Sociologie du sport : la création d'une charte collective co-écrite génère 80% plus d'adhésion autorégulatrice que des règles imposées par un Head Coach (Stafford 2018).",
         posture:"Solennel et inoubliable. Fais de cette remise de diplômes un moment de cohésion de groupe extrêmement profond. Termine avec une phrase choc ou une citation puissante qui résonnera toute l'année.",
         objections:"[Fin de la formation : traiter uniquement les dernières questions avec une pointe de sagesse.]"
       }
     },
   ],
   materiel:["Salle confortable (pas style conférence)","Vidéoprojecteur + système sonore","Fiches MPP individuelles 4 pages","Questionnaires AMS-3 imprimés","Musique et ambiance travaillée"],
   livrables:["Programme 2 jours","Feuilles d'émargement","Attestation","Mental Performance Plan (4p/athlète)","Charte de bien-être d'équipe","Bibliothèque de ressources complète"],
   tarifs:{"Groupe 8-15 pers.":"4 500€ HT","Groupe 16-25 pers.":"7 000€ HT","Coaching individuel":"500€/h","Package saison mensuel":"1 500€/mois"},
   arguments:["IOC Consensus 2019 : santé mentale = pilier de la performance","120 clubs pro en France + fédérations + académies INSEP","AFDAS finance 100% pour clubs pro du secteur sport","Prix premium justifié : 2 jours + documents + suivi","1 club → 10 recommandations dans le milieu sportif"],
  },
  {id:"menage",icon:"🧹",title:"Agent d'Entretien Professionnel",subtitle:"Formation complète 2 jours (14h)",price:"1 200€ HT groupe · 180€/h individuel",color:"#06B6D4",cat:"menage",
   tagline:"Les bons gestes, les bons produits, la bonne attitude — pour un service irréprochable",
   public:"Agents d'entretien, employés de ménage, conciergerie, hôtels, commerces, particuliers — tout niveau · Format TERRAIN : appartement, hôtel, gymnase ou commerce partenaire",
   legal:"Aucun agrément obligatoire. Certification RS possible. Financement : OPCO Akto, Constructys, Atlas selon secteur.",
   objectifs:["Maîtriser les techniques professionnelles de nettoyage par surface","Choisir et utiliser correctement les produits d'entretien et le matériel","Appliquer les règles d'hygiène, sécurité et prévention des TMS","Gérer son temps et organiser ses interventions efficacement","Adopter le comportement professionnel attendu en clientèle (hôtel, commerce, particulier)"],
   modules:[
     {
       num:"01",title:"Fondamentaux du Métier",duree:"90 min",
       contenu:"Valorisation du métier : vous êtes les garants de la santé publique (sans nettoyage, prolifération bactérienne en 24h). Hygiène corporelle absolue et port rigoureux des EPI (gants de couleurs, masque si pulvérisation). Sensibilisation aiguë au Code de déontologie (invisibilité, respect du secret professionnel dans les bureaux, ponctualité). Initiation express aux normes HACCP (Hazard Analysis Critical Control Point) : marche en avant, non-croisement propre/sale.",
       methode:"Présentation · Échanges d'expériences",
       guide:{
         accroche:"« Ce métier souffre d'un manque de reconnaissance. Pourtant, si un PDG ne vient pas travailler un jour, l'entreprise tourne. Si les agents d'entretien ne viennent pas 3 jours, l'entreprise ferme pour insalubrité. Vous êtes vitaux. »",
         etudes:"Données HAS (Haute Autorité de Santé) : le bionettoyage rigoureux réduit de plus de 40% les infections nosocomiales et les arrêts maladie en entreprise.",
         posture:"Très valorisant. Fais le tour de table pour que chacun exprime sa fierté ou sa difficulté dans le métier. Transforme leur perception du 'sale boulot' en 'mission de santé environnementale'.",
         objections:"'Les gens nous méprisent.' -> Réponse : 'C'est vrai. C'est l'ignorance pure. Notre réponse sera la perfection technique et le professionnalisme ultime. L'excellence impose le respect.'"
       }
     },
     {
       num:"02",title:"Produits, Matériel & Sécurité Chimique",duree:"90 min",
       contenu:"Lecture décryptée des FDS (Fiches de Données de Sécurité) et pictogrammes de danger. Le pH des produits : Acide (pour détartrer), Neutre (pour nettoyer), Alcalin (pour dégraisser). Règle mortelle à rappeler : NE JAMAIS mélanger Javel et acide/vinaigre (gaz chloré mortel). Maîtrise des dosages (1 bouchon = 20ml, pas 4). Entretien maniaque du chariot (nettoyage après chaque vacation).",
       methode:"Démonstration chimie · Exercice dosage précis",
       guide:{
         accroche:"« Les produits que vous manipulez sont de la chimie industrielle. Mal dosés, ils détruisent vos poumons. Mélangés au hasard, ils peuvent créer un gaz mortel en 3 secondes. »",
         etudes:"Centre Antipoison : Les intoxications par mélange accidentel de produits ménagers représentent la 1ère cause d'intoxication professionnelle (gaz chloramidé).",
         posture:"Scientifique. Ramène 5 bidons de produits réels. Fais-leur lire et interpréter l'étiquette. Force-les à manipuler la doseuse transparente : 'Vérifiez, avez-vous mis 20ml ou 40ml ? C'est le budget de l'entreprise.'",
         objections:"'Plus ça mousse, plus ça lave.' -> Réponse : 'Idée reçue catastrophique. La mousse ne lave pas, elle rince mal, elle colle la saleté et elle gaspille le produit. Respectez la dose.'"
       }
     },
     {
       num:"03",title:"Techniques de Nettoyage (La Pratique)",duree:"120 min",
       contenu:"Code couleur internationalisé (Bleu=bureaux, Vert=cuisine, Jaune=lavabo, Rouge=WC). Technique d'essuyage continu des surfaces. Lavage des sols : abandon de la serpillière espagnole pour la méthode 'à plat' ou méthode 'Imprégnation'. Technique de lavage au sol en 'Serpentin' (ou méthode de la godille) pour ramener les souillures sans reculer dessus. Traitement des sanitaires : ordre de nettoyage (du moins contaminé au plus contaminé).",
       methode:"Pratique intensive terrain avec matériel",
       guide:{
         accroche:"« Travailler dans le ménage sans méthode, c'est comme vider l'océan avec une cuillère. Une vraie méthode économise 30% de votre temps et 50% de vos articulations. »",
         etudes:"Validation INRS : La méthode de lavage pré-imprégnée réduit de 60% la consommation d'eau et de produits tout en diminuant la fatigue musculaire du dos.",
         posture:"Inspecteur des travaux finis. C'est un atelier 100% pratique. Tu regardes chaque participant manier le balai trapèze. Corrige la godille. C'est le cœur de la formation.",
         objections:"'Je préfère mon vieux balai-brosse espagnol.' -> Réponse : 'Il est lourd 5 fois plus quand il est mouillé, il étale les bactéries, et il va te détruire les lombaires dans 2 ans. Essaie celui-ci pendant 5 minutes.'"
       }
     },
     {
       num:"04",title:"Organisation, Productivité & Relation Client",duree:"60 min",
       contenu:"Gains marginaux de temps : préparation ultime du chariot ('Le bureau roulant'). Stratégie de l'itinéraire logique (entrer par la porte, faire le tour horaire de la pièce). Check-list de sortie. Gestion de l'imprévu en direct (tache rebelle, client présent). Savoir formuler une information au client : 'Madame, une vitre est fêlée, je la signale pour votre sécurité'.",
       methode:"Jeux de Rôle · Scénario d'urgence",
       guide:{
         accroche:"« Si vous cherchez votre produit vitre pendant 1 minute à chaque pièce, sur 30 bureaux, vous avez perdu une demi-heure de votre journée. L'organisation, c'est du temps de vie gagné. »",
         etudes:"Études d'ergonomie du travail : 25% du temps non-productif dans l'entretien est consacré aux 'pas inutiles' pour chercher du matériel mal positionné.",
         posture:"Conseiller en productivité. Mets-les en situation de stress léger ('Tu n'as que 4 minutes pour faire ce bureau, montre-moi ton ordre de priorité. Qu'est-ce que tu ne fais pas si tu manques de temps ?').",
         objections:"'Le client se plaint toujours.' -> Réponse : 'Laisse-le parler. Ne justifie rien. Note sa remarque et propose une action : Je m'en occupe demain en priorité. 90% des clients veulent juste être entendus.'"
       }
     },
     {
       num:"05",title:"Gestes et Postures Métier & Certification",duree:"60 min",
       contenu:"Cartographie des TMS de l'agent : coudes, épaules, canal carpien, lombaires. Position de 'fente avant' pour le balayage. L'axe manche-bout du nez (respect des alignements articulaires). Le secret caché des micro-pauses articulaires. Bilan de fin de formation, QCM officiel et tour de table d'engagement de changement. Remise des attestations obligatoires.",
       methode:"Pratique posturale · QCM final",
       guide:{
         accroche:"« Si vous essorez votre serpillière avec le dos rond 30 fois par jour, je vous garantis une lombalgie à 45 ans. Le premier outil de travail que vous devez nettoyer et protéger, c'est votre propre corps. »",
         etudes:"Assurance Maladie : Le secteur de la propreté est le 2ème secteur le plus touché par les maladies professionnelles (TMS) après le BTP.",
         posture:"Bienveillant et strict sur la santé. Fais-leur faire des squats et montrer la méthode de levage d'un seau lourd. Ne laisse passer aucun dos rond.",
         objections:"'C'est trop lent de s'accroupir correctement.' -> Réponse : '2 secondes de perdues aujourd'hui. 6 mois de salaire sauvegardés l'année prochaine. C'est un calcul purement mathématique.'"
       }
     },
   ],
   materiel:["Chariot de ménage professionnel","Gamme de produits d'entretien professionnels","Chiffons micro-fibre (couleurs différentes par zone)","Moppes et balais professionnels","Racloir vitres + mouilleur","EPI : gants, tablier, lunettes","Seau double compartiment","Fiches de passage vierges"],
   livrables:["Programme","Feuille d'émargement","Attestation de formation","Fiche produits + dosages","Check-list par type de local","Guide gestes & postures agent d'entretien"],
   tarifs:{"Groupe 8-14 pers. (2j)":"1 200€ HT","Groupe 4-7 pers. (2j)":"800€ HT","Module recyclage 1j":"500€ HT","Audit et conseil (1j)":"900€ HT"},
   arguments:["4 ans d'activité · 1000+ sessions réalisées = expertise terrain incontestable","Clients potentiels : sociétés de ménage, hôtels, conciergeries en IDF","Financement : OPCO Akto (hôtellerie-propreté) finance jusqu'à 100%","Marché : 500 000 agents d'entretien en France, turnover élevé = formation constante","Upsell : audit des pratiques en entreprise + programme de formation sur-mesure","Certification possible : Titre Pro Agent de Propreté et d'Hygiène (TPAH)"],
  },
  {id:"bestformateur",icon:"🎤",title:"Devenir le Meilleur Formateur",subtitle:"Masterclass Formateur · 1 jour (7h)",price:"1 400€ HT groupe · 300€/h coaching",color:"#F59E0B",cat:"skills",
   tagline:"Maîtriser l'art de former — posture, voix, engagement, impact mémorable",
   public:"Formateurs débutants ou en activité qui veulent passer au niveau supérieur · Coachs · Speakers",
   legal:"Aucun agrément obligatoire. Peut mener vers la certification Formateur FPA (RNCP niveau 5).",
   objectifs:["Maîtriser la posture physique et l'autorité naturelle du formateur","Développer une voix engageante et un débit adapté à chaque module","Concevoir des programmes mémorables avec la méthode 70/20/10","Gérer un groupe difficile, les silences et les conflits","Créer l'expérience apprenante qui donne envie de revenir"],
   modules:[
     {
       num:"01",title:"L'Anatomie du Charisme",duree:"90 min",
       contenu:"Démystification du charisme : c'est une technique, pas un don. Les 7 postures de pouvoir (Power Poses) étudiées à Harvard. La géographie de la salle : la 'Zone T' d'autorité. La chorégraphie du mouvement : s'arrêter net pour souligner un point crucial. Maîtriser le 'Eye Contact' prolongé (la règle des 3 secondes par participant). Élimination des gestes parasites d'auto-réassurance (se toucher le cou, jouer avec le stylo).",
       methode:"Exercice miroir filmé · Feedback impitoyable",exemples:"Analyse biomécanique des speakers TEDx",
       guide:{
         accroche:"« Le charisme n'est pas inné. C'est une équation mathématique : Posture ouverte + Contact visuel + Silence = Autorité naturelle. On va coder cette équation en vous aujourd'hui. »",
         etudes:"Étude de Mehrabian (UCLA) : 55% de la communication est non-verbale (langage corporel), 38% est vocale (ton de la voix) et seulement 7% correspond aux mots choisis.",
         posture:"Modèle de perfection. Tu dois toi-même incarner chaque technique dont tu parles. Sers-toi de ton leadership acquis sur le terrain : tu étais un joueur pro dominant, transpose cette assurance physique dans la salle de formation. S'ils voient l'athlète confiant, ils te suivront.",
         objections:"'Je suis de nature timide.' -> Réponse : 'Moi aussi. Sauf quand j'entre dans cette salle. La salle de formation est un théâtre, et ton rôle c'est l'Expert Serein. Joue ce rôle.'"
       }
     },
     {
       num:"02",title:"La Voix comme Arme de Rétention",duree:"80 min",
       contenu:"La respiration diaphragmatique du chanteur d'opéra appliquée à la salle de cours. Les 4 'V' de la voix : Volume, Vitesse, Variété vocale, Vide (silences). Apprendre à chuchoter pour récupérer 100% de l'attention d'une salle bruyante. Élimination drastique des mots remplisseurs ('euh', 'du coup', 'voilà'). L'ancrage de la voix dans le grave (baisse du larynx) pour projeter l'assurance.",
       methode:"Enregistrement audio en direct",
       guide:{
         accroche:"« Votre voix est le seul instrument de musique capable d'hypnotiser 20 personnes pendant 7 heures. Si vous jouez sur une seule corde (monotone), ils vont tous s'endormir à 11h. »",
         etudes:"Recherche linguistique du MIT : les orateurs qui intègrent des micropauses (0.5s) avant leurs concepts-clés augmentent de 30% la rétention d'information chez l'auditoire.",
         posture:"Directeur de conservatoire. Fais-les lire un texte neutre (une recette de cuisine) de façon tragique, puis de façon comique, juste par la voix. Démontre que l'intonation fait 90% du message.",
         objections:"'J'ai une petite voix.' -> Réponse : 'Tu ne respires pas par le ventre, tu respires par clavicules. Ce n'est pas un problème de volume, c'est un problème de moteur. On va réveiller ton diaphragme.'"
       }
     },
     {
       num:"03",title:"Design Pédagogique : Coder des Souvenirs",duree:"90 min",
       contenu:"Neuro-pédagogie : le cerveau humain oublie 70% de l'information en 24h (Courbe d'Ebbinghaus). La règle d'or 70/20/10 (70% pratique, 20% social, 10% théorie). La construction en 'Montagne Russe' (varier les émotions, l'énergie et les formats toutes les 15 minutes). La mort du PowerPoint : utiliser le visuel uniquement pour l'émotion, pas pour le texte. Créer un ancrage mémoriel final explosif.",
       methode:"Conception live d'un module de 10 min",exemples:"La méthode de simplification de Richard Feynman",
       guide:{
         accroche:"« Si les participants lisent vos slides, ils n'écoutent pas ce que vous dites. S'ils ne font que vous écouter, ils oublient ce que vous avez dit. Ils doivent le faire. »",
         etudes:"Méta-analyse éducative (Hattie, 2009) : l'apprentissage actif (résolution de problème en groupe) a une taille d'effet double par rapport au cours magistral passif.",
         posture:"Architecte. Fais-leur prendre un de leurs vieux supports PPT de 50 lignes, et oblige-les à le réduire à 1 seule image puissante avec 3 mots clés maximum.",
         objections:"'Mon sujet est très technique, j'ai besoin de slides compliquées.' -> Réponse : 'Plus un sujet est technique, plus il a besoin d'une métaphore ultra-simple pour être compris. Le cerveau novice ne peut pas avaler un lexique complexe sans ancrage connu.'"
       }
     },
     {
       num:"04",title:"Dompter les Fauves (Gestion de Groupe)",duree:"60 min",
       contenu:"Psychologie des profils de salle : Le Touriste (obligé d'être là), L'Expert (qui veut ta place), Le Pragmatique (qui veut des outils concrets). Techniques martiales de recadrage doux (Le nommage, La question boomerang). L'outil absolu du 'Parking' pour stopper les digressions hors-sujet. Comment gérer une attaque frontale ou une erreur flagrante du formateur (avouer instantanément sans se justifier).",
       methode:"Simulations de salle hostile",
       guide:{
         accroche:"« Dans chaque groupe de 10 personnes, il y aura statistiquement une personne qui n'a pas envie d'être là. Ce n'est pas contre vous. C'est votre job de la ramener dans la pièce. »",
         etudes:"Recherche en dynamique de groupe (Tuckman) : La phase de 'Storming' (conflit de leader avec le formateur) est normale et nécessaire pour passer à la phase de performance collective.",
         posture:"Jedi du vestiaire. Garde un calme olympien. Tu as géré des egos démesurés et des situations de tension au niveau professionnel : un stagiaire récalcitrant n'est rien à côté. Utilise la force tranquille d'un joueur vétéran.",
         objections:"'Et si quelqu'un pose une question dont j'ignore la réponse ?' -> Réponse : 'La meilleure phrase d'un expert c'est : Excellente question, je n'ai pas la donnée exacte en tête. Je la cherche à la pause de midi et on en parle à 14h. Ne mens jamais.'"
       }
     },
     {
       num:"05",title:"De Formateur à Business Man",duree:"60 min",
       contenu:"La salle de formation comme meilleur canal de prospection au monde. Comment designer un questionnaire de satisfaction qui vend (« Sur quel autre sujet aimeriez-vous qu'on vous accompagne ? »). La matrice pour obtenir des témoignages LinkedIn parfaits en fin de session. Transformer chaque stagiaire en ambassadeur auprès de son propre service RH pour te revendre l'année suivante.",
       methode:"Rédaction de la séquence de suivi",
       guide:{
         accroche:"« Un bon formateur donne un bon cours et rentre chez lui. Un formateur d'exception donne une expérience mémorable et repart avec 3 nouveaux contrats dans son téléphone. »",
         etudes:"Marketing B2B (Nielsen) : le taux de conversion d'une recommandation par un employé interne à sa direction RH est 4 fois supérieur à une prospection à froid (cold email).",
         posture:"Mentor de haut niveau. Parle-leur d'égal à égal mais en tant qu'ancien joueur pro ayant été dirigé par l'élite. Partage systématiquement tes meilleures anecdotes de vestiaires pros pour illustrer le standard de l'exigence.",
         objections:"'Je n'aime pas faire le marchand de tapis en fin de formation.' -> Réponse : 'Tu ne vends pas, tu offres la continuité. S'ils ont adoré aujourd'hui, c'est presque égoïste de ne pas leur proposer l'étape numéro 2.'"
       }
     },
   ],
   materiel:["Salle avec espace pour se déplacer","Vidéoprojecteur + système son","Enregistreur audio ou téléphone","Post-its","Paperboard","Miroir si possible"],
   livrables:["Programme","Feuille d'émargement","Attestation","Checklist 'Formateur d'Exception'","Guide voix et posture","Template portfolio formateur"],
   tarifs:{"Groupe 6-12 pers.":"1 400€ HT","Coaching individuel 2h":"300€/h","Package 3 séances coaching":"750€"},
   arguments:["Toi = formateur unique qui a joué pro à l'international → double légitimité terrain + business","Marché : tous les formateurs débutants veulent progresser vite","Peut être vendu comme prérequis à tes autres formations","Upsell naturel : après cette formation, les gens veulent suivre tes autres programmes"],
  },
  {id:"coachpro",icon:"🏀",title:"Coach Amateur → Coach Professionnel",subtitle:"Montée en compétence · 2 jours (14h)",price:"1 600€ HT groupe · 280€/h individuel",color:"#E05555",cat:"skills",
   tagline:"Élever son niveau de coaching pour avoir des joueurs qui progressent vraiment",
   public:"Coachs amateurs, éducateurs sportifs, bénévoles souhaitant se professionnaliser",
   legal:"Aucun agrément obligatoire. Complémentaire au BPJEPS Basket. Financement AFDAS pour clubs.",
   objectifs:["Structurer une séance d'entraînement efficace et progressive","Développer le mindset et la culture d'équipe gagnante","Créer des exercices techniques et des jeux de cohésion mémorables","Communiquer avec autorité et bienveillance avec ses joueurs","Gérer les parents, les conflits de vestiaire et les baisses de motivation"],
   modules:[
     {
       num:"01",title:"L'ADN du Coach Professionnel",duree:"90 min",
       contenu:"La transition brutale de 'Grand Frère' à 'Leader Systémique'. Les 5 piliers du coaching de très haut niveau : Vision, Standard, Responsabilisation, Feedback, Connexion. Déconstruction du mythe du coach tyrannique vs formateur permissif (Le 'Tough Love' de Popovich). Architecture psycho-développementale du joueur (U12 : Apprentissage fun, U15 : Compétition, U18 : Performance).",
       methode:"Auto-évaluation Leadership · Débat",exemples:"Phil Jackson (Zen Coaching) · Bozidar Maljkovic (Dureté créative)",
       guide:{
         accroche:"« Un coach amateur regarde le ballon. Un coach professionnel regarde les pieds, les yeux, et l'espacement (spacing) général de son équipe sur le terrain. »",
         etudes:"Recherche en psychologie du sport (Gould) : Les coachs qui fixent des 'objectifs de maîtrise' (process) créent 3x moins d'anxiété compétitive que ceux fixant des 'objectifs de résultat' (victoire).",
         posture:"Mentor exigeant. Tu as connu le très haut niveau. Explique-leur l'abîme qu'il y a entre crier sur un joueur (réaction émotionnelle du coach) et exiger un standard (action professionnelle pour le joueur).",
         objections:"'Je coache des amateurs, ils ne sont pas payés, je ne peux pas être trop dur.' -> Réponse : 'L'exigence n'est pas la méchanceté. Mettre un standard élevé, c'est la plus grande forme de respect que tu puisses témoigner à tes joueurs.'"
       }
     },
     {
       num:"02",title:"Ingénierie de l'Entraînement",duree:"120 min",
       contenu:"Mathématiques de la répétition : ratio Ballons/Minutes/Joueurs. La méthode d'acquisition par 'Variables Aléatoires' (au lieu des files d'attente statistiques). La structure FIBA en 4 temps : Activation neurale (pas juste courir), Small-Sided Games (3v3 contraints), Concept d'équipe, Application match. Outil vidéo 'Quick-Cut' : comment filmer 3 minutes à l'iPhone et débriefer instantanément au bord du terrain.",
       methode:"Pratique sur le parquet avec ballon",exemples:"Pédagogie de la NBA G-League (Développement brut)",
       guide:{
         accroche:"« Si tes joueurs passent 40% de l'entraînement dans une file d'attente derrière un plot, tu n'es pas en train de les entraîner, tu es en train de les garder. »",
         etudes:"Motor Learning Science : L'apprentissage par 'pratique bloquée' (10 tirs du même endroit) crée l'illusion de la compétence. La 'pratique aléatoire' (10 tirs d'endroits et situations variées) double la rétention en match.",
         posture:"Joueur-tacticien scientifique. Sur le terrain. Raconte-leur comment les entraînements pros t'épuisaient mentalement. Montre-leur par l'exemple l'intensité d'un drill élite en effectuant les mouvements avec rudesse professionnelle.",
         objections:"'Les exercices complexes, ils n'y arrivent pas, ils perdent la balle.' -> Réponse : 'Un entraînement parfait c'est un entraînement nul. S'ils ne perdent jamais la balle à l'entraînement, c'est que tu ne les challenges pas. La perte de balle est le prix de l'apprentissage.'"
       }
     },
     {
       num:"03",title:"Le Rôle du Coach Mental",duree:"90 min",
       contenu:"Application directe du Growth Mindset de Carol Dweck : louer l'effort stratège, jamais le talent pur ('Bon tir vs Bonne décision'). Ingénierie du Feedback : La règle des 3:1 (3 renforcements pour 1 correction). La technique chirurgicale du 'Feedback Sandwich' pour les égos fragiles. Gestion du syndrome de l'imposteur chez le jeune talent. Créer la Culture de la Faute Acceptee (fail fast, learn faster).",
       methode:"Jeux de rôle de recadrage joueur",
       guide:{
         accroche:"« Vous ne coachez pas du basketball. Vous coachez des humains masculins/féminins entre 15 et 25 ans remplis de doutes, à l'aide d'un ballon de basketball. C'est très différent. »",
         etudes:"Journal of Applied Sport Psychology : Les feedbacks positifs spécifiques ('Super rotation des hanches') sont 4 fois plus efficaces que les encouragements globaux ('Bien joué!').",
         posture:"Psychologue de vestiaire. Apprends-leur la différence entre le 'Quoi' (ce qui est raté) et le 'Comment' (comment le réparer). Le joueur sait ce qu'il a raté, il veut savoir comment le réussir.",
         objections:"'Si je fais trop de compliments, ils vont se relâcher.' -> Réponse : 'C'est un mythe culturel. Le renforcement positif spécifique crée de la dopamine, qui ancre neurologiquement la compétence. C'est biologique, pas philosophique.'"
       }
     },
     {
       num:"04",title:"Créer le Monstre (Cohésion d'Équipe)",duree:"90 min",
       contenu:"Anatomie d'un vestiaire inébranlable. Roullette russe des rôles : obliger les joueurs à endosser la tâche d'un autre ('Walk a mile in my shoes'). Le défi du Silence : comment forcer la communication non-verbale défensive sur le terrain. Rituels d'entrée et de sortie intouchables. Traitement systémique des clans et gestion du 'Superstar Toxique'.",
       methode:"Atelier Résolution de Conflits",exemples:"La culture défensive de Zvezda et du Partizan Belgrade",
       guide:{
         accroche:"« Une équipe n'est pas un groupe de gens qui travaillent ensemble. Une équipe est un groupe de gens qui ont une confiance absolue les uns dans les autres en terrain hostile. »",
         etudes:"Recherche Google Aristotle (sur la performance d'équipe) : La 'Sécurité Psychologique' (le droit de prendre un risque sans être humilié par le groupe) est le facteur numéro 1 de la très haute performance collective.",
         posture:"Chef de clan. Tu transmets l'âme du basket européen/mondial. Fais comprendre que la cohésion ne se décrète pas en allant manger une pizza. Elle se forge dans la difficulté gérée ensemble.",
         objections:"'Je n'arrive pas à gérer mon meilleur joueur, il s'isole du groupe.' -> Réponse : 'Le talent sans la tribu est une faiblesse temporaire. C'est à toi de lui donner une mission de leadership (ex: encadrer les rookies) pour l'arrimer au navire.'"
       }
     },
     {
       num:"05",title:"Diplomatie de Haute Tension (Parents & Dirigeants)",duree:"60 min",
       contenu:"Manuel de survie face aux parents (Le Parent-Coach, Le Sang-Sangsue, Le Désintéressé). Scénario d'ultra-cadrage de la réunion de rentrée (Le contrat moral). L'art de gérer la relation avec son Président de Club (Exiger des moyens professionnels vs se plaindre). La méthode D.E.S.C. pour recadrer un conflit explosif parent-coach sur le bord du terrain.",
       methode:"Simulation agression verbale Parent",
       guide:{
         accroche:"« Les parents ne sont pas vos ennemis, ils sont votre Service Clientèle et vos investisseurs les plus angoissés. Gérer leur angoisse, c'est 50% de votre tranquillité. »",
         etudes:"Sociologie sportive européenne : 60% des coachs amateurs arrêtent leur activité à l'issue de 3 ans, avec la gestion des parents citée comme cause numéro 1 d'abandon.",
         posture:"Général Manager de franchise. Dirige la salle comme un pro. Tu as vu comment les vrais clubs pros sont structurés de l'intérieur en tant que joueur. Raconte-leur l'organisation millimétrée des clubs européens où tu as évolué pour leur montrer la cible à atteindre.",
         objections:"'C'est ma salle, je fais ce que je veux, si un parent n'est pas content il part.' -> Réponse : 'C'est une réaction d'ego qui détruira le gamin, pas le parent. Tu es le professionnel de la pièce, c'est à toi d'éduquer l'adulte pour sauver le joueur.'"
       }
     },
   ],
   materiel:["Terrain de basket ou gymnase (idéal)","Ballons","Vidéoprojecteur + laptop","Fiches exercices imprimées","Tableau blanc ou paperboard"],
   livrables:["Programme","Feuille d'émargement","Attestation","10 exercices fondamentaux A4","Template réunion parents","Fiche suivi joueur","Plan développement coach 6 mois"],
   tarifs:{"Groupe 6-15 pers. (2j)":"1 600€ HT","Module 1j intensif":"900€ HT","Coaching terrain 2h":"280€/h","Package saison (accompagnement mensuel)":"400€/mois"},
   arguments:["500 000 licenciés basket en France dont 80% encadrés par des bénévoles","AFDAS finance pour les clubs sportifs affiliés","Toi = ex-pro qui a joué avec les meilleurs = argument inattaquable","Marché : clubs FFBB amateurs, comités régionaux, académies de jeunes","Upsell : formation ELITE 360° pour les joueurs du même club"],
  },
  {id:"clubpro",icon:"🏟️",title:"Club Amateur → Structure Professionnelle",subtitle:"Développement de club · 2 jours (14h)",price:"2 000€ HT groupe dirigeants · 350€/h conseil",color:"#8B5CF6",cat:"skills",
   tagline:"Transformer un club amateur en structure qui génère des revenus et fait progresser ses joueurs",
   public:"Présidents de club, dirigeants, trésoriers, coordinateurs sportifs de clubs amateurs basket",
   legal:"Formation déductible fiscalement pour les associations. Financement AFDAS possible. Aucun agrément requis.",
   objectifs:["Professionnaliser la structure administrative et sportive du club","Créer des sources de revenus passifs tout au long de l'année","Sélectionner et recruter des coachs avec le mindset professionnel","Nouer des partenariats fournisseurs (maillots, équipements) avantageux","Organiser des événements générateurs de revenus (camps, tournois, buvettes)"],
   modules:[
     {
       num:"01",title:"Changer de Paradigme (Mentalité Entreprise)",duree:"90 min",
       contenu:"Destruction du modèle 'C'est juste une association loi 1901'. Un club est une PME sportive. L'audit foudroyant de l'organisation : la tyrannie des bénévoles vs la délégation de compétences. Création immédiate d'un Organigramme Exécutif purifié (Qui fait quoi, qui décide quoi). Stratégie de professionnalisation asymétrique : salarier les 2 postes cruciaux (Directeur Technique et Sponsorings) pour dégager des fonds massifs.",
       methode:"Audit de bilan instantané du club",exemples:"L'évolution des clubs allemands et espagnols",
       guide:{
         accroche:"« Tant que vous gérerez votre club comme une association de potes qui organisent un loto le dimanche, vous resterez pauvres, stressés et vos meilleurs joueurs partiront au club d'à côté. »",
         etudes:"Étude Observatoire du Sport : Les clubs sportifs amateurs qui hybrident leur modèle (bénévolat + 1 à 2 salariés commerciaux stratégiques) augmentent leur budget de 250% en 4 ans.",
         posture:"Investisseur / Joueur d'Élite pragmatique. Utilise ton expérience analytique des clubs pros dans lesquels tu jouais. Raconte-leur comment ces structures dégageaient du cash massifs. Transpose cette ingénierie à leur réalité.",
         objections:"'On n'a pas les moyens de salarier quelqu'un.' -> Réponse : 'Vous n'avez pas les moyens de NE PAS le faire. Un profil business vous ramènera 3 fois son salaire en sponsoring les 6 premiers mois. L'argent est là-dehors, il faut juste un chasseur pour le ramener.'"
       }
     },
     {
       num:"02",title:"Ingénierie de la Stratégie Technique",duree:"90 min",
       contenu:"L'abandon du recrutement au hasard (le copain d'un copain qui veut bien coacher les U15). La rédaction de l'Identité Sportive du Club (le fameux 'Club DNA'). Masterclass de recrutement d'entraîneurs : questions discriminantes en entretien. Ingénierie du Curriculum Technique Interne : de U7 à Seniors, on joue le même système de base de défense et d'attaque pour créer un ADN unique.",
       methode:"Élaboration du Curriculum U10-Senior",
       guide:{
         accroche:"« Si j'entre incognito le mardi soir dans votre gymnase, comment je sais que je suis dans VOTRE club ? Si vos 15 équipes jouent 15 baskots différents selon l'humeur du coach, vous n'avez pas de club, vous avez un loueur de gymnases. »",
         etudes:"Fédération Espagnole de Basketball : L'implémentation d'un Curriculum d'entraînement vertical et unique multiplie par 4 l'intégration de jeunes formés au club dans l'équipe senior Première.",
         posture:"Directeur Technique National. Montre l'importance d'imposer une philosophie de jeu aux coachs, et non l'inverse. C'est le club l'employeur (même de bénévoles).",
         objections:"'Mes coachs voudront jamais qu'on leur dicte comment entraîner.' -> Réponse : 'Alors ce ne sont pas les bons coachs pour votre projet. Mieux vaut un coach moyen qui suit le programme du club qu'un génie qui dresse un mur entre son équipe et le reste de la structure.'"
       }
     },
     {
       num:"03",title:"Machine à Cash (Diversification des Revenus)",duree:"120 min",
       contenu:"Sortir de la dépendance suicidaire aux subventions de la mairie. Monétisation agressive mais éthique de l'infrastructure. L'Ingénierie du Camp Vacances Haute Performance (Vendu 250€, pas 50€). Merchandising Premium (Print On Demand sans stock). L'art d'organiser des Tournois Homologués (Buvette ROI X4). La vente de packs 'Visibilité Business' B2B plutôt que de mendier un panneau publicitaire ou un chèque.",
       methode:"Construction du Business Plan rapide",exemples:"Modèle financier des Académies de basket serbes",
       guide:{
         accroche:"« Arrêtez d'aller pleurer chez le maire pour 500€ de subvention. Votre club est une mine d'or assoupie. Vous avez l'attention de centaines de familles le week-end, et l'attention se monétise. »",
         etudes:"Rapport Sport Economie 2022 : La dépendance aux fonds publics affaiblit 80% des clubs. Les clubs à capitaux majoritairement privés ou générés via l'événementiel résistent à 99% aux crises locales.",
         posture:"Business Angel / Investisseur. Fais avec eux l'exercice d'un calcul de retour sur investissement (ROI) pour l'organisation d'un camp élite U15 Pâques. Sors les vrais chiffres. Montre le profit net.",
         objections:"'Chez nous, les gens n'ont pas l'argent pour payer un camp à 200 euros.' -> Réponse : 'Faux. Ils achètent des chaussures à 150 euros à leurs enfants tous les 6 mois. Quand le produit est Premium (intervenants pros, équipement exclusif, vidéo), le budget se libère miraculeusement.'"
       }
     },
     {
       num:"04",title:"Le Levier Sponsoring & Marketing Local",duree:"90 min",
       contenu:"La mort de la 'Plaquette Papier' jetée à la poubelle par les PME. Conception de l'offre B2B de 'Mécénat de Compétence'. Organiser un Tournoi Inter-Entreprises payant avec les locaux. Le programme VIP un vendredi soir (Cocktail + Sièges Terrain). Négociation agnostique avec les équipementiers : ne plus jamais payer le matériel plein pot (Nike Team, Adidas, fournisseurs alternatifs haut de gamme).",
       methode:"Pitch Sponsoring B2B · Argumentaire",
       guide:{
         accroche:"« Ne vendez plus de la publicité. Les entreprises s'en moquent de votre maillot U13. Vendez-leur de l'inclusion RSE (Responsabilité Sociale), de la déduction fiscale stricte et et du réseau B2B. »",
         etudes:"Chambre de Commerce : Les TPE investissent dans le sport local principalement pour des raisons de Relations Publiques entre décideurs, bien avant la visibilité pure.",
         posture:"Directeur Marketing Sportif. Apprends-leur et fais-leur répéter le pitch minute devant le directeur de l'agence immobilière ou la concession auto de la ville.",
         objections:"'Je ne sais pas vendre, j'ai l'impression de demander la charité.' -> Réponse : 'Tant que tu penses cela, tu échoueras. Demain un chef d'entreprise te fait un chèque en mécénat, l'État lui rembourse 60% d'impôts directs et toi tu l'invites dans un monde de passion le week-end. C'est du gagnant-gagnant pur.'"
       }
     },
     {
       num:"05",title:"La Charpente des Prochains 18 Mois",duree:"60 min",
       contenu:"Atelier d'implémentation violente. Définition des 3 chantiers prioritaires vitaux. Abandon tactique des projets non-rentables en l'état ou 'Nice to have'. Désignation des Leaders de Projets dans le bureau du club avec 'Deadlines' incompressibles inscrites dans le marbre. Verrouillage du plan budgétaire. Cérémonie de remise des synthèses et du plan d'action.",
       methode:"Mastermind Plan 18 Mois",
       guide:{
         accroche:"« Si on ferme cet ordinateur et que vous repartez exactement avec le même fonctionnement demain matin, vous avez cramé le prix de cette formation et vos deux derniers jours de congé. L'urgence est absolue. »",
         etudes:"Science du Management (Kaplan & Norton) : Sans indicateur clé de performance (KPI) chiffré et surveillé mensuellement, 90% des plans stratégiques échouent dans les 3 premiers mois.",
         posture:"Général en chef avant la grande offensive. C'est extrêmement concret. Ne les laisse pas repartir avec des idées floues du type 'on va s'améliorer'. Mais plutôt 'Julien, responsable buvette, ouvre un compte SumUp lundi à 9h00 et sort le nouveau menu jeudi'.",
         objections:"'On n'arrivera jamais à tout faire.' -> Réponse : 'C'est exactement pour ça qu'on a fait le ménage ce matin. On ne fera pas tout. On fera les 3 actions qui rapportent 80% des résultats (Loi de Pareto). Le reste attendra l'année prochaine.'"
       }
     },
   ],
   materiel:["Salle de réunion","Vidéoprojecteur","Paperboard","Fiches business plan vierges","Exemples de chartes et statuts"],
   livrables:["Programme","Feuille d'émargement","Attestation","Plan d'action 12 mois","Template budget club","Charte du coach","Kit approche fournisseurs","Guide organisation tournoi"],
   tarifs:{"Groupe 5-12 dirigeants (2j)":"2 000€ HT","Coaching dirigeant individuel":"350€/h","Accompagnement mensuel club":"500€/mois","Audit complet du club (1j)":"1 200€ HT"},
   arguments:["4 000 clubs basket licenciés en France = marché énorme","Pratiquement aucun formateur ne propose ce type de formation aux dirigeants","AFDAS finance pour les salariés de clubs professionnels","Toi = ex-pro + entrepreneur = tu parles leur langue","Upsell : formation Coach Pro pour leurs entraîneurs + ELITE 360° pour leurs joueurs"],
  },
];


export default function App() {
  const [page,setPage]             = useState("dashboard");
  const [msgs,setMsgs]             = useState([{role:"ai",text:"Bonjour ! Assistant Formation Pro 🎓\n\nBase experte complète + FAQ détaillée + recherche web 🌐\n\nPose n'importe quelle question sur la formation pro en France.\nInclus : SST, Incendie, CNV, Conflits, Postures, Qualiopi, CPF..."}]);
  const [inputVal,setInputVal]     = useState("");
  const [busy,setBusy]             = useState(false);
  const [checked,setChecked]       = useState({});
  const [saved,setSaved]           = useState({});
  const [libCat,setLibCat]         = useState("Tous");
  const [libSearch,setLibSearch]   = useState("");
  const [expandedOrg,setExpandedOrg] = useState(null);
  const [formSub,setFormSub]       = useState("standard");
  const [selectedForm,setSelectedForm] = useState(null);
  const [activeModule,setActiveModule] = useState(null);
  const [openSec,setOpenSec]       = useState({phase1:true,cpf_plan:true});
  const [docTab,setDocTab]         = useState("att");
  const [venteTab,setVenteTab]     = useState("email");
  const [roadTab,setRoadTab]       = useState("roadmap"); // roadmap | documents
  const [org,setOrg]               = useState("");
  const [trainer,setTrainer]       = useState("");
  const [ftitle,setFtitle]         = useState("");
  const [fdate,setFdate]           = useState("");
  const bottomRef = useRef(null);
  useEffect(()=>{ bottomRef.current?.scrollIntoView({behavior:"smooth"}); },[msgs,busy]);

  const totalSteps = ROADMAP_SECTIONS.reduce((a,s)=>a+s.steps.length,0);
  const done  = Object.values(checked).filter(Boolean).length;
  const pct   = Math.round((done/totalSteps)*100);
  const chk   = (id)=>setChecked(p=>({...p,[id]:!p[id]}));
  const toggleSave = (id)=>setSaved(p=>({...p,[id]:!p[id]}));
  const savedCount = Object.values(saved).filter(Boolean).length;
  const toggleSec  = (id)=>setOpenSec(p=>({...p,[id]:!p[id]}));

  const send = async (override)=>{
    const q=(override??inputVal).trim();
    if(!q||busy) return;
    setInputVal("");
    if(override) setPage("assistant");
    setMsgs(p=>[...p,{role:"user",text:q}]);
    setBusy(true);
    const intent=detect(q);
    let text="",tag="";
    if(intent&&KB[intent]){ text=KB[intent]; tag="✅ Base experte"; }
    else {
      const w=await webSearch(q);
      if(w){ text="🌐 Résultat web\n\n"+w; tag="🌐 Web"; }
      else { text="Je n'ai pas de réponse précise.\n\nEssaie des mots-clés :\norganisme · CPF · NDA · DREETS · qualiopi · SST · CNV · incendie · OPCO · tarifs\n\nOu demande une FAQ :\n'FAQ SST' · 'FAQ incendie' · 'FAQ CPF' · 'FAQ conflits' · 'FAQ postures' · 'FAQ Qualiopi'"; }
    }
    setMsgs(p=>[...p,{role:"ai",text,tag}]);
    setBusy(false);
  };

  const O=org||"[Organisme]",N=trainer||"[Formateur]",TI=ftitle||"[Formation]",DA=fdate||"[Date]";
  const docContent={
    att:`ATTESTATION DE FORMATION\n${O}\nNDA : 11 75 XXXXX 75\n\nJe soussigné(e) ${N} atteste que :\nM./Mme _____________________\na suivi et validé la formation :\n\nIntitulé : ${TI}\nDate     : ${DA}\nDurée    : ___ heures\n\nRÉSULTAT :\n☐ ACQUIS    ☐ EN COURS    ☐ NON ACQUIS\n\nFait à ________ le ________\n\n________________________\n${N} — Formateur`,
    em:`FEUILLE D'ÉMARGEMENT\n${O} — NDA : 11 75 XXXXX 75\n\nFormation : ${TI}\nDate : ${DA}   Formateur : ${N}\n\n──────────────────────────────────\n N°  Nom & Prénom         Matin  AM\n──────────────────────────────────\n  1  _________________    ____  ____\n  2  _________________    ____  ____\n  3  _________________    ____  ____\n  4  _________________    ____  ____\n  5  _________________    ____  ____\n  6  _________________    ____  ____\n  7  _________________    ____  ____\n  8  _________________    ____  ____\n──────────────────────────────────`,
    conv:`CONVENTION DE FORMATION PROFESSIONNELLE\n(Art. L6353-1 et suivants du Code du travail)\n\nENTRE :\n${O}\nNDA : 11 75 XXXXX 75   SIRET : _______________\nReprésenté par : ${N}\n\nET :\nEntreprise : ___________________________\nSIRET : ________________________________\n\nOBJET : « ${TI} »\nDate : ${DA}   Durée : ___ h\nPrix HT : ____________________________\nTVA : ☐ Exonérée (Art. 261-4-4° CGI)   ☐ 20%\n\nAnnulation < 15 jours : 50% facturé\nAnnulation < 48 heures : 100% facturé\n\nFait le ____________\n${N}                    L'Entreprise`,
    sat:`QUESTIONNAIRE DE SATISFACTION\n${O}   ${TI}   ${DA}\n\nNotez de 1 (insuffisant) à 5 (excellent)\n\nCONTENU\n  Pertinence du programme       1  2  3  4  5\n  Adéquation avec vos besoins   1  2  3  4  5\n  Qualité des supports          1  2  3  4  5\n\nFORMATEUR\n  Clarté des explications       1  2  3  4  5\n  Maîtrise du sujet             1  2  3  4  5\n  Qualité de l'animation        1  2  3  4  5\n\nGLOBAL                          1  2  3  4  5\n\nRecommanderiez-vous ?   ☐ OUI   ☐ NON\n\nCommentaire : ___________________________`,
  };
  const venteContent={
    email:`Objet : Formation « Gestion des conflits » — [Ville]\n\nBonjour [Prénom],\n\nFormateur professionnel en IDF, je vous contacte au sujet d'un besoin récurrent : la gestion des tensions au travail.\n\nJe propose une sensibilisation de 3h :\n« Gestion des conflits en entreprise »\n\nVos collaborateurs repartent avec :\n• Méthode CNV/OSBD pour désamorcer les tensions\n• Posture assertive face aux situations difficiles\n• Outils applicables dès le lendemain\n\nFormat : présentiel dans vos locaux\n8-12 personnes · 1 200€ HT\nConvention de formation fournie.\n\n15 minutes cette semaine ?\n\n[Votre nom]\n[Organisme] — NDA : 11 75 XXXXX 75`,
    linkedin:`1er CONTACT :\n"Bonjour [Prénom], formateur conflits en IDF. J'ai une session de 3h disponible en [mois]. Sujet d'actualité dans votre équipe ?"\n\nRELANCE J+5 :\n"Bonjour [Prénom], je reviens sur mon message. Pas de pression — si ce n'est pas le bon moment, pas de souci."`,
    tel:`ACCROCHE (15s) :\n"Bonjour, formateur en IDF. Je travaille avec des entreprises de votre secteur sur la gestion des conflits. 2 minutes ?"\n\nDIAGNOSTIC :\n"Est-ce que la gestion des tensions dans vos équipes est quelque chose que vous ressentez en ce moment ?"\n\nCLOSING :\n"On se cale 15 min en visio cette semaine ?"\n\nOBJECTION budget :\n"Vous utilisez votre budget OPCO ? Les formations courtes passent généralement très bien."`,
    tarifs:`GRILLE TARIFAIRE COMPLÈTE\n\nStandard :\n  Sensibilisation 3h (8-12 pers.)  : 1 200€ HT\n  Formation 1 jour                 : 2 400€ HT\n  Formation 2 jours                : 4 200€ HT\n  Coaching manager                 :   250€/h\n  E-learning                       : 79-149€/pers\n\nSport & Mental :\n  Mindset de Champion (4h)         : 1 800€ HT\n  Dépression du Champion (3h)      : 2 000€ HT\n  Vie Saine Après (3h)             : 1 500€ HT\n  ELITE 360° (2 jours)             : 4 500€ HT\n  Coaching athlète individuel      : 350-500€/h\n\n──────────────────────────────────\n🎯 POUR 5 000€/MOIS :\n→ 4 sessions std × 1200€ = 4 800€\n→ 1 ELITE 360° + 1 std = 5 700€`,
  };

  const g="#C9A84C",gl="#E8C97A",gd="rgba(201,168,76,0.12)";
  const d="#0A0A0A",d2="#111",d3="#1A1A1A",d4="#222",d5="#2A2A2A";
  const t="#E8E0D0",tm="#B0A898",td="#8A8070";
  const ok="#4CAF82",ac="#4A7CFF";
  const card={background:d3,border:"1px solid rgba(255,255,255,.07)",borderRadius:12,padding:16,marginBottom:12};
  const btnG={background:g,color:d,border:"none",borderRadius:7,padding:"9px 16px",fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"inherit"};
  const btnO={background:"transparent",color:tm,border:"1px solid rgba(255,255,255,.12)",borderRadius:7,padding:"9px 16px",fontSize:12,cursor:"pointer",fontFamily:"inherit"};
  const tabB=(a)=>({padding:"8px 11px",background:"transparent",border:"none",borderBottom:`2px solid ${a?g:"transparent"}`,color:a?g:td,cursor:"pointer",fontSize:10,fontWeight:a?600:400,letterSpacing:".04em",textTransform:"uppercase",marginBottom:-1,fontFamily:"inherit",whiteSpace:"nowrap"});
  const inp={width:"100%",background:d4,border:"1px solid rgba(255,255,255,.08)",borderRadius:8,padding:"9px 12px",color:t,fontSize:13,outline:"none",boxSizing:"border-box",fontFamily:"inherit"};
  const chkB=(on)=>({width:15,height:15,borderRadius:3,border:`1.5px solid ${on?g:"rgba(201,168,76,.3)"}`,background:on?g:"transparent",display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,color:d,flexShrink:0,marginTop:2,cursor:"pointer"});
  const NAV=[{id:"dashboard",icon:"⚡",label:"Dashboard"},{id:"formations",icon:"📚",label:"Formations"},{id:"library",icon:"🗂️",label:"Centres"},{id:"assistant",icon:"🤖",label:"Assistant"},{id:"roadmap",icon:"🎯",label:"Roadmap"},{id:"profile",icon:"🏀",label:"Profil"}];

  if(selectedForm){
    const f=ALL_FORMATIONS.find(x=>x.id===selectedForm);
    if(!f){setSelectedForm(null);return null;}
    return (
      <>
        <style>{`*{box-sizing:border-box;margin:0;padding:0}html,body{height:100%;background:#0A0A0A;color:#E8E0D0;font-family:-apple-system,sans-serif;-webkit-font-smoothing:antialiased;overflow:hidden}::-webkit-scrollbar{width:3px}::-webkit-scrollbar-thumb{background:rgba(201,168,76,.2);border-radius:2px}@keyframes fi{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}.fi{animation:fi .2s ease}a{text-decoration:none}`}</style>
        <div style={{height:"100vh",display:"flex",flexDirection:"column"}}>
          <div style={{background:d2,borderBottom:"1px solid rgba(201,168,76,.12)",padding:"12px 16px",display:"flex",alignItems:"center",gap:12,flexShrink:0}}>
            <button onClick={()=>{setSelectedForm(null);setActiveModule(null);}} style={{width:34,height:34,borderRadius:8,background:d3,border:"1px solid rgba(255,255,255,.08)",color:t,cursor:"pointer",fontSize:16,display:"flex",alignItems:"center",justifyContent:"center"}}>←</button>
            <div style={{flex:1}}>
              <div style={{fontSize:15,fontWeight:700,color:t}}>{f.icon} {f.title}</div>
              <div style={{fontSize:11,color:td,marginTop:1}}>{f.subtitle} · <span style={{color:f.color,fontWeight:600}}>{f.price.split("·")[0].split("groupe")[0].trim()}</span></div>
            </div>
          </div>
          <div style={{flex:1,overflowY:"auto",padding:"14px 16px"}}>
            <div style={{background:`linear-gradient(135deg,${f.color}15,${d3})`,border:`1px solid ${f.color}30`,borderRadius:12,padding:"13px 15px",marginBottom:12}}>
              <div style={{fontSize:13,color:f.color,fontStyle:"italic",marginBottom:5}}>"{f.tagline}"</div>
              <div style={{fontSize:11,color:td,marginBottom:f.science?4:0}}>👥 {f.public}</div>
              {f.legal&&<div style={{fontSize:11,color:tm,marginBottom:f.science?4:0}}>⚖️ {f.legal}</div>}
              {f.science&&<div style={{fontSize:11,color:ac}}>🔬 {f.science}</div>}
            </div>
            {f.arguments&&<div style={{...card,borderLeft:`3px solid ${g}`}}>
              <div style={{fontSize:11,color:td,textTransform:"uppercase",letterSpacing:".07em",marginBottom:7}}>💰 Pourquoi c'est vendable</div>
              {f.arguments.map((a,i)=><div key={i} style={{fontSize:12,color:tm,padding:"3px 0",borderBottom:"1px solid rgba(255,255,255,.04)"}}>→ {a}</div>)}
            </div>}
            {f.tarifs&&<div style={{...card,borderLeft:`3px solid ${f.color}`}}>
              <div style={{fontSize:11,color:td,textTransform:"uppercase",letterSpacing:".07em",marginBottom:7}}>💶 Tarification</div>
              {Object.entries(f.tarifs).map(([k,v])=>(
                <div key={k} style={{display:"flex",justifyContent:"space-between",padding:"4px 0",borderBottom:"1px solid rgba(255,255,255,.04)"}}>
                  <span style={{fontSize:12,color:tm}}>{k}</span>
                  <span style={{fontSize:12,color:g,fontWeight:600}}>{v}</span>
                </div>
              ))}
            </div>}
            <div style={card}>
              <div style={{fontSize:11,color:td,textTransform:"uppercase",letterSpacing:".07em",marginBottom:8}}>🎯 Objectifs pédagogiques</div>
              {f.objectifs.map((o,i)=>(
                <div key={i} style={{display:"flex",gap:8,marginBottom:6,alignItems:"flex-start"}}>
                  <span style={{color:f.color,flexShrink:0,fontSize:11,marginTop:2}}>✦</span>
                  <span style={{fontSize:12,color:tm,lineHeight:1.55}}>{o}</span>
                </div>
              ))}
            </div>
            <div style={{fontSize:11,color:td,textTransform:"uppercase",letterSpacing:".1em",marginBottom:8}}>📋 Programme détaillé</div>
            {f.modules.map((m,i)=>(
              <div key={i} style={{...card,marginBottom:7,cursor:"pointer",borderLeft:`3px solid ${activeModule===i?f.color:"transparent"}`}} onClick={()=>setActiveModule(activeModule===i?null:i)}>
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                  <div style={{display:"flex",gap:9,alignItems:"center"}}>
                    <div style={{width:28,height:28,borderRadius:6,background:`${f.color}15`,border:`1px solid ${f.color}30`,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,color:f.color,fontSize:11,flexShrink:0}}>{m.num}</div>
                    <div>
                      <div style={{fontSize:13,fontWeight:600,color:t}}>{m.title}</div>
                      <div style={{fontSize:10,color:g,fontFamily:"monospace"}}>⏱ {m.duree}</div>
                    </div>
                  </div>
                  <span style={{color:td,fontSize:13,transform:activeModule===i?"rotate(90deg)":"none",transition:"transform .2s"}}>›</span>
                </div>
                {activeModule===i&&(
                  <div className="fi" style={{marginTop:10,paddingTop:10,borderTop:"1px solid rgba(255,255,255,.06)"}}>
                    <div style={{fontSize:10,color:td,textTransform:"uppercase",marginBottom:4}}>Contenu</div>
                    <div style={{fontSize:12,color:t,lineHeight:1.65,marginBottom:12}}>{m.contenu}</div>
                    
                    {m.guide&&(
                      <div style={{background:"rgba(255,255,255,.03)",border:`1px solid ${f.color}40`,borderRadius:8,padding:"12px 14px",marginBottom:12,borderLeft:`3px solid ${f.color}`}}>
                        <div style={{fontSize:11,color:f.color,fontWeight:700,marginBottom:10,textTransform:"uppercase",letterSpacing:".05em"}}>💡 Guide de Présentation</div>
                        
                        <div style={{marginBottom:8}}>
                          <div style={{fontSize:10,color:td,textTransform:"uppercase",marginBottom:3}}>🔥 L'Accroche</div>
                          <div style={{fontSize:12,color:t,fontStyle:"italic"}}>{m.guide.accroche}</div>
                        </div>
                        
                        <div style={{marginBottom:8}}>
                          <div style={{fontSize:10,color:td,textTransform:"uppercase",marginBottom:3}}>🔬 Études & Science</div>
                          <div style={{fontSize:12,color:tm,lineHeight:1.55}}>{m.guide.etudes}</div>
                        </div>
                        
                        <div style={{marginBottom:8}}>
                          <div style={{fontSize:10,color:td,textTransform:"uppercase",marginBottom:3}}>🗣️ Posture Formateur</div>
                          <div style={{fontSize:12,color:ok,lineHeight:1.55}}>{m.guide.posture}</div>
                        </div>
                        
                        <div>
                          <div style={{fontSize:10,color:td,textTransform:"uppercase",marginBottom:3}}>🛡️ Objections Fréquentes</div>
                          <div style={{fontSize:12,color:"#E05555",lineHeight:1.55}}>{m.guide.objections}</div>
                        </div>
                      </div>
                    )}

                    <div style={{fontSize:10,color:td,textTransform:"uppercase",marginBottom:4}}>Méthode</div>
                    <div style={{fontSize:12,color:ok,marginBottom:m.exemples?8:0}}>{m.methode}</div>
                    {m.exemples&&<><div style={{fontSize:10,color:td,textTransform:"uppercase",marginBottom:4}}>Exemples réels</div><div style={{fontSize:12,color:g,fontStyle:"italic"}}>{m.exemples}</div></>}
                  </div>
                )}
              </div>
            ))}
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:12}}>
              <div style={card}><div style={{fontSize:11,color:td,textTransform:"uppercase",marginBottom:6}}>🛠 Matériel</div>{f.materiel.map((m,i)=><div key={i} style={{fontSize:11,color:tm,padding:"2px 0"}}>• {m}</div>)}</div>
              <div style={card}><div style={{fontSize:11,color:td,textTransform:"uppercase",marginBottom:6}}>📄 Livrables</div>{f.livrables.map((l,i)=><div key={i} style={{fontSize:11,color:tm,padding:"2px 0"}}>• {l}</div>)}</div>
            </div>
            <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:24}}>
              <button style={{...btnG,flex:1}} onClick={()=>{
                const txt=`PROGRAMME — ${f.title}\n${f.subtitle} · ${f.price}\n\n"${f.tagline}"\nPublic : ${f.public}\n\nOBJECTIFS :\n${f.objectifs.map(o=>"• "+o).join("\n")}\n\nPROGRAMME :\n${f.modules.map(m=>`\nMODULE ${m.num} — ${m.title} (${m.duree})\n${m.contenu}\nMéthode : ${m.methode}`).join("\n")}\n\nMATÉRIEL :\n${f.materiel.map(m=>"• "+m).join("\n")}\n\nLIVRABLES :\n${f.livrables.map(l=>"• "+l).join("\n")}`;
                navigator.clipboard?.writeText(txt);
              }}>📋 Copier le programme complet</button>
              <button style={btnO} onClick={()=>window.print()}>🖨️</button>
            </div>
          </div>
        </div>
      </>
    );
  }

  const filteredLib=LIBRARY.filter(f=>{
    const ms=libSearch===""||f.name.toLowerCase().includes(libSearch.toLowerCase())||f.formations.some(fm=>fm.toLowerCase().includes(libSearch.toLowerCase()));
    return matchCat(f,libCat,saved)&&ms;
  });

  return (
    <>
      <Analytics />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        html,body{height:100%;overflow:hidden;background:#0A0A0A}
        body{color:#E8E0D0;font-family:'DM Sans',-apple-system,sans-serif;-webkit-font-smoothing:antialiased}
        ::-webkit-scrollbar{width:3px}::-webkit-scrollbar-thumb{background:rgba(201,168,76,.2);border-radius:2px}
        @keyframes fi{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}
        @keyframes pulse{0%,100%{opacity:.25;transform:scale(.7)}50%{opacity:1;transform:scale(1)}}
        .fi{animation:fi .2s ease}
        .nb{display:flex;flex-direction:column;align-items:center;gap:3px;flex:1;padding:8px 4px;background:transparent;border:none;cursor:pointer;font-family:inherit}
        .chip{padding:5px 10px;background:#1A1A1A;border:1px solid rgba(255,255,255,.07);border-radius:20px;font-size:10px;color:#8A8070;cursor:pointer;font-family:inherit;white-space:nowrap}
        .chip:hover{border-color:#C9A84C;color:#C9A84C}
        a{text-decoration:none}
        button{transition:all .15s}
        input:focus,textarea:focus{border-color:rgba(201,168,76,.45)!important;outline:none}
      `}</style>

      <div style={{display:"flex",flexDirection:"column",height:"100vh"}}>
        <div style={{background:d2,borderBottom:"1px solid rgba(201,168,76,.12)",padding:"0 16px",height:48,display:"flex",alignItems:"center",justifyContent:"space-between",flexShrink:0}}>
          <div style={{fontFamily:"'Playfair Display',serif",fontSize:17,fontWeight:900,color:g}}>Formation<span style={{color:t,fontWeight:700}}>Pro</span></div>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            {savedCount>0&&<span style={{background:gd,color:g,border:"1px solid rgba(201,168,76,.3)",borderRadius:20,padding:"2px 8px",fontSize:11,fontWeight:600}}>⭐ {savedCount}</span>}
            <span style={{fontSize:10,color:td,fontFamily:"'DM Mono',monospace"}}>{pct}%</span>
          </div>
        </div>

        <div style={{flex:1,overflow:"hidden",minHeight:0}}>

          {page==="dashboard"&&(
            <div className="fi" style={{height:"100%",overflowY:"auto",padding:"14px 16px"}}>

              {/* HERO */}
              <div style={{background:`linear-gradient(135deg,${d3},${d2})`,border:"1px solid rgba(201,168,76,.2)",borderRadius:14,padding:"18px",marginBottom:12,position:"relative",overflow:"hidden"}}>
                <div style={{position:"absolute",right:-8,top:-15,fontFamily:"serif",fontSize:80,fontWeight:900,color:"rgba(201,168,76,.04)",lineHeight:1}}>€</div>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:18,fontWeight:900,marginBottom:4}}>Tiegbe Bamba <span style={{color:g}}>— Plan 10 000€</span></div>
                <div style={{fontSize:12,color:td,lineHeight:1.6,marginBottom:14}}>Ex-joueur pro · 5 continents · Master Communication · 5 business · <strong style={{color:g}}>0€ à investir grâce au CPF</strong></div>
                <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                  <button style={btnG} onClick={()=>setPage("profile")}>🏀 Mon Profil complet</button>
                  <button style={btnO} onClick={()=>setPage("assistant")}>🤖 Assistant</button>
                </div>
              </div>

              {/* PLAN PREMIER 10 000€ */}
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:14,fontWeight:700,color:g,marginBottom:10}}>🎯 Plan Premier 10 000€ — Voie Recommandée</div>

              {/* CPF PLAN */}
              <div style={{...card,borderLeft:"4px solid #FFD700",background:"rgba(255,215,0,.03)"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
                  <div style={{fontSize:13,fontWeight:700,color:"#FFD700"}}>💳 Tes 1 500€ CPF — Plan optimal</div>
                  <span style={{fontSize:10,padding:"2px 8px",borderRadius:10,background:"rgba(255,215,0,.12)",color:"#FFD700",border:"1px solid rgba(255,215,0,.3)"}}>0€ de ta poche</span>
                </div>
                <div style={{fontSize:12,color:td,marginBottom:10}}>Ces 3 formations en parallèle de ton activité → multiplient ta valeur × 3</div>
                {[
                  ["1","🎓 CNV — La Coop CNV","~600€","2 jours · En ligne · ✅ CPF","Boost ton Master Communication → vendre la formation Conflits à 1200€","PRIORITÉ MAX · Commence cette semaine","#4CAF82"],
                  ["2","🧯 SST Sauveteur Secouriste","~300€","2 jours · FMS Saint-Denis 01 48 20 10 00","Certification INRS → dispenser SST en entreprise → 600-1200€/session","2ème priorité · Appel lundi","#4A7CFF"],
                  ["3","🧘 Gestes & Postures PRAP","~400€","2 jours · ALERTIS ou Protectup","Obligatoire logistique/BTP/santé · Se vend tout seul","3ème priorité","#C9A84C"],
                ].map(([n,nom,cout,duree,gain,timing,col])=>(
                  <div key={n} style={{display:"flex",gap:10,padding:"9px 0",borderBottom:"1px solid rgba(255,255,255,.04)",alignItems:"flex-start"}}>
                    <div style={{width:22,height:22,borderRadius:5,background:`${col}25`,border:`1px solid ${col}50`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,color:col,flexShrink:0}}>{n}</div>
                    <div style={{flex:1}}>
                      <div style={{fontSize:12,fontWeight:600,color:t,marginBottom:1}}>{nom}</div>
                      <div style={{fontSize:11,color:td,marginBottom:2}}>{duree}</div>
                      <div style={{fontSize:11,color:ok}}>→ {gain}</div>
                      <div style={{fontSize:10,color:col,marginTop:2,fontWeight:600}}>{timing}</div>
                    </div>
                    <div style={{fontSize:11,color:"#FFD700",fontWeight:700,fontFamily:"monospace",flexShrink:0}}>{cout}</div>
                  </div>
                ))}
                <div style={{marginTop:8,padding:"8px 10px",background:"rgba(255,215,0,.06)",borderRadius:8}}>
                  <div style={{fontSize:11,color:"#FFD700",fontWeight:600}}>Total : ~1 300€ sur 1 500€ CPF</div>
                  <div style={{fontSize:11,color:tm,marginTop:2}}>Reste ~200€ → matériel pédagogique (extincteur démo, mannequin RCP, fiches)</div>
                </div>
              </div>

              {/* Voie 1 — Immédiate */}
              <div style={{...card,borderLeft:"4px solid #C9A84C",background:"rgba(201,168,76,.04)"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
                  <div style={{fontSize:13,fontWeight:700,color:t}}>🚀 VOIE 1 — Revenus immédiats</div>
                  <span style={{fontSize:10,padding:"2px 8px",borderRadius:10,background:"rgba(201,168,76,.15)",color:g,border:"1px solid rgba(201,168,76,.3)"}}>Dès maintenant</span>
                </div>
                <div style={{fontSize:12,color:td,marginBottom:10}}>Utilise tes compétences existantes — 0€ à dépenser, tu peux facturer dès cette semaine</div>
                {[
                  ["🧹","Formation Agent d'Entretien","Ton expertise 4 ans + 1000 sessions · Cibler hôtels, résidences, conciergeries IDF","1 200€/groupe · 2j","Rentable immédiatement"],
                  ["🏀","Camps basket + Module Mindset 1h","Intègre 1h mental dans chaque camp → valeur perçue × 2","+ 100-200€/participant","Dès prochain camp"],
                  ["🧠","Sensibilisation Mindset (3h)","Clubs amateurs, académies, lycées sportifs · Ton parcours = crédibilité immédiate","1 800€/groupe","Sans diplôme supplémentaire"],
                ].map(([icon,titre,desc,prix,timing])=>(
                  <div key={titre} style={{display:"flex",gap:10,padding:"8px 0",borderBottom:"1px solid rgba(255,255,255,.05)",alignItems:"flex-start"}}>
                    <span style={{fontSize:18,flexShrink:0,width:24,textAlign:"center"}}>{icon}</span>
                    <div style={{flex:1}}>
                      <div style={{fontSize:12,fontWeight:600,color:t,marginBottom:1}}>{titre}</div>
                      <div style={{fontSize:11,color:td}}>{desc}</div>
                      <div style={{fontSize:10,color:ok,marginTop:2}}>{timing}</div>
                    </div>
                    <div style={{fontSize:11,color:g,fontWeight:700,fontFamily:"monospace",flexShrink:0,textAlign:"right"}}>{prix}</div>
                  </div>
                ))}
                <div style={{marginTop:8,padding:"8px 10px",background:"rgba(201,168,76,.08)",borderRadius:8}}>
                  <div style={{fontSize:11,color:g,fontWeight:600}}>💰 Calcul mois 1 possible :</div>
                  <div style={{fontSize:11,color:tm,marginTop:3}}>2 formations ménage (1200€) + 1 camp basket 10 jeunes (500€) + 1 sensibilisation mindset (1800€) = <strong style={{color:g}}>3 500€ mois 1</strong></div>
                </div>
              </div>

              {/* VOIE 2 — Moyen terme */}
              <div style={{...card,borderLeft:"4px solid #4A7CFF",background:"rgba(74,124,255,.03)"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
                  <div style={{fontSize:13,fontWeight:700,color:ac}}>📈 VOIE 2 — Accélérateur mois 2-4</div>
                  <span style={{fontSize:10,padding:"2px 8px",borderRadius:10,background:"rgba(74,124,255,.12)",color:ac,border:"1px solid rgba(74,124,255,.3)"}}>Après CPF</span>
                </div>
                <div style={{fontSize:12,color:td,marginBottom:10}}>Une fois CNV + SST obtenus → ces formations décuplent tes revenus</div>
                {[
                  ["🤝","Gestion des Conflits (CNV boost)","Avec ta certification CNV → formation complète légitimée · Master Communication = expertise unique","1 200€/session · OPCO finance"],
                  ["🔥","Évacuation Incendie","Obligation légale → toutes les entreprises en ont besoin · Zéro concurrence locale","900€/session · Renouvellement annuel"],
                  ["🎤","Formation : Devenir Meilleur Formateur","Vendre cette formation à d'autres formateurs débutants · Tu es l'expert multi-domaines","1 400€/groupe"],
                ].map(([icon,titre,desc,prix])=>(
                  <div key={titre} style={{display:"flex",gap:10,padding:"7px 0",borderBottom:"1px solid rgba(255,255,255,.04)",alignItems:"flex-start"}}>
                    <span style={{fontSize:16,flexShrink:0,width:22,textAlign:"center"}}>{icon}</span>
                    <div style={{flex:1}}>
                      <div style={{fontSize:12,fontWeight:600,color:t,marginBottom:1}}>{titre}</div>
                      <div style={{fontSize:11,color:td}}>{desc}</div>
                    </div>
                    <div style={{fontSize:11,color:ac,fontWeight:700,fontFamily:"monospace",flexShrink:0,textAlign:"right"}}>{prix}</div>
                  </div>
                ))}
              </div>

              {/* VOIE 3 — Scaling sport */}
              <div style={{...card,borderLeft:"4px solid #4CAF82",background:"rgba(76,175,130,.03)"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
                  <div style={{fontSize:13,fontWeight:700,color:ok}}>🏆 VOIE 3 — Scaling Sport (mois 3-6)</div>
                  <span style={{fontSize:10,padding:"2px 8px",borderRadius:10,background:"rgba(76,175,130,.12)",color:ok,border:"1px solid rgba(76,175,130,.3)"}}>Premium</span>
                </div>
                <div style={{fontSize:12,color:td,marginBottom:10}}>Ton avantage concurrentiel UNIQUE : ex-pro 5 continents + formateur certifié + entrepreneur</div>
                {[
                  ["🏟️","ELITE 360° (2j clubs pro)","AFDAS finance 100% · Clubs Pro A/B · 1 club = 10 recommandations dans le milieu","4 500€ HT"],
                  ["🏀","Formation Coach Pro","500 000 licenciés basket · 80% encadrés par bénévoles · Marché immense","1 600€/groupe"],
                  ["🏟️","Formation Club Pro","4 000 clubs basket en France · Aucun formateur ne propose ça aujourd'hui","2 000€/groupe"],
                ].map(([icon,titre,desc,prix])=>(
                  <div key={titre} style={{display:"flex",gap:10,padding:"7px 0",borderBottom:"1px solid rgba(255,255,255,.04)",alignItems:"flex-start"}}>
                    <span style={{fontSize:16,flexShrink:0,width:22,textAlign:"center"}}>{icon}</span>
                    <div style={{flex:1}}>
                      <div style={{fontSize:12,fontWeight:600,color:t,marginBottom:1}}>{titre}</div>
                      <div style={{fontSize:11,color:td}}>{desc}</div>
                    </div>
                    <div style={{fontSize:11,color:ok,fontWeight:700,fontFamily:"monospace",flexShrink:0,textAlign:"right"}}>{prix}</div>
                  </div>
                ))}
              </div>

              {/* CALCUL 10K */}
              <div style={{...card,border:"1px solid rgba(201,168,76,.3)",background:"linear-gradient(135deg,rgba(201,168,76,.08),transparent)"}}>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:14,fontWeight:700,color:g,marginBottom:10}}>📊 Comment atteindre 10 000€/mois</div>
                {[
                  ["Mois 1","Ménage × 2 + Camp basket + Mindset sensib.","3 500€"],
                  ["Mois 2","Mois 1 + Conflits CNV × 2 + SST × 1","6 000€"],
                  ["Mois 3","Mois 2 + Incendie × 2 + Postures × 1","8 400€"],
                  ["Mois 4-5","+ ELITE 360° (1 club) + Coach Pro × 1","10 000€+ 🎉"],
                ].map(([mois,desc,total])=>(
                  <div key={mois} style={{display:"flex",gap:10,padding:"8px 0",borderBottom:"1px solid rgba(255,255,255,.05)",alignItems:"flex-start"}}>
                    <div style={{width:52,flexShrink:0,fontSize:10,color:g,fontWeight:700,fontFamily:"monospace",paddingTop:2}}>{mois}</div>
                    <div style={{flex:1,fontSize:11,color:tm,lineHeight:1.5}}>{desc}</div>
                    <div style={{fontSize:13,color:g,fontWeight:900,fontFamily:"'Playfair Display',serif",flexShrink:0}}>{total}</div>
                  </div>
                ))}
                <div style={{marginTop:10,padding:"9px 12px",background:"rgba(201,168,76,.1)",borderRadius:8,border:"1px solid rgba(201,168,76,.2)"}}>
                  <div style={{fontSize:12,color:g,fontWeight:700,marginBottom:2}}>🔑 La clé : commencer maintenant sans attendre</div>
                  <div style={{fontSize:11,color:tm,lineHeight:1.6}}>Tu as DÉJÀ tout ce qu'il faut pour démarrer cette semaine. La CNV avec ton Master Communication est ta super-arme — aucun autre formateur en France n'a ton profil complet.</div>
                </div>
              </div>

              {/* ACTIONS URGENTES */}
              <div style={card}>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:13,fontWeight:700,marginBottom:8}}>✅ Actions cette semaine — dans l'ordre</div>
                {[
                  ["a1","Vérifier solde CPF → moncompteformation.gouv.fr"],
                  ["a2","S'inscrire CNV → lacoopcnv.com (1ère priorité — CPF)"],
                  ["a3","Appeler FMS 01 48 20 10 00 pour SST (CPF)"],
                  ["a4","Créer auto-entreprise → autoentrepreneur.urssaf.fr (Code APE 85.59A)"],
                  ["a5","Contacter 3 hôtels IDF pour formation ménage (appel direct)"],
                  ["a6","Poster sur LinkedIn : 'Ex-joueur pro + formateur — disponible'"],
                  ["a7","Préparer 4 documents officiels (Convention, Émargement, Attestation, Satisfaction)"],
                  ["a8","Appeler FIDUCIAL FPSG 01 49 21 15 15 → partenariat Conflits"],
                ].map(([id,txt])=>(
                  <div key={id} onClick={()=>chk(id)} style={{display:"flex",gap:9,padding:"7px 0",borderBottom:"1px solid rgba(255,255,255,.04)",cursor:"pointer",alignItems:"flex-start"}}>
                    <div style={chkB(checked[id])}>{checked[id]?"✓":""}</div>
                    <span style={{fontSize:12,color:checked[id]?td:tm,textDecoration:checked[id]?"line-through":"none",lineHeight:1.5}}>{txt}</span>
                  </div>
                ))}
              </div>

            </div>
          )}

          {page==="formations"&&(
            <div className="fi" style={{height:"100%",display:"flex",flexDirection:"column",minHeight:0}}>
              <div style={{background:d2,borderBottom:"1px solid rgba(255,255,255,.06)",display:"flex",flexShrink:0,overflowX:"auto"}}>
                <button style={tabB(formSub==="standard")} onClick={()=>setFormSub("standard")}>📋 Standards</button>
                <button style={tabB(formSub==="menage")} onClick={()=>setFormSub("menage")}>🧹 Ménage</button>
                <button style={tabB(formSub==="sport")} onClick={()=>setFormSub("sport")}>🏆 Sport Mental</button>
                <button style={tabB(formSub==="skills")} onClick={()=>setFormSub("skills")}>⚡ Skills</button>
              </div>
              <div style={{flex:1,overflowY:"auto",padding:"12px 16px",minHeight:0}}>
                {formSub==="standard"&&(
                  <div>
                    <div style={{fontSize:10,color:td,letterSpacing:"2px",textTransform:"uppercase",marginBottom:12,fontFamily:"'DM Mono',monospace"}}>Tap pour voir le programme complet</div>
                    {ALL_FORMATIONS.filter(f=>f.cat==="standard").map(f=>(
                      <div key={f.id} onClick={()=>setSelectedForm(f.id)} style={{...card,cursor:"pointer",borderLeft:`3px solid ${f.color}`}}>
                        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:7}}>
                          <div><span style={{fontSize:18}}>{f.icon}</span> <span style={{fontFamily:"'Playfair Display',serif",fontSize:14,fontWeight:700,color:t}}>{f.title}</span></div>
                          <span style={{fontFamily:"'Playfair Display',serif",fontSize:14,fontWeight:700,color:f.color}}>{f.price}</span>
                        </div>
                        <div style={{fontSize:11,color:td,marginBottom:8}}>{f.subtitle} · {f.public.split("—")[0].split(",")[0]}</div>
                        <div style={{display:"flex",flexWrap:"wrap",gap:4,marginBottom:6}}>
                          {f.modules.map((m,i)=><span key={i} style={{padding:"2px 7px",background:`${f.color}10`,border:`1px solid ${f.color}20`,borderRadius:20,fontSize:10,color:f.color}}>{m.num} · {m.title}</span>)}
                        </div>
                        <div style={{fontSize:11,color:td}}>Voir programme complet + tarifs →</div>
                      </div>
                    ))}
                  </div>
                )}
                {formSub==="sport"&&(
                  <div>
                    <div style={{...card,background:"linear-gradient(135deg,rgba(201,168,76,.07),transparent)",border:"1px solid rgba(201,168,76,.2)"}}>
                      <div style={{fontFamily:"'Playfair Display',serif",fontSize:14,fontWeight:900,color:g,marginBottom:5}}>🏆 Sport & Santé Mentale</div>
                      <div style={{fontSize:12,color:tm,lineHeight:1.6,marginBottom:7}}>4 formations originales basées sur des études scientifiques. Créneau unique sur le marché français. AFDAS finance pour les clubs pro.</div>
                      <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
                        <span style={{padding:"2px 7px",borderRadius:20,fontSize:10,background:gd,color:g,border:"1px solid rgba(201,168,76,.3)"}}>NBA · Football · Rugby · Athlétisme</span>
                        <span style={{padding:"2px 7px",borderRadius:20,fontSize:10,background:"rgba(76,175,130,.1)",color:ok,border:"1px solid rgba(76,175,130,.3)"}}>AFDAS finance</span>
                      </div>
                    </div>
                    {ALL_FORMATIONS.filter(f=>f.cat==="sport").map(f=>(
                      <div key={f.id} onClick={()=>setSelectedForm(f.id)} style={{...card,cursor:"pointer",borderLeft:`3px solid ${f.color}`}}>
                        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:5}}>
                          <span style={{fontSize:22}}>{f.icon}</span>
                          {f.id==="elite360"&&<span style={{padding:"2px 7px",borderRadius:20,fontSize:10,background:"rgba(255,215,0,.1)",color:"#FFD700",border:"1px solid rgba(255,215,0,.3)"}}>⭐ Flagship</span>}
                        </div>
                        <div style={{fontFamily:"'Playfair Display',serif",fontSize:14,fontWeight:700,color:t,marginBottom:2}}>{f.title}</div>
                        <div style={{fontSize:11,color:td,marginBottom:4}}>{f.subtitle}</div>
                        <div style={{fontSize:12,color:f.color,fontWeight:600,marginBottom:6}}>{f.price.split("·")[0].trim()}</div>
                        <div style={{fontSize:12,color:tm,fontStyle:"italic",marginBottom:7}}>"{f.tagline}"</div>
                        <div style={{display:"flex",flexWrap:"wrap",gap:4,marginBottom:6}}>
                          {f.modules.map((m,i)=><span key={i} style={{padding:"2px 6px",background:`${f.color}10`,border:`1px solid ${f.color}20`,borderRadius:20,fontSize:10,color:f.color}}>{m.num} · {m.title}</span>)}
                        </div>
                        <div style={{fontSize:11,color:td}}>Voir programme + études scientifiques →</div>
                      </div>
                    ))}
                  </div>
                )}
                {formSub==="menage"&&(
                  <div>
                    <div style={{...card,background:"linear-gradient(135deg,rgba(6,182,212,.07),transparent)",border:"1px solid rgba(6,182,212,.2)"}}>
                      <div style={{fontFamily:"'Playfair Display',serif",fontSize:14,fontWeight:900,color:"#06B6D4",marginBottom:5}}>🧹 Ménage & Entretien Professionnel</div>
                      <div style={{fontSize:12,color:tm,lineHeight:1.6,marginBottom:7}}>Basé sur 2 ans d'activité et <strong style={{color:"#06B6D4"}}>400+ sessions réalisées</strong> en commerces, hôtels, conciergeries et particuliers. Une expertise terrain unique pour former les agents d'entretien aux standards professionnels.</div>
                      <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
                        <span style={{padding:"2px 7px",borderRadius:20,fontSize:10,background:"rgba(6,182,212,.1)",color:"#06B6D4",border:"1px solid rgba(6,182,212,.3)"}}>Hôtellerie · Commerce · Conciergerie</span>
                        <span style={{padding:"2px 7px",borderRadius:20,fontSize:10,background:"rgba(76,175,130,.1)",color:ok,border:"1px solid rgba(76,175,130,.3)"}}>OPCO Akto finance</span>
                      </div>
                    </div>
                    {ALL_FORMATIONS.filter(f=>f.cat==="menage").map(f=>(
                      <div key={f.id} onClick={()=>setSelectedForm(f.id)} style={{...card,cursor:"pointer",borderLeft:`3px solid ${f.color}`}}>
                        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:6}}>
                          <span style={{fontSize:22}}>{f.icon}</span>
                          <span style={{padding:"2px 7px",borderRadius:20,fontSize:10,background:"rgba(6,182,212,.1)",color:"#06B6D4",border:"1px solid rgba(6,182,212,.3)"}}>400+ sessions</span>
                        </div>
                        <div style={{fontFamily:"'Playfair Display',serif",fontSize:14,fontWeight:700,color:t,marginBottom:2}}>{f.title}</div>
                        <div style={{fontSize:11,color:td,marginBottom:4}}>{f.subtitle}</div>
                        <div style={{fontSize:12,color:f.color,fontWeight:600,marginBottom:6}}>{f.price.split("·")[0].trim()}</div>
                        <div style={{fontSize:12,color:tm,fontStyle:"italic",marginBottom:7}}>"{f.tagline}"</div>
                        <div style={{display:"flex",flexWrap:"wrap",gap:4,marginBottom:6}}>
                          {f.modules.map((m,i)=><span key={i} style={{padding:"2px 6px",background:`${f.color}10`,border:`1px solid ${f.color}20`,borderRadius:20,fontSize:10,color:f.color}}>{m.num} · {m.title}</span>)}
                        </div>
                        <div style={{fontSize:11,color:td}}>Voir programme complet + tarifs →</div>
                      </div>
                    ))}
                  </div>
                )}
                {formSub==="skills"&&(
                  <div>
                    <div style={{...card,background:"linear-gradient(135deg,rgba(245,158,11,.07),transparent)",border:"1px solid rgba(245,158,11,.2)"}}>
                      <div style={{fontFamily:"'Playfair Display',serif",fontSize:14,fontWeight:900,color:"#F59E0B",marginBottom:5}}>⚡ Formations SKILLS — Unique en France</div>
                      <div style={{fontSize:12,color:tm,lineHeight:1.6,marginBottom:7}}>3 formations basées sur ton expérience unique : ex-joueur pro 5 continents + entrepreneur + formateur. <strong style={{color:"#F59E0B"}}>Aucun concurrent en France ne propose cette combinaison.</strong></div>
                      <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
                        <span style={{padding:"2px 7px",borderRadius:20,fontSize:10,background:"rgba(245,158,11,.1)",color:"#F59E0B",border:"1px solid rgba(245,158,11,.3)"}}>Formateurs · Coachs · Dirigeants</span>
                        <span style={{padding:"2px 7px",borderRadius:20,fontSize:10,background:"rgba(76,175,130,.1)",color:ok,border:"1px solid rgba(76,175,130,.3)"}}>AFDAS finance</span>
                      </div>
                    </div>
                    {ALL_FORMATIONS.filter(f=>f.cat==="skills").map(f=>(
                      <div key={f.id} onClick={()=>setSelectedForm(f.id)} style={{...card,cursor:"pointer",borderLeft:`3px solid ${f.color}`}}>
                        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:5}}>
                          <span style={{fontSize:22}}>{f.icon}</span>
                          <span style={{fontSize:12,color:f.color,fontWeight:700}}>{f.price.split("·")[0].trim()}</span>
                        </div>
                        <div style={{fontFamily:"'Playfair Display',serif",fontSize:14,fontWeight:700,color:t,marginBottom:2}}>{f.title}</div>
                        <div style={{fontSize:11,color:td,marginBottom:4}}>{f.subtitle}</div>
                        <div style={{fontSize:12,color:tm,fontStyle:"italic",marginBottom:7}}>"{f.tagline}"</div>
                        <div style={{display:"flex",flexWrap:"wrap",gap:4,marginBottom:6}}>
                          {f.modules.map((m,i)=><span key={i} style={{padding:"2px 6px",background:`${f.color}10`,border:`1px solid ${f.color}20`,borderRadius:20,fontSize:10,color:f.color}}>{m.num} · {m.title}</span>)}
                        </div>
                        <div style={{fontSize:11,color:td}}>Voir programme complet →</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {page==="library"&&(
            <div className="fi" style={{height:"100%",display:"flex",flexDirection:"column",minHeight:0}}>
              <div style={{padding:"10px 16px",background:d2,borderBottom:"1px solid rgba(255,255,255,.06)",flexShrink:0}}>
                <input value={libSearch} onChange={e=>setLibSearch(e.target.value)} placeholder="🔍 Rechercher..." style={{...inp,marginBottom:7,background:d3}}/>
                <div style={{display:"flex",gap:4,overflowX:"auto",paddingBottom:2}}>
                  {CATS.map(c=>(
                    <button key={c} onClick={()=>setLibCat(c)} style={{padding:"4px 8px",borderRadius:20,fontSize:10,fontWeight:libCat===c?600:400,cursor:"pointer",border:`1px solid ${libCat===c?g:"rgba(255,255,255,.1)"}`,background:libCat===c?gd:"transparent",color:libCat===c?g:td,fontFamily:"inherit",whiteSpace:"nowrap",flexShrink:0}}>{c}</button>
                  ))}
                </div>
              </div>
              <div style={{flex:1,overflowY:"auto",padding:"10px 16px",minHeight:0}}>
                <div style={{fontSize:10,color:td,marginBottom:8,fontFamily:"'DM Mono',monospace"}}>{filteredLib.length} centre{filteredLib.length>1?"s":""} {savedCount>0&&<span style={{color:g}}>· ⭐ {savedCount} sauvegardé{savedCount>1?"s":""}</span>}</div>
                {filteredLib.map(f=>(
                  <div key={f.id} style={{background:saved[f.id]?"rgba(201,168,76,.04)":d3,border:`1px solid ${saved[f.id]?"rgba(201,168,76,.35)":"rgba(255,255,255,.07)"}`,borderRadius:12,padding:"12px 14px",marginBottom:8,borderLeft:`3px solid ${f.highlight?"#FFD700":f.color}`}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:7}}>
                      <div style={{flex:1}}>
                        <div style={{fontSize:13,fontWeight:700,color:t,marginBottom:2}}>{f.name}</div>
                        <div style={{fontSize:11,color:td}}>📍 {f.adresse}</div>
                        <div style={{fontSize:11,color:g,marginTop:1}}>📞 {f.tel}</div>
                      </div>
                      <button onClick={()=>toggleSave(f.id)} style={{padding:"4px 8px",borderRadius:20,fontSize:11,fontWeight:600,cursor:"pointer",fontFamily:"inherit",border:`1px solid ${saved[f.id]?g:"rgba(255,255,255,.12)"}`,background:saved[f.id]?g:"transparent",color:saved[f.id]?d:td,marginLeft:8,flexShrink:0}}>{saved[f.id]?"⭐":"☆"}</button>
                    </div>
                    <div style={{display:"flex",gap:4,marginBottom:7,flexWrap:"wrap"}}>
                      <span style={{padding:"2px 6px",borderRadius:20,fontSize:9,fontWeight:600,background:"rgba(201,168,76,.1)",color:g,border:"1px solid rgba(201,168,76,.25)"}}>{f.dist}</span>
                      {f.qualiopi&&<span style={{padding:"2px 6px",borderRadius:20,fontSize:9,fontWeight:600,background:"rgba(76,175,130,.1)",color:ok,border:"1px solid rgba(76,175,130,.25)"}}>✅ Qualiopi</span>}
                      {f.cpf&&<span style={{padding:"2px 6px",borderRadius:20,fontSize:9,fontWeight:600,background:"rgba(74,124,255,.1)",color:ac,border:"1px solid rgba(74,124,255,.25)"}}>💳 CPF</span>}
                      {f.highlight&&<span style={{padding:"2px 6px",borderRadius:20,fontSize:9,fontWeight:600,background:"rgba(255,215,0,.1)",color:"#FFD700",border:"1px solid rgba(255,215,0,.3)"}}>⭐ Top</span>}
                    </div>
                    <div style={{cursor:"pointer"}} onClick={()=>setExpandedOrg(expandedOrg===f.id?null:f.id)}>
                      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                        <div style={{fontSize:11,color:td}}>{f.formations.slice(0,2).join(" · ")}{f.formations.length>2?` +${f.formations.length-2}`:""}</div>
                        <span style={{color:td,fontSize:12,transform:expandedOrg===f.id?"rotate(90deg)":"none",transition:"transform .2s"}}>›</span>
                      </div>
                      {expandedOrg===f.id&&(
                        <div className="fi" style={{marginTop:9,paddingTop:9,borderTop:"1px solid rgba(255,255,255,.06)"}}>
                          <div style={{display:"flex",flexWrap:"wrap",gap:4,marginBottom:7}}>
                            {f.formations.map((fm,i)=><span key={i} style={{padding:"2px 7px",background:`${f.color}10`,border:`1px solid ${f.color}20`,borderRadius:20,fontSize:10,color:f.color}}>{fm}</span>)}
                          </div>
                          <div style={{fontSize:11,color:tm,fontStyle:"italic",marginBottom:8}}>💡 {f.note}</div>
                          <div style={{display:"flex",gap:7}}>
                            <a href={`tel:${f.tel}`}><button style={{...btnG,padding:"6px 12px",fontSize:11}}>📞 Appeler</button></a>
                            <a href={`https://${f.web}`} target="_blank" rel="noreferrer"><button style={{...btnO,padding:"6px 12px",fontSize:11}}>🌐 Site</button></a>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                {filteredLib.length===0&&<div style={{textAlign:"center",padding:"40px 20px",color:td}}><div style={{fontSize:32,marginBottom:10}}>🔍</div><div>Aucun centre trouvé.</div></div>}
              </div>
            </div>
          )}

          {page==="assistant"&&(
            <div style={{display:"flex",flexDirection:"column",height:"100%"}}>
              <div style={{padding:"8px 14px",background:d2,borderBottom:"1px solid rgba(255,255,255,.05)",display:"flex",flexWrap:"wrap",gap:5,flexShrink:0}}>
                {QUICK.map(([l,q])=><button key={l} className="chip" onClick={()=>send(q)}>{l}</button>)}
              </div>
              <div style={{flex:1,overflowY:"auto",padding:"12px 16px",display:"flex",flexDirection:"column",gap:12,minHeight:0}}>
                {msgs.map((m,i)=>(
                  <div key={i} className="fi" style={{display:"flex",gap:9,flexDirection:m.role==="user"?"row-reverse":"row",alignItems:"flex-start"}}>
                    <div style={{width:27,height:27,borderRadius:7,background:m.role==="ai"?gd:d4,border:`1px solid ${m.role==="ai"?"rgba(201,168,76,.25)":"rgba(255,255,255,.08)"}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,flexShrink:0}}>{m.role==="ai"?"🎓":"👤"}</div>
                    <div style={{maxWidth:"80%",padding:"10px 12px",borderRadius:10,background:m.role==="ai"?d3:gd,border:`1px solid ${m.role==="ai"?"rgba(255,255,255,.06)":"rgba(201,168,76,.2)"}`,fontSize:13,lineHeight:1.68,color:m.role==="ai"?tm:t,whiteSpace:"pre-wrap",wordBreak:"break-word"}}>
                      {m.tag&&<div style={{fontSize:10,color:m.tag.includes("Web")?ac:ok,marginBottom:4,fontFamily:"'DM Mono',monospace"}}>{m.tag}</div>}
                      {m.text}
                    </div>
                  </div>
                ))}
                {busy&&(
                  <div style={{display:"flex",gap:9}}>
                    <div style={{width:27,height:27,borderRadius:7,background:gd,border:"1px solid rgba(201,168,76,.25)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13}}>🎓</div>
                    <div style={{padding:"10px 12px",borderRadius:10,background:d3,border:"1px solid rgba(255,255,255,.06)",display:"flex",gap:6,alignItems:"center"}}>
                      {[0,150,300].map((dd,i)=><div key={i} style={{width:6,height:6,borderRadius:"50%",background:g,animation:`pulse 1.1s ${dd}ms infinite`}}/>)}
                      <span style={{fontSize:10,color:td,fontFamily:"'DM Mono',monospace",marginLeft:3}}>Recherche...</span>
                    </div>
                  </div>
                )}
                <div ref={bottomRef}/>
              </div>
              <div style={{padding:"10px 14px",borderTop:"1px solid rgba(255,255,255,.06)",background:d2,display:"flex",gap:8,alignItems:"flex-end",flexShrink:0}}>
                <textarea value={inputVal} onChange={e=>setInputVal(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();send();}}} placeholder="Pose ta question... (Entrée pour envoyer)" rows={2} style={{flex:1,background:d3,border:"1px solid rgba(255,255,255,.09)",borderRadius:10,padding:"10px 12px",color:t,fontSize:14,resize:"none",outline:"none",fontFamily:"inherit",lineHeight:1.5}}/>
                <button onClick={()=>send()} disabled={busy||!inputVal.trim()} style={{width:42,height:42,background:g,border:"none",borderRadius:10,cursor:"pointer",fontSize:17,flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",opacity:busy||!inputVal.trim()?0.38:1}}>➤</button>
              </div>
            </div>
          )}

          {page==="roadmap"&&(
            <div className="fi" style={{height:"100%",display:"flex",flexDirection:"column",minHeight:0}}>
              {/* Sub tabs */}
              <div style={{background:d2,borderBottom:"1px solid rgba(255,255,255,.06)",display:"flex",flexShrink:0}}>
                <button style={tabB(roadTab==="roadmap")} onClick={()=>setRoadTab("roadmap")}>🎯 Roadmap</button>
                <button style={tabB(roadTab==="documents")} onClick={()=>setRoadTab("documents")}>📄 Documents</button>
                <button style={tabB(roadTab==="vente")} onClick={()=>setRoadTab("vente")}>💬 Scripts vente</button>
              </div>
              <div style={{flex:1,overflowY:"auto",padding:"12px 16px",minHeight:0}}>
              <div style={{...card,background:"linear-gradient(135deg,rgba(201,168,76,.06),transparent)",border:"1px solid rgba(201,168,76,.2)",marginBottom:14}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:7}}>
                  <div style={{fontFamily:"'Playfair Display',serif",fontSize:13,fontWeight:700,color:g}}>🎯 Progression globale</div>
                  <span style={{fontFamily:"'DM Mono',monospace",fontSize:12,color:g,fontWeight:600}}>{done}/{totalSteps} · {pct}%</span>
                </div>
                <div style={{height:5,background:d5,borderRadius:3,overflow:"hidden",marginBottom:10}}>
                  <div style={{height:"100%",width:pct+"%",background:`linear-gradient(90deg,${g},${gl})`,borderRadius:3,transition:"width .5s"}}/>
                </div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8}}>
                  {[["0€","Mois 1"],["1500€","Mois 3"],["5000€","Mois 6"]].map(([v,l])=>(
                    <div key={l} style={{background:d4,borderRadius:8,padding:"7px 9px",textAlign:"center"}}>
                      <div style={{fontFamily:"'Playfair Display',serif",fontSize:15,fontWeight:900,color:g}}>{v}</div>
                      <div style={{fontSize:10,color:td,marginTop:1}}>{l}</div>
                    </div>
                  ))}
                </div>
              </div>

              {ROADMAP_SECTIONS.map(section=>(
                <div key={section.id} style={{marginBottom:8}}>
                  <div onClick={()=>toggleSec(section.id)} style={{display:"flex",alignItems:"center",justifyContent:"space-between",background:d3,border:`1px solid ${openSec[section.id]?section.color+"35":"rgba(255,255,255,.07)"}`,borderRadius:openSec[section.id]?"10px 10px 0 0":10,padding:"11px 13px",cursor:"pointer",borderLeft:`4px solid ${section.color}`}}>
                    <div style={{display:"flex",alignItems:"center",gap:9}}>
                      <span style={{fontSize:16}}>{section.icon}</span>
                      <div>
                        <div style={{fontSize:13,fontWeight:700,color:t}}>{section.title}</div>
                        <div style={{fontSize:10,color:td,marginTop:1}}>{section.subtitle}</div>
                      </div>
                    </div>
                    <div style={{display:"flex",alignItems:"center",gap:7}}>
                      <span style={{fontSize:11,color:section.color,fontFamily:"'DM Mono',monospace"}}>{section.steps.filter(([id])=>checked[id]).length}/{section.steps.length}</span>
                      <span style={{color:td,fontSize:12,transform:openSec[section.id]?"rotate(90deg)":"none",transition:"transform .2s"}}>›</span>
                    </div>
                  </div>
                  {openSec[section.id]&&(
                    <div style={{background:d4,border:`1px solid ${section.color}25`,borderTop:"none",borderRadius:"0 0 10px 10px",padding:"7px 11px 9px"}}>
                      {section.steps.map(([id,txt])=>(
                        <div key={id} onClick={()=>chk(id)} style={{display:"flex",gap:9,padding:"6px 0",borderBottom:"1px solid rgba(255,255,255,.04)",cursor:"pointer",alignItems:"flex-start"}}>
                          <div style={chkB(checked[id])}>{checked[id]?"✓":""}</div>
                          <span style={{fontSize:11,color:checked[id]?td:tm,textDecoration:checked[id]?"line-through":"none",lineHeight:1.5}}>{txt}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {roadTab==="roadmap"&&(<div>
                <div style={{...card,background:"linear-gradient(135deg,rgba(201,168,76,.06),transparent)",border:"1px solid rgba(201,168,76,.2)",marginBottom:12}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:7}}>
                    <div style={{fontFamily:"'Playfair Display',serif",fontSize:13,fontWeight:700,color:g}}>🎯 Progression globale</div>
                    <span style={{fontFamily:"'DM Mono',monospace",fontSize:12,color:g,fontWeight:600}}>{done}/{totalSteps} · {pct}%</span>
                  </div>
                  <div style={{height:5,background:d5,borderRadius:3,overflow:"hidden",marginBottom:10}}>
                    <div style={{height:"100%",width:pct+"%",background:`linear-gradient(90deg,${g},${gl})`,borderRadius:3,transition:"width .5s"}}/>
                  </div>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8}}>
                    {[["0€","Mois 1"],["1500€","Mois 3"],["5000€","Mois 6"]].map(([v,l])=>(
                      <div key={l} style={{background:d4,borderRadius:8,padding:"7px 9px",textAlign:"center"}}>
                        <div style={{fontFamily:"'Playfair Display',serif",fontSize:15,fontWeight:900,color:g}}>{v}</div>
                        <div style={{fontSize:10,color:td,marginTop:1}}>{l}</div>
                      </div>
                    ))}
                  </div>
                </div>
                {ROADMAP_SECTIONS.map(section=>(
                  <div key={section.id} style={{marginBottom:8}}>
                    <div onClick={()=>toggleSec(section.id)} style={{display:"flex",alignItems:"center",justifyContent:"space-between",background:d3,border:`1px solid ${openSec[section.id]?section.color+"35":"rgba(255,255,255,.07)"}`,borderRadius:openSec[section.id]?"10px 10px 0 0":10,padding:"11px 13px",cursor:"pointer",borderLeft:`4px solid ${section.color}`}}>
                      <div style={{display:"flex",alignItems:"center",gap:9}}>
                        <span style={{fontSize:16}}>{section.icon}</span>
                        <div>
                          <div style={{fontSize:13,fontWeight:700,color:t}}>{section.title}</div>
                          <div style={{fontSize:10,color:td,marginTop:1}}>{section.subtitle}</div>
                        </div>
                      </div>
                      <div style={{display:"flex",alignItems:"center",gap:7}}>
                        <span style={{fontSize:11,color:section.color,fontFamily:"'DM Mono',monospace"}}>{section.steps.filter(([id])=>checked[id]).length}/{section.steps.length}</span>
                        <span style={{color:td,fontSize:12,transform:openSec[section.id]?"rotate(90deg)":"none",transition:"transform .2s"}}>›</span>
                      </div>
                    </div>
                    {openSec[section.id]&&(
                      <div style={{background:d4,border:`1px solid ${section.color}25`,borderTop:"none",borderRadius:"0 0 10px 10px",padding:"7px 11px 9px"}}>
                        {section.steps.map(([id,txt])=>(
                          <div key={id} onClick={()=>chk(id)} style={{display:"flex",gap:9,padding:"6px 0",borderBottom:"1px solid rgba(255,255,255,.04)",cursor:"pointer",alignItems:"flex-start"}}>
                            <div style={chkB(checked[id])}>{checked[id]?"✓":""}</div>
                            <span style={{fontSize:11,color:checked[id]?td:tm,textDecoration:checked[id]?"line-through":"none",lineHeight:1.5}}>{txt}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>)}

              {roadTab==="documents"&&(<div>
                <div style={{...card,border:"1px solid rgba(201,168,76,.2)",background:"rgba(201,168,76,.03)"}}>
                  <div style={{fontFamily:"'Playfair Display',serif",fontSize:13,fontWeight:700,color:g,marginBottom:3}}>📄 Documents officiels de formation</div>
                  <div style={{fontSize:11,color:td,marginBottom:14}}>Remplis les infos une fois — tous les documents se mettent à jour automatiquement.</div>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:14}}>
                    {[["Organisme",org,setOrg,"Ex: Pro Formation IDF"],["Formateur",trainer,setTrainer,"Ex: Tiegbe Bamba"],["Formation",ftitle,setFtitle,"Ex: Gestion des conflits"],["Date",fdate,setFdate,""]].map(([l,v,sv,ph],ki)=>(
                      <div key={ki}><label style={{fontSize:9,color:td,marginBottom:3,display:"block",textTransform:"uppercase",letterSpacing:"1px"}}>{l}</label><input type={l==="Date"?"date":"text"} value={v} onChange={e=>sv(e.target.value)} placeholder={ph} style={inp}/></div>
                    ))}
                  </div>
                </div>
                <div style={{display:"flex",gap:0,borderBottom:"1px solid rgba(255,255,255,.07)",marginBottom:12}}>
                  {[["att","📜 Attestation"],["em","✍️ Émargement"],["conv","📋 Convention"],["sat","⭐ Satisfaction"]].map(([id,l])=>(
                    <button key={id} style={tabB(docTab===id)} onClick={()=>setDocTab(id)}>{l}</button>
                  ))}
                </div>
                {/* Doc label */}
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
                  <div style={{fontSize:12,fontWeight:600,color:t}}>
                    {docTab==="att"&&"📜 Attestation de formation"}
                    {docTab==="em"&&"✍️ Feuille d'émargement"}
                    {docTab==="conv"&&"📋 Convention de formation"}
                    {docTab==="sat"&&"⭐ Questionnaire de satisfaction"}
                  </div>
                  <div style={{fontSize:10,color:ok}}>Obligatoire ✓</div>
                </div>
                <div style={{background:d3,border:"1px solid rgba(201,168,76,.12)",borderRadius:8,padding:"13px 15px",fontFamily:"'DM Mono',monospace",fontSize:11,lineHeight:1.9,color:tm,whiteSpace:"pre-wrap",maxHeight:320,overflowY:"auto",marginBottom:12}}>{docContent[docTab]}</div>
                <div style={{display:"flex",gap:8,marginBottom:16}}>
                  <button style={{...btnG,flex:1,fontSize:12}} onClick={()=>navigator.clipboard?.writeText(docContent[docTab])}>📋 Copier le document</button>
                  <button style={{...btnO,fontSize:12}} onClick={()=>window.print()}>🖨️ Imprimer</button>
                </div>
                {/* Legal reminder */}
                <div style={{...card,borderLeft:"3px solid #E05555",background:"rgba(224,85,85,.04)"}}>
                  <div style={{fontSize:11,color:"#E05555",fontWeight:600,marginBottom:8}}>⚖️ Rappel légal — Ordre des documents</div>
                  {[["AVANT la formation","Convention signée · Programme remis au stagiaire"],["PENDANT la formation","Feuille d'émargement signée (matin + après-midi)"],["APRÈS la formation","Attestation remise · Questionnaire satisfaction · Facture TVA exonérée"]].map(([q,a])=>(
                    <div key={q} style={{marginBottom:8,paddingBottom:8,borderBottom:"1px solid rgba(255,255,255,.05)"}}>
                      <div style={{fontSize:11,fontWeight:600,color:t,marginBottom:2}}>{q}</div>
                      <div style={{fontSize:11,color:td}}>{a}</div>
                    </div>
                  ))}
                  <div style={{fontSize:11,color:td}}>💡 Mention facture : <span style={{color:tm,fontFamily:"monospace"}}>Exonération TVA - Art. 261-4-4° du CGI</span></div>
                </div>
              </div>)}

              {roadTab==="vente"&&(<div>
                <div style={{...card,border:"1px solid rgba(201,168,76,.2)",background:"rgba(201,168,76,.03)"}}>
                  <div style={{fontFamily:"'Playfair Display',serif",fontSize:13,fontWeight:700,color:g,marginBottom:3}}>💬 Scripts de prospection</div>
                  <div style={{fontSize:11,color:td,marginBottom:0}}>Outils prêts à l'emploi pour décrocher tes clients.</div>
                </div>
                <div style={{display:"flex",gap:0,borderBottom:"1px solid rgba(255,255,255,.07)",marginBottom:12}}>
                  {[["email","📧 Email"],["linkedin","💼 LinkedIn"],["tel","📞 Tél."],["tarifs","💰 Tarifs"]].map(([id,l])=>(
                    <button key={id} style={tabB(venteTab===id)} onClick={()=>setVenteTab(id)}>{l}</button>
                  ))}
                </div>
                <div style={{background:d3,border:"1px solid rgba(255,255,255,.07)",borderRadius:8,padding:"13px 15px",fontFamily:"'DM Mono',monospace",fontSize:11,lineHeight:1.85,color:tm,whiteSpace:"pre-wrap",maxHeight:340,overflowY:"auto",marginBottom:10}}>{venteContent[venteTab]}</div>
                <button style={{...btnG,fontSize:12,width:"100%",justifyContent:"center",display:"flex"}} onClick={()=>navigator.clipboard?.writeText(venteContent[venteTab])}>📋 Copier le script</button>
              </div>)}

            </div>
            </div>
          )}

          {page==="profile"&&(
            <div className="fi" style={{height:"100%",overflowY:"auto",padding:"14px 16px"}}>
              {/* Hero profile */}
              <div style={{background:"linear-gradient(135deg,#1A1A1A,#111)",border:"1px solid rgba(201,168,76,.25)",borderRadius:16,padding:"22px",marginBottom:14,position:"relative",overflow:"hidden"}}>
                <div style={{position:"absolute",top:0,left:0,right:0,height:3,background:`linear-gradient(90deg,${g},#FFD700,${g})`}}/>
                <div style={{display:"flex",gap:16,alignItems:"flex-start",marginBottom:14}}>
                  <div style={{width:64,height:64,borderRadius:14,background:"linear-gradient(135deg,rgba(201,168,76,.3),rgba(201,168,76,.1))",border:"2px solid rgba(201,168,76,.5)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:28,flexShrink:0}}>🏀</div>
                  <div style={{flex:1}}>
                    <div style={{fontFamily:"'Playfair Display',serif",fontSize:20,fontWeight:900,color:g,lineHeight:1}}>Tiegbe Bamba</div>
                    <div style={{fontSize:12,color:t,marginTop:4,fontWeight:500}}>Pro Basketball Player · Formateur Expert</div>
                    <div style={{fontSize:11,color:td,marginTop:2}}>Côte d'Ivoire 🇨🇮 · Né à Sarcelles · 1m96 · Ailier</div>
                  </div>
                </div>
                <div style={{fontSize:13,color:tm,lineHeight:1.7,marginBottom:12}}>Joueur professionnel de basket ayant évolué sur <strong style={{color:g}}>5 continents</strong> en 1ère et 2ème division, Sélection Nationale Côte d'Ivoire 🇨🇮, diplômé de <strong style={{color:g}}>Portland State University</strong> (USA) · Master Communication & Marketing · Entrepreneur série avec <strong style={{color:g}}>5 business créés</strong> · Formateur terrain · Bilingue FR/EN.</div>
                <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                  <button style={btnG} onClick={()=>setPage("formations")}>🎓 Mes formations</button>
                  <button style={btnO}>📲 LinkedIn</button>
                </div>
              </div>

              {/* Stats carrière */}
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:13,fontWeight:700,color:g,marginBottom:10}}>📊 Carrière Professionnelle</div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:14}}>
                {[["5","Continents","France · USA · Grèce · Roumanie · Islande"],["15+","Années pro","Limoges · Châlons-Reims · Portland State · Rouen"],["11.6","Points/match","Saison senior Portland State (NCAA)"],["6.8","Rebonds/match","Leader rebounds Portland State 2014-15"],["24","Record points","Islande · Grindavik vs Stjarnan (2018)"],["30","Record efficacité","Meilleur match en carrière internationale"]].map(([v,l,s])=>(
                  <div key={l} style={{background:d3,border:"1px solid rgba(255,255,255,.07)",borderRadius:10,padding:"12px",position:"relative",overflow:"hidden"}}>
                    <div style={{position:"absolute",top:0,left:0,right:0,height:2,background:`linear-gradient(90deg,${g},transparent)`}}/>
                    <div style={{fontFamily:"'Playfair Display',serif",fontSize:22,fontWeight:900,color:g}}>{v}</div>
                    <div style={{fontSize:10,color:t,fontWeight:600,marginTop:2,textTransform:"uppercase",letterSpacing:".05em"}}>{l}</div>
                    <div style={{fontSize:10,color:td,marginTop:3,lineHeight:1.4}}>{s}</div>
                  </div>
                ))}
              </div>

              {/* Parcours */}
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:13,fontWeight:700,color:g,marginBottom:10}}>🗺️ Parcours International</div>
              <div style={card}>
                {[["🇺🇸","USA — NCAA","Portland State University · Big Sky Conference · 2015","Diplômé + Big Sky Player of the Week"],["🇫🇷","France — Pro A/ProB","Limoges U21 · Châlons-Reims Jeep Elite · Rouen NM1","Élite française — premier et deuxième division"],["🇬🇷","Grèce","Psyhiko (2016)","Division professionnelle grecque"],["🇮🇸","Islande","Grindavik · Express League (2018-2019)","Record : 24 pts / 10 reb / Efficiency 30"],["🇷🇴","Roumanie","Division professionnelle","Expérience est-européenne"],["🌍","Côte d'Ivoire","Équipe Nationale","Coupe du Monde FIBA · Représentation internationale"]].map(([flag,pays,equipe,note])=>(
                  <div key={pays} style={{display:"flex",gap:12,padding:"9px 0",borderBottom:"1px solid rgba(255,255,255,.05)",alignItems:"flex-start"}}>
                    <span style={{fontSize:20,flexShrink:0,width:28,textAlign:"center"}}>{flag}</span>
                    <div style={{flex:1}}>
                      <div style={{fontSize:13,fontWeight:600,color:t}}>{pays}</div>
                      <div style={{fontSize:11,color:td,marginTop:1}}>{equipe}</div>
                      <div style={{fontSize:11,color:g,marginTop:2,fontStyle:"italic"}}>{note}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Compétences */}
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:13,fontWeight:700,color:g,marginBottom:10,marginTop:4}}>💎 Compétences à Monétiser</div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:14}}>
                {[
                  ["🏀","Expert Basketball","Formation technique, mental, management. 15 ans d'expérience pro.","#C9A84C"],
                  ["🧠","Préparation Mentale","Vécu de haut niveau. Dépression, pression, résilience. Authentique.","#4CAF82"],
                  ["🎓","Formateur Certifié","Master Communication & Marketing · Portland State USA","#4A7CFF"],
                  ["🌍","Profil International","5 continents · Bilingue FR/EN · Réseau mondial","#8B5CF6"],
                  ["🧹","Entrepreneur Série","5 business créés : location voiture, restaurant, import/export, consulting marketing, société de ménage","#06B6D4"],
                  ["📣","Speaker & Coach","Camps basket · Interventions clubs · Formation mentale","#E05555"],
                ].map(([icon,titre,desc,color])=>(
                  <div key={titre} style={{background:d3,border:`1px solid ${color}25`,borderRadius:10,padding:"13px",borderLeft:`3px solid ${color}`}}>
                    <div style={{fontSize:20,marginBottom:6}}>{icon}</div>
                    <div style={{fontSize:12,fontWeight:700,color:t,marginBottom:4}}>{titre}</div>
                    <div style={{fontSize:11,color:td,lineHeight:1.5}}>{desc}</div>
                  </div>
                ))}
              </div>

              {/* Argument de vente */}
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:13,fontWeight:700,color:g,marginBottom:10}}>🚀 Comment Vendre Tes Formations ELITE</div>
              <div style={card}>
                <div style={{fontSize:11,color:td,textTransform:"uppercase",letterSpacing:".07em",marginBottom:8}}>Ton pitch — 30 secondes</div>
                <div style={{background:d4,borderRadius:8,padding:"12px 14px",fontFamily:"'DM Mono',monospace",fontSize:12,lineHeight:1.8,color:tm,marginBottom:12}}>
                  "J'ai joué pro pendant 15 ans sur 5 continents. J'ai vécu la pression, les blessures, la dépression du champion et la reconversion. Ce que je vous enseigne, ce n'est pas théorique — c'est du vécu. Mes formations ELITE sont utilisées par les clubs et académies qui veulent performer autrement."
                </div>
                <div style={{fontSize:11,color:td,textTransform:"uppercase",letterSpacing:".07em",marginBottom:8}}>Canaux de vente prioritaires</div>
                {[["🏀","Camps de basket organisés","Intégrer 1h de formation mentale dans chaque camp → 200-500€ de plus par participant"],["🤝","Clubs Pro A / Pro B IDF","Proposition ELITE 360° à 4500€ — AFDAS finance pour les clubs"],["📲","LinkedIn + Instagram","Profil ex-joueur pro = crédibilité immédiate · Storytelling de ton parcours"],["🏫","Académies & lycées sportifs","INSEP · CREPS · Pôles espoirs · Format 1 journée possible"],["🌍","Marchés internationaux","Réseau joueurs pro contacts dans 5 pays → interventions online en anglais"]].map(([icon,titre,desc])=>(
                  <div key={titre} style={{display:"flex",gap:10,padding:"8px 0",borderBottom:"1px solid rgba(255,255,255,.04)",alignItems:"flex-start"}}>
                    <span style={{fontSize:16,flexShrink:0}}>{icon}</span>
                    <div>
                      <div style={{fontSize:12,fontWeight:600,color:t,marginBottom:2}}>{titre}</div>
                      <div style={{fontSize:11,color:td,lineHeight:1.5}}>{desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Camps basket */}
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:13,fontWeight:700,color:g,marginBottom:10}}>⛹️ Camps de Basket — Valeur Ajoutée</div>
              <div style={{...card,border:"1px solid rgba(201,168,76,.2)",background:"rgba(201,168,76,.03)"}}>
                <div style={{fontSize:12,color:tm,lineHeight:1.7,marginBottom:10}}>Ajoute un module mental de 1h à chaque camp de basket pour augmenter le prix et la valeur perçue :</div>
                {[["🧠 Module Mindset 1h","'Penser comme un champion' — visualisation, routine, confiance","+ 100-200€/participant"],["🌱 Module Résilience 1h","'Comment les pros gèrent la pression et les défaites'","+ 80-150€/participant"],["⚡ Module Performance 1h","'Sommeil, nutrition mentale, récupération des élites'","+ 80-150€/participant"],["🎓 Formation 2j ELITE 360°","Programme complet pour équipe ou académie","4 500€ HT le groupe"]].map(([titre,desc,prix])=>(
                  <div key={titre} style={{display:"flex",justifyContent:"space-between",padding:"9px 0",borderBottom:"1px solid rgba(255,255,255,.04)",alignItems:"flex-start",gap:8}}>
                    <div style={{flex:1}}>
                      <div style={{fontSize:12,fontWeight:600,color:t,marginBottom:1}}>{titre}</div>
                      <div style={{fontSize:11,color:td}}>{desc}</div>
                    </div>
                    <div style={{fontSize:11,color:g,fontWeight:600,fontFamily:"monospace",flexShrink:0,textAlign:"right"}}>{prix}</div>
                  </div>
                ))}
              </div>

              {/* 5 Business */}
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:13,fontWeight:700,color:g,marginBottom:10,marginTop:4}}>🏗️ Mes 5 Business — Parcours Entrepreneur</div>
              <div style={card}>
                {[
                  ["🚗","Location de voiture","Service de location pour particuliers et entreprises. Gestion de flotte, contrats, assurances.","Fermé"],
                  ["🍽️","Restaurant","Restauration — gestion d'équipe, fournisseurs, service client, hygiène HACCP.","Fermé"],
                  ["📦","Import / Export de marchandises","Commerce international. Sourcing, logistique, douanes, relations fournisseurs.","Fermé"],
                  ["📣","Consultant Marketing","SIRET : 892 943 689 · Auto-entrepreneur · Conseil communication & stratégie marketing pour PME et entrepreneurs.","✅ Actif"],
                  ["🧹","Société de Ménage","SIRET : 928 738 954 · 4 ans d'activité · 1000+ sessions · Hôtels, commerces, particuliers. Formation terrain.","✅ Actif"],
                ].map(([icon,nom,desc,statut])=>(
                  <div key={nom} style={{display:"flex",gap:12,padding:"9px 0",borderBottom:"1px solid rgba(255,255,255,.05)",alignItems:"flex-start"}}>
                    <span style={{fontSize:20,flexShrink:0,width:28,textAlign:"center"}}>{icon}</span>
                    <div style={{flex:1}}>
                      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:2}}>
                        <div style={{fontSize:13,fontWeight:600,color:t}}>{nom}</div>
                        <span style={{fontSize:9,padding:"2px 7px",borderRadius:20,background:statut.includes("Actif")?"rgba(76,175,130,.12)":"rgba(255,255,255,.07)",color:statut.includes("Actif")?ok:td,border:`1px solid ${statut.includes("Actif")?"rgba(76,175,130,.25)":"rgba(255,255,255,.1)"}`}}>{statut}</span>
                      </div>
                      <div style={{fontSize:11,color:td,lineHeight:1.5}}>{desc}</div>
                    </div>
                  </div>
                ))}
                <div style={{marginTop:10,padding:"9px 12px",background:gd,borderRadius:8,fontSize:11,color:g}}>💡 5 business = 5 secteurs maîtrisés = crédibilité unique comme formateur pluridisciplinaire</div>
              </div>

              {/* Légitimité */}
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:13,fontWeight:700,color:g,marginBottom:10,marginTop:4}}>⚖️ Suis-je légitime ? Certifications & Démarches</div>
              <div style={{...card,border:"1px solid rgba(201,168,76,.2)",background:"rgba(201,168,76,.03)"}}>
                <div style={{fontSize:12,color:ok,fontWeight:600,marginBottom:8}}>✅ OUI — Tu peux vendre tes formations MAINTENANT</div>
                <div style={{fontSize:12,color:tm,lineHeight:1.7,marginBottom:12}}>Avec ton SIRET actif, tu peux légalement vendre des formations en préparation mentale et coaching sportif directement aux entreprises et clubs, sans certification supplémentaire. Ton expérience pro de 15 ans est ta légitimité principale.</div>
                <div style={{fontSize:11,color:td,textTransform:"uppercase",letterSpacing:".07em",marginBottom:8}}>Pour apparaître sur les bases de données officielles</div>
                {[
                  ["🎓","Certification RS6785 — Préparation Mentale","Inscrite à France Compétences (Répertoire Spécifique). Organisme : Devenir Meilleur (preparation-mentale.com) · 100% en ligne · ✅ CPF éligible · Reconnue officiellement","Recommandé en priorité"],
                  ["📋","Déclaration DREETS","Après ta 1ère convention de formation signée → tu obtiens ton NDA → tu apparais dans le registre des organismes de formation","Obligatoire pour facturer"],
                  ["✅","Certification Qualiopi","Après 3-4 mois d'activité → donne accès au CPF, OPCO, France Travail → apparition sur moncompteformation.gouv.fr","Mois 3-4"],
                  ["🏆","Titre Formateur Professionnel Adultes (FPA RNCP)","Titre RNCP niveau 5 → reconnaissance maximale comme formateur. Finançable CPF. Ouvre tous les OPCO","Recommandé mois 6+"],
                ].map(([icon,titre,desc,timing])=>(
                  <div key={titre} style={{display:"flex",gap:10,padding:"9px 0",borderBottom:"1px solid rgba(255,255,255,.04)",alignItems:"flex-start"}}>
                    <span style={{fontSize:18,flexShrink:0,width:24,textAlign:"center"}}>{icon}</span>
                    <div style={{flex:1}}>
                      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:8}}>
                        <div style={{fontSize:12,fontWeight:600,color:t,marginBottom:2}}>{titre}</div>
                        <span style={{fontSize:9,padding:"2px 6px",borderRadius:10,background:gd,color:g,border:"1px solid rgba(201,168,76,.25)",flexShrink:0,whiteSpace:"nowrap"}}>{timing}</span>
                      </div>
                      <div style={{fontSize:11,color:td,lineHeight:1.5}}>{desc}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{...card,borderLeft:"3px solid #4A7CFF",background:"rgba(74,124,255,.04)"}}>
                <div style={{fontSize:11,color:ac,fontWeight:600,marginBottom:6}}>💡 Stratégie recommandée pour Tiegbe</div>
                <div style={{fontSize:12,color:tm,lineHeight:1.7}}>
                  <strong style={{color:t}}>Maintenant :</strong> Vendre directement aux clubs et entreprises avec ton SIRET. Tes clients utilisent leur budget interne ou leur OPCO (notamment AFDAS pour le sport).<br/><br/>
                  <strong style={{color:t}}>Mois 1-2 :</strong> Passer la certification RS6785 Préparation Mentale (CPF éligible — 0€ de ta poche) → tu apparais sur France Compétences.<br/><br/>
                  <strong style={{color:t}}>Mois 2-3 :</strong> Déclarer à la DREETS → obtenir ton NDA → convention + facturation légale.<br/><br/>
                  <strong style={{color:t}}>Mois 4 :</strong> Qualiopi → accès moncompteformation.gouv.fr → clients paient avec leur CPF directement.
                </div>
              </div>

            </div>
          )}

        </div>

        <div style={{background:d2,borderTop:"1px solid rgba(201,168,76,.12)",display:"flex",flexShrink:0,paddingBottom:"env(safe-area-inset-bottom,0px)"}}>
          {NAV.map(({id,icon,label})=>(
            <button key={id} className="nb" onClick={()=>setPage(id)} style={{borderTop:`2px solid ${page===id?g:"transparent"}`}}>
              <span style={{fontSize:20}}>{icon}</span>
              <span style={{fontSize:9,letterSpacing:".03em",fontWeight:page===id?600:400,color:page===id?g:td,textTransform:"uppercase"}}>{label}{id==="library"&&savedCount>0?` (${savedCount})`:""}</span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
