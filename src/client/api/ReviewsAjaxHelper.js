const BASE_URL = 'http://localhost:3000/api';

export const fetchReviews = async () => {
  try {
    const response = await fetch(`${BASE_URL}/reviews`, {
      headers: {
        'Content-Type': 'application/json'
      },
    });
    const result = await response.json();
    console.log(result);
    return result.users;
  } catch (err) {
    console.error(err);
  }
}

export const fetchReviewesById = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/reviews/${id}`, {
            headers: {
                'Content-Type': 'application/json'
            },
        });
        const result = await response.json();
        console.log(result);
        return result.reviews;
    } catch (err) {
        console.error(err);
    }
}

export const fetchReviewByTitle = async (title) => {
  try {
    const response = await fetch(`${BASE_URL}/reviews/title/${title}`, {
        headers: {
            'Content-Type': 'application/json'
        },
    });
    const result = await response.json();
    console.log(result);
    return result.reviews;
  } catch (err) {
      console.error(err);
}
}

export const postReview = async ({ title, content, date, productId, userId }) => {
    try {
        const response = await fetch(`${BASE_URL}/reviews/newreview`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, 
                                   content, 
                                   date, 
                                   productId, 
                                   userId
                                  })
        });
        const result = await response.json();
        console.log("post review response: ", result);
        return result;
    } catch (error) {
        console.log(error.message);
    }
}

export const updateReview = async (token, reviewObj) => {
    try {
      const UPDATE_POST_URL = `${BASE_URL}/reviews/${reviewObj.id}`;
      console.log("Update post url: ", UPDATE_POST_URL);
      const response = await fetch(UPDATE_POST_URL, {
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            title: reviewObj.title,
            content: reviewObj.content,
            tags: reviewObj.date,
            productId: reviewObj.productId,
            userId: reviewObj.userId
        })
      });
      const result = await response.json();
      console.log(result);
      return result
    } catch (err) {
      console.error(err);
    }
  }

  export const deleteReview = async (token, id) => {
    try {
      const response = await fetch(`${BASE_URL}/reviews/${id}`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      const result = await response.json();
      console.log(result);
      return result
    } catch (err) {
      console.error(err);
    }
  }