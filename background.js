function expireOldEntries() {
  chrome.storage.local.get(null, items => {
    const now = Date.now();
    const keysToRemove = [];

    Object.keys(items).forEach(key => {
      const rawValue = items[key];
      let info = rawValue;

      if (typeof rawValue === 'string') {
        try {
          info = JSON.parse(rawValue);
        } catch (err) {
          info = null;
        }
      }

      if (info && typeof info === 'object' && typeof info.expire === 'number' && now > info.expire) {
        keysToRemove.push(key);
      }
    });

    if (keysToRemove.length) {
      chrome.storage.local.remove(keysToRemove);
    }
  });
}

function handleGetAllLocalStorage(sendResponse) {
  chrome.storage.local.get(null, items => {
    sendResponse({ data: items });
  });
}

function handleGetLocalStorage(key, sendResponse) {
  chrome.storage.local.get([key], items => {
    sendResponse({ data: items[key] });
  });
}

function handleSetLocalStorage(key, value, sendResponse) {
  const toStore = {};
  toStore[key] = String(value);

  chrome.storage.local.set(toStore, () => {
    expireOldEntries();
    sendResponse({});
  });
}

function handleGetUserData(usernames, sendResponse) {
  const keys = Array.isArray(usernames) ? usernames : [];

  chrome.storage.local.get(keys, items => {
    const results = {};
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      results[key] = items[key];
    }
    sendResponse({ data: results });
  });
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (!request || !request.method) {
    sendResponse({});
    return;
  }

  if (request.method === 'getAllLocalStorage') {
    handleGetAllLocalStorage(sendResponse);
    return true;
  }

  if (request.method === 'getLocalStorage') {
    handleGetLocalStorage(request.key, sendResponse);
    return true;
  }

  if (request.method === 'setLocalStorage') {
    handleSetLocalStorage(request.key, request.value, sendResponse);
    return true;
  }

  if (request.method === 'getUserData') {
    handleGetUserData(request.usernames, sendResponse);
    return true;
  }

  sendResponse({});
  return false;
});

expireOldEntries();
