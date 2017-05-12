'use strict';

chrome.storage.onChanged.addListener((changes, namespace) => {
  for (key in changes) {
    if (key == 'message') {
      document.getElementById('status').innerHTML = changes[key].newValue
    }
  }
});
