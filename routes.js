var usersController = require('./application/controllers/users-controller')
// var User = require('./api/users/user-model');

module.exports = function(app) {

    //API - Routes ==================================================
    // app.use('/api', require('./api/users/user-router')(passport, requireSession));
    //...
    app.post('/signup', usersController.newUser);
    app.post('/login', usersController.login);
    app.post('/logout', usersController.logout);
    app.post('/clubs/new', requireSession, usersController.newClub);

    app.get('/account/me',
            requireSession,
            usersController.currentUser);

    app.get('/clubs',
      requireSession,
      usersController.clubs);

    app.get('/club/:id', usersController.theClub);
    app.get('/club/players/:id',usersController.getPlayers);
    app.get('/clubs/:id',
         function(req, res, next) {
          console.log("Passei aqui");
          res.render('group.html', {groupId: req.params.id});
        });

    app.get('/myclubs',
              requireSession,
              usersController.myClubs);


    //Site - Routes ==================================================
    app.get('/', function (req, res) {
        res.render('index.html');
    });
    app.get('/search', function(req,res){
        res.render('search.html');
    });
    // app.get('/signup', function (req, res) {
    //     res.render('index.html');
    // });

    function requireSession(req, res, next) {
        if(!req.session.user_id) {
          return res.status(401).json({
                  message: 'User not logged in.'
          });

        }
        return next();

    }

}
