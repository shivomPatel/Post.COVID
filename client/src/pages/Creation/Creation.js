import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import Navbar from "../components/Navbar/navbar";
import Tabs from "../components/Tabs/Tabs";
import { GoogleApiWrapper } from "google-maps-react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import AddTodo from "../containers/AddTodo";
import VisibleTodoList from "../containers/VisibleTodoList";
import CovidChart from "../components/CovidChart/CovidChart";
import USTable from "../components/USTable/USTable";
import rootReducer from "../reducers";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome/";
import {
  faMapMarkerAlt,
  faHamburger,
  faPlane,
  faCalendarAlt,
  faUtensils,
  faImages,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons/";
import "../components/CreationMap/creationmap.css";
import "./creation.css";

const persistedState = loadFromLocalStorage();
export const store = createStore(rootReducer, persistedState);
const seat_geek_client_id = "MjEyMDE0MTh8MTU5MTE0NjEzMy45Nw";
const zomato_key = "a709f309de1a20ac8da79907af27d37c";

function loadFromLocalStorage(state) {
  try {
    const serializedState = localStorage.getItem("state");
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (e) {
    console.log(e);
    return undefined;
  }
}

function saveToLocalStorage(state) {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("state", serializedState);
  } catch (e) {
    console.log(e);
  }
}

class Creation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      newLocations: [],
      locations: [
        { name: "Atlanta", location: { lat: 33.774483, lng: -84.382849 } },
        { name: "Belize", location: { lat: 17.490481, lng: -88.202213 } },
        { name: "Cancun", location: { lat: 21.165197, lng: -86.827264 } },
        {
          name: "Cape Canaveral",
          location: { lat: 28.392157, lng: -80.596978 },
        },
        { name: "Costa Maya", location: { lat: 18.735196, lng: -87.691022 } },
        { name: "Cozumel", location: { lat: 20.508578, lng: -86.947737 } },
        { name: "Dallas", location: { lat: 32.838814, lng: -96.786518 } },
        { name: "Grand Turk", location: { lat: 21.428566, lng: -71.143985 } },
        {
          name: "Green Cove Springs",
          location: { lat: 29.991212, lng: -81.689631 },
        },
        { name: "Jacksonville", location: { lat: 30.274438, lng: -81.388347 } },
        { name: "Miami", location: { lat: 25.774763, lng: -80.130467 } },
        { name: "Nassau", location: { lat: 25.078643, lng: -77.338089 } },
        { name: "New York", location: { lat: 40.736701, lng: -73.989334 } },
        { name: "Nocatee", location: { lat: 30.104096, lng: -81.430318 } },
        { name: "Orlando", location: { lat: 28.546863, lng: -81.373917 } },
        { name: "Roatan", location: { lat: 16.357849, lng: -86.442765 } },
        {
          name: "Saint-Martin",
          location: { lat: 18.0308266, lng: -63.0736329 },
        },
        { name: "St Augustine", location: { lat: 29.906616, lng: -81.314784 } },
        { name: "St Thomas", location: { lat: 18.339866, lng: -64.9249165 } },
        {
          name: "Washington D.C.",
          location: { lat: 38.89027, lng: -77.008907 },
        },
      ],
      markers: [],
      infowindow: new this.props.google.maps.InfoWindow(),
      map: null,
      bounds: null,
      add_place: null,
      nearby_places: [],
      restaurants: [],
      imgs: [],
      list_image: undefined,
      value: undefined,
    };
  }

  componentDidMount() {
    this.loadMap();
    this.onclickLocation();
    store.subscribe(() => saveToLocalStorage(store.getState()));
  }

  updateName = (name) => {
    this.setState({
      name: name,
    });
  };
  updateImage = (image) => {
    this.setState({
      list_image: image,
    });
  };
  loadMap() {
    if (this.props && this.props.google) {
      const that = this;
      const { google } = this.props;
      const maps = google.maps;
      const mapRef = this.refs.map;
      const node = ReactDOM.findDOMNode(mapRef);
      const mapConfig = Object.assign(
        {},
        {
          mapTypeId: "roadmap",
        }
      );
      const map = new maps.Map(node, mapConfig);
      const input = document.getElementById("search-input");
      const autocomplete = new google.maps.places.Autocomplete(input);
      const { infowindow } = this.state;
      const bounds = new maps.LatLngBounds();

      let markers = [];
      this.state.locations.map((location) => {
        const marker = new google.maps.Marker({
          position: { lat: location.location.lat, lng: location.location.lng },
          map: map,
          title: location.name,
        });
        markers.push(marker);
        bounds.extend(marker.position);
        marker.addListener("click", () => {
          that.populateInfoWindow(marker, infowindow);
        });
      });
      map.fitBounds(bounds);
      this.setState({
        map,
        markers,
        bounds,
      });

      // Bind the map's bounds (viewport) property to the autocomplete object,
      // so that the autocomplete requests use the current map bounds for the
      // bounds option in the request.
      autocomplete.bindTo("bounds", map);

      // Set the data fields to return when the user selects a place.
      autocomplete.setFields(["geometry", "name"]);

      autocomplete.addListener("place_changed", () => {
        infowindow.close();
        const place = autocomplete.getPlace();

        if (!place.geometry) {
          // User entered the name of a Place that was not suggested and
          // pressed the Enter key, or the Place Details request failed.
          window.alert("No details available for input: '" + place.name + "'");
          return;
        }
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        let newlocation = {
          name: place.name,
          location: { lat: lat, lng: lng },
        };
        that.setState((state) => ({
          newLocations: [...state.newLocations, newlocation],
        }));
        that.addLocation(newlocation);
        this.setState({
          place: newlocation,
        });

        fetch(
          `https://api.unsplash.com/search/photos?page=1&query=${newlocation.name}`,
          {
            headers: {
              Authorization:
                "Client-ID ed4ea3b388f4503fa9a5817e2e5250171fd92b3b61ff520ff9f6027cff251a67",
            },
          }
        )
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            this.setState({
              list_image: data.results[0].urls.small,
            });
          })
          .catch((err) => {
            console.log("Error happened during fetching!", err);
          });
      });
    }
  }
  onclickLocation = () => {
    const { infowindow } = this.state;

    const displayInfowindow = (e) => {
      const { markers } = this.state;

      const markerInd = markers.findIndex(
        (m) => m.title.toLowerCase() === e.target.innerText.toLowerCase()
      );

      this.populateInfoWindow(markers[markerInd], infowindow);
    };
    document
      .querySelector(".locations-list")
      .addEventListener("click", function (e) {
        if (e.target && e.target.nodeName === "LI") {
          displayInfowindow(e);
        }
      });
  };
  addLocation = (newlocation) => {
    const { google } = this.props;
    const { infowindow, bounds } = this.state;

    const newmarker = new google.maps.Marker({
      position: {
        lat: newlocation.location.lat,
        lng: newlocation.location.lng,
      },
      map: this.state.map,
      title: newlocation.name,
      icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
    });

    newmarker.addListener("click", () => {
      this.populateInfoWindow(newmarker, infowindow);
    });

    newmarker.addListener("dblclick", (e) => {
      this.deletePlace(e);
    });

    this.setState((state) => ({
      markers: [...state.markers, newmarker],
    }));
    bounds.extend(newmarker.position);

    this.state.map.fitBounds(bounds);
    this.getNearbyPlaces(newlocation);
    this.getRestaurants(newlocation);
    this.getViews(newlocation);
  };
  deletePlace = (e) => {
    let { newLocations, markers } = this.state;
    let markersArray = [];
    let event;
    let chosenOne = markers.filter((marker) => {
      event = e.va.currentTarget.title;
      if (marker.title === event) {
        return true;
      } else {
        markersArray.push(marker);
        return false;
      }
    });
    if (chosenOne.length > 0) {
      newLocations = newLocations.filter(
        (_location) =>
          _location.name.toLowerCase() !==
          e.va.currentTarget.title.toLowerCase()
      );
      if (newLocations.length >= 0) {
        chosenOne[0].setMap(null);
      }
    }
    this.setState({
      markers: markersArray,
      newLocations,
    });
  };
  populateInfoWindow = async (marker, infowindow) => {
    if (infowindow.marker !== marker) {
      marker.setAnimation(window.google.maps.Animation.BOUNCE);

      const markerPlace = {
        name: marker.title,
        location: {
          lat: marker.position.lat(),
          lng: marker.position.lng(),
        },
      };
      this.getViews(markerPlace);
      this.getRestaurants(markerPlace);
      this.getNearbyPlaces(markerPlace);
      this.setState({
        place: markerPlace,
      });

      infowindow.marker = marker;
      infowindow.setContent(
        "<div >" +
          `<h2 style="color:black; text-align: center; padding-top: 20px;">${marker.title}</h2><div align="center"><a href='/learnmore?name=${marker.title}'>Learn more</a></div>`
      );

      this.state.map.panTo(marker.position);
      this.state.map.setZoom(17);

      infowindow.open(this.map, marker);
      // Make sure the marker property is cleared if the infowindow is closed.
      infowindow.addListener("closeclick", function () {
        infowindow.marker = null;
        marker.setAnimation(null);
      });
    }
  };
  createRestaurants = async (data) => {
    let res = [];
    for (var i = 0; i < data.nearby_restaurants.length; i++) {
      res.push(
        <div key={i} align="left" className="card-b">
          <div className="card-body">
            <h4 style={{ color: "black" }}>
              {data.nearby_restaurants[i].restaurant.name}
            </h4>
            <h6 style={{ color: "black" }}>
              {data.nearby_restaurants[i].restaurant.cuisines}
            </h6>
            <p
              style={{ marginBottom: "20px", marginTop: "10px" }}
              className="card-text"
            >
              <span style={{ fontWeight: "bold" }} className="rating">
                Rating:{" "}
              </span>
              <span style={{ color: "#f84969", fontWeight: "bold" }}>
                {
                  data.nearby_restaurants[i].restaurant.user_rating
                    .aggregate_rating
                }
                /5.0
              </span>
            </p>
            <a
              href={data.nearby_restaurants[i].restaurant.url}
              style={{ fontSize: "11pt" }}
              className="visit-button"
            >
              Visit Website
            </a>
            <a
              href={data.nearby_restaurants[i].restaurant.menu_url}
              className="btn b2"
            >
              Menu
            </a>
          </div>
        </div>
      );
    }
    this.setState({
      restaurants: res,
    });
  };
  getRestaurants = async (place) => {
    if (place !== undefined) {
      let lat = place.location.lat;
      let lng = place.location.lng;
      const response = await axios({
        method: "GET",
        url: `https://developers.zomato.com/api/v2.1/geocode?lat=${lat}&lon=${lng}`,
        headers: {
          "user-key": zomato_key,
          "content-type": "application/json",
        },
      });
      this.createRestaurants(response.data);
    }
  };
  renderRestaurants = () => {
    if (this.state.restaurants.length !== 0) {
      return (
        <div>
          <h2 className="place-length" align="left">
            Restaurants in{" "}
            <strong className="place-strong">{this.state.nearby_search}</strong>{" "}
          </h2>
          {this.state.restaurants}
        </div>
      );
    } else {
      return (
        <div align="center">
          <h2 className="place-length" align="left">
            No Restaurants
          </h2>
          <FontAwesomeIcon
            className="calendar-ico calendar-icon-color"
            icon={faUtensils}
          ></FontAwesomeIcon>
          <div className="no-places-title" align="center">
            <h3 className="nope-title">Make Search to Receive Restaurants</h3>
          </div>
        </div>
      );
    }
  };
  formatDate(event) {
    let date = new Date(event.datetime_local);
    let f_date = date.toLocaleTimeString();
    let date_substr =
      f_date.substring(0, f_date.lastIndexOf(":")) +
      " " +
      f_date.substring(f_date.length - 2);
    return date_substr;
  }
  getPopStyle(value) {
    var num = new Number(value);
    var per = Math.round(num.toString());
    var color;
    // Red - not very good
    if (per <= 33) color = "red";
    // Yellow - okay
    if (per > 33 && per <= 66) color = "yellow";
    // Green - pretty goog
    if (per >= 66) color = "#42f598";

    return { backgroundColor: color, width: per.toString() + "%" };
  }
  getNearbyPlaces = async (place) => {
    if (place !== undefined) {
      const response = await axios({
        method: "GET",
        url: `https://api.seatgeek.com/2/events?lat=${place.location.lat}&lon=${place.location.lng}&range=50mi&client_id=${seat_geek_client_id}`,
      });
      let res = [];
      for (var i = 0; i < response.data.events.length; i++) {
        let event = response.data.events[i];
        let taxes = [];
        let date = new Date(event.datetime_local);
        let time_of_event = this.formatDate(event);
        for (var j = 0; j < event.taxonomies.length; j++) {
          taxes.push(
            <span key={j} className="types-creation">
              {event.taxonomies[j].name}{" "}
            </span>
          );
        }
        res.push(
          <div key={i}>
            <div align="left" className="card-b">
              <div className="card-body">
                <h4 style={{ color: "black" }} className="event-title">
                  {event.title}{" "}
                  <span className="status-title">
                    {event.is_open ? (
                      <span className="open">Open</span>
                    ) : (
                      <span className="closed">Closed</span>
                    )}
                  </span>
                </h4>
                <h5 className="event-taxes">{taxes}</h5>
                <h5>
                  <span className="type-title">Popularity: </span>
                  <span className="popularity">
                    {(event.popularity * 100).toFixed(2)}%{" "}
                  </span>
                </h5>
                <div className="progress">
                  <div
                    className="progress-bar"
                    role="progressbar"
                    aria-valuenow="70"
                    aria-valuemin="0"
                    aria-valuemax="100"
                    style={this.getPopStyle(
                      (event.popularity * 100).toFixed(2)
                    )}
                  ></div>
                </div>
                <p className="event-location">
                  {event.venue.address}, {event.venue.display_location}
                </p>
                <a
                  href={event.url}
                  style={{ fontSize: "11pt" }}
                  className="visit-button"
                >
                  Visit Website
                </a>
                <span className="event-date">
                  {date.toDateString()} - {time_of_event}
                </span>
              </div>
            </div>
            <hr className="hr-line" />
          </div>
        );
      }
      this.setState({
        nearby_search: place.name,
        nearby_places: res,
      });
    } else {
    }
  };
  renderNearbyPlaces() {
    if (this.state.nearby_places.length !== 0) {
      return (
        <div>
          <h2 className="place-length" align="left">
            Events in{" "}
            <strong className="place-strong">{this.state.nearby_search}</strong>{" "}
          </h2>
          {this.state.nearby_places}
        </div>
      );
    }
    return (
      <div align="center">
        <h2 className="place-length" align="left">
          No Events
        </h2>
        <FontAwesomeIcon
          className="calendar-ico calendar-icon-color"
          icon={faCalendarAlt}
        ></FontAwesomeIcon>
        <div className="no-places-title" align="center">
          <h3 className="nope-title">Make Search to Receive Events</h3>
        </div>
      </div>
    );
  }
  getViews = async (place) => {
    await fetch(
      `https://api.unsplash.com/search/photos?page=1&query=${place.name}`,
      {
        headers: {
          Authorization:
            "Client-ID ed4ea3b388f4503fa9a5817e2e5250171fd92b3b61ff520ff9f6027cff251a67",
        },
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({
          imgs: data.results,
        });
        this.updateImage(data.results[0].urls.large);
      })
      .catch((err) => {
        console.log("Error happened during fetching!", err);
      });
  };
  renderViews = () => {
    if (this.state.imgs.length !== 0) {
      let arr = [];

      for (var i = 0; i < this.state.imgs.length; i++) {
        var img = this.state.imgs[i];
        arr.push(
          <div key={i} align="center">
            <img
              width="500"
              height="auto"
              src={img.urls.regular}
              key={img.id}
              alt="images of the chosen place"
            ></img>
          </div>
        );
      }
      return (
        <div>
          <h2 className="place-length" align="left">
            Views of{" "}
            <strong className="place-strong">{this.state.nearby_search}</strong>{" "}
          </h2>
          {arr}
        </div>
      );
    }
    return (
      <div align="center">
        <h2 className="place-length" align="left">
          Views Unavailable
        </h2>
        <FontAwesomeIcon
          className="img-ico img-icon-color"
          icon={faImages}
        ></FontAwesomeIcon>
        <div className="no-places-title" align="center">
          <h3 className="nope-title">Make Search to Receive Images</h3>
        </div>
      </div>
    );
  };

  render() {
    let input;
    return (
      <div>
        <div>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
          <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
          <script src="https://kit.fontawesome.com/a076d05399.js"></script>
          <Navbar items={["u", "u", "u", "u"]} />

          <div className="grid-container">
            <div className="column-left">
              <div>
                <div align="left" className="back-btn">
                  <span style={{ marginBottom: "20px" }}>
                    <button
                      style={{
                        paddingLeft: "15px",
                        paddingRight: "15px",
                        paddingTop: "5px",
                        paddingBottom: "5px",
                        float: "left",
                        marginRight: "30px",
                        marginBottom: "30px",
                        borderStyle: "none",
                        borderRadius: "5px",
                        color: "white",
                        backgroundColor: "#429ef5",
                        fontSize: "13pt",
                      }}
                      onClick={() => {
                        localStorage.clear();
                        window.location.href = "/tripbuilder";
                      }}
                      className="Button"
                    >
                      Exit
                    </button>
                    <button
                      style={{
                        paddingLeft: "15px",
                        paddingRight: "15px",
                        paddingTop: "5px",
                        paddingBottom: "5px",
                        float: "right",
                        marginRight: "30px",
                        marginBottom: "30px",
                        borderStyle: "none",
                        borderRadius: "5px",
                        color: "white",
                        backgroundColor: "#429ef5",
                        fontSize: "13pt",
                      }}
                      className="Button"
                      onClick={() => {
                        window.location.href = "/creation/tripSubmission";
                      }}
                    >
                      Submit Trip
                    </button>
                  </span>
                </div>
              </div>
              <div align="left" className="tab-comp">
                <Tabs>
                  <div
                    className="tab-content"
                    label="Trip Plan"
                    marker={faPlane}
                  >
                    <Provider store={store}>
                      <VisibleTodoList />
                    </Provider>
                  </div>
                  <div
                    className="tab-content"
                    label="Events"
                    marker={faMapMarkerAlt}
                  >
                    {this.renderNearbyPlaces()}
                  </div>
                  <div
                    className="tab-content"
                    label="Food"
                    marker={faHamburger}
                  >
                    {this.renderRestaurants()}
                  </div>
                  <div className="tab-content" label="Views" marker={faImages}>
                    {this.renderViews()}
                  </div>
                  <div
                    className="tab-content"
                    label="COVID Quick Look"
                    marker={faInfoCircle}
                  >
                    <CovidChart />
                    <div style={{ marginTop: "30px" }}>
                      <USTable />
                    </div>
                  </div>
                </Tabs>
              </div>
            </div>
            <div className="column-right">
              <div className="map-container">
                <input
                  style={{ marginTop: "15px", marginRight: "10px" }}
                  role="search"
                  type="text"
                  value={this.state.value}
                  onChange={this.handleValueChange}
                  id="search-input"
                  className="search-input-bar"
                ></input>
                <span>
                  <Provider store={store}>
                    <AddTodo
                      imageURL={this.state.list_image}
                      place={this.state.place}
                    />
                  </Provider>
                </span>
                <ul className="locations-list"></ul>
                <div role="application" className="map-creation" ref="map">
                  loading map...
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "",
})(Creation);

connect()(AddTodo);
