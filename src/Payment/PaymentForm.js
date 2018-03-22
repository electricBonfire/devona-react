import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Form as BaseForm } from 'mobx-react-form';
import validatorjs from 'validatorjs';

class Form extends BaseForm{
    plugins() {
        return { dvr: validatorjs };
    }

    setup(){
        return {
            fields: [{
                name: 'amount',
                label: 'Amount',
            }]
        }
    }

    hooks(){
        return {
            onSuccess(form) {
                alert('Form is valid! Send the request here.');
                // get field values
                console.log('Form Values!', form.values());
            },
            onError(form) {
                alert('Form has errors!');
                // get all form errors
                console.log('All form errors', form.errors());
            }
        };
    }
}

@inject("PaymentStore")
@observer
class PaymentForm extends Component {
    componentDidMount(){
        let id = this.props.match.params.paymentId;

        if (id.match(/\d+/)) {
            // If id is numerical we assume we are editing an existing payment
            this.props.PaymentStore.getPayments(id);
        } else {
            this.props.PaymentStore.payments = [];
        }
    }

    render() {

        const form = new Form();

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

                <form onSubmit={form.onSubmit}>
                    <label>
                        {form.$('amount').label}
                        <input {...form.$('amount').bind()} />
                        <p>{form.$('amount').error}</p>
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