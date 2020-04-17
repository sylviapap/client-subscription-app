import React from "react";

const SubCard = props => {
  const { company, cost } = props.sub
  const {handleClick} = props
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
          <i className="money bill alternate outline icon"></i>
            ${cost}
          </p>
          <p>
            <button
            className="ui icon button teal"
            onClick={() => handleClick(props.sub)}
            >Add<i className="plus icon"></i></button>
            </p>
        </div>
      </div>
    </div>
  );
};

export default SubCard;