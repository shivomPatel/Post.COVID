import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGlobeAmericas,
  faMarker,
  faList,
  faSuitcaseRolling,
  faHSquare,
} from "@fortawesome/free-solid-svg-icons";
import "./navbar.css";

function Navbar({ items }) {
  return (
    <div>
      <link
        href="https://fonts.googleapis.com/css?family=Lato:100"
        rel="stylesheet"
        type="text/css"
      ></link>
      <nav className="navbar navbar-dark">
        <ul className="navbar-line">
          <li className="list-item">
            <h1 className="logo">
              <FontAwesomeIcon className="logo-icon" icon={faGlobeAmericas} />{" "}
              Post.COVID
            </h1>
          </li>
          <li className="list-item">
            <a className={items[0]} href="/">
              <FontAwesomeIcon className="ic" icon={faHSquare} />
              Home
            </a>
          </li>
          <li className="list-item">
            <a className={items[1]} href="/TripBuilder">
              <FontAwesomeIcon className="ic" icon={faSuitcaseRolling} />
              Trip Builder
            </a>
          </li>
          <li className="list-item">
            <a className={items[3]} href="/Events">
              <FontAwesomeIcon className="ic" icon={faList} />
              Events
            </a>
          </li>
          <li className="list-item">
            <a className={items[2]} href="/Review">
              <FontAwesomeIcon className="ic" icon={faMarker} />
              Write Review
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
