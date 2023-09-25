const express = require("express");
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/ExpressError");
const Place = require("../models/place");
const Review = require("../models/review");
const { reviewSchema } = require("../schemas/review");
const router = express.Router({ mergeParams: true });

const validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    return next(new ExpressError(msg, 400));
  } else {
    next();
  }
};

router.post(
  "/",
  validateReview,
  wrapAsync(async (req, res) => {
    const { place_id } = req.params;
    const review = new Review(req.body.review);
    const place = await Place.findById(place_id);
    place.reviews.push(review);
    await review.save();
    await place.save();
    res.redirect(`/places/${place_id}`);
  })
);

router.delete(
  "/:review_id",
  wrapAsync(async (req, res) => {
    const { place_id, review_id } = req.params;
    await Place.findByIdAndUpdate(place_id, { $pull: { reviews: review_id } });
    await Review.findByIdAndDelete(review_id);
    res.redirect(`/places/${place_id}`);
  })
);

module.exports = router;
