import React, { Component } from "react";
import "./footer.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faShareAltSquare,
} from "@fortawesome/free-solid-svg-icons";

export class Footer extends Component {
  render() {
    return (
      <footer className="page-footer font-small blue pt-4">
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        ></link>
        <div className="container-fluid text-center text-md-left">
          <div className="row-footer">
            <div className="col-md-4 mt-md-0 mt-2">
              <h5 className="text-uppercase">ABOUT</h5>
              <p style={{ color: "white" }} className="about">
                During this pandemic, we are slowly reaching the conclusion that
                this world will not be what is used to be. Understanding where
                we can go and what activities and endeavors we can partake in
                will become a new challenge. Post.COVID offers a solution by
                providing information and services to better understand what you
                can do beyond your home given the circumstances the COVID-19
                pandemic has created.
              </p>
            </div>

            <div className="col-md-4 mb-md-0 mb-2">
              <h5 className="text-uppercase">Links</h5>

              <ul className="list-unstyled">
                <li>
                  <i className="fa fa-github"></i>
                  {"    "}
                  <a
                    style={{ color: "white" }}
                    href="https://github.com/shivomPatel"
                  >
                    https://github.com/shivomPatel
                  </a>
                </li>
                <li style={{ color: "white", fontWeight: "bolder" }}>
                  LinkedIn:{" "}
                  <a
                    style={{ color: "white", fontWeight: "lighter" }}
                    href="www.linkedin.com/in/shivom-patel-569a36173"
                  >
                    www.linkedin.com/in/shivom-patel-569a36173
                  </a>
                </li>
              </ul>
            </div>

            <div className="col-md-4 mb-md-0 mb-2">
              <h5 className="text-uppercase">CONTACTS</h5>

              <ul className="list-unstyled">
                <li style={{ color: "white" }}>
                  <FontAwesomeIcon className="footer-icon" icon={faEnvelope} />
                  patelshivom0918@gmail.com
                </li>
                <li style={{ color: "white" }}>
                  <FontAwesomeIcon
                    className="footer-icon"
                    icon={faShareAltSquare}
                  />
                  Instagram: hd.shivompatel
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-copyright text-center py-3"> </div>
      </footer>
    );
  }
}

export default Footer;
