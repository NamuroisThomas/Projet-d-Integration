package com.example.needhelp;


import org.json.JSONArray;
import java.util.ArrayList;
import java.util.List;


public class Utilisateur {
    int idCateg;
    String nomCateg;

    String nomUser;
    String prenomUser;
    String mail;
    Integer telephone;
    String mdp;

    public Utilisateur(String nomUser, String prenomUser, String mail, Integer telephone, String mdp) {

    }

    /**
     * Conversion du profil au format JSONArray
     * @return
     */
    public JSONArray convertToJSONArray(){
        List laListe = new ArrayList();
        laListe.add(idCateg);
        laListe.add(nomCateg);
        return new JSONArray(laListe);

    }

}
