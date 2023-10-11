import React, { useState, useEffect } from 'react';
import { updateCart } from '../api/CartsAjaxHelper';

function Cart({ cart, setCart, token, handleAmountChange }) {
    const [price, setPrice] = useState(0);

    const handleRemove = async (id) => {
        const arr= cart.products.filter((item) => item.id !== id);
        const cartObj = {
            id: cart.id,
            products: arr,
            userId: cart.userId
          }
        setCart(cartObj);
    
        await updateCart(token, cartObj);
            
        handlePrice();
    };

    const handlePrice = () => {
        if (cart && cart.products) {
            let ans = 0;
            cart.products.map((item) => (ans += item.amount * item.price));
            setPrice(ans);
        }

    };

    useEffect(() => {
        handlePrice();
    });

    return (
        <div className="cart">
            {cart && cart.products ? cart.products.map((item) => (
                <div className="cart_box" key={item.id}>
                    <div className="cart_img">
                        <img src={item.imgUrl} alt="" />
                        <p>{item.title}</p>
                    </div>
                    <div>
                        <button onClick={() => handleAmountChange(item, 1)}>+</button>
                        <button>{item.amount}</button>
                        <button onClick={() => handleAmountChange(item, -1)}>-</button>
                    </div>
                    <div>
                        <span>{item.price}</span>
                        <button onClick={() => handleRemove(item.id)}>Remove</button>
                    </div>
                </div>
            )) : null}
            <div className="total">
                <span>Total Price of your Cart </span>
                <span>${price}</span>
            </div>
        </div>
    );
};

export default Cart;