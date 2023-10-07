import React, { useState } from 'react';
import { postCart } from '../api/CartsAjaxHelper';
//import SingleProduct from "./SingleProduct";

const ProductListing = ({ products, addToCart }) => {
    const [sortBy, setSortBy] = useState('price'); // Default sorting by price
    const [ascending, setAscending] = useState(true); // Default sorting order
    const [petType, setPetType] = useState('')
    // const [productType, setProductType] = useState('')
    

  
    const handlePetType = (e) => {
        const value = e.target.value;
        setPetType(value);
        console.log(value)
    }

    const createCart = async (e) => {
        const response = await postCart()
    }
    

    // Function to handle sorting change

  //return (products.map((element, key) =>
  //<SingleProduct products={element} key={key} />
  
  // Function to handle sorting change

    const handleSortChange = (e) => {
        const selectedValue = e.target.value;
        const [newSortBy, newAscending] = selectedValue.split('-');

        setSortBy(newSortBy);
        setAscending(newAscending === 'asc');
    };

    // Function to sort products based on selected sorting criteria
    const sortedProducts = [...products].sort((a, b) => {
        if (sortBy === 'price') {
            return ascending ? a.price - b.price : b.price - a.price;
        } else if (sortBy === 'name') {
            return ascending
                ? a.name.localeCompare(b.name)
                : b.name.localeCompare(a.name);
        }
        console.log(sortedProducts)
        // Add more sorting criteria as needed
    });

    return (
        <div>
            <div className="pet-type">

                <div className="pet-type-dogs">
                    <button onClick={handlePetType}
                            className="pet-type-dogs-button"
                            value='Dogs'>Dogs</button>
                </div>
                <div className="pet-type-cats">
                    <button onClick={handlePetType}
                            className="pet-type-cats-button"
                            value='Cats'>Cats</button>
                </div>
                <div className="pet-type-birds">
                    <button onClick={handlePetType}
                            className="pet-type-birds-button"
                            value='Birds'>Birds</button>
                </div>
                <div className="pet-type-reptiles-amphibians">
                    <button onClick={handlePetType}
                            className="pet-type-reptiles-amphibians-button"
                            value='Reptiles/Amphibians'>Reptiles/Amphibians</button>
                </div>
            </div>

            <div className="product-type">
                    {petType === 'Reptiles/Amphibians' ?
                                <div className="product-type-reptiles-amphibians">
                                    <div className="product-type-food">
                                        <button className="product-type-food-button">Food</button>
                                    </div>
                                    <div className="product-type-tanks">
                                        <button className="product-type-tanks-button">Tanks</button>
                                    </div>
                                    <div className="product-type-heating-lighting">
                                        <button className="product-type-heating-lighting-button">Heating/Lighting</button>
                                    </div>
                                    <div className="products-type-accessories">
                                        <button className="product-type-accessories-button">Accessories</button>
                                    </div>
                                </div>
                            : null }
                    {petType === 'Birds' ?
                                <div className="product-type-birds">
                                    <div className="product-type-food">
                                        <button className="product-type-food-button">Food</button>
                                    </div>
                                    <div className="product-type-toys">
                                        <button className="product-type-toys-button">Toys</button>
                                    </div>
                                    <div className="product-type-cages">
                                        <button className="product-type-cages-button">Cages</button>
                                    </div>
                                    <div className="products-type-accessories">
                                        <button className="product-type-accessories-button">Accessories</button>
                                    </div>
                                </div>
                            : null }
                    {petType === 'Dogs' ?
                        <div className="product-type-dogs">
                            <div className="product-type-food">
                                <button className="product-type-food-button">Food</button>
                            </div>
                            <div className="product-type-toys">
                                <button className="product-type-toys-button">Toys</button>
                            </div>
                            <div className="product-type-beds">
                                <button className="product-type-beds-button">Beds</button>
                            </div>
                            <div className="product-type-houses">
                                <button className="product-type-houses-button">Houses</button>
                            </div>
                            <div className="product-type-cages">
                                <button className="product-type-cages-button">Cages</button>
                            </div>
                            <div className="products-type-accessories">
                                <button className="product-type-accessories-button">Accessories</button>
                            </div>
                        </div>
                    : null }
                    {petType === 'Cats' ?
                    <div className="product-type-cats">
                        <div className="product-type-food">
                            <button className="product-type-food-button">Food</button>
                        </div>
                        <div className="product-type-toys">
                            <button className="product-type-toys-button">Toys</button>
                        </div>
                        <div className="product-type-beds">
                            <button className="product-type-beds-button">Beds</button>
                        </div>
                        <div className="product-type-scratchers">
                            <button className="product-type-scratchers-button">Scratchers</button>
                        </div>
                        <div className="product-type-trees">
                            <button className="product-type-trees-button">Trees</button>
                        </div>
                        <div className="products-type-litterboxes">
                            <button className="product-type-litterboxes-button">Litter Boxes</button>
                        </div>
                        <div className="products-type-litterboxes">
                            <button className="product-type-accessories-button">Accessories</button>
                        </div>
                    </div>
                : null }
            </div>
            <div>
                <label htmlFor="sort">Sort by:</label>
                <select id="sort" value={`${sortBy}-${ascending ? 'asc' : 'desc'}`} onChange={handleSortChange}>
                    <option value="price-asc">Price (Low to High)</option>
                    <option value="price-desc">Price (High to Low)</option>
                    <option value="name-asc">Name (A to Z)</option>
                    <option value="name-desc">Name (Z to A)</option>
                    {/* Add more sorting options as needed */}
                </select>
            </div>

            <div className="products-display">
                {sortedProducts.map((product) => (
                    <div className="product-info" key={product.id}>
                        <img src={product.imgUrl} className="product-image-sizing"/>
                        <h3>{product.name}</h3>
                        <p>{product.petType}</p>
                        <p>Price: ${product.price}</p>
                        <label>Quantity</label>
                        <input type="text"></input>
                        <button onClick={addToCart(product)} className="add-cart-button">Add to Cart</button>
                        {/* Add more product details */}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductListing;