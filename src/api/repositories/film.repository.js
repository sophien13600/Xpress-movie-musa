//import supabase from "../config/db.config.js";
import { supabase } from "../../lib/supabaseClient.js";

const save = async (film, user_id) => {
  try {
    const INSERT = "INSERT INTO films values (null, ?, ?, ?,?,?,?)";
    const resultat = await supabase.query(INSERT, [
      film.titre,
      film.genre,
      film.description,
      film.date,
      film.image,
      user_id,
    ]);
    film.id = resultat[0].insertId;
    return resultat;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const findAllFilm = async () => {
  try {
    const SELECT = "SELECT * from films";
    const [films] = await supabase.query(SELECT);
    return films;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const findAdminFilm = async (user_id) => {
  try {
    const SELECT = "SELECT * from films where  user_id=?";
    const [film] = await supabase.query(SELECT, [user_id]);
    return film;
  } catch (error) {
    console.log(error);
    return null;
  }
};
const deleteFilmById = async (id) => {
  try {
    const DELETE = "Delete from films where id=?";
    await supabase.query(DELETE, id);
    return true;
  } catch (error) {
    console.log(error);
    return null;
  }
};
const deleteFilmByUserId = async (id) => {
  try {
    const DELETE = "Delete from films where user_id=?";
    await supabase.query(DELETE, id);
    return true;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const updateFilmById = async (film, id) => {
  try {
    const UPDATE =
      "UPDATE films set genre=?, titre= ?, description= ?, date_sortie= ?, image= ?  where id =?";
    const resultat = await supabase.query(UPDATE, [
      film.genre,
      film.titre,
      film.description,
      film.date_sortie,
      film.image,
      id,
    ]);
    return resultat;
  } catch (error) {
    console.log(error);
    return null;
  }
};
// film search
const searchFilms = async (text) => {
  try {
    const SELECT = "SELECT * FROM films WHERE titre LIKE ? OR genre LIKE ?";
    const [film] = await supabase.query(SELECT, [`%${text}%`, `%${text}%`]);
    return film;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default {
  deleteFilmByUserId,
  save,
  findAllFilm,
  deleteFilmById,
  findAdminFilm,
  updateFilmById,
  searchFilms,
};
