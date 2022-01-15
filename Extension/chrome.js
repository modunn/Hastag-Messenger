var app = {},
    windowId, mainWindowId;
app.tab = {
    "open": function(url) {
        var tmp = (mainWindowId !== undefined) ? {
            "url": url,
            "active": true,
            "windowId": mainWindowId
        } : {
            "url": url,
            "active": true
        };
        chrome.tabs.create(tmp);
    }
};

app.UI = (function() {
    var r = {},
        SAOTI;
    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
        if (request.path === 'ui-to-background') {
            for (var id in r) {
                if (r[id] && (typeof r[id] === "function")) {
                    if (request.method === id) r[id](request.data);
                }
            }
        }
    });
    /*  */
    return {
        "create": function() {
            chrome.windows.getCurrent(function(win) {
                mainWindowId = win.id;
                var width = 1200
                var height = 800
                var url = "https://www.messenger.com/";
                var top = win.top + Math.round((win.height - height) / 2);
                var left = win.left + Math.round((win.width - width) / 2);
                chrome.windows.create({
                    'url': url,
                    'type': 'popup',
                    'width': width,
                    'height': height,
                    'top': top,
                    'left': left
                }, function(w) {
                    windowId = w.id
                });
            });
        }
    }
})();
app.deviceReady = function(callback) {
    callback(true)
};
chrome.windows.onRemoved.addListener(function(e) {
    if (e === windowId) {
        windowId = null
    }
});

chrome.browserAction.onClicked.addListener(function() {
    windowId ? chrome.windows.update(windowId, {
        "focused": true
    }) : app.UI.create()
});
// chrome.windows.onFocusChanged.addListener(function(e) {
//     window.setTimeout(function() {
//         if (windowId && e !== windowId) {
//                 try {
//                     chrome.windows.update(windowId, {
//                         "focused": true
//                     })
//                 } catch (e) {}
//             }
//         }, 300);
// });