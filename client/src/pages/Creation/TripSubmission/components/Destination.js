import React, { Component } from "react";
import DatePicker from "react-datepicker";
import Modal from "react-modal";

import "react-datepicker/dist/react-datepicker.css";
import "./styles/destination.css";

Modal.defaultStyles.overlay.backgroundColor = "rgba(94, 94, 94, 0.65)";
Modal.defaultStyles.content.width = "50%";
Modal.defaultStyles.content.height = "80%";
Modal.defaultStyles.content.color = "black";
Modal.defaultStyles.content.top = "10%";
Modal.defaultStyles.content.left = "25%";

class Destination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: this.props.item,
      showModal: false,
      date: undefined,
      time: undefined,
      description: undefined,
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  componentDidMount() {
    localStorage.setItem(
      this.props.id,
      JSON.stringify({
        date: undefined,
        time: undefined,
        description: undefined,
      })
    );
  }

  onChange = (time) => this.setState({ time });

  handleOpenModal() {
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  handleChange = (date) => {
    this.setState({
      date: date,
    });
  };

  handleSave = () => {
    var date = document.getElementById("date").value;
    var time = document.getElementById("appt").value;
    var description = document.getElementById("description").value;
    var newDate = new Date(date.toString());

    this.setState({
      date: newDate,
      time: time,
      description: description === undefined ? "None" : description,
    });
    this.handleCloseModal();

    var obj = {
      date: date,
      time: time,
      description: description,
    };

    localStorage.setItem(this.props.id, JSON.stringify(obj));
  };

  render() {
    const { item } = this.state;
    return (
      <div>
        <div
          align="left"
          style={{
            height: "200px",
            width: "100%",
            color: "black",
            padding: "0",
          }}
        >
          <h4
            style={{
              textAlign: "center",
              color: "white",
              fontWeight: "lighter",
              backgroundColor: "#ff5792",
              borderBottom: "4px solid #ba005a",
              borderRadius: "3px",
              paddingLeft: "15px",
              paddingRight: "15px",
              paddingTop: "5px",
              paddingBottom: "5px",
              width: "100%",
            }}
          >
            {item.text}
          </h4>
        </div>
        <div
          style={{
            marginTop: "-150px",
            position: "relative",
          }}
          className="row"
        >
          <div
            style={{
              margin: "0",
              width: "50%",
              height: "fit-content",
              position: "relative",
              overflow: "hidden",
            }}
            className="column"
          >
            <div>
              <img
                style={{
                  verticalAlign: "center",
                  border: "3px solid #ff007b",
                  padding: "5px",
                }}
                align="left"
                src={item.url}
                alt={item.text}
                width="auto"
                height="auto"
              />
            </div>
          </div>
          <div
            style={{
              width: "50%",
              height: "100%",
              borderLeft: "1px solid #e3e3e3",
            }}
            className="column"
          >
            <div
              align="left"
              style={{
                marginTop: "5px",
                backgroundColor: "#fffafb",
                height: "40vh",
                padding: "20px",
                overflow: "scroll",
              }}
            >
              <h3
                style={{
                  textAlign: "center",
                  fontWeight: "lighter",
                  color: "black",
                  marginBottom: "30px",
                }}
              >
                Destination Details
              </h3>
              <h5
                style={{
                  borderRadius: "3px",
                  textAlign: "center",
                  fontWeight: "lighter",
                  color: "white",
                  backgroundColor: "black",
                  width: "100%",
                  paddingLeft: "20px",
                  paddingRight: "20px",
                  paddingTop: "5px",
                  paddingBottom: "5px",
                  marginBottom: "30px",
                }}
              >
                {item.text}
              </h5>

              <ul style={{ listStyle: "none" }}>
                <li>
                  <strong style={{ fontFamily: "Helvetica", color: "black" }}>
                    Date:{" "}
                  </strong>{" "}
                  {this.state.date === undefined
                    ? "None"
                    : this.state.date.toLocaleDateString()}{" "}
                </li>
                <li>
                  <strong style={{ fontFamily: "Helvetica", color: "black" }}>
                    Time:{" "}
                  </strong>{" "}
                  {this.state.time === undefined ? "None" : this.state.time}{" "}
                </li>
                <li>
                  <strong style={{ fontFamily: "Helvetica", color: "black" }}>
                    Description:{" "}
                  </strong>{" "}
                  <div style={{ padding: "5px", color: "black" }}>
                    {this.state.description === undefined
                      ? "None"
                      : this.state.description}{" "}
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div align="right">
          <button
            style={{
              paddingLeft: "25px",
              paddingRight: "25px",
              paddingTop: "7px",
              paddingBottom: "7px",
              fontSize: "12pt",
              color: "white",
              backgroundColor: "#ff5792",
              borderStyle: "none",
              borderRadius: "3px",
              borderBottom: "4px solid #054573",
              marginRight: "7px",
            }}
            onClick={this.handleOpenModal}
          >
            Edit Details
          </button>

          <Modal ariaHideApp={false} isOpen={this.state.showModal}>
            <button
              style={{
                fontSize: "20pt",
                borderStyle: "none",
                color: "black",
              }}
              onClick={this.handleCloseModal}
            >
              &times;
            </button>
            <h2
              style={{
                textAlign: "center",
                fontWeight: "lighter",
                color: "black",
              }}
            >
              {item.text}
            </h2>
            <div
              style={{
                padding: "50px",
                backgroundColor: "#fffafb",
                height: "60vh",
                overflow: "scroll",
              }}
            >
              <ul
                style={{
                  listStyle: "none",
                  fontFamily: "Helvetica",
                }}
              >
                <li style={{ marginBottom: "30px" }}>
                  <strong style={{ color: "black" }}>Date: </strong>
                  <DatePicker
                    id="date"
                    selected={this.state.date}
                    onChange={this.handleChange}
                  />
                </li>

                <li style={{ marginBottom: "30px" }}>
                  <strong style={{ color: "black" }}>Time: </strong>
                  <input
                    style={{
                      color: "black",
                      fontSize: "12pt",
                      padding: "8px",
                      width: "100%",
                      borderStyle: "none",
                      borderRadius: "5px",
                      border: "1px solid #d7d9d7",
                    }}
                    type="time"
                    id="appt"
                    name="appt"
                    defaultValue={this.state.time}
                  />
                </li>
                <li>
                  <strong style={{ color: "black", marginRight: "50px" }}>
                    Description:{" "}
                  </strong>{" "}
                  <textarea
                    id="description"
                    style={{
                      width: "100%",
                      height: "15vh",
                      padding: "10px",
                      color: "black",
                      fontSize: "12pt",
                      borderStyle: "none",
                      borderRadius: "5px",
                      border: "1px solid #d7d9d7",
                    }}
                    defaultValue={this.state.description}
                  />
                </li>
              </ul>
              <button
                style={{
                  paddingLeft: "25px",
                  paddingRight: "25px",
                  paddingTop: "7px",
                  paddingBottom: "7px",
                  fontSize: "12pt",
                  color: "white",
                  backgroundColor: "#0086e6",
                  borderStyle: "none",
                  borderRadius: "3px",
                  borderBottom: "4px solid #054573",
                }}
                onClick={this.handleSave}
              >
                Save
              </button>
            </div>
          </Modal>
        </div>

        <hr style={{ marginTop: "10px", marginBottom: "50px" }} />
      </div>
    );
  }
}

export default Destination;
