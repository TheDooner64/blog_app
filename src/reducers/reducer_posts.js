import _ from 'lodash'

import { FETCH_POSTS, FETCH_POST, DELETE_POST } from '../actions'

export default function(state = {}, action) {
  switch (action.type) {
  case FETCH_POST:
    // If we didn't use ES6 syntax, we could do this
    // const newState = { ...state };
    // const post = action.payload.data;
    // newState[post.id] = post;
    // return newState;

    // Preserve the original state, so we don't throw away all of the posts we already received
    // The brackets around id use ES6 key interpolation
    return { ...state, [action.payload.data.id]: action.payload.data };
  case FETCH_POSTS:
    // mapKeys is a lodash function that can transform an array into an object based on our key of choice (i.e. id)
    return _.mapKeys(action.payload.data, 'id');
  // After a post is deleted, we'll want to update our local state for a better user experience (i.e. no stale data)
  // The delete action returns the id of the post we deleted, so we essentially just need to remove that from our state
  case DELETE_POST:
    // This omid method will remove the key that we pass from our state object
    // Note, it doesn't manipulate our original state object, it returns a new state object w/o the deleted id
    // This is another helpful reason to use a state object instead of an array
    return _.omit(state, action.payload);
  default:
    return state;
  }
}
