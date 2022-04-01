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
        browser.storage.sync.set({
            onOffTTV: "true"
        });
    } else {
        browser.storage.sync.set({
            onOffTTV: "false"
        });
    }
    if (document.querySelector("input[name=checkbox2]").checked) {
        browser.storage.sync.set({
            blockingMessageTTV: "true"
        });
    } else {
        browser.storage.sync.set({
            blockingMessageTTV: "false"
        });
    }
}

function restoreOptions() {
    var onOff = browser.storage.sync.get('onOffTTV');
    onOff.then((res) => {
        if (res.onOffTTV == "true") {
            document.querySelector("input[name=checkbox1]").checked = true;
        } else if (res.onOffTTV == "false") {
            document.querySelector("input[name=checkbox1]").checked = false;
        }
    });
    var blockingMessage = browser.storage.sync.get('blockingMessageTTV');
    blockingMessage.then((res) => {
        if (res.blockingMessageTTV == "true") {
            document.querySelector("input[name=checkbox2]").checked = true;
        } else if (res.blockingMessageTTV == "false") {
            document.querySelector("input[name=checkbox2]").checked = false;
        }
    });
}

document.addEventListener('DOMContentLoaded', restoreOptions);