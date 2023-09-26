const express = require('express')
const reviewsRouter = express.Router();

const { requireUser } = require('./utils')
const {
    createReview,
    getAllReviews,
    getReviewById,
    getReviewByTitle,
    updateReviewById,
    deleteReviewById,
} = require('../db');

reviewsRouter.get('/', async( req, res, next) => {
    try {
        const reviews = await getAllReviews();

        res.send(reviews);
    } catch ({name, message}) {
        next({name, message})
    }
});

reviewsRouter.get('/:reviewId', async( req, res, next) => {
    try {
        const {reviewId} = req.params;
        const reviewById = await getReviewById(reviewId);
        res.send(reviewById);
    } catch ({name, message}) {
        next({name, message})
    }
});


reviewsRouter.post('/newreview', requireUser, async(req, res, next) => {
    
    const { title, content, date, productId, userId } = req.body;

    try {
        const {reviewId} = req.params
        const _review = await getReviewById(reviewId);

        if(_review) {
            next({
                name: 'ReviewExistsError',
                message: 'A review with that id already exists'
            });
        }

        const review = await createReview({
            title, content, date, productId, userId
        });

        res.send(review);

    } catch({name, message}) {
        next({name, message})
    }
});

//PATCH (needs changes?)

reviewsRouter.patch('/:reviewId', requireUser, async (req, res, next) => {
    try {
      const {reviewId} = req.params;
      const reviewToUpdate = await getReviewById(reviewId);
      if(!reviewToUpdate) {
        next({
          name: 'ReviewNotFound',
          message: `No review found by ID ${reviewId}`
        })
      } else {
        if(!await canEditReview(reviewId, req.user.id)) {
          res.status(403);
          next({name: "Unauthorized", message: "You cannot edit this review!"});
        } else {
          const updatedReview = await updateReviewById({id:reviewId, title, content, date})
          res.send(updatedReview);
        }
      }
    } catch (error) {
      next(error);
    }
  });

reviewsRouter.delete('/:reviewId', requireUser, async (req, res, next) => {
    try {
      const {reviewId} = req.params;
      const getReviewId = await getReviewById(reviewId);
      if(!getReviewId) {
        next({
          name: 'Review NotFound',
          message: `No review by ID ${reviewId}`
        })
      } else {
        const deleteReview = await deleteReviewById(reviewId)
        res.send(deleteReview);
      }
    } catch (error) {
      next(error);
    }
  });

module.exports = reviewsRouter;