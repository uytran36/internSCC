import { React, useState, useEffect } from "react";
import FormLogin from "./components/FormLogin";
import FormRegister from "./components/FormRegister";
import TableContacts from "./components/TableContacts";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "antd/dist/antd.css";
import { connect } from 'react-redux';

function App(props) {
  // const [token, setToken] = useState(null);

  // const refresh = () => {
  //   setToken(window.localStorage.getItem("jwtToken"));
  // };
  const token = window.localStorage.getItem("jwtToken");
  return (
    <div className='App'>
      <Router>
        <Switch>
          <Route exact path='/'>
            {token || props.isAuthenticated ? <TableContacts /> : <FormLogin />}
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
  return { isAuthenticated: state.auth.isAuthenticated };
}

export default connect(mapStateToProps, null)(App);
