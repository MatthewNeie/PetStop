import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import fetchProducts from '../api/ProductsAjaxHelper';


export default function Homepage({ token }) {

    const [products, setProducts] = useState([])

    const navigate = useNavigate()
    
    
    useEffect(() => {
        const getProducts = async () => {
        try {
            const response = await fetchProducts()
            setProducts(response)
        } catch (err) {
            console.error(err)
        }
    }
    getProducts();
    }, [])

return (
    <>
        <div className="welcome-page">
                <div className="welcome-page-header">
                    <h1>Welcome!</h1>
                    <p className="welcome-script">gfdgfdgsdfgdsgfdhdjouioewuorjwoeiewjfoiejfoijfiojifsjofjsofjosjfisfosjfosjfosjfosjfosofjsofjosjfosjfos</p>
                </div>
                <div className="welcome-page-buttons-div">
                    { token ? null : <button onClick={() => {navigate("/register")}} className="welcome-page-buttons">Sign-Up</button>}
                    { token ? null : <button onClick={() => {navigate("/login")}} className="welcome-page-buttons">Log-In</button>}
                </div>
        </div>
        
        <div className="products-featured-header">
            <h1>Popular Items</h1>
        </div>
        <div className="products-display">
                    {products.filter(product => product.isPopular).map(filteredProduct => (
                        <div onClick={() => {navigate(`/products/id/${filteredProduct.id}`)}} className="product-info" key={filteredProduct.id}>
                            <img src={filteredProduct.imgUrl} className="product-image-sizing"/>
                            <h3>{filteredProduct.name}</h3>
                            <p>{filteredProduct.petType}</p>
                            <p>Price: ${filteredProduct.price}</p>
                            {/* Add more product details */}
                        </div>
                    ))}
                </div>
    </>
)

}