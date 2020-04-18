/*global chrome*/
window.Baseliner = {
  styleTagID: "baselinerStyleEl",

  setup: function() {
    // Add Baseliner class to body
    document.body.classList.add("baseliner");

    // Add Baseliner style tag
    if (!document.getElementById(this.styleTagID)) {
      const styleTag = document.createElement("style");
      styleTag.id = this.styleTagID;
      styleTag.appendChild(document.createTextNode("")); // WebKit hack :(
      document.head.appendChild(styleTag);
    }

    this.startUp();
  },

  generateStyles: function(
    verticalRed,
    verticalBlue,
    verticalGreen,
    verticalOpacity,
    verticalBaseline,
    verticalEnable,
    horizontalRed,
    horizontalBlue,
    horizontalGreen,
    horizontalOpacity,
    horizontalBaseline,
    horizontalEnable
  ) {
    const baselinerPaddingTop = 0; // Note: disabling this feature for now
    const sheet = document.getElementById(this.styleTagID).sheet;

    /*language=LESS*/
    const stylesArray = [
      `.baseliner:active:after {
        display: none; /* NOTE: this could be optional? */
      }`,
      `.baseliner {
        position: relative;
      }`,
      `.baseliner:after {
        position: absolute;
        width: auto;
        height: auto;
        z-index: 9999;
        content: "";
        display: block;
        pointer-events: none;
        right: 0;
        bottom: 0;
        left: 0;
        background: linear-gradient(to right,
            rgba(${verticalRed}, ${verticalGreen}, ${verticalBlue}, ${
        verticalEnable ? verticalOpacity / 100 : 0
      }) 1px,
            transparent 1px
          )
          left top / ${verticalBaseline}px 100% repeat-x,
          linear-gradient(
            rgba(${horizontalRed}, ${horizontalGreen}, ${horizontalBlue}, ${
        horizontalEnable ? horizontalOpacity / 100 : 0
      }) 1px,
            transparent 1px
          )
          left top / 100% ${horizontalBaseline}px repeat-y;
        top: ${baselinerPaddingTop}px;
      }`,
      `body {
        height: auto;
      }`
    ];

    // Remove previous styles
    if (Array.from(sheet.cssRules).length > 0) {
      while (sheet.cssRules.length > 0) {
        sheet.deleteRule(0);
      }
    }

    // Apply new styles
    stylesArray.forEach(styleRule => {
      sheet.insertRule(styleRule);
    });

    // Tells extension we're done updating
    chrome.runtime.sendMessage({
      status: "update",
      objOfValues: {
        verticalRed,
        verticalBlue,
        verticalGreen,
        verticalOpacity,
        verticalBaseline,
        verticalEnable,
        horizontalRed,
        horizontalBlue,
        horizontalGreen,
        horizontalOpacity,
        horizontalBaseline,
        horizontalEnable
      }
    });
  },

  startUp: function() {
    const url = window.location.origin;

    // Check storage first
    chrome.storage.sync.get(url, data => {
      const item = data[url];

      if (item) {
        // We got data from previous session
        chrome.runtime.sendMessage({ status: "load", storage: item });

        console.log(
          "%c Baseliner loaded from Storage 🗄 ",
          "background: #DFDFDF; color: #209C39",
          item
        );
      } else {
        // We're ready to roll with default values
        chrome.runtime.sendMessage({ status: "default" });
      }
    });
  },

  saveToStorage: function(objOfValues) {
    const url = window.location.origin;
    const save = {};
    save[url] = objOfValues;

    if (!!url) {
      chrome.storage.sync.set(save, function() {
        console.log(
          `%c Baseliner ${
            objOfValues ? "data saved to storage 💾" : " storage cleared 🗑"
          }`,
          "background: #DFDFDF; color: #209C39",
          objOfValues
        );
      });
    }
  }
};

Baseliner.setup();
