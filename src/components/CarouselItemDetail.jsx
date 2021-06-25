import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import "../assets/styles/components/CarouselItemDetail.scss"
import { setMovies, setSelectedMovie } from '../redux/movies'

const CarouselItemDetail = () => {
  const selectedMovie = useSelector(state => state.selectedMovie)
  const {Title, Year, Rated, Runtime, Director, Actors, Plot, Poster} = selectedMovie
  
  const dispatch = useDispatch()
  const history = useHistory()

  //Este funciona como componentDidUnmount()
  useEffect(() => () => {
    dispatch(setSelectedMovie({}))
  }, [])

  const handleClick = () => {
    history.goBack()
  }

  return (
    <>
      
      <section className="carousel-item-detail">
        <div>
          <h3><a href="#back" onClick={handleClick}><i className="far fa-arrow-alt-circle-left"></i></a>{Title}</h3>
          <img src={Poster} alt="poster" />
        </div>
        <ul>
          <li>Descripción: <p>{Plot}</p></li>
          <li>Año: {Year}</li>
          <li>Apta: {Rated}</li>
          <li>Duración: {Runtime}</li>
          <li>Director: <p>{Director}</p></li>
          <li>Actores: <p>{Actors}</p></li>
        </ul>
      </section>
    </>
  )
}

export default CarouselItemDetail
