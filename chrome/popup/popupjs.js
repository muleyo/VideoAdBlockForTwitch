"use strict";

var onOff = document.querySelector("input[name=checkbox1]");
var blockingMessage = document.querySelector("input[name=checkbox2]");

onOff.addEventListener('change', function() {
    saveOptions();
});

blockingMessage.addEventListener('change', function() {
    saveOptions();
});

function saveOptions() {
    if (document.querySelector("input[name=checkbox1]").checked) {
        chrome.storage.local.set({
            onOffTTV: "true"
        }, function() {});
    } else {
        chrome.storage.local.set({
            onOffTTV: "false"
        }, function() {});
    }
    if (document.querySelector("input[name=checkbox2]").checked) {
        chrome.storage.local.set({
            blockingMessageTTV: "true"
        }, function() {});
    } else {
        chrome.storage.local.set({
            blockingMessageTTV: "false"
        }, function() {});
    }
}

function restoreOptions() {
    chrome.storage.local.get(['onOffTTV'], function(result) {
        if (result.onOffTTV == "true") {
            document.querySelector("input[name=checkbox1]").checked = true;
        } else if (result.onOffTTV == "false") {
            document.querySelector("input[name=checkbox1]").checked = false;
        }
    });

    chrome.storage.local.get(['blockingMessageTTV'], function(result) {
        if (result.blockingMessageTTV == "true") {
            document.querySelector("input[name=checkbox2]").checked = true;
        } else if (result.blockingMessageTTV == "false") {
            document.querySelector("input[name=checkbox2]").checked = false;
        }
    });
}

document.addEventListener('DOMContentLoaded', restoreOptions);