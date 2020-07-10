const router = require("express").Router();
let Review = require("../models/review.model");

router.route("/").get((req, res) => {
  Review.find()
    .then((reviews) => res.json(reviews))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const place = req.body.place;
  const rating = req.body.rating;
  const name = req.body.name;
  const review_text = req.body.review_text;
  const date = Date.parse(req.body.date);

  const newReview = new Review({
    place,
    rating,
    name,
    review_text,
    date,
  });

  newReview
    .save()
    .then(() => res.json("Review added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  Review.findById(req.params.id)
    .then((review) => res.json(review))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  Review.findByIdAndDelete(req.params.id)
    .then(() => res.json("Review deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  Review.findById(req.params.id)
    .then((review) => {
      review.place = req.body.place;
      review.rating = req.body.rating;
      review.name = req.body.name;
      review.review_text = req.body.review_text;
      review.date = Date.parse(req.body.date);

      review
        .save()
        .then(() => res.json("Review updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
