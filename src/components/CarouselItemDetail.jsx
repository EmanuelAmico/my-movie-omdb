import React from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import "../assets/styles/components/CarouselItemDetail.scss"

const CarouselItemDetail = () => {
  const selectedMovie = useSelector(state => state.selectedMovie)
  const {Title, Year, Rated, Runtime, Director, Actors, Plot, Poster} = selectedMovie
  
  const history = useHistory()

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
