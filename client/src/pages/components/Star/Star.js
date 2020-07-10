import React, { Component } from "react";
import "./star.css";

class Star extends Component {
  render() {
    return (
      <svg
        height="25"
        width="23"
        data-rating={this.props.rating}
        onClick={this.props.onClick}
        data-active={this.props.isActive}
      >
        <polygon
          className={this.props.state}
          points="9.9, 1.1, 3.3, 21.78, 19.8, 8.58, 0, 8.58, 16.5, 21.78"
        />
      </svg>
    );
  }
}

export default Star;
