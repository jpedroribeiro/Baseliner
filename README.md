Baseliner
======

All your baseline are belong to 8px

**Baseliner** adds horizontal lines to match a baseline of 8px.

This is the first version and is very basic, more features to come.


## Installation

Create bookmarklet in your favourites and add the code below. It will run the minified code on the current page.


```
(function(){var a=document.getElementsByTagName("body")[0],c=document.createElement("style"),b;if(a.className.indexOf("baseliner")>0){a.classList.remove("baseliner");console.log("%c Baseliner removed from page. ","background: #DFDFDF; color: #677000")}else{c.appendChild(document.createTextNode(""));document.getElementsByTagName("head")[0].appendChild(c);b=c.sheet;b.insertRule(".baseliner { position: relative; }",0);b.insertRule(".baseliner:after { position: absolute; width: auto; height: auto; z-index: 9999; content: ''; display: block; pointer-events: none; top: calc(39px + 88px); top:0; right: 0; bottom: 0; left: 0; background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAIAQMAAADk/cxGAAAABlBMVEX///8AAABVwtN+AAAAAnRSTlMANrkpWKEAAAAMSURBVAiZY2BAAQ8AAPAA4ZQsu0UAAAAASUVORK5CYII=') repeat top left; }",0);b.insertRule(".baseliner:active:after { display: none; }",0);a.className=a.className+" baseliner";console.log("%c Baseliner added to page. ","background: #DFDFDF; color: #209C39")}})();
```


## Usage

Clicking on the bookmarklet will run the Baseliner script and add a baseliner to your page. Click again to remove it.
