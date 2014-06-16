Baseliner
======

All your baseline are belong to 8px

**Baseliner** adds horizontal lines to match a baseline of 8px.

This is the first version and is very basic, more features to come.


## How To Use It

Drag this bookmarklet to your favourites. It will run the minified code in the current page.

``(javascript:(function(){var e=document.getElementsByTagName("body")[0],t=document.createElement("style"),n;t.appendChild(document.createTextNode(""));document.getElementsByTagName("head")[0].appendChild(t);n=t.sheet;n.insertRule(".baseline { position: relative; }",0);n.insertRule(".baseline:after { position: absolute; width: auto; height: auto; z-index: 9999; content: ''; display: block; pointer-events: none; top: calc(39px + 88px); top:0; right: 0; bottom: 0; left: 0; background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAIAQMAAADk/cxGAAAABlBMVEX///8AAABVwtN+AAAAAnRSTlMANrkpWKEAAAAMSURBVAiZY2BAAQ8AAPAA4ZQsu0UAAAAASUVORK5CYII=') repeat top left; }",0);n.insertRule(".baseline:active:after { display: none; }",0);e.className=e.className+" baseline"})()``

