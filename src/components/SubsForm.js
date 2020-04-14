import React, { Component } from 'react'

export default class SubsForm extends Component {

    

    render() {
        return (
            <div className="ui form">
                <form onSubmit={this.props.handleSubmit}>
                    <div className="ui field">
                    <label>
                        Name:
                        <input name="name" type="text" placeholder="Company Name"
                        onChange={(event)=>this.props.handleName(event)}/>
                    </label>
                    </div>
                    <div className="ui field">
                    <label>
                        Cost:
                        <input name="cost" type="number" placeholder="0"
                        onChange={event=>this.props.handleCost(event)}/>
                    </label>
                    </div>
                    <input name="submit" value="Enter Sub" type="submit" className="ui basic purple button" />
                </form>
            </div>
        )
    }
}
