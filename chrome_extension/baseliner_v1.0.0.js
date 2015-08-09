
/**
 * Baseliner
*/


Baseliner = {
	$body:			null,	// Caching DOM elements
	$head:			null,	//		''
	$style:			null,	//		''
	styleSheet:		null,	// Stylesheet object (default blank)
	calcBG:			null,	// Used for calculations only
	baselineTop:	0,		// Default value
	baselineBG:		'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAABCAMAAADO4v//AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDowMTgwMTE3NDA3MjA2ODExODA4M0E2MjRGQUZBNzBEMSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo3MzRDMzUwNDY1Q0UxMUU0OTRFREY2QjExNkIyRUM5MSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo3MzRDMzUwMzY1Q0UxMUU0OTRFREY2QjExNkIyRUM5MSIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MDE4MDExNzQwNzIwNjgxMTgwODNBNjI0RkFGQTcwRDEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MDE4MDExNzQwNzIwNjgxMTgwODNBNjI0RkFGQTcwRDEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6N6NZdAAAABlBMVEXJycn///98fvuHAAAAAnRSTlP/AOW3MEoAAAAPSURBVHjaYmBgYGAECDAAAAYAAkOFlzgAAAAASUVORK5CYII=',


	/**
	 * Initialises application
	 */
	init: function(){

		// SETUP: Update object's properties
		Baseliner.$body = document.getElementsByTagName('body')[0];
		Baseliner.$head = document.getElementsByTagName('head')[0];
		Baseliner.calcBG = Baseliner.baselineBG;

		// Cleanup if needed
		if ( Baseliner.findInArray('baseliner', Baseliner.$body.classList) ){
			Baseliner.removeBaseliner();
		}

		// Create style tag
		Baseliner.$style = document.createElement('style');

		// Add tag(s) to head
		Baseliner.$style.appendChild(document.createTextNode("")); // WebKit hack :(
		Baseliner.$head.appendChild(Baseliner.$style);

		// Add baseliner class
		Baseliner.$body.className += ' baseliner';

		// Message
		console.log('%c Baseliner added to page. ', 'background: #209C39; color: #DFDFDF');

		// Initialises with hardcoded default values
		Baseliner.update(8, 0);
	},


	/**
	 * Add CSS rules into Baseliner's styleSheet
	 * @param background
	 * @param top
	 */
	addRules: function(background, top) {
		// Default rules
		Baseliner.styleSheet = Baseliner.$style.sheet;
		Baseliner.styleSheet.insertRule(".baseliner { position: relative; }", 0);
		Baseliner.styleSheet.insertRule(".baseliner:after { position: absolute; width: auto; height: auto; z-index: 9999; content: ''; display: block; pointer-events: none; right: 0; bottom: 0; left: 0; }", 0);
		Baseliner.styleSheet.insertRule(".baseliner:active:after { display: none; }", 0);

		// Custom rules
		Baseliner.styleSheet.insertRule(".baseliner:after {background: url('" + background + "') repeat top left;}", 0);
		Baseliner.styleSheet.insertRule(".baseliner:after {top: " + top + "px;}", 0);
	},


	/**
	 * Removes application
	 */
	removeBaseliner: function () {
		if ( !!Baseliner.styleSheet ) {
			Baseliner.removeRules();
		}
		Baseliner.$body.classList.remove('baseliner');
		console.log('%c Baseliner removed from page. ', 'background: #209C39; color: #DFDFDF');
	},


	/**
	 * Removes CSS rules from Baseliner's styleSheet
	 */
	removeRules: function() {
		while ( Baseliner.styleSheet.rules.length > 0) {
			Baseliner.styleSheet.deleteRule(0);
		}
	},


	/**
	 * Updates Baseliner with new values
	 * @param newBaseline
	 * @param newTop
	 */
	update: function(newBaseline, newTop) {
		var canvas = document.createElement('canvas'),
			context = canvas.getContext('2d'),
			newBG;

		var image = new Image();
		image.src = Baseliner.baselineBG;

		canvas.width = 4;
		canvas.height = newBaseline;
		context.drawImage(image, 0, newBaseline - 1, 4, newBaseline);
		newBG = canvas.toDataURL();

		if ( !!Baseliner.styleSheet ) Baseliner.removeRules();
		Baseliner.addRules(newBG, newTop);
		console.log('%c Baseliner has a new baseline of ' + newBaseline + '. starting at ' + parseInt(newTop) + '.', 'background: #DFDFDF; color: #209C39');
	},

	/**
	 * Find a needle in a haystack
	 * @param needle
	 * @param haystack
	 * @returns {boolean}
	 */
	findInArray: function ( needle, haystack ) {
		var res = false;
		haystack.forEach(function(element, index, array){
			if (element == needle) res = true;
		});
		return res;
	}
};

Baseliner.init();