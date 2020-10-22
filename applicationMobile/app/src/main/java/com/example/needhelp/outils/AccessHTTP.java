package com.example.needhelp.outils;

import android.os.AsyncTask;
import android.provider.Settings;
import android.util.Log;

import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.HttpClient;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;
import org.w3c.dom.Entity;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;

public class AccessHTTP extends AsyncTask<String,Integer,Long> {

    private ArrayList<NameValuePair> parametres;
    private String ret = "null !";
    public AsyncResponse delegate = null;

    /**
     * Constructeur
     */
    public AccessHTTP(){
        parametres = new ArrayList<NameValuePair>();
    }

    /**
     * Ajout d'un parametre post
     * @param nom
     * @param valeur
     */
    public void addParam(String nom, String valeur){
        parametres.add(new BasicNameValuePair(nom,valeur));
    }
    @Override
    /**
     * Connexion en tache de fond dans un thread separe
     * @param strings
     * @return
     */
    protected Long doInBackground(String... strings) {
        HttpClient cnxHttp = new DefaultHttpClient();
        HttpPost paramCnx = new HttpPost(strings[0]);

        try {
            // encodage des paramètres
            paramCnx.setEntity(new UrlEncodedFormEntity(parametres));
            // connexion et envoi des parametres, attente de reponse
            HttpResponse response = cnxHttp.execute(paramCnx);
            // transformation de la reponse
            ret = EntityUtils.toString(response.getEntity());

        } catch (UnsupportedEncodingException e) {
            Log.d("Erreur Encodage", "**************" + e.toString());
        } catch (ClientProtocolException e) {
            Log.d("Erreur protocole", "**************" + e.toString());
        } catch (IOException e) {
            Log.d("Erreur I/O", "**************" + e.toString());
        }
        return null;
    }

    @Override
    protected void onPostExecute(Long result) {
        delegate.processFinish(ret.toString());
    }
}
