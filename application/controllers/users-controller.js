var express = require('express');
var db = require('./../../db');

module.exports.newUser = function(req, res, next){

  var user = { user_name: req.body.firstName, user_email: req.body.email, user_password: req.body.password};
  db.query('INSERT INTO user SET ?', user, function(err,result){
  if(err) throw err;

  console.log('Last insert ID:', result.insertId);
  return res.status(201).end();

  });


};

module.exports.login = function(req, res, next){

  var user = {user_email: req.body.email, user_password: req.body.password};
  db.query('SELECT user_id, user_password FROM user WHERE user_email = ? ', [req.body.email], function(err,result, field){
  if(err) throw err;


  if (req.body.password = result[0].user_password){
    req.session.user_id = result[0].user_id;
    return res.status(200).end();
  }

  return res.status(403).end();




  });


};
module.exports.logout = function(req, res, next){
  req.session.destroy();
  res.status(200).end();


};

module.exports.currentUser = function(req, res, next){

  db.query('SELECT * FROM user WHERE user_id= ? ', [req.session.user_id], function(err,result, field){
  if(err) throw err;


  if (result){
    delete result[0].user_password;
    return res.status(200).json(result[0]);
  }

  return res.status(403).end();




  });


};


module.exports.myClubs = function(req, res, next){

  db.query('SELECT * FROM club WHERE admin_id=? ', [req.session.user_id], function(err,results, field){
  if(err) throw err;


  if (results){

    return res.status(200).json(results);
  }

  return res.status(403).end();




  });

};

module.exports.clubs = function(req, res, next){

  db.query('SELECT * FROM user_club left join club on user_club.club_id = club.club_id WHERE user_id=? ', [req.session.user_id], function(err,results, field){
  if(err) throw err;


  if (results){

    return res.status(200).json(results);
  }

  return res.status(403).end();




  });

};

module.exports.theClub = function(req, res, next){

  db.query('SELECT * FROM club WHERE club_id= ? ', [req.params.id], function(err,result, field){
  if(err) throw err;


  if (result){

    return res.status(200).json(result[0]);
  }

  return res.status(403).end();




  });

};

module.exports.getPlayers = function (req,res,next){
  db.query('SELECT * FROM user, user_club WHERE club_id = ? AND user.user_id = user_club.user_id;',req.params.id, function(err,results,field){
    if(results){
      return res.status(200).json(results);
    }
    return res.status(403).end();

  } );
};

module.exports.newClub = function(req, res, next){
  var club = {club_name: req.body.club_name,
  club_weekday: req.body.club_weekday,
  club_time: req.body.club_time,
  club_type: req.body.club_type,
  club_location: req.body.club_location,
  admin_id: req.body.admin_id };


  db.query('INSERT INTO club SET ?', club, function(err,result){
  if(err) throw err;

  console.log('Last insert ID:', result.insertId);

  var club_user = { club_id: result.insertId, user_id: req.body.admin_id};
  db.query('INSERT INTO user_club SET ?', club_user, function(err,result){
  if(err) throw err;

  console.log('Last insert ID:', result.insertId);
  return res.status(201).end();


  });

  return res.status(201).end();


  });



};
