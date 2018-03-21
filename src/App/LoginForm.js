import React, {Component} from "react";
import { inject } from "mobx-react";

@inject("SessionStore")
class Login extends Component {
    constructor(props){
        super(props);

        this.session = this.props.SessionStore;
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event){
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.session.loginForm[name] = value;
    }

    render() {
        return (
            <form onSubmit={this.session.login}>
                <input type="text" name="username" onChange={this.handleInputChange} /><br />
                <input type="password" name="password" onChange={this.handleInputChange} /><br />
                <button>Login</button>
            </form>
        )
    }
}

export default Login;