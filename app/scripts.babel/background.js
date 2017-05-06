'use strict';

chrome.runtime.onInstalled.addListener(function (details) {
  console.log('previousVersion', details.previousVersion);
});

chrome.browserAction.setBadgeText({ text: '\'Allo' });

console.log('\'Allo \'Allo! Event Page for Browser Action');

function start(url) {
}

function stop() {
}

function handleStatus(status) {
  chrome.storage.sync.set(status);
}

function getStatus(url) {
};

module.exports = {
  getStatus: getStatus,
  handleStatus: handleStatus
};
