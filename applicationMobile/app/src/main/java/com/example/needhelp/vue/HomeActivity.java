package com.example.needhelp.vue;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.ListView;

import androidx.appcompat.app.AppCompatActivity;

import com.example.needhelp.R;
import com.example.needhelp.controleur.Controle;
import com.example.needhelp.modele.Demande;

import java.util.ArrayList;

public class HomeActivity extends AppCompatActivity {
    private Controle controle;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.home);
        this.controle = Controle.getInstance(this);
        ecouteGoToAcceuil();
        ecouteGoToNouvelleDemande();
        creerListe();
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
}
