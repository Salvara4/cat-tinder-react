import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import CatAdd from './components/CatAdd'
import CatIndex from './components/CatIndex'
import catStore from './stores/CatStore'
import userStore from './stores/UserStore'
import {updateCats} from './actions'
import UserAdd from './components/UserAdd'

class App extends Component {
  constructor(props){
    super(props)
    updateCats()
    this.state = {
      message: catStore.getMessage(),
      otherMessage: userStore.getMessage()
    }
  }

  updateMessage(){
    this.setState({
      message: catStore.getMessage(),
      otherMessage: userStore.getMessage()
    })
  }

  componentWillMount(){
    userStore.on('message', this.updateMessage.bind(this))
    catStore.on('message', this.updateMessage.bind(this))
  }

  render() {
    return (
      <div>
        <div className='message'>{this.state.message} {this.state.otherMessage}</div>
        <Router>
          <div className="App container">
            <Route exact path="/" component={CatIndex} />
            <Route exact path="/add" component={CatAdd} />
            <Route exact path="/user_add" component={UserAdd} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
