import React, { Component } from "react";
import Navbar from "../components/Navbar/navbar";
import USTable from "../components/USTable/USTable";
import CovidChart from "../components/CovidChart/CovidChart";
import Footer from "../components/Footer/footer";
import MapContainer from "../components/MapContainer/MapContainer";
import "./home.css";
import "../components/CreationMap/creationmap.css";

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

class Home extends Component {
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
      map: null,
      bounds: null,
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

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

  onSubmit(e) {
    var search = document.getElementById("search-input").value;
    this.props.history.push("/learnmore?name=" + search);
  }

  render() {
    const { locations, newLocations } = this.state;
    return (
      <div>
        <div>
          <Navbar items={["active", "u", "u", "u", "u"]} />
        </div>
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
          <div className="search-section">
            <img
              src="https://images.pexels.com/photos/462024/pexels-photo-462024.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
              alt="image background"
              width="100%"
              height="650px"
              style={{
                paddingTop: "30px",
                paddingBottom: "30px",
              }}
            />
            <div className="search-container">
              <h2 style={{ textAlign: "left", color: "black" }}>
                Find Your Next Trip
              </h2>

              <input
                href="#map_box"
                role="search"
                type="text"
                placeholder="Search..."
                value={this.state.value}
                onChange={this.handleChange}
                id="search-input"
                className="search-box"
              />
              <button onClick={this.onSubmit} className="find-button">
                Find
              </button>
            </div>
          </div>

          <div className="popular-place-section">
            <ul className="locations-list">
              <h3
                style={{
                  textAlign: "center",
                  color: "black",
                  backgroundColor: "#ededed",
                  color: "#2e2e2e",
                  padding: "7px",
                  width: "100%",
                  borderRadius: "5px",
                }}
              >
                Popular Places
              </h3>
              <div className="place-container">
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
          <div className="info-section">
            <div className="row">
              <div
                align="center"
                style={{ padding: "10px" }}
                className="column"
              >
                <div>
                  <div>
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

                    <div align="center">
                      <div align="center" className="travel-card">
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
                      <div align="center" className="travel-card">
                        <h4 style={{ color: "white" }}>Bus or train travel</h4>
                        Traveling on buses and trains for any length of time can
                        involve sitting or standing within 6 feet of others.
                      </div>
                      <div align="center" className="travel-card">
                        <h4 style={{ color: "white" }}>Car travel</h4>
                        Making stops along the way for gas, food, or bathroom
                        breaks can put you and your traveling companions in
                        close contact with other people and surfaces.
                      </div>
                      <div align="center" className="travel-card">
                        <h4 style={{ color: "white" }}>RV travel</h4>
                        You may have to stop less often for food or bathroom
                        breaks, but RV travel typically means staying at RV
                        parks overnight and getting gas and supplies at other
                        public places. These stops may put you and those with
                        you in the RV in close contact with others.
                      </div>
                    </div>
                    <span
                      style={{
                        color: "black",
                        fontWeight: "bold",
                      }}
                    >
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
                          fontSize: "7pt",
                        }}
                        href="https://www.cdc.gov/coronavirus/2019-ncov/travelers/travel-in-the-us.html"
                      >
                        https://www.cdc.gov/coronavirus/2019-ncov/travelers/travel-in-the-us.html
                      </a>
                    </span>
                  </div>
                </div>
              </div>
              <div
                align="center"
                style={{ padding: "10px" }}
                className="column"
              >
                <MapContainer points={this.state.locations} />
              </div>
            </div>
          </div>
          <div className="data-table-section">
            <CovidChart />
          </div>
          <div className="table-section">
            <USTable />
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

// apiKey: "AIzaSyCYqTOlIwQvYh30rp3riNLP137QWdTxzY4",

export default Home;
