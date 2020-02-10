import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter as Router, Route, Redirect } from 'react-router-dom'
import 'element-theme-default'
import Login from './login'
import Home from './home'
class App extends React.Component {
  render() {
    return (
      <Router>
        <Redirect from="/" to="/login"></Redirect>
        <Route path="/login" component={Login}></Route>
        <Route path="/home" component={Home}></Route>
      </Router>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
