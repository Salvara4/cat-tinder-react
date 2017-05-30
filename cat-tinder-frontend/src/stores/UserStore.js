import {EventEmitter} from 'events'
import Dispatcher from '../Dispatcher'

class UserStore extends EventEmitter{
  constructor(){
    super()
    this.users = [{}]
    this.newUser = {}
    this.message = ""
  }

  getUsers(){
    return this.users
  }

  getNewUsers(){
    return this.newUser
  }

  updateNewUser(attributes){
    this.newUser = attributes
    this.users.push(attributes)
    this.updateMessage('User has been added')
    this.emit('change')
  }

  updateUsers(attributes){
    this.users = attributes
    this.updateMessage('users are loaded')
    this.emit('change')
  }

  getMessage(){
    return this.message
  }

  updateMessage(newMessage){
    this.message = newMessage
    this.emit('message')
  }

  handleActions(action){
    switch(action.type){
      case("CREATE_USER"):{
        this.updateNewUser(action.users)
        break
      }
      case("UPDATE_USERS"):{
        this.updateUsers(action.users)
        break
      }
      default:{}
    }
  }
}

const store = new UserStore()
Dispatcher.register(store.handleActions.bind(store))
window.store = store
export default store
