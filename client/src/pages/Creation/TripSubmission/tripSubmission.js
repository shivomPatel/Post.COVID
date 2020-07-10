import React, { Component } from "react";
import Navbar from "../../components/Navbar/navbar";
import Destination from "./components/Destination";
import jsPDF from "jspdf";
import "./tripSubmission.css";

function loadFromLocalStorage() {
  try {
    const serializedState = localStorage.getItem("state");
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (e) {
    console.log(e);
    return undefined;
  }
}

class TripSubmission extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
    };
    this.getLocalStorage = this.getLocalStorage.bind(this);
    this.pdfGenerator = this.pdfGenerator.bind(this);
  }

  componentDidMount() {
    const localStorageState = loadFromLocalStorage();
    this.setList(localStorageState.todos);
  }

  setList(_list) {
    this.setState({
      list: _list,
    });
  }

  getLocalStorage = () => {
    const list = this.state.list;

    var data = [];

    list.map((item) => {
      const e = localStorage.getItem(item.text);
      var place;

      if (e !== null && e !== "{}") {
        place = JSON.parse(e);
        data.push({
          place: item.text,
          date: place.date,
          time: place.time,
          description: place.description,
        });
      } else {
        data.push({
          place: item.text,
          date: "None",
          time: "None",
          description: "None",
        });
      }
    });
    return data;
  };

  pdfGenerator = () => {
    const storageData = this.getLocalStorage();
    const tripName = localStorage.getItem("Trip Name");
    const name = localStorage.getItem("Name");
    const email = localStorage.getItem("Email");
    console.log(storageData);
    var doc = new jsPDF("p", "pt");

    var pageWidth =
      doc.internal.pageSize.width || doc.internal.pageSize.getWidth();

    doc.setFont("Times");
    doc.setFontType("normal");
    doc.setFontSize(12);
    doc.text(250, 50, tripName);

    doc.text(50, 80, "Name: " + name);
    doc.text(50, 100, "Email: " + email);
    doc.line(50, 115, pageWidth - 50, 115);

    var start = 60;
    for (var i = 0; i < storageData.length; i++) {
      var j = i + 1;
      doc.text(50, (start += 70), j + " - " + storageData[i].place);
      doc.text(65, (start += 15), "Date: " + storageData[i].date);
      doc.text(65, (start += 15), "Time: " + storageData[i].time);
      doc.text(65, (start += 15), "Description: " + storageData[i].description);
    }

    doc.save(tripName + ".postCOVID.pdf");
    this.props.history.push("/creation/tripSubmission/tripCompletion");
  };

  renderItems() {
    const list = this.state.list;

    return list.map((item, i) => (
      <Destination key={i} id={item.text} item={item} />
    ));
  }

  render() {
    return (
      <div
        align="center"
        style={{
          color: "black",
          backgroundColor: "#f0f0f0",
          height: "100%",
        }}
      >
        <Navbar items={["u", "u", "u", "u"]} />
        <h2
          style={{
            color: "black",
            fontWeight: "lighter",
            marginTop: "50px",
            width: "80%",
            textAlign: "left",
          }}
        >
          Review Trip Submission:{" "}
          <strong style={{ color: "#fc2671" }}>
            {localStorage.getItem("Trip Name")}
          </strong>
          <button
            style={{
              float: "right",
              paddingLeft: "25px",
              paddingRight: "25px",
              paddingTop: "7px",
              paddingBottom: "7px",
              fontSize: "12pt",
              fontWeight: "bold",
              color: "white",
              backgroundColor: "#ff5792",
              borderStyle: "none",
              borderRadius: "3px",
              borderBottom: "4px solid #054573",
              marginRight: "7px",
            }}
            onClick={this.pdfGenerator}
          >
            Build Itinerary
          </button>
        </h2>
        <div
          align="center"
          style={{
            backgroundColor: "black",
            width: "80%",
            height: "1px",
            marginBottom: "30px",
            marginTop: "30px",
          }}
        ></div>
        <div
          align="center"
          style={{
            backgroundColor: "white",
            width: "80%",
            height: "100%",
            borderRadius: "3px",
            padding: "50px",
          }}
        >
          {this.renderItems()}
        </div>
        <button
          style={{
            paddingLeft: "25px",
            paddingRight: "25px",
            paddingTop: "7px",
            paddingBottom: "7px",
            fontSize: "12pt",
            fontWeight: "bold",
            color: "white",
            backgroundColor: "#ff5792",
            borderStyle: "none",
            borderRadius: "3px",
            borderBottom: "4px solid #054573",
            marginRight: "7px",
            marginBottom: "100px",
            marginTop: "20px",
          }}
          onClick={this.pdfGenerator}
        >
          Build Itinerary
        </button>
      </div>
    );
  }
}

export default TripSubmission;
