function openLargeImage(info, tab) {
    console.log(info, tab);
    const srcUrl = info.srcUrl;
    const largeImageUrl = getLargeImageUrl(srcUrl);

    if (largeImageUrl != null)
        openUrlInTab(largeImageUrl, tab);
    else
        openUrlInTab(srcUrl, tab)
}

function getLargeImageUrl(url) {
    if (RegExp(/\/w[0-9]+(-\w+)*\//g).test(url)) {
        return url.replace(/\/w[0-9]+(-\w+)*\//g, function (match, p1) {
            return '/w1980-default/';
        });
    }

    return null;
}

function openUrlInTab(url, openerTab) {
    chrome.tabs.create({
        url: url,
        index: openerTab.index + 1,
        openerTabId: openerTab.id,

    });
}

// URL patterns grabbed from:
// http://www.polarismedia.no/vare-selskaper/
chrome.contextMenus.create({
    title: chrome.i18n.getMessage("openLarge"),
    contexts: ["image"],
    onclick: openLargeImage,
    documentUrlPatterns: [
        // Polar Media Midt-Norge
        "*://*.adressa.no/*",
        "*://*.avisa-st.no/*",
        "*://*.bladet.no/*",
        "*://*.banett.no/*",
        "*://*.fosna-folket.no/*",
        "*://*.hitra-froya.no/*",
        "*://*.innherred.no/*",
        "*://*.opdalingen.no/*",
        "*://*.tronderbladet.no/*",
        // Polar Media Nord-Norge
        "*://*.altaposten.no/*",
        "*://*.andoyposten.no/*",
        "*://*.folkebladet.no/*",
        "*://*.framtidinord.no/*",
        "*://*.ht.no/*",
        "*://*.itromso.no/*",
        "*://*.vesteraalensavis.no/*",
        "*://*.vol.no/*",
        // Polar Media Nordvestlandet
        "*://*.andalsnes-avis.no/*",
        "*://*.driva.no/*",
        "*://*.dolen.no/*",
        "*://*.fjordabladet.no/*",
        "*://*.fjt.no/*",
        "*://*.fjordingen.no/*",
        "*://*.fjuken.no/*",
        "*://*.morenytt.no/*",
        "*://*.rbnett.no/*",
        "*://*.sunnmoringen.no/*",
        "*://*.smp.no/*",
        "*://*.vestlandsnytt.no/*",
        "*://*.vigga.no/*",
        "*://*.vikebladet.no/*"
    ]
});