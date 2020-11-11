package com.example.needhelp.modele;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.util.Log;
import android.widget.Toast;

import com.example.needhelp.R;
import com.example.needhelp.controleur.Controle;
import com.example.needhelp.outils.AccessHTTP;
import com.example.needhelp.outils.AsyncResponse;
import com.example.needhelp.vue.ConnexionActivity;
import com.example.needhelp.vue.HomeActivity;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

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
        controle = Controle.getInstance();
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
            } else if (message[0].equals("dernier")) {
                Log.d("dernier", "***********" + message[1]);
                try {
                    JSONObject info = new JSONObject(message[1]);
                    Integer idCateg = info.getInt("idCategorie");
                    String nomCateg = info.getString("nomCategorie");
                } catch (JSONException e) {
                    Log.d("erreur ", "Conversiont JSON impossible ***********" + e.toString());
                }
            } else if (message[0].equals("Erreur !")) {
                Log.d("Erreur !", "***********" + message[1]);
            } else if (message[0].equals("connexion")) {
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

                } catch (Exception e) {
                    Log.d("ERREUR", "************** Recup donnee connexions echouee\n****" + e);
                    ConnexionActivity conn = new ConnexionActivity();
                }
            }else if (message[0].equals("demandeTout")){
                Log.d("demandes","*****************" + message[1]);
            } else {
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
