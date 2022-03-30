//Get extension settings.
//Check if Firefox or not.
const isChromium = typeof chrome !== "undefined";
const isFirefox = typeof browser !== "undefined";

function updateSettings() {
  if (isFirefox) {
    var hideBlockingMessage = browser.storage.sync.get("blockingMessageTTV");
    hideBlockingMessage.then((res) => {
      if (
        res.blockingMessageTTV == "true" ||
        res.blockingMessageTTV == "false"
      ) {
        window.postMessage(
          {
            type: "SetHideBlockingMessage",
            value: res.blockingMessageTTV,
          },
          "*"
        );
      }
    });
  } else {
    chrome.storage.local.get(["blockingMessageTTV"], function (result) {
      if (
        result.blockingMessageTTV == "true" ||
        result.blockingMessageTTV == "false"
      ) {
        window.postMessage(
          {
            type: "SetHideBlockingMessage",
            value: result.blockingMessageTTV,
          },
          "*"
        );
      }
    });
  }
}

function removeVideoAds() {
  chrome.runtime.sendMessage({ text: "runRemoveVideoAds" }, () => {
    setTimeout(updateSettings, 4000);
  });
}

if (isFirefox) {
  var onOff = browser.storage.sync.get("onOffTTV");
  onOff.then(
    (res) => {
      if (res && res.onOffTTV) {
        if (res.onOffTTV == "true") {
          removeVideoAds();
        }
      } else {
        removeVideoAds();
      }
    },
    (err) => {
      removeVideoAds();
    }
  );
} else {
  chrome.storage.local.get(["onOffTTV"], function (result) {
    if (chrome.runtime.lastError) {
      removeVideoAds();
      return;
    }
    if (result && result.onOffTTV) {
      if (result.onOffTTV == "true") {
        removeVideoAds();
      }
    } else {
      removeVideoAds();
    }
  });
}
