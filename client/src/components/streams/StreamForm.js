import React from 'react';
import {Field, reduxForm} from "redux-form";

class StreamForm extends React.Component {

    // Show error on the screen.
    renderError({error, touched}) {
        if (touched && error) {
            return (
                <div className="ui error message">
                    <div className="header">{error}</div>
                </div>
            );
        }
    }

    renderInput = ({input, label, meta}) => {
        const className = `field ${meta.error && meta.touched ? 'error' : ''}`;

        // This takes all these key-value pairs and adds them as properties
        // to the input element (eg. the form props input property which has
        // a value props and onChange handler).
        // eg.
        // onChange={formProps.input.onChange}
        // value={formProps.input.value}
        return (
            <div className={className}>
                <label>{label}</label>
                <input {...input} autoComplete="off"/>

                {/* Validation errors */}
                {this.renderError(meta)}
            </div>
        );
    };

    onSubmit = (formValues) => {
        // Step 5
        //  Perform API request via callback passed by props.
        this.props.onSubmit(formValues);
    };

    render() {
        return (
            // Use handleSubmit() method from the redux-form library to pass
            // a handler for submitting method used by this component.
            <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
                <Field
                    name="title"
                    component={this.renderInput}
                    label="Enter title"/>
                <Field
                    name="description"
                    component={this.renderInput}
                    label="Enter description"/>

                <button className="ui button primary">Submit</button>
            </form>
        );
    }
}

const validate = (formValues) => {
    const errors = {};

    // Check different form values.
    // We comparing object keys which correspond to the name of a prop passed
    // to the Field component. If they are the same, then the validation
    // result will be passed as a prop to the Field component.
    if (!formValues.title) {
        errors.title = 'You must enter a title';
    }

    if (!formValues.description) {
        errors.description = 'You must enter a description';
    }

    // Return result of the validation.
    return errors;
};

// Configure reduxForm library.
export default reduxForm({
    // Attach name of the form.
    form: 'streamForm',
    // Wire-up validation function with the form
    validate: validate
})(StreamForm);