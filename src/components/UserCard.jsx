import React from 'react'
import { useSelector } from 'react-redux'
import { useRouteMatch } from 'react-router-dom'
import profilePicture from '../assets/static/user-icon.png'

const UserCard = () => {
  const match = useRouteMatch()
  const loggedUser = useSelector(state => state.user)
  
  let user
  if (match.url === `/users/${loggedUser.id}/info`) {
    user = loggedUser
  } else {
    const users = useSelector(state => state.users)
    user = users.filter(user => user.id === Number(match.params.userId))[0]
  }
    
  return (
    <>
      <section className="login">
        <section className="login__container">
          <h2>Información del usuario</h2>
          <img src={profilePicture} alt="profile picture" />
          <ul>
            <li>Nombre registrado:</li>
            <p>{user.name}</p>
            <li>Email registrado:</li>
            <p>{user.email}</p>
          </ul>
        </section>
      </section>
    </>
  )
}

export default UserCard



