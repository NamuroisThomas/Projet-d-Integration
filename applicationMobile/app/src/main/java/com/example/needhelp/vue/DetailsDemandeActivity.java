package com.example.needhelp.vue;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;

import androidx.appcompat.app.AppCompatActivity;

import com.example.needhelp.R;
import com.example.needhelp.controleur.Controle;
import com.example.needhelp.modele.Demande;

public class DetailsDemandeActivity extends AppCompatActivity {
    private Controle controle;
    private Demande demande;
    public EditText titre;
    public EditText description;
    public EditText defraiment;
    public EditText categorie;
    public EditText codePostal;
    String cat;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.detail_demande);
        ecouteGoToLesDemandes();
        init();
    }

    public void init(){
        titre = (EditText)findViewById(R.id.valueTitreDescription);
        description = (EditText)findViewById(R.id.valueChampDescription);
        defraiment = (EditText)findViewById(R.id.valueDefraiement);
        categorie = (EditText)findViewById(R.id.valueCategorie);
        codePostal = (EditText)findViewById(R.id.valueCodePostal);

        demande = controle.getDemande();

        titre.setText(demande.getTitreDemande());
        description.setText(demande.getDescriptionDemande());
        defraiment.setText(demande.getDefraiement());
        //categorie.setText(demande.getIdCategorie());
        codePostal.setText(demande.getIdCodePostal());

        switch (demande.getIdCategorie()){
            case "1" :
                cat = "Courses";
                break;
            case "2" :
                cat = "Aides ménagères";
                break;
            case "3" :
                cat = "Petits travaux";
                break;
            case "4" :
                cat = "Transport";
                break;
            case "5" :
                cat = "Couture";
                break;
            case "6" :
                cat = "Jardinage";
                break;
            case "7" :
                cat = "Electricité";
                break;
            case "8" :
                cat = "Peinture";
                break;
            case "9" :
                cat = "Cuisine";
                break;
            case "0" :
                cat = "Autre";
                break;
        }
        categorie.setText(cat);
    }

    /**
     * Bouton menant à l'écran les demande
     */
    public void  ecouteGoToLesDemandes() {
        ((Button) findViewById(R.id.boutonRetour)).setOnClickListener(new Button.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(DetailsDemandeActivity.this, HomeActivity.class);
                startActivity(intent);
            }
        });
    }
}
