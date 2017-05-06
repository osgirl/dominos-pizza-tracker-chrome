'use strict';

chrome.runtime.onInstalled.addListener(function (details) {
  console.log('previousVersion', details.previousVersion);
});

chrome.browserAction.setBadgeText({ text: '\'Allo' });

chrome.tabs.onUpdated.addListener(handleNewTab);

function handleNewTab(_, changeInfo) {
  // Make sure that changeinfo is not undefined, which might happen if
  // the tab url did not actually change but something else caused an update.
  // The dominos.co.uk/pizzatracker url matches all urls: http[s] and [www.]
  if (changeInfo.url && changeInfo.url.toLowerCase().includes('dominos.co.uk/pizzatracker')) {
    chrome.storage.sync.set({ url: changeInfo.url });
  };
};

function start(url, alarmInfo={periodInMinutes: 0.2}) {
  chrome.alarms.create('pizza', alarmInfo);
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
  xhr.open('GET', url, false);
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
  handleNewTab: handleNewTab,
  stop: stop,
  start: start,
};
