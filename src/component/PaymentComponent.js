import React from "react";
import { withRouter } from "react-router-dom";
import qs from "query-string";
import PaypalAPI from '../API/PaypalAPI';
import { Spin,Button,Alert,Divider } from 'antd';
class PaymentComp extends React.Component {
    constructor(props){
        super(props);
        this.PaypalAPI = new PaypalAPI();
        this.sendConfirmPayment=this.sendConfirmPayment.bind(this);
        this.state ={data:{},count:8}
    }
    sendConfirmPayment =async (query)=>{
        const temp = await this.PaypalAPI.postPayerID(query);
        this.setState({data:temp});
    }
  async componentDidMount() {
    const {  location } = this.props;
    
    const query = qs.parse(location.search);
    // TODO: handle something
    await this.sendConfirmPayment(query);
    this.interval = setInterval(()=>{
      if (this.state.count===1) {
        clearInterval(this.interval);
        window.close();
      }
      this.setState({count:this.state.count-1});
    },1000)
}
paymentSuccessRender=()=>{
  const itemList = this.state.data.transactions[0].item_list.items.map((item)=>{
    return (<ul>
        <li>Product name: {item.name}</li>
        <li>Product price: {item.price} {item.currency}</li>
        <li>Product amount: {item.quantity}</li>
        <li>Tax: {item.tax}</li>
    </ul>)
  })
  return(
    <div className="container">
          <div>
          Purchase Successfully!
          </div>
        <div>
              return mainpage in {this.state.count}
        </div>
        <Spin></Spin>
        <Divider>Transaction info</Divider>
        <ul>
          <li>Create time: {this.state.data.create_time}</li>
          <li>Update time: {this.state.data.update_time}</li>
        </ul> 
        <Divider>Cart Items Purchased</Divider>
          {itemList}
        <Divider>
          Total
        </Divider>
        <ul>
            <li>{this.state.data.transactions[0].amount.total} {this.state.data.transactions[0].amount.currency}</li>
        </ul>
    </div>
  );
}
paymentFailRender=()=>{
  return(
    <div className="container">
      <div>Your transaction was failure :( !</div>
        <Button type="danger" size='large'>
          Return Homepage
        </Button>
    </div>
  );
}

  render() {
    let page;
    if (this.state.data.httpStatusCode===200) {
      page=this.paymentSuccessRender();
    }else if(this.state.data.httpStatusCode===400||this.state.data.httpStatusCode===404){
      page=this.paymentFailRender();
    }else {
      page = (<div className="container">
          <Spin tip="Loading please wait...">
            <Alert
              message="Function is loading"
              description="Please just wait a momment"
              type="info"
            />
          </Spin>
      </div>)
    }
    return (page);
  }
}

export default withRouter(PaymentComp);
