import React, { useState, useEffect } from 'react';
import { updateCart } from '../api/CartsAjaxHelper';
import { useNavigate } from 'react-router-dom';
import { postCart } from '../api/CartsAjaxHelper';
import { fetchCartByUserId, deleteCart } from '../api/CartsAjaxHelper';

function Cart({ cart, setCart, token, handleAmountChange, userId }) {
    const [price, setPrice] = useState(0);

    const navigate = useNavigate()

    const handleRemove = async (id) => {
        const arr = cart.products.filter((item) => item.id !== id);
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

    const getCart = async (token, userId) => {
        const _cart = await postCart({products: [], userId: userId}, token);
        setCart(_cart);
      }

    const handleCheckout = async () => {
        deleteCart(token, cart.id);
        await getCart(token, userId);
        navigate("/checkout");
    }

    useEffect(() => {
        handlePrice();
    });

    return (
        <div className="cart">
            {cart && cart.products ? cart.products.map((item) => (
                <div className="cart_box" key={item.id}>
                    <div className="cart_img">
                        <img className="cart-img" height="300px" src={item.imgUrl} alt="" />
                        <p>{item.title}</p>
                    </div>

                    <div className="cart-btns">
                        <button onClick={() => handleAmountChange(item, 1)}>+</button>
                        <button>{item.amount}</button>
                        <button onClick={() => handleAmountChange(item, -1)}>-</button>

                        <br></br>
                        <span>Item Price: ${item.price}</span>
                        <br></br>
                        
                        <button onClick={() => handleRemove(item.id)}>Remove</button>
                    </div>
                </div>
            )) : null}
            <div className="total">
                <span>Total Price of your Cart </span>
                <span>${price.toFixed(2)}</span>
            </div>
            <br></br>
            <div className="cart-buttons">
                <button
                    className="cart-shopping-button"
                    onClick={() => { navigate("/products") }}>Continue Shopping</button>
                <button
                    className="cart-checkout-button"
                    onClick={handleCheckout}>Checkout</button>
            </div>
        </div>
    );
};

export default Cart;