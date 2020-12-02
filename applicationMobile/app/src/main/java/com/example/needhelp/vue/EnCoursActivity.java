package com.example.needhelp.vue;

import android.os.Bundle;

import android.content.Intent;

import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.ListView;

import androidx.appcompat.app.AppCompatActivity;

import com.example.needhelp.R;
import com.example.needhelp.controleur.Controle;
import com.example.needhelp.modele.Demande;

import java.util.ArrayList;

import com.example.needhelp.R;
import com.example.needhelp.controleur.Controle;

public class EnCoursActivity extends AppCompatActivity{

    private Controle controle;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.en_cours);
        ecouteRetour();

    }

    private void creerListeEnCours(){
        ArrayList<Demande> lesDemandesEnCours = controle.getLesDemandesEnCours();
        if (lesDemandesEnCours != null){
            ListView lstDemandesEnCours = (ListView)findViewById(R.id.lstDemandesEnCours);
            DemandeListeAdapter adapter = new DemandeListeAdapter(this,lesDemandesEnCours);
            lstDemandesEnCours.setAdapter(adapter);
        }
    }

    private void ecouteRetour(){
        ((Button)findViewById(R.id.deconnexion)).setOnClickListener(new Button.OnClickListener(){
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(EnCoursActivity.this,HomeActivity.class);
                startActivity(intent);
            }
        });
    }
}
