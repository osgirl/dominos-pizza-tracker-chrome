'use strict';

chrome.runtime.onInstalled.addListener(function (details) {
  console.log('previousVersion', details.previousVersion);
});

chrome.browserAction.setBadgeText({ text: '\'Allo' });

console.log('\'Allo \'Allo! Event Page for Browser Action');

function start(url, alarmInfo={periodInMinutes: 0.2}) {
  chrome.alarms.create("pizza", alarmInfo);
}

function stop() {
  chrome.storage.sync.set({ url: '' });
  chrome.alarms.clearAll();
}

function handleStatus(status) {
  // Store the recent status to make it available for use by
  // the popup frontend
  chrome.storage.sync.set(status);
}

function getStatus(url) {
  if (!url) {
    return;
  }

  const idToMessage = {
    1: '?',
    2: '?',
    6: 'ordered',
    5: 'baking',
    8: 'quality check',
    9: 'delivered',
    3: 'delivered'
  }

  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, false);
  xhr.send();

  var result = JSON.parse(xhr.responseText);
  var status = {
    id: result.statusId,
    message: idToMessage[result.statusId]
  };

  chrome.storage.sync.set(status);
};

module.exports = {
  getStatus: getStatus,
  handleStatus: handleStatus,
  stop: stop,
  start: start,
};
