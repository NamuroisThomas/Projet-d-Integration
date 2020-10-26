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
            accesDistant.envoi("dernier", new JSONArray());
        }
        return Controle.instance;
    }

    /**
     * Méthode qui permet l'inscription de nouveaux membres
     */
    public void inscription(){
        String nomUser=null;
        String prenomUser=null;
        String mail=null;
        String telephone=null;
        String mdp=null;
        String mdpConfirm=null;

        // Récupération des champs de Edit dans la page d'inscription
        nomInscription = (EditText) nomInscription.findViewById(R.id.inscriptionNomEdit);
        nomUser = nomInscription.getText().toString();
        prenomInscription= (EditText) prenomInscription.findViewById(R.id.inscriptionPrenomEdit);
        prenomUser = prenomInscription.getText().toString();
        mailInscription = (EditText)mailInscription.findViewById(R.id.inscriptionMailEdit);
        mail = mailInscription.getText().toString();
        telInscription = (EditText) telInscription.findViewById(R.id.inscriptionGSMEdit);
        telephone = telInscription.getText().toString();
        mdpInscription = (EditText)mdpInscription.findViewById(R.id.inscriptionPSWEdit);
        mdp = mdpInscription.getText().toString();
        mdpConfirmation = (EditText)mdpConfirmation.findViewById(R.id.inscriptionConfirmEdit);
        mdpConfirm = mdpConfirmation.getText().toString();

        if(mdpConfirmation.equals(mdpConfirm)){
            if (nomUser != null && prenomUser != null && mail  != null && telephone != null && mdp != null){
                user = new Utilisateur(nomUser,prenomUser,mail,telephone,mdp);
                accesDistant.envoi("enreg", user.convertToJSONArray());
            }
        }else {
            Log.d("Inscription", "*********************");
        }
    }

    public static void setUser(Utilisateur user) {
        Controle.user = user;

    }
}
