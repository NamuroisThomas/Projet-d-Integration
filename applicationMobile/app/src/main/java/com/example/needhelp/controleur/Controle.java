package com.example.needhelp.controleur;

import android.content.Context;
import android.util.Log;
import android.widget.EditText;

import com.example.needhelp.R;
import com.example.needhelp.modele.Utilisateur;
import com.example.needhelp.modele.AccesDistant;
import com.example.needhelp.vue.ConnexionActivity;

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
    public Controle(){
        super();
    }

    /**
     * Creation de l'instance
     * @return instance
     */
    public static final Controle getInstance(){

        if(contexte!=null){
            Controle.contexte=contexte;
        }
        if (Controle.instance == null){
            Controle.instance = new Controle();
            accesDistant = new AccesDistant();
            //accesDistant.envoi("dernier", new JSONArray());
            accesDistant.envoi("categorie",new JSONArray());
        }
        return Controle.instance;
    }
}
