import FormLogin from "../session/FormLogin";
import FormRegister from "../session/FormRegister";
import Home from "../contact/contact";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "antd/dist/antd.css";
import { connect, useSelector } from "react-redux";

function App() {
  const token = useSelector((state: any) => state.authReducer.token);

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            {token !== null ? <Home /> : <FormLogin />}
          </Route>
          <Route exact path="/register">
            <FormRegister />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

function mapStateToProps(state: any) {
  return { isAuthenticated: state.authReducer.isAuthenticated };
}

export default connect(mapStateToProps, null)(App);
