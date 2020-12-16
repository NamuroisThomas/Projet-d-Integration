package com.example.needhelp.vue;

import android.annotation.SuppressLint;
import android.content.Intent;
import android.os.Bundle;
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

public class MesDemandesActivity extends AppCompatActivity {

    private Controle controle = new Controle();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.mes_demandes);
        ecouteGoToLesDemandes();
        ecouteBoutonProfil();
        creerListeMesDemandes();
        ecouteGoToEncours();
    }

    private void creerListeMesDemandes(){
        ArrayList<Demande> mesDemandes = controle.getMesDemandes();
        Log.d("Mes demandes","******************" + mesDemandes);
        if (mesDemandes != null){
            ListView lstMesDemandes = (ListView)findViewById(R.id.lstMesDemandes);
            MesDemandesListAdapter adapter = new MesDemandesListAdapter(this,mesDemandes);
            lstMesDemandes.setAdapter((ListAdapter) adapter);
        }
    }

    private void ecouteGoToLesDemandes(){
        ((Button)findViewById(R.id.radioDemandesToutes)).setOnClickListener(new Button.OnClickListener(){
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(MesDemandesActivity.this,HomeActivity.class);
                startActivity(intent);
            }
        });
    }

    public void  ecouteBoutonProfil() {
        ((Button) findViewById(R.id.radioProfil)).setOnClickListener(new Button.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(MesDemandesActivity.this, ProfilActivity.class);
                startActivity(intent);

            }
        });
    }

    @SuppressLint("WrongViewCast")
    private void ecouteGoToEncours(){
        ((Button)findViewById(R.id.radioEnCours)).setOnClickListener(new Button.OnClickListener(){
            @Override
            public void onClick(View v) {
                try{
                    final Thread t1 = new Thread(){
                        public void run(){
                            Log.d("Tread","**************** T1 commence");
                            AccesDistant accesDistant = new AccesDistant();
                            accesDistant.envoi("demandesEnCours", controle.idUtilisateurConvertToJSONArray());
                            Log.d("test","************* ID:" + controle.idUtilisateurConvertToJSONArray());
                            try {
                                Thread.sleep(3000);
                            } catch (InterruptedException e) {
                                e.printStackTrace();
                            }
                            Intent intent = new Intent(MesDemandesActivity.this,EnCoursActivity.class);
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

    void ecouteGoToChat(Demande demande){
        controle.setDemande(demande);
        Intent intent = new Intent(MesDemandesActivity.this,ChatActivity.class);
        startActivity(intent);
    }
}
