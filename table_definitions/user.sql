CREATE TABLE user (
  user_id int unsigned NOT NULL auto_increment,
  user_name CHAR(25),
  user_email varchar(256) NOT NULL UNIQUE comment "email address used for login",
  user_password varchar(515),
  user_position CHAR(25),
  user_rating float,
  PRIMARY KEY (user_id)
);
