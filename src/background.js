chrome.webRequest.onBeforeRequest.addListener(
    function (details) {
        return {
            redirectUrl: chrome.runtime.getURL('includes/Imager.js')
        };
    }, {
        urls: [
            "https://static.polarismedia.no/resources/min-js/plugins/imager.js?1016"
        ]
    },
    ["blocking"]
);