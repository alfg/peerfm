import React, { Component, PropTypes } from 'react';
import Nav from './common/Nav';
import SideNav from './common/SideNav';
import styles from './Home.module.css';
import PlaylistCard from './PlaylistCard';
import PlaylistService from '../services/PlaylistService';

export default class Home extends Component {

  static propTypes = {
    setHomePlaylist: PropTypes.func,
    playlists: PropTypes.shape({
      home: PropTypes.arrayOf(PropTypes.shape({}))
    })
  };

  componentDidMount() {
    const ps = new PlaylistService();
    // ps.getHomePlaylists((data) => {
    //   this.props.setHomePlaylist(data);
    // });
    ps.loadPlaylists((data) => {
      this.props.setHomePlaylist(data);
    });
  }

  render() {
    const playlistNodes = this.props.playlists.home.map((v, i) =>
      <PlaylistCard
        key={i}
        img="http://placehold.it/400x300"
        title={v.title}
        subtitle={v.subtitle}
        url={v.url}
      />
    );

    return (
      <div className={styles.home}>
        <SideNav />
        <div className={styles.container}>
          <Nav />
          <h2>Library</h2>
          {playlistNodes.length !== 0 ? playlistNodes : 'No Playlists in your library.' }
        </div>
      </div>
    );
  }
}
