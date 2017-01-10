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
    ps.getHomePlaylists((data) => {
      this.props.setHomePlaylist(data);
    });
  }

  render() {
    const playlistNodes = this.props.playlists.home.map(v =>
      <PlaylistCard
        key={v.id}
        img={v.thumbnail}
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
          <h2>Browse</h2>
          {playlistNodes.length !== 0 ? playlistNodes : 'Loading playlists...' }
        </div>
      </div>
    );
  }
}
