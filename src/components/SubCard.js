import React from "react";

const SubCard = props => {
  const { company, cost } = props.sub
  return (
    <div className="ui column">
      <div className="ui card">
        <div className="content">
          <div className="header">
            {company}
          </div>
        </div>
        <div className="extra content">
          <p>
          <i className="money bill alternate outline icon teal"></i>
            ${cost}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SubCard;