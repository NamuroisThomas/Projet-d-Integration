package com.example.needhelp;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Context;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

import com.example.needhelp.controleur.Controle;

//import javax.swing.text.View;

public class MainActivity extends AppCompatActivity {

    private Controle controle;
    private String nomCateg;



    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.acceuil);
        afficher();
    }

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

    public void afficher(){
        final TextView nomDesCateg = (TextView)findViewById(R.id.db);
        //nomDesCateg.setText("test");
        Controle.getInstance();
    }

    public void recupUser() {

    }
}