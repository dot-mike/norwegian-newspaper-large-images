function openLargeImage(info, tab, func) {
    console.log(info, tab);
    const srcUrl = info.srcUrl;
    const largeImageUrl = func(srcUrl);

    if (largeImageUrl != null)
        openUrlInTab(largeImageUrl, tab);
    else
        openUrlInTab(srcUrl, tab)
}

// Aftenposten handler
function getLargeApImageUrl(url) {
    const pattern = /\/images\/([a-z0-9\-]+)\?[0-9a-zA-Z\.&=]+$/g;
    const func = (x, p1) => '/images/' + p1;
    return performRegExp(url, pattern, func);
}

// Dagbladet handler
function getLargeDbImageUrl(url) {
    const pattern = /\/([0-9]+)\.jpg\?[0-9a-zA-Z\.&=]+$/g;
    const func = (x, p1) => '/' + p1 + '.jpg?imageId=' + p1 + '&x=0&y=0&cropw=0&croph=0&width=-1&height=-1&compression=0';
    return performRegExp(url, pattern, func);
}

// Teknisk Ukeblad Media handler
function getLargeTumImageUrl(url) {
    const pattern = /\/(.+)\.[0-9]+x[0-9]+c\.jpg$/g;
    const func = (x, p1) => '/' + p1 + '.jpg';
    return performRegExp(url, pattern, func);
}

// Polar Media handler
function getLargePmImageUrl(url) {
    const pattern = /\/w[0-9]+(-\w+)*\//g;
    const func = () => '/w1980-default/';
    return performRegExp(url, pattern, func);
}

function performRegExp(value, pattern, func) {
    if (RegExp(pattern).test(value)) {
        return value.replace(pattern, func);
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

// Polaris Media
// http://www.polarismedia.no/vare-selskaper/
chrome.contextMenus.create({
    title: chrome.i18n.getMessage("openLarge"),
    contexts: ["image"],
    onclick: (info, tab) => openLargeImage(info, tab, getLargePmImageUrl),
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

// Teknisk Ukeblad Media
chrome.contextMenus.create({
    title: chrome.i18n.getMessage("openLarge"),
    contexts: ["image"],
    onclick: (info, tab) => openLargeImage(info, tab, getLargeTumImageUrl),
    documentUrlPatterns: [
        "*://*.tu.no/*",
        "*://*.digi.no/*",
        "*://www*.insidetelecom.no/*",
        "*://*.veier24.no/*"
    ]
});

// Dagbladet
chrome.contextMenus.create({
    title: chrome.i18n.getMessage("openLarge"),
    contexts: ["image"],
    onclick: (info, tab) => openLargeImage(info, tab, getLargeDbImageUrl),
    documentUrlPatterns: [
        "*://*.dagbladet.no/*"
    ]
});

// Aftenposten
chrome.contextMenus.create({
    title: chrome.i18n.getMessage("openLarge"),
    contexts: ["image"],
    onclick: (info, tab) => openLargeImage(info, tab, getLargeApImageUrl),
    documentUrlPatterns: [
        "*://*.aftenposten.no/*"
    ]
});
