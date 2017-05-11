const expect = require('chai').expect;
const assert = require('chai').assert;
const nock = require('nock');

global.chrome = require('sinon-chrome');

const {
  getStatus,
  handleStatus,
  start,
  stop,
  handleNewTab
} = require('./background');


describe('background', function () {
  beforeEach(function () {
    chrome.flush();
  });

 describe('stop', function () {
    it('clears remaining alarms', function () {
      assert.ok(
        chrome.alarms.clearAll.notCalled,
        'alarms should not be cleared yet'
      );
      stop();
      assert.ok(
        chrome.alarms.clearAll.calledOnce,
        'alarms should be cleared'
      );
    });

    it('clears the tracking url from localstorage', function () {
      assert.ok(
        chrome.storage.sync.set.withArgs({ url: '' }).notCalled,
        'storage should not be cleared yet'
      );
      stop();
      assert.ok(
        chrome.storage.sync.set.withArgs({ url: '' }).calledOnce,
        'storage should be cleared'
      );
    });
  });

  describe('start', function () {
    it('starts the alarm timer with default timing information', function () {
      assert.ok(chrome.alarms.create.notCalled, 'alarm should not be created yet');
      start();
      assert.ok(chrome.alarms.create.calledOnce, 'alarm should be created');
    });

    xit('starts the timer with specified timing information', function () {
    });
  });

  describe('getStatus', function () {
    it('returns undefined if there is no url', function () {
      expect(getStatus()).to.be.undefined;
    });

    xit('gets the status of a delivery order given the url', function () {
      const orderStatus = {
        '-1': 'connectionError',
        1: 'cancelled',
        4: 'orderNotFound',
        0: 'init',
        6: 'order',
        7: 'prep',
        5: 'baking',
        8: 'quality',
        10: 'collection',
        2: 'collected',
        9: 'delivery',
        3: 'delivered',
        '-2': 'skipIntro'
      }

      const req = nock('https://dominos.co.uk')
        .get('/pizzaTracker/getOrderStatus/id=32')
        .reply(200, {
          statusId: 4
        });

      expect(req.isDone()).to.be.true;
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

    xit('sets the badge text', function () {
    });

    xit('sends a notification if the status has changed', function () {
    });
  });

  describe('handleNewTab', function () {
    it('sets the tab url in storage if it is a dominos pizza tracker url', function () {
      const url = 'https://dominos.co.uk/pizzatracker?id=329331232414'
      handleNewTab(undefined, { url });
      assert.ok(chrome.storage.sync.set.withArgs({ url }).calledOnce);
    });
  });
});