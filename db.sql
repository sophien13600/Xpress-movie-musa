-- Active: 1750235362805@@127.0.0.1@3306@xpress_movie
CREATE DATABASE xpress_movie;
use xpress_movie;

CREATE Table users (
    id int PRIMARY key AUTO_INCREMENT NOT null,
    nom VARCHAR(100),
    prenom VARCHAR(100),
    email VARCHAR(250) UNIQUE,
    password VARCHAR(100),
    role VARCHAR(100)

);
SHOW TABLES FROM xpress_movie;
SELECT * FROM users;

CREATE TABLE films (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    titre VARCHAR(100) NOT NULL,
    genre VARCHAR(100) NOT null,
    description VARCHAR(250),
    date_sortie DATE,
    image VARCHAR(250)

);
SELECT * FROM films;

CREATE Table favoris (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    date_ajoute DATE,
    film_id INT,
    Foreign Key (film_id) REFERENCES films(id)
);

INSERT INTO
    users
values (
        null,
        'WICK',
        'Jhon',
        'jhon@gmail.com',
        '1234',
        'admin'
    );

    INSERT INTO
    films
values (
        null,
        'Action',
        'Ant man',
        '',
        '',
        ''
    );

    SELECT * FROM films;
    DELETE FROM films where id =24;