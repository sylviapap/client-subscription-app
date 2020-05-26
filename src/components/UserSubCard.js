import React from "react";

const UserSubCard = props => {
  const {handleClick} = props
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
        <p><i className="money bill alternate outline icon teal"></i>${cost}</p>
        <p>Starts: {props.sub.start_date.replace("T00:00:00.000Z","")}</p>
        <p>Ends: {props.sub.end_date.replace("T00:00:00.000Z","")}</p>
        <p><button
          className="ui icon button basic gray"
          onClick={() => handleClick(props.sub)
          }>
            Remove
            <i className="trash icon"></i>
          </button></p>
        </div>
      </div>
    </div>
  );
};

export default UserSubCard;