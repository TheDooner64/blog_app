import { combineReducers } from 'redux';

// Redux form handles a lot of form validation of the inputs, as well as the form submission
// It saves us from having to wire up a bunch of action creators
// We MUST use the key "form" since all of our forms will be looking for this piece of state
import { reducer as formReducer } from 'redux-form'

import PostsReducer from './reducer_posts'

const rootReducer = combineReducers({
  'posts': PostsReducer,
  'form': formReducer
});

export default rootReducer;
