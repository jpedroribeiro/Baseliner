
/* Sets variables */
var $extensionTop        = document.getElementById('baselinerTop');
var $extensionBaseline   = document.getElementById('baselinerValue');
var $extensionBtnRemove  = document.getElementById('btnRemoveBaseliner');


/* Runs Baseliner script on tab */
chrome.tabs.executeScript(null, {file: "baseliner_v1.0.0.js"}, function(currentValues){
    // currentValues is either the default or the current values on data-attribs
    $extensionBaseline.value = currentValues[0][0];
    $extensionTop.value = currentValues[0][1];
});


/* Executes || Updates Baseliner */
var updatesBaseliner = function(event){

    // If Up/Down arrow pressed...
    if (event.keyIdentifier === 'Up' && event.target === $extensionTop) $extensionTop.value++;
    if (event.keyIdentifier === 'Down' && event.target === $extensionTop) $extensionTop.value--;
    if (event.keyIdentifier === 'Up' && event.target === $extensionBaseline) $extensionBaseline.value++;
    if (event.keyIdentifier === 'Down' && event.target === $extensionBaseline) $extensionBaseline.value--;

    // Set my initial vars with integers
    var newTop  = $extensionTop.value;
    var newBase = $extensionBaseline.value;

    // Executes Baseliner update script
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


/* Set event listeners on form fields */
$extensionBaseline.addEventListener('input', updatesBaseliner);
$extensionBaseline.addEventListener('keydown', updatesBaseliner);
$extensionTop.addEventListener('input', updatesBaseliner);
$extensionTop.addEventListener('keydown', updatesBaseliner);
$extensionBtnRemove.addEventListener('click', removeBaseliner);


/*


V1 Done - 30/08/2015
DONE) Detect current baseliner config when clicking on the extension icon so I can continue the work
DONE) Update README
DONE) Auto remove on Init
DONE) add 'Remove' button
NOPE) Integrate executable functions into one "run()"?
DONE) create icon for chrome extension
DONE) see other options for manifest.json
DONE) style chrome extension popup
DONE) comment/document everything

 */