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
  // pattern for url regex
  const urlPattern = {
    "default": {
      "pattern": /\/images\/([a-z0-9-]+)\?[0-9a-zA-Z.&=]+$/g,
      "func": (x, p1) => "/images/" + p1
    },

    ".*\:\/\/premium.vgc.no\/v2\/images\/.*": {
      "pattern": /\/v2\/images\/([a-z0-9-]+)\?[0-9a-zA-Z.&=]+$/g,
      "func": (x, p1) => "/images/" + p1
    },

    ".*\:\/\/shared.cdn.smp.schibsted.com\/v2\/images\/.*": {
      "pattern": /.+\/images\/([a-z0-9-]+)\?[0-9a-zA-Z.&=]+$/g,
      "func": (x, p1) => "https://premium.vgc.no/vgc/images/" + p1
    },

  }

  // get pattern based on url
  let pattern = urlPattern["default"];
  for (let key in urlPattern) {
    if (url.match(key)) {
      pattern = urlPattern[key];
      break;
    }
  }

  return performRegExp(url, pattern.pattern, pattern.func);
}

// VG.no handler
function getLargeVgImageUrl(url) {
  // pattern for url regex
  const urlPattern = {
    "default": {
      "pattern": /\/images\/([a-z0-9-]+)\?[0-9a-zA-Z.&=]+$/g,
      "func": (x, p1) => "/images/" + p1
    },

    // vgtv.no
    // vg nyhetsdøgnet
    ".*\:\/\/imbo.vgtv.no\/users\/vgtv\/images/.*": {
      "pattern": /\/images\/(.+)\.jpg\?[\[\]0-9a-zA-Z.&=]+$/g,
      "func": (x, p1) => "/images/" + p1 + "?t[]=2048q80"
    },

    // vg.no article
    ".*\:\/\/akamai.vgc.no\/v2\/images\/.*": {
      "pattern": /.+\/images\/([a-z0-9-]+)\?[0-9a-zA-Z.&=]+$/g,
      "func": (x, p1) => "https://premium.vgc.no/vg/images/" + p1
    },
  }

  // get pattern based on url
  let pattern = urlPattern["default"];
  for (let key in urlPattern) {
    if (url.match(key)) {
      pattern = urlPattern[key];
      break;
    }
  }

  return performRegExp(url, pattern.pattern, pattern.func);
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
  // same as schibsted default handler
  const pattern = /\/([a-f0-9-]+)\?.+$/g;
  const func = (x, p1) => "/" + p1;
  return performRegExp(url, pattern, func);
}

