import React, { Component } from "react";
import Navbar from "../components/Navbar/navbar";
import Footer from "../components/Footer/footer";
import Star from "../components/Star/Star";
import axios from "axios";
import "./reviews.css";

class Review extends Component {
  constructor() {
    super();
    this.state = {
      isActive: false,
      reviews: [],
      validation: "",
    };
    this.handleHide = this.handleHide.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  isValidInput(name, review, place) {
    var returnString = "";
    if (name.length < 1) returnString += "• Invalid Name: Name is Empty\n";
    if (name.length > 20)
      returnString += "• Invalid Name: Name is longer than 20 characters\n";

    if (review.length < 1)
      returnString += "• Invalid Review: Review is Empty\n";
    if (review.length > 1000)
      returnString +=
        "• Invalid Review: Review is longer than 1000 characters.\n";

    if (place.length < 1) returnString += "• Invalid Place: Place is Empty\n";
    if (place.length > 20)
      returnString += "• Invalid Place: Place is longer than 20 characters\n";

    return returnString;
  }

  handleShow = () => {
    this.setState({
      isActive: true,
    });
  };

  handleHide = () => {
    this.setState({
      isActive: false,
    });
  };

  renderStars = (rating) => {
    let stars = [];
    for (var i = 0; i < 5; i++) {
      if (i < rating) {
        stars.push(<Star key={i + 1} state={"active"} />);
      } else {
        stars.push(<Star key={i + 1} state={"none"} />);
      }
    }
    return stars;
  };

  renderReviews = () => {
    return (
      <ul>
        {this.state.reviews.reverse().map((review, i) => (
          <li key={i} className="reviews-list-item">
            <div className="review">
              <h5 className="place-header">{review.place}</h5>
              <h3 className="review-title">
                {review.name}{" "}
                <span className="star-rating">
                  {this.renderStars(review.rating)}
                </span>
              </h3>
              <div className="date-box">
                <span className="written-title">
                  Reviewed:{" "}
                  <span className="date-string">
                    {this.getDate(review.date)}
                  </span>
                </span>
              </div>
              <div className="review-content">{review.review_text}</div>
            </div>
            <hr></hr>
          </li>
        ))}
      </ul>
    );
  };

  handleSubmit(event) {
    this.handleHide();
    var nameInput = document.getElementById("name-input").value;
    var reviewInput = document.getElementById("review-input").value;
    var ratingInput = document.getElementById("rating-input").value;
    var placeInput = document.getElementById("place-input").value;
    if (ratingInput > 5) ratingInput = 5;
    if (ratingInput < 1) ratingInput = 1;

    const newReview = {
      place: placeInput,
      rating: parseInt(ratingInput),
      name: nameInput,
      review_text: reviewInput,
      date: new Date(),
    };

    var ret = this.isValidInput(nameInput, reviewInput, placeInput);
    if (ret.length !== 0) {
      window.alert("AfterMath\n\n" + ret);
    } else {
      axios
        .post("http://localhost:5000/reviews/add", newReview)
        .then((res) => console.log(res.data));

      this.setState({
        reviews: this.state.reviews.concat(newReview),
      });
    }
  }

  getAverageRating(reviews) {
    var totalRating = 0;
    var reviewLen = reviews.length;
    for (var i = 0; i < reviewLen; i++)
      totalRating += parseInt(reviews[i].rating);
    return totalRating / reviewLen;
  }

  componentDidMount() {
    axios.get("http://localhost:5000/reviews").then((response) => {
      if (response.data.length > 0) {
        this.setState({
          reviews: response.data,
        });
      }
    });
  }

  getDate(date) {
    var newDate = new Date(date);
    var options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return newDate.toLocaleDateString("en-US", options);
  }

  render() {
    return (
      <div>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css"
        ></link>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
        <script src="https://kit.fontawesome.com/a076d05399.js"></script>

        <div align="center" className="review-background">
          <Navbar items={["u", "u", "active", "u"]}></Navbar>
          <div align="center" className="reviews-title">
            <h2 style={{ marginTop: "70px" }}>Reviews</h2>
            <p className="review-description">
              Review your trip here by telling us what went wrong, what went
              right, what you liked, and what you didn't like.
            </p>
          </div>
          <div className="review-box">
            <div className="average-box" align="left">
              Average review rating:{"  "}
              <strong className="average-rating">
                {this.getAverageRating(this.state.reviews).toFixed(1)}
              </strong>
            </div>
            <hr></hr>
            {this.renderReviews()}
          </div>
          <div className="review-submission-box">
            {!this.state.isActive ? (
              <button className="write-button" onClick={this.handleShow}>
                Write a Review
              </button>
            ) : null}
            {this.state.isActive ? (
              <div>
                <div align="left">
                  <h3 className="user-review-title">Your Review</h3>
                </div>

                <form onSubmit={this.handleSubmit}>
                  <div>
                    <span>
                      <input
                        className="place-input"
                        placeholder="Place"
                        type="text"
                        id="place-input"
                      />
                    </span>
                  </div>
                  <div>
                    <input
                      className="name-input"
                      placeholder="Name"
                      type="text"
                      id="name-input"
                    />
                  </div>
                  <div>
                    <textarea
                      className="review-input"
                      placeholder="Write review here..."
                      id="review-input"
                    ></textarea>
                  </div>
                  <span className="rating-input-box">
                    Rating:{" "}
                    <input
                      id="rating-input"
                      type="NUMBER"
                      min="1"
                      max="5"
                      step="1"
                      placeholder="5"
                      size="6"
                      className="input-spinner"
                    ></input>
                  </span>
                </form>
              </div>
            ) : null}
            {this.state.isActive ? (
              <button
                className="write-button submit"
                onClick={this.handleSubmit}
              >
                Submit your Review
              </button>
            ) : null}
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Review;
