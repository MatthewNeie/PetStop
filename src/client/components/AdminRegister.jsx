import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import registerUser from '../api/UsersAjaxHelper';
import { fetchUsersByEmail } from '../api/UsersAjaxHelper';
import { getCardUtilityClass } from '@mui/material';
import { fetchCartByUserId, postCart } from '../api/CartsAjaxHelper';

const AdminRegister = ({ setToken, setUserId, setCart }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [isAdministrator, setIsAdministrator] = useState(true)

    const [adminPasscode, setAdminPasscode] = useState('');

    const navigate = useNavigate()

    async function submitRegistration(e) {
        e.preventDefault();

        setIsAdministrator(true);

        if (password.length < 8) {
            alert("Password needs to be a minimum of 8 characters");
        } else if (password !== confirmPassword) {
            alert("Passwords must match");
        } else if (adminPasscode !== "passcode") {
            alert("Administrator passcode is incorrect")
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
        <div>
            <div className="admin-register-container">
                <div className="admin-register-left">
                <form onSubmit={submitRegistration}>

                    <h1>Administrator Register</h1>

                    <div>
                        <label className="form-label" for="firstName"></label>
                        <input
                            className="admin-register-input"
                            type="text" value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            id="firstName"
                            placeholder="First Name"
                            required/>
                    </div>

                    <div>
                        <label className="form-label" for="lastName"></label>
                        <input type="text" name="" id="lastName" value={lastName}
                            className="admin-register-input"
                            onChange={(e) => setLastName(e.target.value)}
                            placeholder="Last Name"
                            required/>
                    </div>

                    <div>
                        <label className="form-label" for="email"></label>
                        <input type="email" id="email"
                            className="admin-register-input"
                            value={email} onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            required/>
                    </div>

                    <div>
                        
                        <label className="form-label"></label>
                        <input
                            className="admin-register-input"
                            type="password"
                            value={password}
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                            required/>

                    </div>

                    <div>
                        <label className="form-label"></label>
                        <input
                            className="admin-register-input"
                            type="password"
                            value={confirmPassword}
                            placeholder="Confirm Password"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required/>

                    </div>

                    <div>
                        <label className="form-label"></label>
                        <input
                            className="admin-register-input"
                            type="password"
                            value={adminPasscode}
                            placeholder="Administrator Passcode"
                            onChange={(e) => setAdminPasscode(e.target.value)}
                            required/>

                    </div>



                    <button type="submit" className="admin-register-button">Register</button>
                </form>
                </div>
                <div className="admin-register-right">

                </div>
            </div>

        </div>
    );
};

export default AdminRegister;