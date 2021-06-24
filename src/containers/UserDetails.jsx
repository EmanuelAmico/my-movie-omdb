import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useRouteMatch } from 'react-router-dom'
import Carousel from '../components/Carousel'
import CarouselItem from '../components/CarouselItem'

const UserDetails = () => {

  const match = useRouteMatch()
  const users = useSelector(state => state.users)
  const favoriteMovies = useSelector(state => state.favoriteMovies)
  useEffect(() => {}, [favoriteMovies])
  //FIXME como hago que se actualice la vista en base a la actualizacion de un estado de redux pero en otro componente??..
  const user = users.filter(user => user.id === Number(match.params.userId))[0]
  

  return (
    <>
      <Carousel title={favoriteMovies.length ? `Lista de favoritos de ${user.name}` : `${user.name} no tiene películas en sus favoritos.`} >
        {user.favoriteMovies.map(movie => <CarouselItem key={movie.imdbID} isUserList={true} {...movie}/>)}
      </Carousel>
    </>
  )
}

export default UserDetails
