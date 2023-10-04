import { useState } from 'react';
import registerUser from '../../api/UsersAjaxHelper';
// import { useOutletContext } from 'react-router-dom';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [emailErrorMessage, setEmailErrorMessage] = useState('');
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
    const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] = useState('');
    // const [, setToken] = useOutletContext('');
    // const [, setIsLoggedIn] = useOutletContext();

    async function submitRegistration(e) {
        e.preventDefault();

        setEmailErrorMessage('');
        setPasswordErrorMessage('');
        setConfirmPasswordErrorMessage('');

        if (!email) {
            setEmailErrorMessage("Email is required");

        } else if (password.length < 8) {
            setPasswordErrorMessage("Password needs to be a minimum of 8 characters");

        } else if (password !== confirmPassword) {
            setConfirmPasswordErrorMessage("Passwords must match");
        }
        if (id === "firstName") {
            setFirstName(value);
        }
        if (id === "lastName") {
            setLastName(value);
        }
        if (id === "email") {
            setEmail(value);

        } if (id === "address") {
            setAddress(value);

        } else {
            const user = {
                user: {
                    email,
                    password,
                    firstName,
                    lastName,
                    address
                }
            };


            const response = await registerUser(user);
            console.log(response)
            if (response.error) {
                setEmailErrorMessage("Email already exists, please login instead.");
            } else {
                localStorage.setItem('token', response.token);
                setToken(response.token);
                setIsLoggedIn(true);
            }
        }
    }

    return (
        <div className="form">
            <div className="form-body">
                <h1>Register Page</h1>
                <form onSubmit={submitRegistration}>

                    <div className="firstName">
                        <label className="form-label" for="firstName">First Name </label>
                        <input className="form-input"
                            type="text" value={firstName}
                            onChange={(e) => setFirstName(e)} id="firstName" placeholder="First Name" />
                    </div>

                    <div className="lastName">
                        <label className="form-label" for="lastName">Last Name </label>
                        <input type="text" name="" id="lastName" value={lastName}
                            className="form-input" onChange={(e) => setLastName(e)} placeholder="Last Name" />
                    </div>

                    <div className="email">
                        <label className="form-label" for="email">Email </label>
                        <input type="email" id="email"
                            className="form-input" value={email} onChange={(e) => setEmail(e)} placeholder="Email" />
                    </div>

                    <div className="password">
                        {emailErrorMessage && <p>{emailErrorMessage}</p>}
                        <input
                            type="password"
                            value={password}
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        {passwordErrorMessage && <p>{passwordErrorMessage}</p>}
                        <input
                            type="password"
                            value={confirmPassword}
                            placeholder="Confirm Password"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        {confirmPasswordErrorMessage && <p>{confirmPasswordErrorMessage}</p>}

                    </div>



                    <button type="submit" className="submitButton">Register</button>
                </form></div>

        </div>
    );
};

export default Register;