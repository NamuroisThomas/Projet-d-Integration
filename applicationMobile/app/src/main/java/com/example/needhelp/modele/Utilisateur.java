package com.example.needhelp.modele;

import org.json.JSONArray;
import java.util.ArrayList;
import java.util.List;



public class Utilisateur {
    String nomUser;
    String prenomUser;
    String mail;
    String telephone;
    String mdp;

    public Utilisateur(String nomUser, String prenomUser, String mail, String telephone, String mdp) {
        this.nomUser = nomUser;
        this.prenomUser = prenomUser;
        this.mail = mail;
        this.telephone = telephone;
        this.mdp = mdp;
    }

    /**
     * Conversion du profil au format JSONArray
     * @return
     */
    public JSONArray convertToJSONArray(){
        List laListe = new ArrayList();
        laListe.add(nomUser);
        laListe.add(prenomUser);
        laListe.add(mail);
        laListe.add(telephone);
        laListe.add(mdp);
        return new JSONArray(laListe);
    }

}
