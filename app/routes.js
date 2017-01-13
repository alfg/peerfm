// @flow
import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import AddPage from './containers/AddPage';
import HomePage from './containers/HomePage';
import PlaylistPage from './containers/PlaylistPage';
import SettingsPage from './containers/SettingsPage';


export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="/library" component={HomePage} />
    <Route path="/add" component={AddPage} />
    <Route path="/playlist" component={PlaylistPage} />
    <Route path="/settings" component={SettingsPage} />
  </Route>
);
