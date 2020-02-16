import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import { AuthRoute } from './utils'
import 'element-theme-default'
import Login from './login'
import Home from './home'
class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Redirect to="/home" from="/" exact></Redirect>
          <Route path="/login" component={Login}></Route>
          <AuthRoute path="/home" component={Home}></AuthRoute>
        </Switch>
      </Router>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
