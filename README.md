# Norwegian newspaper large images

Adds an element in your context menu to "Open large image", when right clicking an image on many Norwegian newspaper website.

![Example usage](example.gif)

Covered media groups or publishing platforms:

- [Aller Media (Labrador)](https://www.aller.no/vare-merkevarer)
- [Amedia](https://www.amedia.no/om-oss/personvern/mediehusene)
- [Polaris Media](http://www.polarismedia.no/vare-selskaper/)
- [Schibsted](https://schibsted.com/)
- [Teknisk Ukeblad Media (Neo)](https://www.tumedia.no/)
- [Newsflow](https://www.newsflow.no/)

Newspapers known to NOT be covered:

- VG
- E24
- Political newspapers

Released on [Chrome Web Store](https://chrome.google.com/webstore/detail/eohpfbapbmhblpjcnjfikpmcdkkpkihg) and [Firefox Add-ons](https://addons.mozilla.org/en-US/firefox/addon/nn-large-images/).

Functionality tested on 2022-12-02.

## How to pack

Run `node index.js` to pack and optionally release if the `.env` is set up.

## Changelog

### 1.8.1

Partial update to list of newspapers covered by various systems. Mostly Polaris Media and Amedia.
These users contributed to the release:

* [@dot-mike](https://github.com/dot-mike)
* [@ondkloss](https://github.com/ondkloss)

### 1.8.0

Major update after long hiatus. Big thanks to [@dot-mike](https://github.com/dot-mike) for the contributions.
Newsflow is no longer covered, as pattern is currently unknown.

### 1.7.3

Added Karriere360 support.

### 1.7.2

Added Sogn Avis and Porten support.

### 1.7.1

Added ITavisen support.

### 1.7

Added Newsflow support, but unknown exactly what domains to cover.
Added more domains to Aller Media (Labrador).
Improved the pattern used on Teknisk Ukeblad Media (Neo) domains.

### 1.6.1

Fixed broken URL patterns for Amedia newspapers.

### 1.6

Extended support to a lot of Norwegian newspapers.

### 1.5

Extension now gives a context menu option upon right clicking images on Polaris Media websites.

### < 1.5

These versions injected content scripts, but as Polaris Media kept changing up their DOM/scripts it didn't work well for long.

## License

The software in this repo is released under [CC-BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/), also found in the `LICENSE` file.

## Credits

The logo icon is the "tooltip-image" icon from [Material Design Icons](https://materialdesignicons.com/).
