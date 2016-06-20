import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import styles from './Nav.module.css';


export default class Nav extends Component {

  static propTypes = {
    transform: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.handleScroll = this.handleScroll.bind(this);
    this.state = {
      transform: ''
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = (event) => {
    const scrollTop = event.srcElement.body.scrollTop;
    const opacity = scrollTop / window.innerHeight;

    const bg = {
      backgroundColor: 'rgba(0, 0, 0, ' + opacity + ')'
    };

    this.setState({
      transform: bg
    });
  };

  formatBytes(bytes, decimals) {
    if (bytes == 0) return '0 Byte';
    var k = 1000;
    var dm = decimals + 1 || 3;
    var sizes = ['Bytes', 'KBPS', 'MBPS', 'GBPS', 'TBPS'];
    var i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  render() {
    var transform;
    if (this.state.transform) {
      transform = this.state.transform;
    }

    const { download, upload } = this.props;
    const swarm = this.props.swarm || null;

    return (
      <div className={styles.nav} onScroll={this.handleScroll} style={transform}>
        <ul className={styles.stats}>
          <li><span><i className="fa fa-globe"></i> { swarm !== null ? swarm.wires.length : 0 } Peers</span></li>
          <li><span ><i className="fa fa-arrow-down"></i> { download ? this.formatBytes(download) : '0 kbps' }</span></li>
          <li><span><i className="fa fa-arrow-up"></i> { upload ? this.formatBytes(upload) : '0 kbps' }</span></li>
        </ul>
      </div>
    );
  }
}
