package com.example.needhelp.controleur;

import android.content.Context;

import com.example.needhelp.MainActivity;
import com.example.needhelp.Utilisateur;
import com.example.needhelp.modele.AccesDistant;

import org.json.JSONArray;

public final class Controle {

    private static Controle instance = null;
    private static Utilisateur user;
    private static AccesDistant accesDistant;

    private static Context contexte;

    /**
     * Constructeur
     */
    private Controle(){
        super();
    }

    /**
     * Creation de l'instance
     * @return instance
     */
    public static final Controle getInstance(){
        /*
        if(contexte!=null){
            Controle.contexte=contexte;
        }
    */
        if (Controle.instance == null){
            Controle.instance = new Controle();
            accesDistant = new AccesDistant();
            accesDistant.envoi("dernier", new JSONArray());
        }
        return Controle.instance;
    }

    public void CreerProfil(String nomUser, String prenomUser, String mail, Integer telephone, String mdp){
        user = new Utilisateur(nomUser,prenomUser,mail,telephone,mdp);
        accesDistant.envoi("enreg", user.convertToJSONArray());
    }

    public static void setUser(Utilisateur user) {
        Controle.user = user;
    }
}
