import React from 'react';
import './Followers.css'


const Followers = props => {

    const { followers } = props;

    return (
        <div className="followers-wrapper">
            <h2 className="title">Followers: </h2>
            <ul className="followers-list">
                {
                    followers.map(({id, avatar_url, name}) => (
                        <li className="follower-item" key={id}>
                            <img src={avatar_url} alt={name} />
                            <h3 className="name">{name || `No name :(`}</h3>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default Followers;

