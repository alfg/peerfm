import TorrentClient from '../core/TorrentClient';
import config from '../config.json';


export default class PlaylistService {

  constructor() {
    this.tc = new TorrentClient(config.defaultPlaylist);
  }

  getHomePlaylists(cb) {
    this.tc.on('ready', () => {
      this.tc.getPlaylists((data) => {
        cb(data);
      });
    });
  }
}
