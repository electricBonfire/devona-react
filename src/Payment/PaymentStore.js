import { observable, action, computed } from 'mobx';
import axios from "axios";

const payment = {
    id: null,
    amount: 0,
    date: new Date(),
    user: {},
    notes: [],
    dinv: 0,
    relatedProject: {},
    category: {},
    hasCheckNumber: false,
    capitalized: false,
};

class PaymentStore {
    @observable currentPayment = payment;
    @observable payments = [];
    @observable filter = "";

    @action
    getPayments = () => {
        axios.get('/payments')
            .then((response) => {
                this.payments = response.data.map((aPayment) => {
                    aPayment.date = new Date(aPayment.date);
                    return Object.assign({}, payment, aPayment)
                });

                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    getPayment = (id) => {
        axios.get('/payments/' + id)
            .then((response) => {
                response.date = new Date(response.date);
                this.currentPayment = Object.assign({}, payment, response.data);
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    @action
    savePayment = (payment) => {
        let request = (payment.id) ? axios.put('payments/' + payment.id, payment) : axios.post('/payments', payment);
        request.then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        });
    };

    @action
    createNewPayment = () => {
        this.currentPayment = payment;
    };

    @action
    setFilter = (filter) => {
        console.log(filter);
        this.filter = filter;
    };

    @computed get income(){
        let income = 0;
        this.payments.forEach((payment) => {
            if(payment.amount > 0) {
                income += payment.amount;
            }
        });
        return income.toFixed(2);
    }

    @computed get expenses(){
        let expenses = 0;
        this.payments.forEach((payment) => {
            if(payment.amount < 0) expenses += payment.amount;
        });
        return expenses.toFixed(2);
    }

    @computed get cashflow(){
        let cashflow = 0;
        this.payments.forEach((payment) => {
            cashflow += payment.amount;
        });
        return cashflow.toFixed(2);
    }
}

export default PaymentStore;