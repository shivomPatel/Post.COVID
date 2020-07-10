import React, { Component } from "react";
import Navbar from "../components/Navbar/navbar";
import Footer from "../components/Footer/footer";
import Star from "../components/Star/Star";
import axios from "axios";
import "./events.css";

const seat_geek_client_id = "MjEyMDE0MTh8MTU5MTE0NjEzMy45Nw";
const zomato_key = "a709f309de1a20ac8da79907af27d37c";

class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurants: [],
      activities: [],
      isActiveRestaurants: false,
      isActiveActivities: false,
    };
  }

  async createRestaurants(data) {
    let res = [];
    for (var i = 0; i < data.nearby_restaurants.length; i++) {
      res.push(
        <div key={i} align="left" className="card-e">
          <div className="card-body">
            <h4>{data.nearby_restaurants[i].restaurant.name}</h4>
            <h6>{data.nearby_restaurants[i].restaurant.cuisines}</h6>
            <p className="card-text">
              <span className="rating"> </span>
              {this.renderStars(
                Math.round(
                  data.nearby_restaurants[i].restaurant.user_rating
                    .aggregate_rating
                )
              )}
            </p>
            <a
              href={data.nearby_restaurants[i].restaurant.url}
              className="visit-button"
            >
              Visit Website
            </a>
            <a
              href={data.nearby_restaurants[i].restaurant.menu_url}
              className="menu-button"
            >
              Menu
            </a>
          </div>
          <hr />
        </div>
      );
    }
    this.setState({
      restaurants: res,
      isActiveRestaurants: true,
    });
  }

  formatDate(event) {
    let date = new Date(event.datetime_local);
    let f_date = date.toLocaleTimeString();
    let date_substr =
      f_date.substring(0, f_date.lastIndexOf(":")) +
      " " +
      f_date.substring(f_date.length - 2);
    return date_substr;
  }

  renderStars = (rating) => {
    // console.log(this.state.reviews);
    let stars = [];
    for (var i = 0; i < 5; i++) {
      if (i < rating) {
        stars.push(<Star key={i} state={"active"} />);
      } else {
        stars.push(<Star key={i} state={"none"} />);
      }
    }
    return stars;
  };

  getPopStyle(value) {
    var num = new Number(value);
    var per = Math.round(num.toString());
    var color;
    // Red - not very good
    if (per <= 33) color = "red";
    // Yellow - okay
    if (per > 33 && per <= 66) color = "yellow";
    // Green - pretty goog
    if (per >= 66) color = "#42f598";

    return { backgroundColor: color, width: per.toString() + "%" };
  }

  async getEvents() {
    const response = await axios({
      method: "GET",
      url: `https://api.seatgeek.com/2/events?geoip=true&range=12mi&client_id=${seat_geek_client_id}`,
    });
    let res = [];
    for (var i = 0; i < response.data.events.length; i++) {
      let event = response.data.events[i];
      let taxes = [];
      let date = new Date(event.datetime_local);
      let time_of_event = this.formatDate(event);
      for (var j = 0; j < event.taxonomies.length; j++) {
        taxes.push(
          <span key={j + 1} className="types">
            {event.taxonomies[j].name}{" "}
          </span>
        );
      }
      res.push(
        <div key={i}>
          <div align="left" className="card-e">
            <div className="card-body">
              <h4 className="event-title">
                {event.title}{" "}
                <span className="status-title">
                  {event.is_open ? (
                    <span className="open">Open</span>
                  ) : (
                    <span className="closed">Closed</span>
                  )}
                </span>
              </h4>
              <h5 className="event-taxes">
                {/* <span className="type-title">Type: </span> */}
                {taxes}
              </h5>
              <h5>
                <span className="type-title">Popularity: </span>
                <span className="popularity">
                  {event.popularity === 0
                    ? "No Rating"
                    : (event.popularity * 100).toFixed(2) + "%"}{" "}
                </span>
              </h5>
              {event.popularity === 0 ? null : (
                <div className="progress">
                  <div
                    className="progress-bar"
                    role="progressbar"
                    aria-valuenow="70"
                    aria-valuemin="0"
                    aria-valuemax="100"
                    style={this.getPopStyle(
                      (event.popularity * 100).toFixed(2)
                    )}
                  ></div>
                </div>
              )}
              <p className="event-location">
                {event.venue.address}, {event.venue.display_location}
              </p>
              <a href={event.url} className="visit-button">
                Visit Website
              </a>
              <span className="event-date">
                {date.toDateString()} - {time_of_event}
              </span>
            </div>
          </div>
          <hr className="hr-line" />
        </div>
      );
    }

    this.setState({
      activities: res,
      isActiveActivities: true,
    });
  }

  getRestaurants() {
    navigator.geolocation.getCurrentPosition(async (position) => {
      let lat = position.coords.latitude;
      let lng = position.coords.longitude;
      const response = await axios({
        method: "GET",
        url: `https://developers.zomato.com/api/v2.1/geocode?lat=${lat}&lon=${lng}`,
        headers: {
          "user-key": zomato_key,
          "content-type": "application/json",
        },
      });
      this.createRestaurants(response.data);
    });
  }

  componentDidMount() {
    this.getRestaurants();
    this.getEvents();
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
        <div className="backgroun">
          <Navbar items={["u", "u", "u", "active"]}></Navbar>
          <div className="row-b">
            <div className="column-b">
              <h2 className="food-column-title">Food</h2>
              <p className="column-description"> Restaurants Near You </p>
              <div className="restaurant-list">
                {this.state.isActiveRestaurants ? (
                  this.state.restaurants
                ) : (
                  <div align="center" className="loader ldr1"></div>
                )}
              </div>
            </div>
            <div className="column-b-2">
              <h2 className="activity-column-title">Activity</h2>
              <p className="column-description">Activities Near You</p>
              <div className="events-list">
                {this.state.isActiveActivities ? (
                  this.state.activities
                ) : (
                  <div align="center" className="loader ldr2"></div>
                )}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Events;
