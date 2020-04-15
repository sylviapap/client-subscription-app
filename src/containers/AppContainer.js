import React from 'react';
import NavBar from '../components/NavBar'
import SubsForm from '../components/SubsForm'

class AppContainer extends React.Component {
    
    render() {
    return (  
        <div className="ui container">
            <NavBar
                />
            <SubsForm handleSubmit={this.handleSubmit} handleName={this.handleName} handleCost={this.handleCost} />
        </div>
    )
}
}

export default AppContainer;