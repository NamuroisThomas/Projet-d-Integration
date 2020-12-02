package com.example.needhelp.controleur;

import android.content.Context;
import android.view.View;

import com.example.needhelp.modele.Demande;
import com.example.needhelp.modele.AccesDistant;
import com.example.needhelp.modele.Utilisateur;

import org.json.JSONArray;

import java.util.ArrayList;

public final class Controle {

    private static Controle instance = null;
    private static Demande demande;
    private static AccesDistant accesDistant;
    private static Context contexte;
    private ArrayList<Demande> lesDemandes = new ArrayList<Demande>();
    private Utilisateur connexionUtilisateurs;

    /**
     * Constructeur
     */
    public Controle() {
        super();
    }

    /**
     * Creation de l'instance
     *
     * @param context
     * @return instance
     */
    public static final Controle getInstance(Context context) {

        if (contexte != null) {
            Controle.contexte = contexte;
        }
        if (Controle.instance == null) {
            Controle.instance = new Controle();
            accesDistant = new AccesDistant();

            accesDistant.envoi("demandesTout", new JSONArray());
            //accesDistant.envoi("categorie",new JSONArray());

        }
        return Controle.instance;
    }

    public ArrayList<Demande> getLesDemandes() {
        return lesDemandes;
    }

    public void setLesDemandes(ArrayList<Demande> lesDemandes) {
        this.lesDemandes = lesDemandes;
    }

    public void setConnexionUtilisateurs(Utilisateur connexionUtilisateurs) {
        this.connexionUtilisateurs = connexionUtilisateurs;
    }
}
/*
*     /**
 * Création de la demande
 * @param titreDemande
 * @param descriptionDemande
 * @param idUtilisateur
 * @param idCategorie
 * @param defraiement
 * @param idCodePostal

public void creerDemandes(String titreDemande, String descriptionDemande, int idUtilisateur, int idCategorie, int defraiement, int idCodePostal){
    demande = new Demande(titreDemande,descriptionDemande,idUtilisateur,idCategorie,defraiement,idCodePostal);
    lesDemandes.add(demande);
    /**
     * A FAIRE!!!!
     * avec accès distant méthode pour enregistrer une demandes dans la DB

}*/