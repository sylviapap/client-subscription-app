import React from 'react';
import SubsForm from '../components/SubsForm'
import SubsList from './SubsList'
import YourSubs from './YourSubs'

const subscriptionsURL = "http://localhost:3001/api/v1/subscriptions"
// const usersURL = "http://localhost:3001/api/v1/users"
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
        yourSubscriptions: [this.props.currentUser.subscriptions]
      }

    componentDidMount() {

    }

          // fetch(`${usersURL}/${this.props.currentUser.id}`)
      // .then(resp => resp.json())
      // .then(userData => this.setState({yourSubscriptions: userData.subscriptions}))

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
          .then((data) => { if (!this.state.yourSubscriptions.includes(data.subscription)) {
            return this.setState(prevState => ({
              yourSubscriptions: [...prevState.yourSubscriptions, data.subscription]}
            ))}
          })
        
      }

    // componentDidUpdate(prevProps) {
    //     if (this.props.userID !== prevProps.userID) {
    //       this.fetchData(this.props.userID);
    //     }
    //   }
    
    removeFromList = (sub) => {
        const newSubs = this.state.yourSubscriptions.filter(b => b !== sub)
        this.setState({yourSubscriptions: newSubs})
      }
    
    // deleteSub = (sub) => {
    //     fetch(`${subscriptionsURL}/${sub.id}`, {
    //       method: 'DELETE'
    //     })
    //     const afterDelete = this.state.subscriptions.filter(b => b !== sub)
    //     this.setState({subscriptions: afterDelete})      }
        
    handleSubscriptionSubmit = event => {
        event.preventDefault();
        console.log("sub form submitted")
        fetch(subscriptionsURL, {
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
        const {yourSubscriptions} = this.state
        const {subscriptions} = this.props
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