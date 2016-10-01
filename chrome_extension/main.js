
/* Sets variables */
var $extensionTop        = document.getElementById('baselinerTop');
var $extensionBaseline   = document.getElementById('baselinerValue');
var $extensionBtnRemove  = document.getElementById('btnRemoveBaseliner');
var $arrowtopUp          = document.getElementById('topUp');
var $arrowtopDown        = document.getElementById('topDown');
var $arrowbaseUp         = document.getElementById('baseUp');
var $arrowbaseDown       = document.getElementById('baseDown');
var $extensionOpacity    = document.getElementById('baselinerOpacity');
var $arrowOpacityUp          = document.getElementById('opacityUp');
var $arrowOpacityDown        = document.getElementById('opacityDown');
var $baselinerColor      = document.getElementById('baselinerColor');
var $color               = '';

/* Runs Baseliner script on tab */
chrome.tabs.executeScript(null, {file: "baseliner_v1.0.0.js"}, function(currentValues){
    // currentValues is either the default or the current values on data-attribs
    $baselinerColor.value  = currentValues[0][0]
    $extensionBaseline.value = currentValues[0][1];
    $extensionTop.value = currentValues[0][2];
    $extensionOpacity.value = currentValues[0][3]

});


/* Executes || Updates Baseliner */
var updatesBaseliner = function(event){
    // If Up/Down arrow pressed...
    if (event.keyIdentifier === 'Up' && event.target === $extensionTop) $extensionTop.value++;
    if (event.keyIdentifier === 'Down' && event.target === $extensionTop) $extensionTop.value--;
    if (event.keyIdentifier === 'Up' && event.target === $extensionBaseline) $extensionBaseline.value++;
    if (event.keyIdentifier === 'Down' && event.target === $extensionBaseline) $extensionBaseline.value--;
    if (event.keyIdentifier === 'Up' && event.target === $extensionOpacity) $extensionOpacity.value++;
    if (event.keyIdentifier === 'Down' && event.target === $extensionOpacity) $extensionOpacity.value--;
    if (event.keyIdentifier === 'setColor') $baselinerColor.value = event.color;

    // Set my initial vars with integers
    var newTop  = $extensionTop.value;
    var newBase = $extensionBaseline.value;
    var newColor = $baselinerColor.value;
    var newOpacity = $extensionOpacity.value;
    console.log('updatesBaseliner');

    // Executes Baseliner update script
    chrome.tabs.executeScript({

        code: 'Baseliner.update("' + newColor + '",' + newBase + ',' + newTop + ',' + newOpacity + ')'
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
$extensionOpacity.addEventListener('input', updatesBaseliner);
$extensionOpacity.addEventListener('keydown', updatesBaseliner);

$extensionBtnRemove.addEventListener('click', removeBaseliner);

/* Event Listeners for arrows */
$arrowtopUp.addEventListener('click', function(){
    var event = {
        keyIdentifier: "Up",
        target: $extensionTop
    }
    updatesBaseliner(event);
});
$arrowtopDown.addEventListener('click', function(){
    var event = {
        keyIdentifier: "Down",
        target: $extensionTop
    }
    updatesBaseliner(event);
});
$arrowbaseUp.addEventListener('click', function(){
    var event = {
        keyIdentifier: "Up",
        target: $extensionBaseline
    }
    updatesBaseliner(event);
});
$arrowbaseDown.addEventListener('click', function(){
    var event = {
        keyIdentifier: "Down",
        target: $extensionBaseline
    }
    updatesBaseliner(event);
});

$arrowOpacityUp.addEventListener('click', function(){
    var event = {
        keyIdentifier: "Up",
        target: $extensionOpacity
    }
    updatesBaseliner(event);
});
$arrowOpacityDown.addEventListener('click', function(){
    var event = {
        keyIdentifier: "Down",
        target: $extensionOpacity
    }
    updatesBaseliner(event);
});

$baselinerColor.addEventListener('blur',  function(e){
    var event = {
        keyIdentifier: "setColor",
        color: this.value
    }
    updatesBaseliner(event);
});
