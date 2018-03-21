import React, { Component } from 'react';
import { inject } from 'mobx-react';
import { Payment } from './PaymentStore';

@inject("PaymentStore")
class PaymentForm extends Component {
    constructor(props){
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentDidMount(){
        let id = this.props.match.params.paymentId;

        if (id.match(/\d+/).length) {
            // If id is numerical we assume we are editing an existing payment
            this.props.PaymentStore.getPayments(id);
        } else {
            this.props.PaymentStore.payments = [];
        }
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        // this.setState({
            // [name]: value
        // });
    }

    render() {
        // let users = this.props.users.map((user) =>
        //     <option key={user.id} value={user.id}>{user.first_name}</option>
        // );
        //
        // let projects = this.props.projects.map((project) =>
        //     <option key={project.id} value={project.id}>{project.summary}</option>
        // );
        //
        // let categories = this.props.categories.map((category) =>
        //     <option key={category.id} value={category.id}>{category.name}</option>
        // );

        return (
            <div>
                <h2>Payment Form</h2>

                <form>
                    <label>
                        Amount
                        <input type="text" name="amount" value={ this.props.PaymentStore.payments[0].amount } onChange={this.handleInputChange} />
                    </label>

                    <label>
                        Date
                        {/*<input type="text" name="date" value={this.state.date} onChange={this.handleInputChange} />*/}
                    </label>

                    <br />

                    <label>
                        From / To
                        {/*<select name="from" value={this.state.value} onChange={this.handleInputChange} >*/}
                            {/*/!*{users}*!/*/}
                        {/*</select>*/}
                    </label>

                    <br />

                    <label>
                        Notes
                        {/*<textarea name="notes" value={this.state.value} onChange={this.handleInputChange} />*/}
                    </label>

                    <br />

                    <label>
                        DINV
                        {/*<input type="text" name="dinv" value={this.state.dinv} onChange={this.handleInputChange} />*/}
                    </label>


                    <label>
                        Related Project
                        {/*<select name="relatedProject" value={this.state.relatedProject} onChange={this.handleInputChange} >*/}
                            {/*/!*{projects}*!/*/}
                        {/*</select>*/}
                    </label>

                    <label>
                        Category
                        {/*<select name="category" value={this.state.category} onChange={this.handleInputChange} >*/}
                            {/*/!*{categories}*!/*/}
                        {/*</select>*/}
                    </label>

                    <br />

                    <label>
                        Assign Check Number
                        {/*<input name="assignCheckNumber" type="checkbox" checked={this.state.assignCheckNumber} onChange={this.handleInputChange} />*/}
                    </label>
                    <label>
                        Capitalized
                        {/*<input name="isCapitalized" type="checkbox" checked={this.state.isCapitalized} onChange={this.handleInputChange} />*/}
                    </label>
                </form>
            </div>
        )
    }
}

export default PaymentForm;