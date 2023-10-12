import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import registerUser from '../api/UsersAjaxHelper';
import { fetchUsersByEmail } from '../api/UsersAjaxHelper';
import { getCardUtilityClass } from '@mui/material';
import { fetchCartByUserId, postCart } from '../api/CartsAjaxHelper';

// import { useOutletContext } from 'react-router-dom';

const Register = ({ setToken, setUserId, setCart }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [isAdministrator, setIsAdministrator] = useState(false)
    // const [, setToken] = useOutletContext('');
    // const [, setIsLoggedIn] = useOutletContext();

    const navigate = useNavigate()

    async function submitRegistration(e) {
        e.preventDefault();

        setIsAdministrator(false);

        if (password.length < 8) {
            alert("Password needs to be a minimum of 8 characters");

        } else if (password !== confirmPassword) {
            alert("Passwords must match");
        // }
        // if (id === "firstName") {
        //     setFirstName(value);
        // }
        // if (id === "lastName") {
        //     setLastName(value);
        // }
        // if (id === "email") {
        //     setEmail(value);

        // } if (id === "address") {
        //     setAddress(value);

        } else {
            const user = {
                user: {
                    email,
                    password,
                    firstName,
                    lastName,
                    address,
                    isAdministrator,
                }
            };


            const _user = await fetchUsersByEmail(email)

            console.log(_user)

            if(Object.keys(_user).length !== 0) {
                alert("Email already exists")
                return; }
          
            try {
                const response = await registerUser(user);
                console.log(response);
                
                const token = response.token;
                const userId = response.userId
                window.localStorage.setItem('token', token);
                window.localStorage.setItem("userId", userId);
                setToken(token);
                setUserId(userId);
                
                await getCart(token, userId);
                alert("You have been signed-up!");
                navigate("/");
            } catch (error) {
                console.log(error);
            }
        }

        }
    }

    const getCart = async (token, userId) => {
        let cart = await fetchCartByUserId(userId, token);
        if (cart === undefined) {
          cart = await postCart({products: [], userId: userId}, token);
        }
        setCart(cart);
      }

    return (
        <div className="form">
            <div className="form-body">
                <form onSubmit={submitRegistration}>

                    <h1>Register Page</h1>

                    <div className="form-div">
                        <label className="form-label" for="firstName">First Name </label>
                        <input className="form-input"
                            type="text" value={firstName}
                            onChange={(e) => setFirstName(e.target.value)} id="firstName" placeholder="First Name"
                            required/>
                    </div>

                    <div className="form-div">
                        <label className="form-label" for="lastName">Last Name </label>
                        <input type="text" name="" id="lastName" value={lastName}
                            className="form-input" onChange={(e) => setLastName(e.target.value)} placeholder="Last Name"
                            required/>
                    </div>

                    <div className="form-div">
                        <label className="form-label" for="email">Email </label>
                        <input type="email" id="email"
                            className="form-input" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email"
                            required/>
                    </div>

                    <div className="form-div">
                        <label className="form-label">Password </label>
                        <input
                            type="password"
                            value={password}
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                            required/>

                    </div>

                    <div className="form-div">
                        <label className="form-label">Confirm Password </label>
                        <input
                            type="password"
                            value={confirmPassword}
                            placeholder="Confirm Password"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>



                    <button type="submit" className="submitButton">Register</button>
                </form></div>

        </div>
    );
};

export default Register;