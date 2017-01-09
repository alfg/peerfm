import { PLAYLISTS } from '../actions/playlists';

const initialState = {
  home: [],
};

export default function track(state = initialState, action) {
  switch (action.type) {
    case PLAYLISTS:
      return Object.assign({}, state, {
        home: action.home
      });

    default:
      return state;
  }
}
