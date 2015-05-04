// Runs Baseliner script on tab
chrome.tabs.executeScript(null, {file: "baseliner_v1.0.0.js"});


// Sets variables
var extensionTop        = document.getElementById('baselinerTop');
var extensionBaseline   = document.getElementById('baselinerValue');


// Executable function
var updatesBaseliner = function(){
    var newTop  = extensionTop.value || 0;
    var newBase = extensionBaseline.value || 0;

    chrome.tabs.executeScript({
        code: 'Baseliner.update(' + newBase + ',' + newTop + ')'
    });
};


// Set event listeners
extensionBaseline.addEventListener('input', updatesBaseliner);
extensionTop.addEventListener('input', updatesBaseliner);










/*
TODO: Chrome Extension
1) Auto remove on Init
2) add 'Remove' button
3) -
4) create icon for chrome extension
5) see other options for manifest.json
6) style chrome extension popup
7) comment/document everything
0) Review DEMO and see if it can use same as chrome version of JS
8) offer minified version on demo
 */