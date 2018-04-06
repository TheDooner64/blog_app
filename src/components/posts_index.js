import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'

// The Link component is basically a class <a> tag
// It will render something the user can click to navigate around to different "views" within our react route app
// It's basically an <a> tag under the hood, but it has some event handlers to prevent the default browser behavior
// It uses a "to" property to define which route the link will navigate to
import { Link } from 'react-router-dom'

import { fetchPosts } from '../actions'

class PostsIndex extends Component {
  // We'll be using a React lifecycle method to call our fetchPosts action creator when we want
  // A lifecycle method is a function on a react component class that is automatically called by react
  // componentDidMount is the one we'll use here
  // This function will be called immediately after this component has shown up inside the DOM
  // This will be called automatically by react because we gave it one of the special names (e.g. "componentDidMount")
  // This is the perfect location to fetch some data or initiate some one-time loading procedure
  componentDidMount() {
    this.props.fetchPosts();
  }

  renderPost() {
    // Use lodash's map function to deal with iterating over an object, as opposed to an array
    return _.map(this.props.posts, post => {
      return (
        <li key={post.id} className="list-group-item">
          <Link to={`/posts/${post.id}`}>
            {post.title}
          </Link>
        </li>
      );
    });
  }

  render() {
    return (
      <div>
        <div className="text-xs-right">
          <Link className="btn btn-primary" to="/posts/new">
            Add a Post
          </Link>
        </div>
        <h3>Posts</h3>
        <ul className="list-group">
          {this.renderPost()}
        </ul>
      </div>
    );
  }
}

// Whenever we want to consume something from application level state, we need to use mapStateToProps
function mapStateToProps(state) {
  return { 'posts': state.posts };
}

// Shorthand way of wiring up an action creator (i.e. as opposed to defining mapStateToProps and mapDispatchToProps)
export default connect(mapStateToProps, { fetchPosts })(PostsIndex);
