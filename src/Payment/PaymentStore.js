import { observable, action } from 'mobx';
import axios from "axios";

class Payment {
    id = 10;
    amount = 10;
}

class PaymentStore {
    @observable payments = [];
    @observable filter = "";

    @action
    getPayments = (id = null) => {
        let endpoint = '/payments';
        endpoint += (id) ? '/' + id : '';

        axios.get(endpoint)
            .then((response) => {
                this.payments = response.data;
                console.log('done: ', response);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    @action
    savePayment = (payment) => {
        let endpoint = '/payments';
        axios.post(endpoint)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    @action
    setFilter = (filter) => {
        console.log(filter);
        this.filter = filter;
    }
}

export { Payment };
export default PaymentStore;