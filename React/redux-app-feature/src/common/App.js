import { React } from "react";
import FormLogin from "../session/FormLogin";
import FormRegister from "../session/FormRegister";
import Home from "../contact/contact"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "antd/dist/antd.css";
import { connect } from 'react-redux';

function App(props) {
  const token = window.localStorage.getItem("jwtToken");
  return (
    <div className='App'>
      <Router>
        <Switch>
          <Route exact path='/'>
            {token || props.isAuthenticated ? <Home /> : <FormLogin />}
          </Route>
          <Route exact path='/register'>
            <FormRegister />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

function mapStateToProps(state) {
  return { isAuthenticated: state.authReducer.isAuthenticated };
}

export default connect(mapStateToProps, null)(App);
