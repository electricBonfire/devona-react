import { observable, action } from 'mobx';
import axios from "axios";

class Payment {
    @observable amount = 0;
    @observable date = new Date();
    @observable user = {};
    @observable notes = [];
    @observable dinv = 0;
    @observable relatedProject = {};
    @observable category = {};
    @observable hasCheckNumber = false;
    @observable capitalized = false;
}

class PaymentStore {
    @observable currentPayment = new Payment();
    @observable payments = [];
    @observable filter = "";

    @action
    getPayments = (id = null) => {
        let endpoint = '/payments';
        endpoint += (id) ? '/' + id : '';
        axios.get(endpoint)
            .then((response) => {
                if(id) {
                    this.currentPayment = response.data;
                } else {
                    this.payments = response.data;
                }
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

    @action
    createNewPayment = () => {
        this.currentPayment = new Payment();
    }
}

export { Payment };
export default PaymentStore;