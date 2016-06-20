export const PLAYLISTS = 'PLAYLISTS';

export function setHomePlaylist(playlist) {
  console.log('action:fetchPlaylists');
  return {
    type: PLAYLISTS,
    home: playlist
  };
}
