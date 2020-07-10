import React, { Component } from "react";
import "./preloader.css";

class Preloader extends Component {
  render() {
    return (
      <html>
        <head>
          <meta></meta>
          <link></link>
        </head>
        <body>
          <div class="preload">
            <div class="preload-logo">
              <div class="box bounce-5">
                <h1>Voyage</h1>
              </div>
            </div>
            <div className="loader-frame">
              <div className="loader1"></div>
            </div>
          </div>
        </body>
      </html>
    );
  }
}

export default Preloader;
