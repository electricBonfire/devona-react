import { observable, action } from 'mobx';
import axios from "axios";

class SessionStore {
    @observable session = JSON.parse(localStorage.getItem("session"));
    @observable loginForm = {
        username: '',
        password: ''
    };

    hasSession = () => {
        if(this.session) {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.session.token.access_token;
            return true;
        } else {
            return false;
        }
    };

    @action
    login = (event) => {
        axios.post('/login', { ...this.loginForm } )
            .then((response) => {
                let now = new Date();
                this.session = {
                    token: response.data,
                    created: now.toISOString()
                };

                localStorage.setItem("session", JSON.stringify(this.session));
            })
            .catch((error) => {
                console.log(error);
            });
        event.preventDefault();
    };

    logout = () => {
        localStorage.removeItem("session");
        window.location = '/';
    };
}

export default SessionStore;