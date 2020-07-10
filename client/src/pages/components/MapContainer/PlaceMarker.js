import React, { Component } from "react";
import { Marker, InfoWindow } from "@react-google-maps/api";

class PlaceMarker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
    };
  }

  handleToggleOpen = () => {
    this.setState({
      isOpen: true,
    });
  };

  handleToggleClose = () => {
    this.setState({
      isOpen: false,
    });
  };

  render() {
    return (
      <Marker
        key={this.props.index}
        position={{ lat: this.props.lat, lng: this.props.lng }}
        onClick={() => this.handleToggleOpen()}
      >
        {this.state.isOpen && (
          <InfoWindow onCloseClick={this.props.handleCloseCall}>
            <div>
              <h3 style={{ color: "black" }}>{this.props.index}</h3>
              <a href={"/Learnmore?name=" + this.props.index}>Learn More</a>
            </div>
          </InfoWindow>
        )}
      </Marker>
    );
  }
}

export default PlaceMarker;
