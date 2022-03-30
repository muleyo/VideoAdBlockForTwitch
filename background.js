// Show options and install message on first install only.
function handleInstalled(details) {
  if (details.reason == "install") {
    let createData = {
      focused: true,
      type: "popup",
      url: "popup/install.html",
      width: 365,
      height: 750,
    };

    chrome.windows.create(createData);
  }
}

chrome.runtime.onInstalled.addListener(handleInstalled);

/*chrome.runtime.onMessage.addListener((msg, sender) => {
  if (msg.text == "runRemoveVideoAds") {
    chrome.scripting.executeScript({
      target: { tabId: sender.tab.id },
      files: ["remove_video_ads.js"],
    });
  }
});
*/