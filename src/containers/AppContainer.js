import React from 'react';
import SubsForm from '../components/SubsForm'
import SubsList from './SubsList'
import UserSubs from './UserSubs'

const subscriptionsURL = "http://localhost:3001/api/v1/subscriptions"
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
            cost: 0,
            start_date: "",
            end_date: "",
            sub: ""
        },
        clicked: false,
        subscriptions: [],
        userSubscriptions: []
      }

    componentDidMount() {
      fetch(subscriptionsURL)
        .then(resp => resp.json())
        .then(subData => this.setState({subscriptions: subData}))
      this.setState({userSubscriptions: this.props.currentUser.user_subscriptions
      })
    }

    hideForm = () => {
      this.setState({
        clicked: !this.state.clicked
      })
    }

    addToList = (sub) => {
        fetch(userSubsURL, {
            method: "POST",
            headers: headers,
            body: JSON.stringify({
              user_id: this.props.currentUser.id,
              subscription_id: sub.id
            })
          })
          .then((response) => response.json())
          // .then(resp => console.log(resp))
          .then((data) => { if (!this.state.userSubscriptions.includes(data)) {
            return this.setState(prevState => ({
              userSubscriptions: [...prevState.userSubscriptions, data]}
            ))}
          })
      }

    editUserSub = (sub) => {
      fetch(`${userSubsURL}/${sub.id}`, {
        method: "PATCH",
        headers: headers,
        body: JSON.stringify({
          subscription_id: 35
        })
      })
      .then(response => response.json())
      .then(json => console.log(json))
    }
    
    removeFromList = (sub) => {
      console.log(sub, "delete this sub")
        const newSubs = this.state.userSubscriptions.filter(b => b !== sub)
        this.setState({userSubscriptions: newSubs})
        fetch(`${userSubsURL}/${sub.id}`, 
          {method: 'DELETE'})
      }

    newSubscription = event => {
      event.preventDefault();
      fetch(subscriptionsURL, {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
            company: this.state.fields.company,
            cost: this.state.fields.cost
        })
      })
      .then((response) => response.json())
      // .then(data => {console.log(data)})
      .then((data) => this.setState(prevState => ({subscriptions: [...prevState.subscriptions, data]})))
      const resetFields = { company: "",
      cost: 0 };
      this.setState({ fields: resetFields });
      event.target.reset();
    }
        
    handleSubscriptionSubmit = event => {
        event.preventDefault();
        console.log("sub form submitted")
        fetch(userSubsURL, {
          method: "POST",
          headers: headers,
          body: JSON.stringify({
            user_id: this.props.currentUser.id,
            start_date: this.state.fields.start_date,
            end_date: this.state.fields.end_date,
            subscription_id: this.state.fields.sub, 
          })
        })
        .then((response) => response.json())
        .then((data) => this.setState(prevState => ({userSubscriptions: [...prevState.userSubscriptions, data]})))
        .catch((error) => {
          console.error('Error while post');
        });
      }

    handleChange = (e) => {
        const newFields = { ...this.state.fields, [e.target.name]: e.target.value };
        this.setState({ fields: newFields });
      };
    
    render() {
      const {handleSubscriptionSubmit, handleChange, addToList, removeFromList, hideForm} = this
      const {userSubscriptions, subscriptions} = this.state
      // const {subscriptions} = this.props

      return (  
        <div className="ui container">            
            <SubsList subscriptions={subscriptions} handleClick={addToList} handleSubmit={this.newSubscription} handleChange={handleChange}
            />

            <h2 onClick={this.hideForm} className="formHeader">Click To Add To Your Subscription List</h2>
            {this.state.clicked ? (<SubsForm subs={subscriptions}hideForm={hideForm} 
            handleSubmit={handleSubscriptionSubmit} handleChange={handleChange} />)
            : null
            }

            <UserSubs subscriptions={userSubscriptions} handleClick={removeFromList} handleEditClick={this.editUserSub}
            />
        </div>
    )
}
}

export default AppContainer;