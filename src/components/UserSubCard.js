import React from "react";

const UserSubCard = props => {
  const {handleClick, handleEditClick} = props
  return (
    <div className="ui column">
      <div
        className="ui card"
      >
        <div className="content">
          <div className="header">
          <p>{props.sub.subscription.company}</p>
            <p>{props.sub.subscription.cost}</p>
            <p>{props.sub.id}</p>
          </div>
        </div>
          <p>
            <button
            className="ui icon basic button red"
            onClick={() => handleClick(props.sub)
            }
            >Remove<i className="trash icon"></i></button>
            <button
            className="ui icon basic button red"
            onClick={() => handleEditClick(props.sub)
            }
            >Update<i className="trash icon"></i></button>
            </p>
        </div>
      </div>
  );
};

export default UserSubCard;