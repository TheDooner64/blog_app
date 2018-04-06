import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

// BrowserRouter is the library that interacts with our "History" object
// It essentially parses the changes to a URL after a user action and decides which components it needs to render
// Route is a react component that we can render inside of any other react component
// The purpose of the Route component is provide the configuration to ReactRouter that will determine
// what to do based on URL changes (i.e. which component to render)
// Ultimately, the URL contains a critical piece of state for our application (e.g. which post ID are they looking at)
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import promise from 'redux-promise'

import reducers from './reducers';
import PostsIndex from './components/posts_index'
import PostsNew from './components/posts_new'
import PostsShow from './components/posts_show'

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

// React router sort of fuzzily matches the path against the current path the user is looking at
// So you may see dupliate content rendered if you have overlapping paths
// The Switch component solves this for us by taking in a collection of different routes
// It onlys matches the first route that matches the current URL, so you want to put the most specific routes first

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/posts/new" component={PostsNew} />
          <Route path="/posts/:id" component={PostsShow} />
          <Route path="/" component={PostsIndex} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>
  , document.querySelector('.container'));
