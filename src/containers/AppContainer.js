import React from 'react';
import NavBar from '../components/NavBar'
import SubsForm from '../components/SubsForm'

class AppContainer extends React.Component {

    componentDidMount() {
        const token = localStorage.getItem('token');
        if (!token) {
          this.props.history.push('/login');
        }
      }
    
    render() {
    return (  
        <div className="ui container">
            <NavBar
                currentUser={this.state.auth.currentUser}
                handleLogout={this.handleLogout}
                />
            <SubsForm handleSubmit={this.handleSubmit} handleName={this.handleName} handleCost={this.handleCost} />
        </div>
    )
}
}

export default AppContainer;