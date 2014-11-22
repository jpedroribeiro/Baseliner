(function(){
	var myBody = document.getElementsByTagName('body')[0],
		myHead = document.getElementsByTagName('head')[0],
		newStyle = document.createElement('style'),
		myTopChangeField = document.createElement('input'),
		myBaselineChangeField = document.createElement('input'),
		newSheet,
		baseBaseline = 8,
		baseTop = 0,
		baseBg = calcBG = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAABCAMAAADO4v//AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDowMTgwMTE3NDA3MjA2ODExODA4M0E2MjRGQUZBNzBEMSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo3MzRDMzUwNDY1Q0UxMUU0OTRFREY2QjExNkIyRUM5MSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo3MzRDMzUwMzY1Q0UxMUU0OTRFREY2QjExNkIyRUM5MSIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MDE4MDExNzQwNzIwNjgxMTgwODNBNjI0RkFGQTcwRDEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MDE4MDExNzQwNzIwNjgxMTgwODNBNjI0RkFGQTcwRDEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6N6NZdAAAABlBMVEXJycn///98fvuHAAAAAnRSTlP/AOW3MEoAAAAPSURBVHjaYmBgYGAECDAAAAYAAkOFlzgAAAAASUVORK5CYII=';


	// Setup config fields
	myTopChangeField.id = "topChange";
	myTopChangeField.value = baseTop;
	myTopChangeField.type = "text";
	myBaselineChangeField.id = "baselineChange";
	myBaselineChangeField.value = baseBaseline;
	myBaselineChangeField.type = "text";
	// TODO: find better position for text fields


	if (myBody.className.indexOf('baseliner') > 0) {
		// remove children input
		myBody.removeChild(document.getElementById(myTopChangeField.id));
		myBody.removeChild(document.getElementById(myBaselineChangeField.id));
		removeRules();
		myBody.classList.remove('baseliner');
		console.log('%c Baseliner removed from page. ', 'background: #209C39; color: #DFDFDF');

	} else {

		// WebKit hack :(
		newStyle.appendChild(document.createTextNode(""));


		// add tags to head
		myHead.appendChild(newStyle);
		myBody.appendChild(myTopChangeField);
		myBody.appendChild(myBaselineChangeField);


		// FUNCTION: update rules functions
		function addRules(background, top) {
			// add static rules
			newSheet = newStyle.sheet;
			newSheet.insertRule(".baseliner { position: relative; }",0);
			newSheet.insertRule(".baseliner:after { position: absolute; width: auto; height: auto; z-index: 9999; content: ''; display: block; pointer-events: none; right: 0; bottom: 0; left: 0; }",0);
			newSheet.insertRule(".baseliner:active:after { display: none; }",0);
			// custom ones
			newSheet.insertRule(".baseliner:after {background: url('" + background + "') repeat top left;}", 0);
			newSheet.insertRule(".baseliner:after {top: " + top + "px;}", 0);
		}


		// FUNCTION: remove rules
		function removeRules(){
			if ( newSheet !== undefined ){
				while ( newSheet.rules.length > 0) {
					newSheet.deleteRule(0);
				}
			}
		}


		// FUNCTION: Update top
		var topChange = document.getElementById('topChange'),
			el = document.getElementsByClassName('baseliner')[0],
			updateTop = function(){
				baseTop = topChange.value;
				removeRules();
				addRules(baseBg, baseTop);
				console.log('%c Baseliner is now starting at ' + parseInt(topChange.value) + '. ', 'background: #DFDFDF; color: #209C39');
			};
		topChange.addEventListener('input', updateTop);


		// FUNCTION: Update image: data > canvas > data
		var image = new Image(),
			baselineChange = document.getElementById('baselineChange');
		image.src = calcBG;

		var updatesImage = function (){
			var canvas = document.createElement('canvas'),
				context = canvas.getContext('2d'),
				height = baselineChange.value;
			canvas.width = 4;
			canvas.height = height;
			context.drawImage(image, 0, height-1, 4, height);
			var newBG = canvas.toDataURL();
			baseBg = newBG;
			removeRules();
			addRules(baseBg, baseTop);
			console.log('%c Baseliner has a new baseline of ' + height + '. ', 'background: #DFDFDF; color: #209C39');
		};
		baselineChange.addEventListener('input', updatesImage);


		// init
		myBody.className = myBody.className + " baseliner";
		console.log('%c Baseliner added to page. ', 'background: #209C39; color: #DFDFDF');

		// runs with default values
		updatesImage();
	}

})();