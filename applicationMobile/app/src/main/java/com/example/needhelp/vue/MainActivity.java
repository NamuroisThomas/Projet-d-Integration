package com.example.needhelp.vue;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;
import android.widget.Button;
import android.widget.Toast;

import com.example.needhelp.R;
import com.example.needhelp.controleur.Controle;



public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.acceuil);
        controle = Controle.getInstance();
        /*ecouteGoToInscription();
        ecouteGoToConnexion();*/
    }

    private Controle controle;

    /**
     * Ecoute du bouton menant à la page d'inscription.
     */
    /*private void ecouteGoToInscription(){
        ((Button)findViewById(R.id.boutonGoToInscription)).setOnClickListener(new Button.OnClickListener(){
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(MainActivity.this,InscriptionActivity.class);
                startActivity(intent);
            }
        });
    }
    private void ecouteGoToConnexion(){
        ((Button)findViewById(R.id.boutonGoToConnexion)).setOnClickListener(new Button.OnClickListener(){
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(MainActivity.this,ConnexionActivity.class);
                startActivity(intent);
            }
        });
    }*/

}