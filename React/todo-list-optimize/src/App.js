import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "antd/dist/antd.css";
import TodoOld from "./components/TodoOld";
import TodoNew from "./components/TodoNew";
import Paging from "./components/Paging";
import { Layout, Menu } from "antd";
import {
  UnorderedListOutlined,
  TableOutlined,
} from "@ant-design/icons";

import Temp from './components/Temp';

const { Header, Content, Footer, Sider } = Layout;

class App extends Component {
  render() {
    return (
      // <Layout>
      //   <Router>
      //     <Sider>
      //       <div className="logo" />
      //       <Menu theme="dark" mode="inline" defaultSelectedKeys={["4"]}>
      //         <Menu.Item key="1" icon={<UnorderedListOutlined />}>
      //           <Link to="/">Old Todo</Link>
      //         </Menu.Item>
      //         <Menu.Item key="2" icon={<TableOutlined />}>
      //           <Link to="/new">New Todo</Link>
      //         </Menu.Item>
      //         <Menu.Item key="3" icon={<TableOutlined />}>
      //           <Link to="/paging">Paging</Link>
      //         </Menu.Item>
      //       </Menu>
      //     </Sider>
      //     <Layout>
      //       <Header
      //         className="site-layout-sub-header-background"
      //         style={{ padding: 0 }}
      //       />
      //       <Content style={{ margin: "24px 16px 0" }}>
      //         <div
      //           className="site-layout-background"
      //           style={{ padding: 24, minHeight: 360 }}
      //         >
      //           <Switch>
      //             <Route exact path="/">
      //               <TodoOld />
      //             </Route>
      //             <Route exact path="/new">
      //               <TodoNew />
      //             </Route>
      //             <Route exact path="/paging">
      //               <Paging />
      //             </Route>
      //           </Switch>
      //         </div>
      //       </Content>
      //       <Footer style={{ textAlign: "center" }}>
      //         Ant Design ©2018 Created by Ant UED
      //       </Footer>
      //     </Layout>
      //   </Router>
      // </Layout>
      <Temp />
    );
  }
}

export default App;
