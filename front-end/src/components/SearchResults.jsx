import React, { useEffect } from 'react';
import Carousel from "../components/Carousel";
import CarouselItem from "../components/CarouselItem";
import NotFound from './NotFound';
import { useDispatch, useSelector } from "react-redux";
import { getMovies, setMovies } from '../redux/movies';
import { useHistory } from 'react-router-dom';
import queryString from 'query-string'
import "../assets/styles/components/SearchResults.scss"

const SearchResults = () => {

  const dispatch = useDispatch()
  const movies = useSelector(state => state.movies)
  const favoriteMovies = useSelector(state => state.favoriteMovies)
  
  const history = useHistory()
  useEffect(() =>{
    const query = queryString.parse(history.location.search)
    dispatch(getMovies(query.title))
  }, [])

  return (
    movies.Error
      ? <NotFound />
      : <>
          <a href="#back" className="search__results-goBackIcon" onClick={() => history.goBack()}><i className="far fa-arrow-alt-circle-left"></i></a>
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
