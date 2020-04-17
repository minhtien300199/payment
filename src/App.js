import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PaymentComp from "./component/PaymentComponent";
import FormHandler from "./component/FormHandler";
import PaymentFail from './component/PaymentFail';
import 'antd/dist/antd.css';
import "./App.css";
import { Layout } from 'antd';

const { Header, Footer, Content } = Layout;
function App() {
  return (
    <div className="App">
      <Layout>
      <Header style={{color:"white",fontSize:"30px"}}>Tích hợp payment  
        <span class="paypal-logo">
          <i>Pay</i><i>Pal</i>
        </span>
      </Header>
        <Content>
          <Router>
            <Switch>
              <Route exact path="/" component={FormHandler} />
              <Route exact path="/cancel" component={PaymentFail}/>
              <Route path="/success" component={PaymentComp} />
            </Switch>
          </Router>
        </Content>
      <Footer style={{fontSize:"20px"}}>17110236-Lê Minh Tiến</Footer>
      </Layout>
    </div>
  );
}

export default App;
