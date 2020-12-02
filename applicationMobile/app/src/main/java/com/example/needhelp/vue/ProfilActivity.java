package com.example.needhelp.vue;

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
import com.example.needhelp.modele.Utilisateur;

public class ProfilActivity extends AppCompatActivity {

    Controle controle = new Controle();
    Utilisateur utilisateur;
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


}
