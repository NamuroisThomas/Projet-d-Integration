package com.example.needhelp.vue;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import com.example.needhelp.R;
import com.example.needhelp.controleur.Controle;
import com.example.needhelp.modele.AccesDistant;
import com.example.needhelp.modele.Utilisateur;

public class ConnexionActivity extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.connexion_screen);
        init();
        ecouteGoToAcceuil();
        //ecouteGoToHome();
        ecouteConnexion();
    }

    // Variables de classe
    EditText mailEdit;
    EditText mdpEdit;

    String mailServer = "";
    String mdpServer = "";


    /**
     * Bouton pour la deconnexion
     */
    private void ecouteGoToAcceuil(){
        ((Button)findViewById(R.id.deconnexion)).setOnClickListener(new Button.OnClickListener(){
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(ConnexionActivity.this,MainActivity.class);
                startActivity(intent);
            }
        });
    }

    /**
     * Temporaire
     */
    private void ecouteGoToHome(){
        ((Button)findViewById(R.id.connexion)).setOnClickListener(new Button.OnClickListener(){
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(ConnexionActivity.this,HomeActivity.class);
                startActivity(intent);
            }
        });
    }

    /**
     * Méthode pour initialiser les objets graphiques
     */
    private void init(){
         mailEdit = (EditText)findViewById(R.id.connexionMailEdit);
         mdpEdit = (EditText)findViewById(R.id.connexionPSWEdit);
    }
    /**
     * Bouton pour la connexion
     */
    private void ecouteConnexion(){
        ((Button)findViewById(R.id.connexion)).setOnClickListener(new Button.OnClickListener(){
            @Override
            public void onClick(View v) {

                // Variables locales
                String mail = "";
                String mdp = "";
                String mailServer = "";
                String mdpServer = "";

                try {
                    mail = mailEdit.getText().toString();
                    mdp = mdpEdit.getText().toString();
                }catch (Exception e){
                    Log.d("Recup", "****************** Erreur recuperation donnees connexion\n****" + e);
                }
                Utilisateur user = new Utilisateur(mail,mdp);

                // Envoi de la requête à la DB
                AccesDistant accesDistant = new AccesDistant();
                accesDistant.envoi("connexion", user.connexionConvertToJsonArray());
                accesDistant.;

                /*
                //Recupération des données
                mdpServer = accesDistant.getMdpServeur();

                // Vérification du mot de passe
                if (mdpServer.equals(mdp)){
                    Intent intent = new Intent(ConnexionActivity.this,HomeActivity.class);
                    startActivity(intent);
                    Log.d("Conn", "*************** Connexion reussie");
                }else{
                    Toast.makeText(ConnexionActivity.this,"Mot de passe incorrect",Toast.LENGTH_SHORT).show();
                }
                 */
            }

        });
    }
}
