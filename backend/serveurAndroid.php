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
                print "Erreur !".$e->getMessage();
                die();
            }
        // enregistrement nouveau profil
        }elseif($_REQUEST["operation"]=="enreg"){
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
                print "Erreur !".$e->getMessage();
                die();
            }
        }
    }
?>