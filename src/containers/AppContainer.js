import React from 'react';
import NavBar from '../components/NavBar'
import SubsForm from '../components/SubsForm'
import SubsList from './SubsList'
import YourSubs from './YourSubs'

const baseURL = "http://localhost:3001/api/v1/subscriptions"
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
        yourSubs: [],
      }

    componentDidMount() {
        fetch(baseURL)
        .then(resp => resp.json())
        .then(subData => this.setState({subscriptions: subData}))
    }

    addToList = (sub) => {
        console.log(sub)
        fetch(userSubsURL, {
            method: "POST",
            headers: headers,
            body: JSON.stringify({
              user_id: this.props.user.id,
              subscription_id: sub.id
            })
          })
          .then((response) => response.json())
        if (!this.state.yourSubs.includes(sub)) {
          this.setState(prevState => (
            {yourSubs: [...prevState.yourSubs, sub]}))
        }
      }
    
    removeFromList = (sub) => {
        const newSubs = this.state.yourSubs.filter(b => b !== sub)
        this.setState({yourSubs: newSubs})
      }
    
    // deleteSub = (sub) => {
    //     fetch(`${baseURL}/${sub.id}`, {
    //       method: 'DELETE'
    //     })
    //     const afterDelete = this.state.subscriptions.filter(b => b !== sub)
    //     this.setState({subscriptions: afterDelete})      }

    handleSubscriptionSubmit = event => {
        event.preventDefault()
        fetch(baseURL, {
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
        const {subscriptions, yourSubs} = this.state
        const {handleSubscriptionSubmit, handleChange, deleteSub, addToList, removeFromList} = this
    return (  
        <div className="ui container">
            <SubsForm handleSubmit={handleSubscriptionSubmit} handleChange={handleChange} />

            <SubsList subscriptions={subscriptions} handleClick={addToList} 
            />

            <YourSubs subscriptions={yourSubs} handleClick={removeFromList} 
            />
        </div>
    )
}
}

export default AppContainer;