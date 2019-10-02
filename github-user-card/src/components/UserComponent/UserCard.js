import React from 'react';
import './User.css'


const UserCard = props => {

    const { 
        avatar_url, 
        name, 
        location, 
        followers, 
        following, 
        bio 
    } = props;

    return (
        <div className="card">
            <img src={avatar_url} alt={name} />
            <div className="card-info">
                <h3 className="name">{name || `Waiting...`}</h3>
                <p>
                    <span>{location || `Waiting...`}</span> | 
                    <span>Followers: {followers || `Waiting...`}</span> | 
                    <span>Following: {following || `Waiting...`}</span>
                </p>
                <p>Bio: {bio || `No bio, I'm a bit boring!`} </p>
            </div>
        </div>
    )
}

export default UserCard;

