import localforage from 'localforage';
import _ from 'lodash';

localforage.config({
  name: 'fm',
  driver: localforage.LOCALSTORAGE,
  size: 4980736  // Default.
});

const storage = {

  getItem(key, cb) {
    localforage.getItem(key).then((val) => {
      console.log(val);
      return cb(val);
    }).catch((err) => {
      cb(err);
    });
  },

  setItem(key, value, cb) {
    console.log(value);
    localforage.setItem(key, value).then((val) =>
      cb(val)
    )
    .catch((err) =>
      cb(err)
    );
  },

  exists(key, cb) {
    localforage.keys().then((keys) => {
      console.log(keys);
      if (_.includes(keys, key)) {
        console.log('exists');
        return cb(true);
      }
      console.log('not exists');
      return cb(false);
    })
    .catch((err) => {
      console.log(err);
      cb(false);
    });
  },

  // addItem(key, value, cb) {

  // }
};

export default storage;
