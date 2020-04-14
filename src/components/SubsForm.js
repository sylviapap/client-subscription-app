import React, { Component } from 'react'

export default class SubsForm extends Component {

    

    render() {
        return (
            <div>
                <form onSubmit={this.props.handleSubmit}>
                    <label>
                        Name:
                        <input name="name" type="text" placeholder="Company Name"
                        onChange={(event)=>this.props.handleName(event)}/>
                    </label>
                    <br />
                    <label>
                        Cost:
                        <input name="cost" type="number" placeholder="0"
                        onChange={event=>this.props.handleCost(event)}/>
                    </label>
                    <br/>
                    <input name="submit" value="Enter Sub" type="submit"/>
                </form>
            </div>
        )
    }
}
