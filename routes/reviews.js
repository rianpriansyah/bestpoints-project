const express = require("express");
const wrapAsync = require("../utils/wrapAsync");
const ReviewController = require("../controllers/reviews");
const isValidObjectId = require("../middlewares/isValidObjectId");
const isAuth = require("../middlewares/isAuth");
const { isAuthorReview } = require("../middlewares/isAuthor");
const { validateReview } = require("../middlewares/validator");
const router = express.Router({ mergeParams: true });

router.post("/", isAuth, isValidObjectId("/places"), validateReview, wrapAsync(ReviewController.store));

router.delete("/:review_id", isAuth, isAuthorReview, isValidObjectId("/places"), wrapAsync(ReviewController.delete));

module.exports = router;
