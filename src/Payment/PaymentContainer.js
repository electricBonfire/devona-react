import React, { Component } from "react";
import { Route } from "react-router-dom";

import PaymentTable from "./PaymentTable";
import PaymentForm from "./PaymentForm";

class PaymentContainer extends Component {
    render() {
        return (
            <div>
                <Route exact path="/payments" component={PaymentTable} />
                <Route path="/payments/:paymentId" component={PaymentForm} />
            </div>
        )
    }
}

export default PaymentContainer;