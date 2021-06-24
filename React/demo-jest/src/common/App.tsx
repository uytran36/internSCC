import FormLogin from "../session/FormLogin";
import FormRegister from "../session/FormRegister";
import Home from "../contact/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "antd/dist/antd.css";
import { connect, useSelector } from "react-redux";

function App(props: any) {
  const token = useSelector((state: any) => state.authReducer.token);

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            {token !== null || props.token !== null ? <Home /> : <FormLogin />}
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
  return { token: state.authReducer.token };
}

export default connect(mapStateToProps, null)(App);
