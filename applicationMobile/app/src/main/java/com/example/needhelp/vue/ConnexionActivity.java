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
import com.example.needhelp.modele.AccesDistant;
import com.example.needhelp.modele.Utilisateur;

public class ConnexionActivity extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.connexion_screen);
        init();
        ecouteGoToAcceuil();
        ecouteConnexion();
    }

    // Variables de classe
    EditText mailEdit;
    EditText mdpEdit;

    AccesDistant accesDistant = new AccesDistant();


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
                try{
                    final Thread t1 = new Thread(){
                        public void run(){
                            Log.d("Tread","**************** T1 commence");
                            recupDB();
                            try {
                                Thread.sleep(3000);
                            } catch (InterruptedException e) {
                                e.printStackTrace();
                            }
                            connexion();
                        }
                    };
                    t1.start();
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }

    public void connexion(){
        if(accesDistant.isMdpCorrect() == true){
            Intent intent = new Intent(ConnexionActivity.this,HomeActivity.class);
            startActivity(intent);
        }
        else {
            Toast.makeText(ConnexionActivity.this,"mdp incorrect",Toast.LENGTH_SHORT).show();
        }
        Log.d("Tread","**************** T finit");

    }
    public boolean recupDB(){
        // Variables locales
        String mail = "";
        String mdp = "";

        //Récupération des données dans les champs de connexion
        try {
            mail = (mailEdit.getText().toString());
            mdp = (mdpEdit.getText().toString());
        } catch (Exception e) {
            Log.d("Recup", "****************** Erreur recuperation donnees connexion\n****" + e);
        }
        Utilisateur user = new Utilisateur(mail, mdp);
        accesDistant.setMdpUser(mdp);
        // Envoi de la requête à la DB
        accesDistant.envoi("connexion", user.connexionConvertToJsonArray());
        return true;
    }
}
