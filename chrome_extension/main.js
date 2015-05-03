// Runs Baseliner
chrome.tabs.executeScript(null, {file: "baseliner_v1.0.0.js"});


// Baseliner Init
chrome.tabs.executeScript({
    code: "myBody = document.getElementsByTagName('body')[0]; myBody.className = myBody.className + ' baseliner'; console.log('%c Baseliner added to page. ', 'background: #209C39; color: #DFDFDF');"
});


// Set event listeners between scopes
var mytop = document.getElementById('baselinerTop');
var mybase = document.getElementById('baselinerValue');

var value = 'alert(' + mytop.value + ')';

mybase.addEventListener('input', function(){
    chrome.tabs.executeScript({
        code: 'baselinerUpdatesImage(' + mybase.value + ')'
    });
});

mytop.addEventListener('input', function(){
    chrome.tabs.executeScript({
        code: 'baselinerUpdateTop(' + mytop.value + ')'
    });
});


// Starts default baseline
chrome.tabs.executeScript({
    code: 'baselinerUpdatesImage(8)'
});









/*
TODO
1) organize the code into something more maintainable: try to make it into modules so the demo and the chrome extension can 'require' the same minified file OR separate into modules so it's clear which tool uses which module
2) fix 'remove baseliner': move it to a form button
3) organize main.js
4) create icon for chrome extension
5) see other options for manifest.json
6) style chrome extension popup
7) comment/document everything
8) offer minified version on demo
 */