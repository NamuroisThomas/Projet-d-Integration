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
    private String idCategorie;
    private String defraiement;
    private String idCodePostal;
    private int accepteDemande;
    private int acceptePar;

    /**
     * Constructeur Complet
     * @param idDemande
     * @param titreDemande
     * @param descriptionDemande
     * @param dateDemande
     * @param idUtilisateur
     * @param idCategorie
     * @param defraiement
     * @param idCodePostal
     * @param accepteDemande
     * @param acceptePar
     */
    public Demande(int idDemande, String titreDemande, String descriptionDemande, String dateDemande,
                   int idUtilisateur, String idCategorie, String defraiement, String idCodePostal, int accepteDemande, int acceptePar) {
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

    /**
     * Constructeur incomplet
     * @param titreDemande
     * @param descriptionDemande
     * @param idUtilisateur
     * @param idCategorie
     * @param defraiement
     * @param idCodePostal
     */
    public Demande(String titreDemande, String descriptionDemande, int idUtilisateur, String idCategorie, String defraiement, String idCodePostal) {
        this.titreDemande = titreDemande;
        this.DescriptionDemande = descriptionDemande;
        this.idUtilisateur = idUtilisateur;
        this.idCategorie = idCategorie;
        this.defraiement = defraiement;
        this.idCodePostal = idCodePostal;
    }

    /**
     * Constructeur incomplet
     * @param dateDemande
     * @param titreDemande
     * @param descriptionDemande
     * @param idUtilisateur
     * @param idCategorie
     * @param defraiement
     * @param idCodePostal
     */
    public Demande(String dateDemande, String titreDemande, String descriptionDemande, int idUtilisateur, int idCategorie, String defraiement, String idCodePostal) {
        this.titreDemande = titreDemande;
        this.DescriptionDemande = descriptionDemande;
        this.dateDemande = dateDemande;
        this.idUtilisateur = idUtilisateur;
        //this.idCategorie = idCategorie;
        this.defraiement = defraiement;
        this.idCodePostal = idCodePostal;
    }

    /**
     * Méthode pour convertir une nouvelle demande à envoyer à la base de données en JSON
     * @return
     */
    public JSONArray nouvelleDemandeConvertToJSONArray(){
        List laListe = new ArrayList();
        laListe.add(titreDemande);
        laListe.add(DescriptionDemande);
        laListe.add(idUtilisateur);
        laListe.add(idCategorie);
        laListe.add(defraiement);
        laListe.add(idCodePostal);
        return new JSONArray(laListe);
    }

    /**
     * Méthode pour convertir l'acceptation de demande en JSON
     * @return
     */
    public JSONArray accepterConvertToJSONArray(){
        List laListe = new ArrayList();
        laListe.add(idDemande);
        laListe.add(accepteDemande);
        laListe.add(acceptePar);
        Log.d("test","*****************" + laListe);
        return new JSONArray(laListe);
    }

    /**
     * Getter
     * @return
     */
    public String getTitreDemande() {
        return titreDemande;
    }

    /**
     * Getter
     * @return
     */
    public String getDateDemande() {
        return dateDemande;
    }

    /**
     * Setter
     * @param accepteDemande
     */
    public void setAccepteDemande(int accepteDemande) {
        this.accepteDemande = accepteDemande;
    }

    /**
     * Getter
     * @return
     */
    public int getAcceptePar() {
        return acceptePar;
    }

    /**
     * Setter
     * @param acceptePar
     */
    public void setAcceptePar(int acceptePar) {
        this.acceptePar = acceptePar;
    }

    public int getIdDemande() {
        return idDemande;
    }

    public void setIdDemande(int idDemande) {
        this.idDemande = idDemande;
    }

    public void setTitreDemande(String titreDemande) {
        this.titreDemande = titreDemande;
    }

    public String getDescriptionDemande() {
        return DescriptionDemande;
    }

    public void setDescriptionDemande(String descriptionDemande) {
        DescriptionDemande = descriptionDemande;
    }

    public void setDateDemande(String dateDemande) {
        this.dateDemande = dateDemande;
    }

    public int getIdUtilisateur() {
        return idUtilisateur;
    }

    public void setIdUtilisateur(int idUtilisateur) {
        this.idUtilisateur = idUtilisateur;
    }

    public String getIdCategorie() {
        return idCategorie;
    }

    public void setIdCategorie(String idCategorie) {
        this.idCategorie = idCategorie;
    }

    public String getDefraiement() {
        return defraiement;
    }

    public void setDefraiement(String defraiement) {
        this.defraiement = defraiement;
    }

    public String getIdCodePostal() {
        return idCodePostal;
    }

    public void setIdCodePostal(String idCodePostal) {
        this.idCodePostal = idCodePostal;
    }

    public int getAccepteDemande() {
        return accepteDemande;
    }
}


