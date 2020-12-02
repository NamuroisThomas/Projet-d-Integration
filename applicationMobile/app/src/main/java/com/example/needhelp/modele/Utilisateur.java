package com.example.needhelp.modele;


import org.json.JSONArray;
import java.util.ArrayList;
import java.util.List;


public class Utilisateur {

    private int idUtilisateur;
    private String nomUser;
    private String prenomUser;
    private String mail;
    private String telephone;
    private String mdp;
    private String descriptionUtilisateur;

    /**
     * Constructeur complet inscription
     * @param nomUser
     * @param prenomUser
     * @param mail
     * @param telephone
     * @param mdp
     */
    public Utilisateur(String nomUser, String prenomUser, String mail, String telephone, String mdp) {
        this.nomUser = nomUser;
        this.prenomUser = prenomUser;
        this.mail = mail;
        this.telephone = telephone;
        this.mdp = mdp;
    }

    /**
     * Construction complet
     * @param idUtilisateur
     * @param nomUser
     * @param prenomUser
     * @param mail
     * @param telephone
     * @param mdp
     * @param descriptionUtilisateur
     */

    public Utilisateur(int idUtilisateur, String nomUser, String prenomUser, String mail, String telephone,
                       String mdp, String descriptionUtilisateur){
        this.idUtilisateur = idUtilisateur;
        this.nomUser = nomUser;
        this.prenomUser = prenomUser;
        this.mail = mail;
        this.telephone = telephone;
        this.mdp = mdp;
        this.descriptionUtilisateur = descriptionUtilisateur;
    }

    /**
     * Constructeur juste mail et mot de passe
     * @param mail
     * @param mdp
     */
    public Utilisateur(String mail, String mdp) {
        this.mail = mail;
        this.mdp = mdp;
    }

    /**
     * Conversion de l'inscription au format JSONArray
     * @return
     */
    public JSONArray inscriptionConvertToJSONArray(){
        List laListe = new ArrayList();
        laListe.add(nomUser);
        laListe.add(prenomUser);
        laListe.add(mail);
        laListe.add(telephone);
        laListe.add(mdp);
        return new JSONArray(laListe);
    }

    /**
     * Conversion de la connexion au format JSONArray
     * @return
     */
    public JSONArray connexionConvertToJsonArray(){
        List laListe = new ArrayList();
        laListe.add(mail);
        laListe.add(mdp);

        return new JSONArray(laListe);
    }
    public int getIdUtilisateur() {
        return idUtilisateur;
    }
}
