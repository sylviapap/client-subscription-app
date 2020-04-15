import React from 'react';
import NavBar from '../components/NavBar'
import SubsForm from '../components/SubsForm'

class AppContainer extends React.Component {

    state = {
        company: "",
        cost: 0
      }

    handleSubscriptionSubmit = event => {
        event.preventDefault()
        
        fetch("http://localhost:3001/api/v1/subscriptions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            company: this.state.company,
            cost: this.state.cost
          })
        })
        .then((response) => response.json())
        .then((data) => {
          console.log('Successful post');
        })
        .catch((error) => {
          console.error('Error while post');
        });
      }
    
      handleName = event => {
        event.preventDefault()
        this.setState({
            company: event.target.value
        })
      }
    
      handleCost = event => {
        event.preventDefault()
        this.setState({
            cost: event.target.value
        })
      } 
    
    render() {
    return (  
        <div className="ui container">
            <NavBar
                />
            <SubsForm handleSubmit={this.handleSubscriptionSubmit} handleName={this.handleName} handleCost={this.handleCost} />
        </div>
    )
}
}

export default AppContainer;