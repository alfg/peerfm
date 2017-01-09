import React, { Component, PropTypes } from 'react';
import { ipcRenderer } from 'electron';
import { Link } from 'react-router';
import styles from './SideNav.module.css';

export default class SideNav extends Component {

  static propTypes = {
    transform: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.updateOnlineStatus = this.updateOnlineStatus.bind(this);
    this.state = {
      status: 'offline'
    };
  }

  componentDidMount() {
    window.addEventListener('online', this.updateOnlineStatus);
    window.addEventListener('offline', this.updateOnlineStatus);
    this.updateOnlineStatus();
  }

  updateOnlineStatus() {
    const status = navigator.onLine ? 'online' : 'offline';
    ipcRenderer.send('online-status-changed', status);
    this.setState({ status });
  }

  render() {
    return (
      <div className={styles.sideNav}>
        <Link to="/" className={styles.logo}>RadicalFM</Link>

        <ul className={styles.navLinks}>
          <li className={styles.title}>Main</li>
          <Link to="/browse" activeClassName={styles.active}><li><i className="fa fa-search" /> Browse</li></Link>
          <Link to="/add" activeClassName={styles.active}><li><i className="fa fa-magnet" /> Add Playlist</li></Link>
        </ul>

        <ul className={styles.status}>
          <li><i className="fa fa-signal" /> <span className={this.state.status}>{this.state.status}</span></li>
        </ul>
      </div>
    );
  }
}
