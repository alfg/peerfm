import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import player from './player';
import playlists from './playlists';

const rootReducer = combineReducers({
  player,
  playlists,
  routing
});

export default rootReducer;
