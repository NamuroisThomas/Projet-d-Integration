package com.example.needhelp.vue;

import android.annotation.SuppressLint;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Spinner;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import com.example.needhelp.R;
import com.example.needhelp.controleur.Controle;
import com.example.needhelp.modele.AccesDistant;
import com.example.needhelp.modele.Demande;
import com.example.needhelp.modele.Utilisateur;

public class CreerDemandeActivity extends AppCompatActivity {

    private Controle controle;

    //variable layout
    private EditText nouveauTitreDescription;
    private EditText nouvelleDescription;
    private EditText nouveauDefraiement;
    private Spinner nouvelleCategorie;
    private EditText nouveauCodePostal;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.nouvelle_demande);

        init();
        ecouteValider();
        ecouteGoToHome();
    }

    /**
     * Initialisation des liens avec les objets graphiques
     */

    @SuppressLint("WrongViewCast")
    private void init(){
        nouveauTitreDescription = (EditText)findViewById(R.id.valueTitreDescription);
        nouvelleDescription = (EditText)findViewById(R.id.valueChampDescription);
        nouveauDefraiement = (EditText)findViewById(R.id.valueDefraiement);
        nouvelleCategorie = (Spinner) findViewById(R.id.liste);
        nouveauCodePostal = (EditText) findViewById(R.id.valueCodePostal);


    }

    /**
     * Ecoute évenement sur le bouton valider
     */
    public void ecouteValider(){
        final String titre;
        ((Button)findViewById(R.id.buttonAjoutDemande)).setOnClickListener(new Button.OnClickListener() {
            @Override
            public void onClick(View v) {
                //Toast.makeText(MainActivity.this, "test",Toast.LENGTH_SHORT).show();

                //variables locales
                String titre = "";
                String description = "";
                String defraiement = "";
                String categorie = "";
                String codePostal = "";

                //Recupération des données saisies
                try {
                    titre = nouveauTitreDescription.getText().toString();
                    description = nouvelleDescription.getText().toString();
                    defraiement = nouveauDefraiement.getText().toString();
                    categorie = nouvelleCategorie.getSelectedItem().toString();
                    codePostal = nouveauCodePostal.getText().toString();

                } catch (Exception e) {
                    Log.d("Recup", "****************** Erreur reuperation donnees validation\n****" + e);
                }

                // Controle des données saisie
                if ((titre.equals("")) || (description.equals("")) || (defraiement.equals("")) || (categorie.equals("")) || (codePostal.equals(""))) {
                    Toast.makeText(CreerDemandeActivity.this, "Saisie incorrect", Toast.LENGTH_SHORT).show();
                } else {
                    // si la saisie est correcte, envoie les informations à la base de données pour l'inscription
                    afficheResult(titre, description, defraiement, categorie, codePostal);
                    //Utilisateur user = new Utilisateur(nom, prenom, mail, tel, mdp);
                    Demande demande = new Demande(titre, description, defraiement, categorie, codePostal);
                    AccesDistant accesDistant = new AccesDistant();
                    Log.d("enregDemande", "*************" + demande.nouvelleDemandeConvertToJSONArray());
                    accesDistant.envoi("enregDemande", demande.nouvelleDemandeConvertToJSONArray());

                    //controle.getLesDemandes().add(demande);


                    // Bouton pour aller vers la page home
                    Intent intent = new Intent(CreerDemandeActivity.this, HomeActivity.class);
                    startActivity(intent);
                }
            }
        });
    }

    private void afficheResult(String titre, String description, String defraiement, String categorie, String codePostal){
            Toast.makeText(CreerDemandeActivity.this,"ok",Toast.LENGTH_SHORT).show();

            Log.d("titre", "*******************" + titre);
            Log.d("description", "*******************" + description);
            Log.d("defraiement", "*******************" + defraiement);
            Log.d("categorie", "*******************" + categorie);
            Log.d("codePostal", "*******************" + codePostal);
    }


    private void ecouteGoToHome(){
        ((Button)findViewById(R.id.buttonDeconnexionHome)).setOnClickListener(new Button.OnClickListener(){
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(CreerDemandeActivity.this,HomeActivity.class);
                startActivity(intent);
            }
        });
    }


}
