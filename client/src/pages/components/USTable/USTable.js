import React, { Component } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLongArrowAltUp } from "@fortawesome/free-solid-svg-icons";
import "./usTable.css";

class USTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cases: [],
      formatted_cases: [],
      isActive: false,
      value: undefined,
      map: new Map([
        ["AZ", "Arizona"],
        ["AL", "Alabama"],
        ["AS", "American Samoa"],
        ["AK", "Alaska"],
        ["AR", "Arkansas"],
        ["CA", "California"],
        ["CO", "Colorado"],
        ["CT", "Connecticut"],
        ["DC", "District of Columbia"],
        ["DE", "Delaware"],
        ["FL", "Florida"],
        ["GA", "Georgia"],
        ["GU", "Guam"],
        ["HI", "Hawaii"],
        ["ID", "Idaho"],
        ["IL", "Illinois"],
        ["IN", "Indiana"],
        ["IA", "Iowa"],
        ["KS", "Kansas"],
        ["KY", "Kentucky"],
        ["LA", "Louisiana"],
        ["ME", "Maine"],
        ["MD", "Maryland"],
        ["MA", "Massachusetts"],
        ["MI", "Michigan"],
        ["MN", "Minnesota"],
        ["MS", "Mississippi"],
        ["MO", "Missouri"],
        ["MP", "Northern Marianas"],
        ["MT", "Montana"],
        ["NE", "Nebraska"],
        ["NV", "Nevada"],
        ["NH", "New Hampshire"],
        ["NJ", "New Jersey"],
        ["NM", "New Mexico"],
        ["NY", "New York"],
        ["NC", "North Carolina"],
        ["ND", "North Dakota"],
        ["OH", "Ohio"],
        ["OK", "Oklahoma"],
        ["OR", "Oregon"],
        ["PA", "Pennsylvania"],
        ["PR", "Puerto Rico"],
        ["RI", "Rhode Island"],
        ["SC", "South Carolina"],
        ["SD", "South Dakota"],
        ["TN", "Tennessee"],
        ["TX", "Texas"],
        ["VI", "Virgin Islands"],
        ["UT", "Utah"],
        ["VT", "Vermont"],
        ["VA", "Virginia"],
        ["WA", "Washington"],
        ["WV", "West Virginia"],
        ["WI", "Wisconsin"],
        ["WY", "Wyoming"],
      ]),
    };
  }

  componentDidMount() {
    this.getData();
  }

  async getData() {
    var states = [];

    await axios.get("https://covidtracking.com/api/states").then((resp) => {
      resp.data.map((item) => {
        states.push({
          state: item.state,
          positive: item.positive,
          positiveIncrease: item.positiveIncrease,
          deaths: item.death,
          deathIncrease: item.deathIncrease,
          recovered: item.recovered !== null ? item.recovered : "--",
        });
      });
    });

    this.setState({
      cases: states,
    });

    this.createTable();
  }

  numberWithCommas(x) {
    if (x === "--") return x;
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  dailyChange(current, increase) {
    if (current - increase === 0) return 0;
    return (increase / (current - increase)) * 100;
  }

  handleSearch(e) {
    var input = e.target.value;
    var filter = input.toUpperCase();
    var table = document.getElementById("myTable2");
    var tr = table.getElementsByTagName("tr");
    var td, txtValue;
    for (var i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }

  createTable() {
    let rows = [];
    for (var i = 0; i < this.state.cases.length; i++) {
      var item = this.state.cases[i];
      if (item === undefined) continue;
      if (i % 2) {
        rows.push(
          <tr key={i} className="row-content">
            <td className="content country-style">
              <a
                style={{ color: "black" }}
                href={`/learnmore?name=${this.state.map.get(item.state)}`}
              >
                {this.state.map.get(item.state)}
              </a>
            </td>
            <td className="content confirmed-style">
              {this.numberWithCommas(item.positive)}
            </td>
            <td className="content dailychange-style">
              {item.positiveIncrease === 0 ? (
                "--"
              ) : (
                <span style={{ color: "#008cff" }}>
                  <FontAwesomeIcon
                    style={{ marginRight: "10px", fontSize: "13pt" }}
                    icon={faLongArrowAltUp}
                    className="up-arrow-icon"
                  />
                  {item.positiveIncrease} {"  "} (
                  {this.dailyChange(
                    item.positive,
                    item.positiveIncrease
                  ).toFixed(2)}
                  %)
                </span>
              )}
            </td>
            <td className="content deaths-style">
              {this.numberWithCommas(item.deaths)}
            </td>
            <td style={{ color: "red" }} className="content">
              {item.deathIncrease === 0 ? (
                "--"
              ) : (
                <span style={{ color: "red" }}>
                  <FontAwesomeIcon
                    style={{ marginRight: "10px", fontSize: "13pt" }}
                    icon={faLongArrowAltUp}
                    className="up-arrow-icon-deaths"
                  />
                  {item.deathIncrease} {"  "} (
                  {this.dailyChange(item.deaths, item.deathIncrease).toFixed(2)}
                  %)
                </span>
              )}
            </td>
            <td className="content recovered-style">
              {this.numberWithCommas(item.recovered)}
            </td>
          </tr>
        );
      } else {
        rows.push(
          <tr key={i} className="row-content-light">
            <td className="content country-style">
              <a
                style={{ color: "black" }}
                href={`/learnmore?name=${this.state.map.get(item.state)}`}
              >
                {this.state.map.get(item.state)}
              </a>
            </td>
            <td className="content confirmed-style">
              {this.numberWithCommas(item.positive)}
            </td>
            <td className="content dailychange-style">
              {item.positiveIncrease === 0 ? (
                "--"
              ) : (
                <span style={{ color: "#008cff" }}>
                  <FontAwesomeIcon
                    style={{ marginRight: "10px", fontSize: "13pt" }}
                    icon={faLongArrowAltUp}
                    className="up-arrow-icon"
                  />
                  {item.positiveIncrease} {"  "} (
                  {this.dailyChange(
                    item.positive,
                    item.positiveIncrease
                  ).toFixed(2)}
                  %)
                </span>
              )}
            </td>
            <td className="content deaths-style">
              {this.numberWithCommas(item.deaths)}
            </td>
            <td style={{ color: "red" }} className="content">
              {item.deathIncrease === 0 ? (
                "--"
              ) : (
                <span style={{ color: "red" }}>
                  <FontAwesomeIcon
                    style={{ marginRight: "10px", fontSize: "13pt" }}
                    icon={faLongArrowAltUp}
                    className="up-arrow-icon-deaths"
                  />
                  {item.deathIncrease} {"  "} (
                  {this.dailyChange(item.deaths, item.deathIncrease).toFixed(2)}
                  %)
                </span>
              )}
            </td>
            <td className="content recovered-style">
              {this.numberWithCommas(item.recovered)}
            </td>
          </tr>
        );
      }
    }

    this.setState({
      formatted_cases: rows,
      isActive: true,
    });
  }

  render() {
    return (
      <div>
        <div align="center">
          <h3
            style={{
              backgroundColor: "#28242f",
              color: "white",
              borderRadius: "6px",
              paddingLeft: "15px",
              paddingRight: "15px",
              paddingTop: "7px",
              paddingBottom: "7px",
              marginBottom: "20px",
              width: "49%",
              textAlign: "center",
            }}
          >
            COVID-19 US Information Guide
          </h3>
        </div>
        {this.state.isActive ? (
          <div>
            <h3 style={{ textAlign: "left", color: "black" }}>United States</h3>
            <div align="left">
              <input
                type="text"
                id="myInput"
                placeholder="Search state..."
                title="Type in a state"
                onChange={this.handleSearch}
                className="data-searchbar"
              />
            </div>
            <div className="table-box">
              <table id="myTable2" className="scrolldown">
                <thead className="titles-bar">
                  <tr>
                    <th className="Country">State</th>
                    <th className="Confirmed">Confirmed</th>
                    <th className="Confirmed">Daily Case Change</th>
                    <th className="Deaths">Deceased</th>
                    <th className="Deaths">Daily Deceased Change</th>
                    <th className="Recovered">Recovered</th>
                  </tr>
                </thead>
                <tbody>{this.state.formatted_cases}</tbody>
              </table>
            </div>
          </div>
        ) : (
          <div>
            <h3 style={{ color: "black" }}>Retrieving Data...</h3>
          </div>
        )}
      </div>
    );
  }
}

export default USTable;
