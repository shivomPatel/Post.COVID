import React, { Component } from "react";
import Navbar from "../components/Navbar/navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Footer from "../components/Footer/footer";
import { faFeatherAlt } from "@fortawesome/free-solid-svg-icons";
import "./trips.css";

class TripBuilder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: undefined,
      email: undefined,
      tripName: undefined,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  isValidCredentials(name, email, trip) {
    if (
      name.localeCompare("") === 0 ||
      email.localeCompare("") === 0 ||
      trip.localeCompare("") === 0
    ) {
      return false;
    }
    return this.validateEmail(email);
  }

  handleSubmit(event) {
    // event.preventDefault();
    var name = event.target.name.value;
    var email = event.target.email.value;
    var tripName = event.target.tripName.value;
    this.setState({
      name: name,
      email: email,
      tripName: tripName,
    });
    // href={`/creation?name=${this.state.name}&email=${this.state.email}&tripName=${this.state.tripName}`}

    var isValid = this.isValidCredentials(name, email, tripName);

    if (isValid) {
      localStorage.setItem("Name", name);
      localStorage.setItem("Email", email);
      localStorage.setItem("Trip Name", tripName);
      this.props.history.push(
        `/creation?name=${name}&email=${email}&tripName=${tripName}`
      );
    } else {
      window.alert("Unfit Credentials.");
      this.props.history.push("/tripbuilder");
    }
  }

  componentDidMount() {
    localStorage.clear();
  }

  render() {
    return (
      <div className="tripbuilder-bg">
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css"
        ></link>

        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
        <script src="https://kit.fontawesome.com/a076d05399.js"></script>
        <div>
          <Navbar items={["u", "active", "u", "u"]}></Navbar>
          <div align="center">
            <div className="background-trips-body">
              <div className="trip-form">
                <form className="form-layer" onSubmit={this.handleSubmit}>
                  <div align="center">
                    <FontAwesomeIcon
                      className="feather-icon"
                      icon={faFeatherAlt}
                    />
                  </div>
                  <div align="center">
                    <h2 className="createtrip-title">Create a Trip</h2>
                  </div>
                  <label className="labels" htmlFor="tripName">
                    Trip Name
                  </label>
                  <div className="form-group">
                    <input
                      type="text"
                      // className="form-control"
                      className="form-input"
                      id="tripName"
                      aria-describedby="theTripName"
                      placeholder="Enter trip name"
                      value={this.state.tripName}
                    />
                  </div>
                  <label className="labels" htmlFor="name">
                    Name
                  </label>
                  <div className="form-group">
                    <input
                      type="text"
                      // className="form-control"
                      className="form-input"
                      id="name"
                      aria-describedby="theName"
                      placeholder="Enter name"
                      value={this.state.name}
                    />
                  </div>
                  <label className="labels" htmlFor="exampleInputEmail1">
                    Email address
                  </label>
                  <div className="form-group">
                    <input
                      type="email"
                      // className="form-control"
                      className="form-input"
                      id="email"
                      aria-describedby="emailHelp"
                      placeholder="Enter email"
                      value={this.state.email}
                    />
                  </div>
                  <input
                    className="submit-button"
                    type="submit"
                    value="Submit"
                  />
                </form>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}

export default TripBuilder;
