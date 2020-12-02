package com.example.needhelp.vue;

import android.annotation.SuppressLint;
import android.content.Intent;
import android.os.Bundle;
import android.provider.ContactsContract;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.ListView;
import android.widget.RadioButton;
import android.widget.RadioGroup;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import com.example.needhelp.R;
import com.example.needhelp.controleur.Controle;
import com.example.needhelp.modele.AccesDistant;
import com.example.needhelp.modele.Demande;

import org.json.JSONArray;

import java.util.ArrayList;

public class HomeActivity extends AppCompatActivity {
    private Controle controle;
    RadioGroup Radiogroup;
    RadioButton radioButton;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.home);
        this.controle = Controle.getInstance(this);
        ecouteGoToAcceuil();
        ecouteGoToNouvelleDemande();
        creerListe();
        ecouteBoutonProfil();
        ecouteGoToEncours();
    }



    private void ecouteGoToAcceuil(){
        ((Button)findViewById(R.id.buttonDeconnexionHome)).setOnClickListener(new Button.OnClickListener(){
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(HomeActivity.this,MainActivity.class);
                startActivity(intent);
            }
        });
    }
    private void ecouteGoToNouvelleDemande(){
        ((Button)findViewById(R.id.buttonAjoutDemande)).setOnClickListener(new Button.OnClickListener(){
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(HomeActivity.this,CreerDemandeActivity.class);
                startActivity(intent);
            }
        });
    }

    private void ecouteAccepter(){
        ((Button)findViewById(R.id.btnAccepterDemande)).setOnClickListener(new Button.OnClickListener(){
            @Override
            public void onClick(View v) {
                Log.d("test", "*******************************Le bouton réagi");
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
                            try {
                                Thread.sleep(3000);
                            } catch (InterruptedException e) {
                                e.printStackTrace();
                            }
                            Intent intent = new Intent(HomeActivity.this,EnCoursActivity.class);
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
     * Cette méthode va permettre de créer la iste des demandes
     */
    private void creerListe(){
        ArrayList<Demande> lesDemandes = controle.getLesDemandes();
        if (lesDemandes != null){
            ListView lstDemandes = (ListView)findViewById(R.id.lstDemandes);
            DemandeListeAdapter adapter = new DemandeListeAdapter(this,lesDemandes);
            lstDemandes.setAdapter(adapter);
        }
    }

    public void  ecouteBoutonProfil() {
        ((Button) findViewById(R.id.radioProfil)).setOnClickListener(new Button.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(HomeActivity.this, ProfilActivity.class);
                startActivity(intent);

            }
        });
    }
      
    private void recupDemandesEnCours() {
            Controle controle = new Controle();
            AccesDistant accesDistant = new AccesDistant();
            accesDistant.envoi("demandesEnCours", controle.idUtilisateurConvertToJSONArray());

    }
}
