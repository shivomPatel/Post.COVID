import React, { Component } from "react";
import { MDBDataTable } from "mdbreact";

class DatatablePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stateCases: [],
    };
    this.getRange = this.getRange.bind(this);
  }

  setData = () => {
    let data = {
      columns: [
        {
          label: "Place",
          field: "name",
          sort: "asc",
          width: 150,
        },
        {
          label: "Cases Reported",
          field: "casesReported",
          sort: "asc",
          width: 200,
        },
        {
          label: "Range",
          field: "range",
          sort: "asc",
          width: 270,
        },
        // {
        //   label: "Community Transmission",
        //   field: "communityTransmission",
        //   sort: "asc",
        //   width: 270,
        // },
      ],
      rows: this.state.stateCases,
    };
    return data;
  };

  getRange = (cases) => {
    if (cases >= 0 && cases <= 1000) {
      return "0 to 1,000";
    }
    if (cases >= 1001 && cases <= 5000) {
      return "1,001 to 5,000";
    }
    if (cases >= 5001 && cases <= 10000) {
      return "5,001 to 10,000";
    }
    if (cases >= 10001 && cases <= 20000) {
      return "10,001 to 20,000";
    }
    if (cases >= 20001 && cases <= 40000) {
      return "20,001 to 40,000";
    }
    if (cases >= 40001) {
      return "40,001 or more";
    }
  };

  getGlobalData = () => {
    // World Data
    let arr = [];
    let requestURL2 = "https://www.trackcorona.live/api/countries";
    let request2 = new XMLHttpRequest();
    request2.open("GET", requestURL2);
    request2.responseType = "json";
    request2.send();
    request2.onload = () => {
      for (var i = 0; i < request2.response.data.length; i++) {
        let Range = this.getRange(request2.response.data[i].confirmed);
        arr.push({
          name: request2.response.data[i].location,
          casesReported: request2.response.data[i].confirmed.toLocaleString(),
          range: Range,
        });
      }
    };
    return arr;
  };

  getData = () => {
    // US Data
    let arr = [];
    let requestURL =
      "https://api.apify.com/v2/key-value-stores/moxA3Q0aZh5LosewB/records/LATEST?disableRedirect=true";
    let request = new XMLHttpRequest();
    request.open("GET", requestURL);
    request.responseType = "json";
    request.send();
    request.onload = function () {
      const virusByState = request.response.casesByState;
      for (var i = 0; i < virusByState.length; i++) {
        arr.push({
          name: virusByState[i].name,
          casesReported: virusByState[i].casesReported.toLocaleString(),
          range: virusByState[i].range,
        });
      }
    };

    let requestURL2 = "https://www.trackcorona.live/api/countries";
    let request2 = new XMLHttpRequest();
    request2.open("GET", requestURL2);
    request2.responseType = "json";
    request2.send();
    request2.onload = () => {
      for (var i = 0; i < request2.response.data.length; i++) {
        let Range = this.getRange(request2.response.data[i].confirmed);
        arr.push({
          name: request2.response.data[i].location,
          casesReported: request2.response.data[i].confirmed.toLocaleString(),
          range: Range,
        });
      }
    };
    return arr;
  };

  componentDidMount() {
    var arr = this.getData();
    this.setState({
      stateCases: arr,
    });
  }

  render() {
    return (
      <div>
        <h3>COVID-19 Cases Information Table</h3>
        <p>Updated every 5 mins</p>
        <MDBDataTable bordered small data={this.setData()}></MDBDataTable>
      </div>
    );
  }
}

export default DatatablePage;
