import React from "react";

const UserSubCard = props => {
  const {handleClick, handleEditClick} = props
  const {company, cost} = props.sub.subscription
  return (
    <div className="ui column">
      <div className="ui card">
        <div className="content">
          <div className="header">
          {company}
          </div>
        </div>
        <div className="extra content">
        <p>${cost}</p>
        <p>Start:{props.sub.start_date}</p>
        <p>End:{props.sub.end_date}</p>
        <p><button
          className="ui icon button red"
          onClick={() => handleClick(props.sub)
          }>
            Remove
            <i className="trash icon"></i>
          </button></p>
          <p><button
          className="ui icon button blue"
          onClick={() => handleEditClick(props.sub)}>
            Start Now
            <i className="calendar alternate outline icon"></i>
          </button></p>
        </div>
      </div>
    </div>
  );
};

export default UserSubCard;