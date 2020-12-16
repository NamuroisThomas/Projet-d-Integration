package com.example.needhelp.controleur;

import android.content.Context;
import android.util.Log;
import com.example.needhelp.modele.Demande;
import com.example.needhelp.modele.AccesDistant;
import com.example.needhelp.modele.Utilisateur;
import org.json.JSONArray;
import java.util.ArrayList;
import java.util.List;

public final class Controle {
    //variables d'instances
    private static Controle instance = null;
    private static Demande demande;
    private static AccesDistant accesDistant;
    private static Context contexte;
    private static ArrayList<Demande> lesDemandes = new ArrayList<Demande>();
    private static ArrayList<Demande> lesDemandesEnCours = new ArrayList<Demande>();
    private static ArrayList<Demande> mesDemandes = new ArrayList<Demande>();
    private static Utilisateur connexionUtilisateurs;

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
            //accesDistant.envoi("demandeEnCours",new JSONArray());
        }
        return Controle.instance;
    }

    /**
     * Getter
     * @return
     */
    public ArrayList<Demande> getLesDemandes() {
        return lesDemandes;
    }

    /**
     * Setter
     * @param lesDemandes
     */
    public void setLesDemandes(ArrayList<Demande> lesDemandes) {
        this.lesDemandes = lesDemandes;
    }
    /**
     * Getter
     * @return
     */
    public static ArrayList<Demande> getMesDemandes() {
        return mesDemandes;
    }
    /**
     * Setter
     * @param mesDemandes
     */
    public static void setMesDemandes(ArrayList<Demande> mesDemandes) {
        Controle.mesDemandes = mesDemandes;
    }
    /**
     * Getter
     * @return
     */
    public ArrayList<Demande> getLesDemandesEnCours() {
        return lesDemandesEnCours;
    }
    /**
     * Setter
     * @param lesDemandesEnCours
     */
    public void setLesDemandesEnCours(ArrayList<Demande> lesDemandesEnCours) {
        this.lesDemandesEnCours = lesDemandesEnCours;
    }
    /**
     * Setter
     * @param connexionUtilisateurs
     */
    public void setConnexionUtilisateurs(Utilisateur connexionUtilisateurs) {
        this.connexionUtilisateurs = connexionUtilisateurs;
    }

    public static Utilisateur getConnexionUtilisateurs() {
        return connexionUtilisateurs;
    }

    public static String getNomUtilisateur(){
        Utilisateur utilisateur = getConnexionUtilisateurs();
        String nom = utilisateur.getNomUser() + " " + utilisateur.getPrenomUser();
        Log.d("Nom utilisateur", "**************************" + nom);
        return nom;
    }

    /**
     * Getter
     * @return
     */
    public int getIdUtilisateur(){
        //Log.d("idUser","******************" + connexionUtilisateurs.getIdUtilisateur());
        return connexionUtilisateurs.getIdUtilisateur();
    }
    /**
     * Getter
     * @return
     */
    public static Demande getDemande() {
        return demande;
    }
    /**
     * Setter
     * @param demande
     */
    public static void setDemande(Demande demande) {
        Controle.demande = demande;
    }

    /**
     * Méthode pour traduire l'idUtilisateur en JSON pour la base de données
     * @return
     */
    public JSONArray idUtilisateurConvertToJSONArray(){
        List laListe = new ArrayList();
        laListe.add(getIdUtilisateur());
        Log.d("idUser","****************" + getIdUtilisateur());
        return new JSONArray(laListe);
    }
}
