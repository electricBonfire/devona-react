import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Link } from "react-router-dom";

class PaymentRow extends Component {
    render() {
        return (
            <tr>
                <td>{this.props.payment.id}</td>
                <td>{this.props.payment.amount}</td>
                <td>{this.props.payment.from}</td>
                <td>{this.props.payment.for}</td>
                <td>{this.props.payment.date}</td>
                <td><Link to={`${this.props.match.url}/${this.props.payment.id}`}>?</Link></td>
                <td>DELETE</td>
            </tr>
        )
    }
}

@inject("PaymentStore")
@observer
class PaymentTable extends Component {
    componentDidMount(){
        this.props.PaymentStore.getPayments();
        // this.props.DesignationStore.getDesignations();
        // this.props.UserStore.getUsers();
        // this.props.ProjectStore.getProjects();
    }

    render() {
        const paymentRows = this.props.PaymentStore.payments.filter((payment) => {
            switch (this.props.PaymentStore.filter) {
                case 'Income':
                default:
                    return payment.amount > 0;
                case 'Expenses':
                    return payment.amount < 0;
            }
        }).map((payment) =>
            <PaymentRow match={this.props.match} key={payment.id} payment={payment} selectPayment={this.props.selectPayment}/>
        );

        return (
            <div>
                <button onClick={ () => { this.props.PaymentStore.setFilter('Income') } }>Income</button>
                <button onClick={ () => { this.props.PaymentStore.setFilter('Expenses') } }>Expenses</button>

                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Amount</th>
                            <th>From</th>
                            <th>For</th>
                            <th>Date</th>
                            <th />
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        {paymentRows}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default PaymentTable;
