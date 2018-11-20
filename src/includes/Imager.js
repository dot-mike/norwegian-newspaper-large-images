define(["lib/Imager"], function (a) {
    var c;
    var b;
    if (document.createEvent) {
        b = document.createEvent("HTMLEvents");
        b.initEvent("preImagerRunReady", true, true)
    } else {
        b = document.createEventObject();
        b.eventType = "preImagerRunReady"
    }
    b.eventName = "preImagerRunReady";
    if (document.createEvent) {
        document.dispatchEvent(b)
    } else {
        document.fireEvent("on" + b.eventType, b)
    }
    init = function (d, f) {
        if (c === undefined) {
            if (requirejs.s.contexts._.config.platform == "mobile") {
                c = new a(d, {
                    availableWidths: [80, 180, 280, 280, 380, 480],
                    lazyload: f.lazyload,
                    lazyloadOffset: f.lazyloadOffset,
                    availablePixelRatios: [1, 2],
                    widthInterpolator: function (g, h) {
                        if (h > 1) {
                            newwidth = g * 2 + 20
                        } else {
                            newwidth = g
                        }
                        return newwidth
                    }
                })
            } else {
                var e = [80, 180, 280, 280, 380, 480, 580, 680, 780, 880, 980, 1280, 1480, 1680, 1980];
                if (f.source && f.source === "snd") {
                    e = [80, 180, 280, 280, 380, 480, 580, 680, 780, 880, 980, 1024, 1440, 2048]
                }
                c = new a(d, {
                    availableWidths: e,
                    lazyload: f.lazyload,
                    lazyloadOffset: f.lazyloadOffset,
                    onImagesReplaced: function (images) {
                        for (var i = 0; i < images.length; i++) {
                            images[i].setAttribute('data-action', 'zoom');
                            images[i].parentElement.style.overflow = 'visible';
                            images[i].addEventListener('click', function (e) {
                                if (e.target.tagName === 'IMG')
                                    e.preventDefault();
                            });
                        }
                    }
                })
            }
            c.ready(function () {
                var g;
                if (document.createEvent) {
                    g = document.createEvent("HTMLEvents");
                    g.initEvent("imagerReady", true, true)
                } else {
                    g = document.createEventObject();
                    g.eventType = "imagerReady"
                }
                g.eventName = "imagerReady";
                if (document.createEvent) {
                    document.dispatchEvent(g)
                } else {
                    document.fireEvent("on" + g.eventType, g)
                }
            })
        } else {
            c.add(d)
        }
    };
    return {
        init: init
    }
});