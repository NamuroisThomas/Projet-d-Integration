package com.example.needhelp.modele;

public class Message {
    public String utilisateur;
    public String cle;
    public String message;

    public Message(){
        //Constructeur par défaut pour Datasnapshot
    }

    public Message(String utilisateur, String cle, String message){
        this.utilisateur = utilisateur;
        this.cle = cle;
        this.message = message;
    }

    public String getMessage() {
        return message;
    }
}
