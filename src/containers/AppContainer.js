import React from 'react';
import SubsForm from '../components/SubsForm'
import SubsList from './SubsList'
import YourSubs from './YourSubs'

const subsURL = "http://localhost:3001/api/v1/subscriptions"
const usersURL = "http://localhost:3001/api/v1/users"
const userSubsURL = "http://localhost:3001/api/v1/user_subscriptions"
const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }

class AppContainer extends React.Component {

    state = {
        fields: {
            company: "",
            cost: 0
        },
        subscriptions: [],
        yourSubscriptions: [],
      }

    componentDidMount() {
        fetch(subsURL)
        .then(resp => resp.json())
        // .then(resp => console.log(resp))
        .then(subData => this.setState({subscriptions: subData}))
    }

    // componentDidMount() {
    //     Promise.all([
    //     fetch(subsURL), 
    //     fetch(`${usersURL}/${this.props.currentUser.id}`)
    // ]).then((resp) => { return [resp[0].json(), resp[1].json()]})
    // .then((resp) => { return this.setState(
    //     {subscriptions: resp[0], yourSubscriptions: resp[1].subscriptions})
    //     })
    // }

    // componentDidMount() {
    //     debugger
    //     fetch(`${usersURL}/${this.props.currentUser.id}`)
    //     .then(resp => resp.json())
    //     .then(userData => this.setState({yourSubscriptions: userData.subscriptions}))
    //     console.log(this.state)
    // }

    addToList = (sub) => {
        console.log(sub)
        fetch(userSubsURL, {
            method: "POST",
            headers: headers,
            body: JSON.stringify({
              user_id: this.props.currentUser.id,
              subscription_id: sub.id
            })
          })
          .then((response) => response.json())
        if (!this.state.yourSubscriptions.includes(sub)) {
          this.setState(prevState => (
            {yourSubscriptions: [...prevState.yourSubscriptions, sub]}))
        }
      }
    
    removeFromList = (sub) => {
        const newSubs = this.state.yourSubscriptions.filter(b => b !== sub)
        this.setState({yourSubscriptions: newSubs})
      }
    
    // deleteSub = (sub) => {
    //     fetch(`${subsURL}/${sub.id}`, {
    //       method: 'DELETE'
    //     })
    //     const afterDelete = this.state.subscriptions.filter(b => b !== sub)
    //     this.setState({subscriptions: afterDelete})      }
        
    handleSubscriptionSubmit = event => {
        event.preventDefault()
        fetch(subsURL, {
          method: "POST",
          headers: headers,
          body: JSON.stringify({
            company: this.state.fields.company,
            cost: this.state.fields.cost
          })
        })
        .then((response) => response.json())
        .then((data) => this.setState(prevState => ({subscriptions: [...prevState.subscriptions, data]})))
        .catch((error) => {
          console.error('Error while post');
        });
        const resetFields = { company: "",
        cost: 0 };
        this.setState({ fields: resetFields });
        event.target.reset();
      }

    handleChange = (e) => {
        const newFields = { ...this.state.fields, [e.target.name]: e.target.value };
        this.setState({ fields: newFields });
      };
    
    render() {
        const {subscriptions, yourSubscriptions} = this.state
        const {handleSubscriptionSubmit, handleChange, addToList, removeFromList} = this
    return (  
        <div className="ui container">
            <SubsForm handleSubmit={handleSubscriptionSubmit} handleChange={handleChange} />

            <SubsList subscriptions={subscriptions} handleClick={addToList} 
            />

            <YourSubs subscriptions={yourSubscriptions} handleClick={removeFromList} 
            />
        </div>
    )
}
}

export default AppContainer;