const db = require('./client')

const createReview = async({ title, content, date, productId, userId }) => {
    try {
        const { rows: [ reviews ] } = await db.query(`
        INSERT INTO reviews(title, content, date, "productId", "userId")
        VALUES($1, $2, $3, $4, $5)
        RETURNING *`, [ title, content, date, productId, userId ]);

        return reviews;
    } catch (err) {
        throw err;
    }
}

const getAllReviews = async() => {
    try {
        const { rows: [ reviews ] } = await db.query(`
        SELECT * 
        FROM reviews`, []);

        if(!reviews) {
            console.error("No Reviews");
            return;
        }
        return reviews;
    } catch (err) {
        throw err;
    }
}

const getReviewByTitle = async(title) => {
    try {
        const { rows: [ reviews ] } = await db.query(`
        SELECT * 
        FROM reviews
        WHERE title=$1;`, [ title ]);

        if(!reviews) {
            console.error("No Reviews with Title");
            return;
        }
        return reviews;
    } catch (err) {
        throw err;
    }
}

const getReviewByDate = async(date) => {
    try {
        const { rows: [ reviews ] } = await db.query(`
        SELECT * 
        FROM reviews
        WHERE date=$1;`, [ date ]);

        if(!reviews) {
            console.error("No Reviews on Date");
            return;
        }
        return reviews;
    } catch (err) {
        throw err;
    }
}

const getReviewByProductId = async(productId) => {
    try {
        const { rows: [ reviews ] } = await db.query(`
        SELECT * 
        FROM reviews
        WHERE "productId"=$1;`, [ productId ]);

        if(!reviews) {
            console.error("No Reviews of Product");
            return;
        }
        return reviews;
    } catch (err) {
        throw err;
    }
}

const getReviewByUserId = async(userId) => {
    try {
        const { rows: [ reviews ] } = await db.query(`
        SELECT * 
        FROM reviews
        WHERE "userId"=$1;`, [ userId ]);

        if(!reviews) {
            console.error("No Reviews from User");
            return;
        }
        return reviews;
    } catch (err) {
        throw err;
    }
}

module.exports = {
    createReview,
    getAllReviews,
    getReviewByTitle,
    getReviewByDate,
    getReviewByProductId,
    getReviewByUserId,
};