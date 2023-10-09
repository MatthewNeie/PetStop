import React, { useEffect, useState } from 'react';

const Reviews = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('http://localhost:3000/api/reviews') // Adjust the URL based on your API route
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
    }, []);

    if (loading) {
        return <div>Loading reviews...</div>;
    }

    if (error) {
        return <div>Error fetching reviews: {error.message}</div>;
    }

    return (
        <div>
            <h2 className="review-header">Reviews</h2>
            {reviews.length === 0 ? (
                <p>No reviews available.</p>
            ) : (
                <ul>
                    {reviews.map((review) => (
                        <li key={review.id} className="review-container">
                            <h3 className="review-title">{review.title}</h3>
                            <p className="review-content">{review.content}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Reviews;