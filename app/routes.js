// @flow
import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import AddPage from './containers/AddPage';
import HomePage from './containers/HomePage';
import PlaylistPage from './containers/PlaylistPage';


export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="/browse" component={HomePage} />
    <Route path="/add" component={AddPage} />
    <Route path="/playlist" component={PlaylistPage} />
  </Route>
);
