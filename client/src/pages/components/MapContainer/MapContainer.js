import React, { Component } from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";

import PlaceMarker from "./PlaceMarker";

const containerStyle = {
  width: "100%",
  height: "100%",
  borderRadius: "5px",
};

const center = {
  lat: 36.456,
  lng: -64.11,
};

class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      places: this.props.points,
      placeMarkers: [],
    };
  }

  componentDidMount() {
    this.createPlaceMarkers();
  }

  createPlaceMarkers() {
    let arr = [];
    this.state.places.map((p, i) => {
      arr.push(
        <PlaceMarker
          key={i}
          index={p.name}
          lat={p.location.lat}
          lng={p.location.lng}
        />
      );
    });

    this.setState({
      placeMarkers: arr,
    });
  }

  render() {
    return (
      <LoadScript googleMapsApiKey="AIzaSyCYqTOlIwQvYh30rp3riNLP137QWdTxzY4">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={3.5}
        >
          {this.state.placeMarkers}
        </GoogleMap>
      </LoadScript>
    );
  }
}

export default MapContainer;

// "AIzaSyCYqTOlIwQvYh30rp3riNLP137QWdTxzY4"
