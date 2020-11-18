package com.example.needhelp.modele;

public class Demande {

    // Variables locales
    private int idDemande;
    private String titreDemande;
    private String DescriptionDemande;
    private String dateDemande;
    private int idUtilisateur;
    private int idCategorie;
    private int defraiement;
    private int idCodePostal;
    private int accepteDemande;
    private int acceptePar;

    public Demande(int idDemande, String titreDemande, String descriptionDemande, String dateDemande,
                   int idUtilisateur, int idCategorie, int defraiement, int idCodePostal, int accepteDemande, int acceptePar) {
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

    public Demande(String titreDemande, String descriptionDemande, int idUtilisateur, int idCategorie, int defraiement, int idCodePostal) {
        this.titreDemande = titreDemande;
        this.DescriptionDemande = descriptionDemande;
        this.idUtilisateur = idUtilisateur;
        this.idCategorie = idCategorie;
        this.defraiement = defraiement;
        this.idCodePostal = idCodePostal;
    }

    public Demande(String dateDemande, String titreDemande, String descriptionDemande, int idUtilisateur, int idCategorie, int defraiement, int idCodePostal) {
        this.titreDemande = titreDemande;
        this.DescriptionDemande = descriptionDemande;
        this.dateDemande = dateDemande;
        this.idUtilisateur = idUtilisateur;
        this.idCategorie = idCategorie;
        this.defraiement = defraiement;
        this.idCodePostal = idCodePostal;
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
}
