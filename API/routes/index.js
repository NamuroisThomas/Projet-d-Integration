var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});


//Test de l'API retoure toutes les catégories
router.get('/test', function(req,res,next){
        console.log('API test');
        res.locals.connection.query('SELECT * FROM categories', function(error, results, fields) {
            if (error!=null) {
                res.redirect(529, '/error');
                console.log("erreur query");
            }
            else {
                res.send({"status": 200, "error": null, "response": results});
                console.log("query OK");
            }
        });
});


//récupération des demandes par id, par id de catégorie et code postal si spécifié, sinon revoie toutes les demandes
router.get('/demandes', function(req,res,next){
	var demande_id = req.query.idDemande;
	var categ_id = req.query.idCateg;
	var codePostal = req.query.codePostal;
    console.log('GET demande');
	if (demande_id != undefined){
	    console.log('GET demande by id '+demande_id);
		res.locals.connection.query('SELECT DISTINCT idDemande, titreDemande, descriptionDemande, dateDemande, CONCAT(u1.nomUtilisateur, " " , u1.prenomUtilisateur) AS nom, nomCategorie, idCodePostal, accepteDemande, CONCAT(u2.nomUtilisateur, " ", u2.prenomUtilisateur) AS accepte FROM demandes JOIN utilisateurs AS u1 on demandes.idUtilisateur = u1.idUtilisateur JOIN categories on demandes.idCategorie = categories.idCategorie JOIN utilisateurs AS u2 ON demandes.acceptePar = u2.idUtilisateur WHERE idDemande=?',[demande_id], function(error, results, fields) {
			if (error!=null) {
				res.redirect(529, '/error');
				console.log("erreur query");
			}
			else {
				res.send({"status": 200, "error": null, "response": results});
				console.log("query OK");
			}
		});
	} else if(categ_id != undefined) {
		console.log('GET demande by idCateg'+categ_id);
		res.locals.connection.query('SELECT DISTINCT idDemande, titreDemande, descriptionDemande, dateDemande, CONCAT(u1.nomUtilisateur, " " , u1.prenomUtilisateur) AS nom, nomCategorie, idCodePostal, accepteDemande, CONCAT(u2.nomUtilisateur, " ", u2.prenomUtilisateur) AS accepte FROM demandes JOIN utilisateurs AS u1 on demandes.idUtilisateur = u1.idUtilisateur JOIN categories on demandes.idCategorie = categories.idCategorie JOIN utilisateurs AS u2 ON demandes.acceptePar = u2.idUtilisateur WHERE demandes.idCategorie=?',[categ_id], function(error, results, fields) {
			if (error!=null) {
				res.redirect(529, '/error');
				console.log("erreur query");
			}
			else {
				res.send({"status": 200, "error": null, "response": results});
				console.log("query OK");
			}
		});
	} else if(codePostal != undefined) {
		console.log('GET demande by codePostal'+codePostal);
		res.locals.connection.query('SELECT DISTINCT idDemande, titreDemande, descriptionDemande, dateDemande, CONCAT(u1.nomUtilisateur, " " , u1.prenomUtilisateur) AS nom, nomCategorie, idCodePostal, accepteDemande, CONCAT(u2.nomUtilisateur, " ", u2.prenomUtilisateur) AS accepte FROM demandes JOIN utilisateurs AS u1 on demandes.idUtilisateur = u1.idUtilisateur JOIN categories on demandes.idCategorie = categories.idCategorie JOIN utilisateurs AS u2 ON demandes.acceptePar = u2.idUtilisateur WHERE demandes.idCodePostal=?',[codePostal], function(error, results, fields) {
			if (error!=null) {
				res.redirect(529, '/error');
				console.log("erreur query");
			}
			else {
				res.send({"status": 200, "error": null, "response": results});
				console.log("query OK");
			}
		});
	} else {
	    console.log('GET demande all');
		res.locals.connection.query('SELECT DISTINCT idDemande, titreDemande, descriptionDemande, dateDemande, CONCAT(u1.nomUtilisateur, " " , u1.prenomUtilisateur) AS nom, nomCategorie, idCodePostal, accepteDemande, CONCAT(u2.nomUtilisateur, " ", u2.prenomUtilisateur) AS accepte FROM demandes JOIN utilisateurs AS u1 on demandes.idUtilisateur = u1.idUtilisateur JOIN categories on demandes.idCategorie = categories.idCategorie JOIN utilisateurs AS u2 ON demandes.acceptePar = u2.idUtilisateur', function(error, results, fields) {
			if (error!=null) {
				res.redirect(529, '/error');
				console.log("erreur query" + error);
			}
			else {
				res.send({"status": 200, "error": null, "response": results});
				console.log("query OK");
			}
		});
	}
});


