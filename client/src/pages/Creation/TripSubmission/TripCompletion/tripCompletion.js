import React, { Component } from "react";
import Navbar from "../../../components/Navbar/navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome/";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons/";
import "./tripCompletion.css";

class TripCompletion extends Component {
  constructor(props) {
    super(props);
    this.handleClickHome = this.handleClickHome.bind(this);
    this.handleClickTripBuilder = this.handleClickTripBuilder.bind(this);
  }
  handleClickHome() {
    localStorage.clear();
    this.props.history.push("/");
  }
  handleClickTripBuilder() {
    localStorage.clear();
    this.props.history.push("/tripbuilder");
  }

  render() {
    return (
      <div align="center">
        <Navbar items={["u", "u", "u", "u"]} />
        <div
          align="center"
          style={{
            margin: "50px",
            width: "50%",
          }}
        >
          <div
            style={{
              height: "70vh",
              backgroundColor: "honeydew",
              padding: "50px",
              border: "20px solid white",
            }}
          >
            <h1
              style={{
                textAlign: "center",
                color: "black",
                fontWeight: "lighter",
              }}
            >
              Trip Created
            </h1>
            <hr style={{ marginTop: "30px" }} />
            <div
              className="completion-box"
              style={{
                backgroundColor: "white",
                height: "40vh",
                overflow: "scroll",
                marginTop: "30px",
              }}
            >
              <div
                style={{ padding: "20px", fontSize: "15pt", color: "black" }}
              >
                Trip created:{" "}
                <strong style={{ color: "cornflowerblue" }}>
                  {localStorage.getItem("Trip Name")}
                </strong>
                <div style={{ marginTop: "30px" }}>
                  <FontAwesomeIcon
                    className="check-circle-icon"
                    icon={faCheckCircle}
                  />
                </div>
              </div>
              <div style={{ marginTop: "40px" }} align="center">
                <span align="center">
                  <button
                    onClick={this.handleClickTripBuilder}
                    style={{
                      paddingLeft: "25px",
                      paddingRight: "25px",
                      paddingTop: "7px",
                      paddingBottom: "7px",
                      fontSize: "12pt",
                      fontWeight: "bold",
                      color: "white",
                      backgroundColor: "#0095ff",
                      borderStyle: "none",
                      borderRadius: "3px",
                      borderBottom: "4px solid #01416e",
                      margin: "5px",
                    }}
                  >
                    Creation New Trip
                  </button>
                  <button
                    onClick={this.handleClickHome}
                    style={{
                      paddingLeft: "25px",
                      paddingRight: "25px",
                      paddingTop: "7px",
                      paddingBottom: "7px",
                      fontSize: "12pt",
                      fontWeight: "bold",
                      color: "white",
                      backgroundColor: "#0095ff",
                      borderStyle: "none",
                      borderRadius: "3px",
                      borderBottom: "4px solid #01416e",
                      margin: "5px",
                    }}
                  >
                    Return Home
                  </button>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TripCompletion;
