import React, { Component } from 'react'

export default class SubsPage extends Component {

    componentDidMount() {
        fetch("http://localhost:3001/api/v1/subscriptions")
        .then(res => res.json())
        .then(subs => renderSubs(subs))
    }

    renderSubs = (subs) => {
        
    }

    render() {
        return (
            <div>
                
            </div>
        )
    }
}
