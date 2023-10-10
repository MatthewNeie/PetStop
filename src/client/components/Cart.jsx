import React, { useState, useEffect } from 'react';

function Cart({ cart, setCart, handleQuantityChange }) {
    const [price, setPrice] = useState(0);

    const handleRemove = (id) => {
        const arr= cart.products.filter((item) => item.id !== id);
        const cartObj = {
            id: cart.id,
            products: arr,
            userId: cart.userId
          }
        setCart(cartObj);
        handlePrice();
    };

    const handlePrice = () => {
        let ans = 0;
        cart.products.map((item) => (ans += item.quantity * item.price));
        setPrice(ans);

    };

    useEffect(() => {
        handlePrice();
    });

    return (
        <div className="cart">
            {cart.products.map((item) => (
                <div className="cart_box" key={item.id}>
                    <div className="cart_img">
                        <img src={item.imgUrl} alt="" />
                        <p>{item.title}</p>
                    </div>
                    <div>
                        <button onClick={() => handleQuantityChange(item, 1)}>+</button>
                        <button>{item.quantity}</button>
                        <button onClick={() => handleQuantityChange(item, -1)}>-</button>
                    </div>
                    <div>
                        <span>{item.price}</span>
                        <button onClick={() => handleRemove(item.id)}>Remove</button>
                    </div>
                </div>
            ))}
            <div className="total">
                <span>Total Price of your Cart </span>
                <span>${price}</span>
            </div>
        </div>
    );
};

export default Cart;