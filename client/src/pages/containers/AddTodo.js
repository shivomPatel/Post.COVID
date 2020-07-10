import React from "react";
import { connect } from "react-redux";
import { addTodo } from "../actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import "./styles/addPlace.css";

const AddTodo = ({ imageURL, place, dispatch }) => {
  if (place !== undefined) {
    return (
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            dispatch(addTodo(place.name, imageURL));
            // input.value = "";
          }}
        >
          {/* <input
            role="search"
            type="text"
            value={place.name}
            id="search-input"
            className="add-input"
            placeholder="Add to Plan"
            ref={(node) => (input = node)}
          /> */}
          <span
            style={{
              width: "300px",
              marginLeft: "10px",
              color: "black",
              backgroundColor: "white",
              paddingLeft: "50px",
              paddingRight: "50px",
              paddingTop: "5px",
              paddingBottom: "5px",
              borderRadius: "3px",
              border: "1px solid black",
            }}
          >
            {place.name}
          </span>
          <button className="add-button" type="submit">
            <span>
              <FontAwesomeIcon
                className="plus-icon icon-position"
                icon={faPlusCircle}
              ></FontAwesomeIcon>
            </span>
            Add Place
          </button>
        </form>
      </div>
    );
  }

  return null;
};

export default connect()(AddTodo);
