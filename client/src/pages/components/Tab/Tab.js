import React, { Component } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./tab.css";

class Tab extends Component {
  static propTypes = {
    activeTab: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
  };
  state = {
    marker: this.props.marker,
  };

  onClick = () => {
    const { label, onClick } = this.props;
    onClick(label);
  };

  render() {
    const {
      onClick,
      props: { activeTab, label },
    } = this;

    let className = "tab-list-item";

    if (activeTab === label) {
      className += " tab-list-active";
    }

    if (label === "COVID Quick Look") {
      return (
        <li
          style={{
            backgroundColor: "#ff3333",
            color: "white",
            marginBottom: "10px",
          }}
          className={className}
          onClick={onClick}
        >
          <span className="tab-icon-span">
            <FontAwesomeIcon className="tab-icon" icon={this.state.marker} />
          </span>
          {label}
        </li>
      );
    }

    return (
      <li className={className} onClick={onClick}>
        <span className="tab-icon-span">
          <FontAwesomeIcon className="tab-icon" icon={this.state.marker} />
        </span>
        {label}
      </li>
    );
  }
}

export default Tab;
