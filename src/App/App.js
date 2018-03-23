import React, {Component} from 'react';
import { inject, observer } from 'mobx-react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import PaymentContainer from '../Payment/PaymentContainer';
import LoginForm from '../Session/LoginForm';

@inject("SessionStore")
@observer
class App extends Component {
    render() {
        const grantAccess = this.props.SessionStore.hasSession();

        return !grantAccess ? ( <LoginForm login={this.login} /> ) : (
            <Router>
                <div>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/payments">Payments</Link>
                        </li>
                        <li>
                            <button onClick={this.props.SessionStore.logout}>Logout</button>
                        </li>
                    </ul>

                    <hr />

                    <Route path="/payments" component={PaymentContainer} />
                </div>
            </Router>
        );
    }
}

export default App;
