// Browser helpers
const isChromium = typeof window.chrome !== "undefined";
const isFirefox = typeof window.browser !== "undefined";
const browser = isFirefox ? window.browser : window.chrome;

// Get extension settings
function updateSettings() {
  const setHideBlockingMessage = ({ blockingMessageTTV }) => {
    if (blockingMessageTTV === "true" || blockingMessageTTV === "false") {
      postMessage(
        {
          type: "SetHideBlockingMessage",
          value: blockingMessageTTV,
        },
        "*"
      );
    }
  };

  if (isFirefox) {
    browser.storage.local
      .get("blockingMessageTTV")
      .then(setHideBlockingMessage);
  } else {
    browser.storage.local.get(["blockingMessageTTV"], (result) =>
      setHideBlockingMessage(result)
    );
  }
}

function appendBlockingScript() {
  const script = document.createElement("script");
  script.src = browser.runtime.getURL("remove_video_ads.js");
  script.onload = () => setTimeout(updateSettings, 4000);
  (document.body || document.head || document.documentElement).appendChild(
    script
  );
}

if (isFirefox) {
  browser.storage.local.get("onOffTTV").then(
    (result) => {
      if (result?.onOffTTV) {
        if (result.onOffTTV === "true") {
          appendBlockingScript();
        }
      } else {
        appendBlockingScript();
      }
    },
    (error) => {
      console.error(error);
      appendBlockingScript();
    }
  );
} else {
  browser.storage.local.get(["onOffTTV"], function (result) {
    if (browser.runtime.lastError) {
      console.error(browser.runtime.lastError);
      appendBlockingScript();
      return;
    }
    if (result?.onOffTTV) {
      if (result.onOffTTV === "true") {
        appendBlockingScript();
      }
    } else {
      appendBlockingScript();
    }
  });
}
