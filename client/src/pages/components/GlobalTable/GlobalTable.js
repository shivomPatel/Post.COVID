import React, { Component } from "react";
import "./globaltable.css";
import axios from "axios";

class GlobalTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cases: [],
      formatted_cases: [],
      isActive: false,
      value: undefined,
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    var slugs = [];
    await axios.get("https://api.covid19api.com/countries").then((resp) => {
      resp.data.map((country) => {
        slugs.push(country.Slug);
      });
    });

    var countriesData = [];
    for (var i = 0; i < slugs.length; i++) {
      await axios
        .get(`https://api.covid19api.com/total/dayone/country/${slugs[i]}`)
        .then((resp) => {
          var arr = resp.data;
          if (arr.length > 0) {
            arr.pop();
            var item = arr.pop();
            countriesData.push({
              country: item.Country,
              active: item.Active,
              confirmed: item.Confirmed,
              deaths: item.Deaths,
              recovered: item.Recovered,
            });
          }
        });
    }

    this.setState({
      cases: countriesData,
    });

    this.createTable();
  };

  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  handleSearch(e) {
    var input = e.target.value;
    var filter = input.toUpperCase();
    var table = document.getElementById("myTable");
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
                href={`/learnmore?name=${item.country}`}
              >
                {item.country}
              </a>
            </td>
            <td className="content active-style">
              {this.numberWithCommas(item.active)}
            </td>
            <td className="content confirmed-style">
              {this.numberWithCommas(item.confirmed)}
            </td>
            <td className="content deaths-style">
              {this.numberWithCommas(item.deaths)}
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
                href={`/learnmore?name=${item.country}`}
              >
                {item.country}
              </a>
            </td>
            <td className="content active-style">
              {this.numberWithCommas(item.active)}
            </td>
            <td className="content confirmed-style">
              {this.numberWithCommas(item.confirmed)}
            </td>
            <td className="content deaths-style">
              {this.numberWithCommas(item.deaths)}
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
            COVID-19 Global Information Table
          </h3>
        </div>
        {this.state.isActive ? (
          <div>
            <h3 style={{ textAlign: "left", color: "black" }}>Global</h3>
            <div align="left">
              <input
                type="text"
                id="myInput"
                placeholder="Search country..."
                title="Type in a country"
                onChange={this.handleSearch}
                className="data-searchbar"
              />
            </div>
            <div className="table-box">
              <table id="myTable" className="scrolldown">
                <thead className="titles-bar">
                  <tr>
                    <th className="Country">Country</th>
                    <th className="Active">Active</th>
                    <th className="Confirmed">Confirmed</th>
                    <th className="Deaths">Deceased</th>
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

export default GlobalTable;
