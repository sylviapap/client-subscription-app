import React from 'react';
import SubsForm from '../components/SubsForm'
import SubsList from './SubsList'
import YourSubs from './YourSubs'

const subscriptionsURL = "http://localhost:3001/api/v1/subscriptions"
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
        },
        clicked: false,
        yourSubscriptions: []
      }

    componentDidMount() {
      this.setState({yourSubscriptions: [this.props.currentUser.user_subscriptions]
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
          .then((data) => { if (!this.state.yourSubscriptions.includes(data)) {
            return this.setState(prevState => ({
              yourSubscriptions: [...prevState.yourSubscriptions, data]}
            ))}
          })
      }
    
    removeFromList = (sub) => {
      console.log(sub, "delete this sub")
        const newSubs = this.state.yourSubscriptions.filter(b => b !== sub)
        this.setState({yourSubscriptions: newSubs})
        // fetch(`${userSubsURL}/${sub.id}`, {
        //         method: 'DELETE'
        //       })
      }
        
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
        const {handleSubscriptionSubmit, handleChange, addToList, removeFromList, hideForm} = this
        const {yourSubscriptions} = this.state
        const {subscriptions} = this.props
        console.log(yourSubscriptions.subscriptions)
    return (  
        <div className="ui container">            
            <SubsList subscriptions={subscriptions} handleClick={addToList}
            />

            <h2 onClick={this.hideForm} className="formHeader">Click To Add To Your Subscription List</h2>
            {this.state.clicked ? <SubsForm hideForm={hideForm} 
            handleSubmit={handleSubscriptionSubmit} handleChange={handleChange} />
            :null
            }

            <YourSubs subscriptions={yourSubscriptions} handleClick={removeFromList} 
            />
        </div>
    )
}
}

export default AppContainer;