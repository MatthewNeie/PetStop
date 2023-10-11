import React, { useEffect, useState } from 'react';
import { fetchUsers, fetchUsersById } from '../api/UsersAjaxHelper';

const Users = () => {

    const [token, setToken] = useState(window.localStorage.getItem("token"));
    const [userId, setUserId] = useState(window.localStorage.getItem("userId"));

    const [users, setUsers] = useState([]);

    const [adminUser, setAdminUser] = useState({})

    if (userId === null) {
        setUserId(1)
    } else {
        null
    }

    useEffect(() => {
        const getUsers = async () => {
            try {
                const response = await fetchUsers()
                setUsers(response.users)
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
    console.log("Users", users)


return (
        
        <div>
            {adminUser.isAdministrator ?
            <div>
                <h2 className="users-header">Users</h2>
                <ul>
                    {users.map((user) => (
                        <li key={user.id} className="user-container">
                            <h3 className="user-id">User {user.id}</h3>
                            <p className="user-first-name">First Name: {user.firstName}</p>
                            <p className="user-last-name">Last Name: {user.lastName}</p>
                            <p>Email: {user.email}</p>
                            {user.isAdministrator ? <p className="admin-user-info">Administrator</p> : null}
                        </li>
                    ))}
                </ul>
            </div>
            : <h2>You must be an Administrator to access this page.</h2> }
        </div>
    );
};

export default Users;