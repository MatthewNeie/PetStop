import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import registerUser from '../api/UsersAjaxHelper';
import { fetchUsersByEmail } from '../api/UsersAjaxHelper';
import { getCardUtilityClass } from '@mui/material';
import { fetchCartByUserId, postCart } from '../api/CartsAjaxHelper';
// import { useOutletContext } from 'react-router-dom';

const AdminRegister = ({ setToken, setUserId, setCart }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [isAdministrator, setIsAdministrator] = useState(true)

    const [adminPasscode, setAdminPasscode] = useState('');

    const [emailErrorMessage, setEmailErrorMessage] = useState('');
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
    const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] = useState('');

    const navigate = useNavigate()
    // const [, setToken] = useOutletContext('');
    // const [, setIsLoggedIn] = useOutletContext();

    async function submitRegistration(e) {
        e.preventDefault();

        setIsAdministrator(true);
        setEmailErrorMessage('');
        setPasswordErrorMessage('');
        setConfirmPasswordErrorMessage('');

        if (!email) {
            setEmailErrorMessage("Email is required");
        } else if (password.length < 8) {
            setPasswordErrorMessage("Password needs to be a minimum of 8 characters");
        } else if (password !== confirmPassword) {
            setConfirmPasswordErrorMessage("Passwords must match");
        } else if (adminPasscode !== "passcode") {
            alert("Administrator passcode is incorrect")
            alert("Passwords must match");
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

                    <h1>Administrator Register Page</h1>

                    <div className="form-div">
                        <label className="form-label" for="firstName">First Name </label>
                        <input className="form-input"
                            type="text" value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            id="firstName"
                            placeholder="First Name"
                            required/>
                    </div>

                    <div className="form-div">
                        <label className="form-label" for="lastName">Last Name </label>
                        <input type="text" name="" id="lastName" value={lastName}
                            className="form-input"
                            onChange={(e) => setLastName(e.target.value)}
                            placeholder="Last Name"
                            required/>
                    </div>

                    <div className="form-div">
                        <label className="form-label" for="email">Email </label>
                        <input type="email" id="email"
                            className="form-input"
                            value={email} onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            required/>
                    </div>

                    <div className="form-div">
                        
                        {emailErrorMessage && <p>{emailErrorMessage}</p>}
                        <label className="form-label">Password </label>
                        <input
                            type="password"
                            value={password}
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                            required/>

                    </div>

                    <div className="form-div">
                        {passwordErrorMessage && <p>{passwordErrorMessage}</p>}
                        <label className="form-label">Confirm Password </label>
                        <input
                            type="password"
                            value={confirmPassword}
                            placeholder="Confirm Password"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required/>
                        {confirmPasswordErrorMessage && <p>{confirmPasswordErrorMessage}</p>}

                    </div>

                    <div className="form-div">

                        <label className="form-label">Administrator Passcode </label>
                        <input
                            type="password"
                            value={adminPasscode}
                            placeholder="Administrator Passcode"
                            onChange={(e) => setAdminPasscode(e.target.value)}
                            required/>

                    </div>



                    <button type="submit" className="submitButton">Register</button>
                </form></div>

        </div>
    );
};

export default AdminRegister;