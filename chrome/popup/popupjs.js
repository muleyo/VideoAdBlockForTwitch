'use strict';

const isChromium = typeof window.chrome !== 'undefined';
const isFirefox = typeof window.browser !== 'undefined';
const browser = isFirefox ? window.browser : window.chrome;

var onOff = document.querySelector('input[name=checkbox_ad]');
var blockingMessage = document.querySelector('input[name=checkbox_ad_msg]');
var forcedQuality = document.querySelector('select[name=dropdown_forced_quality]');
var proxy = document.querySelector('select[name=dropdown_proxy]');
var proxyQuality = document.querySelector('select[name=dropdown_proxy_quality]');

var allSettingsElements = [onOff,blockingMessage,forcedQuality,proxy,proxyQuality];

for (var i = 0; i < allSettingsElements.length; i++) {
    if (allSettingsElements[i]) {
        allSettingsElements[i].addEventListener('change', function() {
            saveOptions();
        });
    }
}

function saveOptions() {
    chrome.storage.local.set({onOffTTV: onOff.checked ? 'true' : 'false'});
    chrome.storage.local.set({blockingMessageTTV: blockingMessage.checked ? 'true' : 'false'});
    //chrome.storage.local.set({forcedQualityTTV: forcedQuality.options[forcedQuality.selectedIndex].text});
    chrome.storage.local.set({proxyTTV: proxy.options[proxy.selectedIndex].text});
    chrome.storage.local.set({proxyQualityTTV: proxyQuality.options[proxyQuality.selectedIndex].text});
}

function restoreOptions() {
    restoreToggle('onOffTTV', onOff);
    restoreToggle('blockingMessageTTV', blockingMessage);
    //restoreDropdown('forcedQualityTTV', forcedQuality);
    restoreDropdown('proxyTTV', proxy);
    restoreDropdown('proxyQualityTTV', proxyQuality);
}

function restoreToggle(name, toggle) {
    chrome.storage.local.get([name], function(result) {
        if (result[name]) {
            toggle.checked = result[name] == 'true';
        }
    });
}

function restoreDropdown(name, dropdown) {
    chrome.storage.local.get([name], function(result) {
        if (result[name]) {
            var items = Array.from(dropdown.options).filter(item => item.text == result[name]);
            if (items.length == 1) {
                dropdown.selectedIndex = items[0].index;
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', restoreOptions);