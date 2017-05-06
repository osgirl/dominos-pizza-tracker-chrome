const expect = require('chai').expect;
const assert = require('chai').assert;
global.chrome = require('sinon-chrome');

const {
  getStatus,
  handleStatus,
  start,
  stop
} = require('./background');


describe('background', function () {
  describe('stop', function () {
    it('clears remaining alarms', function () {
    });

    it('clears the tracking url from localstorage', function () {
    });
  });

  describe('start', function () {
    it('starts the alarm', function () {
    });
  });

  describe('getStatus', function () {
    it('gets the status of a delivery order given the url', function () {
    });
  });

  describe('handleStatus', function () {
    it('sets the status in local storage', function () {
      const theStatus = {
        id: 3,
        message: 'delivered'
      };

      handleStatus(theStatus);

      assert.ok(chrome.storage.sync.set.withArgs(theStatus).calledOnce);
    });

    it('sets the badge text', function () {
    });
  });
});