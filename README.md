# Møre-Nytt large images

Replaces the normal size images with larger ones. Allows you to click to zoom. Control/Command-click opens in new window.

Released on [Chrome Web Store](https://chrome.google.com/webstore/detail/eohpfbapbmhblpjcnjfikpmcdkkpkihg). See example below:

![Example usage](example.gif)

As this functionality is similar across [Polaris Media](http://www.polarismedia.no) it should be a small task to extend it to their other newspapers.

Functionality tested on 2018-11-20.

## License

The software in this repo is released under [CC-BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/), also found in the `LICENSE` file.

## Credits

The logo icon is the "tooltip-image" icon from [Material Design Icons](https://materialdesignicons.com/).

Includes [Zoom.js](https://github.com/fat/zoom.js) and its [jQuery](https://jquery.com/) and [Bootstrap](https://github.com/twbs/bootstrap) dependencies.

Replaces [Polaris Medias Imager initializer](https://static.polarismedia.no/resources/min-js/plugins/imager.js?1016) with an internal one that has a `onImagesReplaced` function.