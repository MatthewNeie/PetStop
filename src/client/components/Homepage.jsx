import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import fetchProducts from '../api/ProductsAjaxHelper';


export default function Homepage() {

    const [products, setProducts] = useState([])

    const navigate = useNavigate()
    
    
    useEffect(() => {
        const getProducts = async () => {
        try {
            const response = await fetchProducts()
            console.log(response)
            setProducts(response)
            console.log(products)
        } catch (err) {
            console.error(err)
        }
    }
    getProducts();
    }, [])


return (
    <>
        <div className="welcome-page">
            <img height="600px" src="https://www.classiedawggrooming.com/wp-content/uploads/sites/124/2017/03/pets-banner.png" />
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