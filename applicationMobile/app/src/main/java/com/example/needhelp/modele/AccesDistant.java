package com.example.needhelp.modele;

import android.util.Log;

import com.example.needhelp.controleur.Controle;
import com.example.needhelp.outils.AccessHTTP;
import com.example.needhelp.outils.AsyncResponse;
import com.example.needhelp.vue.ConnexionActivity;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;

public class AccesDistant implements AsyncResponse {

    //constante
    //private static final String SERVEURADDR = "http://192.168.1.9/needhelp/serveurAndroid.php";
    private static final String SERVEURADDR = "http://62.210.130.145/serveurAndroid.php";
    //Variables
    private Controle controle;
    private String mailServeur;
    private String mdpServeur;
    private String mdpUser;
    private boolean mdpCorrect = false;



    /**
     * Constructeur
     */
    public AccesDistant() {
        controle = Controle.getInstance(null);
    }

    /**
     * retour serveur distant
     *
     * @param output
     */
    @Override
    public void processFinish(String output) {
        Log.d("serveur", "************** OUTPUT :" + output);
        // decoupage du message recu
        String[] message = output.split("%");
        // dans message[0] : "enreg", "dernier", "Erreur !"
        // dans message[1] : reste du message

        // s'il  ya 2 case
        if (message.length > 1) {
            if (message[0].equals("enreg")) {
                Log.d("enreg", "***********" + message[1]);
            }
            /**
             * Enregistrement d'une nouvelle demande
             */
            else if (message[0].equals("enregDemande")) {
                Log.d("insert","********** insertion reussie normalement");
            }
            /**
             * Modification des données utilisateurs
             */
            else if (message[0].equals("modificationUtilisateur")) {
                Log.d("insert","********** Modification réussie");
            }
            /**
             * Message d'erreur
             */
            else if (message[0].equals("Erreur !")) {
                Log.d("Erreur !", "***********" + message[1]);
            }
            /**
             * Connexion de l'utilisateur et vérification des mdp
             */
            else if (message[0].equals("connexion")) {
                try {
                    JSONObject info = new JSONObject(message[1]);
                    mailServeur = info.getString("mailUtilisateur");
                    mdpServeur = info.getString("mdpUtilisateur");
                    Log.d("HIT", "***********" + message[1]);
                    Utilisateur userServ = new Utilisateur(mailServeur, mdpServeur);
                    Utilisateur user = new Utilisateur(mailServeur, mdpUser);
                    //verification(userServ.mdp, user.mdp);
                    if (mdpServeur.equals(mdpUser) && mdpUser != "") {
                        Log.d("Conn", "*************** Connexion reussie");
                        setMdpCorrect(true);
                    } else {
                        Log.d("ErrConn", "*************** mdp incorrect");
                        setMdpCorrect(false);
                    }
                    Utilisateur connexionUtilisateurs = new Utilisateur(
                            Integer.parseInt(info.getString("idUtilisateur")),
                            info.getString("nomUtilisateur"),
                            info.getString("prenomUtilisateur"),
                            info.getString("mailUtilisateur"),
                            info.getString("telUtilisateur"),
                            info.getString("mdpUtilisateur"),
                            info.getString("descriptionUtilisateur")
                    );

                    controle.setConnexionUtilisateurs(connexionUtilisateurs);

                } catch (Exception e) {
                    Log.d("ERREUR", "************** Recup donnee connexions echouee\n****" + e);
                    ConnexionActivity conn = new ConnexionActivity();
                }
            }
            /**
             * Accepter une demande
             */
            else if (message[0].equals("accepter")) {
                Log.d("insert","********** Changement réussi");
            }
            /**
             * Récupération  de toutes les demandes
             */
            else if (message[0].equals("demandesTout")){
                Log.d("demandes","*****************" + message[1]);
                try {
                    JSONArray jsonInfo = new JSONArray(message[1]);
                    ArrayList<Demande> lesDemandes = new ArrayList<Demande>();
                    for(int k=0;k<jsonInfo.length();k++){
                        JSONObject info = new JSONObject(jsonInfo.get(k).toString());

                        // Ajout des valeur de la demandes
                        Integer idDemande = info.getInt("idDemande");
                        String titreDemande = info.getString("titreDemande");
                        String descriptionDemande = info.getString("descriptionDemande");
                        String dateDemande = info.getString("dateDemande");
                        Integer idUtilisateur = info.getInt("idUtilisateur");
                        String idCategorie = info.getString("idCategorie");
                        String defraiementDemande = info.getString("defraiementDemande");
                        String idCodePostal = info.getString("idCodePostal");
                        Integer accepteDemande = info.getInt("accepteDemande");
                        Integer acceptePar = info.getInt("acceptePar");

                        // Création de l'objet
                        Demande demande = new Demande(idDemande,titreDemande,descriptionDemande,dateDemande,idUtilisateur,idCategorie,defraiementDemande,
                                idCodePostal,accepteDemande,acceptePar);
                        lesDemandes.add(demande);
                        Log.d("Ajout","********************* Demande ajoutéé");
                    }
                    controle.setLesDemandes(lesDemandes);
                } catch (JSONException e) {
                    e.printStackTrace();
                }
            }
            /**
             * Récupération des demandes en cours
             */
            else if (message[0].equals("demandesEnCours")){
                Log.d("demandes","*****************" + message[1]);
                try {
                    JSONArray jsonInfo = new JSONArray(message[1]);
                    ArrayList<Demande> lesDemandesEnCours = new ArrayList<Demande>();
                    for(int k=0;k<jsonInfo.length();k++){
                        JSONObject info = new JSONObject(jsonInfo.get(k).toString());

                        // Ajout des valeur de la demandes
                        Integer idDemande = info.getInt("idDemande");
                        String titreDemande = info.getString("titreDemande");
                        String descriptionDemande = info.getString("descriptionDemande");
                        String dateDemande = info.getString("dateDemande");
                        Integer idUtilisateur = info.getInt("idUtilisateur");
                        String idCategorie = info.getString("idCategorie");
                        String defraiementDemande = info.getString("defraiementDemande");
                        String idCodePostal = info.getString("idCodePostal");
                        Integer accepteDemande = info.getInt("accepteDemande");
                        Integer acceptePar = info.getInt("acceptePar");

                        // Création de l'objet
                        Demande demandeEnCours = new Demande(idDemande,titreDemande,descriptionDemande,dateDemande,idUtilisateur,idCategorie,defraiementDemande,
                                idCodePostal,accepteDemande,acceptePar);
                        lesDemandesEnCours.add(demandeEnCours);
                        Log.d("Ajout","********************* Demande en cours ajoutéé");
                    }
                    controle.setLesDemandesEnCours(lesDemandesEnCours);
                } catch (JSONException e) {
                    e.printStackTrace();
                }
            }
            /**
             * Récupération des demandes introduites par l'utilisateurs
             */
            else if (message[0].equals("mesDemandes")){
                Log.d("mes demandes:","*****************" + message[1]);
                try {
                    JSONArray jsonInfo = new JSONArray(message[1]);
                    ArrayList<Demande> lstMesDemandes = new ArrayList<Demande>();
                    for(int k=0;k<jsonInfo.length();k++){
                        JSONObject info = new JSONObject(jsonInfo.get(k).toString());

                        // Ajout des valeur de la demandes
                        Integer idDemande = info.getInt("idDemande");
                        String titreDemande = info.getString("titreDemande");
                        String descriptionDemande = info.getString("descriptionDemande");
                        String dateDemande = info.getString("dateDemande");
                        Integer idUtilisateur = info.getInt("idUtilisateur");
                        String idCategorie = info.getString("idCategorie");
                        String defraiementDemande = info.getString("defraiementDemande");
                        String idCodePostal = info.getString("idCodePostal");
                        Integer accepteDemande = info.getInt("accepteDemande");
                        Integer acceptePar = info.getInt("acceptePar");

                        // Création de l'objet
                        Demande mesDemandes = new Demande(idDemande,titreDemande,descriptionDemande,dateDemande,idUtilisateur,idCategorie,defraiementDemande,
                                idCodePostal,accepteDemande,acceptePar);
                        lstMesDemandes.add(mesDemandes);
                        Log.d("Ajout","********************* Demande en cours ajoutéé");
                    }
                    controle.setMesDemandes(lstMesDemandes);
                } catch (JSONException e) {
                    e.printStackTrace();
                }
            }
            /**
             * Message d'erreur si l'output ne contient aucun des choix
             */
            else {
                Log.d("ERREUR", "*************** Aucun choix valide");
            }
        }
    }

    /**
     * Methode pour envoyer des donnees à la base de donnees
     *
     * @param operation
     * @param lesDonneesJSON
     */
    public void envoi(String operation, JSONArray lesDonneesJSON) {
        AccessHTTP accesDonnees = new AccessHTTP();
        // lien de délégation
        accesDonnees.delegate = this;
        //ajout parametre
        accesDonnees.addParam("operation", operation);
        accesDonnees.addParam("lesdonnees", lesDonneesJSON.toString());
        // appel au serveur
        accesDonnees.execute(SERVEURADDR);
    }

    public void setMdpUser(String mdpUser) {
        this.mdpUser = mdpUser;
    }

    public void setMdpCorrect(boolean mdpCorrect) {
        this.mdpCorrect = mdpCorrect;
    }
    public boolean isMdpCorrect() {
        return mdpCorrect;
    }
}
