import React, { useState } from 'react';

function ReviewForm({ productId }) {
    const [reviewData, setReviewData] = useState({ title: '', content: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Make a POST request to submit the review associated with the product ID
        fetch(`http://localhost:3000/api/reviews`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reviewData),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                // Handle success or display an error message
            })
            .catch((error) => {
                console.error('Error submitting review:', error);
            });
    };

    return (
        <div>
            <h2>Leave a Review</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={reviewData.title}
                        onChange={(e) => setReviewData({ ...reviewData, title: e.target.value })}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="content">Content:</label>
                    <textarea
                        id="content"
                        name="content"
                        value={reviewData.content}
                        onChange={(e) => setReviewData({ ...reviewData, content: e.target.value })}
                        required
                    />
                </div>
                <button type="submit">Submit Review</button>
            </form>
        </div>
    );
}

export default ReviewForm;