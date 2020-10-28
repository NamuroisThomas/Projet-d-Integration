package com.example.needhelp.vue;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.view.View;

import com.example.needhelp.R;
import com.example.needhelp.controleur.Controle;



public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.acceuil);
        this.controle = Controle.getInstance();
    }

    private Controle controle;

   public void goInscriptionScreen(View view){
        setContentView(R.layout.inscription_screen);
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
}