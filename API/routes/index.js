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


//récupération des demandes par id si spécifié, sinon revoie toutes les demandes
router.get('/demande', function(req,res,next){
	var demande_id = req.query.idDemande;
    console.log('GET demande');
	if (demande_id != undefined){
	    console.log('GET demande by id '+demande_id);
		res.locals.connection.query('SELECT * FROM demandes  WHERE idDemande=?',[demande_id], function(error, results, fields) {
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
		res.locals.connection.query('SELECT * FROM demandes', function(error, results, fields) {
			if (error!=null) {
				res.redirect(529, '/error');
				console.log("erreur query");
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

//TODO a verif
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


// TODO à tester
// TODO ajouter verif mdp egaux et mail (front end)
// récupération des données du formulaire inscription et ajout dans la base de données
router.post('/inscription', function (req, res, next) {
    //console.log(req.body);
    console.log('POST inscription');
    res.locals.connection.query('INSERT INTO utilisateurs (nomUtilisateur, prenomUtilisateur, mailUtilisateur, telUtilisateur, mdpUtilisateur) VALUES (?, ?, ?, ?, ?)',[req.body.formUtilisateurNom, req.body.formUtilisateurPrenom, req.body.formUtilisateurMail, req.body.formUtilisateurTel, req.body.formUtilisateurMdp], function (error, results, fields) {
        if (error!=null) {
            res.redirect(529, '/error');
        }
        else {
            console.log("utilisateur ajouté");
            res.send({"status":201, "error": null, "response":results});
        }
    });
});


// TODO à tester
//récupération des données du formulaire demandes et ajout dans la base de données
router.post('/formDemande', function (req, res, next) {
    //console.log(req.body);
    console.log('POST demande');
    res.locals.connection.query('INSERT INTO demandes (titreDemande, descriptionDemande, dateDemande, idUtilisateur, idCategorie, defraimentDemande, idCodePostal) VALUES (?, ?, ?, ?, ?, ?, ?)',[req.body.formDemandeTitre, req.body.formDemandeDescription, req.body.formDemandeDate, req.body.formDemandeIdUtilisateur, req.body.formDemandeIdCategorie, req.body.formDemandeDefraiement, req.body.formDemandeIdCodePostal],  function (error, results, fields) {
        if (error!=null) {
            res.redirect(529, '/error');
        }
        else {
            console.log("utilisateur ajouté");
            res.send({"status":201, "error": null, "response":results});
        }
    });
});






module.exports = router;
