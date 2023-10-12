import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {

    const navigate = useNavigate()
    

return (
        
        <div className="checkout-page">
           <h2>Your items have been ordered!</h2>
           <div className="checkout-page-buttons">
                <button
                    className="home-checkout-button"
                    onClick={() => {navigate("/")}}>Home</button>
           </div>
        </div>
    );
};

export default Checkout;

