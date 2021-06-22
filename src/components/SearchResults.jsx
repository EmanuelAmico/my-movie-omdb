import React from 'react';
import Carousel from "../components/Carousel";
import CarouselItem from "../components/CarouselItem";
import NotFound from './NotFound';
import { useSelector } from "react-redux";


const SearchResults = () => {

  const movies = useSelector(state => state.movies)
  
  //TODO preguntar por qué esto no funca y como podría hacer para fixearlo
  return (
    movies.Error
      ? <NotFound />
      : <Carousel title="Resultados de la búsqueda">
          {movies.map( movie => <CarouselItem key={movie.imdbID} {...movie} isMyList={false}/>)}
        </Carousel>
  )
}

export default SearchResults
