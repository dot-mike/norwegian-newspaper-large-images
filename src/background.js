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
        "*://*.avisenagder.no/*",
        "*://*.amta.no/*",
        "*://*.retten.no/*",
        "*://*.auraavis.no/*",
        "*://*.austagderblad.no/*",
        "*://*.nordhordland.no/*",
        "*://*.an.no/*",
        "*://*.ba.no/*",
        "*://*.bygdebladet.no/*",
        "*://*.bygdeposten.no/*",
        "*://*.dalane-tidende.no/*",
        "*://*.dt.no/*",
        "*://*.eikerbladet.no/*",
        "*://*.enebakkavis.no/*",
        "*://*.finnmarkdagblad.no/*",
        "*://*.finnmarken.no/*",
        "*://*.finnmarksposten.no/*",
        "*://*.firda.no/*",
        "*://*.firdaposten.no/*",
        "*://*.f-b.no/*",
        "*://*.fremover.no/*",
        "*://*.gjengangeren.no/*",
        "*://*.gbnett.no/*",
        "*://*.glomdalen.no/*",
        "*://*.hadeland.net/*",
        "*://*.ha-halden.no/*",
        "*://*.hardanger-folkeblad.no/*",
        "*://*.h-avis.no/*",
        "*://*.helg.no/*",
        "*://*.indre.no/*",
        "*://*.jarlsbergavis.no/*",
        "*://*.jbl.no/*",
        "*://*.kv.no/*",
        "*://*.kvinnheringen.no/*",
        "*://*.laagendalsposten.no/*",
        "*://*.lierposten.no/*",
        "*://*.lofotposten.no/*",
        "*://*.lofot-tidende.no/*",
        "*://*.oyene.no/*",
        "*://*.lyngdalsavis.no/*",
        "*://*.moss-avis.no/*",
        "*://*.nordlys.no/*",
        "*://*.noblad.no/*",
        "*://*.oa.no/*",
        "*://*.pd.no/*",
        "*://*.r-a.no/*",
        "*://*.ranablad.no/*",
        "*://*.ringblad.no/*",
        "*://*.ringsaker-blad.no/*",
        "*://*.rablad.no/*",
        "*://*.rb.no/*",
        "*://*.rha.no/*",
        "*://*.sandeavis.no/*",
        "*://*.sb.no/*",
        "*://*.sandnesposten.no/*",
        "*://*.sa.no/*",
        "*://*.smaalenene.no/*",
        "*://*.solabladet.no/*",
        "*://*.solungavisa.no/*",
        "*://*.strandbuen.no/*",
        "*://*.svelviksposten.no/*",
        "*://*.ta.no/*",
        "*://*.telen.no/*",
        "*://*.tk.no/*",
        "*://*.tvedestrandsposten.no/*",
        "*://*.tb.no/*",
        "*://*.varingen.no/*",
        "*://*.vestbyavis.no/*",
        "*://*.oblad.no/*",
        "*://*.op.no/*",
        "*://*.ostlendingen.no/*",
        "*://*.aasavis.no/*",
    ]
});
