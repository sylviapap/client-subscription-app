import React, { Component } from 'react'

const SubsForm = props =>  {
    const { handleSubmit, handleName, handleCost } = props;
    return (
        <div className="ui form">
            <form onSubmit={handleSubmit}>
                <div className="ui field">
                <label>
                    Name:
                    <input name="name" type="text" placeholder="Company Name"
                    onChange={handleName}/>
                </label>
                </div>
                <div className="ui field">
                <label>
                    Cost:
                    <input name="cost" type="number" placeholder="0"
                    onChange={handleCost}/>
                </label>
                </div>
                <input name="submit" value="Enter Sub" type="submit" className="ui basic purple button" />
            </form>
        </div>
    )
}

export default SubsForm