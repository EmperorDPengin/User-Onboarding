import React from 'react';

function User({ details }) {
    if(!details){
        return <h3>Getting User's Data</h3>
    }

    return (
        <div className='user container'>
        <h2>{details.name}</h2>
        <p>Email: {details.email}</p>
        <p>Password: Yup it is good</p>
      </div> 
    )
}

export default User;