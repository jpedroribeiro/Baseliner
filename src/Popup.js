/*global chrome*/
import React from "react";
import "./Popup.css";
import hexToRGB from "./hexToRGB";
import rgbToHex from "./rgbToHex";

function Popup() {
  const ENV_EXTENSION = chrome && chrome.tabs;
  const IS_CHROMIUM = chrome && chrome.app; // Firefox eyedropper is not helpful so I enable that on Chromium only
  const [hasStartedUp, setHasStartedUp] = React.useState(false);
  const [statusLabel, setStatusLabel] = React.useState("loading...");
  const [topOffset, setTopOffset] = React.useState(0);
  const [leftOffset, setLeftOffset] = React.useState(0);
  const [rightOffset, setRightOffset] = React.useState(0);
  const [forceStyles, setForceStyles] = React.useState(false);
  const [enableVertical, setEnableVertical] = React.useState(true);
  const [colourVertical, setColourVertical] = React.useState("#0829d0");
  const [opacityVertical, setOpacityVertical] = React.useState(100);
  const [baselineVertical, setBaselineVertical] = React.useState(8);
  const [baselineStyleVertical, setBaselineStyleVertical] = React.useState("line");
  const [enableHorizontal, setEnableHorizontal] = React.useState(false);
  const [colourHorizontal, setColourHorizontal] = React.useState("#cd4d28");
  const [opacityHorizontal, setOpacityHorizontal] = React.useState(100);
  const [baselineHorizontal, setBaselineHorizontal] = React.useState(8);
  const [baselineStyleHorizontal, setBaselineStyleHorizontal] = React.useState("line");

  function handleTopOffset(e) {
    setTopOffset(e.currentTarget.value);
  }

  function handleLeftOffset(e) {
    setLeftOffset(e.currentTarget.value);
  }
  function handleRightOffset(e) {
    setRightOffset(e.currentTarget.value);
  }

  function handleForceStyles(e) {
    const checked = e.currentTarget.checked;
    setForceStyles(checked);
  }

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

  function handleStyleSelect(e) {
    const grid = e.currentTarget.dataset.grid;
    if (grid === "vertical") {
      setBaselineStyleVertical(e.currentTarget.value);
    } else {
      setBaselineStyleHorizontal(e.currentTarget.value);
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
      chrome.runtime.onMessage.addListener(function (message) {
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
                verticalStyleBaseline: "${message.objOfValues.verticalStyleBaseline}",
                verticalEnable: ${message.objOfValues.verticalEnable},
                horizontalRed: ${message.objOfValues.horizontalRed},
                horizontalBlue: ${message.objOfValues.horizontalBlue},
                horizontalGreen: ${message.objOfValues.horizontalGreen},
                horizontalOpacity: ${message.objOfValues.horizontalOpacity},
                horizontalBaseline: ${message.objOfValues.horizontalBaseline},
                horizontalStyleBaseline: "${message.objOfValues.horizontalStyleBaseline}",
                horizontalEnable: ${message.objOfValues.horizontalEnable},
                topOffset: ${message.objOfValues.topOffset},
                leftOffset: ${message.objOfValues.leftOffset},
                rightOffset: ${message.objOfValues.rightOffset},
                forceStyles: ${message.objOfValues.forceStyles}
              })`,
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
                verticalStyleBaseline,
                verticalEnable,
                horizontalRed,
                horizontalBlue,
                horizontalGreen,
                horizontalOpacity,
                horizontalBaseline,
                horizontalStyleBaseline,
                horizontalEnable,
                topOffset,
                leftOffset,
                rightOffset,
                forceStyles,
              },
            } = message;
            setColourHorizontal(
              rgbToHex(horizontalRed, horizontalGreen, horizontalBlue)
            );
            setOpacityHorizontal(horizontalOpacity);
            setBaselineHorizontal(horizontalBaseline);
            setBaselineStyleHorizontal(horizontalStyleBaseline);
            setEnableHorizontal(horizontalEnable);
            setColourVertical(
              rgbToHex(verticalRed, verticalGreen, verticalBlue)
            );
            setOpacityVertical(verticalOpacity);
            setBaselineVertical(verticalBaseline);
            setBaselineStyleVertical(verticalStyleBaseline);
            setEnableVertical(verticalEnable);
            setTopOffset(topOffset);
            setLeftOffset(leftOffset);
            setRightOffset(rightOffset);
            setForceStyles(forceStyles);

            // Generate and apply styles
            chrome.tabs.executeScript({
              code: `Baseliner.generateStyles(
                ${verticalRed},
                ${verticalBlue},
                ${verticalGreen},
                ${verticalOpacity},
                ${verticalBaseline},
                "${verticalStyleBaseline}",
                ${verticalEnable},
                ${horizontalRed},
                ${horizontalBlue},
                ${horizontalGreen},
                ${horizontalOpacity},
                ${horizontalBaseline},
                "${horizontalStyleBaseline}",
                ${horizontalEnable},
                ${topOffset},
                ${leftOffset},
                ${rightOffset},
                ${forceStyles}
              )`,
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
        baselineStyle: baselineStyleVertical,
        enable: enableVertical,
      };
      const colourHorizontalRGB = hexToRGB(colourHorizontal);
      const horizontal = {
        red: colourHorizontalRGB.r,
        green: colourHorizontalRGB.g,
        blue: colourHorizontalRGB.b,
        opacity: opacityHorizontal,
        baseline: baselineHorizontal,
        baselineStyle: baselineStyleHorizontal,
        enable: enableHorizontal,
      };

      // Generate and apply styles
      chrome.tabs.executeScript({
        code: `Baseliner.generateStyles(
          ${vertical.red}, 
          ${vertical.blue}, 
          ${vertical.green}, 
          ${vertical.opacity},
          ${vertical.baseline}, 
          "${vertical.baselineStyle}", 
          ${vertical.enable}, 
          ${horizontal.red}, 
          ${horizontal.blue}, 
          ${horizontal.green}, 
          ${horizontal.opacity},
          ${horizontal.baseline},
          "${horizontal.baselineStyle}",
          ${horizontal.enable},
          ${topOffset},
          ${leftOffset},
          ${rightOffset},
          ${forceStyles}
        )`,
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
    baselineStyleVertical,
    baselineStyleHorizontal,
    enableVertical,
    enableHorizontal,
    topOffset,
    leftOffset,
    rightOffset,
    forceStyles,
  ]);

  return (
    <div className="popup">
      <h1>
        <a
          href={"https://github.com/jpedroribeiro/Baseliner/"}
          target={"_blank"}
          rel="noreferrer"
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
          <label htmlFor={"styleVertical"}>Style</label>
          <select
            disabled={!enableVertical}
            id="styleVertical"
            data-grid="vertical"
            onChange={handleStyleSelect}
            defaultValue={baselineStyleVertical}
          >
            <option value={"line"}>Line</option>
            <option value={"column"}>Column</option>
          </select>
        </div>
        <div className={"row"}>
          <label htmlFor={"colourVertical"}>Colour</label>
          <input
            disabled={!enableVertical}
            type={IS_CHROMIUM ? "color" : "text"}
            id="colourVertical"
            value={IS_CHROMIUM ? colourVertical : null}
            defaultValue={IS_CHROMIUM ? null : colourVertical}
            data-grid="vertical"
            onChange={IS_CHROMIUM ? handleColour : null}
            onBlur={IS_CHROMIUM ? null : handleColour}
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
          <label htmlFor={"styleHorizontal"}>Style</label>
          <select
            disabled={!enableHorizontal}
            id="styleHorizontal"
            data-grid="horizontal"
            onChange={handleStyleSelect}
            defaultValue={baselineStyleHorizontal}
          >
            <option value={"line"}>Line</option>
            <option value={"column"}>Column</option>
          </select>
        </div>
        <div className={"row"}>
          <label htmlFor={"colourHorizontal"}>Colour</label>
          <input
            disabled={!enableHorizontal}
            type={IS_CHROMIUM ? "color" : "text"}
            id="colourHorizontal"
            value={IS_CHROMIUM ?colourHorizontal: null}
            defaultValue={IS_CHROMIUM ? null:colourHorizontal}
            data-grid="horizontal"
            onChange={IS_CHROMIUM ? handleColour : null}
            onBlur={IS_CHROMIUM ? null : handleColour}
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

      <div className={"grid-trio grid"}>
        <h2>Offset</h2>
        <div className={"row"}>
          <div className={"grid-trio-unit"}>
            <label htmlFor={"leftOffset"}>Left</label>
            <input
              type="number"
              min={0}
              id="leftOffset"
              value={leftOffset}
              onChange={handleLeftOffset}
            />
          </div>
          <div className={"grid-trio-unit"}>
            <label htmlFor={"topOffset"}>Top</label>
            <input
              type="number"
              min={0}
              id="topOffset"
              value={topOffset}
              onChange={handleTopOffset}
            />
          </div>
          <div className={"grid-trio-unit"}>
            <label htmlFor={"rightOffset"}>Right</label>
            <input
              type="number"
              min={0}
              id="rightOffset"
              value={rightOffset}
              onChange={handleRightOffset}
            />
          </div>
        </div>
      </div>

      <div className={`grid`}>
        <h2>Force Styles</h2>
        <div className="row">
          <label className={"label-tweak"}>Enable</label>
        </div>
        <div className={"row checkbox checkbox-inline"}>
          <input
            type="checkbox"
            id="forceStyles"
            checked={forceStyles}
            onChange={handleForceStyles}
          />
          <label htmlFor={"forceStyles"}>Enable</label>
        </div>
      </div>

      <div className={"footer"}>
        <a
          href={"https://github.com/jpedroribeiro/Baseliner/issues"}
          target={"_blank"}
          title={"Suggestions? Bugs? Drop us a message"}
          rel="noreferrer"
        >
          Feedback?
        </a>
        <a
          href={"https://ko-fi.com/jpedroribeiro"}
          target={"_blank"}
          title={"Help the project grow by making a small contribution!"}
          rel="noreferrer"
        >
          Support Us
        </a>
      </div>
    </div>
  );
}

export default Popup;
