package com.example.needhelp.vue;

import android.os.Bundle;

import android.content.Intent;

import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.ListAdapter;
import android.widget.ListView;

import androidx.appcompat.app.AppCompatActivity;

import com.example.needhelp.R;
import com.example.needhelp.controleur.Controle;
import com.example.needhelp.modele.AccesDistant;
import com.example.needhelp.modele.Demande;

import java.util.ArrayList;

public class EnCoursActivity extends AppCompatActivity{

    private Controle controle = new Controle();


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.en_cours);
        ecouteGoToLesDemandes();
        ecouteBoutonProfil();
        creerListeEnCours();
        ecouteGoToMesDemande();
    }

    /**
     * Méthode pour créer une liste grace à l'adapter
     */
    private void creerListeEnCours(){
        ArrayList<Demande> lesDemandesEnCours = controle.getLesDemandesEnCours();
        if (lesDemandesEnCours != null){
            ListView lstDemandesEnCours = (ListView)findViewById(R.id.lstDemandesEnCours);
            EnCoursListAdapter adapter = new EnCoursListAdapter(this,lesDemandesEnCours);
            lstDemandesEnCours.setAdapter((ListAdapter) adapter);
        }
    }

    /**
     * Méthode pour changer d'écran et aller sur Home
     */
    private void ecouteGoToLesDemandes(){
        ((Button)findViewById(R.id.radioDemandesToutes)).setOnClickListener(new Button.OnClickListener(){
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(EnCoursActivity.this,HomeActivity.class);
                startActivity(intent);
            }
        });
    }

    /**
     * Méthode pour changer d'écran et aller sur le profil
     */
    public void  ecouteBoutonProfil() {
        ((Button) findViewById(R.id.radioProfil)).setOnClickListener(new Button.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(EnCoursActivity.this, ProfilActivity.class);
                startActivity(intent);

            }
        });
    }

    /**
     * Méthode pour changer d'écran et aller sur mes demandes
     */
    private void ecouteGoToMesDemande(){
        ((Button)findViewById(R.id.radioMesDemandes)).setOnClickListener(new Button.OnClickListener(){
            @Override
            public void onClick(View v) {
                try{
                    final Thread t1 = new Thread(){
                        public void run(){
                            Log.d("Tread","**************** T1 commence");
                            AccesDistant accesDistant = new AccesDistant();
                            accesDistant.envoi("mesDemandes", controle.idUtilisateurConvertToJSONArray());
                            Log.d("test","************* ID:" + controle.idUtilisateurConvertToJSONArray());
                            try {
                                Thread.sleep(3000);
                            } catch (InterruptedException e) {
                                e.printStackTrace();
                            }
                            Intent intent = new Intent(EnCoursActivity.this,MesDemandesActivity.class);
                            startActivity(intent);
                        }
                    };
                    t1.start();
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }

    /**
     * Méthode pour aller vers le chat
     */
    void ecouteGoToChat(){
        Intent intent = new Intent(EnCoursActivity.this,ChatActivity.class);
        startActivity(intent);
    }
}
