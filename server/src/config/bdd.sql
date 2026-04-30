-- Création de la base de données exo_cicd
CREATE DATABASE IF NOT EXISTS exo_cicd;
use exo_cicd;

-- Création de la table users
create table user (
  id int AUTO_INCREMENT primary key,
  username varchar(255) not null,
  email varchar(255) not null unique,
  password varchar(255) not null
);



