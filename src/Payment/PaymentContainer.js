import React, { Component } from "react";
import { Route } from "react-router-dom";
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router-dom';

import PaymentTable from "./PaymentTable";
import PaymentForm from "./PaymentForm";

@inject("PaymentStore", "DesignationStore", "UserStore", "ProjectStore")
@observer
class PaymentContainer extends Component {
    componentDidMount(){
        this.props.PaymentStore.getPayments();
        this.props.DesignationStore.getDesignations();
        this.props.UserStore.getUsers();
        this.props.ProjectStore.getProjects();
    }

    render() {
        return (
            <div>
                <Link to="/payments/new" onClick = { () => { this.props.PaymentStore.createNewPayment() } }>New</Link>
                <Link to="/payments" onClick={ () => { this.props.PaymentStore.setFilter('Income') } }>Income</Link>
                <Link to="/payments" onClick={ () => { this.props.PaymentStore.setFilter('Expenses') } }>Expenses</Link>

                <Route exact path="/payments" component={PaymentTable} />
                <Route path="/payments/:paymentId" component={PaymentForm} />
            </div>
        )
    }
}

export default PaymentContainer;