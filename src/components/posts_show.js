import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchPost } from '../actions'
import { deletePost } from '../actions'

class PostsShow extends Component {
  componentDidMount() {
    // If we worried about making too many requests, we could wrap these two lines in if (!this.props.post)
    // In this case, if we already retrieved some posts, we can just keep those at the risk of some stale data
    // We can find the post ID we care about using this standard react-route "match.params" prop
    const { id } = this.props.match.params;
    this.props.fetchPost(id);
  }

  // Our custom click event handler for the delete button
  onDeleteClick() {
    // Take the id from the URL state, so we know which post to delete
    // We could also retrieve the post id from this.props.post.id since we have access to it from there too
    // This URL approach is preferred because this overall component WILL render before the post has been retrieved
    // So it's possible in that scenario that we don't yet have access to this.props.post
    const { id } = this.props.match.params;

    // In addition to the id, pass a callback function so the action creator knows what to do after it's deleted
    this.props.deletePost(id, () => {
      // We can use history again for some programmatic navigation
      this.props.history.push('/');
    });
  }

  render() {
    const { post } = this.props;

    // The component will be rendered before we have a post to display, so we need to include this until it's received
    if (!post) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <Link to="/">Back to Index</Link>
        <button
          className="btn btn-danger pull-xs-right"
          onClick={this.onDeleteClick.bind(this)}
        >
          Delete Post
        </button>
        <h3>{post.title}</h3>
        <h6>Categories: {post.categories}</h6>
        <p>{post.content}</p>
      </div>
    );
  }
}

// posts is the only prop we care about on "state," so we can use the destructuring syntax
// We always talk about "state" being the first argument mapStateToProps receives (the name is by convention btw)
// However, it also receives a second arugment, which we call ownProps by convention
// ownProps is the props object that is headed to the PostsShow component
// Within the PostsShow component, ownProps === this.props
function mapStateToProps({ posts }, ownProps) {
  return { 'post': posts[ownProps.match.params.id] };
}

export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow);