//Vérification de l'utilisateur (nom, prenom) et de son mot de passe sur base de l'adresse mail
router.get('/utilisateur', function(req,res,next){
    var mailUtilisateur = req.query.mail;
    console.log('GET user + MDP by email '+mailUtilisateur);
	res.locals.connection.query('SELECT CONCAT(nomUtilisateur, " ", prenomUtilisateur) as utilisateur , mdpUtilisateur as mdp FROM utilisateurs where mailUtilisateur=?',[mailUtilisateur], function(error, results, fields) {
		if (error!=null) {
			res.redirect(529, '/error');
			console.log("erreur query");
		}
		else {
			res.send({"status": 200, "error": null, "response": results});
			console.log("query OK");
		}
	});
});


//Verif si mail est deja pris
router.get('/mailExist', function(req,res,next){
    var mailUtilisateur = req.query.mail;
    console.log('GET mail exist');
    res.locals.connection.query('SELECT * FROM utilisateurs where mailUtilisateur=?',[mailUtilisateur] , function(error, results, fields) {
        if (error!=null) {
            res.redirect(529, '/error');
            console.log("erreur query");
        }
        else {
            res.send({"status": 200, "error": null, "response": results});
            console.log("query OK");
        }
    });
});



// TODO ajouter verif mdp egaux et mail (front end)
// récupération des données du formulaire inscription et ajout dans la base de données
router.post('/inscription', function (req, res, next) {
    console.log(req.body);
    console.log('POST inscription');
    res.locals.connection.query('INSERT INTO utilisateurs (nomUtilisateur, prenomUtilisateur, mailUtilisateur, telUtilisateur, mdpUtilisateur) VALUES (?, ?, ?, ?, ?)',[req.body.formInscriptionNom, req.body.formInscriptionPrenom, req.body.formInscriptionMail, req.body.formInscriptionTel, req.body.formInscriptionMdp], function (error, results, fields) {
        if (error!=null) {
            res.redirect(529, '/error');
            console.log(error);

        }
        else {
            console.log("utilisateur ajouté");
            res.send({"status":201, "error": null, "response":results});
        }
    });
});



//récupération des données du formulaire demandes et ajout dans la base de données
router.post('/demande', function (req, res, next) {
    console.log(req.body);
    console.log('POST demande');
    res.locals.connection.query('INSERT INTO demandes (titreDemande, descriptionDemande, dateDemande, idUtilisateur, idCategorie, defraiementDemande, idCodePostal) VALUES (?, ?, ?, ?, ?, ?, ?)',[req.body.formDemandeTitre, req.body.formDemandeDescription, req.body.formDemandeDate, req.body.formDemandeIdUtilisateur, req.body.formDemandeIdCategorie, req.body.formDemandeDefraiement, req.body.formDemandeIdCodePostal],  function (error, results, fields) {
        if (error!=null) {
            res.redirect(529, '/error');
        }
        else {
            console.log("demande ajoutée");
            res.send({"status":201, "error": null, "response":results});
        }
    });
});






module.exports = router;
