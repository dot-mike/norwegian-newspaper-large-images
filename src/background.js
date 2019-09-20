function openLargeImage(info, tab, func) {
    console.log(info, tab);
    const srcUrl = info.srcUrl;
    const largeImageUrl = func(srcUrl);

    if (largeImageUrl != null)
        openUrlInTab(largeImageUrl, tab);
    else
        openUrlInTab(srcUrl, tab)
}

// Amedia handler
function getLargeAmediaImageUrl(url) {
    const pattern = /http.+\/https%3A\/\/(smooth\-storage\.aptoma\.no\/users\/drf-amedia\/images\/[0-9]+\.jpg)%3FaccessToken%3D([a-z0-9]+)\?chk=[A-Z0-9]+$/g;
    const func = (x, p1, p2) => 'https://' + p1 + '?accessToken=' + p2;
    return performRegExp(url, pattern, func);
}


// Schibsted handler
function getLargeSchibstedImageUrl(url) {
    const pattern = /\/images\/([a-z0-9\-]+)\?[0-9a-zA-Z\.&=]+$/g;
    const func = (x, p1) => '/images/' + p1;
    return performRegExp(url, pattern, func);
}

// Aller Media handler
function getLargeAmImageUrl(url) {
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
        "*://*.vikebladet.no/*",
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
        "*://*.insidetelecom.no/*",
        "*://*.veier24.no/*",
        "*://*.tek.no/*", // Aquired by VG and might break over time
    ]
});

// Aller Media
chrome.contextMenus.create({
    title: chrome.i18n.getMessage("openLarge"),
    contexts: ["image"],
    onclick: (info, tab) => openLargeImage(info, tab, getLargeAmImageUrl),
    documentUrlPatterns: [
        "*://*.dagbladet.no/*",
        "*://*.kode24.no/*",
        "*://*.dinside.no/*",
    ]
});

// Schibsted
chrome.contextMenus.create({
    title: chrome.i18n.getMessage("openLarge"),
    contexts: ["image"],
    onclick: (info, tab) => openLargeImage(info, tab, getLargeSchibstedImageUrl),
    documentUrlPatterns: [
        "*://*.aftenposten.no/*",
        "*://*.bt.no/*",
        "*://*.fvn.no/*",
        "*://*.aftenbladet.no/*",
    ]
});

// Amedia
chrome.contextMenus.create({
    title: chrome.i18n.getMessage("openLarge"),
    contexts: ["image"],
    onclick: (info, tab) => openLargeImage(info, tab, getLargeAmediaImageUrl),
    documentUrlPatterns: [
        "http://www.avisenagder.no/",
        "http://www.amta.no/",
        "http://www.retten.no/",
        "http://www.auraavis.no/",
        "http://www.austagderblad.no/",
        "http://www.nordhordland.no/",
        "http://www.an.no/",
        "http://www.ba.no/",
        "http://www.bygdebladet.no/",
        "http://www.bygdeposten.no/",
        "http://www.dalane-tidende.no/",
        "http://www.dt.no/",
        "http://www.eikerbladet.no/",
        "http://www.enebakkavis.no/",
        "http://www.finnmarkdagblad.no/",
        "http://www.finnmarken.no/",
        "http://www.finnmarksposten.no/",
        "http://www.firda.no/",
        "http://www.firdaposten.no/",
        "http://www.f-b.no/",
        "http://www.fremover.no/",
        "http://www.gjengangeren.no/",
        "https://gbnett.no/",
        "http://www.glomdalen.no/",
        "http://www.hadeland.net/",
        "http://www.ha-halden.no/",
        "http://www.hardanger-folkeblad.no/",
        "http://www.h-avis.no/",
        "http://www.helg.no/",
        "http://www.indre.no/",
        "http://www.jarlsbergavis.no/",
        "http://www.jbl.no/",
        "http://www.kv.no/",
        "http://www.kvinnheringen.no/",
        "http://www.laagendalsposten.no/",
        "http://www.lierposten.no/",
        "http://www.lofotposten.no/",
        "http://www.lofot-tidende.no/",
        "http://www.oyene.no/",
        "http://www.lyngdalsavis.no/",
        "http://www.moss-avis.no/",
        "http://www.nordlys.no/",
        "http://www.noblad.no/",
        "http://www.oa.no/",
        "http://www.pd.no/",
        "http://www.r-a.no/",
        "http://www.ranablad.no/",
        "http://www.ringblad.no/",
        "http://www.ringsaker-blad.no/",
        "http://www.rablad.no/",
        "http://www.rb.no/",
        "http://www.rha.no/",
        "http://www.sandeavis.no/",
        "http://www.sb.no/",
        "http://www.sandnesposten.no/",
        "http://www.sa.no/",
        "http://www.smaalenene.no/",
        "http://www.solabladet.no/",
        "http://www.solungavisa.no/",
        "http://www.strandbuen.no/",
        "http://www.svelviksposten.no/",
        "http://www.ta.no/",
        "http://www.telen.no/",
        "http://www.tk.no/",
        "http://www.tvedestrandsposten.no/",
        "http://www.tb.no/",
        "http://www.varingen.no/",
        "http://www.vestbyavis.no/",
        "http://www.oblad.no/",
        "http://www.op.no/",
        "http://www.ostlendingen.no/",
        "http://www.aasavis.no/",
    ]
});
