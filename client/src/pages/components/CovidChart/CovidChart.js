import React from "react";
import Cards from "../Cards/Cards";
import CountryPicker from "../CountryPicker/CountryPicker";
import Chart from "../Chart/Chart";
import { fetchData } from "../../api";
import styles from "./covidchart.module.css";

class CovidChart extends React.Component {
  state = {
    data: {},
    country: "",
  };

  async componentDidMount() {
    const data = await fetchData();

    this.setState({ data });
  }

  handleCountryChange = async (country) => {
    const data = await fetchData(country);

    this.setState({ data, country: country });
  };

  render() {
    const { data, country } = this.state;

    return (
      <div style={{ paddingTop: "20px" }} className={styles.container}>
        <CountryPicker handleCountryChange={this.handleCountryChange} />
        <Cards data={data} />
        <Chart data={data} country={country} />
      </div>
    );
  }
}

export default CovidChart;
