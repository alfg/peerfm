import React, { Component, PropTypes } from 'react';
import Nav from './common/Nav.js';
import SideNav from './common/SideNav.js';
import styles from './Home.module.css';
import PlaylistCard from './PlaylistCard.js';
import PlaylistService from '../services/PlaylistService.js';

export default class Home extends Component {

  static propTypes = {
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const ps = new PlaylistService();
    ps.getHomePlaylists((data) => {
      this.props.setHomePlaylist(data);
    });
  }

  render() {
    const playlistNodes = this.props.playlists.home.map(v => {
      return (
        <PlaylistCard
          key={v.id}
          img={v.thumbnail}
          title={v.title}
          subtitle={v.subtitle}
          url={v.url}
        />
      );
    });

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
