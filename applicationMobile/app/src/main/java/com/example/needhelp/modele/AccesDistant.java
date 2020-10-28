package com.example.needhelp.modele;

import android.util.Log;

import com.example.needhelp.controleur.Controle;
import com.example.needhelp.outils.AccessHTTP;
import com.example.needhelp.outils.AsyncResponse;
import com.example.needhelp.vue.ConnexionActivity;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class AccesDistant implements AsyncResponse {

    //constante
    private static final String SERVEURADDR = "http://192.168.1.9/needhelp/serveurAndroid.php";
    //Variables
    private Controle controle;
    String mailServeur;
    String mdpServeur;

    /**
     * Constructeur
     */
    public AccesDistant(){
        controle = Controle.getInstance();
    }

    /**
     * retour serveur distant
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
        if(message.length>1) {
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
            }else if (message[0].equals("Erreur !")) {
                Log.d("Erreur !", "***********" + message[1]);
            } else if (message[0].equals("connexion")) {
                try {
                    JSONObject info = new JSONObject(message[1]);
                   mailServeur = info.getString("mailUtilisateur");
                   mdpServeur = info.getString("mdpUtilisateur");
                    Log.d("HIT", "***********" + message[1]);
                } catch (Exception e) {
                    Log.d("ERREUR", "************** Recup donnee connexions echouee\n****" + e);
                }
            }else{
                Log.d("ERREUR", "*************** Aucun choix valide");
            }
        }
    }

    /**
     * Methode pour envoyer des donnees à la base de donnees
     * @param operation
     * @param lesDonneesJSON
     */
    public void envoi(String operation, JSONArray lesDonneesJSON){
        AccessHTTP accesDonnees = new AccessHTTP();
        // lien de délégation
        accesDonnees.delegate = this;
        //ajout parametre
        accesDonnees.addParam("operation",operation);
        accesDonnees.addParam("lesdonnees", lesDonneesJSON.toString());
        // appel au serveur
        accesDonnees.execute(SERVEURADDR);
    }

    /**
     * Methode pour recuperer des donnees
     * @param operation
     */
    public void recup(String operation){
        AccessHTTP accesDonnees = new AccessHTTP();
        // lien de délégation
        accesDonnees.delegate = this;
        //ajout parametre
        accesDonnees.addParam("operation",operation);
        // appel au serveur
        accesDonnees.execute(SERVEURADDR);
    }

    public String getMailServeur() {
        return mailServeur;
    }

    public String getMdpServeur() {
        return mdpServeur;
    }
}
