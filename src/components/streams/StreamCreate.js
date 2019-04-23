import React from 'react';
// Step 3
//  Import helpers from the redux-form library.
//  Field is a component from the redux-form library
//  reduxForm has exact functionality as connect() function. It calls actions
//  creators and maps a state from a redux store into props to given components.
import {Field, reduxForm} from "redux-form";

class StreamCreate extends React.Component {

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

    // Step 6
    //  Create proper input for Field component.
    //  Argument named "meta" is a result of the validation process
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

    // Step 7
    //  Handle form submit event.
    onSubmit(formValues) {
        console.log(formValues);
    }

    render() {
        return (
            // Use handleSubmit() method from the redux-form library to pass
            // a handler for submitting method used by this component.
            <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
                {/*Step 5
                    Attach field to the form with a bunch of the props and pass
                    a method which creates a component*/}
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

// Step 8
//  Define validation method.
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

// Step 4
//  Use reduxForm instead connect()!!!!!!!!!
//  We passing only a configuration object as a param of the reduxForm function.
export default reduxForm({
    // Attach name of the form.
    form: 'streamCreate',
    // Wire-up validation function with the form (Step 8).
    validate: validate
})(StreamCreate);