import * as AES from 'crypto-js/aes';
import * as UTF8 from 'crypto-js/enc-utf8';

class Storage {
  // constants
  separator = ',.|..{^,..,^}..|.,';
  storageKey = '_092kjcs';
  key = 'kdjoieuiowue';
  /**
   * constructor
   */
  constructor () {
    this.loadFromStorage();
  }
  /**
   * loadFromStorage
   * @return {object}
   */
  loadFromStorage () {
    const data = localStorage.getItem(this.storageKey);

    this.data = this.decrypt(data);
  }
  /**
   * saveToStorage
   * @return {undefined}
   */
  saveToStorage (data) {
    const encryptedData = this.encrypt(JSON.stringify(data));
    localStorage.setItem(this.storageKey, encryptedData);
  }
  /**
   * getItem
   * @param {string} key
   * @return {string|null}
   */
  getItem (key) {
    return this.data[key] || null;
  }
  /**
   * getAllItems
   * @return {object}
   */
  getAllItems () {
    return { ...this.data };
  }
  /**
   * setItem
   * @param {string} key
   * @param {string} value
   * @return {undefined}
   */
  setItem (key, value) {
    this.data[ key ] = value;
  }
  /**
   * deleteItem
   * @param {string} key
   * @return {undefined}
   */
  deleteItem (key) {
    if (typeof this.data === 'object' && this.data.hasOwnProperty(key)) {
      delete this.data[key];
    }
  }
  /**
   * encrypt
   * @param {string} str
   * @return {undefined}
   */
  encrypt (str) {
    const { key, separator } = this;
    const now = (new Date()).getTime().toString();
    const encryptedData = AES.encrypt(str, `${key}${now}`);

    return AES.encrypt(`${encryptedData}${separator}${now}`, key);
  }
  /**
   * decrypt
   * @param {string} str
   * @return {object}
   */
  decrypt (str) {
    try {
      // get constants
      const { key, separator } = this;

      // get first round decrypted data
      const rd1Bytes = AES.decrypt(str, key);
      const rd1StringifiedData = rd1Bytes.toString(UTF8);

      // extract salt and original encrypted data
      const exploded = rd1StringifiedData.split(separator);
      const salt = exploded[1];
      const extractedData = exploded[0];

      // get second round decrypted data
      const rd2Bytes = AES.decrypt(extractedData, `${key}${salt}`);
      const rd2StringifiedData = rd2Bytes.toString(UTF8);

      // parse
      return JSON.parse(rd2StringifiedData);
    } catch (e) {
      return {};
    }
  }
}

const storage = new Storage();

// exports
export const getItem = storage.getItem.bind(storage);
export const saveItem = storage.setItem.bind(storage);
export const getAllItems = storage.getAllItems.bind(storage);
export const saveToLocalStorage = storage.saveToStorage.bind(storage);
