import React, { Component } from "react";
import "./learnmore.css";
import Navbar from "../components/Navbar/navbar";
import Footer from "../components/Footer/footer";

let unsplashStyle = {
  display: "-ms-flexbox",
  flexDirection: "column",
  alignItems: "center",
  width: "90%",
  margin: "auto",
};

let itemWidth = "50%";

if (window.screen.width > 1024) {
  itemWidth = "80%";
}

class LearnMore extends Component {
  state = {
    imgs: [],
    articles: [],
    place: null,
  };

  componentDidMount() {
    const query = window.location.search.split("=")[1];
    var _place = query.replace(/%20/g, " ");

    this.setState({
      place: _place,
    });
    // unsplash API/Access key (may or may not be used): wgDscHe3K0f4aePI2sk19ypxziteaGHWJISitjiB-aY
    fetch(`https://api.unsplash.com/search/photos?page=1&query=${query}`, {
      headers: {
        Authorization:
          "Client-ID ed4ea3b388f4503fa9a5817e2e5250171fd92b3b61ff520ff9f6027cff251a67",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({
          imgs: data.results,
        });
      })
      .catch((err) => {
        console.log("Error happened during fetching!", err);
      });

    // nytimes article search api key: GGGMmo1tyZ4eWkfFiySqjULVMbcMKJMX
    fetch(
      `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${query}&api-key=GGGMmo1tyZ4eWkfFiySqjULVMbcMKJMX`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.addArticle(data);
      });
  }

  addArticle = (data) => {
    const articles = [];
    data.response.docs.map((article) => {
      articles.push(
        <li
          style={{ listStyle: "none", width: itemWidth, margin: "20px auto" }}
          key={article._id}
        >
          <h2>
            <a style={{ color: "black" }} href={article.web_url}>
              {article.snippet}
            </a>
          </h2>
        </li>
      );
    });
    this.setState({
      articles: articles,
    });
  };

  renderImages() {
    let arr = [];
    for (var i = 0; i < this.state.imgs.length; i++) {
      let image = this.state.imgs[i];
      arr.push(
        <img
          className="image"
          style={{ margin: "12px", width: itemWidth }}
          src={image.urls.regular}
          key={image.id}
          alt="images of the chosen place"
        />
      );
    }
    return arr;
  }

  render() {
    if (this.state.imgs.articles === 0) {
      return <button>Learnmore</button>;
    } else {
      return (
        <div>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link
            rel="stylesheet"
            href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css"
          ></link>
          <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
          <script src="https://kit.fontawesome.com/a076d05399.js"></script>
          <Navbar items={["u", "u", "u", "u"]}></Navbar>
          <div style={unsplashStyle}>
            <h2 className="place-title">{this.state.place}</h2>
            {this.renderImages()}

            <div align="left">
              <h2 className="article-section">Articles</h2>
            </div>

            <div>
              <ul className="articles">{this.state.articles}</ul>
            </div>
          </div>
          <Footer />
        </div>
      );
    }
  }
}

export default LearnMore;
