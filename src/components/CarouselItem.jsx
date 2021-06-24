import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useRouteMatch } from 'react-router-dom'
import playIcon from '../assets/static/play-icon.png'
import plusIcon from '../assets/static/plus-icon.png'
import removeIcon from '../assets/static/remove-icon.png'
import '../assets/styles/components/CarouselItem.scss'
import { getFavoriteMovies, setFavoriteMovies } from '../redux/favoriteMovies'
import { getSpecificMovie } from '../redux/movies'
import generateAxios from '../utils/generateAxios'

const CarouselItem = (props) => {
  const { Title, Year, imdbID, Poster, isUserList} = props
  const history = useHistory()
  const dispatch = useDispatch()
  const match = useRouteMatch()
  const user = useSelector(state => state.user)
  const favoriteMovies = useSelector(state => state.favoriteMovies)
  /* console.log("props -->", props) */

  //Para que se llene el estado con las que ya están en la base de datos cuando el componente se monte
  useEffect(() => {
    dispatch(getFavoriteMovies(user))
  }, [])
    

  // Si yo desestructuro las props arriba abajo llegan undefined ´-´
  const handleSetFavorite = async () => {
    try {
      /* console.log("props -> ", props)
      console.log("Title -->", Title) */
      const response = await axios.get(`http://www.omdbapi.com/?apikey=a475d412&i=${props.imdbID}`)
      const specificMovie = response.data
      const { imdbID, Title, Year, Rated, Runtime, Director, Actors, Plot, Poster } = specificMovie
      const newFavoriteMovie = { imdbID, Title, Year, Rated, Runtime, Director, Actors, Plot, Poster }
      const server = generateAxios(user.token)
      await server.post('/users/favorites', newFavoriteMovie)
      //NOTE yo supongo que si el post de arriba dio error entonces se para la ejecucion y entra en el catch, o sea lo de acá abajo no se debería ejecutar si hubo algun error en la linea de arriba
      dispatch(setFavoriteMovies([...favoriteMovies, newFavoriteMovie]))
      //FIXED El dispatch este no cambia el estado, no se por que.. :C, o sea el payload está perfecto pero no cambia el estado. Investigar como hacer dos action para un mismo reducer.. quizás es eso :C
      //NOTE La solución era que estaba tomando el action como una action asincrónica le estaba poniendo     [setFavoriteMovies.fulfilled]: (state, action) => action.payload ...... cuando en realidad el fulfilled solo es para las promesas :' )
    } catch (error) {
      if(error.response.status === 401)
        alert("Debes estar logueado para realizar esta acción")
      if(error.response.status === 302)
        alert("Ya tenés esa pelicula en favoritos")
    }
  }

  const handleDeleteFavorite = async () => {
    try {
      const server = generateAxios(user.token)
      await server.delete(`/users/favorites/${props.imdbID}`)
      const filteredMovies = favoriteMovies.filter(movie => movie.imdbID !== props.imdbID)
      dispatch(setFavoriteMovies(filteredMovies))
    } catch (error) {
      console.log(error)
    }
  }

  const handleClick = () => {
    dispatch(getSpecificMovie(imdbID))
    history.push(`/movies/${imdbID}`)
  }

  return (
    <div className="carousel-item">
      <img className="carousel-item__img" src={Poster} alt={Title}  />
      <div className="carousel-item__details" >
        <div>
            <img className="carousel-item__details--img" src={playIcon} alt="Play Icon"  onClick={handleClick}/> 
          {isUserList
              ? <img className="carousel-item__details--img" src={removeIcon} alt="remove icon" onClick={() => handleDeleteFavorite(imdbID)}/>
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
