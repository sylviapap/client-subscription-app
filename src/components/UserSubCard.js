import React from "react";

const UserSubCard = props => {
  const {handleClick} = props
  return (
    <div className="ui column">
      <div
        className="ui card"
      >
        <div className="content">
          <div className="header">
            <p>{props.sub.id}</p>
          </div>
        </div>
          <p>
            <button
            className="ui icon basic button red"
            onClick={() => handleClick(props.sub)
            }
            >Remove<i className="trash icon"></i></button>
            </p>
        </div>
      </div>
  );
};

export default UserSubCard;