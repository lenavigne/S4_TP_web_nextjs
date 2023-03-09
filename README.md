# S4_TP_web_nextjs
tp web de 2eme annee
Sujet Remindr
Projets à faire seul
En utilisant les technologies NextJS, prisma, et next-auth, vous allez devoir créer un projet selon les
spécification qui suivent :

Contexte
Le but du projet est de créer des rappels pour les différents projets, devoirs, ou attendus à rendre sur des
classes, des groupes et autres, avec les détails de contexte nécessaires.

Attendus
• Authentification utilisateur utilisant next-auth, vous pouvez utiliser n’importe quel provider.
• Une landing page simple pour présenter le produit, accessible par tout le monde
• Une interface de gestion des Remindr réservé aux utilisateurs authentifiés
Fonctionnalités de Remindr
• Pouvoir créer des groupes où vous pouvez inviter d’autres utilisateurs de la plateforme (pas besoin de
mail ou autre, simplement sélectionner un utilisateur pour l’ajouter au groupe)
• Les utilisateurs faisant parti d’un groupe peuvent ajouter des rappels à l’intérieur de ce groupe avec les
propriétés suivantes :
    • Title
    • Date de rendu
    • Description
    • Couleur
    • Photo (optionnel)
• Les utilisateurs du groupe peuvent modifier, et supprimer tous les rappels faisant parti de ce groupe
• Lorsqu’un rappel arrive presque à terme (1 semaine avant), un email doit être envoyé à tous les
utilisateurs du groupe pour leur rappeler que le projet arrive à terme bientôt.
• Les groupes doivent être affichés dans l’interface et modifiable par toute personne du groupe
• On ne doit voit que les groupes dont on fait parti
• Une fois que l’on accède à un groupe, on accède à tous les rappels de ce groupe

Bonus :
• Avoir une interface ergonomique, agréable et design
• Générer des fichiers iCAL ou autre pour intégrer les rappels dans son agenda

Rendus
Pas besoin de rendre votre projet, nous les corrigerons et noterons ensemble lors des derniers cours.
Seront pris en compte pour la notation :
• Les fonctionnalités
• La qualité du code produit selon les normes NextJS
• Votre organisation de fichier
• La sécurité basique de vos formulaire, l’accès aux données des autres etc
Attention a bien implémenter toutes les fonctionnalités, sinon vous n’aurez pas tous les points.
Bon courage à vous

creation table : 
DROP TABLE IF EXISTS remindr;
DROP TABLE IF EXISTS appartient;
DROP TABLE IF EXISTS groupes;
DROP TABLE IF EXISTS utilisateurs;

CREATE TABLE groupes (
    idG INT (30) NOT NULL AUTO_INCREMENT,
	nomG VARCHAR(255) NOT NULL,
	CONSTRAINT groupes_pk PRIMARY KEY groupes(idG)
);
    
CREATE TABLE utilisateurs (
    idU INT(30) NOT NULL AUTO_INCREMENT,
	nomU VARCHAR(255) NOT NULL,
	CONSTRAINT utilisateurs_pk PRIMARY KEY utilisateurs(idU)
);
    
CREATE TABLE appartient ( 
    idU INT(30) NOT NULL, 
    idG INT(30) NOT NULL,
    CONSTRAINT appartient_pk PRIMARY KEY appartient(idU, idG),
    CONSTRAINT appartient_fk1 FOREIGN KEY (idU) REFERENCES utilisateurs (idU) ON DELETE CASCADE,
    CONSTRAINT appartient_fk2 FOREIGN KEY (idG) REFERENCES groupes (idG) ON DELETE CASCADE
);
    
CREATE TABLE remindr (
	idR INT(30) NOT NULL,
	nomR VARCHAR(255) NOT NULL,
    daterendu DATETIME NOT NULL,
	description VARCHAR(255),
    couleur VARCHAR(50) NOT NULL,
    idG int(30) NOT NULL,
	CONSTRAINT remindr_pk PRIMARY KEY remindr(idR),
    CONSTRAINT remindr_fk FOREIGN KEY (idG) REFERENCES groupes (idG) ON DELETE CASCADE
);