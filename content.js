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

function appendBlockingScript() {
  var script = document.createElement('script');
  script.appendChild(document.createTextNode('(' + removeVideoAds + ')();'));
  (document.body || document.head || document.documentElement).appendChild(script);
  setTimeout(function() {
      updateSettings();
  }, 4000);
}

if (isFirefox) {
  var onOff = browser.storage.sync.get("onOffTTV");
  onOff.then(
    (res) => {
      if (res && res.onOffTTV) {
        if (res.onOffTTV == "true") {
          var s = document.createElement('script');
          s.src = browser.runtime.getURL('remove_video_ads.js');
          s.onload = function() {
            console.log("Blocking ads...");
          };
          (document.head || document.documentElement).appendChild(s);
        }
      } else {
        var s = document.createElement('script');
        s.src = browser.runtime.getURL('remove_video_ads.js');
        s.onload = function() {
          console.log("Blocking ads...");
        };
        (document.head || document.documentElement).appendChild(s);
      }
    },
    (err) => {
      var s = document.createElement('script');
      s.src = browser.runtime.getURL('remove_video_ads.js');
      s.onload = function() {
        console.log("Blocking ads...");
      };
      (document.head || document.documentElement).appendChild(s);
    }
  );
} else {
  chrome.storage.local.get(["onOffTTV"], function (result) {
    if (chrome.runtime.lastError) {
      var s = document.createElement('script');
      s.src = chrome.runtime.getURL('remove_video_ads.js');
      s.onload = function() {
        console.log("Blocking ads...");
      };
      (document.head || document.documentElement).appendChild(s);
      return;
    }
    if (result && result.onOffTTV) {
      if (result.onOffTTV == "true") {
        var s = document.createElement('script');
        s.src = chrome.runtime.getURL('remove_video_ads.js');
        s.onload = function() {
          console.log("Blocking ads...");
        };
        (document.head || document.documentElement).appendChild(s);
      }
    } else {
      var s = document.createElement('script');
      s.src = chrome.runtime.getURL('remove_video_ads.js');
      s.onload = function() {
        console.log("Blocking ads...");
      };
      (document.head || document.documentElement).appendChild(s);
    }
  });
}