-- Active: 1757782397363@@127.0.0.1@3306@xpress_movie
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
    image VARCHAR(250),
    user_id INT,
    Foreign Key (user_id) REFERENCES users(id)  ON DELETE CASCADE
);

SELECT * FROM films;
SELECT * FROM films WHERE user_id=1;

CREATE Table favoris (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    date_ajoute DATE,
    film_id INT,
    user_id INT, 
    Foreign Key (user_id) REFERENCES users (id)  ON DELETE CASCADE,
    Foreign Key (film_id) REFERENCES films(id)  ON DELETE CASCADE
);
INSERT into favoris VALUES (null, 2025-04-16, 55 );
SELECT * FROM favoris ;

SELECT * FROM films;
SELECT * FROM films
JOIN favoris as f on f.film_id=films.id where f.film_id=3 and f.user_id = 12;

select * FROM users;
SELECT * FROM films  JOIN favoris as f on f.film_id = films.id  ;


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