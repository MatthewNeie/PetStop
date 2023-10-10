import React, { useEffect, useState } from 'react';
import { fetchUsers, fetchUsersById } from '../api/UsersAjaxHelper';

const Users = () => {

    const [token, setToken] = useState(window.localStorage.getItem("token"));
    const [userId, setUserId] = useState(window.localStorage.getItem("userId"));

    const [users, setUsers] = useState([]);

    const [adminUser, setAdminUser] = useState({})

    useEffect(() => {
        const getUsers = async () => {
            try {
                const response = await fetchUsers()
                setUsers(response)
            } catch (err) {
                console.error(err)
            }
        }
        getUsers();
    }, [])

    useEffect(() => {
        const getUsersById = async () => {
            try {
                const response = await fetchUsersById(userId)
                console.log(response.user)
                setAdminUser(response.user)
            } catch (err) {
                console.error(err)
            }
        }
        getUsersById();
    }, [])

    console.log(adminUser.isAdministrator)


return (
        
        <div>
            {adminUser.isAdministrator ?
            <div>
                <h2 className="users-header">Users</h2>
                <ul>
                    {users.map((user) => (
                        <li key={user.id} className="user-container">
                            <h3 className="user-first-name">{user.firstName}</h3>
                            <p className="user-last-name">{user.lastName}</p>
                        </li>
                    ))}
                </ul>
            </div>
            : <h2>You must be an Administrator to access this page.</h2> }
        </div>
    );
};

export default Users;