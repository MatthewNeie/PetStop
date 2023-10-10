import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchUsers, fetchUsersById } from '../api/UsersAjaxHelper';

const Profile = () => {

    const [token, setToken] = useState(window.localStorage.getItem("token"));
    const [userId, setUserId] = useState(window.localStorage.getItem("userId"));

    const [currentUser, setCurrentUser] = useState([])

    const navigate = useNavigate()

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
                <div>
                        <div key={currentUser.id} className="user-container">
                            <h3 className="user--name">My Name: {currentUser.firstName} {currentUser.lastName}</h3>
                            <p>My Email: {currentUser.email}</p>
                        </div>
                </div>
                {currentUser.isAdministrator ?
                <div>
                    <button className="admin-profile-button" onClick={() => {navigate("/users")}}>View Users</button>
                    <button className="admin-profile-button" onClick={() => {navigate("/addproduct")}}>Add Product</button>
                </div> : null }
            </div>
        </div>
    );
};

export default Profile;