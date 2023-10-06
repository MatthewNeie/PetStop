import React from 'react';

function Cart({ cart, cartItems, removeFromCart, updateCartItemQuantity }) {
    return (
        <div className="cart">
            {console.log(cart)}
            {/* <h2>Shopping Cart</h2>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <ul>
                    {cartItems.map((item) => (
                        <li key={item.id}>
                            <div className="cart-item">
                                <img src={item.imageUrl} alt={item.name} />
                                <div className="item-details">
                                    <h3>{item.name}</h3>
                                    <p>{item.description}</p>
                                    <p>Price: ${item.price.toFixed(2)}</p>
                                    <p>Quantity: {item.quantity}</p>
                                </div>
                                <div className="item-actions">
                                    <button onClick={() => removeFromCart(item.id)}>Remove</button>
                                    <input
                                        type="number"
                                        min="1"
                                        value={item.quantity}
                                        onChange={(e) => updateCartItemQuantity(item.id, +e.target.value)}
                                    />
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
            <div className="cart-total">
                Total: ${calculateTotal(cartItems).toFixed(2)}
            </div>
            <button className="checkout-button">Proceed to Checkout</button> */}
        </div>
    );
}

// Helper function to calculate the total price of items in the cart
// function calculateTotal(cartItems) {
//     return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
// }

export default Cart;