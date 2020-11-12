package com.example.needhelp.modele;

import java.util.Date;

public class Demande {

    // Variables locales
    private int idDemande;
    private String titreDemande;
    private String DescriptionDemande;
    private Date dateDemande;
    private int idUtilisateur;
    private int idCategorie;
    private int defraiement;
    private int idCodePostal;
    private int accepteDemande;
    private int acceptePar;

    public Demande(int idDemande, String titreDemande, String descriptionDemande, Date dateDemande,
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

    public Demande(Date dateDemande, String titreDemande, String descriptionDemande, int idUtilisateur, int idCategorie, int defraiement, int idCodePostal) {
        this.titreDemande = titreDemande;
        this.DescriptionDemande = descriptionDemande;
        this.dateDemande = dateDemande;
        this.idUtilisateur = idUtilisateur;
        this.idCategorie = idCategorie;
        this.defraiement = defraiement;
        this.idCodePostal = idCodePostal;
    }
}
