import React, { Component } from 'react'

// Field is a component that is automatically wired up redux form. We'll have one per piece of state
// reduxForm is a function that is very similar to the "connect" function from react-redux
// It's what allows our component to communicate to the formReducer and gain access to the redux store
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { createPost } from '../actions'

// The Field component has a number of properties
// 'name' describes the piece of state this form will handle
// 'component' takes a function that will be used to render the form
// We can also add various props like "label" in this case (we can name them anything)
class PostsNew extends Component {
  // The Field component basically just keeps track of the data and interact with redux form
  // This function will determine the JSX we want to render
  // The 'field' argument ties this rendered JSX to the actual Field component that called the function
  // field.input is an object that contains a bunch of event handlers and props like onChange, onFocus, etc, etc
  // We use the ... ES6 syntax to unpack them
  renderField(field) {
    // Pull 'meta' and its nested properties 'touched' and 'error' off of 'field' using ES6 destructuring
    const { meta: { touched, error } } = field;

    // Conditional formatting based on the form being touched and validated
    const className = `form-group ${touched && error ? 'has-danger' : ''}`

    return (
      <div className={className}>
        <label>{field.label}</label>
        <input
          className="form-control"
          type="text"
          {...field.input}
        />
        <div className="text-help">
          {touched ? error : ''}
        </div>
      </div>
    );
  }

  // redux-form is only responsible for the state and validation of our form
  // It does not handle anything else, like saving data to a DB or anything like that, so we need to write this function
  // We'll need to wire up some redux-form stuff, like validation, and also write our own custom logic
  onSubmit(values) {
    // this === component

    // Whenever we think about saving data or using an API within a redux application, we need to think action creators
    // We pass a callback function as a second argument so we can make sure to wait for the async operation to finish
    // THEN, we can proceed with navigating back to the home view using history.push
    this.props.createPost(values, () => {
      // Whenever react-router renders a component, it passes in a bunch of helpers and objects to help with navigation
      // In this case, we want to use the 'history' prop
      // If we push the root path, we will navigate back to that view
      // The path that we pass must match one of the Route's that we've defined in our application
      this.props.history.push('/');
    });
  }

  render() {
    // handleSubmit is a prop that reduxForm adds when we wire it up at the bottom of this file
    // It will take a function that we define, which is onSubmit in this case
    // handleSubmit will run the form validation, and then call the onSubmit callback if the form is valid
    // We need to bind "this" because we're using a callback function that will be executed in some other context
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field
          name="title"
          component={this.renderField}
          label="Title"
        />
        <Field
          name="categories"
          component={this.renderField}
          label="Categories"
        />
        <Field
          name="content"
          component={this.renderField}
          label="Post Content"
        />
        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to="/" className="btn btn-danger">Cancel</Link>
      </form>
    );
  }
}

// This helper function will be called automatically whenever a user tries to submit the form
// This validate function automatically adds a "meta.error" property to "field"
function validate(values) {
  // This errors object is how we communicate validation errors to redux form
  const errors = {};

  // These specific names like "title" must correlate with the Field properties
  if (!values.title || values.title.length < 3) {
    errors.title = "Enter a title that is at least 3 characters!";
  }

  if (!values.categories) {
    errors.categories = "Enter some categories!";
  }

  if (!values.content) {
    errors.content = "Fill out some content!";
  }

  // If errors is empty, the form is fine to submit
  // If errors has any properties, redux form will not submit the form
  return errors
}

// reduxForm takes one argument, which is a config object
// 'form' is basically the name of the form, which is important since we may have multiple forms on the page
// 'validate' uses the ES6 convention since the name and value are the same (e.g. 'validate': validate)
const reduxFormConfig = {
  validate,
  'form': 'PostsNewForm'
}

// If we didn't use connect with an action creator, we could have simply done this
// export default reduxForm(reduxFormConfig)(PostsNew);

export default reduxForm(
  reduxFormConfig
)(
  connect(null, { createPost })(PostsNew)
);
