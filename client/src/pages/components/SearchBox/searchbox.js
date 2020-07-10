import React from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome/";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons/";

class LocationSearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { address: "" };
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleChange = (address) => {
    this.setState({ address });
  };

  handleSelect = (address) => {
    // geocodeByAddress(address)
    //   .then((results) => getLatLng(results[0]))
    //   .then((latLng) => console.log("Success", latLng))
    //   .catch((error) => console.error("Error", error));
    var a = address;
    var place = a.split(",")[0];
    console.log(place);
    window.location.assign("/learnmore?name=" + place);
  };

  render() {
    return (
      <div>
        <PlacesAutocomplete
          value={this.state.address}
          onChange={this.handleChange}
          onSelect={this.handleSelect}
        >
          {({
            getInputProps,
            suggestions,
            getSuggestionItemProps,
            loading,
          }) => (
            <div>
              <input
                style={{
                  borderStyle: "none",
                  padding: "10px",
                  fontSize: "12pt",
                  border: "1px solid #dedede",
                  width: "100%",
                  borderRadius: "5px",
                  textAlign: "left",
                  color: "black",
                }}
                {...getInputProps({
                  placeholder: "Search Places ...",
                  className: "location-search-input",
                })}
              />
              <div
                style={{ padding: "10px" }}
                className="autocomplete-dropdown-container"
              >
                {loading && <div>Loading...</div>}
                {suggestions.map((suggestion) => {
                  const className = suggestion.active
                    ? "suggestion-item--active"
                    : "suggestion-item";
                  // inline style for demonstration purpose
                  const style = suggestion.active
                    ? {
                        backgroundColor: "#fafafa",
                        cursor: "pointer",
                        paddingTop: "7px",
                        borderBottom: "1px solid #d2d4d2",
                      }
                    : {
                        backgroundColor: "#ffffff",
                        cursor: "pointer",
                        paddingTop: "7px",
                        borderBottom: "1px solid #d2d4d2",
                      };
                  return (
                    <div
                      align="left"
                      {...getSuggestionItemProps(suggestion, {
                        className,
                        style,
                      })}
                    >
                      <span style={{ color: "black", fontWeight: "bold" }}>
                        <FontAwesomeIcon
                          style={{ marginRight: "10px", fontSize: "12pt" }}
                          icon={faMapMarkerAlt}
                        />
                        {suggestion.description}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </PlacesAutocomplete>
      </div>
    );
  }
}

export default LocationSearchInput;
