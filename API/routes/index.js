var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
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



module.exports = router;
