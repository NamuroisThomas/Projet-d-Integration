CREATE TABLE `needhelp`.`utilisateurs` ( 
	`idUtilisateur` INT NOT NULL AUTO_INCREMENT COMMENT 'L\'id de l\'utilisateur afin de pouvoir le référencer dans l\'application' ,
	`nomUtilisateur` VARCHAR(50) NOT NULL COMMENT 'Le nom de l\'utilisateur qui utilise l\'application' ,
	`prenomUtilisateur` VARCHAR(50) NOT NULL COMMENT 'Le prénom de l\'utilisateur qui utilise l\'application' ,
	`mailUtilisateur` VARCHAR(100) NOT NULL COMMENT 'L\'e-mail de l\'utilisateur qui utilise l\'application' ,
	`telUtilisateur` VARCHAR(12) NOT NULL COMMENT 'Le GSM de l\'utilisateur pour ' ,
	`mdpUtilisateur` VARCHAR(200) NOT NULL COMMENT 'Le mot de passe de l\'utilisateur' ,
	`preferenceUtilisateur` INT NULL DEFAULT NULL COMMENT 'Préférence de l\'utilisateur (0 aucune, 1 aideur, 2 demandeur) ' ,
	`descriptionUtilisateur` TEXT NOT NULL COMMENT 'Description que l\'utilisateur peut ajouter' ,
	`avertissementUtilisateur` INT NULL DEFAULT NULL COMMENT 'Nombre d\'avertissement reçu par l\'utilisateur' ,
	PRIMARY KEY (`idUtilisateur`),
	UNIQUE (`telUtilisateur`))
	ENGINE = InnoDB COMMENT = 'Table contenant les utilisateurs de l\'application';
	
ALTER TABLE `utilisateurs` ADD CONSTRAINT `Status` FOREIGN KEY (`idStatus`) REFERENCES `status`(`idStatus`) ON DELETE RESTRICT ON UPDATE RESTRICT;
	


CREATE TABLE `needhelp`.`demandes` (
	`idDemande` INT NOT NULL AUTO_INCREMENT COMMENT 'L\'id de la demande afin de pouvoir identifier chaque demande de manière unique' ,
	`titreDemande` VARCHAR(50) NOT NULL COMMENT 'Titre de la demande reprenant de manière concise le besoin' ,
	`descriptionDemande` TEXT NOT NULL COMMENT 'Description plus précise de la demande' ,
	`dateDemande` DATE NOT NULL COMMENT 'Date à laquelle la demande doit être faite' ,
	`idUtilisateur` INT NOT NULL COMMENT 'l\'id de l\'utilisateur qui fait la demande' ,
	`idCategorie` INT NOT NULL COMMENT 'L\'id de la catégorie de la demande' ,
	`defraiementDemande` INT NULL DEFAULT NULL COMMENT 'Définit si la demande comprend un défraiement ou non (0 non et 1 oui)' ,
	PRIMARY KEY (`idDemande`))
	ENGINE = InnoDB COMMENT = 'Table contenant les demandes d\'aide de l\'application';
	
ALTER TABLE `demandes` ADD CONSTRAINT `Catégories` FOREIGN KEY (`idCategorie`) REFERENCES `categories`(`idCategorie`) ON DELETE RESTRICT ON UPDATE RESTRICT;
ALTER TABLE `demandes` ADD CONSTRAINT `Utilisateur` FOREIGN KEY (`idUtilisateur`) REFERENCES `utilisateurs`(`idUtilisateur`) ON DELETE RESTRICT ON UPDATE RESTRICT;

	

CREATE TABLE `needhelp`.`categories` (
	`idCategorie` INT NOT NULL AUTO_INCREMENT COMMENT 'L\'id de la catégorie dans laquelle une demande peut se situer' ,
	`nomCategorie` VARCHAR(25) NOT NULL COMMENT 'Définition de la catégorie' ,
	PRIMARY KEY (`idCategorie`))
	ENGINE = InnoDB COMMENT = 'Table contenant l\'ensemble des catégories possible pour une demande';


CREATE TABLE `needhelp`.`status` (
	`idStatus` INT NOT NULL  AUTO_INCREMENT COMMENT 'L\'id du status de l\'utilisateur' ,
	`nomStatus` VARCHAR(10) NOT NULL COMMENT 'Définition du status de l\'utilisateur' ,
	PRIMARY KEY	(`idStatus`))
	ENGINE = InnoDB COMMENT = 'Table contenant les status possible pour un utilisateur';

CREATE TABLE `needhelp`.`evaluations` (
	`idEvaluation` INT NOT NULL AUTO_INCREMENT COMMENT 'L\'id de l\'évaluation' ,
	`idDemande` INT NOT NULL COMMENT 'L\'id de la demande à laquelle l\'évaluation fait référence' ,
	`idUtilisateur` INT NOT NULL COMMENT 'L\'id de l\'utilisateur qui fait l\'évaluation' ,
	`noteEvaluation` INT NOT NULL COMMENT 'Note mise par l\'évaluateur (entre 0 et 5)' ,
	`descriptionEvaluation` TEXT NOT NULL COMMENT 'Description éventuelle de l\'évaluation' ,
	PRIMARY KEY (`idEvaluation`))
	ENGINE = InnoDB COMMENT = 'Table contenant les évlautations consécutives à une prestation';

ALTER TABLE `evaluations` ADD CONSTRAINT `Utilisateur2` FOREIGN KEY (`idUtilisateur`) REFERENCES `utilisateurs`(`idUtilisateur`) ON DELETE RESTRICT ON UPDATE RESTRICT;
ALTER TABLE `evaluations` ADD CONSTRAINT `Demande` FOREIGN KEY (`idDemande`) REFERENCES `demandes`(`idDemande`) ON DELETE RESTRICT ON UPDATE RESTRICT;


CREATE TABLE `needhelp`.`codepostal` (
	`idCodePostal` INT NOT NULL COMMENT 'Le code postal' ,
	`nomVille` VARCHAR(50) NOT NULL COMMENT 'La ville ayant le code postal' , 
	PRIMARY KEY (idCodePostal`))
	ENGINE = InnoDB;





