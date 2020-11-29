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


//Retoure toutes les catégories
router.get('/categories', function(req,res,next){
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
router.get('/demandes', function(req,res,next) {
    var demande_id = req.query.idDemande;
    var categ_id = req.query.idCateg;
    var codePostal = req.query.codePostal;
    var idUtilisateur = req.query.utilisateur;
    console.log('GET demande');
    if (demande_id != undefined) {
        console.log('GET demande by id ' + demande_id);
        res.locals.connection.query('SELECT DISTINCT idDemande, titreDemande, descriptionDemande, dateDemande, CONCAT(u1.nomUtilisateur, " " , u1.prenomUtilisateur) AS nom, nomCategorie, idCodePostal, defraiementDemande, accepteDemande, CONCAT(u2.nomUtilisateur, " ", u2.prenomUtilisateur) AS accepte FROM demandes JOIN utilisateurs AS u1 on demandes.idUtilisateur = u1.idUtilisateur JOIN categories on demandes.idCategorie = categories.idCategorie JOIN utilisateurs AS u2 ON demandes.acceptePar = u2.idUtilisateur WHERE idDemande=?', [demande_id], function (error, results, fields) {
            if (error != null) {
                res.redirect(529, '/error');
                console.log("erreur query");
            }
            else {
                res.send({"status": 200, "error": null, "response": results});
                console.log("query OK");
            }
        });
    } else if (categ_id != undefined) {
        console.log('GET demande by idCateg' + categ_id);
        res.locals.connection.query('SELECT DISTINCT idDemande, titreDemande, descriptionDemande, dateDemande, CONCAT(u1.nomUtilisateur, " " , u1.prenomUtilisateur) AS nom, nomCategorie, idCodePostal, defraiementDemande, accepteDemande, CONCAT(u2.nomUtilisateur, " ", u2.prenomUtilisateur) AS accepte FROM demandes JOIN utilisateurs AS u1 on demandes.idUtilisateur = u1.idUtilisateur JOIN categories on demandes.idCategorie = categories.idCategorie JOIN utilisateurs AS u2 ON demandes.acceptePar = u2.idUtilisateur WHERE demandes.idCategorie=? AND accepteDemande = 0', [categ_id], function (error, results, fields) {
            if (error != null) {
                res.redirect(529, '/error');
                console.log("erreur query");
            }
            else {
                res.send({"status": 200, "error": null, "response": results});
                console.log("query OK");
            }
        });
    } else if (codePostal != undefined) {
        console.log('GET demande by codePostal' + codePostal);
        res.locals.connection.query('SELECT DISTINCT idDemande, titreDemande, descriptionDemande, dateDemande, CONCAT(u1.nomUtilisateur, " " , u1.prenomUtilisateur) AS nom, nomCategorie, idCodePostal, defraiementDemande, accepteDemande, CONCAT(u2.nomUtilisateur, " ", u2.prenomUtilisateur) AS accepte FROM demandes JOIN utilisateurs AS u1 on demandes.idUtilisateur = u1.idUtilisateur JOIN categories on demandes.idCategorie = categories.idCategorie JOIN utilisateurs AS u2 ON demandes.acceptePar = u2.idUtilisateur WHERE demandes.idCodePostal=? AND accepteDemande = 0', [codePostal], function (error, results, fields) {
            if (error != null) {
                res.redirect(529, '/error');
                console.log("erreur query");
            }
            else {
                res.send({"status": 200, "error": null, "response": results});
                console.log("query OK");
            }
        });
    } else if (idUtilisateur != undefined) {
        console.log('GET demande by utilisateur' + idUtilisateur);
        res.locals.connection.query('SELECT DISTINCT idDemande, titreDemande, descriptionDemande, dateDemande, CONCAT(u1.nomUtilisateur, " " , u1.prenomUtilisateur) AS nom, nomCategorie, idCodePostal, defraiementDemande, accepteDemande, CONCAT(u2.nomUtilisateur, " ", u2.prenomUtilisateur) AS accepte FROM demandes JOIN utilisateurs AS u1 on demandes.idUtilisateur = u1.idUtilisateur JOIN categories on demandes.idCategorie = categories.idCategorie JOIN utilisateurs AS u2 ON demandes.acceptePar = u2.idUtilisateur WHERE demandes.idUtilisateur=?', [idUtilisateur], function (error, results, fields) {
            if (error != null) {
                res.redirect(529, '/error');
                console.log("erreur query");
            }
            else {
                res.send({"status": 200, "error": null, "response": results});
                console.log("query OK");
            }
        });
      
    }else {
	    console.log('GET demande all');
		res.locals.connection.query('SELECT DISTINCT idDemande, titreDemande, descriptionDemande, dateDemande, CONCAT(u1.nomUtilisateur, " " , u1.prenomUtilisateur) AS nom, nomCategorie, idCodePostal, defraiementDemande, accepteDemande,  CONCAT(u2.nomUtilisateur, " ", u2.prenomUtilisateur) AS accepte FROM demandes JOIN utilisateurs AS u1 on demandes.idUtilisateur = u1.idUtilisateur JOIN categories on demandes.idCategorie = categories.idCategorie JOIN utilisateurs AS u2 ON demandes.acceptePar = u2.idUtilisateur', function(error, results, fields) {
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

//Retourne toutes les demandes acceptées
router.get('/demandeAcceptee', function(req,res,next){
    console.log('GET demande all acceptees');
    res.locals.connection.query('SELECT DISTINCT idDemande, titreDemande, descriptionDemande, dateDemande, CONCAT(u1.nomUtilisateur, " " , u1.prenomUtilisateur) AS nom, nomCategorie, idCodePostal, defraiementDemande, accepteDemande,  CONCAT(u2.nomUtilisateur, " ", u2.prenomUtilisateur) AS accepte FROM demandes JOIN utilisateurs AS u1 on demandes.idUtilisateur = u1.idUtilisateur JOIN categories on demandes.idCategorie = categories.idCategorie JOIN utilisateurs AS u2 ON demandes.acceptePar = u2.idUtilisateur WHERE accepteDemande = 1', function(error, results, fields) {
        if (error!=null) {
            res.redirect(529, '/error');
            console.log("erreur query" + error);
        }
        else {
            res.send({"status": 200, "error": null, "response": results});
            console.log("query OK");
        }
    });
});

//Retourne toutes les demandes non acceptées
router.get('/demandeNonAcceptee', function(req,res,next){
    console.log('GET demande all non acceptees');
    res.locals.connection.query('SELECT DISTINCT idDemande, titreDemande, descriptionDemande, dateDemande, CONCAT(u1.nomUtilisateur, " " , u1.prenomUtilisateur) AS nom, nomCategorie, idCodePostal, defraiementDemande, accepteDemande,  CONCAT(u2.nomUtilisateur, " ", u2.prenomUtilisateur) AS accepte FROM demandes JOIN utilisateurs AS u1 on demandes.idUtilisateur = u1.idUtilisateur JOIN categories on demandes.idCategorie = categories.idCategorie JOIN utilisateurs AS u2 ON demandes.acceptePar = u2.idUtilisateur WHERE accepteDemande = 0', function(error, results, fields) {
        if (error!=null) {
            res.redirect(529, '/error');
            console.log("erreur query" + error);
        }
        else {
            res.send({"status": 200, "error": null, "response": results});
            console.log("query OK");
        }
    });
});


//Retourne toutes les demandes avec défraiement
router.get('/demandeDefraiement', function(req,res,next){
    console.log('GET demande all non acceptees');
    res.locals.connection.query('SELECT DISTINCT idDemande, titreDemande, descriptionDemande, dateDemande, CONCAT(u1.nomUtilisateur, " " , u1.prenomUtilisateur) AS nom, nomCategorie, idCodePostal, defraiementDemande, accepteDemande,  CONCAT(u2.nomUtilisateur, " ", u2.prenomUtilisateur) AS accepte FROM demandes JOIN utilisateurs AS u1 on demandes.idUtilisateur = u1.idUtilisateur JOIN categories on demandes.idCategorie = categories.idCategorie JOIN utilisateurs AS u2 ON demandes.acceptePar = u2.idUtilisateur WHERE defraiementDemande = 1', function(error, results, fields) {
        if (error!=null) {
            res.redirect(529, '/error');
            console.log("erreur query" + error);
        }
        else {
            res.send({"status": 200, "error": null, "response": results});
            console.log("query OK");
        }
    });
});









//Retourne toutes les informations sur l'utilisateur à partir de son e-mail
router.get('/utilisateur', function(req,res,next){
    var mailUtilisateur = req.query.mail;
    console.log('GET user + MDP by email '+mailUtilisateur);
	res.locals.connection.query('SELECT * FROM utilisateurs where mailUtilisateur=?',[mailUtilisateur], function(error, results, fields) {
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


//Retourne le nombre de fois que le mail est utilisé dans la base de données
router.get('/mailExist', function(req,res,next){
    var mailUtilisateur = req.query.mail;
    console.log('GET mail exist');
    //res.locals.connection.query('SELECT COUNT(mailUtilisateur) AS nbre FROM utilisateurs where mailUtilisateur=?',[mailUtilisateur] , function(error, results, fields) {
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


router.post('/profil',function (req, res, next){
	console.log(req.body);
	console.log("POST profil");
	res.locals.connection.query("UPDATE utilisateurs SET mailUtilisateur=?, telUtilisateur=?, descriptionUtilisateur=? WHERE idUtilisateur=?", [req.body.formProfilMailUtilisateur, req.body.formProfilTelUtilisateur, req.body.formProfilDescriptionUtilisateur, req.body.formProfilIdUtilisateur], function (error, results, fields) {
		if(error!=null){
			res.redirect(529, '/error');
			console.log(error);
		}
		else{
			console.log("utilisateur updaté");
			res.send({"status":201, "error":null, "response":results});
		}
	});
});




router.post('/accepteDemande',function (req, res, next){
    console.log(req.body);
    console.log("POST accepteDemande");
    res.locals.connection.query("UPDATE demandes SET accepteDemande=1, acceptePar=? WHERE idDemande=?", [req.body.formAccepteDemandeIdAccepteur, req.body.formAccepteDemandeIdDemande], function (error, results, fields) {
        if(error!=null){
            res.redirect(529, '/error');
            console.log(error);
        }
        else{
            console.log("demande updaté acceptée");
            res.send({"status":201, "error":null, "response":results});
        }
    });
});


router.post('/desaccepteDemande',function (req, res, next){
    console.log(req.body);
    console.log("POST desaccepteDemande");
    res.locals.connection.query("UPDATE demandes SET accepteDemande=0, acceptePar=0 WHERE idDemande=?", [req.body.formAccepteDemandeIdDemande], function (error, results, fields) {
        if(error!=null){
            res.redirect(529, '/error');
            console.log(error);
        }
        else{
            console.log("demande updaté acceptée");
            res.send({"status":201, "error":null, "response":results});
        }
    });
});





//Retourne les codes postaux
router.get('/codePostal', function(req,res,next){
    console.log('GET codes postaux');
    res.locals.connection.query('SELECT * FROM codepostal', function(error, results, fields) {
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

router.delete('/demande', function(req, res,next) {
    var idDemande = req.query.idDemande;
    console.log("DELETE demande")+idDemande;
    res.locals.connection.query("DELETE FROM demandes WHERE idDemande=?", [idDemande], function (error, results, fields) {
        if(error!=null){
            res.redirect(529, '/error');
            console.log(error);
        }
        else{
            console.log("demande supprimée");
            res.send({"status":201, "error":null, "response":results});
        }
    });

});




module.exports = router;
