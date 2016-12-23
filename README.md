Baseliner
======

*[All your baseline are belong to us](https://en.wikipedia.org/wiki/All_your_base_are_belong_to_us)*

**Baseliner** is a Chrome extension for perfectionist Front-End Developers and UX Designers.

This tool will add grid layer on top of any website to be used as a guidance when developing interfaces. 

## Features
You can set the **horizontal** guides to match your specification as well as the **starting point**, in case you're only concerned about individual modules of your site.

For better experience, you can now change the **colour** of the lines as well as the **opacity**, making it easier to compare the grid with your website design.

### Persistent Data
As of v5.3, Baseliner will **save current configuration** values into the Chorme Storage API. This enables the user to have a persistent experience when the extension is closed and opened later on.

### Force height
Some websites set `height: 100%` to the body tag making its size to match the viewport. If you scroll down, Baseliner won't be repeated anymore due to being attached to the body tag.

By ticking the **Force height** checkbox, we overwrite that property: `body {height: auto}`, enabling Baseliner to repeat itself until the bottom of the page.

## Installation
Baseliner is a **Chrome extension** and can be found at the Chrome Web Store - https://chrome.google.com/webstore/detail/baseliner/agoopbiflnjadjfbhimhlmcbgmdgldld

### Manual Installation
You can also install Baseliner without using the Chrome Store, this is helpful if you want to use a new feature that was no published yet.

1. Download this repo as a Zip file and extract it into a folder
1. Open Chrome Extensions page: `chrome://extensions/`
1. Click `Load unpacked extension`
1. Find the folder from **#1** and select it
