import EventEmitter from 'events';
import torrentStream from 'torrent-stream';
import fs from 'fs';
import path from 'path';
import _ from 'lodash';

const options = {
  connections: 100,
  upload: 10,
  tmp: '/tmp',
  verify: true,
  dht: true,
  tracker: true,
  trackers: [
    'udp://tracker.openbittorrent.com:80',
    'udp://open.demonii.com:1337',
    'udp://tracker.coppersurfer.tk:6969'
  ]
};

const allowedFiles = ['.mp3', '.flac'];  // Must contain .

export default class TorrentClient extends EventEmitter {

  constructor(magnet) {
    super(magnet);
    this.getTracks = this.getTracks.bind(this);
    this.getPlaylists = this.getPlaylists.bind(this);
    this.getMetadata = this.getMetadata.bind(this);
    this.getSwarm = this.getSwarm.bind(this);
    this.downloadPlaylist = this.downloadPlaylist.bind(this);

    this.engine = torrentStream(magnet, options);
    this.engine.on('ready', this.onReady.bind(this));
    this.engine.on('download', this.onDownload.bind(this));
    this.engine.on('upload', this.onUpload.bind(this));
    this.engine.on('torrent', this.onTorrent.bind(this));
    this.engine.on('idle', this.onIdle.bind(this));
    this.engine.swarm.on('wire', this.onWire.bind(this));
  }

  onReady() {
    console.log('onready');
    this.getTracks();
    this.getMetadata();
    this.emit('ready');
  }

  onDownload(piece) {
    console.log('download', piece);
    this.emit('onDownload');
  }

  onUpload(piece) {
    console.log('upload', piece);
    this.emit('onUpload');
  }

  onTorrent(fn) {
    console.log('torrent', fn);
    this.emit('onTorrent');
  }

  onIdle(fn) {
    console.log('idle', fn);
    this.emit('onIdle');
  }

  onWire = (wire) => {
    // console.log('wire', wire);
    this.emit('wire', wire);
  };

  getSwarm = () => {
    return this.engine.swarm;
  };

  downloadPlaylist(cb) {
    console.log('downloading playlist');
    this.engine.files.forEach( (file) => {
      const stream = file.createReadStream();
    });
  }

  downloadTrack(file, cb) {
    console.log('downloading track');
    const stream = file.createReadStream();
  }

  getMetadata() {
    console.log('getting metadata', this.engine);
    this.emit('metadata', this.engine.torrent);
  }

  getTracks() {
    console.log('getting tracks');
    const filtered = _.filter(this.engine.files, (o) => {
      return _.includes(allowedFiles, path.extname(o.name));
    });
    this.emit('tracks', filtered);
    return filtered;
  }

  getFileProgress = (file, cb) => {
    // const pieceLength = this.engine.pieceLength;

    const fileStart = file.offset;
    const fileEnd = file.offset + file.length;
    // const firstPiece = Math.floor(fileStart / pieceLength);
    // const lastPiece = Math.floor((fileEnd - 1) / pieceLength);

    const url = `${this.engine.path}/${file.path}`;
    fs.stat(url, (err, stat) => {
      const percent = Math.round(((stat.size / (fileEnd - fileStart)) * 100));
      cb(percent);
    });
  };

  getPlaylists(cb) {
    console.log('getting playlists');
    this.engine.files.forEach((file) => {
      const stream = file.createReadStream();
      stream.on('readable', () => {
        const output = stream.read();
        if (output !== null) cb(JSON.parse(output.toString()));
      });
    });
    // const allowedFiles = ['.json'];  // Must contain .
    // var filtered = _.filter(this.engine.files, function(o) {
    //     return _.includes(allowedFiles, path.extname(o.name));
    // });
    // this.emit('playlists', filtered);
    // return filtered;
  }
}
