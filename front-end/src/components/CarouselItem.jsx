import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useRouteMatch } from "react-router-dom";
import playIcon from "../assets/static/play-icon.png";
import plusIcon from "../assets/static/plus-icon.png";
import removeIcon from "../assets/static/remove-icon.png";
import "../assets/styles/components/CarouselItem.scss";
import API_URL from "../config/env";
import { setFavoriteMovies } from "../redux/favoriteMovies";
import { getSpecificMovie, setMovies, setSelectedMovie } from "../redux/movies";
import generateAxios from "../utils/generateAxios";

const CarouselItem = ({ Title, Year, imdbID, Poster, isUserList }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const match = useRouteMatch();
  const user = useSelector((state) => state.user);
  const users = useSelector((state) => state.users);
  const favoriteMovies = useSelector((state) => state.favoriteMovies);

  //TODO Preguntar si puedo hacer logica del tipo "si mi componente padre, o el componente que me envuelve es tal hago una cosa y si es tal otro, hago otra cosa"

  //FIXME El problema acá es que al comenzar el evento la funcion guarda las variables como un screenshot entonces guarda el estado de ese preciso momento, entonces se interponen los estados.. el await no es bloqueante acá, no se por qué
  const handleSetFavorite = async () => {
    try {
      if (match.path === "/movies") {
        const specificMovie = (
          await axios.get(
            `https://www.omdbapi.com/?apikey=a475d412&i=${imdbID}`
          )
        ).data;
        const newFavoriteMovie = {
          imdbID: specificMovie.imdbID,
          Title: specificMovie.Title,
          Year: specificMovie.Year,
          Rated: specificMovie.Rated,
          Runtime: specificMovie.Runtime,
          Director: specificMovie.Director,
          Actor: specificMovie.Actors,
          Plot: specificMovie.Plot,
          Poster: specificMovie.Poster,
        };
        const server = generateAxios(user.token);
        const updatedFavoriteMovies = await server.post(
          `${API_URL}/api/users/favorites`,
          newFavoriteMovie
        );
        dispatch(setFavoriteMovies(updatedFavoriteMovies));
      } else {
        //-> estoy parado en /users/:userId o en /users/me
        const targetUserId =
          match.url === "/users/me" ? user._id : match.params.userId;
        const targetUser = users.filter((user) => user._id === targetUserId)[0];
        const specificMovie = targetUser.favoriteMovies.filter(
          (movie) => movie.imdbID === imdbID
        )[0];
        const newFavoriteMovie = {
          imdbId: specificMovie.imdbID,
          Title: specificMovie.Title,
          Year: specificMovie.Year,
          Rated: specificMovie.Rated,
          Runtime: specificMovie.Runtime,
          Director: specificMovie.Director,
          Actor: specificMovie.Actors,
          Plot: specificMovie.Plot,
          Poster: specificMovie.Poster,
        };
        const server = generateAxios(user.token);
        const updatedFavoriteMovies = await server.post(
          `${API_URL}/api/users/favorites`,
          newFavoriteMovie
        );
        dispatch(setFavoriteMovies(updatedFavoriteMovies));
      }
    } catch (error) {
      if (error.response.status === 401)
        return alert("Debes estar logueado para realizar esta acción");
      if (error.response.status === 302)
        return alert("Ya tenés esa pelicula en favoritos");
      console.log(error);
    }
  };

  const handleDeleteFavorite = async () => {
    try {
      const server = generateAxios(user.token);
      await server.delete(`${API_URL}/api/users/favorites/${imdbID}`);
      const filteredMovies = favoriteMovies.filter(
        (movie) => movie.imdbID !== imdbID
      );
      dispatch(setFavoriteMovies(filteredMovies));
    } catch (error) {
      console.log(error);
    }
  };

  const handleSeeDetails = () => {
    if (match.path === "/movies") {
      dispatch(getSpecificMovie(imdbID));
    } else if (match.url === "/users/me") {
      const specificMovie = favoriteMovies.filter(
        (movie) => movie.imdbID === imdbID
      )[0];
      dispatch(setSelectedMovie(specificMovie));
    } else {
      //-> estoy parado en /users/:userId
      const targetUserId =
        match.url === "/users/me" ? user._id : match.params.userId;
      const targetUser = users.filter((user) => user._id === targetUserId)[0];
      const specificMovie = targetUser.favoriteMovies.filter(
        (movie) => movie.imdbID === imdbID
      )[0];
      dispatch(setSelectedMovie(specificMovie));
    }
    history.push(`/movies/${imdbID}`);
  };

  return (
    <div className="carousel-item">
      <img className="carousel-item__img" src={Poster} alt={Title} />
      <div className="carousel-item__details">
        <div>
          <img
            className="carousel-item__details--img"
            src={playIcon}
            alt="Play Icon"
            onClick={handleSeeDetails}
          />
          {isUserList ? (
            <img
              className="carousel-item__details--img"
              src={removeIcon}
              alt="remove icon"
              onClick={async () => await handleDeleteFavorite(imdbID)}
            />
          ) : (
            <img
              className="carousel-item__details--img"
              src={plusIcon}
              alt="Plus Icon"
              onClick={async () => await handleSetFavorite()}
            />
          )}
        </div>
        <p className="carousel-item__details--title">{Title}</p>
        <p className="carousel-item__details--subtitle">{`${Year}`}</p>
      </div>
    </div>
  );
};

export default CarouselItem;
