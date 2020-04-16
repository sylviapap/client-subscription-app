import React from "react";

const YourSubCard = props => {
  console.log(props.key)
  const {company, cost } = props.subscription
  const {handleClick} = props
  return (
    <div className="ui column">
      <div
        className="ui card"
      >
        <div className="content">
          <div className="header">
            <p>{company}</p>
          </div>
        </div>
        <div className="extra content">
          <p>
          <i className="money bill alternate outline icon"></i>
            {cost}
          </p>
          <p>
            <button
            className="ui icon basic button red"
            onClick={() => handleClick(props.subscription)
            }
            >Remove<i className="trash icon"></i></button>
            </p>
        </div>
      </div>
    </div>
  );
};

export default YourSubCard;