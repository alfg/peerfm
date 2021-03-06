import React, { Component } from 'react';
import { Link } from 'react-router';
import Nav from './common/Nav';
import SideNav from './common/SideNav';
import styles from './AddPlaylist.module.css';

export default class AddPlaylist extends Component {

  static propTypes = {
  };

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      magnet: ''
    };
  }

  componentDidMount() {
  }

  handleChange(e) {
    this.setState({ magnet: e.target.value });
  }

  validateMagnet() {
    return this.state.magnet.match(/magnet:\?xt=urn:[a-z0-9]+:[a-z0-9]{32}/i) !== null;
  }

  render() {
    let goLink;
    if (this.validateMagnet()) {
      goLink = (
        <div className={styles.buttons}>
          <Link className={styles.button} to={{ pathname: '/playlist', query: { magnetUri: this.state.magnet } }}>GO</Link>
        </div>
      );
    }
    return (
      <div className={styles.addPlaylist}>
        <SideNav />
        <div className={styles.container}>
          <Nav />
          <h2>Add Playlist</h2>

          <h4>Enter a Magnet Link</h4>
          <input className={styles.magnetInput} type="text" value={this.state.magnet} onChange={this.handleChange} />
          {goLink}
        </div>
      </div>
    );
  }
}
