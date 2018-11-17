'use strict';

function switchImages() {
    const bilete = Array.prototype.slice.call(document.getElementsByClassName("js-require-widget responsiveImage"), 0);
    bilete.forEach(element => {
        if (element.getAttribute('data-src').includes('{width}')) {
            element.setAttribute('data-src', element.getAttribute('data-src').replace(/{width}/g, '1980'));
        }
    });
}

console.log('Startar benytting av store bilete.');
switchImages();
console.log('Avslutta benytting av store bilete.');