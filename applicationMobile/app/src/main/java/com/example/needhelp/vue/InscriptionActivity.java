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

import java.util.regex.Pattern;

public class InscriptionActivity extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.inscription_screen);
        init();
        this.controle = Controle.getInstance(this);
        ecouteInscription();
        ecouteGoToAcceuil();
    }

    private Controle controle;
    private String nomCateg;

    // variable pour les layout
    private EditText nomInscription;
    private EditText prenomInscription;
    private EditText mailInscription;
    private EditText telInscription;
    private EditText mdpInscription;
    private EditText mdpConfirmation;

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
    }
    /**
     * Ecoute évemenent sur le bouton inscription
     */
    public void ecouteInscription(){
        ((Button)findViewById(R.id.inscriptionBouton)).setOnClickListener(new Button.OnClickListener(){
            @Override
            public void onClick(View v) {
                //Toast.makeText(MainActivity.this, "test",Toast.LENGTH_SHORT).show();

                // variables locales
                String nom ="";
                String prenom = "";
                String mail = "";
                String tel = "";
                String mdp = "";
                String confMdp = "";

                // Recuperation des données saisies
                try {
                    nom = nomInscription.getText().toString();
                    prenom = prenomInscription.getText().toString();
                    mail = mailInscription.getText().toString();
                    tel = telInscription.getText().toString();
                    mdp = mdpInscription.getText().toString();
                    confMdp = mdpConfirmation.getText().toString();

                    Utilisateur connexionUtilisateurs = new Utilisateur(nom,prenom,mail,tel,mdp);
                    controle.setConnexionUtilisateurs(connexionUtilisateurs);
                }catch (Exception e){
                    Log.d("Recup", "****************** Erreur reuperation donnees inscription\n****" + e);
                }

                // Controle des données saisie
                if((nom.equals(""))||(prenom.equals(""))||(mail.equals(""))||(tel.equals(""))||(mdp.equals(""))||(confMdp.equals(""))){
                    Toast.makeText(InscriptionActivity.this,"Saisie incorrect",Toast.LENGTH_SHORT).show();
                }else if (!(mdp.equals(confMdp))){
                    Toast.makeText(InscriptionActivity.this,"mots de passe incorrect",Toast.LENGTH_SHORT).show();
                }else if (tel.length() != 10){
                    Toast.makeText(InscriptionActivity.this,"Numéro de téléphone incorrect",Toast.LENGTH_SHORT).show();
                }else if (!isValiEmail(mail)){
                    Toast.makeText(InscriptionActivity.this,"Format de l'adresse mail incorrect",Toast.LENGTH_SHORT).show();
                }else {
                    // si la saisie est correcte, envoie les informations à la base de données pour l'inscription
                    afficheResult(nom,prenom,mail,tel,mdp);
                    Utilisateur user = new Utilisateur(nom,prenom,mail,tel,mdp);
                    AccesDistant accesDistant = new AccesDistant();
                    Log.d("envoi inscript","*************" + user.inscriptionConvertToJSONArray());
                    accesDistant.envoi("inscription", user.inscriptionConvertToJSONArray());

                    // Bouton pour aller vers la page home
                    Intent intent = new Intent(InscriptionActivity.this,HomeActivity.class);
                    startActivity(intent);
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
    private void afficheResult(String nom, String prenom, String mail, String tel, String mdp){
        Toast.makeText(InscriptionActivity.this,"ok",Toast.LENGTH_SHORT).show();

        Log.d("nom", "*******************" + nom);
        Log.d("prenom", "*******************" + prenom);
        Log.d("mail", "*******************" + mail);
        Log.d("tel", "*******************" + tel);
        Log.d("mdp", "*******************" + mdp);
    }

    /**
     * Ecoute de l'évenement qui permet de changer d'activity
     */
    private void ecouteGoToAcceuil(){
        ((Button)findViewById(R.id.deconnexion)).setOnClickListener(new Button.OnClickListener(){
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(InscriptionActivity.this,MainActivity.class);
                startActivity(intent);
            }
        });
    }

    public final static Pattern EMAIL_ADDRESS_PATTERN = Pattern.compile(
            "[a-zA-Z0-9\\+\\.\\_\\%\\-\\+]{1,256}" +
                    "\\@" +
                    "[a-zA-Z0-9][a-zA-Z0-9\\-]{0,64}" +
                    "(" +
                    "\\." +
                    "[a-zA-Z0-9][a-zA-Z0-9\\-]{0,25}" +
                    ")+"
    );

    public static boolean isValiEmail(String email)
    {
        return EMAIL_ADDRESS_PATTERN.matcher(email).matches();
    }
}
