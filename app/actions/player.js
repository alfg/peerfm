export const TRACK_URL = 'TRACK_URL';
export const PLAYLIST = 'PLAYLIST';
export const METADATA = 'METADATA';

export function setTrackUrl(track, playing) {
  console.log('action:setTrackUrl', track);
  return {
    type: TRACK_URL,
    track: track,
    playing: playing
  };
}

export function setPlaylist(playlist) {
  console.log('action:setPlaylist', playlist);
  return {
    type: PLAYLIST,
    playlist: playlist
  };
}

export function setMetadata(metadata) {
  console.log('action:setMetadata', metadata);
  return {
    type: METADATA,
    metadata: metadata
  };
}
