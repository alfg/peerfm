// import TorrentClient from '../core/TorrentClient';
import _ from 'lodash';
import config from '../config.json';
import storage from '../core/Storage';


export default class PlaylistService {

  constructor() {
    // this.tc = new TorrentClient(config.defaultPlaylist);
    // this.playlists = config.playlists;
    storage.getItem('playlists', (playlists) => {
      console.log(playlists);
    });

    storage.exists('playlists', (key) => {
      if (!key) {
        const arr = [];
        storage.setItem('playlists', arr, () => {
          console.log('Playlists storage created.');
        });
      }
    });
  }

  getHomePlaylists(cb) {
    cb(this.playlists);
    // this.tc.on('ready', () => {
    //   this.tc.getPlaylists((data) => {
    //     cb(data);
    //   });
    // });
  }

  loadPlaylists(cb) {
    storage.getItem('playlists', (playlists) => {
      cb(playlists);
    });
  }

  savePlaylist(playlist, cb) {
    storage.getItem('playlists', (playlists) => {
      playlists.push(playlist);
      storage.setItem('playlists', playlists, (val) => {
        cb(val);
      });
    });
  }

  removePlaylist(magnetUri, cb) {
    storage.getItem('playlists', (playlists) => {
      const newPlaylists = _.reject(playlists, { url: magnetUri });
      storage.setItem('playlists', newPlaylists, (val) => {
        cb(val);
      });
    });
  }

  playlistExists(magnetUri, cb) {
    storage.getItem('playlists', (playlists) => {
      return cb(_.some(playlists, { url: magnetUri }));
    });
  }
}
