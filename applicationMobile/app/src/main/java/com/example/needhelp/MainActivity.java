package com.example.needhelp;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Context;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import com.example.needhelp.controleur.Controle;

//import javax.swing.text.View;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.acceuil);
        init();
        this.controle = Controle.getInstance();
    }

    private Controle controle;
    private String nomCateg;

    // variable pour les layout
    private EditText nomInscription;
    private EditText prenomInscription;
    private EditText mailInscription;
    private EditText telInscription;
    private EditText mdpInscription;
    private  EditText mdpConfirmation;

    /**
     * Initialisation des lien avec les objets graphiques
     */
    public void init(){
        nomInscription = (EditText)findViewById(R.id.inscriptionNomEdit);
        prenomInscription = (EditText)findViewById(R.id.inscriptionPrenomEdit);
        mailInscription = (EditText)findViewById(R.id.inscriptionMailEdit);
        telInscription = (EditText)findViewById(R.id.inscriptionGSMEdit);
        mdpInscription = (EditText)findViewById(R.id.inscriptionPSWEdit);
        mdpConfirmation = (EditText)findViewById(R.id.inscriptionConfirmEdit);
        //ecouteInscription();
    }

   public void goInscriptionScreen(View view){
        setContentView(R.layout.inscription_screen);
        ecouteInscription();
    }

    public void goConnexionScreen(View view){
        setContentView(R.layout.connexion_screen);
    }

    public void back(View view){
        setContentView(R.layout.acceuil);
    }

    public void goHome(View view) {
        setContentView(R.layout.home);
    }

    /**
     * Ecoute évemenent sur le bouton inscription
     */
    public void ecouteInscription(){
        ((Button)findViewById(R.id.inscriptionBouton)).setOnClickListener(new Button.OnClickListener(){
            @Override
            public void onClick(View v) {
                //Toast.makeText(MainActivity.this, "test",Toast.LENGTH_SHORT).show();

                String nom = "";
                String prenom = "";
                String mail = "";
                Integer tel = 0;
                String mdp = "";
                String confMdp = "";

                // Recuperation des données saisies
                try {
                    nom = nomInscription.getText().toString();
                    prenom = prenomInscription.getText().toString();
                    mail = mailInscription.getText().toString();
                    tel = Integer.parseInt(telInscription.getText().toString());
                    mdp = mdpInscription.getText().toString();
                    confMdp = mdpConfirmation.getText().toString();
                }catch (Exception e){}

                // Controle des données saisie
                if(nom==""||prenom==""||mail==""||tel==0||mdp==""||confMdp==""){
                    Toast.makeText(MainActivity.this,"Saisie incorrect",Toast.LENGTH_SHORT).show();
                }else if (mdp != confMdp){
                    Toast.makeText(MainActivity.this,"mdp incorrect",Toast.LENGTH_SHORT).show();
                }else {
                    afficheResult(nom,prenom,mail,tel,mdp);
                }

            }
        });
    }

    /**
     * Permet d'afficher la récup des paramètres
     * @param nom
     * @param prenom
     * @param mail
     * @param tel
     * @param mdp
     */
    private void afficheResult(String nom,String prenom, String mail, Integer tel, String mdp){
        Toast.makeText(MainActivity.this,"ok",Toast.LENGTH_SHORT).show();

        Log.d("nom", "*******************" + nom);
        Log.d("prenom", "*******************" + prenom);
        Log.d("mail", "*******************" + mail);
        Log.d("tel", "*******************" + tel);
        Log.d("mdp", "*******************" + mdp);
    }
}