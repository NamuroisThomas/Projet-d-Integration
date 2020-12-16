package com.example.needhelp.vue;

import android.os.Bundle;

import androidx.appcompat.app.AppCompatActivity;

import com.example.needhelp.R;
import com.example.needhelp.controleur.Controle;
import com.example.needhelp.modele.Demande;

public class DetailsDemandeActivity extends AppCompatActivity {
    private Controle controle;
    private Demande demande;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.detail_demande);

    }

}
