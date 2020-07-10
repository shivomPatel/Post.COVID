import React, { Component } from "react";
import { GoogleApiWrapper } from "google-maps-react";
import ReactDOM from "react-dom";
import Navbar from "../components/Navbar/navbar";
import USTable from "../components/USTable/USTable";
import CovidChart from "../components/CovidChart/CovidChart";
import Footer from "../components/Footer/footer";
import "./main.css";
import "../components/Map/map.css";

const places = [
  {
    place: "Cancun",
    imageuURL:
      "https://cdn.travelpulse.com/images/99999999-9999-9999-9999-999999999999/42c9d71d-0a9d-c6a3-bf2d-e485fa153bb8/630x355.jpg",
    description:
      "Located on the Caribbean coast of southeastern Mexico, Cancun is one of the world's most beautiful beach destinations. Sunbathe on the white sandy beaches, scuba dive, then head into the city for dining, shopping, and nightlife.",
  },
  {
    place: "Costa Rica",
    imageuURL:
      "https://www.roughguides.com/wp-content/uploads/2016/10/arenal-volcano-costa-rica-shutterstock_1337924888.jpg",
    description:
      "This beautiful country, filled with rainforests, beaches, river valleys, and biodiverse wildlife as well as restaurants, bars, and luxe hotels, has always been a great place to take a vacation, but it has gained popularity as an amazing destination in the last few years.",
  },
  {
    place: "Hawaii",
    imageuURL:
      "https://cvsite-prod-s3fs-files.s3-us-west-2.amazonaws.com/s3fs-public/main-hawaii-pool_0.jpg",
    description:
      "The warm water, the plentiful reefs, fish, turtles, whales, and barracuda make the beautiful Hawaii islands a great place to spend a lot of time in the water. With all the different things Hawaii has to offer, it surely ranks as the most beautiful place on Earth.",
  },
  {
    place: "Colorado",
    imageuURL:
      "https://bloximages.newyork1.vip.townnews.com/gazette.com/content/tncms/assets/v3/editorial/c/80/c80a1664-6edf-11ea-9520-c39ef2ffd2b0/5e7bcd891eebb.image.jpg?resize=1200%2C800",
    description:
      "Colorado is the ideal winter destination with unparalleled skiing, snowboarding, snowshoeing, ice-skating, snow tubing, snowmobiling, sleigh rides, events and festivals, and a rich cultural heritage.",
  },
  {
    place: "Dominican Republic",
    imageuURL:
      "https://i.insider.com/5d02597edaa4822f7e0a2216?width=1100&format=jpeg&auto=webp",
    description:
      "Dominican Republic is ensconced as the Caribbean’s most visited destination. It’s not hard to see why; a seemingly endless spread of white-sandy beaches and palm trees play host to a similarly sizeable range of holiday resorts.",
  },
  {
    place: "Alaska",
    imageuURL:
      "https://lindaontherun.com/wp-content/uploads/2019/09/Alaska9-Denali.jpg",
    description:
      "It is rugged and wild with glaciers, countless rivers and lakes, majestic mountain peaks, some active volcanoes, and nearly 34,000 miles of tidal shoreline.",
  },
  {
    place: "New Zealand",
    imageuURL:
      "https://www.newzealand.com/assets/Tourism-NZ/Fiordland/img-1536137761-110-7749-p-7ECF7092-95BD-FE18-6D4107E2E42D067E-2544003__aWxvdmVrZWxseQo_FocalPointCropWzQyNyw2NDAsNTAsNTAsODUsImpwZyIsNjUsMi41XQ.jpg",
    description:
      "New Zealand is famous the world over for its incredible scenery, ranging from sweeping mountains to vast underground cave systems, gigantic glaciers to boiling hot springs, golden-sand beaches to rugged coastline. It's also packed with cool cities, hidden spots, wonderful wildlife, and more.",
  },
  {
    place: "Santorini",
    imageuURL:
      "https://lp-cms-production.imgix.net/features/2016/04/Santorini-53c9e0dca77b.jpg?format=auto",
    description:
      "Santorini is the most popular island in Greece. It may be the most popular island in the world. There are few travel destinations that combine beautiful beaches, spectacular scenery, ancient cities, amazing restaurants, some of the world's best wine, and an active volcano.",
  },
];

