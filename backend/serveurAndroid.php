<?php
    include "function.php";

    //controle de reception de parametre
    if(isset($_REQUEST["operation"])){

        // demande de recuperation des categories
        if ($_REQUEST["operation"]=="dernier"){
            try{
                print("dernier%");
                $cnx = connexionPDO();
                $req = $cnx->prepare("select * from categories");
                $req->execute();
                // si il y a des categoriesrecuperation de la premiere
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
                $donnee = json_decode("lesdonnees");
                $idCategorie = $donnee[0];
                $nomCategorie = $donnee[1];
                // insertion dans la base de donnees
                print("enreg%");
                $cnx = connexionPDO();
                $larequete = "insert into categories (idCategorie, nomCategorie)";
                $larequete .= "values ($idCategorie, $nomCategorie)";
                print ($larequete);
                $req = $cnx->prepare($larequete);
                $req->execute();

            }catch(PDOException $e){
                print "Erreur !".$e->getMessage();
                die();
                    }
        }
?>