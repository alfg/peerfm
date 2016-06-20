import React, { Component, PropTypes } from 'react';
import ReactPlayer from 'react-player';
import styles from './AudioPlayer.module.css';


export default class AudioPlayer extends Component {

  static propTypes = {
    player: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.playPause = this.playPause.bind(this);
    this.playNext = this.playNext.bind(this);
    this.playPrev = this.playPrev.bind(this);
    this.mute = this.mute.bind(this);
    this.setVolume = this.setVolume.bind(this);
    this.onProgress = this.onProgress.bind(this);
    this.onEnded = this.onEnded.bind(this);
    this.onSeekMouseDown = this.onSeekMouseDown.bind(this);
    this.onSeekMouseUp = this.onSeekMouseUp.bind(this);
    this.onSeekChange = this.onSeekChange.bind(this);
    this.state = {
      playing: false,
      volume: 0.8,
      duration: 0,
      played: 0,
      loaded: 0,
      mutedVol: 0
    };
  }

  componentDidMount() {
    window.addEventListener('keydown', this.onKeyPress, false);
  }

  onProgress = state => {
    // We only want to update time slider if we are not currently seeking
    if (!this.state.seeking) {
      this.setState(state);
    }
  };

  onEnded = (e) => {
    console.log('ended');
    this.setState({ playing: true });
    this.playNext();
  };

  onKeyPress = (e) => {
    switch (e.keyCode) {
      case 32:
        this.playPause();
        e.preventDefault();
        break;
      case 37:
        this.playPrev();
        e.preventDefault();
        break;
      case 39:
        this.playNext();
        e.preventDefault();
        break;
      default:
        // e.preventDefault();  // Prevent scroll when pressing spacebar.
    }
  };

  onSeekMouseDown = (e) => {
    this.setState({ seeking: true })
  };

  onSeekChange = (e) => {
    this.setState({ played: parseFloat(e.target.value) })
  };

  onSeekMouseUp = (e) => {
    this.setState({ seeking: false })
    this.refs.player.seekTo(parseFloat(e.target.value))
  };

  playPause = () => {
    const playing = !this.state.playing;
    this.setState({ playing: playing });
    this.props.setTrackUrl(this.props.player.track, playing);
  };

  playNext() {
    console.log('playNext');
    var nextTrack = this.props.player.track + 1;
    console.log(nextTrack);
    nextTrack = nextTrack >= this.props.player.playlist.length ? 0 : nextTrack;
    this.props.setTrackUrl(nextTrack, this.state.playing);
  }

  playPrev() {
    var prevTrack = this.props.player.track - 1;
    prevTrack = prevTrack < 0 ? 0 : prevTrack;
    this.props.setTrackUrl(prevTrack, this.state.playing);
  }

  setVolume = (e) => {
    this.setState({ volume: parseFloat(e.target.value) });
  };

  mute() {
      if (this.state.volume === 0) {
          this.setState({ volume: this.state.mutedVol });
      } else {
          this.setState({ mutedVol: this.state.volume, volume: 0 });
      }
  }

  render() {
    const { track, playing, playlist, metadata } = this.props.player;
    const { volume, duration, played } = this.state;
    const url = track != null ? `/tmp/torrent-stream/${metadata.infoHash}/${playlist[track].path}` : null;

    return (
        <div className={styles.container} onKeyPress={this.onKeyPress}>
            <div className={styles.player}>
                <ReactPlayer
                  ref='player'
                  url={url}
                  playing={playing}
                  volume={volume}
                  height="100%"
                  width="100%"
                  onPlay={() => this.setState({ playing: true })}
                  onPause={() => this.setState({ playing: false })}
                  onBuffer={() => console.log('onBuffer')}
                  onEnded={this.onEnded}
                  onError={(e) => console.log('onError', e)}
                  onProgress={this.onProgress}
                  onDuration={(duration) => this.setState({ duration })}
                />
            </div>
            <div className={styles.controls}>
                <button className={styles.back} onClick={this.playPrev}><i className="fa fa-step-backward"></i></button>
                <button className={styles.play} onClick={this.playPause}><i className={this.state.playing ? 'fa fa-pause' : 'fa fa-play'}></i></button>
                <button className={styles.forward} onClick={this.playNext}><i className="fa fa-step-forward"></i></button>
            </div>

            <div className={styles.scrub}>
                <table><tbody><tr>
                  <td className={styles.duration}>{format(duration * played)}</td>
                  <td>
                      <input
                        type="range" min={0} max={1} step="any"
                        value={this.state.played}
                        onMouseDown={this.onSeekMouseDown}
                        onChange={this.onSeekChange}
                        onMouseUp={this.onSeekMouseUp}
                      />
                  </td>
                  <td className={styles.duration}>{format(duration * (1 - played))}</td>
                </tr></tbody></table>
            </div>

            <div className={styles.volume}>
                <table><tbody>
                <tr><td>
                    <div className={styles.controls}>
                      <button className={styles.mute} onClick={this.mute}><i className={this.state.volume === 0 ? "fa fa-volume-off" : "fa fa-volume-up"}></i></button>
                    </div>
                </td>
                <td>
                    <input
                      type="range" min={0} max={1} step="any"
                      value={this.state.volume}
                      onChange={this.setVolume}
                    />
                </td></tr></tbody></table>
            </div>
        </div>
    );
  }
}

function format (seconds) {
  const date = new Date(seconds * 1000)
  const hh = date.getHours()
  const mm = date.getMinutes()
  const ss = pad(date.getSeconds())
  if (hh) {
    return `${pad(mm)}:${ss}`
  }
  return `${mm}:${ss}`
}

function pad (string) {
  return ('0' + string).slice(-2)
}
