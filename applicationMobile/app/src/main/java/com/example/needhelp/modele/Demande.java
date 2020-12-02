package com.example.needhelp.modele;

import android.util.Log;

import org.json.JSONArray;

import java.util.ArrayList;
import java.util.List;

public class Demande {

    // Variables locales
    private int idDemande;
    private String titreDemande;
    private String DescriptionDemande;
    private String dateDemande;
    private int idUtilisateur;
    private int idCategorie;
    private int defraiement;
    private String idCodePostal;
    private int accepteDemande;
    private int acceptePar;

    public Demande(int idDemande, String titreDemande, String descriptionDemande, String dateDemande,
                   int idUtilisateur, int idCategorie, int defraiement, String idCodePostal, int accepteDemande, int acceptePar) {
        this.idDemande = idDemande;
        this.titreDemande = titreDemande;
        this.DescriptionDemande = descriptionDemande;
        this.dateDemande = dateDemande;
        this.idUtilisateur = idUtilisateur;
        this.idCategorie = idCategorie;
        this.defraiement = defraiement;
        this.idCodePostal = idCodePostal;
        this.accepteDemande = accepteDemande;
        this.acceptePar = acceptePar;
    }

    public Demande(String titreDemande, String descriptionDemande, int idUtilisateur, int idCategorie, int defraiement, String idCodePostal) {
        this.titreDemande = titreDemande;
        this.DescriptionDemande = descriptionDemande;
        this.idUtilisateur = idUtilisateur;
        this.idCategorie = idCategorie;
        this.defraiement = defraiement;
        this.idCodePostal = idCodePostal;
    }

    public Demande(String dateDemande, String titreDemande, String descriptionDemande, int idUtilisateur, int idCategorie, int defraiement, String idCodePostal) {
        this.titreDemande = titreDemande;
        this.DescriptionDemande = descriptionDemande;
        this.dateDemande = dateDemande;
        this.idUtilisateur = idUtilisateur;
        this.idCategorie = idCategorie;
        this.defraiement = defraiement;
        this.idCodePostal = idCodePostal;
    }

    public Demande(String titre, String description, String defraiement, String categorie, String codePostal) {
        this.titreDemande = titre;
        this.DescriptionDemande = description;
        this.idUtilisateur = 18;
        this.idCategorie = 24;
        this.defraiement = 10;
        this.idCodePostal = codePostal;
    }

    public JSONArray nouvelleDemandeConvertToJSONArray(){
        List laListe = new ArrayList();
        laListe.add(titreDemande);
        laListe.add(DescriptionDemande);
        laListe.add(1);
        laListe.add(idCategorie);
        laListe.add(defraiement);
        laListe.add(idCodePostal);
        return new JSONArray(laListe);
    }

    public JSONArray accepterConvertToJSONArray(){
        List laListe = new ArrayList();
        laListe.add(idDemande);
        laListe.add(accepteDemande);
        laListe.add(acceptePar);
        Log.d("test","*****************" + laListe);
        return new JSONArray();
    }

    public int getIdDemande() {
        return idDemande;
    }

    public void setIdDemande(int idDemande) {
        this.idDemande = idDemande;
    }

    public String getTitreDemande() {
        return titreDemande;
    }

    public void setTitreDemande(String titreDemande) {
        this.titreDemande = titreDemande;
    }

    public String getDateDemande() {
        return dateDemande;
    }

    public void setDateDemande(String dateDemande) {
        this.dateDemande = dateDemande;
    }

    public void setAccepteDemande(int accepteDemande) {
        this.accepteDemande = accepteDemande;
    }
    public void setAcceptePar(int acceptePar){
        this.acceptePar = acceptePar;
    }
}
