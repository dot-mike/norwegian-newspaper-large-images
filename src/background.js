function openLargeImage(info, tab, func) {
  console.log(info, tab);
  const srcUrl = info.srcUrl;
  const largeImageUrl = func(srcUrl);

  if (largeImageUrl != null) openUrlInTab(largeImageUrl, tab);
  else openUrlInTab(srcUrl, tab);
}

// Amedia handler
function getLargeAmediaImageUrl(url) {
  const pattern = /http.+\/https%3A\/\/(smooth-storage\.aptoma\.no\/users\/drf-amedia\/images\/[0-9]+\.jpg)%3FaccessToken%3D([a-z0-9]+)\?chk=[A-Z0-9]+$/g;
  const func = (x, p1, p2) => "https://" + p1 + "?accessToken=" + p2;
  return performRegExp(url, pattern, func);
}

// Schibsted handler
function getLargeSchibstedImageUrl(url) {
  const pattern = /\/images\/([a-z0-9-]+)\?[0-9a-zA-Z.&=]+$/g;
  const func = (x, p1) => "/images/" + p1;
  return performRegExp(url, pattern, func);
}

// Aller Media handler
function getLargeAmImageUrl(url) {
  const pattern = /\/([0-9]+)\.jpg\?[0-9a-zA-Z.&=]+$/g;
  const func = (x, p1) =>
    "/" +
    p1 +
    ".jpg?imageId=" +
    p1 +
    "&x=0&y=0&cropw=0&croph=0&width=-1&height=-1&compression=0";
  return performRegExp(url, pattern, func);
}

// Teknisk Ukeblad Media handler
function getLargeTumImageUrl(url) {
  const pattern = /\/(.+)\.[0-9]+x[0-9]+c?\.(jpg|png)$/g;
  const func = (x, p1, p2) => "/" + p1 + "." + p2;
  return performRegExp(url, pattern, func);
}

// Polar Media handler
function getLargePmImageUrl(url) {
  const pattern = /\/w[0-9]+(-\w+)*\//g;
  const func = () => "/w1980-default/";
  return performRegExp(url, pattern, func);
}

// Newsflow handler
function getLargeNfImageUrl(url) {
  const pattern = /(bilder\/nyheter\/).+(\/.+\.jpg)/g;
  const func = (x, p1, p2) => p1 + "nyhetbig" + p2;
  return performRegExp(url, pattern, func);
}

// Generic W/H handler (example: "-640x480.jpg")
function getLargeWHImageUrl(url) {
  const pattern = /\/(.+)-[0-9]+x[0-9]+\.(jpg|png)$/g;
  const func = (x, p1, p2) => "/" + p1 + "." + p2;
  return performRegExp(url, pattern, func);
}

// Sogn Avis handler
function getLargeSaImageUrl(url) {
  const pattern = /(\/.+\.(jpg|png))&.+$/g;
  const func = (x, p1) => "/" + p1;
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
    openerTabId: openerTab.id
  });
}

// Polaris Media | ?
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

// Teknisk Ukeblad Media | Neo
chrome.contextMenus.create({
  title: chrome.i18n.getMessage("openLarge"),
  contexts: ["image"],
  onclick: (info, tab) => openLargeImage(info, tab, getLargeTumImageUrl),
  documentUrlPatterns: [
    "*://*.tu.no/*",
    "*://*.digi.no/*",
    "*://*.insidetelecom.no/*",
    "*://*.veier24.no/*",
    "*://*.tek.no/*", // Aquired by VG, but using Neo
    "*://*.medier24.no/*", // Not TUM, but using Neo
    "*://*.porten.no/*" // Not TUM, but using Neo
  ]
});

// Aller Media | Labrador
chrome.contextMenus.create({
  title: chrome.i18n.getMessage("openLarge"),
  contexts: ["image"],
  onclick: (info, tab) => openLargeImage(info, tab, getLargeAmImageUrl),
  documentUrlPatterns: [
    "*://*.dagbladet.no/*",
    "*://*.kode24.no/*",
    "*://*.dinside.no/*",
    "*://*.klikk.no/*",
    "*://*.tv2.no/*",
    "*://*.tvsporten.no/*",
    "*://*.seher.no/*",
    "*://*.sol.no/*",
    "*://*.kk.no/*",
    "*://*.se.no/*",
    "*://*.topp.no/*",
    "*://*.khrono.no/*",
    "*://*.journalisten.no/*",
    "*://*.forskning.no/*",
    "*://*.arbeidsnytt.no/*",
    "*://*.tungt.no/*",
    "*://*.side2.no/*",
    "*://*.side3.no/*",
    "*://*.mammanett.no/*",
    "*://*.vi.no/*",
    "*://*.lommelegen.no/*"
  ]
});

// Schibsted | ?
chrome.contextMenus.create({
  title: chrome.i18n.getMessage("openLarge"),
  contexts: ["image"],
  onclick: (info, tab) => openLargeImage(info, tab, getLargeSchibstedImageUrl),
  documentUrlPatterns: [
    "*://*.aftenposten.no/*",
    "*://*.bt.no/*",
    "*://*.fvn.no/*",
    "*://*.aftenbladet.no/*"
  ]
});

// Amedia | ?
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
    "*://*.aasavis.no/*"
  ]
});

// ? | Newsflow
chrome.contextMenus.create({
  title: chrome.i18n.getMessage("openLarge"),
  contexts: ["image"],
  onclick: (info, tab) => openLargeImage(info, tab, getLargeNfImageUrl),
  documentUrlPatterns: [
    "*://*.mre.no/*",
    "*://*.svalbardposten.no/*",
    "*://*.akersposten.no/*",
    "*://*.sageneavis.no/*",
    "*://*.midsundingen.no/*",
    "*://*.groruddalen.no/*",
    "*://*.nab.no/*",
    "*://*.idag.no/*",
    "*://*.fritanke.no/*",
    "*://*.nye-troms.no/*",
    "*://*.sagat.no/*",
    "*://*.nordrenett.no/*"
  ]
});

// ITAvisen | Wordpress
chrome.contextMenus.create({
  title: chrome.i18n.getMessage("openLarge"),
  contexts: ["image"],
  onclick: (info, tab) => openLargeImage(info, tab, getLargeWHImageUrl),
  documentUrlPatterns: ["*://*.itavisen.no/*"]
});

// Sogn Avis | ?
chrome.contextMenus.create({
  title: chrome.i18n.getMessage("openLarge"),
  contexts: ["image"],
  onclick: (info, tab) => openLargeImage(info, tab, getLargeSaImageUrl),
  documentUrlPatterns: ["*://*.sognavis.no/*"]
});
