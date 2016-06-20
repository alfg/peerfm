import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import styles from './PlaylistCard.module.css';


export default class PlaylistCard extends Component {
  static propTypes = {
    img: PropTypes.string,
    title: PropTypes.string,
    subtitle: PropTypes.string,
    url: PropTypes.string,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { title, subtitle, img, url } = this.props;

    return (
      <div className={styles.playlistCard}>
        <Link to="/playlist" query={{ magnetUri: url }}>
            <img className={styles.playlistThumbnail__img} src={img} />
        </Link>
        <div className={styles.playlistCardContent}>
          <div className={styles.playlistCardContent__title}>{title}</div>
          <div className={styles.playlistCardContent__subtitle}>{subtitle}</div>
        </div>
      </div>
    );
  }
}
