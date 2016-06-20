import { combineReducers } from 'redux';
import player from './player';
import playlists from './playlists';

const rootReducer = combineReducers({
  player,
  playlists
});

export default rootReducer;
