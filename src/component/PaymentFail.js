import React from "react";
import { withRouter } from "react-router-dom";
class PaymentFail extends React.Component {
    render() {
        return <div className="container">
            <div><strong>Purchase Fail :(</strong></div>
            <button className="back-btn"> Back Home</button>
        </div>
    }
}
export default withRouter(PaymentFail);
