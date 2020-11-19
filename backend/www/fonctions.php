<?php
    function connexionPDO(){
        $login = "projetI";
        $mdp = "Integration7";
        $bd = "NeedHelpV2";
        $serveur = "localhost";
        try{
            $conn = new PDO("mysql:host=$serveur;dbname=$bd;port=3309;charset=utf8", $login,$mdp);
            return $conn;
        }catch(PDOException $e){
            print "Erreur de connexion PDO";
            die();
        }
    }

?>
