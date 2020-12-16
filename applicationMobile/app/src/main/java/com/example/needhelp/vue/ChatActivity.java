package com.example.needhelp.vue;

import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ListView;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import com.example.needhelp.R;
import com.example.needhelp.controleur.Controle;
import com.example.needhelp.modele.Demande;
import com.example.needhelp.modele.Message;
import com.google.firebase.database.ChildEventListener;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;

import java.util.Map;

public class ChatActivity extends AppCompatActivity {
    Controle controle;
    EditText message;
    String envoi;
    FirebaseDatabase database = FirebaseDatabase.getInstance();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.chat_screen);
        voirMessage(Controle.getNomUtilisateur(), Controle.getDemande());
        ecouteEnvoiMessage();
    }

    public void ecouteEnvoiMessage() {
        ((Button) findViewById(R.id.fab)).setOnClickListener(new Button.OnClickListener() {
            @Override
            public void onClick(View v) {
                message = (EditText) findViewById(R.id.message);
                Log.d("message", "********************************" + message);
                envoi = (message.getText().toString());
                Log.d("test", "********************************************" + envoi);
                String utilisateur = Controle.getNomUtilisateur();
                ecriture(envoi, utilisateur, Controle.getDemande());
                //voirMessage(utilisateur, Controle.getDemande());
                message.setText("");
            }
        });
    }

    public void ecriture(String message, String utilisateur, Demande demande) {
        // Write a message to the databas
        DatabaseReference mdatabase = database.getReference();
        Log.d("myRef", "***************************************" + mdatabase);
        Message send = new Message(utilisateur, ""+demande.getIdDemande(), message);
        mdatabase.child(""+demande.getIdDemande()).child(utilisateur).push().setValue(send);
    }

    public void voirMessage(String utilisateur, Demande demande){
        DatabaseReference myRef = database.getReference(demande.getIdDemande() + "/" + utilisateur);
        // Read from the database
        myRef.addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot dataSnapshot) {
                // This method is called once with the initial value and again
                // whenever data at this location is updated.
                Message value = dataSnapshot.getValue(Message.class);
                assert value != null;
                Log.d("onDataChange", "*************************** " + value.getMessage());
            }

            @Override
            public void onCancelled(DatabaseError error) {
                // Failed to read value
                Log.w("onCancelled", "Failed to read value.", error.toException());
            }
        });
    }
}
