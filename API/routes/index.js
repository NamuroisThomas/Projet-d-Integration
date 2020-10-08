var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/demande', function(req,res,next){

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

router.get('/idDemande', function(req,res,next){

    var demande_id = req.query.idDemande;
    console.log(demande_id);

    res.locals.connection.query('SELECT idDemande FROM demandes  WHERE idDemande=?',[demande_id], function(error, results, fields) {
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

router.post('/utilsateur', function (req, res, next) {


    console.log(req);

    if(req.body.formInscription==0) { //Si c'est un nouveau parent //TODO a coder
        res.locals.connection.query('INSERT INTO utilisateurs (nomUtilisateur, prenomUtilisateur, mailUtilisateur, telUtilisateur, mdpUtilisateur, idStatus, descriptionUtilisateur, avertissementUtiisateur) VALUES (?, ?, ?, ?, ?, ?)',[req.body.formParentNom, req.body.formParentPrenom, req.body.formParentAdresse, req.body.formParentTelephone, req.body.formParentGSM, req.body.formParentEmail], function (error, results, fields) {
            if (error!=null) {
                res.redirect(529, '/error');
            }
            else {
                console.log("Parent ajouté");
                res.redirect(req.headers.referer);
            } //TODO pas juste changer la redirection
        });
    }
    else { //Si le parent est déjà encodé
        res.locals.connection.query('UPDATE parents SET nomParent = ?, prenomParent = ?, adresse = ?, telephonne = ?, GSM = ?, email = ? WHERE idParent = ?', [req.body.formParentNom, req.body.formParentPrenom, req.body.formParentAdresse, req.body.formParentTelephone, req.body.formParentGSM, req.body.formParentEmail, req.body.formParentId], function (error, results) {
            if (error!=null) {
                res.redirect(529, '/error');
            }
            else {
                console.log("Parent modifié");
                res.redirect(req.headers.referer);
            }
        });
    }
});

module.exports = router;
