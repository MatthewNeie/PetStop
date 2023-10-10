import React, { useEffect, useState } from 'react';
import { fetchUsers, fetchUsersById } from '../api/UsersAjaxHelper';

const Profile = () => {

    const [token, setToken] = useState(window.localStorage.getItem("token"));
    const [userId, setUserId] = useState(window.localStorage.getItem("userId"));

    const [currentUser, setCurrentUser] = useState([])

    useEffect(() => {
        const getUsersById = async () => {
            try {
                const response = await fetchUsersById(userId)
                console.log(response.user)
                setCurrentUser(response.user)
            } catch (err) {
                console.error(err)
            }
        }
        getUsersById();
    }, [])

    console.log(currentUser)


return (
        
        <div>
            <div>
                <h2 className="users-header">My Profile</h2>
                <ul>
                        <li key={currentUser.id} className="user-container">
                            <h3 className="user-first-name">{currentUser.firstName}</h3>
                            <p className="user-last-name">{currentUser.lastName}</p>
                        </li>
                </ul>
            </div>
        </div>
    );
};

export default Profile;