import React from 'react'
import { useState , useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import fetchProducts from '../api/ProductsAjaxHelper';
import { fetchUsersById } from '../api/UsersAjaxHelper';
import { deleteProduct } from '../api/ProductsAjaxHelper';
import postReview from '../api/ReviewsAjaxHelper';

const SingleProduct = ({ products , reviews, token }) => {

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [date, setDate] = useState('')
    const [userId, setUserId] = useState(window.localStorage.getItem("userId"));
    const [adminUser, setAdminUser] = useState({});

    const { productId } = useParams();

    const productIdNumberfy = parseInt(productId)

    const navigate = useNavigate()

    // async function GetProductId() {

    // products.filter(product => product.id === productIdNumberfy)

    // setProductId(products.id)

    // }

    // GetProductId()

    if (userId === null) {
        setUserId(1)
    } else {
        null
    }

    const deleteProductById = async () => {
            try {
                const response = await deleteProduct(productId)
                console.log(response)
                navigate("/products")
            } catch (err) {
                console.error(err)
            }
        }

        useEffect(() => {
            const getUsersById = async () => {
                try {
                    const response = await fetchUsersById(userId)
                    console.log(response.user)
                    setAdminUser(response.user)
                } catch (err) {
                    console.error(err)
                }
            }
            getUsersById();
        }, [])

    async function submitReview(e) {
        e.preventDefault();

            const review = {
                review: {
                    title,
                    content,
                    date,
                    productId,
                    userId,
                }
            };

        
            const response = await postReview(review);
            console.log(response)
    
        }

    console.log(userId)

    console.log(productIdNumberfy)

    console.log(products)

    // useEffect(() => {
    //     const product = products.find((product) => product.id === productIdNumberfy)
    //     return product

    // }, [productId])


    return (
        <>
        
                {products.filter(product => product.id === productIdNumberfy).map(filteredProduct => (
                        <div className="product-info" key={filteredProduct.id}>
                            <img src={filteredProduct.imgUrl} className="product-image-sizing"/>
                            <h3>{filteredProduct.name}</h3>
                            <p>{filteredProduct.description}</p>
                            <p>Price: ${filteredProduct.price}</p>
                            {/* Add more product details */}
                        </div>
                    ))}

            {adminUser.isAdministrator ?
            <div>
                <button className="update-button" >Update</button>
                <button className="delete-button" onClick={deleteProductById} >Delete</button>
            </div> : null }
<br></br>
            {userId === 1 ? null :
            <form onSubmit={submitReview}>
                <div className="review-info">
                    <h2>Add a Review!</h2>
                <div className="form-div">
                        <label className="form-label" for="title">Title</label>
                        <input className="form-input"
                            type="text" value={title}
                            onChange={(e) => setTitle(e.target.value)} id="title" placeholder="Title" />
                    </div>

                    <div className="form-div">
                        <label className="form-label" for="content">Content </label>
                        <input type="text" name="" id="content" value={content}
                            className="form-input" onChange={(e) => setContent(e.target.value)} placeholder="Content" />
                    </div>
                </div>
                <button type="submit" className="submitButton">Add Review</button>
                </form> }

                {reviews.filter(review => review.productId === productIdNumberfy).map(filteredReview => (
                        <div className="review-info" key={filteredReview.id}>
                            <p>{filteredReview.title}</p>
                            <h3>{filteredReview.content}</h3>
                            <p>{filteredReview.date}</p>
                        </div>
                    ))}
        </>
    )
}

export default SingleProduct;