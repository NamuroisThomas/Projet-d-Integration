var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});


//Vérification de l'identifiant et du mot de passe dans la base de donnée
//Retourne les droits de la personne s'étant connectée
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

// à tester 
// récupération des demandes par id si spécifié, sinon revoie toutes les demandes  
router.get('/demande', function(req,res,next){
	
	var demande_id = req.query.idDemande;
		console.log(demande_id);
	
	if (demande_id != undefined){
		
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
		
		res.locals.connection.query('SELECT * FROM demandes, function(error, results, fields) {
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

// à tester 
// vérification de l'utilisateur (nom, prenom) et de son mot de passe sur base de l'adresse mail
router.get('/utilisateur', function(req,res,next){

    var mailUtilisateur = req.query.mailUtilisateur;
	
	res.locals.connection.query('SELECT CONCAT(nomUtilisateur, ' ', prenomUtilisateur) as utilisateur , mdpUtilisateur as mdp FROM utilisateurs where mailUtilisateur=?',[mailUtilisateur], function(error, results, fields) {
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


/*
router.get('/nomUtilisateur', function(req,res,next){

    var nom_utilisateur = req.query.nomUtilisateur;


    res.locals.connection.query('SELECT * FROM utilisateurs  WHERE =?',[nom_utilisateur], function(error, results, fields) {
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



router.get('/mailExist', function(req,res,next){

    var mail_utilisateur = req.query.mailUtilisateur

    //if ()

    res.locals.connection.query('SELECT * FROM utiisateurs where mailUtilisateur=?', [] , function(error, results, fields) {
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
*/

// à tester 
// récupération des données du formulaire inscription et ajout dans la base de donnée 
router.post('/formInscription', function (req, res, next) {

    console.log(req);

        res.locals.connection.query('INSERT INTO utilisateurs (nomUtilisateur, prenomUtilisateur, mailUtilisateur, telUtilisateur, mdpUtilisateur, idStatus, descriptionUtilisateur, avertissementUtiisateur) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',[req.body.formUtilisateurNom, req.body.formUtilisateurPrenom, req.body.formUtilisateurMail, req.body.formUtilisateurTel, req.body.formUtilisateurMdp, 4, " ", 0], function (error, results, fields) {
            if (error!=null) {
                res.redirect(529, '/error');
            }
            else {
                console.log("utilisateur ajouté");
                res.redirect(req.headers.referer);
            } //TODO pas juste changer la redirection
        });
});


/*
router.post('/formDemande', function (req, res, next) {

    console.log(req);

        res.locals.connection.query('INSERT INTO demandes (nomUtilisateur, prenomUtilisateur, mailUtilisateur, telUtilisateur, mdpUtilisateur, idStatus, descriptionUtilisateur, avertissementUtiisateur) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',[req.body.formUtilisateurNom, req.body.formUtilisateurPrenom, req.body.formUtilisateurMail, req.body.formUtilisateurTel, req.body.formUtilisateurMdp, 4, " ", 0],  function (error, results, fields) {
            if (error!=null) {
                res.redirect(529, '/error');
            }
            else {
                console.log("utilisateur ajouté");
                res.redirect(req.headers.referer);
            } //TODO pas juste changer la redirection
        });
});
*/
module.exports = router;
