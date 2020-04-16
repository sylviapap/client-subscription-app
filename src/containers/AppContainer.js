import React from 'react';
import SubsForm from '../components/SubsForm'
import SubsList from './SubsList'
import YourSubs from './YourSubs'

const subsURL = "http://localhost:3001/api/v1/subscriptions"
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
            cost: 0,
            start_date: "",
            end_date: "",
        },
        subscriptions: [],
        yourSubscriptions: [],
        clicked: false
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

    hideForm = () => {
      this.setState({
        clicked: !this.state.clicked
      })
    }

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
          // .then(data => {console.log(data)})
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
    
    // deleteSub = (subId) => {
    //     fetch(`${subsURL}/${subId}`, {
    //       method: 'DELETE'
    //     })
    //     const afterDelete = this.state.subscriptions.filter(b => b.id !== subId)
    //     this.setState({subscriptions: afterDelete})      
    //   }
        
    handleSubscriptionSubmit = event => {
        event.preventDefault();
        console.log(event, "sub form submitted")
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
        const {handleSubscriptionSubmit, handleChange, addToList, removeFromList, hideForm} = this
        //console.log(yourSubscriptions)
    return (  
        <div className="ui container">            
            <SubsList subscriptions={subscriptions} handleClick={addToList}
            />
            <h1 onClick={this.hideForm} className="formHeader">Add To Your Subscription List</h1>
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