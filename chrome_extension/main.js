/* Runs Baseliner script on tab */
chrome.tabs.executeScript(null, {file: "baseliner_v1.0.0.js"});


/* Sets variables */
var extensionTop        = document.getElementById('baselinerTop');
var extensionBaseline   = document.getElementById('baselinerValue');
var extensionBtnRemove  = document.getElementById('btnRemoveBaseliner');


/* Executes || Updates Baseliner */
var updatesBaseliner = function(){
    var newTop  = extensionTop.value || 0;
    var newBase = extensionBaseline.value || 0;

    chrome.tabs.executeScript({
        code: 'Baseliner.update(' + newBase + ',' + newTop + ')'
    });
};


/* Executes removeBaseliner */
var removeBaseliner = function(){
    chrome.tabs.executeScript({
        code: 'Baseliner.removeBaseliner()'
    });
};


/* Set event listeners */
extensionBaseline.addEventListener('input', updatesBaseliner);
extensionTop.addEventListener('input', updatesBaseliner);
extensionBtnRemove.addEventListener('click', removeBaseliner);


/*
TODO: Chrome Extension

DONE) Auto remove on Init
DONE) add 'Remove' button
NOPE) Integrate executable functions into one "run()"?
4) create icon for chrome extension
5) see other options for manifest.json
6) style chrome extension popup
7) comment/document everything
0) Review DEMO and see if it can use same as chrome version of JS
8) offer minified version on demo

 */