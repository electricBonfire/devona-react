import React, { Component } from 'react';
import { inject, observer} from 'mobx-react';
import { observable } from 'mobx';

@inject("PaymentStore", "UserStore", "ProjectStore", "DesignationStore")
@observer
class PaymentForm extends Component {
    @observable id;

    constructor(props){
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount(){
        this.id = this.props.match.params.paymentId.match(/\d+/);

        // If id is numerical we assume we are editing an existing payment
        if (this.id) {
            this.props.PaymentStore.getPayment(this.id);
        } else {
            this.props.PaymentStore.createNewPayment();
        }
    }

    onChange(event){
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.props.PaymentStore.currentPayment[name] =  value;
    }

    onSubmit(event){
        this.props.PaymentStore.savePayment(this.props.PaymentStore.currentPayment);
        event.preventDefault();
    }

    render() {

        const users = this.props.UserStore.users.map((user) =>
            <option key={user.id} value={user.id}>{user.first_name}</option>
        );

        const projects = this.props.ProjectStore.projects.map((project) =>
            <option key={project.id} value={project.id}>{project.summary}</option>
        );

        const categories = this.props.DesignationStore.designations.map((category) =>
            <option key={category.id} value={category.id}>{category.name}</option>
        );
        return (
            <div>
                <h2>Payment Form</h2>

                <form onSubmit={this.onSubmit}>
                    <label>
                        <input name="amount" value={this.props.PaymentStore.currentPayment.amount } onChange={this.onChange}/>
                    </label>

                    <label>
                        Date
                        <input type="text" name="date" value={ this.props.PaymentStore.currentPayment.date } onChange={this.onChange} />
                    </label>

                    <br />

                    <label>
                        From / To
                        <select name="from" onChange={this.onChange} >
                            {users}
                        </select>
                    </label>

                    <br />

                    <label>
                        Notes
                        <textarea name="notes" value={this.props.PaymentStore.currentPayment.value } onChange={this.onChange} />
                    </label>

                    <br />

                    <label>
                        DINV
                        <input type="text" name="dinv" value={this.props.PaymentStore.currentPayment.dinv} onChange={this.onChange} />
                    </label>


                    <label>
                        Related Project
                        <select name="relatedProject" onChange={this.onChange} >
                            {projects}
                        </select>
                    </label>

                    <label>
                        Category
                        <select name="category" onChange={this.onChange}>
                            {categories}
                        </select>
                    </label>

                    <br />

                    <label>
                        Assign Check Number
                        <input name="assignCheckNumber" type="checkbox" checked={this.props.PaymentStore.currentPayment.assignCheckNumber} onChange={this.onChange} />
                    </label>
                    <label>
                        Capitalized
                        <input name="capitalized" type="checkbox" checked={this.props.PaymentStore.currentPayment.capitalized} onChange={this.onChange} />
                    </label>

                    <button>{ (this.id) ? "UPDATE" : "CREATE" }</button>
                </form>
            </div>
        )
    }
}

export default PaymentForm;