// Newsflow handler
// TODO: Currently not functional
function getLargeNfImageUrl(url) {
  return null;
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

// Infomaker handler
function getLargeInfomakerImageUrl(url) {
  const pattern = /(?:http|https):\/\/(.+)\/.*[?&]uuid=([a-zA-Z0-9-]+).+/g;
  const func = (x, p1, p2) => "https://" + p1 + "/?uuid=" + p2 + "&function=original&type=preview";
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

// Polaris Media | Schibsted virtual cdn...
chrome.contextMenus.create({
  title: chrome.i18n.getMessage("openLarge"),
  contexts: ["image"],
  onclick: (info, tab) => openLargeImage(info, tab, getLargePmImageUrl),
  documentUrlPatterns: [
    // Polar Media Sør-Norge
    "*://*.agderposten.no/*",
    "*://*.fvn.no/*",
    "*://*.gat.no/*",
    "*://*.l-a.no/*",
    "*://*.lp.no/*",
    "*://*.lister24.no/*",
    "*://*.varden.no/*",
    "*://*.venneslatidende.no/*",
    // Polar Media Nordvestlandet
    "*://*.andalsnes-avis.no/*",
    "*://*.bt.no/*",
    "*://*.driva.no/*",
    "*://*.dolen.no/*",
    "*://*.fjordabladet.no/*",
    "*://*.fjt.no/*",
    "*://*.fjordingen.no/*",
    "*://*.fjuken.no/*",
    "*://*.morenytt.no/*",
    "*://*.rbnett.no/*",
    "*://*.smp.no/*",
    "*://*.sunnmoringen.no/*",
    "*://*.nyss.no/*",
    "*://*.vestlandsnytt.no/*",
    "*://*.vigga.no/*",
    "*://*.vikebladet.no/*",
    // Polar Media Midt-Norge
    "*://*.adressa.no/*",
    "*://*.avisa-st.no/*",
    "*://*.banett.no/*",
    "*://*.bladet.no/*",
    "*://*.fosna-folket.no/*",
    "*://*.hitra-froya.no/*",
    "*://*.innherred.no/*",
    "*://*.s-n.no/*",
    "*://*.steinkjer24.no/*",
    "*://*.tronderbladet.no/*",
    "*://*.opp.no/*",
    "*://*.opdalingen.no/*",
    // Polar Media Nord-Norge
    "*://*.altaposten.no/*",
    "*://*.av-avis.no/*",
    "*://*.andoyposten.no/*",
    "*://*.folkebladet.no/*",
    "*://*.framtidinord.no/*",
    "*://*.ht.no/*",
    "*://*.itromso.no/*",
    "*://*.vesteraalensavis.no/*",
    "*://*.vol.no/*",
    "*://*.vaganavisa.no/*",
    // Polaris Media Vest
    "*://*.bomlo-nytt.no/*",
    "*://*.sunnhordland.no/*",
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
    "*://*.karriere360.no/*",
    "*://*.medier24.no/*", // Not TUM, but using Neo
    "*://*.m24.no/*", // Not TUM, but using Neo
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
    "*://*.lommelegen.no/*",
    "*://*.borsen.no/*",
    "*://*.vp.no/*",
  ]
});

// Schibsted | ?
chrome.contextMenus.create({
  title: chrome.i18n.getMessage("openLarge"),
  contexts: ["image"],
  onclick: (info, tab) => openLargeImage(info, tab, getLargeSchibstedImageUrl),
  documentUrlPatterns: [
    "*://*.aftenbladet.no/*",
    "*://*.aftenposten.no/*",
    "*://*.mn24.no/*",
    "*://*.tek.no/*", // Aquired by VG, but using Neo
  ]
});

// vg.no
chrome.contextMenus.create({
  title: chrome.i18n.getMessage("openLarge"),
  contexts: ["image"],
  onclick: (info, tab) => openLargeImage(info, tab, getLargeVgImageUrl),
  documentUrlPatterns: ["*://*.vg.no/*"]
});

// Amedia | ?
chrome.contextMenus.create({
  title: chrome.i18n.getMessage("openLarge"),
  contexts: ["image"],
  onclick: (info, tab) => openLargeImage(info, tab, getLargeAmediaImageUrl),
  documentUrlPatterns: [
    "*://*.amta.no/*",
    "*://*.akerposten.no/*",
    "*://*.auraavis.no/*",
    "*://*.austagderblad.no/*",
    "*://*.avisa-hordaland/*",
    "*://*.avisenagder.no/*",
    "*://*.nordhordland.no/*",
    "*://*.an.no/*",
    "*://*.ba.no/*",
    "*://*.blv.no/*",
    "*://*.budstikka.no/*",
    "*://*.bygdebladet.no/*",
    "*://*.bygdeposten.no/*",
    "*://*.dalane-tidende.no/*",
    "*://*.dt.no/*",
    "*://*.eikerbladet.no/*",
    "*://*.enebakkavis.no/*",
    "*://*.eub.no/*",
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
    "*://*.h-a.no/*",
    "*://*.helg.no/*",
    "*://*.indre.no/*",
    "*://*.inderoyningen.no/*",
    "*://*.jarlsbergavis.no/*",
    "*://*.jbl.no/*",
    "*://*.kv.no/*",
    "*://*.kvinnheringen.no/*",
    "*://*.laagendalsposten.no/*",
    "*://*.lierposten.no/*",
    "*://*.lofotposten.no/*",
    "*://*.lofot-tidende.no/*",
    "*://*.lokal-avisa.no/*",
    "*://*.oyene.no/*",
    "*://*.lyngdalsavis.no/*",
    "*://*.moss-avis.no/*",
    "*://*.namdalsavisa.no/*",
    "*://*.nordlys.no/*",
    "*://*.noblad.no/*",
    "*://*.oa.no/*",
    "*://*.pd.no/*",
    "*://*.r-a.no/*",
    "*://*.ranablad.no/*",
    "*://*.rablad.no/*",
    "*://*.rb.no/*",
    "*://*.retten.no/*",
    "*://*.rha.no/*",
    "*://*.ringblad.no/*",
    "*://*.ringsaker-blad.no/*",
    "*://*.sandeavis.no/*",
    "*://*.sb.no/*",
    "*://*.sandnesposten.no/*",
    "*://*.sa.no/*",
    "*://*.smaalenene.no/*",
    "*://*.solabladet.no/*",
    "*://*.solungavisa.no/*",
    "*://*.sognavis.no/*",
    "*://*.stangeavisa.no/*",
    "*://*.steinkjer-avisa.no/*",
    "*://*.strandbuen.no/*",
    "*://*.sva.no/*",
    "*://*.svelviksposten.no/*",
    "*://*.ta.no/*",
    "*://*.t-a.no/*",
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

// ? | Wordpress
chrome.contextMenus.create({
  title: chrome.i18n.getMessage("openLarge"),
  contexts: ["image"],
  onclick: (info, tab) => openLargeImage(info, tab, getLargeWHImageUrl),
  documentUrlPatterns: [
    "*://*.itavisen.no/*",
    // schibsted
    "*://*.alvdalmiv.no/*",
    "*://*.gjoviksblad.no/*",
    "*://*.hblad.no/*",
    "*://*.totensblad.no/*",
    "*://*.tynsetingen.no/*",

  ]
});

// Schibsted | infomaker
chrome.contextMenus.create({
  title: chrome.i18n.getMessage("openLarge"),
  contexts: ["image"],
  onclick: (info, tab) => openLargeImage(info, tab, getLargeInfomakerImageUrl),
  documentUrlPatterns: [
    "*://*.firdatidend.no/*",
    "*://*.frostingen.no/*",
    "*://*.hallingdolen.no/*",
    "*://*.hf.no/*",
    "*://*.osogfusa.no/*",
    "*://*.raumnes.no/*",
    "*://*.setesdolen.no/*",
    "*://*.snasningen.no/*",
    "*://*.suldalsposten.no/*",
    "*://*.tysnesbladet.no/*",
    "*://*.vtb.no/*",
  ]
});