import fs from 'fs';
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import styles from './Track.module.css';


export default class Track extends Component {
  static propTypes = {
    track: PropTypes.object,
    setTrackUrl: PropTypes.func.isRequired,
    isPlaying: PropTypes.bool,
    getFileProgress: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      progress: 0
    }
  }

  componentDidMount() {
    var timer = setInterval(() => {
      if (this.state.progress === 100) clearInterval(timer);
      this.props.getFileProgress(this.props.track, (progress) => {
        this.setState({ progress: progress });
      });
    }, 1000);

  }

  handleClick() {
    if (this.state.progress !== 100 && !this.props.isPlaying) {
      this.props.downloadTrack(this.props.track);
      var retry = setInterval(() => {
        if (this.state.progress > 10) {
          this.props.setTrackUrl(this.props.trackId, !this.props.isPlaying);
          clearInterval(retry);
        }
      }, 1000);
    } else {
      this.props.setTrackUrl(this.props.trackId, !this.props.isPlaying);
    }
  }

  render() {
    const { track, isPlaying } = this.props;
    const { progress } = this.state;
    return (
      <div className={styles.track}>
          <div className={styles.play} onClick={this.handleClick}>
            <i className={isPlaying ? "fa fa-pause-circle" : "fa fa-play-circle"}></i>
          </div>
          <div className={isPlaying ? `${styles.title} ${styles.playing}` : styles.title}>{track.name}</div>
          <div className={progress === 100 ? `${styles.trackProgress} ${styles.green}` : styles.trackProgress}>{this.state.progress}%</div>
          <div className={styles.trackLength}>0:00</div>
      </div>
    );
  }
}
