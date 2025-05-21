import React from 'react'

const UserDetails = ({user}) => {
  return (
    <div>
        <h4>Name : {user.firstName}</h4>
        <p>Age : {user.age}</p>
        <p>Gender : {user.gender}</p>
        <p>Role : {user.role}</p>
    </div>
  )
}

export default UserDetails