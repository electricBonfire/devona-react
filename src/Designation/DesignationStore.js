import { observable, action } from 'mobx';
import axios from "axios/index";

class DesignationStore {
    @observable designations = [];
    @action
    getDesignations = () => {
        axios.get('/designations')
            .then((response) => {
                this.payments = response.data;
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
    }
}

export default DesignationStore;