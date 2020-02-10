import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter as Router, Route, Redirect } from 'react-router-dom'
import Login from './login'
class App extends React.Component {
  render() {
    return (
      <Router>
        <Redirect from="/" to="/login"></Redirect>
        <Route component={Login}></Route>
      </Router>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
