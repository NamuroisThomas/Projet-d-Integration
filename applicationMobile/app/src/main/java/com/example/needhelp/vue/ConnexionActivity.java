package com.example.needhelp.vue;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

import androidx.appcompat.app.AppCompatActivity;

import com.example.needhelp.R;
import com.example.needhelp.controleur.Controle;

public class ConnexionActivity extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.connexion_screen);
        ecouteGoToAcceuil();
        ecouteGoToHome();
    }
    private void ecouteGoToAcceuil(){
        ((Button)findViewById(R.id.deconnexion)).setOnClickListener(new Button.OnClickListener(){
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(ConnexionActivity.this,MainActivity.class);
                startActivity(intent);
            }
        });
    }
    private void ecouteGoToHome(){
        ((Button)findViewById(R.id.connexion)).setOnClickListener(new Button.OnClickListener(){
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(ConnexionActivity.this,HomeActivity.class);
                startActivity(intent);
            }
        });
    }
}
