// import TorrentClient from '../core/TorrentClient';
import config from '../config.json';


export default class PlaylistService {

  constructor() {
    // this.tc = new TorrentClient(config.defaultPlaylist);
    this.playlists = config.playlists;
  }

  getHomePlaylists(cb) {
    console.log(this.playlists);
    cb(this.playlists);
    // this.tc.on('ready', () => {
    //   this.tc.getPlaylists((data) => {
    //     cb(data);
    //   });
    // });
  }
}
