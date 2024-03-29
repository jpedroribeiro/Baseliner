Baseliner
======

*[All your baseline are belong to us](https://en.wikipedia.org/wiki/All_your_base_are_belong_to_us)*

**Baseliner** is a Chrome, Firefox, and MS Edge extension for perfectionist Front-End Developers and UX Designers.

This tool will add grid layer on top of any website to be used as a guidance when developing interfaces. 

## Features
You can set the **horizontal** and **vertical** guides to match your specification.

For better experience, you can change the **colour** of the lines as well as the **opacity**, making it easier to compare the grid with your website design.

Choose between **lines** or **columns**.

The **offset** field enables you to add some padding to the top of the grid, in case your grid starts lower down the page.
 
If the page you are testing has some styles getting in the way of Baseliner, you can enable **Force Styles** to apply `!important` to the extension styles.

### Persistent Data
Baseliner will **save current configuration** values into the Chrome Storage API. This enables the user to have a persistent experience.

## Issues? Bugs? Suggestions?
Please, [open an issue](https://github.com/jpedroribeiro/Baseliner/issues/new/choose) and let us know about new features you wish we support or issues you've found while using the app.

## Installation
Baseliner is an **extension** for [Chrome](https://chrome.google.com/webstore/detail/baseliner/agoopbiflnjadjfbhimhlmcbgmdgldld), [Firefox](https://addons.mozilla.org/en-GB/firefox/addon/baseliner-add-on/), and [MS Edge](https://microsoftedge.microsoft.com/addons/detail/baseliner/ifgkfekmbjholbkkloalielmlgdoljfh)    

### Manual Installation
You can also install Baseliner without using the Chrome Store, this is helpful if you want to use a new feature that was no published yet.

1. Download this repo as a Zip file and extract it into a folder
1. Open Chrome Extensions page: `chrome://extensions/`
1. Click `Load unpacked extension`
1. Find the folder from **#1** and select it

# Developer Notes

## Building for Chrome or Edge

1. After updating code & bumping manifest version, run `yarn build`
1. Compress `/build` folder and submit it

## Developing for Firefox

To test locally, zip the files in the folder (`manifest.json` at root level), rename the `.zip` to `.xpi` and then load it on the tab `about:debugging`.

## Building for Firefox

1. Replace manifest with `firefox_addon/manifest.json`, it has an extra field needed for Firefox
2. Compress the files in the folder, not the folder itself (opposite of Chrome)  
3. Firefox doesn't like external files, so we need to copy workbox-sw.js into a local file and then reference it under `build/service-worker.js` like:

     importScripts('/third_party/workbox/workbox-sw.js');
     
     workbox.setConfig({
       modulePathPrefix: '/third_party/workbox/'
     });
     

## TODO
1. Firefox is currently stuck in 6.5.2 as they do not support manifest v3 at the moment (Latest working file: firefox-6.5.2.zip)
1. Add Typescript
1. Domain and website?
1. Contribution notes

## Future ideas
1. Use `chrome.scripting.insertCSS` instead of creating style tag: the caveat is that `removeCSS` is not supported in Chrome yet (FF only)
