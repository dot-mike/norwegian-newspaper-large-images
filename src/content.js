'use strict';

function switchImages() {
    // Images mostly found on https://www.morenytt.no
    const dynamicImages = Array.prototype.slice.call(document.getElementsByClassName("js-require-widget responsiveImage"), 0);
    dynamicImages.forEach(element => {
        if (element.getAttribute('data-src').includes('{width}')) {
            element.setAttribute('data-src', element.getAttribute('data-src').replace(/{width}/g, '1980'));
        }
    });

    // Images mostly found on https://morenytt.alda.no
    const staticImages = Array.prototype.slice.call(document.getElementsByClassName("img-responsive"), 0);
    staticImages.forEach(element => {
        if (RegExp(/\/w[0-9]+(-\w+)*\//g).test(element.getAttribute('src'))) {
            element.setAttribute('data-action', 'zoom');
            element.parentElement.style.overflow = 'visible';
            element.setAttribute('src', element.getAttribute('src').replace(/\/w[0-9]+(-\w+)*\//g, function (match, p1) {
                return '/w1980' + p1 + '/';
            }));
        }
    });
}

console.log('Startar benytting av store bilete.');
switchImages();
console.log('Avslutta benytting av store bilete.');
