package com.example.needhelp.controleur;

import android.content.Context;
import android.util.Log;
import android.widget.EditText;

import com.example.needhelp.R;
import com.example.needhelp.modele.Utilisateur;
import com.example.needhelp.modele.AccesDistant;

import org.json.JSONArray;

public final class Controle {

    private static Controle instance = null;
    private static Utilisateur user;
    private static AccesDistant accesDistant;

    // variable pour les layout
    private EditText nomInscription;
    private EditText prenomInscription;
    private EditText mailInscription;
    private EditText telInscription;
    private EditText mdpInscription;
    private  EditText mdpConfirmation;

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
            //accesDistant.envoi("dernier", new JSONArray());
        }
        return Controle.instance;
    }

    public static void setUser(Utilisateur user) {
        Controle.user = user;

    }
}
