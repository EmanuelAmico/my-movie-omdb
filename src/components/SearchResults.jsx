import React, { useEffect } from 'react';
import Carousel from "../components/Carousel";
import CarouselItem from "../components/CarouselItem";
import NotFound from './NotFound';
import { useDispatch, useSelector } from "react-redux";
import { setMovies } from '../redux/movies';


const SearchResults = () => {

  const dispatch = useDispatch()
  const movies = useSelector(state => state.movies)
  const favoriteMovies = useSelector(state => state.favoriteMovies)
  

  //TODO preguntar por qué esto no funca y como podría hacer para fixearlo
  return (
    movies.Error
      ? <NotFound />
      : <>
          <Carousel title={movies.length ? `Resultados de la búsqueda` : `No se han encontrado resultados.`}>
            {movies.map( movie => <CarouselItem key={movie.imdbID} {...movie} isUserList={false}/>)}
          </Carousel>
          {favoriteMovies.length && 
          <Carousel title="Mis películas favoritas" >
            {favoriteMovies.map( movie => <CarouselItem key={movie.imdbID} {...movie} isUserList={true}/>)}
          </Carousel>}
        </>
  )
}

export default SearchResults
