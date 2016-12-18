
/**
 * Baseliner
 */


Baseliner = {
	$body:				null,	// Caching DOM elements
	$head:				null,	//		''
	$style:				null,	//		''
	styleSheet:			null,	// Stylesheet object (default blank)
	baselineTop:		0,		// Default value
	baseline:			12,		//      ''
	baselineOpacity:	100,
	baselineColor:		'#CCCCCC',
	baselineForceHeight: false,

	/**
	 * Initialises application
	 */
	init: function () {
		// SETUP: Update object's properties
		this.$body = document.getElementsByTagName('body')[0];
		this.$head = document.getElementsByTagName('head')[0];

		// Was Baseliner loaded yet?...
		if ( this.findInArray('baseliner', this.$body.classList) ){
			// ...then lets update the default values with the ones used on current site
			this.baseline = this.getBaselineDataAttribute();
			this.baselineTop = this.getTopDataAttribute();
			this.baselineColor = this.getColorDataAttribute();
			this.baselineOpacity = this.getOpacityDataAttribute();
			this.baselineForceHeight = this.getForceHeightDataAttribute();
		}

		return this.setup(this.baseline, this.baselineTop, this.baselineColor, this. baselineOpacity, this.baselineForceHeight, true);
	},

	/**
	*	Main setup, decoupled from init to enable different setups from data/storage
	* 	@param ...
	*	@param firstRunFlag - disables saving to storage on first run to avoid saving defaults
	*/
	setup: function (baseline, top, color, opacity, forceHeight, firstRunFlag) {
		Baseliner.removeBaseliner();

		// Create style tag
		Baseliner.$style = document.createElement('style');
		Baseliner.$style.id = "baselinerStyle"

		// Add tag(s) to head
		Baseliner.$style.appendChild(document.createTextNode("")); // WebKit hack :(
		Baseliner.$head.appendChild(Baseliner.$style);

		// Add baseliner class
		Baseliner.$body.className += ' baseliner';

		// Message
		console.log('%c Baseliner added to page. ', 'background: #209C39; color: #DFDFDF');

		// Initialises with object values
		Baseliner.update(baseline, top, color, opacity, forceHeight, !!firstRunFlag);

		// ...and send them back to the Extension tab (main.js)
		return [baseline, top, color, opacity, forceHeight];
	},

	/**
	*	Check if Baseliner has any data on Storage
	*
	*	async
	*/
	checkForBaselinerInStorage: function () {
		var url = window.location.href;
		chrome.storage.sync.get(url, function (data) {
			var item = data[url];
			if (item) {
				// All done!
				console.log('%c Baseliner loaded from Storage 🗄 ', 'background: #DFDFDF; color: #209C39');
				Baseliner.setup(item.baseline, item.top, item.color, item.opacity, item.forceHeight);

				// Tells extension we got data
				chrome.runtime.sendMessage({data: item});
			}
		});
	},


	/**
	*	Save/update current Baseliner data into Storage for future use
	*	@param url
	*	@param baseline
	*	@param top
	*	@param color
	*	@param opacity
	*	@param forceHeight
	*	
	*	async
	*/
	storeBaseliner: function (url, baseline, top, color, opacity, forceHeight) {
		var saveObj = {},
			current = {
			baseline: baseline,
			top: top,
			color: color,
			opacity: opacity,
			forceHeight: forceHeight
		};

		saveObj[url] = current;

		if (!!url) {
			chrome.storage.sync.set(saveObj, function () {
				console.log('%c Baseliner data saved to storage 💾', 'background: #DFDFDF; color: #209C39')
			});
		}
	},


	/**
	 * Convert color from hex to rgb
	 * @param hex
	 */
	hexToRgb: function(hex) {
		// Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
		var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
		hex = hex.replace(shorthandRegex, function(m, r, g, b) {
		    return r + r + g + g + b + b;
		});

		var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
		return result ? {
			r: parseInt(result[1], 16),
			g: parseInt(result[2], 16),
			b: parseInt(result[3], 16)
		} : null;
	},


	/**
	 * Add CSS rules into Baseliner's styleSheet
	 * @param color
	 * @param top
	 * @param height
	 * @param opacity
	 * @param forceHeightFlag
	 */
	addRules: function(height, top, color, opacity, forceHeightFlag) {
		// Default rules
		Baseliner.styleSheet = Baseliner.$style.sheet;
		Baseliner.styleSheet.insertRule(".baseliner { position: relative; }", 0);
		Baseliner.styleSheet.insertRule(".baseliner:after { position: absolute; width: auto; height: auto; z-index: 9999; content: ''; display: block; pointer-events: none; right: 0; bottom: 0; left: 0; }", 0);
		Baseliner.styleSheet.insertRule(".baseliner:active:after { display: none; }", 0);

		// Custom rules
		Baseliner.styleSheet.insertRule(".baseliner:after {background: linear-gradient(rgba(" + Baseliner.hexToRgb(color).r + ", " + Baseliner.hexToRgb(color).g + ", " + Baseliner.hexToRgb(color).b + ", " + (opacity / 100) +") 1px, transparent 1px) left top / 1px " + height + "px; }", 0);
		Baseliner.styleSheet.insertRule(".baseliner:after {top: " + top + "px;}", 0);
	
		// Force Height Flag
		if (forceHeightFlag) {
			Baseliner.styleSheet.insertRule("body {height: auto}", 0);			
		}
	},


	/**
	 * Removes application
	 */
	removeBaseliner: function () {
		if ( !!Baseliner.styleSheet ) {
			Baseliner.removeRules();
		}
		Baseliner.$body.classList.remove('baseliner');

		var styleNode = document.getElementById("baselinerStyle");
  		styleNode && styleNode.parentNode.removeChild(styleNode);

		console.log('%c Baseliner removed from page. ', 'background: #209C39; color: #DFDFDF');
	},


	/**
	 * Removes CSS rules from Baseliner's styleSheet
	 */
	removeRules: function() {
		// Default rules
		Baseliner.styleSheet = Baseliner.$style.sheet;

		while ( Baseliner.styleSheet.rules.length > 0) {
			Baseliner.styleSheet.deleteRule(0);
		}
	},


	/**
	 * Updates Baseliner with new values
	 * @param newBaseline
	 * @param newTop
	 * @param newColor
	 * @param newOpacity
	 * @param forceHeightFlag
	 */
	update: function(newBaseline, newTop, newColor, newOpacity, forceHeightFlag, firstRunFlag) {

		if ( !!Baseliner.styleSheet ) Baseliner.removeRules();

		Baseliner.addRules(newBaseline, newTop, newColor, newOpacity, forceHeightFlag);

		Baseliner.setDataAttributes(newBaseline, newTop, newColor, newOpacity, forceHeightFlag);

		if (!firstRunFlag) {
			Baseliner.storeBaseliner(window.location.href, newBaseline, newTop, newColor, newOpacity, forceHeightFlag);
		}

		console.log('%c Baseliner has a new baseline of ' + newBaseline + '. starting at ' + parseInt(newTop) + '.', 'background: #DFDFDF; color: #209C39');
	},


	/**
	 * Find a needle in a haystack
	 * @param needle
	 * @param haystack
	 * @returns {boolean}
	 */
	findInArray: function (needle, haystack) {
		var res = false;
		haystack.forEach(function(element, index, array){
			if (element == needle) res = true;
		});
		return res;
	},


	/**
	 * Add values to body as data attributes for reusability
	 * @param baseline
	 * @param top
	 * @param color
	 * @param opacity
	 * @param force
	 */
	setDataAttributes: function(baseline, top, color, opacity, force){
		this.$body.setAttribute('blnr-bas', baseline);
		this.$body.setAttribute('blnr-top', top);
		this.$body.setAttribute('blnr-color', color);
		this.$body.setAttribute('blnr-opacity', opacity);
		this.$body.setAttribute('blnr-force', force);
	},


	/**
	 * Returns baseline value from body if present
	 * @returns {*}
	 */
	getBaselineDataAttribute: function(){
		if ( this.$body.getAttribute('blnr-bas') && this.$body.getAttribute('blnr-bas') !== ''){
			return this.$body.getAttribute('blnr-bas');
		} else {
			return false;
		}
	},


	/**
	 * Returns top value from body if present
	 * @returns {*}
	 */
	getTopDataAttribute: function(){
		if ( this.$body.getAttribute('blnr-top') && this.$body.getAttribute('blnr-top') !== ''){
			return this.$body.getAttribute('blnr-top');
		} else {
			return false;
		}
	},


	/**
	 * Returns color value from body if present
	 * @returns {*}
	 */
	getColorDataAttribute: function(){
		if ( this.$body.getAttribute('blnr-color') && this.$body.getAttribute('blnr-color') !== ''){
			return this.$body.getAttribute('blnr-color');
		} else {
			return false;
		}
	},


	/**
	 * Returns opacity value from body if present
	 * @returns {*}
	 */
	getOpacityDataAttribute: function(){
		if ( this.$body.getAttribute('blnr-opacity') && this.$body.getAttribute('blnr-opacity') !== ''){
			return this.$body.getAttribute('blnr-opacity');
		} else {
			return false;
		}
	},


	/**
	 * Returns force height flag value from body if present
	 * @returns {*}
	 */
	getForceHeightDataAttribute: function(){
		if ( this.$body.getAttribute('blnr-force') && this.$body.getAttribute('blnr-force') !== ''){
			return this.$body.getAttribute('blnr-force') === "true";
		} else {
			return false;
		}
	}


};

Baseliner.init();
