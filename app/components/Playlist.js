import React, { Component, PropTypes } from 'react';
import Nav from './common/Nav';
import SideNav from './common/SideNav';
import styles from './Playlist.module.css';
import Track from './Track';
import TorrentClient from '../core/TorrentClient';
import PlaylistService from '../services/PlaylistService';

export default class Playlist extends Component {

  static propTypes = {
    location: PropTypes.shape({
      query: PropTypes.shape({
        magnetUri: PropTypes.string
      })
    }),
    player: PropTypes.shape({}),
    setPlaylist: PropTypes.func,
    setMetadata: PropTypes.func,
    setTrackUrl: PropTypes.func
  };

  constructor(props) {
    super(props);

    this.magnetUri = this.props.location.query.magnetUri;
    this.tc = new TorrentClient(this.magnetUri);
    this.ps = new PlaylistService();

    this.state = {
      metadata: null,
      tracks: [],
      swarm: null,
      playlistSaved: false
    };
    this.timer = null;
    this.swarmInterval = 2000;
  }

  componentDidMount() {
    this.tc.on('tracks', (tracks) => {
      this.setState({ tracks });
      this.props.setPlaylist(tracks);
    });

    this.tc.on('metadata', (metadata) => {
      this.setState({ metadata });
      this.props.setMetadata(metadata);
    });

    this.timer = setInterval(() => {
      this.setState({ swarm: this.tc.getSwarm() });
    }, this.swarmInterval);

    this.ps.playlistExists(this.magnetUri, (state) => {
      this.setState({ playlistSaved: state });
    });

    // setInterval(() => {
    //   this.tc.getProgress(() => {
    //     console.log('progress update');
    //   });
    // }, 5000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
    this.timer = false;
  }

  handleSavePlaylist = () => {
    if (this.state.playlistSaved) {
      this.ps.removePlaylist(this.magnetUri, (val) => {
        console.log('Removed playlist.');
        this.setState({ playlistSaved: false });
      });
    } else {
      const playlist = {
        title: this.state.metadata.name,
        url: this.magnetUri
      };

      this.ps.savePlaylist(playlist, (val) => {
        console.log('Saved playlist.', val);
        this.setState({ playlistSaved: true });
      });
    }
  }

  render() {
    const metadata = this.state.metadata;
    const { setTrackUrl } = this.props;
    const { downloadPlaylist, downloadTrack, getFileProgress } = this.tc;

    const trackNodes = this.state.tracks.map((v, i) => {
      const isCurrentTrackPlaying = this.props.player.playing && this.props.player.track === i;
      return (
        <Track
          key={i}
          trackId={i}
          track={v}
          setTrackUrl={setTrackUrl}
          isPlaying={isCurrentTrackPlaying}
          getFileProgress={getFileProgress}
          downloadTrack={downloadTrack}
        />
      );
    });

    const swarm = this.state.swarm;
    const downloadSpeed = swarm !== null ? parseInt(swarm.downloadSpeed(), 10) : 0;
    const uploadSpeed = swarm !== null ? parseInt(swarm.uploadSpeed(), 10) : 0;

    return (
      <div className={styles.playlist}>
        <SideNav />
        <div className={styles.container}>
          <Nav
            swarm={swarm}
            download={downloadSpeed}
            upload={uploadSpeed}
          />

          <div className={styles.cover}>
            <h2>{metadata !== null ? metadata.name : 'Loading playlist...'}</h2>
            <div className={styles.buttons}>
              <button className={styles.button} onClick={downloadPlaylist}><i className="fa fa-download" /> Download</button>
              <button className={styles.button} onClick={this.handleSavePlaylist}><i className="fa fa-save" /> { this.state.playlistSaved ? 'Remove Playlist' : 'Save Playlist' }</button>
            </div>
          </div>
          {trackNodes}
        </div>
      </div>
    );
  }
}
