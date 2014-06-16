(function(){
	var myBody = document.getElementsByTagName('body')[0],
		newStyle = document.createElement('style'),
		newSheet;

	// WebKit hack :(
	newStyle.appendChild(document.createTextNode(""));

	// adds style to head
	document.getElementsByTagName('head')[0].appendChild(newStyle);

	// adds styles
	newSheet = newStyle.sheet;
	newSheet.insertRule(".baseline { position: relative; }",0);
	newSheet.insertRule(".baseline:after { position: absolute; width: auto; height: auto; z-index: 9999; content: ''; display: block; pointer-events: none; top: calc(39px + 88px); top:0; right: 0; bottom: 0; left: 0; background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAIAQMAAADk/cxGAAAABlBMVEX///8AAABVwtN+AAAAAnRSTlMANrkpWKEAAAAMSURBVAiZY2BAAQ8AAPAA4ZQsu0UAAAAASUVORK5CYII=') repeat top left; }",0);
	newSheet.insertRule(".baseline:active:after { display: none; }",0);

	myBody.className = myBody.className + " baseline";
})();