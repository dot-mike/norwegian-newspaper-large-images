'use strict';

function byt_bilete() {
    const bilete = Array.prototype.slice.call(document.getElementsByClassName("js-require-widget responsiveImage"), 0);
    bilete.forEach(element => {
        if (element.getAttribute('data-src').includes('{width}')) {
            element.setAttribute('data-src', element.getAttribute('data-src').replace(/{width}/g, '1680'));
        }
    });
}

console.log('Startar benytting av store bilete.');
byt_bilete();
console.log('Avslutta benytting av store bilete.');