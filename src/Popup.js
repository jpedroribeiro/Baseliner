/*global chrome*/
import React from "react";
import "./Popup.css";
import hexToRGB from "./hexToRGB";
import rgbToHex from "./rgbToHex";

function Popup() {
  const ENV_EXTENSION = chrome && chrome.tabs;
  const [hasStartedUp, setHasStartedUp] = React.useState(false);
  const [statusLabel, setStatusLabel] = React.useState("loading...");
  const [enableVertical, setEnableVertical] = React.useState(true);
  const [colourVertical, setColourVertical] = React.useState("#ff0000");
  const [opacityVertical, setOpacityVertical] = React.useState(100);
  const [baselineVertical, setBaselineVertical] = React.useState(8);
  const [enableHorizontal, setEnableHorizontal] = React.useState(false);
  const [colourHorizontal, setColourHorizontal] = React.useState("#00ff00");
  const [opacityHorizontal, setOpacityHorizontal] = React.useState(100);
  const [baselineHorizontal, setBaselineHorizontal] = React.useState(8);

  function handleEnable(e) {
    const grid = e.currentTarget.dataset.grid;
    const checked = e.currentTarget.checked;
    if (grid === "vertical") {
      setEnableVertical(checked);
    } else {
      setEnableHorizontal(checked);
    }
  }
  function handleColour(e) {
    const grid = e.currentTarget.dataset.grid;
    if (grid === "vertical") {
      setColourVertical(e.currentTarget.value);
    } else {
      setColourHorizontal(e.currentTarget.value);
    }
  }

  function handleBaseline(e) {
    const grid = e.currentTarget.dataset.grid;
    if (grid === "vertical") {
      setBaselineVertical(e.currentTarget.value);
    } else {
      setBaselineHorizontal(e.currentTarget.value);
    }
  }

  function handleOpacity(e) {
    const grid = e.currentTarget.dataset.grid;
    if (grid === "vertical") {
      setOpacityVertical(e.currentTarget.value);
    } else {
      setOpacityHorizontal(e.currentTarget.value);
    }
  }

  React.useEffect(() => {
    /* Note: renders based on first load */
    if (ENV_EXTENSION) {
      // Load up Baseliner script
      chrome.tabs.executeScript(null, { file: "/baseliner.js" });

      // Start listening to messages
      chrome.runtime.onMessage.addListener(function(message) {
        switch (message?.status) {
          case "default":
            setStatusLabel("Baseliner extension ready with defaults");
            setHasStartedUp(true);
            break;

          case "update":
            setStatusLabel("Baseliner styles updated");
            setHasStartedUp(true);

            // Save to storage
            chrome.tabs.executeScript({
              code: `Baseliner.saveToStorage({
                verticalRed: ${message.objOfValues.verticalRed},
                verticalBlue: ${message.objOfValues.verticalBlue},
                verticalGreen: ${message.objOfValues.verticalGreen},
                verticalOpacity: ${message.objOfValues.verticalOpacity},
                verticalBaseline: ${message.objOfValues.verticalBaseline},
                verticalEnable: ${message.objOfValues.verticalEnable},
                horizontalRed: ${message.objOfValues.horizontalRed},
                horizontalBlue: ${message.objOfValues.horizontalBlue},
                horizontalGreen: ${message.objOfValues.horizontalGreen},
                horizontalOpacity: ${message.objOfValues.horizontalOpacity},
                horizontalBaseline: ${message.objOfValues.horizontalBaseline},
                horizontalEnable: ${message.objOfValues.horizontalEnable}
              })`
            });
            break;

          case "load":
            setStatusLabel("Baseliner loaded from storage");
            const {
              storage: {
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
            } = message;
            setColourHorizontal(
              rgbToHex(horizontalRed, horizontalGreen, horizontalBlue)
            );
            setOpacityHorizontal(horizontalOpacity);
            setBaselineHorizontal(horizontalBaseline);
            setEnableHorizontal(horizontalEnable);
            setColourVertical(
              rgbToHex(verticalRed, verticalGreen, verticalBlue)
            );
            setOpacityVertical(verticalOpacity);
            setBaselineVertical(verticalBaseline);
            setEnableVertical(verticalEnable);

            // Generate and apply styles
            chrome.tabs.executeScript({
              code: `Baseliner.generateStyles(
                ${verticalRed},
                ${verticalBlue},
                ${verticalGreen},
                ${verticalOpacity},
                ${verticalBaseline},
                ${verticalEnable},
                ${horizontalRed},
                ${horizontalBlue},
                ${horizontalGreen},
                ${horizontalOpacity},
                ${horizontalBaseline},
                ${horizontalEnable}
              )`
            });
            break;

          case "removed":
            setStatusLabel("Baseliner removed");
            break;

          default:
            console.error("Unrecognized status message", message);
        }
      });
    }
  }, [ENV_EXTENSION]);

  React.useEffect(() => {
    /* Note: renders based on UI changes OR when it has started up */
    if (ENV_EXTENSION && hasStartedUp) {
      const colourVerticalRGB = hexToRGB(colourVertical);
      const vertical = {
        red: colourVerticalRGB.r,
        green: colourVerticalRGB.g,
        blue: colourVerticalRGB.b,
        opacity: opacityVertical,
        baseline: baselineVertical,
        enable: enableVertical
      };
      const colourHorizontalRGB = hexToRGB(colourHorizontal);
      const horizontal = {
        red: colourHorizontalRGB.r,
        green: colourHorizontalRGB.g,
        blue: colourHorizontalRGB.b,
        opacity: opacityHorizontal,
        baseline: baselineHorizontal,
        enable: enableHorizontal
      };

      // Generate and apply styles
      chrome.tabs.executeScript({
        code: `Baseliner.generateStyles(
          ${vertical.red}, 
          ${vertical.blue}, 
          ${vertical.green}, 
          ${vertical.opacity},
          ${vertical.baseline}, 
          ${vertical.enable}, 
          ${horizontal.red}, 
          ${horizontal.blue}, 
          ${horizontal.green}, 
          ${horizontal.opacity},
          ${horizontal.baseline},
          ${horizontal.enable}
        )`
      });
    }
  }, [
    ENV_EXTENSION,
    hasStartedUp,
    colourVertical,
    colourHorizontal,
    opacityVertical,
    opacityHorizontal,
    baselineVertical,
    baselineHorizontal,
    enableVertical,
    enableHorizontal
  ]);

  return (
    <div className="popup">
      <h1>
        <a
          href={"https://github.com/jpedroribeiro/Baseliner/"}
          target={"_blank"}
        >
          Baseliner
        </a>
      </h1>
      <p className={"status"}>
        <b>Status:</b> {statusLabel}
      </p>
      <div className={`grid vertical${enableVertical ? "" : " disabled"}`}>
        <h2>Vertical</h2>
        <div className={"row checkbox"}>
          <input
            type="checkbox"
            id="enableVertical"
            checked={enableVertical}
            data-grid="vertical"
            onChange={handleEnable}
          />
          <label htmlFor={"enableVertical"}>Enable</label>
        </div>
        <div className={"row"}>
          <label htmlFor={"colourVertical"}>Colour</label>
          <input
            disabled={!enableVertical}
            type="color"
            id="colourVertical"
            value={colourVertical}
            data-grid="vertical"
            onChange={handleColour}
          />
        </div>

        <div className={"row"}>
          <label htmlFor={"opacityVertical"}>Opacity</label>
          <input
            disabled={!enableVertical}
            type="range"
            min={0}
            max={100}
            id="opacityVertical"
            value={opacityVertical}
            data-grid="vertical"
            onChange={handleOpacity}
          />
          <span>{opacityVertical}%</span>
        </div>

        <div className={"row"}>
          <label htmlFor={"baselineVertical"}>Baseline</label>
          <input
            disabled={!enableVertical}
            type="number"
            min={2}
            id="baselineVertical"
            value={baselineVertical}
            data-grid="vertical"
            onChange={handleBaseline}
          />
        </div>
      </div>
      <div className={`grid horizontal${enableHorizontal ? "" : " disabled"}`}>
        <h2>Horizontal</h2>
        <div className={"row checkbox"}>
          <input
            type="checkbox"
            id="enableHorizontal"
            checked={enableHorizontal}
            data-grid="horizontal"
            onChange={handleEnable}
          />
          <label htmlFor={"enableHorizontal"}>Enable</label>
        </div>
        <div className={"row"}>
          <label htmlFor={"colourHorizontal"}>Colour</label>
          <input
            disabled={!enableHorizontal}
            type="color"
            id="colourHorizontal"
            value={colourHorizontal}
            data-grid="horizontal"
            onChange={handleColour}
          />
        </div>

        <div className={"row"}>
          <label htmlFor={"opacityHorizontal"}>Opacity</label>
          <input
            disabled={!enableHorizontal}
            type="range"
            min={0}
            max={100}
            id="opacityHorizontal"
            value={opacityHorizontal}
            data-grid="horizontal"
            onChange={handleOpacity}
          />
          <span>{opacityHorizontal}%</span>
        </div>

        <div className={"row"}>
          <label htmlFor={"baselineHorizontal"}>Baseline</label>
          <input
            disabled={!enableHorizontal}
            type="number"
            min={2}
            id="baselineHorizontal"
            value={baselineHorizontal}
            data-grid="horizontal"
            onChange={handleBaseline}
          />
        </div>
      </div>
      <div className={"footer"}>
        <a
          href={"https://github.com/jpedroribeiro/Baseliner/issues"}
          target={"_blank"}
          title={"Suggestions? Bugs? Drop us a message"}
        >
          Feedback?
        </a>
        <a
          href={"https://github.com/jpedroribeiro/Baseliner/issues"}
          target={"_blank"}
          title={"Removes Baseliner from the page"}
        >
          Support Us
        </a>
      </div>
    </div>
  );
}

export default Popup;
