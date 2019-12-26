

let newButton;

/**
 * Check if Tag is available and after that start setup the thing
 */
let run = () => {
    setTimeout(videoTagAvailable() ? injectAndObserv : run, 500);
};

/**
 * Check if tag available
 * @returns {boolean}
 */
let videoTagAvailable = () => document.querySelector("video") !== null;


let injectAndObserv = () => {
    addToggleControls();
    vSourceObserver();
    newButton.addEventListener("click", mirrorIt);
};


let mirrorIt = () => {
    let videoTag = document.querySelector("video");

    updateToggleControls();
    videoTag.style.transform =  videoTag.style.transform === "scaleX(-1)" ? "" : "scaleX(-1)";

};

/**
 * Attach svg to the player
 * @returns {boolean}
 */
let addToggleControls = () => {
    let lftControls = document.querySelector("div.ytp-left-controls");

    if (!lftControls)
    {
        return false;
    }
    newButton = document.createElement("a");
    newButton.className = "ytp-button FlipTube-button";
    newButton.title = "Flip the video";
    newButton.appendChild(getSVG());
    lftControls.appendChild(newButton);
    return true;
};


/**
 * Observe the video Tag and reset on video switch
 */
let vSourceObserver = () => {
    let vTag = document.querySelector("video");
    let observer = new MutationObserver((mutations) => {
        mutations.forEach(
            (mutation) => {
                if(mutation.attributeName === "src")
                {
                    let svg = document.querySelector(".FlipTube-button svg");
                    resetFlipBtn(svg);
                }

                if (mutation.attributeName === "style")
                {
                    let svg = document.querySelector(".FlipTube-button svg");
                    let videoTag = document.querySelector("video");
                    svg.style.transform === "scaleX(-1)" ? videoTag.style.transform = "scaleX(-1)" : "";
                }
            }
        );
    });
    let config = { attributes: true, childList: false, subtree: false };

    observer.observe(vTag, config);
};

/**
* Checks the current state of the icon and toggles it
*/
let updateToggleControls = () => {
    let svg = document.querySelector(".FlipTube-button svg");

    if(svg.title === undefined || svg.title === ""){
        svg.style.fill = "#f12b24";
        svg.style.transform = "scaleX(-1)";
        svg.title = "Mirrored!";
    }else{
        svg.style.fill = "#fff";
        svg.style.transform = "";
        svg.title = "";
    }
};


let resetFlipBtn = (btn) => {
    btn.style.fill = "#fff";
    btn.style.transform = "";
    btn.title = "";
};


/**
* Create the svg icon
* return: give me the created svg
*/
let getSVG = () => {
    let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("fill", "#fff");
    let pathOne = document.createElementNS("http://www.w3.org/2000/svg", "path");
    let pathTwo = document.createElementNS("http://www.w3.org/2000/svg", "path");
    pathOne.setAttribute("d", "M6.99 11L3 15l3.99 4v-3H14v-2H6.99v-3zM21 9l-3.99-4v3H10v2h7.01v3L21 9z");
    pathTwo.setAttribute("d", "M0 0h24v24H0z");
    pathTwo.setAttribute("fill", "none");

    svg.appendChild(pathOne,pathTwo);
    return svg;
};

run();