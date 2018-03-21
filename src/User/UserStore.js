import { observable, action } from 'mobx';
import axios from "axios";

class UserStore {
    @observable users = [];

    @action
    getUsers = () => {
        axios.get('/users')
            .then((response) => {
                this.users= response.data;
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
    }
}

export default UserStore;