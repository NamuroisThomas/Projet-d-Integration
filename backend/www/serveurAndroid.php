<?php
    include "fonctions.php";

    //controle de reception de parametre
    if(isset($_REQUEST["operation"])){

        // demande de recuperation des categories
        if ($_REQUEST["operation"]=="dernier"){
            try{
                print("dernier%");
                $cnx = connexionPDO();
                $req = $cnx->prepare("SELECT * FROM categories");
                $req->execute();
                // si il y a des categories recuperation de la premiere
                if($ligne = $req->fetch(PDO::FETCH_ASSOC)){
                    print(json_encode($ligne));
                }
            }catch(PDOException $e){
                print ("Erreur !").$e->getMessage();
                die();
            }
        // enregistrement nouveau profil
        }elseif($_REQUEST["operation"]=="inscription"){
            try{
                // recuperation des donnees en post
                $lesdonnees = $_REQUEST["lesdonnees"];
                $donnee = json_decode($lesdonnees);
                $nomUtilisateur = $donnee[0];
                $prenomUtilisateur = $donnee[1];
                $mailUtilisateur = $donnee[2];
                $telUtilisateur = $donnee[3];
                $mdpUtilisateur = $donnee[4];
                // insertion dans la base de donnees
                print("enreg%");
                $cnx = connexionPDO();
                $larequete = "INSERT INTO utilisateurs (nomUtilisateur,prenomUtilisateur,mailUtilisateur,telUtilisateur,mdpUtilisateur)";
                $larequete .= "values ('$nomUtilisateur','$prenomUtilisateur','$mailUtilisateur','$telUtilisateur','$mdpUtilisateur')";
                print ($larequete);
                $req = $cnx->prepare($larequete);
                $req->execute();

            }catch(PDOException $e){
                print ("Erreur !").$e->getMessage();
                die();
            }
        // Tentative de connexion
        }elseif ($_REQUEST["operation"]=="connexion") {
            try{
                
                //recuperation des donnees envoyer
                $lesdonnees = $_REQUEST["lesdonnees"];
                $donnee = json_decode($lesdonnees);
                $mailUtilisateur = $donnee[0];
                $mdpUtilisateur = $donnee[1];
                print("connexion%");
                $cnx = connexionPDO();
                $larequete = "SELECT * FROM utilisateurs WHERE mailUtilisateur LIKE '$mailUtilisateur'";
                $req = $cnx->prepare($larequete);
                $req->execute();
                if($ligne = $req->fetch(PDO::FETCH_ASSOC)){
                print(json_encode($ligne));
                }
                //print($larequete);
            }catch(PDOException $e){
                print ("Erreur !").$e->getMessage();
                die();
            }
        }elseif($_REQUEST["operation"]=="demandesTout"){
            try{
                print("demandesTout%");
                $cnx= connexionPDO();
                $larequete = "SELECT * FROM demandes WHERE acceptePar=0";
                $req = $cnx->prepare($larequete);
                $req->execute();
                // recuperation de toutes les demandes
                while($ligne = $req->fetch(PDO::FETCH_ASSOC)){
                   $resultat[]=$ligne;
                }
                 print(json_encode($resultat));
            }catch(PDOException $e){
                print ("Erreur !").$e->getMessage();
                die();
            }
        }elseif($_REQUEST["operation"]=="enregDemande"){
            try{
                // recuperation des donnees en post
                $lesdonnees = $_REQUEST["lesdonnees"];
                $donnee = json_decode($lesdonnees);
                $titreDemande = $donnee[0];
                $descriptionDemande = $donnee[1];
                $idUtilisateur = $donnee[2];
                $idCategorie = $donnee[3];
                $defraiementDemande = $donnee[4];
                $idCodePostal = $donnee[5];
                //date("d/m/Y") = $date; // Affiche la date du jour
                // insertion dans la base de donnees
		$today = date("Y-m-d");
                print("enregDemande%");
                $cnx = connexionPDO();
                $larequete = "INSERT INTO demandes (titreDemande,descriptionDemande,dateDemande,idUtilisateur,idCategorie,defraiementDemande,idCodePostal)";
                $larequete .= "values ('$titreDemande','$descriptionDemande','$today','$idUtilisateur','$idCategorie','$defraiementDemande','$idCodePostal')";
                print ($larequete);
                $req = $cnx->prepare($larequete);
                $req->execute();

            }catch(PDOException $e){
                print ("Erreur !").$e->getMessage();
                die();
            }
        }elseif ($_REQUEST["operation"]=="accepter") {
            try{
                
                //recuperation des donnees envoyer
                $lesdonnees = $_REQUEST["lesdonnees"];
                $donnee = json_decode($lesdonnees);
                $idDemande = $donnee[0];
		//print($idDemande);
                $accepteDemande = $donnee[1];
                $acceptePar = $donnee[2];
                print("accepter%");
                $cnx = connexionPDO();
                $larequete = "update demandes set accepteDemande='$accepteDemande', acceptePar='$acceptePar' WHERE idDemande='$idDemande'";
                $req = $cnx->prepare($larequete);
                $req->execute();
                print($larequete);
            }catch(PDOException $e){
                print ("Erreur !").$e->getMessage();
                die();
            }
        }
        elseif($_REQUEST["operation"]=="demandesEnCours"){
            try{
                print("demandesEnCours%");
                $lesdonnees = $_REQUEST["lesdonnees"];
                $donnee = json_decode($lesdonnees);
                $idUtilisateur = $donnee[0];
                $cnx= connexionPDO();
                $larequete = "SELECT * FROM demandes WHERE acceptePar='$idUtilisateur'";
                $req = $cnx->prepare($larequete);
                $req->execute();
                // recuperation de toutes les demandes
                while($ligne = $req->fetch(PDO::FETCH_ASSOC)){
                   $resultat[]=$ligne;
                }
                 print(json_encode($resultat));
            }catch(PDOException $e){
                print ("Erreur !").$e->getMessage();
                die();
            }
        }else{
            print("Erreur php requete");
        }
    }else{
        print("Erreur isset");
    }
?>
