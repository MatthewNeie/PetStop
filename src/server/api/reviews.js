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

reviewsRouter.get('/title/:title', async( req, res, next) => {
  try {
      const { title } = req.params;
      const reviewByTitle = await getReviewByTitle(title);
      res.send(reviewByTitle);
  } catch ({name, message}) {
      next({name, message})
  }
});

reviewsRouter.post('/newreview', requireUser, async(req, res, next) => {
  try {
      const { title, content, date, productId, userId } = req.body;

        const _review = await getReviewByTitle(title);
        if(_review) {
            next({
                name: 'ReviewExistsError',
                message: 'A review with that title already exists'
            });
        }

        const review = await createReview({
            title, content, date, productId, userId
        });

        res.send(review);

    } catch(error) {
        console.log(error);
         next(error);
    }
});

//PATCH (needs changes?)

reviewsRouter.patch('/:reviewId', requireUser, async (req, res, next) => {
    try {
      const { title, content, date, productId, userId } = req.body;
      const {reviewId} = req.params;
      const reviewToUpdate = await getReviewById(reviewId);
      console.log(reviewToUpdate);
      if(!reviewToUpdate) {
        next({
          name: 'ReviewNotFound',
          message: `No review found by ID ${reviewId}`
        })
      } else {
        // if(!await canEditReview(reviewId, req.user.id)) {
        //   res.status(403);
        //   next({name: "Unauthorized", message: "You cannot edit this review!"});
        // } else {
          const updatedReview = await updateReviewById(reviewId, { title, content, date, productId, userId })
          console.log(updatedReview);
          res.send(updatedReview);
        // }
      }
    } catch (error) {
      console.log(error);
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