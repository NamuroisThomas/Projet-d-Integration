package com.example.needhelp.vue;

import android.annotation.SuppressLint;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.RadioButton;
import android.widget.RadioGroup;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import com.example.needhelp.R;
import com.example.needhelp.controleur.Controle;
import com.example.needhelp.modele.AccesDistant;
import com.example.needhelp.modele.Utilisateur;

import java.util.regex.Pattern;

public class ProfilActivity extends AppCompatActivity {

    Controle controle = new Controle();
    Utilisateur utilisateur;
    int idUtilisateur;
    EditText nom;
    EditText prenom;
    EditText email;
    EditText telephone;
    EditText mdp;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.profils);
        init();
        ecouteGoToEncours();
        ecouterBoutonModifier();
        ecouteGoToLesDemandes();
    }

    public void init(){
        nom = (EditText)findViewById(R.id.inscriptionNomEdit);
        prenom = (EditText)findViewById(R.id.inscriptionPrenomEdit);
        email = (EditText)findViewById(R.id.inscriptionMailEdit);
        telephone = (EditText)findViewById(R.id.inscriptionGSMEdit);
        mdp = (EditText)findViewById(R.id.inscriptionPSWEdit);

        utilisateur = controle.getConnexionUtilisateurs();
        Log.d("test", "**********************"+controle.getConnexionUtilisateurs());
        nom.setText(utilisateur.getNomUser());
        prenom.setText(utilisateur.getPrenomUser());
        email.setText(utilisateur.getMail());
        telephone.setText(utilisateur.getTelephone());
        mdp.setText(utilisateur.getMdp());

    }

    public void ecouterBoutonModifier(){
        ((Button)findViewById(R.id.modifierBouton)).setOnClickListener(new Button.OnClickListener(){
            @Override
            public void onClick(View v) {
                //Toast.makeText(MainActivity.this, "test",Toast.LENGTH_SHORT).show();
                idUtilisateur = controle.getIdUtilisateur();
                nom = (EditText)findViewById(R.id.inscriptionNomEdit);
                prenom = (EditText)findViewById(R.id.inscriptionPrenomEdit);
                email = (EditText)findViewById(R.id.inscriptionMailEdit);
                telephone = (EditText)findViewById(R.id.inscriptionGSMEdit);
                mdp = (EditText)findViewById(R.id.inscriptionPSWEdit);

                //variables locales
                String nomModifier ="";
                String prenomModifier = "";
                String mailModifier = "";
                String telModifier = "";
                String mdpModifier = "";

                // Recuperation des données saisies
                try {
                    nomModifier = nom.getText().toString();
                    prenomModifier = prenom.getText().toString();
                    mailModifier = email.getText().toString();
                    telModifier = telephone.getText().toString();
                    mdpModifier = mdp.getText().toString();
                }catch (Exception e){
                    Log.d("Recup", "****************** Erreur reuperation donnees inscription\n****" + e);
                }

                // Controle des données saisie
                if((nomModifier.equals(""))||(prenomModifier.equals(""))||(mailModifier.equals(""))||(telModifier.equals(""))||(mdpModifier.equals(""))){
                    Toast.makeText(ProfilActivity.this,"Saisie incorrect",Toast.LENGTH_SHORT).show();
                }else if (telModifier.length() != 10){
                    Toast.makeText(ProfilActivity.this,"Numéro de téléphone incorrect",Toast.LENGTH_SHORT).show();
                }else if (!isValiEmail(mailModifier)){
                    Toast.makeText(ProfilActivity.this,"Format de l'adresse mail incorrect",Toast.LENGTH_SHORT).show();
                }else {
                    // si la saisie est correcte, envoie les informations à la base de données pour l'inscription
                    Utilisateur user = new Utilisateur(idUtilisateur,nomModifier,prenomModifier,mailModifier,telModifier,mdpModifier);
                    AccesDistant accesDistant = new AccesDistant();
                    Log.d("envoi modif","*************" + user.modificationConvertToJSONArray());
                    accesDistant.envoi("modificationUtilisateur", user.modificationConvertToJSONArray());

                }

            }

        });
    }

    @SuppressLint("WrongViewCast")
    private void ecouteGoToEncours(){
        ((Button)findViewById(R.id.radioEnCours)).setOnClickListener(new Button.OnClickListener(){
            @Override
            public void onClick(View v) {
                try {
                    final Thread t1 = new Thread() {
                        public void run() {
                            Log.d("Tread", "**************** T1 commence");
                            AccesDistant accesDistant = new AccesDistant();
                            accesDistant.envoi("demandesEnCours", controle.idUtilisateurConvertToJSONArray());
                            try {
                                Thread.sleep(3000);
                            } catch (InterruptedException e) {
                                e.printStackTrace();
                            }
                            Intent intent = new Intent(ProfilActivity.this, EnCoursActivity.class);
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

    public void  ecouteGoToLesDemandes() {
        ((Button) findViewById(R.id.radioProfil)).setOnClickListener(new Button.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(ProfilActivity.this, HomeActivity.class);
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