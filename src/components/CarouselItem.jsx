import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory, useLocation, useRouteMatch } from 'react-router-dom'
import playIcon from '../assets/static/play-icon.png'
import plusIcon from '../assets/static/plus-icon.png'
import removeIcon from '../assets/static/remove-icon.png'
import '../assets/styles/components/CarouselItem.scss'
import { getSpecificMovie } from '../redux/movies'

const CarouselItem = ({ Title, Year, imdbID, Poster, isMyList}) => {
  const history = useHistory()
  const location = useLocation()
  const dispatch = useDispatch()
  const match = useRouteMatch()
  const selectedMovie = useSelector(state => state.selectedMovie)

  const handleSetFavorite = () => {
    
  }

  /* console.log("locatioon ->", location)
  console.log("match -->", match) */

  const handleClick = () => {
    const {pathname, search} = location
    dispatch(getSpecificMovie(imdbID))
    history.push(`${pathname}/${imdbID}`)
  }

  return (
    <div className="carousel-item">
      <img className="carousel-item__img" src={Poster} alt={Title}  />
      <div className="carousel-item__details" onClick={handleClick}>
        <div>
          <Link to={`/movies/${imdbID}`} >
            <img 
              className="carousel-item__details--img" 
              src={playIcon} 
              alt="Play Icon"
            /> 
          </Link>
          {isMyList 
              ? <img className="carousel-item__details--img" src={removeIcon} alt="remove icon" onClick={() => handleDeleteFavorite(id)}/>
              : <img className="carousel-item__details--img" src={plusIcon} alt="Plus Icon" onClick={handleSetFavorite}/>
          } 
        </div>
        <p className="carousel-item__details--title">{Title}</p>
        <p className="carousel-item__details--subtitle">{`${Year}`}</p>
      </div>
    </div>

  )
}

export default CarouselItem;