let visible = false;

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      data: [],
      newLocations: [],
      locations: [
        {
          name: "Atlanta",
          location: { lat: 33.774483, lng: -84.382849 },
          imageuURL: "https://media.timeout.com/images/105239116/image.jpg",
        },
        {
          name: "Belize",
          location: { lat: 17.490481, lng: -88.202213 },
          imageuURL:
            "https://travel.home.sndimg.com/content/dam/images/travel/fullset/2012/03/30/86/belize_ss_001.rend.hgtvcom.966.725.suffix/1491580716467.jpeg",
        },
        {
          name: "Cancun",
          location: { lat: 21.165197, lng: -86.827264 },
          imageuURL:
            "https://pix10.agoda.net/hotelImages/4881176/0/52e9ab95859cb8b5ab07b293ee096229.jpg?s=1024x768",
        },
        {
          name: "Cape Canaveral",
          location: { lat: 28.392157, lng: -80.596978 },
          imageuURL:
            "https://www.airforcemag.com/app/uploads/2020/02/022620-Canaveral-Range.jpg",
        },
        {
          name: "Costa Maya",
          location: { lat: 18.735196, lng: -87.691022 },
          imageuURL:
            "https://www.ncl.com/sites/default/files/Costa_Maya_Beach_shutterstock_740937703.jpg",
        },
        {
          name: "Cozumel",
          location: { lat: 20.508578, lng: -86.947737 },
          imageuURL:
            "https://s29745.pcdn.co/wp-content/uploads/2020/03/Things-To-Do-In-Cozumel-Mexico-1_.jpg.optimal.jpg",
        },
        {
          name: "Dallas",
          location: { lat: 32.838814, lng: -96.786518 },
          imageuURL:
            "https://d36tnp772eyphs.cloudfront.net/blogs/1/2011/05/Dallas-Texas-skyline-cityscape-destinations-1200x788.jpg",
        },
        {
          name: "Grand Turk",
          location: { lat: 21.428566, lng: -71.143985 },
          imageuURL:
            "https://cdn.britannica.com/21/183521-050-12B36705/Beach-Cockburn-Town-Grand-Turk-Caicos-Turks.jpg",
        },
        {
          name: "Jacksonville",
          location: { lat: 30.274438, lng: -81.388347 },
          imageuURL:
            "https://milecorp.com/wp-content/uploads/2016/07/milestone-jacksonville.jpg",
        },
        {
          name: "Miami",
          location: { lat: 25.774763, lng: -80.130467 },
          imageuURL:
            "https://whywander.com/wp-content/uploads/2017/05/miami-header-dg1015.jpg",
        },
        {
          name: "Nassau",
          location: { lat: 25.078643, lng: -77.338089 },
          imageuURL:
            "https://www.blackpast.org/wp-content/uploads/prodimages/files/Hilton_resort_and_waterfront_Nassau_Bahamas_2020.jpg",
        },
        {
          name: "New York",
          location: { lat: 40.736701, lng: -73.989334 },
          imageuURL:
            "https://cdn.contexttravel.com/image/upload/c_fill,q_60,w_2600/v1549321174/production/city/hero_image_12_1549321174.jpg",
        },

        {
          name: "Orlando",
          location: { lat: 28.546863, lng: -81.373917 },
          imageuURL:
            "https://i1.wp.com/movingtips.wpengine.com/wp-content/uploads/2019/03/orlando-florida.jpg?fit=1024%2C684&ssl=1",
        },
      ],
      markers: [],
      infowindow: new this.props.google.maps.InfoWindow(),
      map: null,
      bounds: null,

      columnDefs: [
        {
          headerName: "Make",
          field: "make",
        },
        {
          headerName: "Model",
          field: "model",
        },
        {
          headerName: "Price",
          field: "price",
        },
      ],
      rowData: [
        {
          make: "Toyota",
          model: "Celica",
          price: 35000,
        },
        {
          make: "Ford",
          model: "Mondeo",
          price: 32000,
        },
        {
          make: "Porsche",
          model: "Boxter",
          price: 72000,
        },
      ],
    };
  }

  updateName = (name) => {
    this.setState({
      name: name,
    });
  };

  onclickMenu = () => {
    const list = document.getElementsByClassName("text-input");
    if (list.length === 0) {
      window.location.assign("/");
    } else {
      if (visible === true) {
        list[0].style.left = "-200px";
        list[0].style.transition = "left 1s ease-in-out";
        visible = false;
      } else {
        visible = true;
        list[0].style.left = "0";
        list[0].style.transition = "left 1s ease-in-out";
      }
    }
  };

  renderPlaces() {
    var placeCards = [];
    for (var i = 0; i < places.length; i++) {
      placeCards.push(
        <div key={i} align="left" className="card">
          <header className="article-header">
            <a href={"/learnmore?name=" + places[i].place}>
              <div className="article-title">{places[i].place}</div>
            </a>
            <div>
              <div>
                <span className="info">Info: </span>
                <p> {places[i].description}</p>
              </div>
            </div>
            <div>
              <img
                className="images"
                src={places[i].imageuURL}
                width="375"
                height="230"
                alt=""
              />
            </div>
          </header>
        </div>
      );
    }
    return placeCards;
  }

  componentDidMount() {
    localStorage.clear();
    this.loadMap();
    this.onclickLocation();
  }

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

      autocomplete.addListener("place_changed", function () {
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
        if (e.target && e.target.nodeName === "DIV") {
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
      icon: "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
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

    console.log(newmarker);

    this.state.map.fitBounds(bounds);
    this.props.history.push("learnmore?name=" + newmarker.title);
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

  populateInfoWindow = (marker, infowindow) => {
    if (infowindow.marker !== marker) {
      marker.setAnimation(window.google.maps.Animation.BOUNCE);
      infowindow.marker = marker;
      infowindow.setContent(
        `<h3 style="color:black;">${marker.title}</h3><a href='/learnmore?name=${marker.title}'>Learn more</a>`
      );
      infowindow.open(this.map, marker);
      infowindow.addListener("closeclick", function () {
        infowindow.marker = null;
        marker.setAnimation(null);
      });
    }
  };

  render() {
    const { locations, newLocations } = this.state;
    return (
      <div>
        <div className="bg">
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link
            rel="stylesheet"
            href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css"
          ></link>
          <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
          <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
          <link
            rel="stylesheet"
            href="//cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.1/css/bootstrap.min.css"
          />
          <link
            rel="stylesheet"
            href="/bower_components/bootstrap-horizon/bootstrap-horizon.css"
          ></link>
          <script src="https://kit.fontawesome.com/a076d05399.js"></script>
          <div>
            <Navbar items={["active", "u", "u", "u", "u"]} />
            <div>
              <img
                src="https://images.pexels.com/photos/462024/pexels-photo-462024.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                alt="image background"
                width="100%"
                height="650px"
                style={{
                  paddingLeft: "70px",
                  paddingRight: "70px",
                  paddingTop: "30px",
                  paddingBottom: "30px",
                }}
              />
              <div className="search-container">
                <h2 style={{ textAlign: "left", color: "black" }}>
                  Find Your Next Trip
                </h2>

                <span className="search-line">
                  <input
                    href="#map_box"
                    role="search"
                    type="text"
                    value={this.state.value}
                    onChange={this.handleValueChange}
                    id="search-input"
                    className="search-box"
                  />
                </span>
              </div>
            </div>

            <div className="map-section">
              <div className="popular-places-section">
                <ul className="locations-list">
                  <h3
                    style={{
                      textAlign: "center",
                      color: "black",
                      marginLeft: "8px",
                      backgroundColor: "#ededed",
                      color: "#2e2e2e",
                      padding: "7px",
                      width: "99%",
                      borderRadius: "5px",
                    }}
                  >
                    Popular Places
                  </h3>
                  <div className="places-container">
                    {locations.concat(newLocations).map((m, i) => (
                      <div key={i} align="center" className="flip-card">
                        <div className="flip-card-inner">
                          <div className="flip-card-front">
                            <img
                              src={m.imageuURL}
                              style={{
                                width: "280px",
                                height: "180px",
                              }}
                            />
                          </div>
                          <div className="flip-card-back">
                            <h3 style={{ paddingTop: "20px" }}> {m.name} </h3>
                            <p>
                              {" "}
                              <a
                                style={{
                                  fontSize: "12pt",
                                  textAlign: "center",
                                  color: "white",
                                  backgroundColor: "gold",
                                  paddingRight: "10px",
                                  paddingLeft: "10px",
                                  paddingBottom: "5px",
                                  paddingTop: "5px",
                                  borderRadius: "6px",
                                  marginTop: "10px",
                                }}
                                href={"/learnmore?name=" + m.name}
                              >
                                Learn More
                              </a>
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ul>
              </div>
              <div className="row-container">
                <div className="row">
                  <div
                    style={{
                      color: "black",
                      textAlign: "left",
                      paddingLeft: "60px",
                      paddingRight: "60px",
                    }}
                    className="column"
                  >
                    <h3 className="consideration-title">
                      Center of Disease Control Travel Considerations
                    </h3>
                    <p
                      style={{ textAlign: "center" }}
                      className="considerations-p"
                    >
                      "Travel increases your chances of getting and spreading
                      COVID-19. We don’t know if one type of travel is safer
                      than others; however, airports, bus stations, train
                      stations, and rest stops are all places travelers can be
                      exposed to the virus in the air and on surfaces. These are
                      also places where it can be hard to social distance (keep
                      6 feet apart from other people)."
                    </p>
                    <p className="consideration">
                      Consider the following risks for getting or spreading
                      COVID-19, depending on how you travel:
                    </p>

                    <div>
                      <div className="travel-card">
                        <h4 style={{ color: "white" }}>Air travel</h4>
                        Air travel requires spending time in security lines and
                        airport terminals, which can bring you in close contact
                        with other people and frequently touched surfaces. Most
                        viruses and other germs do not spread easily on flights
                        because of how air circulates and is filtered on
                        airplanes. However, social distancing is difficult on
                        crowded flights, and you may have to sit near others
                        (within 6 feet), sometimes for hours. This may increase
                        your risk for exposure to the virus that causes
                        COVID-19.
                      </div>
                      <div className="travel-card">
                        <h4 style={{ color: "white" }}>Bus or train travel</h4>
                        Traveling on buses and trains for any length of time can
                        involve sitting or standing within 6 feet of others.
                      </div>
                      <div className="travel-card">
                        <h4 style={{ color: "white" }}>Car travel</h4>
                        Making stops along the way for gas, food, or bathroom
                        breaks can put you and your traveling companions in
                        close contact with other people and surfaces.
                      </div>
                      <div className="travel-card">
                        <h4 style={{ color: "white" }}>RV travel</h4>
                        You may have to stop less often for food or bathroom
                        breaks, but RV travel typically means staying at RV
                        parks overnight and getting gas and supplies at other
                        public places. These stops may put you and those with
                        you in the RV in close contact with others.
                      </div>
                    </div>
                    <span style={{ color: "black", fontWeight: "bold" }}>
                      Source:
                      <a
                        style={{
                          color: "white",
                          backgroundColor: "gold",
                          borderRadius: "10px",
                          paddingLeft: "20px",
                          paddingRight: "20px",
                          paddingTop: "2px",
                          paddingBottom: "2px",
                          marginLeft: "10px",
                          marginBottom: "30px",
                        }}
                        href="https://www.cdc.gov/coronavirus/2019-ncov/travelers/travel-in-the-us.html"
                      >
                        https://www.cdc.gov/coronavirus/2019-ncov/travelers/travel-in-the-us.html
                      </a>
                    </span>
                  </div>
                  <div className="column">
                    <div id="map_box" className="map-container-box">
                      <div role="application" className="map" ref="map">
                        loading...
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* ======================== Data ========================================= */}
            <div className="us-data-section">
              <div className="table-container">
                <USTable />
              </div>
            </div>

            <div style={{ height: "40px" }}></div>

            <div className="global-data-section">
              <div align="center" className="table-container global-data-box">
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
                  COVID-19 Global Information Guide
                </h3>
                <CovidChart />
              </div>
            </div>
            <div className="bottom-spacer"></div>
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}

// export default Main;
export default GoogleApiWrapper({
  apiKey: "",
})(Main);
