Baseliner
======

All your baseline are belong to 8px

**Baseliner** adds horizontal lines to match a baseline of 8px.

This is the first version and is very basic, more features to come.


## Installation

Create bookmarklet in your favourites and add the code below. It will run the minified code on the current page.


```
javascript:((function(){var e=document.getElementsByTagName("body")[0],t=document.getElementsByTagName("head")[0],n=document.createElement("style"),r=document.createElement("input"),i=document.createElement("input"),s;r.id="topChange";r.value=0;r.type="text";i.id="baselineChange";i.value=8;i.type="text";if(e.className.indexOf("baseliner")>0){e.classList.remove("baseliner");console.log("%c Baseliner removed from page. ","background: #DFDFDF; color: #677000")}else{n.appendChild(document.createTextNode(""));var o="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAABCAMAAADO4v//AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDowMTgwMTE3NDA3MjA2ODExODA4M0E2MjRGQUZBNzBEMSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo3MzRDMzUwNDY1Q0UxMUU0OTRFREY2QjExNkIyRUM5MSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo3MzRDMzUwMzY1Q0UxMUU0OTRFREY2QjExNkIyRUM5MSIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MDE4MDExNzQwNzIwNjgxMTgwODNBNjI0RkFGQTcwRDEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MDE4MDExNzQwNzIwNjgxMTgwODNBNjI0RkFGQTcwRDEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6N6NZdAAAABlBMVEXJycn///98fvuHAAAAAnRSTlP/AOW3MEoAAAAPSURBVHjaYmBgYGAECDAAAAYAAkOFlzgAAAAASUVORK5CYII=";t.appendChild(n);e.appendChild(r);e.appendChild(i);s=n.sheet;function u(e){s.insertRule(".baseliner { position: relative; }",0);s.insertRule(".baseliner:after { position: absolute; width: auto; height: auto; z-index: 9999; content: ''; display: block; pointer-events: none; top:0; right: 0; bottom: 0; left: 0; background: url('"+e+"') repeat top left; }",0);s.insertRule(".baseliner:active:after { display: none; }",0)}function a(){while(s.rules.length>0){s.deleteRule(0)}}e.className=e.className+" baseliner";console.log("%c Baseliner added to page. ","background: #DFDFDF; color: #209C39");var f=document.getElementById("topChange"),l=document.getElementsByClassName("baseliner")[0],c=function(){l.style.top=f.value+"px";console.log("%c Baseliner starting at "+l.style.top+". ","background: #DFDFDF; color: #209C39")};f.addEventListener("input",c);var h=new Image,p=document.getElementById("baselineChange");h.src=o;var d=function(){var e=document.createElement("canvas"),t=e.getContext("2d"),n=p.value;e.width=4;e.height=n;t.drawImage(h,0,n-1,4,n);var r=e.toDataURL();a();u(r);console.log("%c Baseliner new baseline is "+n+". ","background: #DFDFDF; color: #209C39")};p.addEventListener("input",d)}d()})())();
```


## Usage

Clicking on the bookmarklet will run the Baseliner script and add a baseliner to your page. Click again to remove it.
