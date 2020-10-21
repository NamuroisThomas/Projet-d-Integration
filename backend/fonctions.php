<?php
    function connexionPDO(){
        $login = "projetI";
        $mdp = "Integration7";
        $bd = "NeedHelpV2";
        $serveur = "62.210.130.145";
        try{
            $conn = new PDO("mysql:host=$serveur;dbname=bd", $login,$mdp);
            return $conn;
        }catch(PDOException $e){
            print "Erreur de connexion PDO";
            die();
    }

?>