import { useState } from 'react';
import registerUser from '../api/UsersAjaxHelper';
// import { useOutletContext } from 'react-router-dom';

const AdminRegister = ({setToken}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [adminPasscode, setAdminPasscode] = useState('');

    const isAdministrator = true

    // const [, setToken] = useOutletContext('');
    // const [, setIsLoggedIn] = useOutletContext();

    async function submitRegistration(e) {
        e.preventDefault();


        if (password.length < 8) {
            alert("Password must be at least 8 characters");

        } else if (password !== confirmPassword) {
            alert("Passwords do not match")
        
        } else if (adminPasscode !== "passcode") {
            alert("Administrator passcode is incorrect")

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
                    address,
                    isAdministrator
                }
            };


            const response = await registerUser(user);
            if (response.user.email == email) {
                alert("Email already exists.");
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
                <form onSubmit={() => {submitRegistration, alert("you have been signed up!"), navigate("/")}}>

                    <h1>Register Page</h1>

                    <div className="form-div">
                        <label className="form-label" for="firstName">First Name </label>
                        <input className="form-input"
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            id="firstName"
                            placeholder="First Name"
                            required />
                    </div>

                    <div className="form-div">
                        <label className="form-label" for="lastName">Last Name </label>
                        <input type="text" name="" id="lastName" value={lastName}
                            className="form-input"
                            onChange={(e) => setLastName(e.target.value)}
                            placeholder="Last Name"
                            required />
                    </div>

                    <div className="form-div">
                        <label className="form-label" for="email">Email </label>
                        <input type="email" id="email"
                            className="form-input"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            required />
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
                            required/>

                    </div>

                    <div className="form-div">

                        <label className="form-label">Administrator Passcode </label>
                        <input
                            type="password"
                            value={adminPasscode}
                            placeholder="Administrator Passcode"
                            onChange={(e) => setAdminPasscode(e.target.value)}
                        />

                    </div>



                    <button type="submit" className="submitButton">Register</button>
                </form></div>

        </div>
    );
};

export default AdminRegister;