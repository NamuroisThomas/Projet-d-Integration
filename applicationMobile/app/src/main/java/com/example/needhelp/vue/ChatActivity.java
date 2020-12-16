package com.example.needhelp.vue;

import android.os.Bundle;

import androidx.appcompat.app.AppCompatActivity;

import com.example.needhelp.R;
import com.example.needhelp.controleur.Controle;

public class ChatActivity extends AppCompatActivity {
    Controle controle;
    int utilisateur = controle.getIdUtilisateur();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.chat_screen);

    }


}
