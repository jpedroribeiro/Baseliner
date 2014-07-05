(function(){
	var myBody = document.getElementsByTagName('body')[0],
		newStyle = document.createElement('style'),
		newSheet;

	// Has class?
	if (myBody.className.indexOf('baseliner') > 0) {
		myBody.classList.remove('baseliner');
		console.log('%c Baseliner removed from page. ', 'background: #DFDFDF; color: #677000');
	} else {
		// WebKit hack :(
		newStyle.appendChild(document.createTextNode(""));

		// adds style to head
		document.getElementsByTagName('head')[0].appendChild(newStyle);

		// adds styles
		newSheet = newStyle.sheet;
		newSheet.insertRule(".baseliner { position: relative; }",0);
		newSheet.insertRule(".baseliner:after { position: absolute; width: auto; height: auto; z-index: 9999; content: ''; display: block; pointer-events: none; top: calc(39px + 88px); top:0; right: 0; bottom: 0; left: 0; background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAIAQMAAADk/cxGAAAABlBMVEX///8AAABVwtN+AAAAAnRSTlMANrkpWKEAAAAMSURBVAiZY2BAAQ8AAPAA4ZQsu0UAAAAASUVORK5CYII=') repeat top left; }",0);
		newSheet.insertRule(".baseliner:active:after { display: none; }",0);

		myBody.className = myBody.className + " baseliner";
		console.log('%c Baseliner added to page. ', 'background: #DFDFDF; color: #209C39');
	}

	
})();