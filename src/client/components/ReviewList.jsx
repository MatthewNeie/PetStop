import React, { useState, useEffect } from 'react';

function ReviewList({ productId }) {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch reviews for the product
        fetch(`http://localhost:3000/api/reviews`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                setReviews(data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error);
                setLoading(false);
            });
    }, [productId]);

    if (loading) {
        return <div>Loading reviews...</div>;
    }

    if (error) {
        return <div>Error fetching reviews: {error.message}</div>;
    }

    return (
        <div>
            <div className="review-header"> {/* Apply review-header class */}
                <h2>Reviews</h2>
            </div>
            {reviews.length === 0 ? (
                <p>No reviews available.</p>
            ) : (
                <ul>
                    {reviews.map((review) => (
                        <li key={review.id} className="review-container"> {/* Apply review-container class */}
                            <h3 className="review-title">{review.title}</h3>
                            <p className="review-content">{review.content}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ReviewList;