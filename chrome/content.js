// Browser helpers
const isChromium = typeof window.chrome !== 'undefined';
const isFirefox = typeof window.browser !== 'undefined';
const browser = isFirefox ? window.browser : window.chrome;

// Get extension settings
function updateSettings() {
    browser.storage.local.get(['blockingMessageTTV','forcedQualityTTV','proxyTTV','proxyQualityTTV', 'adTimeTTV']).then(result => {
        var settings = {
            BannerVisible: true,
            ForcedQuality: null,
            ProxyType: null,
            ProxyQuality: null,
            AdTime: 0
        };
        if (result.blockingMessageTTV === 'true' || result.blockingMessageTTV === 'false') {
            settings.BannerVisible = result.blockingMessageTTV === 'true';
        }
        if (result.forcedQualityTTV) {
            settings.ForcedQuality = result.forcedQualityTTV;
        }
        if (result.proxyTTV) {
            settings.ProxyType = result.proxyTTV;
        }
        if (result.proxyQualityTTV) {
            settings.ProxyQuality = result.proxyQualityTTV;
        }
        if (result.adTimeTTV) {
            settings.AdTime = result.adTimeTTV;
        }
        postMessage({
            type: 'SetTwitchAdblockSettings',
            settings: settings,
        }, '*');
    });
}

window.addEventListener('message', (event) => {
    if (event.data.type && event.data.type == 'SetTwitchAdTime') {
        browser.storage.local.set({adTimeTTV: event.data.adtime});
        console.log("Set ad time to " + event.data.adtime);
    }
});

function appendBlockingScript() {
    const script = document.createElement('script');
    script.src = browser.runtime.getURL('remove_video_ads.js');
    script.onload = updateSettings;
    (document.body || document.head || document.documentElement).appendChild(script);
}

if (isFirefox) {
    browser.storage.local.get('onOffTTV').then(
        (result) => {
            if (result?.onOffTTV) {
                if (result.onOffTTV === 'true') {
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
    browser.storage.local.get(['onOffTTV'], function (result) {
        if (browser.runtime.lastError) {
            console.error(browser.runtime.lastError);
            appendBlockingScript();
            return;
        }
        if (result?.onOffTTV) {
            if (result.onOffTTV === 'true') {
                appendBlockingScript();
            }
        } else {
            appendBlockingScript();
        }
    });
}
