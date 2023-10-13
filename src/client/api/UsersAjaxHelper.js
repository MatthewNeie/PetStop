const BASE_URL = 'http://localhost:3000/api';

export const fetchUsers = async () => {
    try {
      const response = await fetch(`${BASE_URL}/users`, {
        headers: {
          'Content-Type': 'application/json'
        },
      });
      const result = await response.json();
      console.log(result);
      return result;
    } catch (err) {
      console.error(err);
    }
  }

export const fetchUsersById = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/users/${id}`, {
        headers: {
            'Content-Type': 'application/json'
        },
        });
        const result = await response.json();
        console.log(result);
        return result;
    } catch (err) {
        console.error(err);
    }
}

export const fetchUsersByEmail = async (email) => {
    try {
        const response = await fetch(`${BASE_URL}/users/email/${email}`, {
        headers: {
            'Content-Type': 'application/json'
        },
        });
        const result = await response.json();
        console.log(result);
        return result;
    } catch (err) {
        console.error(err);
    }
}

export const fetchUserByPassword = async (password) => {
    try {
        const response = await fetch(`${BASE_URL}/users/password/${password}`, {
        headers: {
            'Content-Type': 'application/json'
        },
        });
        const result = await response.json();
        console.log(result);
        return result;
    } catch (err) {
        console.error(err);
    }
}

export default async function registerUser(userObj) {
    try {
        console.log("registerUser", userObj);
        const response = await fetch(`${BASE_URL}/users/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              "password": userObj.user.password,
              "email": userObj.user.email,
              "firstName": userObj.user.firstName,
              "lastName": userObj.user.lastName,
              "address": userObj.user.address,
              "isAdministrator": userObj.user.isAdministrator
            })
        });
        const result = await response.json();
        console.log("sign up response: ", result);
        return result;
    } catch (error) {
        alert("test register user fail");
    }
}
  
export const login = async (email, password) => {
    try {
        const response = await fetch(`${BASE_URL}/users/login`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "email": email,
            "password": password 
        })
        });
        const result = await response.json();
        console.log(result, "before");
        if (!response.ok) {
            alert("Email or Password is incorrect");
        }
        console.log(result, "after");
        return result;
    } catch (err) {
        console.error(err);
        alert("Email or Password is incorrect");
    }
}